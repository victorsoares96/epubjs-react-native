import {
  getNativeWebViewMenuProps,
  IOS_SUPPRESSED_NATIVE_MENU_ITEMS,
} from './getNativeWebViewMenuProps';

describe('getNativeWebViewMenuProps', () => {
  const items = [{ label: 'Highlight' }, { label: 'Note', key: 'note' }];

  it('omits menuItems on iOS so the WebView does not present a native menu', () => {
    expect(getNativeWebViewMenuProps('ios', items)).toEqual({
      suppressMenuItems: IOS_SUPPRESSED_NATIVE_MENU_ITEMS,
    });
  });

  it('keeps native menuItems on Android', () => {
    expect(getNativeWebViewMenuProps('android', items)).toEqual({
      menuItems: [
        { label: 'Highlight', key: '0' },
        { label: 'Note', key: 'note' },
      ],
    });
  });
});
