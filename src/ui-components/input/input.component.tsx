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
import {Eye, EyeOff, Search, SlidersHorizontal} from 'lucide-react-native';
import styles from './input.style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../../helper/colors';

export const Input = ({
  wrapperStyle,
  iconSize = 18,
  type = 'input',
  inputStyles,
  iconStyle,
  showIcon = true,
  inputRef,
  icon,
  filterIcon = false,
  onFilterIconPress,
  onIconPress,
  showCountryCode = true,
  onPressSearch,
  ...node
}: {
  wrapperStyle?: ViewStyle;
  iconSize?: number;
  type?: 'input' | 'search' | 'password' | 'text';
  inputStyles?: TextStyle;
  iconStyle?: TextStyle;
  showIcon?: boolean;
  inputRef?: React.RefObject<TextInput>;
  filterIcon?: boolean;
  icon?: ReactElement;
  onFilterIconPress?: () => void;
  onIconPress?: () => void;
  showCountryCode?: boolean;
  onPressSearch?: () => void;
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

  const onPressFilter = () => {
    if (onFilterIconPress) {
      onFilterIconPress();
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
      {showCountryCode && <Text style={styles.placheholder}>+992 </Text>}
      <TextInput
        {...node}
        autoCapitalize="none"
        secureTextEntry={type === 'password' && !isPasswordVisible}
        style={[{...styles.input, ...inputStyles}]}
        ref={inputRef}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
        onSubmitEditing={onPressSearch}
        placeholderTextColor={colors.gray}
      />
      {showIcon && type === 'search' ? (
        <TouchableOpacity onPress={onPressSearch}>
          <Search style={{marginRight: 5}} size={iconSize} color="#b3b3b3" />
        </TouchableOpacity>
      ) : null}
      {filterIcon ? (
        <TouchableOpacity onPress={onPressFilter}>
          <SlidersHorizontal
            style={{marginRight: 5}}
            size={iconSize}
            color="#b3b3b3"
          />
        </TouchableOpacity>
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
