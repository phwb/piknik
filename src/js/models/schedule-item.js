'use strict';

let ScheduleItem = Backbone.Model.extend({
  defaults: {
    id: 0,
    active: true,
    name: '',
    sort: 100,
    timestamp: 0,
    start: '00:00',
    end: 0,
    placeID: '0',
    // флаг добавления в "Мое расписание"
    my: false
  },
  toggle: function() {
    let my = !this.get('my');
    this.save({
      my: my
    });
    return my;
  },
  syncMap: {
    ID: 'id',
    ACTIVE: 'active',
    NAME: 'name',
    SORT: 'sort',
    TIMESTAMP_X: 'timestamp',
    TIME_START: 'start',
    TIME_END: 'end',
    PLACE_ID: 'placeID'
  },
  sync: Backbone.localforage.sync('schedule-item')
});

export default ScheduleItem;
