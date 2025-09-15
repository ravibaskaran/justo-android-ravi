import moment from 'moment';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import styles from './styles';

const RouteScreen = (props: any) => {
  const renderItem = (item: any) => {
    return (
      <View style={styles.dataView}>
        {/* <Text style={styles.dataTxt}>{item?.user_name}</Text>
        <Text style={styles.dataTxt}>{item?.customer_name}</Text>
        <Text style={styles.dataTxt}>{item?.total_site_visit}</Text>
        <Text style={styles.dataTxt}>{moment(item.created_date).fromNow()}</Text> */}
        <View style={styles.dataBox}>
          <Text style={styles.dataTxt}>{item?.user_name}</Text>
        </View>
        <View style={styles.dataBox}>
          <Text style={styles.dataTxt}>{item?.customer_name}</Text>
        </View>
        <View style={styles.dataBox}>
          <Text style={styles.dataTxt}>{moment(item.created_date).fromNow()}</Text>
        </View>
      </View>
    );
  };
  return (

    <View style={styles.bottomSection}>
      <View style={styles.headingView}>
        <View style={styles.heddingBox}>
          <Text style={styles.headingText}>Visit creator</Text>
        </View>
        <View style={styles.heddingBox}>
          <Text style={styles.headingText}>Visitor</Text>
        </View>
        <View style={styles.heddingBox}>
          <Text style={styles.headingText}>Check In</Text>
        </View>
      </View>
      <FlatList
removeClippedSubviews={false}
        data={props.cpCheckingList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }: any) => renderItem(item)}
        style={styles.listView}
        refreshing={false}
        onRefresh={() => props.handleGetCpCheckingList(props.keyName === 'first' ? props.todayAppointment : {})}
      />
    </View>
  )
}

export default RouteScreen