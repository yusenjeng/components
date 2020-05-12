import React from 'react';
import {storiesOf} from '@storybook/react';

import jsonData from '../../data';
import {WebexJSONAdapter} from '../../adapters';
// import WebexSDKAdapter from '../../sdk-adapter';

// const webex = new Webex({
//   credentials: 'ZDAzNDdkZmItMGZkNC00OTY1LTkyNDYtYjQ5MDg4YzU5MjdkOTg5NzAzYzEtZGE5_PF84_1eb65fdf-9643-417f-9974-ad72cae0e10f'
// });

import {WebexMeeting, WebexDataProvider} from '..';

const stories = storiesOf('Webex Meeting', module);
const webexAdapter = new WebexJSONAdapter(jsonData);
// const webexSDKAdapter = new WebexSDKAdapter(webex);

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
      return ['mute-audio', 'mute-video', 'start-share', 'leave-meeting'];
    }

    return ['join-meeting'];
  };

  return (
    <WebexDataProvider adapter={webexAdapter}>
      <WebexMeeting meetingDestination="localMediaSender" controls={controls} />
    </WebexDataProvider>
  );
});

// stories.add('custom controls with REAL sharing adapter', () => {
//   const controls = (isActive) => {
//     if (isActive) {
//       return ['mute-audio', 'mute-video', 'start-share', 'leave-meeting'];
//     }

//     return ['join-meeting'];
//   };

//   return (
//     <WebexDataProvider adapter={webexSDKAdapter}>
//       <WebexMeeting meetingDestination="zixxu@cisco.com" controls={controls} />
//     </WebexDataProvider>
//   );
// });
