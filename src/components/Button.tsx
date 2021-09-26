import * as React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import StyleGuide from '../theme/StyleGuide';

interface ButtonProps {
  text: string;
  primary?: boolean;
  isLoading?: boolean;
  onPress?: () => void;
}

const Button = ({text, isLoading = false, onPress}: ButtonProps) => {
  return (
    <TouchableOpacity
      testID="button"
      onPress={onPress}
      style={[styles.container, styles.shadow]}
      disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator color={StyleGuide.palette.backgroundPrimary} />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    shadowColor: '#b8b8b8',
    elevation: 5,
  },
  container: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 100,
    width: '80%',
    borderRadius: 50,
    height: 60,
    backgroundColor: StyleGuide.palette.primary,
  },
  text: {
    color: StyleGuide.palette.backgroundPrimary,
    fontSize: 20,
  },
});

export default Button;
