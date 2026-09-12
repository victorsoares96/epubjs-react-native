import { shouldUseIosSelectionOverlay } from './shouldUseIosSelectionOverlay';

describe('shouldUseIosSelectionOverlay', () => {
  it('is true only on iOS when custom menu items exist', () => {
    expect(shouldUseIosSelectionOverlay('ios', [{ label: 'Highlight' }])).toBe(
      true
    );
  });

  it('is false on Android even with menu items', () => {
    expect(
      shouldUseIosSelectionOverlay('android', [{ label: 'Highlight' }])
    ).toBe(false);
  });

  it('is false when the caller wants the native menu or no menu', () => {
    expect(shouldUseIosSelectionOverlay('ios')).toBe(false);
    expect(shouldUseIosSelectionOverlay('ios', [])).toBe(false);
  });
});
