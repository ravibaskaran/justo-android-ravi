import { View, FlatList, } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PendingAgencyList from './PendingAgencyListItem';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../../components/Header';
import images from '../../../../assets/images';
import strings from '../../../../components/utilities/Localization'
import ConfirmModal from '../../../../components/Modals/ConfirmModal';
import { PRIMARY_THEME_COLOR } from '../../../../components/utilities/constant';
import EmptyListScreen from 'app/components/CommonScreen/EmptyListScreen';



const PendingAgencyView = (props: any) => {
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
        headerText={strings.pendingconfirm}
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
            showsVerticalScrollIndicator={false}
            data={Array.isArray(props?.pendingAgency) ? props?.pendingAgency : []}
            ListEmptyComponent={<EmptyListScreen message={strings.pendingconfirm} />}
            renderItem={({ item }) => <PendingAgencyList
              items={item} setIsVisible={setIsVisible}
              onPressView={onPressView}
              setStatusChange={props.setStatusChange}
            />}
            refreshing={loadingref}
            onRefresh={() => onRefresh()}
          />
        </View>
      </View>
      <ConfirmModal
        Visible={isVisible}
        setIsVisible={setIsVisible}
        stringshow={strings.confirmation}
        textshow={
          `${strings.activeconfirmation} ${strings.cpCapital}?`
        }
        confirmtype={'CONFIRMATION'}
        setStatusChange={props.setStatusChange}
        handleYesResponse={() => props.handleUpdateAssignCP(props.statusChange)}
      />
    </View>
  );
};

export default PendingAgencyView;
