const apiUrl = 'https://fakestoreapi.com';

const login = async(username, password) => {

  const loginUlr = apiUrl + '/auth/login';
  const options = {
    method: 'POST',
    body: JSON.stringify({
        username: username,
        password: password
    })
  }

  const response = await fetch(loginUlr, options);
  const token = await response.json();

  return token;
}

const signup = async(user) => {

  // email:'John@gmail.com',
  // username:'johnd',
  // password:'m38rmF$',
  // name:{
  //     firstname:'John',
  //     lastname:'Doe'
  // },
  // address:{
  //     city:'kilcoole',
  //     street:'7835 new road',
  //     number:3,
  //     zipcode:'12926-3874',
  //     geolocation:{
  //         lat:'-37.3159',
  //         long:'81.1496'
  //     }
  // },
  // phone:'1-570-236-7033'


  const signupUlr = apiUrl + '/users';
  const options = {
    method: 'POST',
    body: JSON.stringify(user)
  }

  debugger;
  const response = await fetch(signupUlr, options);
  debugger;

  const userResponse = await response.json();

  return userResponse;
}

const getUsers = async( ) => {
  const userUrl = apiUrl + '/users?limit=10';

  const response = await fetch(userUrl);
  const users = await response.json();

  return users;
}
