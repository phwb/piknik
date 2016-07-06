'use strict';

import polls from '../collections/polls';
import Page from '../views/polls/page';

module.exports = function (container) {
  let page = new Page({
    el: container,
    collection: polls
  });
  page.render();
  return page;
};
