import { useFocusEffect } from "@react-navigation/native";
import { learderBoardData } from "app/Redux/Actions/LeaderBoardAction";
import React, { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import images from "../../../assets/images";
import LeaderBoardView from './components/LeaderBoard'

const LeaderBoardScreen = ({ navigation }: any) => {
    const dispatch: any = useDispatch()
    const { response = {}, list = '' } = useSelector((state: any) => state.leaderBoard) || {}
    const moreData = response?.total_data || 0
    const [leaderBoardList, setLeaderBoardList] = useState<any>([])
    const [offSET, setOffset] = useState(0)
    const [filterData, setFilterData] = useState({
        property_name: '',
    })
    useFocusEffect(
        React.useCallback(() => {
            setFilterData({
                property_name: '',
            })
            getLeaderBoard(0, {})
            return () => { };
        }, [navigation])
    );
    useEffect(() => {
        if (response?.status === 200) {
            if (offSET === 0) {
                setLeaderBoardList(response?.data)
            } else {
                setLeaderBoardList([...leaderBoardList, ...response?.data])
            }
        } else {
            setLeaderBoardList([])
        }
    }, [response])
    const getLeaderBoard = (offset: any, data: any) => {
        setOffset(offset)
        dispatch(learderBoardData({
            limit: offset === 0 ? 6 : 3,
            offset: offset,
            property_name: data?.property_name ? data?.property_name : '',
        }))
    }
    const handleDrawerPress = () => {
        Keyboard.dismiss()
        navigation.toggleDrawer();
    };
    const handleView = (data: any) => {
        navigation.navigate('LeaderBoardSearch', data)
    }
    return (
        <>
            <LeaderBoardView
                leaderBoardList={leaderBoardList}
                filterData={filterData}
                setFilterData={setFilterData}
                handleDrawerPress={handleDrawerPress}
                handleView={handleView}
                moreData={moreData}
                getLeaderBoard={getLeaderBoard}
                offSET={offSET}
            />
        </>
    )
}
export default LeaderBoardScreen