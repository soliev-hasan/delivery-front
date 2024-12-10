import React, {ReactNode, useState} from 'react';
import {Text, View} from 'react-native';

import {useModal} from '../modal/modal.hook';
import {Button} from '../button/button.component';

export const ConfirmationModalize = ({
  title,
  description,
  mainActionText,
  onConfirm,
  mode = 'danger',
}: {
  title: string;
  description: ReactNode;
  mainActionText: string;
  onConfirm: () => void;
  mode?: 'secondary' | 'danger' | 'success';
}) => {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------

  const modal = useModal();

  // ---------------------------------------------------------------------------

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        height: 250,
        marginTop: 30,
      }}>
      <View style={{marginLeft: 30, marginRight: 30}}>
        <Text
          style={{
            // fontFamily: "SourceSansProBold",
            fontStyle: 'normal',
            color: 'black',
            fontSize: 24,
            lineHeight: 30,
            fontWeight: '500',
          }}>
          {title}
        </Text>
        <View>
          <Text
            style={{
              // fontFamily: "SourceSansPro",
              fontStyle: 'normal',
              color: 'black',
              fontSize: 18,
              lineHeight: 23,
              marginTop: 20,
              fontWeight: '400',
            }}>
            {description}
          </Text>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 40,
          marginRight: 20,
          marginBottom: 16,
        }}>
        <Button children="Отмена" onPress={() => modal.close()} />

        {mode === 'danger' && (
          <Button
            children={mainActionText}
            onPress={() => {
              onConfirm();
              modal.close();
            }}
          />
        )}
        {mode === 'secondary' && (
          <Button
            children={mainActionText}
            onPress={() => {
              onConfirm();
              modal.close();
            }}
          />
        )}
      </View>
    </View>
  );
};
