import React from 'react';
import { View, Text } from 'react-native';

const Chat = ({ chat }) => {
  return (
    <View style={{ padding: 10, margin: 5, backgroundColor: '#e0e0e0', borderRadius: 5 }}>
      <Text>{chat.text}</Text>
    </View>
  );
};

export default Chat;
