'use strict';

import Friend from '../models/friend';

let Friends = Backbone.Collection.extend({
  url: '/contacts',
  model: Friend,
  sync: Backbone.localforage.sync('friends')
});

export {Friends};

export default new Friends();
