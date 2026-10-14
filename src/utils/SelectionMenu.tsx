import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
} from 'react-native';
import {
  getSelectionMenuPosition,
  type SelectionRect,
} from './getSelectionMenuPosition';

type MenuItem = {
  key?: string;
  label: string;
};

type Props = {
  items: MenuItem[];
  selection: SelectionRect | null;
  viewport: { width: number; height: number };
  onLayoutMenu?: (size: { width: number; height: number }) => void;
  onPressItem: (label: string) => void;
};

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    maxWidth: '92%',
    borderRadius: 10,
    backgroundColor: '#2c2c2e',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  items: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  item: {
    minHeight: 44,
    minWidth: 44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  itemPressed: {
    opacity: 0.7,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  separator: {
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginVertical: 8,
    width: StyleSheet.hairlineWidth,
  },
});

export function SelectionMenu({
  items,
  selection,
  viewport,
  onLayoutMenu,
  onPressItem,
}: Props) {
  const [menuSize, setMenuSize] = React.useState({ width: 0, height: 44 });
  const position = getSelectionMenuPosition(selection, menuSize, viewport);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (width === menuSize.width && height === menuSize.height) {
      return;
    }
    setMenuSize({ width, height });
    onLayoutMenu?.({ width, height });
  };

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <View
        onLayout={handleLayout}
        pointerEvents="auto"
        style={[styles.menu, { top: position.top, left: position.left }]}
      >
        <ScrollView
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.items}
        >
          {items.map((item, index) => (
            <React.Fragment key={item.key ?? `${item.label}-${index}`}>
              {index > 0 && <View style={styles.separator} />}
              <Pressable
                accessibilityRole="button"
                onPress={() => onPressItem(item.label)}
                style={({ pressed }) => [
                  styles.item,
                  pressed && styles.itemPressed,
                ]}
              >
                <Text style={styles.label}>{item.label}</Text>
              </Pressable>
            </React.Fragment>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
