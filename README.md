# react-apollo-demo

A combination of create-react-app, react-router-dom (v4), material-ui (v1 beta), apollo (v2), graphql, express, & mongodb.

## Clone

An existing mongodb instance is required. The connection string is in `/server/server.js 15:1`

```
git clone https://github.com/mattblackdev/react-apollo-demo.git
cd react-apollo-demo
yarn
yarn start
```

## Create React App

The express server is configured to listen on port 3001. If you need to change that, also change CRA's webpack-dev-server proxy config in `package.json`

See [Create React App](https://github.com/facebookincubator/create-react-app) for more info.
