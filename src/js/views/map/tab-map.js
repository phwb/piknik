'use strict';

import {confirm} from'../../app/helpers';

let params = {
  timeout: 30000,
  enableHighAccuracy: true,
  maximumAge: 0
};
let {$} = Backbone;
let watchMe = false;

class TabMap extends Backbone.View {
  initialize() {
    let $watchMe = $('#watch-me');
    $watchMe.click(function (e) {
      e.preventDefault();
      watchMe = !watchMe;
      $watchMe[ watchMe ? 'addClass' : 'removeClass' ]('svg-yellow');
    });
    $watchMe[ watchMe ? 'addClass' : 'removeClass' ]('svg-yellow');

    this.map = null;
    this.placemark = null;
    this.watchID = null;
  }

  render(ymaps) {
    if (!ymaps) {
      return this;
    }
    const TILES_PATH = 'img/tiles';

    let layer = new ymaps.Layer(`${TILES_PATH}/%z/tile-%x-%y.png`, {
      tileTransparent: true
    });
    let state = {
      center: [60.9708073341092, 69.065791475563],
      zoom: 18,
      controls: ['zoomControl'],
      type: 'yandex#map'
    };
    let options = {
      maxZoom: 18,
      minZoom: 16/*,
      restrictMapArea: [
        [60.96672412905306, 69.04853950717921],
        [60.97489001322183, 69.08304344394678]
      ]*/
    };
    let map = new ymaps.Map(this.el, state, options);
    map.layers.add(layer);
    map.copyrights.add('&copy; ugraweb.ru');

    this.map = map;
    this.ymaps = ymaps;

    this
      ._drawPolygons()
      ._setPosition();
  }

  _drawPolygons() {
    if (this.collection.length) {
      this.collection.each(this._drawPolygon, this);
    }

    return this;
  }

  _drawPolygon(model) {
    let coords = model.get('polygon');
    if (coords.length) {
      let ymaps = this.ymaps;
      let polygon = new ymaps.Polygon([coords], {}, {
        fillOpacity: 0,
        fillColor: '#ff0000',
        strokeWidth: 0
      });
      polygon.events.add('click', function () {
        confirm({
          title: 'Информация',
          message: `${model.get('name')}. Перейти к расписанию?`,
          buttons: ['Нет', 'Да'],
          callback: function (index) {
            if (index > 1 || index === true) {
              $(document).trigger('page:load', model.get('id'));
            }
          }
        });
      });
      this.map.geoObjects.add(polygon);
    }
  }

  _setPosition() {
    this.watchID = navigator.geolocation
      .getCurrentPosition(
        this._geolocationSuccess.bind(this),
        this._geolocationError.bind(this),
        params
      );
    return this;
  }

  _geolocationSuccess(position) {
    let map = this.map;
    let coords = [
      position.coords.latitude,
      position.coords.longitude
    ];
    let placemark = new this.ymaps.Placemark(coords, {}, {
      preset: 'islands#geolocationIcon'
    });

    map.geoObjects.add(placemark);
    // map.setCenter(coords);

    this.placemark = placemark;
    this.watchID = navigator.geolocation
      .watchPosition(
        this._geolocationUpdate.bind(this),
        this._geolocationError.bind(this),
        params
      );
  }

  _geolocationUpdate(position) {
    if (!this.placemark) {
      return this;
    }
    let coords = [position.coords.latitude, position.coords.longitude];
    this.placemark.geometry.setCoordinates(coords);
    if (watchMe) {
      this.map.setCenter(coords);
    }
  }

  _geolocationError(e) {
    console.log(`\ncode: ${e.code} \nmessage: ${e.message}`);
    if (this.watchID) {
      navigator.geolocation.clearWatch(this.watchID);
    }
    return this;
  }
}

export default TabMap;
