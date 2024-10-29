import { View, Text, StatusBar, Image, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import Header from '../../../../components/Header'
import { PRIMARY_THEME_COLOR, PRIMARY_THEME_COLOR_DARK, TABBAR_COLOR, WHITE_COLOR } from '../../../../components/utilities/constant'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import images from '../../../../assets/images'
import strings from '../../../../components/utilities/Localization'
import { normalizeSpacing } from "../../../../components/scaleFontSize";
import styles from './styles'
import AgentDetailInfo from './AgentDetailInfo'
import AgentDetailStats from './AgentDetailStats'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import moment from 'moment'


const PropertyDetailView = (props: any) => {
  const data = props?.allDetails || {};

  const layout = useWindowDimensions();
  const [indexData, setIndexData] = useState({
    index: 0,
    routes: [
      { key: 'first', title: strings.info },
      { key: 'second', title: strings.stats },
    ],
  });
  // console.log("🚀 ~ file: AgentDetailView.tsx:30 ~ data?.active_status:", data)
  const DATAINFO: any =
  {
    active_status: data?.active ? data?.active : false,
    AgentName: data?.agent_name ? data?.agent_name : '',
    agency_name: data?.agency_name ? data?.agency_name : '',
    Mobileno: data?.primary_mobile ? data?.primary_mobile : '',
    Email: data?.email ? data?.email : '',
    whatsappno: data?.whatsapp_number ? data?.whatsapp_number : '',
    rerano: data?.rera_certificate_no ? data?.rera_certificate_no : '',
    aadharno: data?.adhar_no ? data?.adhar_no : '',
    pancardno: data?.pancard_no ? data?.pancard_no : '',
    location: data?.location ? data?.location : '',
    workingfrom: data?.createdDate ? moment(data?.createdDate).format('MMM Do YYYY') : '',
    workinglocation: data?.working_location ? data?.working_location : '',
    account_no: data?.cp_bank_detail?.account_no ? data?.cp_bank_detail?.account_no : '',
    bank_name: data?.cp_bank_detail?.bank_name ? data?.cp_bank_detail?.bank_name : '',
    branch_name: data?.cp_bank_detail?.branch_name ? data?.cp_bank_detail?.branch_name : '',
    ifsc_code: data?.cp_bank_detail?.ifsc_code ? data?.cp_bank_detail?.ifsc_code : '',
    base_url: data?.base_url ? data?.base_url : '',
    rera_certificate: data?.rera_certificate ? data?.rera_certificate : '',
    propidership_declaration_letter: data?.propidership_declaration_letter ? data?.propidership_declaration_letter : '',
    cancel_cheaque: data?.cp_bank_detail?.cancel_cheaque ? data?.cp_bank_detail?.cancel_cheaque : '',
    comp_account_no: data?.agencies?.agency_bank_detail?.account_no ? data?.agencies?.agency_bank_detail?.account_no : '',
    comp_bank_name: data?.agencies?.agency_bank_detail?.bank_name ? data?.agencies?.agency_bank_detail?.bank_name : '',
    comp_branch_name: data?.agencies?.agency_bank_detail?.branch_name ? data?.agencies?.agency_bank_detail?.branch_name : '',
    comp_ifsc_code: data?.agencies?.agency_bank_detail?.ifsc_code ? data?.agencies?.agency_bank_detail?.ifsc_code : '',
    declaration_letter_of_company: data?.agencies?.declaration_letter_of_company ? data?.agencies?.declaration_letter_of_company : '',
    // pancard: data?.agencies?.pancard ? data?.agencies?.pancard : '',
    pancard: data?.pancard ? data?.pancard : '',
    cp_type: data?.cp_type ? data?.cp_type : 1,
    property_tag: data?.property_tag ? data?.property_tag : [],
    cp_id: props?._id ? props?._id : "",
    pin_code:data?.pin_code? data?.pin_code:""
  };
  const DATASTATS: any =
  {
    closingper: data?.agent_stats?.total_closing_percentage,
    visitor: data?.agent_stats?.total_visit,
    siteVisit: data?.agent_stats?.total_site_visit,
    closeVisit: data?.agent_stats?.total_closing_lead,
    lastlogin: data?.agent_stats?.last_login ?
      moment(data?.agent_stats?.last_login).format('llll') : '',
    lastvisit: data?.agent_stats?.last_lead_crate ?
      moment(data?.agent_stats?.last_lead_crate).format('llll') : '',
    lastsitevisit: data?.agent_stats?.last_site_visit ?
      moment(data?.agent_stats?.last_site_visit).format('llll') : '',
    lastclosevisit: data?.agent_stats?.last_closing_lead ?
      moment(data?.agent_stats?.last_closing_lead).format('llll') : '',
  };
  const FirstRoute = () => (
    <AgentDetailInfo items={DATAINFO} />
  );

  const SecondRoute = () => (
    <AgentDetailStats items={DATASTATS} />
  );

  const renderScene = ({ index, route, }: any) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute />;
      case 'second':
        return <SecondRoute />;
    }
  };
  const handleIndexChange = (index: any) => {
    setIndexData({
      index: index, routes: [
        { key: 'first', title: strings.info },
        { key: 'second', title: strings.stats },
      ],
    })
  }

  const renderTabBar = (props: any) => (

    <TabBar
      activeColor={TABBAR_COLOR}
      //inactiveColor={'#F4F4F4'} 
      {...props}
      indicatorStyle={{ borderWidth: 2, borderColor: TABBAR_COLOR }}
      style={{ backgroundColor: PRIMARY_THEME_COLOR_DARK }} />

  );



  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.Agencydetail}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.leftImageIconStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={'light-content'}
      />
      <View style={styles.propertyListView}>

        <TabView
          renderTabBar={renderTabBar}
          initialLayout={{ width: layout.width }}
          navigationState={indexData}
          renderScene={({ index, route }: any) => renderScene({ index, route })}
          onIndexChange={handleIndexChange}
        />
      </View>
    </View>
  )
}

export default PropertyDetailView