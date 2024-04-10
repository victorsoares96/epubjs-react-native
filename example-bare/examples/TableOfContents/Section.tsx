/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { Section as SectionType } from '@epubjs-react-native/core';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconButton, MD3Colors, Text } from 'react-native-paper';

interface Props {
  searchTerm: string;
  isCurrentSection: boolean;
  section: SectionType;
  onPress: (section: SectionType) => void;
}

function Section({ searchTerm, isCurrentSection, section, onPress }: Props) {
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  const parts = section.label.split(regex);
  return (
    <TouchableOpacity
      key={section.id}
      style={styles.container}
      onPress={() => onPress(section)}
    >
      <View style={styles.icon}>
        <IconButton
          icon="bookmark"
          size={20}
          iconColor={
            isCurrentSection ? MD3Colors.primary50 : MD3Colors.neutralVariant30
          }
        />

        {/* <Text style={styles.bookmarkLocationNumber} variant="labelSmall">
          {location}
        </Text> */}
      </View>

      <View style={styles.info}>
        {!searchTerm && (
          <Text
            style={{
              ...styles.name,
              color: isCurrentSection
                ? MD3Colors.primary50
                : MD3Colors.neutralVariant50,
            }}
          >
            {section?.label}
          </Text>
        )}

        {searchTerm && (
          <Text
            style={{
              ...styles.name,
              color: isCurrentSection
                ? MD3Colors.primary50
                : MD3Colors.neutralVariant50,
            }}
          >
            {parts.filter(String).map((part, index) => {
              return regex.test(part) ? (
                <Text style={styles.highlight} key={`${index}-part-highlight`}>
                  {part}
                </Text>
              ) : (
                <Text key={`${index}-part`}>{part}</Text>
              );
            })}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    width: '85%',
  },
  chapter: { marginBottom: 2 },
  name: { fontStyle: 'italic' },
  highlight: { backgroundColor: 'yellow' },
});

export default Section;
