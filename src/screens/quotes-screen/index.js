import React, {useEffect, useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {observer} from 'mobx-react';
import store from '../../store';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import {useInterval} from '../../utils/hooks';
import {postData} from '../../api/quotes';
import {sendTotalCounts} from '../../api/quotes';

export const QuotesScreen = observer(({}) => {
  const {quoteStore} = store;

  const [count, setCount] = useState('');

  useEffect(() => {
    quoteStore.getData();
  }, []);

  useEffect(() => {
    setCount(String(quoteStore.data.total));
    console.warn('persist', quoteStore.localRequests);
  }, [quoteStore.data]);

  useInterval(
    () =>
      !quoteStore.net && quoteStore.localRequests.length && sendTotalCounts(),
    9000,
  );
  return (
    <SafeAreaView style={styles.screenWrapper}>
      <View style={styles.screenWrapper}>
        <Text style={{fontSize: 20}}>{quoteStore.data.name}</Text>
        <Text style={{fontSize: 20}}>{quoteStore.data.total}</Text>
        <TextInput
          style={{
            width: 200,
            height: 50,
            borderWidth: 1,
            borderColor: '#000',
            color: '#000',
          }}
          onChangeText={text => setCount(text)}
          value={count}
        />
        <Button title="Отправить" onPress={() => postData(count)} />
        <Button title="Включить" onPress={() => quoteStore.setNet(true)} />
        <Button title="Выключить" onPress={() => quoteStore.setNet(false)} />
      </View>
    </SafeAreaView>
  );
});
