import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import styles from './styles';

export const Footer = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.navContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const label = options.tabBarLabel
          ? options.tabBarLabel
          : options.title
          ? options.title
          : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            onPress={onPress}
            key={route.key}
            style={styles.navButton}>
            <Image
              source={options.icon}
              style={[styles.navIcon, {tintColor: isFocused ? 'red' : 'black'}]}
            />
            <Text
              style={[styles.navText, {color: isFocused ? 'red' : 'black'}]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
