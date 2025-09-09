import * as React from 'react';
import { View, ViewProps, useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function ThemedView(props: ViewProps & { lightColor?: string; darkColor?: string }) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const backgroundColor =
    colorScheme === 'dark' ? darkColor ?? theme.background : lightColor ?? theme.background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
