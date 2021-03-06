'use strict';

export default function registerPushwooshIOS(
  callback,
  success,
  error
) {
	let pushNotification = cordova.require('pushwoosh-cordova-plugin.PushNotification');

	// set push notification callback before we initialize the plugin
	document.addEventListener('push-notification', callback, false);

	// initialize the plugin
	pushNotification.onDeviceReady({
		pw_appid: '69FF7-FF417'
	});

	// register for pushes
	pushNotification.registerDevice(
		status => {
      success(status.deviceToken);
      console.warn('registerDevice: ' + status.deviceToken);
    },
		status => {
      error(status);
      console.warn('failed to register : ' + JSON.stringify(status));
    }
  );

	// reset badges on start
	pushNotification.setApplicationIconBadgeNumber(0);
}
