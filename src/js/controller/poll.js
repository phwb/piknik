'use strict';

import polls from '../collections/polls';
import Page from '../views/polls/detail';

module.exports = function (container, {id}) {
  if (!id) {
    return false;
  }

  let model = polls.get(id);
  if (!model) {
    throw new Error(`на нашли опрос с таким айдишником ${id}`);
  }

  let page = new Page({
    el: container,
    model: model
  });
  page.render();

  return page;
};
