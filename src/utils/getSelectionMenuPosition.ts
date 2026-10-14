export type SelectionRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type SelectionMenuPlacement = 'above' | 'below';

export function getSelectionMenuPosition(
  selection: SelectionRect | null,
  menuSize: { width: number; height: number },
  viewport: { width: number; height: number },
  gap = 8
): { top: number; left: number; placement: SelectionMenuPlacement } {
  const menuWidth = Math.min(
    menuSize.width,
    Math.max(0, viewport.width - gap * 2)
  );
  const menuHeight = menuSize.height;

  if (!selection) {
    return {
      top: gap,
      left: Math.max(gap, (viewport.width - menuWidth) / 2),
      placement: 'below',
    };
  }

  const centeredLeft = selection.x + selection.width / 2 - menuWidth / 2;
  const maxLeft = Math.max(gap, viewport.width - menuWidth - gap);
  const left = Math.min(Math.max(gap, centeredLeft), maxLeft);

  const aboveTop = selection.y - menuHeight - gap;
  if (aboveTop >= gap) {
    return { top: aboveTop, left, placement: 'above' };
  }

  const belowTop = selection.y + selection.height + gap;
  const maxTop = Math.max(gap, viewport.height - menuHeight - gap);

  return {
    top: Math.min(belowTop, maxTop),
    left,
    placement: 'below',
  };
}
