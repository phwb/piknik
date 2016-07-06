/* global IS_DEV */
'use strict';

import {initStatusBar} from '../app/helpers';

let {$} = Backbone;

module.exports = function (container) {
  let $modal = $(container).closest('.login-screen');
  initStatusBar('#00b579');
  $modal.trigger('close:modal');
};
