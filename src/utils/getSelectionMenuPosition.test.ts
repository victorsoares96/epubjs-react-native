import { getSelectionMenuPosition } from './getSelectionMenuPosition';

const menuSize = { width: 180, height: 44 };
const viewport = { width: 390, height: 700 };

describe('getSelectionMenuPosition', () => {
  it('places the menu above the selection when there is room', () => {
    const position = getSelectionMenuPosition(
      { x: 100, y: 200, width: 80, height: 20 },
      menuSize,
      viewport
    );

    expect(position.placement).toBe('above');
    expect(position.top).toBe(200 - 44 - 8);
    expect(position.left).toBe(100 + 40 - 90);
  });

  it('places the menu below the selection when it would overflow the top', () => {
    const position = getSelectionMenuPosition(
      { x: 40, y: 10, width: 60, height: 18 },
      menuSize,
      viewport
    );

    expect(position.placement).toBe('below');
    expect(position.top).toBe(10 + 18 + 8);
  });

  it('clamps the menu inside the viewport horizontally', () => {
    const nearRightEdge = getSelectionMenuPosition(
      { x: 360, y: 200, width: 20, height: 20 },
      menuSize,
      viewport
    );
    const nearLeftEdge = getSelectionMenuPosition(
      { x: 4, y: 200, width: 10, height: 20 },
      menuSize,
      viewport
    );

    expect(nearRightEdge.left).toBe(viewport.width - menuSize.width - 8);
    expect(nearLeftEdge.left).toBe(8);
  });

  it('falls back to the top of the viewport without a selection rect', () => {
    const position = getSelectionMenuPosition(null, menuSize, viewport);

    expect(position.placement).toBe('below');
    expect(position.top).toBe(8);
    expect(position.left).toBe((viewport.width - menuSize.width) / 2);
  });

  it('keeps the menu inside a viewport smaller than the menu', () => {
    const position = getSelectionMenuPosition(
      { x: 10, y: 20, width: 30, height: 16 },
      { width: 200, height: 44 },
      { width: 80, height: 90 }
    );

    expect(position.left).toBe(8);
    expect(position.top).toBeGreaterThanOrEqual(8);
    expect(position.top + 44).toBeLessThanOrEqual(90);
  });
});
