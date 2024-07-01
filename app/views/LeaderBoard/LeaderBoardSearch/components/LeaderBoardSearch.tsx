import React from "react";
import { View, Text, Image, FlatList } from 'react-native';
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import DropdownInput from "../../../../components/DropDown";
import Header from "../../../../components/Header";
import { normalize } from "../../../../components/scaleFontSize";
import { PRIMARY_THEME_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import LeaderBoardCPItems from '../components/LeaderBoardCPItems'
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";

const LeaderBoardSearchView = (props: any) => {
    return (
        <View style={styles.mainContainer}>
            <Header
                headerText={strings.leaderBoardHeader}
                headerStyle={styles.headerStyle}
                headerTextStyle={styles.headerTextStyle}
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                RightSecondIconStyle={{ tintColor: WHITE_COLOR }}
                leftImageIconStyle={{ tintColor: WHITE_COLOR }}
                handleOnLeftIconPress={props.onPressBack}
                barStyle={'light-content'}
                statusBarColor={PRIMARY_THEME_COLOR}
            />
           {/* <View style={styles.topItemsVw}>
                <DropdownInput
                    placeholder={'Select Cp Name'}
                    data={[]}
                    inputWidth={'100%'}
                    paddingLeft={16}
                    maxHeight={300}
                    // onFocus={() => handleMasterDatas()}
                    labelField="user_name"
                    valueField={'_id'}
                    // value={formData?.sourcing_manager}
                    onChange={(item: any) => {
                        // props.setFormData({
                        //     ...props.formData,
                        //     sourcing_manager: item._id,
                        // })
                    }}
                    newRenderItem={(item: any) => {
                        return (
                            <>
                                <View style={Styles.item}>
                                    <Text style={Styles.textItem}>{item.user_name}</Text>
                                </View>
                            </>
                        );
                    }}
                />
                <View style={{ marginTop: normalize(30) }}>
                    <Button
                        width={300}
                        buttonText={strings.search}
                        handleBtnPress={() => { }}
                    />
                </View>
            </View> */}
            <Text style={styles.headTxt}>{props?.leaderBoardDetail?.property_title}</Text>
            <View style={{ flex: 2.5 }}>
                <View style={styles.IteamView}>
                    <Text style={[styles.txtStyle, {
                        color: PRIMARY_THEME_COLOR,
                    }]}>CP Name</Text>
                    <Text style={[styles.txtStyle, {
                        color: PRIMARY_THEME_COLOR,
                    }]}>CP Rank</Text>
                    <Text style={[styles.txtStyle, {
                        color: PRIMARY_THEME_COLOR,
                    }]}>Sold</Text>
                </View>
                <FlatList
                    data={props?.leaderBoardDetail?.property_allocateds &&
                        Array.isArray(props?.leaderBoardDetail?.property_allocateds) ?
                        props?.leaderBoardDetail?.property_allocateds : []}
                    ListEmptyComponent={
                        <EmptyListScreen
                            styled={{ alignItems: 'center', marginTop: normalize(60) }}
                            message={'CP'} />}
                    renderItem={({ item, index }) => {
                        return (
                            <LeaderBoardCPItems
                                items={item}
                                indexs={index}
                                userDataResp={props?.userDataResp}
                                onPressView={() => props.handleView()}
                            />
                        )
                    }}
                />
            </View>
        </View>
    )
}
export default LeaderBoardSearchView