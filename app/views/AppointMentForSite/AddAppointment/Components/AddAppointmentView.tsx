import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../../../assets/images';
import Header from '../../../../components/Header';
import strings from '../../../../components/utilities/Localization';
import AddAppointmentItem from './AddAppointmentItem';
import styles from './Styles';

const AddAppointmentView = (props: any) => {
    const insets = useSafeAreaInsets();
    const navigation: any = useNavigation()
    const handleBtnPress = () => {
        navigation.navigate('AppointmentForSite')
    }
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                headerText={props.type === 'edit' ? strings.editNewappointment :
                    props.type === 'reSheduled' ? 'Update Appointment' :
                        strings.addNewappointment}
                leftImageIconStyle={styles.RightFirstIconStyle}
                handleOnLeftIconPress={() => props.handleBackPress()}
                headerStyle={styles.headerStyle}
            />
            <View style={styles.AddAppointmentView}>
                <AddAppointmentItem
                    type={props.type}
                    handleBtnPress={handleBtnPress}
                    appointMentForm={props.appointMentForm}
                    setAppointMentForm={props.setAppointMentForm}
                    getLeadList={props.getLeadList}
                    getPropertyList={props.getPropertyList}
                    leadList={props?.leadList}
                    propertyList={props?.propertyList}
                    onPressAddEdit={props.onPressAddEdit}
                    PropertyStatus={props.PropertyStatus}
                />
            </View>
        </View>
    )
}

export default AddAppointmentView