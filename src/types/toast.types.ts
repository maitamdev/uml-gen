// Toast notification type definitions
export type ToastType = 'success' | 'error' | 'info' | 'warning';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface ToastConfig {
  message: string;
  type: ToastType;
  duration?: number;
  position?: ToastPosition;
  dismissible?: boolean;
  icon?: string;
  action?: ToastAction;
}

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastState {
  id: string;
  config: ToastConfig;
  visible: boolean;
  progress: number;
  createdAt: number;
}
