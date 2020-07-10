import React from 'react';
import {storiesOf} from '@storybook/react';

import jsonData from '../../data';
import {WebexJSONAdapter} from '../../adapters';

import {WebexMeeting, WebexDataProvider} from '..';

const stories = storiesOf('Webex Meeting', module);
const webexAdapter = new WebexJSONAdapter(jsonData);

stories.add('default', () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexMeeting meetingDestination="remote&localMedia" />
  </WebexDataProvider>
));

stories.add('custom controls', () => {
  const controls = (isActive) => (isActive ? ['leave-meeting'] : ['join-meeting']);

  return (
    <WebexDataProvider adapter={webexAdapter}>
      <WebexMeeting meetingDestination="localMedia" controls={controls} />
    </WebexDataProvider>
  );
});

// import WebexSDKAdapter from '@webex/sdk-component-adapter/src';
// import {useEffect, useState} from 'react';

// const webex = new Webex({
//   credentials: 'MGVlMGY0NTEtMjMyZi00YWY5LWE0YmUtMDUzNTZkY2NlM2Y4ZmUxZWY0ZDMtOThj_PF84_1eb65fdf-9643-417f-9974-ad72cae0e10f'
// });

// const webexSDKAdapter = new WebexSDKAdapter(webex);

// stories.add('custom controls with REAL sharing adapter', () => {
//   const [isConnected, setConnected] = useState(false);

//   useEffect(() => {
//     webexSDKAdapter.connect().then(() => setConnected(true));
//   }, []);

//   const controls = (isActive) => {
//     if (isActive) {
//       return ['mute-audio', 'mute-video', 'share-screen', 'leave-meeting'];
//     }

//     return ['join-meeting'];
//   };

//   return isConnected ? (
//     <WebexDataProvider adapter={webexSDKAdapter}>
//       <WebexMeeting meetingDestination="eldritchTest2@gmail.com" controls={controls} />
//     </WebexDataProvider>
//   ) : null;
// });
