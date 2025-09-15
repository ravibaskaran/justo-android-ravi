import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAgentDetail } from '../../../Redux/Actions/AgentActions';
import ProfileView from './components/ProfileView';

const ProfileScreen = ({ navigation, route }: any) => {
  // const HandleBackPress = () => {
  //     navigation.goBack();
  // }
  // const handleEditProfilePress = () => {
  //   navigation.navigate('EditProfileScreen')
  // }
  const dispatch: any = useDispatch();
  const isFocused = useIsFocused()
  const [isloading, setIsloading] = useState(false);
  const { response = {}, detail = "" } = useSelector(
    (state: any) => state.agentData
  );

  const userdata = useSelector((state: any) => state.agentData);

  const [allDetails, setAllDetails] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      // getAgentList(offSET, [])
      getDetail();
      return () => { };
    }, [navigation, detail])
  );

  useEffect(() => {
    getDetail();
  }, [isFocused]);

  const getDetail = async () => {
    const userData: any = await AsyncStorage.getItem("loginData");
    if (JSON.parse(userData).data._id) {
      setIsloading(true);
      dispatch(
        getAgentDetail({
          user_id: JSON.parse(userData).data?._id,
        })
      );
      // toGetDatas();
    }
  };

  useEffect( () => {
    toGetDatas()
  }, [response, navigation])


  const toGetDatas = async () => {

    if (response?.status) {

      setIsloading(false);
      setAllDetails({ ...response?.data });
      await AsyncStorage.setItem('userData', JSON.stringify(response?.data))
    }
  };

  const onpresContent = (name: any, items: any) => {
    navigation.navigate(name, items);
  };

  const HandleBackPress = () => {
    navigation.goBack();
  };
  const handleEditProfilePress = () => {
    navigation.navigate("EditProfileScreen", { allDetails: allDetails });
  };
  return (
    <ProfileView allDetails={allDetails} data={route.params} HandleBackPress={HandleBackPress} handleEditProfilePress={handleEditProfilePress} />
  );
};

export default ProfileScreen;