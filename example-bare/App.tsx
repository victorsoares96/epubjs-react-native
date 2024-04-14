import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  Basic,
  Formats,
  CustomThemes,
  InitialLocation,
  Search,
  OpenExternalLink,
  Annotations,
  Bookmarks,
  TableOfContents,
  JavascriptInjection,
  Spreads,
  ScrolledDoc,
  ContinuousSpreads,
  ContinuousScrolled,
} from './examples';

const { Navigator, Screen } = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    route: 'CustomThemes',
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
    component: TableOfContents,
  },
  {
    title: 'Javascript Injection',
    description: 'Inject a script into the open ebook instance',
    route: 'JavascriptInjection',
    component: JavascriptInjection,
  },
  {
    title: 'Spreads',
    description:
      'Display an ebook two pages at a time. Sections of the ebook are displayed separately so if a section has a single page or an odd number of pages it will display with a blank page on the right. Use Tablet to see this works.',
    route: 'Spreads',
    component: Spreads,
  },
  {
    title: 'Scrolled Doc',
    description:
      'Displays each "section" or "chapter" of the ebook in its entirety as a single page of variable height that you can scroll up and down.',
    route: 'ScrolledDoc',
    component: ScrolledDoc,
  },
  {
    title: 'Continuous Spreads',
    description:
      'The example is the same as Spreads above except that the entire document is rendered at once without breaks so if a section has one page, the next section is shown beginning on the right-hand-page rather than a blank page.',
    route: 'ContinuousSpreads',
    component: ContinuousSpreads,
  },
  {
    title: 'Continuous Scrolled',
    description:
      'The example is the same as Scrolled Doc except the entire ebook is rendered in the browser at once so there are no navigation links above and below each chapter. This version may take longer to render and uses more memory since the whole ebook is loaded into memory. This version has no links to navigate or jump between chapters.',
    route: 'ContinuousScrolled',
    component: ContinuousScrolled,
  },
];

function Examples() {
  const { navigate } = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      contentContainerStyle={{
        ...styles.container,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      showsVerticalScrollIndicator={false}
    >
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
    </ScrollView>
  );
}

export default function App() {
  return (
    <PaperProvider theme={MD3LightTheme}>
      <SafeAreaProvider>
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
                    'Search',
                    'CustomThemes',
                  ].includes(route),
                }}
                component={Example}
              />
            ))}
          </Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
