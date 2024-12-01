import React, {ReactElement, useState} from 'react';
import {
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {Eye, EyeOff, Search} from 'lucide-react-native';
import styles from './input.style';

export const Input = ({
  wrapperStyle,
  iconSize = 18,
  type = 'input',
  inputStyles,
  iconStyle,
  showIcon = true,
  inputRef,
  icon,
  onIconPress,
  ...node
}: {
  iconSize?: number;
  inputStyles?: TextStyle;
  wrapperStyle?: ViewStyle;
  iconStyle?: TextStyle;
  type?: 'input' | 'search' | 'password' | 'text';
  showIcon?: boolean;
  inputRef?: React.RefObject<TextInput>;
  icon?: ReactElement;
  onIconPress?: () => void;
} & TextInputProps) => {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isInputFocused, setInputFocused] = useState(false);

  // ---------------------------------------------------------------------------
  // functions
  // ---------------------------------------------------------------------------

  const handleIconPress = () => {
    setPasswordVisible(!isPasswordVisible);
    if (onIconPress) {
      onIconPress();
    }
  };

  // ---------------------------------------------------------------------------

  return (
    <View
      style={[
        styles.inputWrapper,
        wrapperStyle,
        isInputFocused ? styles.focusedInput : {},
      ]}>
      <Text style={styles.placheholder}>+992 </Text>
      <TextInput
        {...node}
        autoCapitalize="none"
        secureTextEntry={type === 'password' && !isPasswordVisible}
        style={[{...styles.input, ...inputStyles}]}
        ref={inputRef}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
      />
      {showIcon && type === 'search' ? (
        <Search style={{marginRight: 5}} size={iconSize} color="#b3b3b3" />
      ) : null}
      {type === 'password' && isInputFocused ? (
        <TouchableWithoutFeedback onPress={handleIconPress}>
          <View style={styles.eyeIcon}>
            {isPasswordVisible ? (
              <EyeOff color="#8592AA" />
            ) : (
              <Eye color="#8592AA" />
            )}
          </View>
        </TouchableWithoutFeedback>
      ) : null}
    </View>
  );
};
