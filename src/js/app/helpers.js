'use strict';

import dateFormat from 'date-format';
import config     from '../models/config';
import schedule   from '../collections/schedule';
import places     from '../collections/places';
import notify     from '../collections/notify';
import polls      from '../collections/polls';

import Sync, {syncUserSchedule} from './sync';
import registerPushwooshAndroid from './pushwoosh/android';
import registerPushwooshIOS     from './pushwoosh/ios';
// import SendCoordinates          from './send-coords';

// + инициализация StatusBar
export function initStatusBar(color = '#31b5e8') {
  if (!window.hasOwnProperty('StatusBar')) {
    return false;
  }

  StatusBar.backgroundColorByHexString(color);
}
// - инициализация StatusBar

// + update notify
/**
 * самая простая функция автообновления раз в 60 секунд
 */
let $ = Backbone.$;
function searchNewNotify() {
  let newer = notify.filter(model => {
    let params = model.toJSON();
    return params.isNew === true && params.active;
  });
  let $tip = $('.b-tip__body');

  if (newer.length) {
    $tip.show().text(newer.length);
  } else {
    $tip.hide();
  }
}

// подписываемся на событие добавления/изменения модели уведомлений
notify.on('add change', searchNewNotify);
// начальные настройки таймера обновления
let timer = null;
let timeout = 60000 * 5;
function updateNotify() {
  notify.refresh().then(() => {
    searchNewNotify();
    timer = setTimeout(updateNotify, timeout);
  });
}
// - update notify

// + router
/**
 * Роутер приложения
 *
 * @tutorial http://framework7.io/tutorials/mobile-mvc-apps-with-framework7-requirejs-and-handlerbars.html
 * @param name
 * @returns {Promise}
 */
function load(name) {
  return new Promise(function (resolve, reject) {
    let handler;
    try {
      handler = require('bundle!../controller/' + name);
    } catch (e) {
      reject(e);
    }

    if (!handler) {
      reject();
    }

    handler(function (route) {
      resolve(route);
    });
  });
}

/**
 * Инициализация роутера
 */
export function initRouter(app) {
  let $ = Framework7.$;

  $(document).on('pageBeforeInit', e => {
    let page = e.detail.page;
    load(page.name)
      .then(route => route(page.container, page.query || {}))
      .then(() => {
        if (page.name === 'map') {
          app.params.swipePanel = false;
        } else if (!app.params.swipePanel) {
          app.params.swipePanel = 'left';
        }
      })
      .then(searchNewNotify)
      .catch(e => console.error(e));
  });
}
// - router

// + alert
export function myAlert(arg) {
  let params = {
    message: '',
    callback: function () {},
    title: 'Внимание!',
    button: 'ОК'
  };
  if (typeof arg === 'string') {
    params.message = arg;
  }
  if (navigator.notification) {
    navigator.notification.alert(params.message, params.callback, params.title, params.button);
  } else {
    window.alert(params.message);
  }
}

export function confirm(parameters) {
  let params = {};
  let defaults = {
      message: '',
      callback: function (index) {
        return index;
      },
      title: 'Внимание!',
      buttons: ['Отмена', 'ОК']
    };

  if (typeof parameters === 'string') {
    params = _.extend(defaults, {message: parameters});
  } else {
    params = _.extend(defaults, parameters);
  }

  if (navigator.notification) {
    navigator.notification.confirm(params.message, params.callback, params.title, params.buttons);
  } else {
    params.callback(window.confirm(params.message));
  }
}
// - alert

/**
 * Первым всегда загружается конфиг
 *
 * @returns {Promise}
 */
function fetchConfig() {
  return new Promise(resolve => {
    config.fetch({
      success: resolve,
      error: resolve
    });
  });
}

// + инициализация pushwoosh
function pushCallback() {
  clearTimeout(timer);
  updateNotify();
}

export function initPushwoosh() {
  function success(token) {
    config.set({token: token});
  }

  function error() {
    config.set({token: 'error'});
  }

  return new Promise(resolve => {
    // событие срабатывает когда получили токен из PushWoosh'а
    // и отправили его на сервер для получения серверного ID
    config.on('serverID:receive', status => {
      switch (status) {
        case 'success':
          return resolve();
        default:
          console.log('Не удалось получить персональный номер!');
          resolve();
      }
    });

    if (!window.device) {
      // success('browser');
      error();
      return false;
    }

    if (device.platform.toLowerCase() === 'android') {
      registerPushwooshAndroid(pushCallback, success, error);
    }

    if (device.platform.toLowerCase() === 'iphone' || device.platform.toLowerCase() === 'ios') {
      registerPushwooshIOS(pushCallback, success, error);
    }
  });
}
// - инициализация pushwoosh

// + sync
/**
 * Запуск синхронизации
 *
 * @param {function} callback
 * @returns {Promise}
 */
export function initSync(callback = () => {}) {
  let sync = Promise.resolve();
  return sync
    .then(initPushwoosh)
    .then(fetchConfig)
    .then(() => new Sync(places))
    .then(() => new Sync(schedule))
    .then(() => syncUserSchedule(config.get('serverID'), schedule))
    .then(() => callback())
    .then(() => new Sync(notify))
    .then(() => new Sync(polls))
    .catch(e => myAlert(`Ошибка: ${e.message}`))
    .then(updateNotify);
}
// - sync

// + форматирование даты
export function formatDate(date) {
  let month = 'января февраля марта апреля мая июня июля августа сентября октября ноября декабря'.split(' ');
  let result = dateFormat.apply(dateFormat, arguments);
  let daysName = 'ВС ПН ВТ СР ЧТ ПТ СБ'.split(' ');

  if (typeof(date) === 'string') {
    date = arguments[1];
  }

  return result
    .replace(/Mm/g, month[date.getMonth()])
    .replace(/D/g, daysName[date.getDay()]);
}
// - форматирование даты
