!function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n=window.webpackJsonp;window.webpackJsonp=function(r,a){for(var i,c,u=0,s=[];u<r.length;u++)c=r[u],o[c]&&s.push.apply(s,o[c]),o[c]=0;for(i in a)e[i]=a[i];for(n&&n(r,a);s.length;)s.shift().call(null,t)};var r={},o={0:0};return t.e=function(e,n){if(0===o[e])return n.call(null,t);if(void 0!==o[e])o[e].push(n);else{o[e]=[n];var r=document.getElementsByTagName("head")[0],a=document.createElement("script");a.type="text/javascript",a.charset="utf-8",a.async=!0,a.src=t.p+""+e+"."+({}[e]||e)+".js",r.appendChild(a)}},t.m=e,t.c=r,t.p="./js/app/",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function r(){var e=Backbone.$;document.addEventListener("backbutton",function(e){e.preventDefault(),c.router.back()}),e(document).on("refreshend",".pull-to-refresh-content",function(){return i.pullToRefreshDone()}),e(document).on("page:load",function(e,t){c.router.loadPage("places/detail.html?id="+t)}),e(".login-screen").on("close:modal",function(){return i.closeModal()}),(0,o.initStatusBar)("#212121"),i.init()}var o=n(2),a=Backbone.localforage.localforageInstance;a.config({driver:[a.LOCALSTORAGE,a.INDEXEDDB,a.WEBSQL],name:"piknik"}),_.template.formatDate=o.formatDate;var i=new Framework7({swipePanel:"left",animateNavBackIcon:!0,init:!1});window.app=i,(0,o.initRouter)(i);var c=i.addView(".view-main",{dynamicNavbar:!0});c.history=["index.html"],c.url="index.html",document.addEventListener("deviceready",o.initSync.bind(!1,r),!1)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(){var e=arguments.length<=0||void 0===arguments[0]?"#31b5e8":arguments[0];return N(".statusbar-overlay").css({backgroundColor:e}),!!window.hasOwnProperty("StatusBar")&&void StatusBar.backgroundColorByHexString(e)}function a(){var e=k["default"].filter(function(e){var t=e.toJSON();return t.isNew===!0&&t.active}),t=N(".b-tip__body");e.length?t.show().text(e.length):t.hide()}function i(){k["default"].refresh().then(function(){a(),L=setTimeout(i,C)})}function c(e){return new Promise(function(t,r){var o=void 0;try{o=n(16)("./"+e)}catch(a){r(a)}o||r(),o(function(e){t(e)})})}function u(e){var t=Framework7.$;t(document).on("pageBeforeInit",function(t){var n=t.detail.page;c(n.name).then(function(e){return e(n.container,n.query||{})}).then(function(){"map"===n.name?e.params.swipePanel=!1:e.params.swipePanel||(e.params.swipePanel="left")}).then(a)["catch"](function(e){return console.error(e)})})}function s(e){var t={message:"",callback:function(){},title:"Внимание!",button:"ОК"};"string"==typeof e&&(t.message=e),navigator.notification?navigator.notification.alert(t.message,t.callback,t.title,t.button):window.alert(t.message)}function l(e){var t={},n={message:"",callback:function(e){return e},title:"Внимание!",buttons:["Отмена","ОК"]};t="string"==typeof e?_.extend(n,{message:e}):_.extend(n,e),navigator.notification?navigator.notification.confirm(t.message,t.callback,t.title,t.buttons):t.callback(window.confirm(t.message))}function f(){return new Promise(function(e){w["default"].fetch({success:e,error:e})})}function d(){clearTimeout(L),i()}function v(){function e(e){var t=w["default"].get("token");e!==t&&w["default"].set({token:e})}function t(){w["default"].set({token:"error"})}return w["default"].on("serverID:receive",function(e){switch(e){case"success":return!0;default:return console.log("Не удалось получить персональный номер!"),!1}}),window.device?("android"===device.platform.toLowerCase()&&(0,O["default"])(d,e,t),void("iphone"!==device.platform.toLowerCase()&&"ios"!==device.platform.toLowerCase()||(0,A["default"])(d,e,t))):(setTimeout(function(){return e("browser")},1e3),!1)}function p(){var e=arguments.length<=0||void 0===arguments[0]?function(){}:arguments[0],t=Promise.resolve();return t.then(v).then(f).then(function(){return new P["default"](S["default"])}).then(function(){return new P["default"](E["default"])}).then(function(){return(0,x.syncUserSchedule)(w["default"].get("serverID"),E["default"])}).then(function(){return e()}).then(function(){return new P["default"](k["default"])}).then(function(){return new P["default"](I["default"])})["catch"](function(e){return s("Ошибка: "+e.message)}).then(i)}function h(e){var t="января февраля марта апреля мая июня июля августа сентября октября ноября декабря".split(" "),n=m["default"].apply(m["default"],arguments),r="ВС ПН ВТ СР ЧТ ПТ СБ".split(" ");return"string"==typeof e&&(e=arguments[1]),n.replace(/Mm/g,t[e.getMonth()]).replace(/D/g,r[e.getDay()])}Object.defineProperty(t,"__esModule",{value:!0}),t.initStatusBar=o,t.initRouter=u,t.myAlert=s,t.confirm=l,t.initPushwoosh=v,t.initSync=p,t.formatDate=h;var g=n(3),m=r(g),y=n(4),w=r(y),b=n(5),E=r(b),T=n(7),S=r(T),M=n(9),k=r(M),D=n(11),I=r(D),x=n(13),P=r(x),j=n(14),O=r(j),B=n(15),A=r(B),R=Backbone,N=R.$;k["default"].on("add change",a);var L=null,C=3e5},function(e,t){"use strict";function n(e,t){for(var n=e+"";n.length<t;)n="0"+n;return n}function r(e){return n(e,2)}function o(e){var t=Math.abs(e.getTimezoneOffset()),n=String(Math.floor(t/60)),r=String(t%60);return 1==n.length&&(n="0"+n),1==r.length&&(r="0"+r),e.getTimezoneOffset()<0?"+"+n+r:"-"+n+r}function a(e){var t=a.ISO8601_FORMAT;"string"==typeof e&&(t=arguments[0],e=arguments[1]),e||(e=new Date);var i=r(e.getDate()),c=r(e.getMonth()+1),u=r(e.getFullYear()),s=r(e.getFullYear().toString().substring(2,4)),l=t.indexOf("yyyy")>-1?u:s,f=r(e.getHours()),d=r(e.getMinutes()),v=r(e.getSeconds()),p=n(e.getMilliseconds(),3),h=o(e),g=t.replace(/dd/g,i).replace(/MM/g,c).replace(/y{1,4}/g,l).replace(/hh/g,f).replace(/mm/g,d).replace(/ss/g,v).replace(/SSS/g,p).replace(/O/g,h);return g}e.exports=a,a.asString=a,a.ISO8601_FORMAT="yyyy-MM-dd hh:mm:ss.SSS",a.ISO8601_WITH_TZ_OFFSET_FORMAT="yyyy-MM-ddThh:mm:ssO",a.DATETIME_FORMAT="dd MM yyyy hh:mm:ss.SSS",a.ABSOLUTETIME_FORMAT="hh:mm:ss.SSS"},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Backbone.Model.extend({initialize:function(){this.on("change:token",this.getServerID)},getServerID:function(e,t){var n=this,r=this.get("serverID");if(r)return this.trigger("serverID:receive","success");if("error"===t)return this.trigger("serverID:receive","error");var o=Backbone.ajax,a={url:"http://api.picnic.ugra-web.ru/device/register",data:{hash:t},dataType:"json",type:"post"};o(a).done(function(e){if("success"===e.RESULT){var t=+e.ID||0;return n.set({serverID:t}).save(),n.trigger("serverID:receive","success")}return n.trigger("serverID:receive","error")}).fail(function(){return n.trigger("serverID:receive","error")})},defaults:{id:"common",serverID:0,token:""},sync:Backbone.localforage.sync("config")});t["default"]=new r},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.Schedule=void 0;var o=n(6),a=r(o),i=Backbone.Collection.extend({url:"/schedule",model:a["default"],comparator:function(e){return e.get("start")},sync:Backbone.localforage.sync("schedule")});t.Schedule=i,t["default"]=new i},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Backbone.Model.extend({defaults:{id:0,active:!0,name:"",sort:100,timestamp:0,start:0,startStr:"",end:0,endStr:"",placeID:"0",my:!1},toggle:function(){var e=!this.get("my");return this.save({my:e}),e},syncMap:{ID:"id",ACTIVE:"active",NAME:"name",SORT:"sort",TIMESTAMP_X:"timestamp",TIME_START:"start",TIME_END:"end",PLACE_ID:"placeID",TIME_START_STR:"startStr",TIME_END_STR:"endStr"},sync:Backbone.localforage.sync("schedule-item")});t["default"]=n},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.Places=void 0;var o=n(8),a=r(o),i=Backbone.Collection.extend({url:"/places",model:a["default"],comparator:function(e){return e.get("sort")},sync:Backbone.localforage.sync("places")});t.Places=i,t["default"]=new i},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Backbone.Model.extend({defaults:{id:0,active:!0,name:"",code:"",sort:100,type:"html",text:"",timestamp:0,polygon:[]},syncMap:{ID:"id",ACTIVE:"active",NAME:"name",CODE:"code",SORT:"sort",DETAIL_TEXT_TYPE:"type",DETAIL_TEXT:"text",TIMESTAMP_X:"timestamp",COORDS:"polygon"},sync:Backbone.localforage.sync("place")});t["default"]=n},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.Notify=void 0;var o=n(10),a=r(o),i=Backbone.Collection.extend({url:"/notify",model:a["default"],sync:Backbone.localforage.sync("notify"),comparator:function(e){return-e.get("timestamp")},viewed:function(){this.each(this._viewed,this)},_viewed:function(e){return e.get("isNew")?void e.viewed():this}});t.Notify=i,t["default"]=new i},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Backbone.Model.extend({defaults:{id:"0",author:"",text:"",timestamp:0,isNew:!0},viewed:function(){this.save({isNew:!1})},syncMap:{ID:"id",AUTHOR:"author",TEXT:"text",TIMESTAMP:"timestamp"},sync:Backbone.localforage.sync("notify-item")});t["default"]=n},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.Polls=void 0;var o=n(12),a=r(o),i=Backbone.Collection.extend({url:"/polls",model:a["default"],comparator:function(e){return e.get("id")},sync:Backbone.localforage.sync("polls")});t.Polls=i,t["default"]=new i},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Backbone.Model.extend({defaults:{id:0,name:"Неизвестный опрос",voted:!1},syncMap:{ID:"id",NAME:"name"},sync:Backbone.localforage.sync("poll")});t["default"]=n},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e){return e.toLowerCase().replace(/_(.)/g,function(e,t){return t.toUpperCase()})}function a(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],n={};for(var r in e)if(e.hasOwnProperty(r)){var a=t.hasOwnProperty(r)?t[r]:o(r),i=void 0;switch(r){case"SORT":i=+e[r];break;case"ACTIVE":i="Y"===e[r];break;default:i=e[r]}e[r]&&(n[a]=i)}return n}function i(e){return new Promise(function(t,n){e.collection||n(new Error("Нет коллекции опросов"));var r=e.collection.url;r||n(new Error("Пустой URL опросов"));var o=e.get("id"),i={url:f.domain+r+"/"+o};l(i).done(function(e){var n=e.QUESTIONS||[];n.length||t();var r={ID:"id",TEXT:"name",TEXT_TYPE:"textType",FIELD_TYPE:"type",PERCENT:"percent"},o=n.map(function(e){var t=e.ANSWERS||[];t.length&&(t=t.map(function(t){var n=a(t,r);return n.questionID=e.ID,n.percent||(n.percent=0),n}));var n=a(e);return n.answers=t,n});t(o)}).fail(function(){n(new Error("Ошибка интернет соединения!"))})})}function c(e,t){var n=this;return new Promise(function(r,o){e.collection||o(new Error("Нет коллекции опросов"));var a=e.collection.url;a||o(new Error("Пустой URL опросов"));var i=e.get("id"),c={url:f.domain+a+"/"+i+"?"+t,type:"post"};l(c).done(function(e){return e.RESULT&&"success"===e.RESULT?(r(),n):void o(new Error("Голосование не доступно, повторите попытку позже!"))}).fail(function(e){var t="Ошибка интернет соединения!";406===e.status&&(t=e.responseJSON.MESSAGE),o(new Error(t))})})}function u(e,t){if(!e||!t.length)return!1;var n={url:"http://api.picnic.ugra-web.ru/device/"+e+"/schedule",type:"get",dataType:"json"};l(n).done(function(e){return e.forEach(function(e){return t.get(e).set({my:!0}).save()})})}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.getPollFields=i,t.setPollFields=c,t.syncUserSchedule=u;var l=Backbone.ajax,f={domain:"http://api.picnic.ugra-web.ru"},d=function(){function e(t){var n=this;return r(this,e),t.status=!1,t.refresh=function(){return n.update({method:"update",force:!1})},this.collection=t,this.fetch()}return s(e,[{key:"fetch",value:function(){var e=this,t=new Promise(function(t,n){e.collection.fetch({reset:!0,success:t.bind(e),error:n.bind(e)})});return t.then(this.fetchSuccess.bind(this)).then(this.update.bind(this)).then(this.done.bind(this))["catch"](this.error.bind(this))}},{key:"fetchSuccess",value:function(e){var t=this;return new Promise(function(n,r){if(e.length>0)return e.trigger("sync:db",e),n();e.status="pending",e.trigger("sync:ajax.start");var o=t._getUrl(),a={resolve:n,reject:r},i={url:o,dataType:"json"};l(i).done(t.ajaxSuccess.bind(t,a)).fail(t.ajaxError.bind(t,r))})}},{key:"ajaxSuccess",value:function(e){function t(e){var o=a(e,s);u.create(o,{silent:!0,success:function(){return l-=1,l<0?(u.status=!1,u.trigger("sync:ajax.end",u),n({timestamp:c,method:"set"}),!0):void t(i[l])},error:function(){return r(new Error("ошибка записи в БД"))}})}var n=e.resolve,r=e.reject,o=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=o.ITEMS||[],c=o.LAST_DATE_UPDATE||!1,u=this.collection;i.length||r(new Error("Пустой массив ITEMS "+u.url));var s=u.model.prototype.syncMap||{},l=i.length;t(i[l-1])}},{key:"ajaxError",value:function(e){return e(new Error("Ошибка ajax запроса")),this}},{key:"update",value:function(){var e=this,t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=t.timestamp,r=void 0!==n&&n,o=t.method,a=void 0===o?"update":o,i=t.force,c=void 0===i||i;return new Promise(function(t,n){c&&t();var o=e.collection,i=Backbone.localforage.localforageInstance,u=e._getKey(o.sync.localforageKey),s=e._getUrl();return"set"===a&&r?(i.setItem(u,r).then(function(){return t()})["catch"](function(){return n(new Error("ошибка записи в localForage"))}),e):"update"===a?(i.getItem(u).then(function(r){r=r||"",o.trigger("sync:ajax.start");var a={url:s,data:{lastUpdateDate:r},dataType:"json"};l(a).done(function(n){e.ajaxUpdateSuccess(n).then(function(){return t()})}).fail(function(){return n(new Error("Ошибка обновления "+u))}).always(function(){return o.trigger("sync:ajax.end")})})["catch"](function(){return n(new Error("ошибка чтения из localForage"))}),e):void 0})}},{key:"ajaxUpdateSuccess",value:function(e){var t=this;return new Promise(function(n){var r=e.ITEMS||[],o=e.LAST_DATE_UPDATE||!1;if(!r.length)return n(),t;var i=t.collection,c=i.model.prototype.syncMap||{},u=i.model.prototype.defaults||{},s=r.map(function(e){return a(e,c)}).map(function(e){return _.defaults(e,u)}).map(function(e){var t=i.get(e.id);return t&&(e.my=t.get("my")),e}),l=i.set(s,{remove:!1}),f=l.length;l.forEach(function(e){return e.save(null,{success:function(){f-=1,f<1&&(o&&t.update({timestamp:o,method:"set"}),n())}})})})}},{key:"error",value:function(){var e=arguments[0];e instanceof Error||(e=new Error("Неизвестная ошибка")),this.collection.trigger("sync:error",e),this.collection.status=!1}},{key:"done",value:function(){this.collection.status=!1,console.groupEnd()}},{key:"_getKey",value:function(e){var t="timestamp";return e+"-"+t}},{key:"_getUrl",value:function(){var e=this.collection.url||!1;if(!e)throw new Error("Пустой URL");return f.domain+e}}]),e}();t["default"]=d},function(e,t){"use strict";function n(e){var t=arguments.length<=1||void 0===arguments[1]?function(e){return console.warn("push token: "+e)}:arguments[1],n=arguments.length<=2||void 0===arguments[2]?function(e){return console.warn(JSON.stringify(["failed to register ",e]))}:arguments[2],r=cordova.require("pushwoosh-cordova-plugin.PushNotification");document.addEventListener("push-notification",e,!1),r.onDeviceReady({projectid:"55128747657",pw_appid:"8BD9C-7AA16"}),r.registerDevice(t,n),r.setMultiNotificationMode(function(){},function(){})}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=n},function(e,t){"use strict";function n(e,t,n){var r=cordova.require("pushwoosh-cordova-plugin.PushNotification");document.addEventListener("push-notification",e,!1),r.onDeviceReady({pw_appid:"69FF7-FF417"}),r.registerDevice(function(e){t(e.deviceToken),console.warn("registerDevice: "+e.deviceToken)},function(e){n(e),console.warn("failed to register : "+JSON.stringify(e))}),r.setApplicationIconBadgeNumber(0)}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=n},function(e,t,n){function r(e){return n(o(e))}function o(e){return a[e]||function(){throw new Error("Cannot find module '"+e+"'.")}()}var a={"./cabinet":17,"./cabinet.js":17,"./developers":26,"./developers.js":26,"./main":28,"./main.js":28,"./map":32,"./map.js":32,"./notify":34,"./notify.js":34,"./null":38,"./null.js":38,"./place-detail":40,"./place-detail.js":40,"./poll":42,"./poll.js":42,"./polls":45,"./polls.js":45,"./splash":49,"./splash.js":49};r.keys=function(){return Object.keys(a)},r.resolve=o,e.exports=r,r.id=16},function(e,t,n){var r,o=[];e.exports=function(e){o?o.push(e):e(r)},n.e(1,function(e){r=n(18);var t=o;o=null;for(var a=0,i=t.length;a<i;a++)t[a](r)})},,,,,,,,,function(e,t,n){var r,o=[];e.exports=function(e){o?o.push(e):e(r)},n.e(2,function(e){r=n(27);var t=o;o=null;for(var a=0,i=t.length;a<i;a++)t[a](r)})},,function(e,t,n){var r,o=[];e.exports=function(e){o?o.push(e):e(r)},n.e(3,function(e){r=n(29);var t=o;o=null;for(var a=0,i=t.length;a<i;a++)t[a](r)})},,,,function(e,t,n){var r,o=[];e.exports=function(e){o?o.push(e):e(r)},n.e(4,function(e){r=n(33);var t=o;o=null;for(var a=0,i=t.length;a<i;a++)t[a](r)})},,function(e,t,n){var r,o=[];e.exports=function(e){o?o.push(e):e(r)},n.e(5,function(e){r=n(35);var t=o;o=null;for(var a=0,i=t.length;a<i;a++)t[a](r)})},,,,function(e,t,n){var r,o=[];e.exports=function(e){o?o.push(e):e(r)},n.e(6,function(e){r=n(39);var t=o;o=null;for(var a=0,i=t.length;a<i;a++)t[a](r)})},,function(e,t,n){var r,o=[];e.exports=function(e){o?o.push(e):e(r)},n.e(7,function(e){r=n(41);var t=o;o=null;for(var a=0,i=t.length;a<i;a++)t[a](r)})},,function(e,t,n){var r,o=[];e.exports=function(e){o?o.push(e):e(r)},n.e(8,function(e){r=n(43);var t=o;o=null;for(var a=0,i=t.length;a<i;a++)t[a](r)})},,,function(e,t,n){var r,o=[];e.exports=function(e){o?o.push(e):e(r)},n.e(9,function(e){r=n(46);var t=o;o=null;for(var a=0,i=t.length;a<i;a++)t[a](r)})},,,,function(e,t,n){var r,o=[];e.exports=function(e){o?o.push(e):e(r)},n.e(10,function(e){r=n(50);var t=o;o=null;for(var a=0,i=t.length;a<i;a++)t[a](r)})}]);