'use strict';

let Friend = Backbone.Model.extend({
  defaults: {
    code: 0,
    name: ''
  },
  idAttribute: 'code',
  /*validate: function (attrs) {
    let code = +attrs.code;
    if (!code) {
      return 'Не верный Код';
    }

    let name = attrs.name;
    if (!/^[а-яёА-ЯЁA-Za-z ,.'-]+$/i.test(name)) {
      return 'Не верное Имя';
    }
    if (name.length < 2) {
      return 'Слишком короткое Имя';
    }
  },*/
  sync: Backbone.localforage.sync('friend')
});

export {Friend};

export default Friend;
