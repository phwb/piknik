'use strict';

import TabMap from './tab-map';
// import {FriendForm, FriendList} from './tab-friends';
import config from '../../models/config';

class Page extends Backbone.View {
  initialize() {
    this.$map = this.$('#map-map');
    this.$code = this.$('#server-id');
    // this.$form = this.$('#friends-form');
    // this.$list = this.$('#friends-list');

    this.collection.fetch({reset: true});
    this.$('.toolbar-location').addClass('is-active');
  }

  render() {
    return this
      ._renderInfo();
      // ._renderFriendsForm();
  }

  renderMap(ymaps) {
    if (!ymaps) {
      return this;
    }

    ymaps.ready(ymaps => {
      let tabMap = new TabMap({
        el: this.$map,
        collection: this.collection
      });
      tabMap.render(ymaps);
    });

    return this;
  }

  _renderInfo() {
    let serverID = config.get('serverID');
    this.$code.text(serverID);

    return this;
  }

  /*_renderFriendsForm() {
    let list = new FriendList({
      collection: this.collection,
      el: this.$list
    });
    list.render();

    let form = new FriendForm({
      collection: this.collection,
      el: this.$form
    });
    form.render();

    return this;
  }*/
}

export default Page;
