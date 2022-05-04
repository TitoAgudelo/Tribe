import { useState, createRef } from 'react';
import styled from 'styled-components/native';

import { signup } from './../services';

const SignupLayout = styled.View`
  alignItems: center;
  flex: 1;
  justifyContent: center;
`;

const ImageLogo = styled.Image`
  height: 70px;
  width: 70px; 
`;

const Title = styled.Text`
  font-size: 16;
  color: #515d71;
  font-weight: bold;
  margin-top: 20;
  margin-bottom: 10;
  text-transform: uppercase;
`;

const Subtitle = styled.Text`
  font-size: 10;
  color: #515d71;
  margin-bottom: 10;
  text-transform: capitalize;
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

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const usernameInputRef = createRef();
  const passwordInputRef = createRef();
  const emailInputRef = createRef();
  const firstnameInputRef = createRef();
  const lastnameInputRef = createRef();
  const addressInputRef = createRef();
  const phoneInputRef = createRef();

  const handleSubmitButton = async() => {
    if (!email) {
      alert('Please fill email');
      return;
    }

    if (!username) {
      alert('Please fill Username');
      return;
    }

    if (!userPassword) {
      alert('Please fill password');
      return;
    }

    if (!firstName) {
      alert('Please fill first name');
      return;
    }

    if (!lastName) {
      alert('Please fill last name');
      return;
    }

    // if (!address) {
    //   alert('Please fill address');
    //   return;
    // }

    if (!phone) {
      alert('Please fill phone');
      return;
    }

    setLoading(true);

    const user = {
      email: email,
      username: username,
      password: password,
      name:{
          firstname: firstName,
          lastname: lastName
      },
      address:{
        city:'kilcoole',
        street:'7835 new road',
        number:3,
        zipcode:'12926-3874',
        geolocation:{
            lat:'-37.3159',
            long:'81.1496'
        }
      },
      phone: phone
    }

    try {
      debugger;
      const userResult = await signup(user);
      debugger;

    } catch(error) {
      console.log(error);
    }
  }

  const validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      setEmail(text);
      return false;
    }
    else {
      setEmail(text);
      console.log("Email is Correct");
    }
  }

  const handleNavigate = () => {
    navigation.navigate('Login');
  }

  return (
    <SignupLayout>
      <ImageLogo source={require('./../assets/Rocket.png')} />
      <Title>Tribe Register Screen</Title>
      <Subtitle>This test is using fake api to supply the register users</Subtitle>
      <Fields>
        <InputField
          onChange={(email) => validate(email)}
          placeholder="Enter email address"
          value={email}
          returnKeyType="next"
          onSubmitEditing={() =>
            emailInputRef.current && emailInputRef.current.focus()
          }
          blurOnSubmit={false}
          autoCapitalize="none"
          keyboardType="email-address" />
        <InputField
          onChange={(first) => setFirstName(first)}
          placeholder="Enter First Name"
          value={firstName}
          returnKeyType="next"
          onSubmitEditing={() =>
            firstnameInputRef.current && firstnameInputRef.current.focus()
          }
          blurOnSubmit={false} />
        <InputField
          onChange={(last) => setLastName(last)}
          placeholder="Enter Last Name"
          value={lastName}
          returnKeyType="next"
          onSubmitEditing={() =>
            lastnameInputRef.current && lastnameInputRef.current.focus()
          }
          blurOnSubmit={false} />
        <InputField
          onChange={(username) => setUsername(username)}
          placeholder="Enter username"
          value={username}
          returnKeyType="next"
          onSubmitEditing={() =>
            usernameInputRef.current && usernameInputRef.current.focus()
          }
          blurOnSubmit={false} />
        <InputField
          onChange={(password) => setUserPassword(password)}
          placeholder="Enter password"
          value={userPassword}
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordInputRef.current && passwordInputRef.current.focus()
          }
          blurOnSubmit={false}
          secureTextEntry={true} />
        {/* <InputField
          onChange={(address) => setAddress(address)}
          placeholder="Enter address"
          value={address}
          returnKeyType="next"
          onSubmitEditing={() =>
            addressInputRef.current && addressInputRef.current.focus()
          }
          blurOnSubmit={false}
          secureTextEntry={true} /> */}
        <InputField
          onChange={(phone) => setPhone(phone)}
          placeholder="Enter phone number"
          value={phone}
          returnKeyType="next"
          onSubmitEditing={() =>
            phoneInputRef.current && phoneInputRef.current.focus()
          }
          blurOnSubmit={false}
          keyboardType="phone-pad" />
      </Fields>
      <SubmitButton
        activeOpacity={0.5}
        onPress={handleSubmitButton}>
          <TextButton>Register</TextButton>
      </SubmitButton>
      <Bottom onPress={(handleNavigate)}>
        <TextBottom>Already have your Tribe Account Login here!</TextBottom>
      </Bottom>
    </SignupLayout>
  );
}
