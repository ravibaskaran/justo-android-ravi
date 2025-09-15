import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../../../assets/images';
import EmptyListScreen from '../../../../components/CommonScreen/EmptyListScreen';
import Header from '../../../../components/Header';
import strings from '../../../../components/utilities/Localization';
import { PRIMARY_THEME_COLOR } from '../../../../components/utilities/constant';
import AllocateConfirmModal from './AllocateConfirmModal';
import AllowAgencyListing from './AllowAgencyListingItem';
import styles from './styles';

const AllowAgencyView = (props: any) => {
  const loadingref = false
  const [isVisible, setIsVisible] = useState(false)
  const insets = useSafeAreaInsets();
  const navigation: any = useNavigation()
  const onPressView = (data: any) => {
    navigation.navigate('AgencyDetails', { data })
  }
  const onRefresh = () => {
    props.getPendingList()
  }

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        // rightFirstImageScr={images.filter}
        rightSecondImageScr={images.notification}
        headerText={"Allocate CP to SM"}
        handleOnLeftIconPress={props.handleBackPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        barStyle={'light-content'}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <View style={styles.propertyListView}>
        {/* <View style={styles.btnView}>
            <TouchableOpacity 
            onPress={() => null}
            style={[styles.button, { borderColor: BLACK_COLOR, backgroundColor: PRIMARY_THEME_COLOR }]} >
            <Text style={[styles.buttonTxt, {
              color: WHITE_COLOR
            }]}>{strings.addnewagency}</Text>

          </TouchableOpacity>
        </View> */}
        <View style={styles.propertyListViewsec}>
          <FlatList
removeClippedSubviews={false}
            showsVerticalScrollIndicator={false}
            data={Array.isArray(props?.pendingAgency) ? props?.pendingAgency : []}
            ListEmptyComponent={<EmptyListScreen message={strings.agency} />}
            renderItem={({ item }) => <AllowAgencyListing
              items={item} setIsVisible={setIsVisible}
              onPressView={onPressView}
              setStatusChange={props.setStatusChange}
            />}
            refreshing={loadingref}
            onRefresh={() => onRefresh()}
          />
        </View>
      </View>
      <AllocateConfirmModal
        Visible={isVisible}
        setIsVisible={setIsVisible}
        stringshow={strings.confirmation}
        textshow={strings.allocateSMAlert}
        confirmtype={'CONFIRMATION'}
        setStatusChange={props.setStatusChange}
        statusChange={props.statusChange}
        getPendingList={props.getPendingList}
        handleYesResponse={() => props.handleUpdateAssignCP(props.statusChange)}
      />
    </View>
  );
};

export default AllowAgencyView;
