let Place = Backbone.Model.extend({
  defaults: {
    id: 0,
    active: true,
    name: '',
    code: '',
    sort: 100,
    type: 'html',
    text: '',
    timestamp: 0,
    polygon: []
  },
  syncMap: {
    ID: 'id',
    ACTIVE: 'active',
    NAME: 'name',
    CODE: 'code',
    SORT: 'sort',
    DETAIL_TEXT_TYPE: 'type',
    DETAIL_TEXT: 'text',
    TIMESTAMP_X: 'timestamp',
    COORDS: 'polygon'
  },
  sync: Backbone.localforage.sync('place')
});

export default Place;
