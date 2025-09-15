import moment from "moment";
import React from "react";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { BLACK_COLOR, GRAY_LIGHT_COLOR } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";

const SMInfoView = (props: any) => {
    const item = props?.items || {}
    const allocate_cp = item?.allocate_cp?.length > 0 ? item?.allocate_cp : []
    var birthDate = new Date(item.dateofbirth);
    // get difference from current date;
    var difference = Date.now() - birthDate.getTime();
    var ageDate = new Date(difference);
    var calculatedAge: any = Math.abs(ageDate.getUTCFullYear() - 1970);

    return (
        <ScrollView>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Full Name</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item.user_name ? item.user_name : strings.notfount}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Mobile no</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item.mobile ? item.mobile : strings.notfount}</Text>
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
                    <Text style={styles.nameTxt}>{item.whatsapp_no && item.whatsapp_no !== "null" ? item.whatsapp_no : strings.notfount}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Email</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item.email ? item.email : strings.notfount}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Address</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item.address ? item.address : strings.notfount}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>City</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item.city ? item.city : strings.notfount}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Age</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{calculatedAge ? calculatedAge + ' Y' : strings.notfount}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Gender</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item.gender ? item.gender === 1 ? strings.male :
                        item.gender === 2 ? strings.female : strings.notfount : strings.notfount}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Aadhaar no.</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item.adhar_no ? item.adhar_no : strings.notfount}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Pancard no.</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item.pancard_no ? item.pancard_no : strings.notfount}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Area</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item.area ? item.area : strings.notfount}</Text>
                </View>
            </View>
            <View style={[styles.Txtview, styles.allocatsVw]}>
                <Text style={[styles.projectTxt, { color: BLACK_COLOR }]}>Allocated CP</Text>
            </View>
            <View style={styles.allocatsBox}>
                {allocate_cp?.length > 0 ?
                    <>
                        {allocate_cp?.map((item: any, index: any) => {
                            return (
                                <View style={styles.innerBoxVw}>
                                    <Text style={{ color: GRAY_LIGHT_COLOR }}>{item.user_name}</Text>
                                    {/* <TouchableOpacity>
                                        <Image
                                            source={images.close}
                                            style={styles.crossVw}
                                        />
                                    </TouchableOpacity> */}
                                </View>
                            )
                        })}
                    </> : <Text style={styles.noSelectedTxt}>{strings.noCpSelected}</Text>
                }
            </View>
        </ScrollView>
    )
}
export default SMInfoView