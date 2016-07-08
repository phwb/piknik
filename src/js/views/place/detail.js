'use strict';

import _item    from './templates/detail-schedule-item.jade';
import {Simple} from '../ui/list';
import {PullDown} from '../ui/page';
import config   from '../../models/config';
import {myAlert} from '../../app/helpers';

let {$, ajax}= Backbone;
let ajaxStart = false;

function setTitle(model) {
  let name = model.get('name');
  let $title = $('.navbar-title');
  $title.text(name);
}

export class ScheduleList extends Simple {
  get className() {
    return 'b-list__lst';
  }

  get Item() {
    let shake = this.shake;

    class Item extends super.Item {
      get className() {
        return 'b-list__item';
      }

      get template() {
        return _.template(_item);
      }

      get events() {
        return {
          'click .item-link': 'toggleFavorite'
        };
      }

      toggleFavorite(e) {
        e.preventDefault();

        // если аякс уже началася ничего делать не надо
        if (ajaxStart) {
          return this;
        }

        let serverID = config.get('serverID');
        if (!serverID) {
          return this;
        }

        let my = this.model.get('my');
        let params = {
          url: `${API_URL}/device/${serverID}/schedule`,
          data: {
            event_id: this.model.get('id')
          },
          type: !my ? 'post' : 'delete',
          timeout: 30000
        };

        ajaxStart = true;
        this.$el.addClass('b-list__item_loading');

        ajax(params)
          .done(this.ajaxDone.bind(this))
          .fail(this.ajaxFail.bind(this))
          .always(this.ajaxEnd.bind(this));
      }

      ajaxDone(data) {
        switch (data.RESULT) {
          case 'success':
            if (shake && !shake.hasClass('shake')) {
              shake.addClass('shake').on('animationend', function () {
                shake.removeClass('shake');
              });
            }
            return this.model.toggle();
          default:
            myAlert(`Произошлка какая то ошибка, попробуйте повторить еще раз!`);
        }
      }

      ajaxFail(error) {
        let my = this.model.get('my');
        let method = !my ? 'добавления' : 'удаления';
        let message = `Ошибка ${method} записи в "Моё расписание", попробуйте еще раз!`;

        if (error.status === 406) {
          message = error.responseJSON.MESSAGE;
        }

        myAlert(message);
      }

      ajaxEnd() {
        ajaxStart = false;
        this.$el.removeClass('b-list__item_loading');
      }

      initialize() {
        super.initialize();
        this.listenTo(this.model, 'change:my', this.toggleFavoriteView);
      }

      toggleFavoriteView() {
        let my = this.model.get('my');
        this.$el[ my ? 'addClass' : 'removeClass' ]('b-list__item_favorite');
      }

      afterRender() {
        this.toggleFavoriteView();
      }
    }
    return Item;
  }

  initialize(params) {
    super.initialize();

    this.shake = params.shake ? params.shake : null;

    return this;
  }
}

class Page extends PullDown {
  initialize() {
    super.initialize();

    // кэшируем табы
    this.$schedule = this.$('#place-schedule');
    this.$info = this.$('#place-info .b-tabs__content');

    // установим заголовок экрана
    setTitle(this.model);
  }

  render() {
    return this
      .renderInfo()
      .addAll();
  }

  renderInfo() {
    let model = this.model;
    let type = model.get('type');
    let text = model.get('text');

    this.$info[type === 'html' ? 'html' : 'text'](text);
    return this;
  }

  addAll() {
    let schedule = this.collection.where({
      placeID: this.model.get('id'),
      active: true
    });

    if (!schedule.length) {
      // зоны еще не загрузились
      this.$empty.show();
      return this;
    }

    schedule.sort(function(a, b) {
      return a.get('start') - b.get('start');
    });

    let list = new ScheduleList({
      collection: schedule,
      shake: this.$shake
    });

    this.$empty.hide();
    this.$schedule.html( list.render().$el );

    return this;
  }

  addItem(model) {
    this.collection.set(model, {remove: false});
  }
}

export default Page;
