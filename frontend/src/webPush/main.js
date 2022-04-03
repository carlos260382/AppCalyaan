const PUBLIC_VAPID_KEY = "BGE7BGaHbDaBTnUaBbWKdUVzFxmXjHR0d_TjDaYcenNzbcWdYku85Cm294PUrzQgfsJqklJpEzdyjtL3HpKV1hY";

export const subscription = async () => {
  // Service Worker
  console.log("Registering a Service worker");
  const register = await navigator.serviceWorker.register("http://localhost:3000/worker.js", {
    scope: "/"
  });
  console.log("New Service Worker");

  // Listen Push Notifications
  console.log("Listening Push Notifications");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
  });

  console.log('esta es la subscription', subscription);

  // Send Notification
  await fetch("http://localhost:5000/pushRouter/subscription", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json"
    }
  });
  console.log("Subscribed!");
};

export function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// UI
// const form = document.querySelector('#myform');
// const message = document.querySelector('#message');
// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   fetch('/pushRouter/new-message', {
//     method: 'POST',
//     body: JSON.stringify({message: message.value}),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
//   form.reset();
// });

// Service Worker Support
// if ("serviceWorker" in navigator) {
//   subscription().catch(err => console.log(err));
// }
