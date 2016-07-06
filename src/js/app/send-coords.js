'use strict';

import config from '../models/config';

let ajax = Backbone.ajax;
let timer = null;
let connectionCount = 10;

class SendCoordinates {
  constructor() {
    this.init();
  }

  init() {
    if (!connectionCount) {
      return this;
    }

    connectionCount -= 1;
    this.geoLocation = navigator.geolocation;
    this.geoLocationParams = {
      timeout: 30000,
      enableHighAccuracy: true,
      maximumAge: 0
    };
    this.serverID = config.get('serverID');
    this.getPosition();
  }

  getPosition() {
    this.geoLocation.getCurrentPosition(
      this.geoLocationSuccess.bind(this),
      this.geoLocationError.bind(this),
      this.geoLocationParams
    );
    return this;
  }

  geoLocationSuccess(position) {
    let data = {
      lat: position.coords.latitude,
      long: position.coords.longitude
    };
    let id = this.serverID;
    let params = {
      url: `${API_URL}/device/${id}/coords`,
      data: data,
      dataType: 'json',
      type: 'post',
      timeout: 30000
    };

    if (!id) {
      setTimeout(this.init.bind(this), 3000);
      return this;
    }

    ajax(params)
      .done(() => timer = setTimeout(this.getPosition.bind(this), 5000))
      .fail(() => this.ajaxFail.bind(this));
  }

  geoLocationError(e) {
    if (timer) {
      clearTimeout(timer);
    }
    console.log(`code: ${e.code}\n message: ${e.message}`);
    return this;
  }

  ajaxFail() {
    if (!connectionCount) {
      return this;
    }

    connectionCount -= 1;
    this.geoLocationError().getPosition();
  }
}

export default SendCoordinates;
