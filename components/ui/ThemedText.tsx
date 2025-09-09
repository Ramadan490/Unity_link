import * as React from 'react';
import { Text, TextProps, useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function ThemedText(props: TextProps & { lightColor?: string; darkColor?: string }) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const color = colorScheme === 'dark' ? darkColor ?? theme.text : lightColor ?? theme.text;

  return <Text style={[{ color }, style]} {...otherProps} />;
}
