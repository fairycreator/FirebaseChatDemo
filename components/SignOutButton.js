import { Button } from 'react-native-paper';
import firebase from 'firebase';

const SignOutButton = ({ handleClick }) => {
  const signOut = async () => {
    try {
      await firebase.auth().signOut();
      handleClick();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <Button mode="contained" onPress={signOut}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
