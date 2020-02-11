/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import JoinGame from 'containers/JoinGamePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'http://localhost:4466/bigbadwolf/dev',
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/joinGame" component={JoinGame} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </ApolloProvider>
  );
}
