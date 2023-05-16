import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';

import { useUser } from '@/context/UserDataProvider';

const MeetPage = () => {
  const router = useRouter();
  const { meetId } = router.query;

  // AS OF NOW DOMAIN WOULD BE JITSI'S AS WE ARE STILL USING THIER SERVERS
  const domain = 'meet.jit.si';
  let api: any = {};

  // GETTING ALL PARTICIPANTS
  const getParticipants = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(api.getParticipantsInfo());
      }, 500);
    });
  };

  // ALL OUR HANDLERS
  const handleClose = () => {
    console.log('handleClose');
    router.push('/dashboard');
  };

  const handleParticipantLeft = async (participant: any) => {
    console.log('handleParticipantLeft', participant);
    await getParticipants();
  };

  const handleParticipantJoined = async (participant: any) => {
    console.log('handleParticipantJoined', participant);
    await getParticipants();
  };

  const handleVideoConferenceJoined = async (participant: any) => {
    console.log('handleVideoConferenceJoined', participant);
    await getParticipants();
  };

  const handleVideoConferenceLeft = () => {
    console.log('handleVideoConferenceLeft');
  };

  // THIS IS TO EXTRACT THE NAME WHICH WAS FILLED IN THE FIRST PAGE
  const { fName: name } = useUser();
  // const name = 'test';
  // INTIALISE THE MEET WITH THIS FUNCTION
  const startMeet = useCallback(() => {
    const options = {
      roomName: meetId,
      width: '100%',
      height: 750,
      configOverwrite: {
        prejoinPageEnabled: false,

        // DEFAULT_LOGO_URL: '/gfx/mylogo.svg',
        disableInviteFunctions: true,
        disablePrejoinPage: true,
        disableProfile: true,
        disableRecordAudioNotification: true,
        disableTranscriptionSubtitles: true,
        enableWelcomePage: false,
        filmStripOnly: true,
        hideConferenceSubject: true,
        hideConferenceTimer: true,
        hideLobbyButton: true,
        hideParticipantsStats: true,
        hideRecordingLabel: true,
        hideVideoQualityLabel: true,
        showBrandWatermark: false,
        showJitsiWatermark: false,

        interfaceConfigOverwrite: {
          SHOW_BRAND_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          SHOW_JITSI_WATERMARK: false,
          SHOW_POWERED_BY: false,
          SHOW_DEEP_LINKING_IMAGE: false,
          SHOW_CHROME_EXTENSION_BANNER: false,
          SHOW_PROMOTIONAL_CLOSE_PAGE: false,
        },
      },

      // VIDEO FRAME WILL BE ADDED HERE
      parentNode: document.querySelector('#jitsi-iframe-container'),
      userInfo: {
        displayName: name,
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    api = new (window as any).JitsiMeetExternalAPI(domain, options);

    api.addEventListeners({
      readyToClose: handleClose,
      participantLeft: handleParticipantLeft,
      participantJoined: handleParticipantJoined,
      videoConferenceJoined: handleVideoConferenceJoined,
      videoConferenceLeft: handleVideoConferenceLeft,
    });
  }, [api]);

  useEffect(() => {
    if ((window as any).JitsiMeetExternalAPI) {
      startMeet();
    } else {
      console.log('JitsiMeetExternalAPI not loaded yet');
      alert('JitsiMeetExternalAPI not loaded yet');
    }
  }, [startMeet]);

  return (
    <>
      <div id="jitsi-iframe-container"></div>
    </>
  );
};

export default MeetPage;
