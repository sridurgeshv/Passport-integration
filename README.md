# Integrating Immutable Passport into your Application

This comprehensive guide will walk you through step-by-step on how to integrate Immutable Passport into your application for user authentication and blockchain transactions.

## Introduction

Immutable Passport allows you to easily implement login, account creation and blockchain transactions in your application. Users can use their existing Immutable X account to login seamlessly. 

In this guide, we will be:

- Creating a simple React application from scratch
- Registering the application with Immutable Developer Hub 
- Installing and initializing the Passport client in our React app
- Implementing login and logout functionality using Passport
- Displaying user information (ID token, access token, nickname) after login
- Initiating a sample blockchain transaction via Passport

## Step 1 - Creating a Simple React Application

To facilitate the integration of Immutable Passport, we must first establish a basic React application. This can be achieved by creating a new project directory or cloning a repository of a suitable application for the purpose of showcasing Immutable Passport integration. 

To proceed, navigate to the desired directory for your application and create a new directory named "passport-app."

```
npx create-react-app my-passport-app
cd my-passport-app
npm start
```

This will generate a barebones React app in a folder called `my-passport-app`. Navigating inside the folder and running `npm start` will start the dev server on port 3000.

## Step 2 - Registering your Application 

Head over to the [Immutable Developer Hub](https://hub.immutable.com/) and signup if you haven't already. Click on "Register New App" and fill in the details:

- **Name** - My Passport App 
- **Description** - A test app to demo Immutable Passport
- **Redirect URIs** - http://localhost:3000

Copy the **Client ID** that is generated, we will need it later.

## Step 3 - Installing the Passport Client

We now need to install the Passport client library:

```
npm install @imtbl/passport-client
```

This will install the official Passport client package into our React app.

## Step 4 - Initializing the Passport Client

Open `src/index.js` and import and initialize the Passport client:

```js
import { Client } from '@imtbl/passport-client';

const passport = new Client({
  clientId: 'YOUR_CLIENT_ID' // from Developer Hub
});
```

This will instantiate the Passport client which we can then use for login and transactions.

## Step 5 - Logging in a User with Passport

To login a user, call the `login()` method on the Passport client:

```js
const login = async () => {
  try {
    const { idToken, accessToken } = await passport.login();  

    // Save tokens to state

  } catch(error) {
    // Handle error
  }
}
```

This will open the Passport login popup for the user to login with their Immutable X account. On successful login it will return the idToken and accessToken.

## Displaying on the app the id token, access token obtained from authenticating with Passport after login, and the user's nickname.

After login, we can display the user's info:

```jsx
const checkLoginStatus = setInterval(async () => {
      if (newWindow.closed) {
        clearInterval(checkLoginStatus);
        try {
          const { idToken, accessToken, userInfo } = await passport.checkLogin();

          // Display user information
          document.getElementById('idToken').innerText = `ID Token: ${idToken}`;
          document.getElementById('accessToken').innerText = `Access Token: ${accessToken}`;
          document.getElementById('nickname').innerText = `Nickname: ${userInfo.nickname}`;
          
        } catch (error) {
          // Handle login error
          console.error('Login error:', error);
        }
      }
    }, 1000);
```

The user's nickname, wallet address and other info is available in `userInfo` object.

## Step 6 - Implementing Logout

To log the user out, call the `logout()` method:

```js
const logout = async () => {
  await passport.logout();
  
  // Clear saved tokens
}
```

This will log the user out of their Passport session.

## Step 7 - Initiating a Transaction

To initiate a transaction from Passport, you can use the following code:

```js
const transaction = await passport.requestTransaction({
  type: 'send_string',
  data: {
    string: 'Hello World'
  } 
});

console.log(transaction.id); // Transaction hash
```

This will initiate a sample transaction to send a string "Hello World" and return the transaction id.

## Conclusion

You have successfully integrated Immutable Passport into your application, allowing users to authenticate, initiate transactions, and securely interact with the Immutable blockchain designed for gaming. For more information and detailed options, refer to the [Immutable Passport documentation](https://docs.immutable.com/docs/zkevm/products/passport/)

## Example Application
For a working sample application demonstrating Immutable Passport integration,The application is accessible at the following link \
[Application Link](https://calculator-9bbfd.web.app/)
