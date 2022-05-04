import axios from 'axios';
const apiUrl = 'https://fakestoreapi.com';

export const login = async(username, password) => {

  const configurationObject = {
    method: 'post',
    url: `${apiUrl}/auth/login`,
    body: JSON.stringify({
      username: username,
      password: password
    })
  };

  try {
    const response = await axios(configurationObject);
    console.log(response.data);
    return response.data;
  } catch(error) {
    console.log(error);
  }

  // const loginUlr = apiUrl + '/auth/login';
  // const options = {
  //   method: 'POST',
  //   body: JSON.stringify({
  //       username: username,
  //       password: password
  //   })
  // }

  // try {
  //   const response = await fetch(loginUlr, options);
  
  //   const token = await response.json();
  
  //   return token;
  // } catch(error) {
  //   return error;
  // }  
}

export const signup = async(user) => {
  const signupUlr = apiUrl + '/users';
  const options = {
    method: 'POST',
    body: JSON.stringify(user)
  }

  try {
    const response = await fetch(signupUlr, options);
    const userResponse = await response.json();
    return userResponse;
  } catch (error) {
    return error;
  }
}

export const getUsers = async( ) => {
  
  const configurationObject = {
    method: 'get',
    url: `${apiUrl}/users?limit=10`,
  };

  try {
    const response = await axios(configurationObject);
    console.log(response.data);
    return response.data;
  } catch(error) {
    console.log(error);
  }
}
