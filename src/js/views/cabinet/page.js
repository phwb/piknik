'use strict';

import {ScheduleList} from '../place/detail';
import _item from './templates/page-schedule-item.jade';

class List extends ScheduleList {
  get Item() {
    class Item extends super.Item {
      get template() {
        return _.template(_item);
      }
    }

    return Item;
  }
}

class Page extends Backbone.View {
  initialize() {
    this.$empty = this.$('.empty-page');
    this.$list = this.$('.b-list');

    this.$('.toolbar-calendar').addClass('is-active');
  }

  render() {
    let collection = this.collection;
    if (!collection.length) {
      this.$empty.show();
      return this;
    }

    let list = new List({
      collection: this.collection,
      shake: this.$('.toolbar-calendar')
    });

    this.$list.html( list.render().$el );
    this.$empty.hide();
    return this;
  }
}

export default Page;
