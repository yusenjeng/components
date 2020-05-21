import React, {useEffect, useContext, useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Badge, Spinner, AlertBanner} from '@momentum-ui/react';

import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';
import {useMeeting, useStream} from '../hooks';
import './WebexRemoteMedia.scss';
import {AdapterContext} from '../';

/**
 * Webex Remote Media component displays the meeting's remote video
 *
 * @param {object} props
 * @returns {object} JSX of the component
 *
 * NOTE: waiting for the UX for a design on what to display if there is no remote video
 */
export default function WebexRemoteMedia({className, meetingID}) {
  const {remoteAudio, remoteVideo, remoteShare, error} = useMeeting(meetingID);
  const audioRef = useStream(remoteAudio);
  const videoRef = useStream(remoteVideo);
  const shareRef = useStream(remoteShare);
  const hasMedia = !!(remoteAudio || remoteVideo || remoteShare);
  const mainClasses = {
    [`${WEBEX_COMPONENTS_CLASS_PREFIX}-remote-media`]: true,
    [className]: !!className,
  };

  //
  // To retrieve the UI state of the sharing.
  //
  const {meetingsAdapter} = useContext(AdapterContext);
  const shareControl = meetingsAdapter.meetingControls['share-control'];
  const [shareControlDisplay, setShareControlDisplay] = useState({});
  const isShareControlInactive = shareControlDisplay.state === 'inactive';

  //
  // Switch the visibility of the remoteShare video by its readyState
  //
  const showRemoteShare = () => {
    if (!shareRef.current) {
      return false;
    }

    return shareRef.current.readyState > 1;
  };

  const remoteShareClasses = {
    share: true,
    show: showRemoteShare(),
  };

  useEffect(() => {
    const subscriptionShare = shareControl.display(meetingID).subscribe(setShareControlDisplay);

    return () => {
      subscriptionShare.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //
  // The sharing sender displays the remoteShare stream only.
  // The sharing receiver displays both the remoteShare and the remoteVideo,
  // which is determined by the control action and the stream from adapter.
  //
  return (
    <div className={classNames(mainClasses)}>
      {error ? (
        <AlertBanner show type="warning">
          Having trouble joining the meeting? Please check your connection.
        </AlertBanner>
      ) : (
        <React.Fragment>
          {!hasMedia ? (
            <Badge rounded>
              <Spinner size={16} />
              <div>Connecting</div>
            </Badge>
          ) : null}

          {remoteVideo ? <video ref={videoRef} playsInline autoPlay name="remote-cam" /> : null}

          {remoteShare && isShareControlInactive ? (
            <video ref={shareRef} playsInline autoPlay name="remote-share" className={classNames(remoteShareClasses)} />
          ) : null}

          {remoteAudio ? <audio ref={audioRef} autoPlay /> : null}
        </React.Fragment>
      )}
    </div>
  );
}

WebexRemoteMedia.propTypes = {
  className: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
};

WebexRemoteMedia.defaultProps = {
  className: '',
};
