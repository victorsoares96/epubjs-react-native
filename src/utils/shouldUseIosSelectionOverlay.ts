export function shouldUseIosSelectionOverlay(
  platform: string,
  menuItems?: Array<unknown>
): boolean {
  return platform === 'ios' && Array.isArray(menuItems) && menuItems.length > 0;
}
