import React, {useEffect, useRef, useState} from 'react';
import {ModalOptions} from './modal.context';
import {Modalize} from 'react-native-modalize';
import {Keyboard, Platform, Dimensions} from 'react-native';

export function Modal({
  isOpened,
  close,
  options,
}: {
  isOpened: boolean;
  close: () => void;
  options: ModalOptions;
}) {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------
  const ref = useRef<Modalize>(null);
  const [modalHeight, setModalHeight] = useState<number | undefined>(
    options.height ?? 250,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ---------------------------------------------------------------------------
  // effects
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (!ref.current || !isOpened) {
      if (options?.onClose) {
        options.onClose();
      }
      setIsModalOpen(false);
      return;
    } else {
      ref.current.open();
      setIsModalOpen(true);
    }
  }, [ref.current, isOpened, options]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      event => {
        setModalHeight(options.keyboard);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      () => {
        if (isModalOpen) {
          setModalHeight(options.height ?? 350);
        }
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [isModalOpen]);

  // useEffect(() => {
  //   if (modalHeight === 0) {
  //     close()
  //   }
  // }, [modalHeight, close])

  useEffect(() => {
    if (isOpened) {
      setModalHeight(options.height ?? 350);
    }
  }, [isOpened, options]);

  // ---------------------------------------------------------------------------

  if (isOpened) {
    return (
      <Modalize
        snapPoint={options.snapPoint}
        ref={ref}
        modalHeight={modalHeight}
        handleStyle={{backgroundColor: 'white'}}
        scrollViewProps={{scrollEnabled: options.scrolling}}
        modalStyle={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
        closeOnOverlayTap={options.closeOnOverlayTap}
        onBackButtonPress={() => {
          options.height = 0;
          setTimeout(() => {
            close();
          }, 300);

          return true;
        }}
        onOverlayPress={() => {
          options.height = 0;
          setTimeout(() => {
            close();
          }, 300);
        }}
        withOverlay={true}
        {...options.styles}>
        {options.component}
      </Modalize>
    );
  } else {
    return <></>;
  }
}
