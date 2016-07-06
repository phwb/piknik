'use strict';

import _item        from './templates/page-list-item.jade';
import places       from '../../collections/places';
import {SimpleLink} from '../ui/list';
import {PullDown}   from '../ui/page';
import './menu';

class List extends SimpleLink {
  get className() {
    return 'b-main-teasers__lst';
  }

  get Item() {
    class Item extends super.Item {
      get template() {
        return _.template(_item);
      }

      get className() {
        return 'b-main-teasers__item';
      }

      render() {
        super.render();
        this.$el.addClass(`b-main-teasers__item_${this.model.get('code')}`);
        return this;
      }
    }
    return Item;
  }
}

class Page extends PullDown {
  get collection() {
    return places;
  }

  initialize() {
    super.initialize();
    this.$list = this.$el.find('.b-main-teasers');
    this.$('.toolbar-main').addClass('is-active');
  }

  addAll() {
    let collection = this.collection;
    if (!collection.length) {
      // зоны еще не загрузились
      this.$empty.show();
      return this;
    }
    
    let list = new List({
      collection: collection,
      href: function (model) {
        let id = model.get('id');
        return `places/detail.html?id=${id}`;
      }
    });

    this.$empty.hide();
    this.$list.html( list.render().$el );
  }

  addItem(model) {
    this.collection.set(model, {remove: false});
  }
}

export default Page;
