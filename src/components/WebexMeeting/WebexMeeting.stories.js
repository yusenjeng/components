import React from 'react';
// import React, {useState, useEffect} from 'react';
import {storiesOf} from '@storybook/react';

import jsonData from '../../data';
import {WebexJSONAdapter} from '../../adapters';

import {WebexMeeting, WebexDataProvider} from '..';

const stories = storiesOf('Webex Meeting', module);
const webexAdapter = new WebexJSONAdapter(jsonData);

stories.add('default', () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexMeeting meetingDestination="localMedia" />
  </WebexDataProvider>
));

stories.add('custom controls', () => {
  const controls = (isActive) => {
    if (isActive) {
      return ['mute-audio', 'mute-video', 'leave-meeting'];
    }

    return ['join-meeting'];
  };

  return (
    <WebexDataProvider adapter={webexAdapter}>
      <WebexMeeting meetingDestination="localMedia" controls={controls} />
    </WebexDataProvider>
  );
});

stories.add('custom controls with sharing', () => {
  const controls = (isActive) => {
    if (isActive) {
      return ['mute-audio', 'mute-video', 'share-screen', 'leave-meeting'];
    }

    return ['join-meeting'];
  };

  return (
    <WebexDataProvider adapter={webexAdapter}>
      <WebexMeeting meetingDestination="localMediaWithSharing" controls={controls} />
    </WebexDataProvider>
  );
});

// import WebexSDKAdapter from '../../sdk-adapter';

// const webex = new Webex({
//   credentials: 'YTVlMTA3YmQtMjMyMS00NDA5LTkwZmYtMTBiYmNiZmY5MGQ5MDVkMDFhZTktMTRj_PF84_1eb65fdf-9643-417f-9974-ad72cae0e10f'
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
//       <WebexMeeting meetingDestination="zixxu@cisco.com" controls={controls} />
//     </WebexDataProvider>
//   ) : null;
// });
