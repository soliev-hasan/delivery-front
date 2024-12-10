import React, {createContext} from 'react';
import {TStyle} from 'react-native-modalize/lib/options';

export type ModalOptions = {
  component?: React.ReactNode;
  closeOnOverlayTap?: boolean;
  onClose?: () => void;
  height?: number;
  scrolling?: boolean;
  snapPoint?: number;
  keyboard?: number;
  styles?: {
    rootStyle?: TStyle;
    modalStyle?: TStyle;
    overlayStyle?: TStyle;
    childrenStyle?: TStyle;
  };
};

export type ModalContextType = {
  open(options?: ModalOptions): void;
  close(): void;
  setOptions(options: ModalOptions): void;
  isOpen: boolean;
};

export const ModalContext = createContext<ModalContextType>({
  open() {},
  close() {},
  setOptions() {},
  isOpen: false,
});
