/* eslint-disable no-console */
function registerServiceWorker(file) {
  return navigator.serviceWorker.register(file);
}

function SubscribeUserToPush(registration, publicKey) {
  var subscribeOptions = {
    userVisibleOnly: true,
    applicationServerKey: window.urlBase64ToUint8Array(publicKey)
  };
  console.log('Received PushSubscription: ', subscribeOptions);
  return registration.pushManager.subscribe(subscribeOptions).then((pushSubscription) => {
    console.log('Received PushSubscription2: ', JSON.stringify(pushSubscription));
    return pushSubscription;
  });
}


// eslint-disable-next-line no-unused-vars
function create(user) {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    var publicKey = 'BGjdZhE3KbD6QksVK-buZ83zxe_E55iSsibnPXTI541WfSOHxPjgGNg-pnaF_pDWPcUoNNaSrRrA_pb-fmSyvkw';
    // 注册service worker
    return registerServiceWorker('./sw.js').then((registration) => {
        console.log('Service Worker 注册成功');
        // 开启该客户端的消息推送订阅功能
        registration.pushManager.getSubscription()
          .then(function (subscription) {
            var isSubscribed = !(subscription === null);
            if (isSubscribed) {
              return null;
            } else {
              console.log('User is NOT subscribed.');
            }
          });
        return SubscribeUserToPush(registration, publicKey);
      })
      .then((subscription) => {
        if (subscription != null) {
          var body = {
            subscription: subscription,
            user: user
          };
          return body;
        }
        return null;
      })
  }

}
