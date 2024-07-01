import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import styles from './Styles'
import Header from '../../../../components/Header';
import images from '../../../../assets/images';
import strings from '../../../../components/utilities/Localization';
import AppointmentDtailsItem from './AppointmentDtailsItem';
import Button from '../../../../components/Button';
import usePermission from 'app/components/utilities/UserPermissions';

const AppointmentDetailsView = (props: any) => {
    const {status} = usePermission({
        status: 'status_update_appointment _site_visite'
    })
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                headerText={strings.appointmnetdetail}
                leftImageIconStyle={styles.RightFirstIconStyle}
                handleOnLeftIconPress={props.handleBackPress}
                headerStyle={styles.headerStyle}
            />
            <View style={styles.propertyListView}>
                <AppointmentDtailsItem
                    detail={props.appointMentDetail}
                />
            </View>
            {status &&
            props.appointMentDetail?.status === 1 && props?.appointMentDetail?.checkin_status === false ?
                (<View style={styles.bntView}>
                    <Button
                        handleBtnPress={() => props.handleStatusUpdate()}
                        buttonText={strings.Statusupdate} />
                </View>)
                : null
            }
        </View>
    )
}

export default AppointmentDetailsView