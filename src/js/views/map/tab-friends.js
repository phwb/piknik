'use strict';

import _item from './templates/tab-friends-item.jade';
import {myAlert} from '../../app/helpers';
import {Simple} from '../ui/list';
import config from '../../models/config';

let ajax = Backbone.ajax;
let serverID = config.get('serverID');
let ajaxStart = false;

export class FriendList extends Simple {
  get className() {
    return 'b-list__lst';
  }

  get Item() {
    class Item extends super.Item {
      get events() {
        return {
          'click .b-modal__close_delete': 'removeFriend'
        };
      }

      removeFriend(e) {
        e.preventDefault();

        this.$el.addClass('b-list__item_loading');

        let params = {
          url: `${API_URL}/device/${serverID}/friends`,
          data: {
            friend_id: this.model.get('code')
          },
          type: 'delete',
          dataType: 'json'
        };

        ajax(params)
          .fail(this.ajaxFail.bind(this))
          .always(this.ajaxEnd.bind(this));
        return this;
      }

      ajaxFail(xhr) {
        let message = xhr.status === 406 ? xhr.responseJSON.MESSAGE : 'Ошибка удаления друга';
        myAlert(message);

        return this;
      }

      ajaxEnd() {
        this.model.destroy();
        this.remove();
      }

      get className() {
        return 'b-list__item';
      }

      get template() {
        return _.template(_item);
      }
    }

    return Item;
  }

  initialize() {
    super.initialize();
    this.listenTo(this.collection, 'reset', this.render);

    return this;
  }
}

const MAX_FRIENDS_COUNT = 4;
export class FriendForm extends Backbone.View {
  get events() {
    return {
      'click #friend-add': 'addFriend'
    };
  }

  addFriend(e) {
    e.preventDefault();

    if (ajaxStart) {
      return this;
    }

    if (this.collection.length > MAX_FRIENDS_COUNT) {
      return this.showError(null, 'Больше нельзя добавить друга');
    }

    let code = this.$code.val().trim();
    let name = this.$name.val().trim();

    let friend = this.collection.get(code);
    if (friend) {
      return this.showError(null, 'Друг с таким кодом уже существует');
    }

    let params = {
      url: `${API_URL}/device/${serverID}/friends`,
      data: {
        friend_id: code,
        friend_name: name
      },
      method: 'post',
      dataType: 'json',
       timeout: 30000
    };
    this.friend = {code, name};
    ajaxStart = true;
    ajax(params)
      .done(this.ajaxDone.bind(this))
      .fail(this.ajaxFail.bind(this))
      .always(() => ajaxStart = false);

    return this;
  }

  ajaxDone() {
    let {name, code} = this.friend;
    this.collection
      .add({
        name: name,
        code: code
      }, {
        validate: true
      })
      .save();
    this.$code.val('');
    this.$name.val('');
  }
  ajaxFail(xhr) {
    let message = xhr.status === 406 ? xhr.responseJSON.MESSAGE : 'Ошибка добавления друга';
    myAlert(message);

    return this;
  }

  initialize() {
    this.$code = this.$('#friend-code');
    this.$name = this.$('#friend-name');

    this.listenTo(this.collection, 'invalid', this.showError);

    return this;
  }

  showError(collection, message) {
    myAlert(message);
    return this;
  }
}
