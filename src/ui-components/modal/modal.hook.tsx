import React, {useContext} from 'react';
import {ModalContext} from './modal.context';

export function useModal() {
  return useContext(ModalContext);
}
