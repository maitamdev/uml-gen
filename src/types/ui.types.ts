// UI Component type definitions
export interface TabItem {
  type: string;
  label: string;
  icon: string;
  active: boolean;
}

export interface DropdownOption {
  value: string;
  label: string;
  icon?: string;
  description?: string;
  disabled?: boolean;
}

export interface ModalConfig {
  title: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
  type: 'info' | 'warning' | 'error' | 'success';
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface ScrollPosition {
  x: number;
  y: number;
  direction: 'up' | 'down';
}
