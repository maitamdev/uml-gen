// State selectors - derived state accessors
import { appStore } from './app-state';

export const selectCurrentTab = () => appStore.getState().currentTab;
export const selectIsGenerating = () => appStore.getState().isGenerating;
export const selectIsFullscreen = () => appStore.getState().isFullscreen;
export const selectZoomLevel = () => appStore.getState().zoomLevel;
export const selectProvider = () => appStore.getState().provider;
export const selectApiKeySet = () => appStore.getState().apiKeySet;
export const selectLocale = () => appStore.getState().locale;
export const selectCodePanelOpen = () => appStore.getState().codePanelOpen;
