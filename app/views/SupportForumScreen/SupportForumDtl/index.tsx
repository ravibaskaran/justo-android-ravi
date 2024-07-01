import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SupportForumDetail from './components/SupportForumDetail'
import { supportForumDetailData } from 'app/Redux/Actions/SupportForumAction'
import RNFetchBlob from 'rn-fetch-blob'
import { START_LOADING, STOP_LOADING } from 'app/Redux/types'
import Share from "react-native-share";

const SupportForumScreen = ({ navigation, route }: any) => {
    const dispatch: any = useDispatch()
    const data = route?.params
    const { response = {}, detail = "" } = useSelector((state: any) => state.supportForumData)
    const [supportForumDtl, setSupportForumDtl] = useState<any>({})
    const [mediaArr, setMediaArr] = useState<any>([]);

    useLayoutEffect(() => {
        if (data?._id) {
            dispatch(supportForumDetailData({
                support_forum_id: data?._id
            }))
        }
    }, [detail])
    useEffect(() => {
        if (response?.status === 200) {
            setSupportForumDtl(response.data[0])
        }
    }, [response])
    const handleBackPress = () => {
        navigation.goBack();
    };
    const handleSharePress = (data: any) => {
        dispatch({ type: START_LOADING });
        let newArr: any = [];
        
        const finalUrls = supportForumDtl?.support_forum_content?.map((item: any) => {
          let imagePath: any = null;
          RNFetchBlob.config({
            fileCache: true,
          })
            .fetch("GET",  `${supportForumDtl?.base_url}${item?.content}`)
            // the image is now dowloaded to device's storage
            .then((resp) => {
              // the image path you can use it directly with Image component
              imagePath = resp.path();
              return resp.readFile("base64");
            })
            .then(async (base64Data) => {
              if(item?.content_type === 'image'){
                await newArr.push(`data:image/png;base64,${base64Data}`);
              } else if(item?.content_type === 'video') {
                await newArr.push(`data:video/mp4;base64,${base64Data}`);
              }
              setMediaArr(newArr);
              if (supportForumDtl?.support_forum_content?.length === newArr.length) {
                const options = {
                  title: `${data?.title}`,
                  urls: newArr,
                };
                const shareResponse = await Share.open(options).then((res: any) => {
                });
                setMediaArr(null)
                dispatch({ type: STOP_LOADING });
              }
            }).catch( () => dispatch({ type: STOP_LOADING })
            );
        });
    }
    return (
        <SupportForumDetail
            handleBackPress={handleBackPress}
            supportForumDtl={supportForumDtl}
            handleSharePress={handleSharePress}
        />
    )
}

export default SupportForumScreen