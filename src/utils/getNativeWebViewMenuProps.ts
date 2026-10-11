import type { SuppressMenuItem } from 'react-native-webview/lib/WebViewTypes';
import { shouldUseIosSelectionOverlay } from './shouldUseIosSelectionOverlay';

export const IOS_SUPPRESSED_NATIVE_MENU_ITEMS: SuppressMenuItem[] = [
  'cut',
  'copy',
  'paste',
  'replace',
  'bold',
  'italic',
  'underline',
  'select',
  'selectAll',
  'translate',
  'lookup',
  'share',
];

type MenuItem = {
  key?: string;
  label: string;
};

export function getNativeWebViewMenuProps(
  platform: string,
  menuItems?: MenuItem[]
): {
  menuItems?: { label: string; key: string }[];
  suppressMenuItems?: SuppressMenuItem[];
} {
  if (shouldUseIosSelectionOverlay(platform, menuItems)) {
    return {
      suppressMenuItems: IOS_SUPPRESSED_NATIVE_MENU_ITEMS,
    };
  }

  return {
    menuItems: menuItems?.map((item, key) => ({
      label: item.label,
      key: item.key ?? key.toString(),
    })),
  };
}
