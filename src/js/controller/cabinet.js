'use strict';

import Page from '../views/cabinet/page';
import schedule, {Schedule} from '../collections/schedule';
import places from '../collections/places';

module.exports = function (container) {
  let mySchedule = schedule.where({
    my: true
  });

  mySchedule = mySchedule.map(item => {
    let attrs = item.toJSON();
    let place = places.get(attrs.placeID);

    item.set({placeName: place.get('name')});
    return item;
  });
  
  let page = new Page({
    el: container,
    collection: new Schedule(mySchedule)
  });
  page.render();

  return page;
};
