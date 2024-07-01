import { View, Text, Image, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from "react-native-modal";
import styles from './styles';
import images from 'app/assets/images';
import strings from '../utilities/Localization';
import { normalize, normalizeSpacing } from '../scaleFontSize';
import { useDispatch, useSelector } from 'react-redux';
import { getCityList } from 'app/Redux/Actions/MasterActions';
import { BLACK_COLOR } from '../utilities/constant';

const CityModal = (props: any) => {
    const dispatch: any = useDispatch()
    const { response = {}, Roleresponse = {} } = useSelector((state: any) => state.masterData) || {};
    const [cityData, setCityData] = useState<any>([]);
    const [filterCityData, setfilterCityData] = useState<any>([])

    useEffect(() => {
        handlegetCityList()
    }, [props.Visible])


    const handlegetCityList = () => {
        dispatch(getCityList({}));
        if (response?.status) {
            setCityData(response?.data);
            setfilterCityData(response?.data);
        }
    };

    const handleSearch = (text: any) => {
        if (text !== '') {
            const filterData = cityData?.filter((e: any) => {
                const cityName = e?.city_name
                return cityName?.toLowerCase().indexOf(text.toLowerCase()) > -1
            })
            setfilterCityData(filterData)
        }
        else {
            setfilterCityData(cityData)
        }

    }


    return (
        <View>
            <Modal isVisible={props.Visible}>
                <View style={styles.mainContainer}>
                    <View style={styles.topContainer}>
                        <Text style={styles.topTxt}>{strings.selectCity}</Text>
                        <View>
                            <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                                <Image source={images.close} style={styles.closeIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.borderView} />
                    <View style={styles.citySearchView}>
                        <TextInput
                            placeholder={strings.searchCity}
                            placeholderTextColor={BLACK_COLOR}
                            style={{
                                padding: 10,
                                color: BLACK_COLOR,
                                fontSize: 15
                            }}
                            onChangeText={(val: any) => {
                                handleSearch(val)
                            }}
                        />
                    </View>
                    <View
                        style={styles.cityListView}
                    >
                        <FlatList
                            data={filterCityData}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={{
                                        marginVertical: normalizeSpacing(10),
                                    }}
                                        onPress={() => {
                                            props.setData({
                                                ...props.data,
                                                city: item.city_name,
                                                city_id: item.city_id,
                                            });
                                            props.setIsVisible(false)
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: normalize(18),
                                                marginLeft: normalizeSpacing(10)
                                            }}
                                        >{item.city_name}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                    {/* <View style={{ marginVertical: 20 }}>
                        <Button buttonText={strings.select} />
                    </View> */}
                </View>
            </Modal>
        </View>
    )
}

export default CityModal