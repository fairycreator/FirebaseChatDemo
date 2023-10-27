import { Button } from 'react-native-paper';

const SendButton = ({ handleChat }) => {
  return (
    <Button mode="contained" onPress={handleChat}>
      Send
    </Button>
  );
};

export default SendButton;
