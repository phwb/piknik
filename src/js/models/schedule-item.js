'use strict';

let ScheduleItem = Backbone.Model.extend({
  defaults: {
    id: 0,
    active: true,
    name: '',
    sort: 100,
    timestamp: 0,
    start: 0,
    startStr: '',
    end: 0,
    endStr: '',
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
    PLACE_ID: 'placeID',
    TIME_START_STR: 'startStr',
    TIME_END_STR: 'endStr'
  },
  sync: Backbone.localforage.sync('schedule-item')
});

export default ScheduleItem;
