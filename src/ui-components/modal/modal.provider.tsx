import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import {ModalContext, ModalContextType, ModalOptions} from './modal.context';
import {Modal} from './modal.component';

export function ModalProvider(props: {children: ReactNode}) {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------

  const [isOpened, setOpened] = useState<boolean>(false);
  const [options, setOptions] = useState<ModalOptions>({});
  // ---------------------------------------------------------------------------
  // memo callbacks
  // ---------------------------------------------------------------------------

  const openFn = useCallback((options?: ModalOptions) => {
    setOpened(true);
    if (options) setOptions(options);
  }, []);

  const closeFn = useCallback(() => {
    options.height = 0;

    setOpened(false);
    setOptions({});
    if (options.onClose) {
      options.onClose();
    }
  }, []);

  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------

  const [value, setValue] = useState<ModalContextType>({
    open: openFn,
    close: closeFn,
    setOptions,
    isOpen: isOpened,
  });

  useEffect(() => {
    setValue({...value, isOpen: isOpened});
  }, [isOpened]);

  // ---------------------------------------------------------------------------
  return (
    <ModalContext.Provider value={value}>
      <Modal isOpened={isOpened} close={closeFn} options={options} />
      {props.children}
    </ModalContext.Provider>
  );
}
