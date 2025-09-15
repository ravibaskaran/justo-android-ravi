import usePermission from '../../../../components/utilities/UserPermissions';
import React from 'react';
import { View } from 'react-native';
import images from '../../../../assets/images';
import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import strings from '../../../../components/utilities/Localization';
import AppointmentDtailsItem from './AppointmentDtailsItem';
import styles from './Styles';

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