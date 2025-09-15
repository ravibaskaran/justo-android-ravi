import moment from "moment";
import React from "react";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";

const SMInfoView = (props: any) => {
    const item = props?.items || {}

    var birthDate = new Date(item.dateofbirth);

    // get difference from current date;
    var difference = Date.now() - birthDate.getTime();

    var ageDate = new Date(difference);
    var calculatedAge: any = Math.abs(ageDate.getUTCFullYear() - 1970);

    return (
        <ScrollView removeClippedSubviews={false}>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Name</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{
                        item.user_name === '' || item.user_name === undefined ||
                            item.user_name === null ? strings.notfount :
                            item.user_name}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Mobile no</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{
                        item.mobile === '' || item.mobile === undefined ||
                            item.mobile === null ? strings.notfount :
                            item.mobile}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Date of Birth</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item.dateofbirth ? moment(item.dateofbirth).format("DD/MM/YYYY") : strings.notfount}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Parent Name</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item.parent_name ? item?.parent_name : strings.notfount}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Created Date</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item.createdDate ? moment(item?.createdDate).format("DD/MM/YYYY") : strings.notfount}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Whatsapp no.</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{
                        item.whatsapp_no === '' || item.whatsapp_no === undefined ||
                            item.whatsapp_no === null ? strings.notfount :
                            item.whatsapp_no}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Email</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{
                        item.email === '' || item.email === undefined ||
                            item.email === null ? strings.notfount :
                            item.email}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Address</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{
                        item.address === '' || item.address === undefined ||
                            item.address === null ? strings.notfount :
                            item.address}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>City</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{
                        item.city === '' || item.city === undefined ||
                            item.city === null ? strings.notfount :
                            item.city}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Age</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{
                        calculatedAge === '' || calculatedAge === undefined ||
                            calculatedAge === null ? strings.notfount :
                            calculatedAge + ' Y'}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Gender</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{
                        item.gender === '' || item.gender === undefined ||
                            item.gender === null ? '' :
                            item.gender === 1 ? strings.male :
                                item.gender === 2 ? strings.female : strings.notfount
                    }</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Aadhaar no.</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{
                        item.adhar_no === '' || item.adhar_no === undefined ||
                            item.adhar_no === null ? strings.notfount :
                            item.adhar_no}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Pancard no.</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{
                        item.pancard_no === '' || item.pancard_no === undefined ||
                            item.pancard_no === null ? strings.notfount :
                            item.pancard_no}</Text>
                </View>
            </View>
        </ScrollView>
    )
}
export default SMInfoView