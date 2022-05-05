import { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import Daily, { DailyEvent, DailyParticipant } from '@daily-co/react-native-daily-js';
import { DailyMediaView } from '@daily-co/react-native-daily-js';

import { getUsers } from './../services';

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

const TextBottom = styled.Text`
  color: #515d71;
  font-size: 12px;
  text-align: left;
  text-transform: capitalize;
`;

const User = styled.View`
  align-items: center;
  background-color: white;
  border-radius: 5px;
  flexDirection: row;
  flexWrap: wrap;
  justifyContent: space-between;
  padding: 10px 20px;
  marginVertical: 5px;
  width: 80%;
`;

const Button = styled.TouchableHighlight`
  paddingVertical: 10;
`;

export default function DashboardScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
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

  useEffect(() => {
    async function fetchUsers() {
      const response = await getUsers();
      setLoading(false);
      setUsers(response);
    }

    if (users.length === 0) {
      setLoading(true);
      const allUsers = fetchUsers();
      return allUsers;
    }
  }, [users]);

  const handleCall = () => {
    
  }

  return (
    <ScrollView>
      <LoginLayout>
        <ImageLogo source={require('./../assets/Rocket.png')} />
        <Title>All users</Title>
        <Subtitle>This test is using fake api to supply the login</Subtitle>
        {loading && (
          <ActivityIndicator size="small" color="#323232" />
        )}
        {participants && participants.map(participant => (
          <DailyMediaView
            videoTrack={participant.videoTrack}
            audioTrack={participant.audioTrack}
            mirror={participant.local}
            zOrder={participant.local ? 1 : 0}
          />
        ))}
        {users.map((user, index) => (
          <User key={`user-${index}`}>
            <TextBottom>{user.name.firstname} {user.name.lastname}</TextBottom>
            <Button onPress={handleCall}>
              <MaterialIcons name="video-call" size={24} color="#3C6973" />
            </Button>
          </User>
        ))}
      </LoginLayout>
    </ScrollView>
  );
}
