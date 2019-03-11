import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import apolloClient from './graphql';
import TaskBoard from './components/TaskBoard';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <TaskBoard />
      </ApolloProvider>
    );
  }
}

export default App;
