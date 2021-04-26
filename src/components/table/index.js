import React, {useCallback} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import styles from './styles';

export const QuoteTable = ({
  headers,
  rows,
  data = {},
  error = '',
  isLoading,
}) => {
  const renderHeader = useCallback(() => {
    return (
      <View style={styles.tableHeaderRow}>
        {headers.map((header, index) => (
          <View style={styles.tableHeaderCeil} key={`${header}_${index}`}>
            <Text>{header}</Text>
          </View>
        ))}
      </View>
    );
  }, [headers]);

  const renderError = useCallback(() => {
    return error ? (
      <View style={styles.errorWrapper}>
        <Text style={styles.errorText}>Ошибка: {error}</Text>
      </View>
    ) : null;
  }, [error]);

  const renderRow = useCallback(
    ({item}) => {
      return (
        <View style={styles.tableRow}>
          <View style={styles.tableCeil}>
            <Text>{item}</Text>
          </View>
          <View style={styles.tableCeil}>
            <Text>{data[item]?.last}</Text>
          </View>
          <View style={styles.tableCeil}>
            <Text>{data[item]?.highestBid}</Text>
          </View>
          <View style={styles.tableCeil}>
            <Text
              style={
                data[item]?.percentChange >= 0
                  ? styles.upPercentText
                  : styles.downPercentText
              }>
              {data[item]?.percentChange}
            </Text>
          </View>
        </View>
      );
    },
    [data],
  );

  const keyExtractor = useCallback(item => item, []);

  return (
    <>
      {renderError()}
      {isLoading && !rows.length ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <View style={styles.tableWrapper}>
          {renderHeader()}
          <FlatList
            data={rows}
            renderItem={renderRow}
            // maxToRenderPerBatch={5}
            keyExtractor={keyExtractor}
            horizontal={true}
            bounces={false}
          />
        </View>
      )}
    </>
  );
};
