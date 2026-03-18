export interface DragState { isDragging: boolean; startX: number; startY: number; currentX: number; currentY: number; }
export function createDragState(): DragState {
  return { isDragging: false, startX: 0, startY: 0, currentX: 0, currentY: 0 };
}
export function startDrag(state: DragState, x: number, y: number): void {
  state.isDragging = true; state.startX = x; state.startY = y; state.currentX = x; state.currentY = y;
}
export function updateDrag(state: DragState, x: number, y: number): { dx: number; dy: number } {
  state.currentX = x; state.currentY = y;
  return { dx: x - state.startX, dy: y - state.startY };
}
export function endDrag(state: DragState): void { state.isDragging = false; }
