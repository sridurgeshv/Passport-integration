Here is a guide on how to integrate Immutable Passport into an application:

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
First, we need a simple React app to integrate Passport into. Let's create one using Create React App:

```
npx create-react-app my-passport-app
cd my-passport-app
npm start
```

This will generate a barebones React app in a folder called `my-passport-app`. Navigating inside the folder and running `npm start` will start the dev server on port 3000.

## Step 2 - Registering your Application 

Head over to the [Immutable Developer Hub](https://developer.immuble.com) and signup if you haven't already. Click on "Register New App" and fill in the details:

- **Name** - My Passport App 
- **Description** - A test app to demo Immutable Passport
- **Redirect URIs** - http://localhost:3000

Copy the **Client ID** that is generated, we will need it later.
