import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import {
  Basic,
  Formats,
  CustomThemes,
  InitialLocation,
  Search,
  OpenExternalLink,
  Annotations,
  Bookmarks,
  Toc,
  JavascriptInjection,
} from './examples';

const { Navigator, Screen } = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 16,
  },
  button: {
    padding: 8,
    width: '90%',
    borderBottomColor: '#c0c0c0',
    borderBottomWidth: 2,
  },
});

export const examples = [
  {
    title: 'Basic',
    description: 'The minimum to work.',
    route: 'Basic',
    component: Basic,
  },
  {
    title: 'Formats',
    description:
      'Loading a book of different formats. (opf, epub, base64 and internal)',
    route: 'Formats',
    component: Formats,
  },
  {
    title: 'Custom Themes',
    description: 'Loading a book with custom themes.',
    route: 'Themes',
    component: CustomThemes,
  },
  {
    title: 'Initial Location',
    description: 'Open book in specific location.',
    route: 'InitialLocation',
    component: InitialLocation,
  },
  {
    title: 'Search',
    description: 'Search terms in the book.',
    route: 'Search',
    component: Search,
  },
  {
    title: 'Open External Link',
    description: 'Handle opening external links in epub',
    route: 'OpenExternalLink',
    component: OpenExternalLink,
  },
  {
    title: 'Annotations',
    description: 'Some use cases for text markup',
    route: 'Annotations',
    component: Annotations,
  },
  {
    title: 'Bookmarks',
    description: 'Using bookmarks in the book',
    route: 'Bookmarks',
    component: Bookmarks,
  },
  {
    title: 'Table of Contents',
    description: 'Ordered list of links into the content',
    route: 'TableOfContents',
    component: Toc,
  },
  {
    title: 'Javascript Injection',
    description: 'Inject a script into the open ebook instance',
    route: 'JavascriptInjection',
    component: JavascriptInjection,
  },
];

function Examples() {
  const { navigate } = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {examples.map(({ title, description, route }) => (
        <TouchableOpacity
          style={styles.button}
          key={route}
          onPress={() => navigate(route as never)}
        >
          <Text>{title}</Text>
          <Text>{description}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <PaperProvider theme={MD3LightTheme}>
      <NavigationContainer>
        <Navigator initialRouteName="Examples">
          <Screen
            name="Examples"
            options={{ title: 'Examples' }}
            component={Examples}
          />

          {examples.map(({ title, route, component: Example }) => (
            <Screen
              key={route}
              name={route}
              options={{
                title,
                headerShown: ![
                  'Bookmarks',
                  'TableOfContents',
                  'JavascriptInjection',
                ].includes(route),
              }}
              component={Example}
            />
          ))}
        </Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
