export interface PanelState {
  codeVisible: boolean;
  analysisVisible: boolean;
  diagramVisible: boolean;
}
const DEFAULT_STATE: PanelState = { codeVisible: false, analysisVisible: true, diagramVisible: true };
let state: PanelState = { ...DEFAULT_STATE };
export function getPanelState(): PanelState { return { ...state }; }
export function toggleCodePanel(): boolean { state.codeVisible = !state.codeVisible; return state.codeVisible; }
export function toggleAnalysisPanel(): boolean { state.analysisVisible = !state.analysisVisible; return state.analysisVisible; }
export function resetPanelState(): void { state = { ...DEFAULT_STATE }; }
export function setPanelState(partial: Partial<PanelState>): void { Object.assign(state, partial); }
