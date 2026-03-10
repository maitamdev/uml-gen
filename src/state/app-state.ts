// Application state definition
import { Store } from './store';

export interface AppState {
  currentTab: string;
  isGenerating: boolean;
  isFullscreen: boolean;
  zoomLevel: number;
  provider: string;
  apiKeySet: boolean;
  toastQueue: string[];
  codePanelOpen: boolean;
  locale: string;
}

export const initialState: AppState = {
  currentTab: 'usecase',
  isGenerating: false,
  isFullscreen: false,
  zoomLevel: 100,
  provider: 'huggingface',
  apiKeySet: false,
  toastQueue: [],
  codePanelOpen: false,
  locale: 'vi',
};

export const appStore = new Store<AppState>(initialState);
