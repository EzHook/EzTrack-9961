import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigator/RootNavigator';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import {API_URL, API_TOKEN} from "@env";

const client = new ApolloClient({
  uri:API_URL,
  headers: {'Authorization':API_TOKEN},
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    // @ts-ignore - TailwindProvider is missing type definition
    <ApolloProvider client={client}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ApolloProvider>
      
  );
}


