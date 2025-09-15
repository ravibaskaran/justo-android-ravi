import React from "react";
import { FlatList, View } from 'react-native';
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import EmptyListScreen from "../../../../components/CommonScreen/EmptyListScreen";
import Header from "../../../../components/Header";
import InputField from "../../../../components/InputField";
import { normalize } from "../../../../components/scaleFontSize";
import { PRIMARY_THEME_COLOR } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import LeaderBoardItems from './LeaderBoardItems';
import styles from "./styles";

const LeaderBoardView = (props: any) => {
    const onRefresh = () => {
        props.setFilterData({
            property_name: ''
        })
        props.getLeaderBoard(0, {})
    }
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.menu}
                rightSecondImageScr={images.notification}
                headerText={strings.leaderBoardHeader}
                handleOnLeftIconPress={props.handleDrawerPress}
                headerStyle={styles.headerStyle}
                RightFirstIconStyle={styles.RightFirstIconStyle}
                statusBarColor={PRIMARY_THEME_COLOR}
                barStyle={'light-content'}
            />
         <View style={styles.topItemsVw}>
                <InputField
                    placeholderText={'Search Project Name'}
                    headingText={'Search Project Name'}
                    handleInputBtnPress={() => { }}
                    inputheight={45}
                    onChangeText={(data: any) => {
                        props.setFilterData({
                            ...props.filterData,
                            property_name: data
                        })
                        if (data === '') {
                            props.getLeaderBoard(0, {})
                        }
                    }}
                    valueshow={props?.filterData?.property_name}
                />
                <View style={{ marginTop: normalize(30) }}>
                    <Button
                        width={300}
                        buttonText={strings.search}
                        handleBtnPress={() => {
                            if (props?.filterData?.property_name) {
                                props.getLeaderBoard(0, props?.filterData)
                            }
                        }}
                    />
                </View>
            </View>
            <FlatList
removeClippedSubviews={false}
                data={Array.isArray(props?.leaderBoardList) ?
                    props?.leaderBoardList : []}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <EmptyListScreen
                        styled={{ alignItems: 'center', marginTop: normalize(60) }}
                        message={strings.leaderBoardHeader} />}
                onEndReached={() => {
                    if (props?.leaderBoardList?.length < props?.moreData) {
                        props.getLeaderBoard(props?.leaderBoardList?.length > 5 ?
                            props.offSET + 1 : 0, props?.filterData)
                    }
                }}
                refreshing={false}
                onRefresh={() => onRefresh()}
                renderItem={({ item }) => {
                    return (
                        <LeaderBoardItems
                            items={item}
                            onPressView={() => props.handleView(item)}
                        />
                    )
                }}
            />
        </View>
    )
}
export default LeaderBoardView