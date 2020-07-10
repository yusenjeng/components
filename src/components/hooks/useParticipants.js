import {useEffect, useContext, useState} from 'react';

import {AdapterContext} from '../../components/';

/**
 * Custom hook that returns a list of participant IDs given a membership ID.
 *
 * @param {string} membershipID  ID of the room/meeting that contains the participants
 * @returns {Array.<Person>} List of the person IDs from the participants
 */
export default function useParticipants(membershipID) {
  // const [participants, setParticipants] = useState([]);
  const [inMeetingParticipants, setInMeetingParticipants] = useState([]);
  const [notInMeetingParticipants, setNotInMeetingParticipants] = useState([]);
  const {membershipsAdapter} = useContext(AdapterContext);

  useEffect(() => {
    const onError = (error) => {
      // setParticipants([]);

      // eslint-disable-next-line no-console
      console.error(error.message);
    };
    const onMembers = (data) => {
      // console.log('[onMember]', data.members);
      setInMeetingParticipants([...data.members.inMeetingMembers]);
      setNotInMeetingParticipants([...data.members.notInMeetingMembers]);
      // setParticipants([...data.members]);
    };

    const subscription = membershipsAdapter.getMembersFromDestination(membershipID).subscribe(onMembers, onError);

    return () => {
      subscription.unsubscribe();
    };
  }, [membershipsAdapter, membershipID]);

  return [inMeetingParticipants, notInMeetingParticipants];
}
