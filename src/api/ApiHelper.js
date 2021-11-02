import axios from 'axios';
const BASE_URL = 'https://api.stagingaia.com';
const BASE_URL_STRIPE = 'https://api.stripe.com/v1';
const STRIPE_PUBLISHABLE_KEY =
  'pk_test_51IbuHCL3SLhyon2BLACBp27GY1ecVJhQlbD2DIX7cGCmQWHNayYdJVlP9aXAdMjK6jMKR9VD4HRCAOlGAMQMB8XU005FRCU1zA';

class ApiServices {
  constructor(props) {}

  onLoginApi = (email, password, callback) => {
    let data = JSON.stringify({
      email: email,
      password: password,
    });

    let config = {
      method: 'post',
      url: BASE_URL + '/api/v1/auth/login/customer',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(response => {
        callback({
          isSuccess: true,
          response: response,
        });
      })
      .catch(error => {
        callback({
          isSuccess: false,
          response: error,
        });
      });
  };

  onGetPlan = callback => {
    let config = {
      method: 'get',
      url: BASE_URL + '/api/v1/auth/default_plan?default=1',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then(response => {
        callback({
          isSuccess: true,
          response: response,
        });
      })
      .catch(error => {
        callback({
          isSuccess: false,
          response: error,
        });
      });
  };

  onSignUpApi = (stripeId, data, callback) => {

    let value = JSON.stringify({
      StripeId: stripeId,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      phone: data.phoneNumber,
      username: `${data.firstName} ${data.lastName}`,
      profilePictureURL: '/',
    });

    var config = {
      method: 'post',
      url: BASE_URL + '/api/v1/auth/signup/customer',
      headers: {
        'Content-Type': 'application/json',
      },
      data: value,
    };
    console.log('Cnonfig', config);

    axios(config)
      .then(response => {
        callback({
          isSuccess: true,
          response: response,
        });
      })
      .catch(error => {
        callback({
          isSuccess: false,
          response: error,
        });
      });
  };


  onSignUpPaidApi = (id,stripeId, data, callback) => {

    console.log('Stripe ID',stripeId)
    let value = JSON.stringify({
      "email": data.email,
      "firstName": data.firstName,
      "lastName": data.lastName,
      "password": data.password,
      "username": data.userName,
      "source": id,
      "profilePictureURL": "/abcsghi",
      "StripeId": stripeId
    });

    var config = {
      method: 'post',
      url: BASE_URL + '/api/v1/auth/signup/customer',
      headers: {
        'Content-Type': 'application/json',
      },
      data: value,
    };

    console.log('Cnonfig', config);

    axios(config)
        .then(response => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch(error => {
          callback({
            isSuccess: false,
            response: error,
          });
        });
  };


  getToken = async (cardName, cardNumber, cvc, month, year) => {
    const card = {
      'card[number]': cardNumber.replace(/ /g, ''),
      'card[exp_month]': month,
      'card[exp_year]': year,
      'card[cvc]': cvc,
    };
    console.log('Card', card);
    return await fetch(`${BASE_URL_STRIPE}/tokens`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
      },
      method: 'post',
      body: Object.keys(card)
        .map(key => key + '=' + card[key])
        .join('&'),
    }).then(response => response.json());
  };


  getUserProfile = (token,callback) => {
    var config = {
      method: 'get',
      url: BASE_URL + '/api/v1/users/',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    axios(config)
        .then((response) => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch((error) => {
          callback({
            isSuccess: false,
            response: error,
          });
        });

  }
}

const apiService = new ApiServices();

export default apiService;
