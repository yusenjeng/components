import React from 'react';
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
