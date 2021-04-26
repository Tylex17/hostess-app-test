import {StyleSheet} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  navContainer: {
    borderTopColor: 'gray',
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 5,
    paddingBottom: isIphoneX() ? 20 : 5,
  },
  navButton: {
    alignItems: 'center',
  },
  navIcon: {
    height: 24,
    width: 24,
  },
  navText: {
    fontSize: 12,
  },
});
