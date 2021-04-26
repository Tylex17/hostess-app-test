import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  tableRow: {
    flexDirection: 'column',
    flex: 1,
    alignSelf: 'stretch',
  },
  tableWrapper: {
    flexDirection: 'row',
  },
  errorWrapper: {
    backgroundColor: 'red',
    padding: 6,
  },
  errorText: {
    color: 'white',
  },
  tableHeaderRow: {
    backgroundColor: 'white',
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  tableHeaderCeil: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
  },
  tableCeil: {
    borderWidth: 1,
    borderColor: 'black',
    alignSelf: 'stretch',
    padding: 5,
  },
  upPercentText: {
    color: 'green',
  },
  downPercentText: {
    color: 'red',
  },
});
