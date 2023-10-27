import { TextInput } from 'react-native-paper';

const Input = ({ text, setText }) => {
  return (
    <TextInput
      mode="outlined"
      value={text}
      onChangeText={setText}
      placeholder="Type a message..."
      style={{ flex: 1 }}
    />
  );
};

export default Input;
