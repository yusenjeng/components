import React from 'react';
import PropTypes from 'prop-types';
import {List, ListSeparator} from '@momentum-ui/react';

import WebexParticipant from '../WebexParticipant/WebexParticipant';
import useParticipants from '../hooks/useParticipants';

/**
 * Displays the roster of Webex meeting or room participants.
 *
 * @param {string} props.location  the roster of Webex meeting or room participants.
 *
 * @returns {object} JSX of the component
 */
export default function WebexParticipantRoster({className, destination}) {
  const [inMeetingParticipants, notInMeetingParticipants] = useParticipants(destination);
  // const participants = useParticipants(destination);

  // const participantList = participants.map((participant) => (
  //   <WebexParticipant personID={participant.personID} key={participant.personID + Math.random()} />
  // ));

  const inMeetingParticipantsList = inMeetingParticipants.map((participant) => (
    <WebexParticipant personID={participant.personID} key={participant.personID + Math.random()} />
  ));

  const notInMeetingParticipantsList = notInMeetingParticipants.map((participant) => (
    <WebexParticipant personID={participant.personID} key={participant.personID + Math.random()} />
  ));

  return (
    <List className={className}>
      <ListSeparator text="In Meeting" textColor="gray" lineColor="gray" />
      {inMeetingParticipantsList}
      <ListSeparator text="Not in Meeting" textColor="gray" lineColor="gray" />
      {notInMeetingParticipantsList}
    </List>
  );
}

WebexParticipantRoster.propTypes = {
  className: PropTypes.string,
  destination: PropTypes.string.isRequired,
};

WebexParticipantRoster.defaultProps = {
  className: '',
};
