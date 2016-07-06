'use strict';

import places from '../collections/places';
import schedule from '../collections/schedule';
import Page from '../views/place/detail';

module.exports = function (container, {id}) {
  if (!id) {
    return false;
  }

  let model = places.get(id);
  if (!model) {
    throw new Error(`че то вообще странное творится, не найдена площадка ${id}`);
  }

  let page = new Page({
    el: container,
    model: model,
    collection: schedule //new Schedule(placeSchedule)
  });
  page.render();
  
  return page;
};
