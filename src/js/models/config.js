'use strict';

// настройки приложения будем хранить в модели
// это проще чем каждый раз выбирать из коллекции
// к примеру текущую смену, ее айдишник сразу храниться в настройках
let Config = Backbone.Model.extend({
  initialize: function () {
    this.on('change:token', this.getServerID);
  },
  getServerID: function (model, token) {
    // читаем ID из модели
    let serverID = this.get('serverID');
    // если он есть, то ничего не делаем
    if (serverID) {
      return this.trigger('serverID:receive', 'success');
    }

    if (token === 'error') {
      return this.trigger('serverID:receive', 'error');
    }
    
    // если его нет, то получим его с сервера
    let ajax = Backbone.ajax;
    let params = {
      url: `${API_URL}/device/register`,
      data: {
        hash: token
      },
      dataType: 'json',
      type: 'post'
    };
    ajax(params)
      .done(data => {
        if (data.RESULT === 'success') {
          let id = +data.ID || 0;
          this.set({serverID: id}).save();
          return this.trigger('serverID:receive', 'success');
        }
        return this.trigger('serverID:receive', 'error');
      })
      .fail(() => this.trigger('serverID:receive', 'error'));
  },
  defaults: {
    id: 'common',
    serverID: 0,
    token: ''
  },
  sync: Backbone.localforage.sync('config')
});

export default new Config();
