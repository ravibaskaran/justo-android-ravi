import React from "react";
import { View, Text, Image } from 'react-native';
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import { PRIMARY_THEME_COLOR, PRIMARY_THEME_COLOR_DARK, RED_COLOR, ROLE_IDS, WHITE_COLOR } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import BookingDetailsIteam from './BookingDetailsIteam'
import CancelModal from "./CancelBooking";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ReAllocateModal from "./ReAllocate";
import usePermission from "app/components/utilities/UserPermissions";
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import ErrorMessage from "app/components/ErrorMessage";

const BookingDetailsView = (props: any) => {
    const getLoginType = useSelector((state: any) => state.login);
    const { response = {}, detail = "" } = useSelector((state: any) => state.booking)
    const detailData = response?.data?.length > 0 ? response?.data[0] : {}
    const navigation: any = useNavigation()
    const onPressBookNow = () => {
        navigation.navigate('Booking', {
            getBookingData: response?.data?.length > 0 ?
                response?.data[0] : {}, type: 'readyToBook'
        })
    }
    const OpenDoc = async (url: any) => {
        function getUrlExtension(url: any) {
            return url.split(/[#?]/)[0].split(".").pop().trim();
        }
        const extension = getUrlExtension(url);
        const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;
        const options = {
            fromUrl: url,
            toFile: localFile,
        };
        RNFS.downloadFile(options)
            .promise.then(() => FileViewer.open(localFile))
            .then((e) => {
                // success
            })
            .catch((error) => {
                // error
                ErrorMessage({
                    msg: error?.message,
                    backgroundColor: RED_COLOR
                })
            });
    };
    const { status, create, approve, allocate } = usePermission({
        status: 'add_followup',
        create: getLoginType?.response?.data?.role_id === ROLE_IDS.postsales_id || getLoginType?.response?.data?.role_id === ROLE_IDS.sitehead_id ? 'register_now' : 'book_now',
        approve: 'booking _cancel ',
        allocate: props?.type === 'register' ? 'registration_reallocate' : 're_Allocate'
    })
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                headerText={
                    (getLoginType?.response?.data?.role_id === ROLE_IDS.postsales_id || getLoginType?.response?.data?.role_id === ROLE_IDS.sitehead_id)
                        && props?.type === 'register' ?
                        strings.registerDetails :
                        strings.bookingDetails}
                leftImageIconStyle={styles.RightFirstIconStyle}
                handleOnLeftIconPress={props.handleBackPress}
                headerStyle={styles.headerStyle}
                statusBarColor={PRIMARY_THEME_COLOR}
                barStyle={'light-content'}
            />
            <View style={styles.detailsItemView}>
                <BookingDetailsIteam
                    OpenDoc={OpenDoc}
                    item={[detailData]}
                    type={props?.type} />
            </View>
            <View style={{
                flexDirection: 'row', flexWrap: 'wrap',
                justifyContent: 'center',
            }}>
                <View style={styles.btnContainer}>
                    {/* Status Update (Follow-Up) */}
                    {status ?
                        getLoginType?.response?.data?.role_id != ROLE_IDS.postsales_id || getLoginType?.response?.data?.role_id != ROLE_IDS.sitehead_id ?
                            <>
                                {props?.type === 'readyToBook' ?
                                    <View style={styles.buttonVw}>
                                        <Button
                                            buttonText={strings.Statusupdate}
                                            width={150}
                                            height={45}
                                            bgcolor={PRIMARY_THEME_COLOR_DARK}
                                            btnTxtcolor={WHITE_COLOR}
                                            btnTxtsize={12}
                                            textTransform={"uppercase"}
                                            handleBtnPress={() => props.handleStatusUpdate()}
                                        />
                                    </View> : null
                                }
                            </>
                            : null
                        : null
                    }
                    {/* Cancel Booking */}
                    {/* {approve &&
                        ((props?.type !== 'register' && detailData?.leads?.lead_status !== 5) &&
                            detailData?.booking_status !== 4 ?
                            <View style={styles.buttonVw}>
                                <Button
                                    buttonText={strings.cancelBooking}
                                    width={150}
                                    height={45}
                                    bgcolor={PRIMARY_THEME_COLOR_DARK}
                                    btnTxtcolor={WHITE_COLOR}
                                    btnTxtsize={14}
                                    textTransform={"uppercase"}
                                    handleBtnPress={() => props.setCancelBookingModel(true)}
                                />
                            </View> : null)
                    } */}
                </View>
                <View style={styles.btnContainer}>
                    {/* RE-Allocate */}
                    {allocate &&
                        ((getLoginType?.response?.data?.role_id === ROLE_IDS.postsales_id || getLoginType?.response?.data?.role_id === ROLE_IDS.sitehead_id) &&
                            props?.type === 'readyToBook' ?
                            <View style={styles.buttonVw}>
                                <Button
                                    buttonText={strings.reAllocate}
                                    handleBtnPress={() => props.setReAllocateModel(true)}
                                    bgcolor={PRIMARY_THEME_COLOR_DARK}
                                    width={150}
                                    height={45}
                                />
                            </View> : null)
                    }
                    {/* Registration Now */}
                    {create &&
                        ((getLoginType?.response?.data?.role_id === ROLE_IDS.postsales_id || getLoginType?.response?.data?.role_id === ROLE_IDS.sitehead_id)
                            && props?.type === 'request' &&
                            detailData?.leads?.lead_status !== 5 &&
                            detailData?.booking_status !== 4
                            ?
                            <View style={styles.buttonVw}>
                                <Button
                                    buttonText={strings.registerNow}
                                    handleBtnPress={() => props.handleRegister()}
                                    bgcolor={PRIMARY_THEME_COLOR_DARK}
                                    width={150}
                                    height={45}
                                />
                            </View> : null)
                    }
                </View>
                <View style={styles.btnContainer}>
                    {/* Book Now */}
                    {create ?
                        props?.type === 'readyToBook' ?
                            <View style={styles.buttonVw}>
                                <Button
                                    buttonText={'Book Now'}
                                    handleBtnPress={() => onPressBookNow()}
                                    bgcolor={PRIMARY_THEME_COLOR_DARK}
                                    width={150}
                                    height={45}
                                />
                            </View>
                            : null
                        : null
                    }
                </View>
            </View>
            <CancelModal
                cancelDataPress={props.cancelBookingPress}
                Visible={props.cancelBookingModel}
                setIsVisible={props.setCancelBookingModel}
                cancelValue={props.cancelValue}
                item={response?.data?.length > 0 ? response?.data : []}
                setCancelValue={props.setCancelValue}
            />
            <ReAllocateModal
                Visible={props.reAllocateModel}
                setIsVisible={props.setReAllocateModel}
                reAllocateData={props.reAllocateData}
                setReAllocateData={props.setReAllocateData}
            />
        </View>
    )
}
export default BookingDetailsView