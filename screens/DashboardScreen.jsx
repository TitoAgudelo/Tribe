import { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
// import Daily from '@daily-co/react-native-daily-js';
// import { DailyMediaView } from '@daily-co/react-native-daily-js';

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
    // Start joining a call
    // const call = Daily.createCallObject();
    // call.join({ url: 'https://tribeexercise.daily.co/daily' });
  }

  return (
    <LoginLayout>
      <ImageLogo source={require('./../assets/Rocket.png')} />
      <Title>All users</Title>
      <Subtitle>This test is using fake api to supply the login</Subtitle>
      {loading && (
        <ActivityIndicator size="small" color="#323232" />
      )}
      {users.map(user => (
        <User>
          <TextBottom>{user.name.firstname} {user.name.lastname}</TextBottom>
          <Button onPress={handleCall}>
            <MaterialIcons name="video-call" size={24} color="#3C6973" />
          </Button>
        </User>
      ))}
    </LoginLayout>
  );
}
