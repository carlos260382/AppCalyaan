import OneSignal from 'react-onesignal';

// OneSignal.init({ appId: 'ecf9c95e-5e81-4a43-b8f9-b1bacca3746f' });

export const oneSignals = () => {
	OneSignal.init({ appId: 'ecf9c95e-5e81-4a43-b8f9-b1bacca3746f' });
};
// Example1

// do other stuff

// Example2
// const [initialized, setInitialized] = useState(false);
// OneSignal.init({ appId: 'ecf9c95e-5e81-4a43-b8f9-b1bacca3746f' }).then(() => {
//   setInitialized(true);
//   OneSignal.showSlidedownPrompt().then(() => {
//     // do other stuff
//   });
// })
