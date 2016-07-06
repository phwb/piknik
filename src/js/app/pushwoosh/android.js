'use strict';

export default function registerPushwooshAndroid(
  callback,
  success = token => console.warn('push token: ' + token),
  error = status => console.warn(JSON.stringify(['failed to register ', status]))
) {
	let pushNotification = cordova.require('pushwoosh-cordova-plugin.PushNotification');

  // set push notifications handler
  document.addEventListener('push-notification', callback, false);

  // initialize Pushwoosh with projectid: 'GOOGLE_PROJECT_ID', appid : 'PUSHWOOSH_APP_ID'. This will trigger all pending push notifications on start.
	pushNotification.onDeviceReady({
		projectid: '55128747657',
		pw_appid: '8BD9C-7AA16'
	});

	// register for push notifications
	pushNotification.registerDevice(success, error);
}
