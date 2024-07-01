import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import styles from './styles';
import strings from '../../../../components/utilities/Localization';
import { BLACK_COLOR, GREEN_COLOR, RED_COLOR, WHITE_COLOR, YELLOW_COLOR } from '../../../../components/utilities/constant';
import images from '../../../../assets/images';
import Button from '../../../../components/Button';

const PendingAgencyListing = (props: any) => {
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.agency + " " + strings.name} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{
            props?.items?.agent_name === null || props?.items?.agent_name === ''
              || props?.items?.agent_name === undefined ?
              strings.notfount :
              props?.items?.agent_name}</Text>
        </View>
      </View>
      <View style={styles.Txtview} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.location} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{
            props?.items?.location === null || props?.items?.location === ''
              || props?.items?.location === undefined ?
              strings.notfount : props?.items?.location
          }</Text>
        </View>
      </View>
      <View style={styles.Txtview} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.RERA + " " + strings.shortNum} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{
            props?.items?.rera_certificate_no === null || props?.items?.rera_certificate_no === ''
              || props?.items?.rera_certificate_no === undefined ?
              strings.notfount :
              props?.items?.rera_certificate_no}</Text>
        </View>
      </View>
      <View style={styles.Txtview} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.total + " " + strings.visit} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{
            props?.items?.total_visit === null || props?.items?.total_visit === ''
              || props?.items?.total_visit === undefined ?
              strings.notfount :
              props?.items?.total_visit}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.total + " " + strings.siteVisit} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{
            props?.items?.total_site_visit === null || props?.items?.total_site_visit === ''
              || props?.items?.total_site_visit === undefined ?
              strings.notfount :
              props?.items?.total_site_visit}</Text>
        </View>
      </View>
      <View style={styles.Txtview} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.total + " " + strings.closeVisit} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{
            props?.items?.total_closing_lead === null || props?.items?.total_closing_lead === ''
              || props?.items?.total_closing_lead === undefined ?
              strings.notfount :
              props?.items?.total_closing_lead}</Text>
        </View>
      </View>
      <View style={styles.Txtview} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.status} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={[styles.nameTxt, {
            color: BLACK_COLOR
          }]}>{props?.items?.active_status ? strings.active : strings.deactive}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          width={78}
          height={30}
          bgcolor={WHITE_COLOR}
          bordercolor={props.items.active_status === false ? GREEN_COLOR : RED_COLOR}
          borderWidth={1}
          btnTxtcolor={props.items.active_status === false ? GREEN_COLOR : RED_COLOR}
          buttonText={props.items.active_status === false ? strings.active : strings.deactive}
          btnTxtsize={14}
          border={10}
          handleBtnPress={() => {
            props.setIsVisible(true)
            props.setStatusChange(props?.items)
          }}
        />
        <TouchableOpacity style={styles.Viewbutton}
          onPress={() => props.onPressView(props.items, 'view')}>
          <Image
            source={images.forwardArrow}
            style={styles.arrow}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PendingAgencyListing;
