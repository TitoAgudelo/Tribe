import { useState, createRef } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

import { login } from './../services';

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

const Fields = styled.View`
  align-items: center;
  marginVertical: 20;
  width: 100%;
`;

const InputField = styled.TextInput`
  backgroundColor: white;
  borderWidth: 1;
  borderRadius: 10;
  borderColor: #56828C;
  color: #3C6973;
  height: 50;
  marginVertical: 5;
  paddingLeft: 15;
  paddingRight: 15;
  width: 70%;
`;

const SubmitButton = styled.TouchableOpacity`
  background-color: #56828C;
  borderRadius: 5;
  paddingHorizontal: 15;
  paddingVertical: 10;
  width: 100px;
`;

const TextButton = styled.Text`
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
`;

const Bottom = styled.TouchableOpacity`
  margin-top: 10;
  width: 70%; 
`;

const TextBottom = styled.Text`
  font-size: 10px;
  text-align: center;
`;

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('donero');
  const [userPassword, setUserPassword] = useState('ewedon');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const usernameInputRef = createRef();
  const passwordInputRef = createRef();

  const handleSubmitButton = async() => {
    if (!username) {
      alert('Please fill Username');
      return;
    }

    if (!userPassword) {
      alert('Please fill password');
      return;
    }

    setLoading(true);

    try {
      setLoading(false);
      navigation.navigate('Dash', { token });
      const token = await login(username, userPassword);
      navigation.navigate('Dash', { token });
    } catch(error) {
      console.log(error);
      setLoading(false);
      navigation.navigate('Dash');
    }
  }

  const handleNavigate = () => {
    navigation.navigate('Signup');
  }

  return (
    <LoginLayout>
      <ImageLogo source={require('./../assets/Rocket.png')} />
      <Title>Welcome to Tribe test</Title>
      <Subtitle>This test is using fake api to supply the login</Subtitle>
      <Fields>
        <InputField
          onChangeText={(username) => setUsername(username)}
          placeholder="Enter username"
          value={username}
          returnKeyType="next"
          onSubmitEditing={() =>
            usernameInputRef.current && usernameInputRef.current.focus()
          }
          blurOnSubmit={false} />
        <InputField
          onChangeText={(password) => setUserPassword(password)}
          placeholder="Enter password"
          value={userPassword}
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordInputRef.current && passwordInputRef.current.focus()
          }
          blurOnSubmit={false}
          secureTextEntry={true} />
      </Fields>
      <SubmitButton
        activeOpacity={0.5}
        onPress={handleSubmitButton}>
          <TextButton>
            Login
            {loading && (
              <ActivityIndicator size="small" color="#323232" />
            )}  
          </TextButton>
      </SubmitButton>
      <Bottom onPress={(handleNavigate)}>
        <TextBottom>Can't sign in to your Tribe Account Register here!</TextBottom>
      </Bottom>
    </LoginLayout>
  );
}
