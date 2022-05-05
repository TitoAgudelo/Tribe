import { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import Daily, { DailyEvent, DailyParticipant } from '@daily-co/react-native-daily-js';
import { DailyMediaView } from '@daily-co/react-native-daily-js';


const Title = styled.Text`
  font-size: 18;
  color: #515d71;
  font-weight: bold;
  margin-top: 30;
  margin-bottom: 10;
  text-transform: uppercase;
`;

const Subtitle = styled.Text`
  font-size: 12;
  color: #515d71;
  margin-top: 10;
  margin-bottom: 20;
  text-transform: capitalize;
`;

const LoginLayout = styled.View`
  alignItems: center;
  flex: 1;
  justifyContent: center;
`;

const ImageLogo = styled.Image`
  height: 100px;
  width: 100px; 
`;

export default function RoomScreen({ navigation }) {
  const call = Daily.createCallObject();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    call.join({ url: 'https://tribeexercise.daily.co/daily' });

    const events = [
      'participant-joined',
      'participant-updated',
      'participant-left',
    ];

    for (const event of events) {
      call.on(event, setParticipantsFromCallObject);
    }

    return () => {
      for (const event of events) {
        call.off(event, setParticipantsFromCallObject);
      }
      call.leave();
    };
  }, []);

  function setParticipantsFromCallObject() {
    setParticipants(Object.values(call.participants()));
  }

  return (
    <LoginLayout>
      <ImageLogo source={require('./../assets/Rocket.png')} />
      <Title>Room Screen</Title>
      <Subtitle>This test is using daily co to allow WebRTC video calls</Subtitle>
      {participants && participants.map((participant, index) => (
        <DailyMediaView
          videoTrack={participant.videoTrack}
          audioTrack={participant.audioTrack}
          mirror={participant.local}
          zOrder={participant.local ? 1 : 0}
          key={index}
        />
      ))}
    </LoginLayout>
  );
}
