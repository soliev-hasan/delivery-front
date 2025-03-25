import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import notifee, {AndroidImportance} from '@notifee/react-native';

const Test = () => {
  const sendNotification = async () => {
    await notifee.requestPermission(); // Запрос разрешения (на всякий случай)

    await notifee.displayNotification({
      title: 'Тестовое уведомление',
      body: 'Это уведомление появилось при нажатии на кнопку!',
      android: {
        channelId: 'default',
        smallIcon: 'ic_launcher', // Проверь, что иконка есть в drawable
        importance: AndroidImportance.HIGH,
      },
    });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={sendNotification}
        style={{
          backgroundColor: 'blue',
          padding: 15,
          borderRadius: 10,
        }}>
        <Text style={{color: 'white', fontSize: 16}}>
          Отправить уведомление
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Test;
