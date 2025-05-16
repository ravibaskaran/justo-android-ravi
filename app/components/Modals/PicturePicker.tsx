import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert, } from "react-native";
import Modal from "react-native-modal";
import styles from "./styles";
import images from "../../assets/images";
import strings from "../utilities/Localization";
import ImagePicker from 'react-native-image-crop-picker';
import { handlePermission, openPermissionSetting, } from "../utilities/GlobalFuncations";
import DocumentPicker from "react-native-document-picker";


const PicturePickerModal = (props: any) => {
    const handleCameraPress = () => {
        ImagePicker.openCamera({
          cropping: true,
          multiple: props.multiple ? props.multiple : false,
          compressImageQuality: 1,
          freeStyleCropEnabled: true,
        }).then((image: any) => {
          props.setVisible(false);
      
          const MAX_SIZE = 5 * 1024 * 1024; // 5MB
          const formatSize = (size: number) => `${(size / (1024 * 1024)).toFixed(2)} MB`;
      
          if (props.multiple && image?.length > 0) {
            const oversized = image.find((img: any) => img.size > MAX_SIZE);
            if (oversized) {
              Alert.alert("File Too Large", `Image size: ${formatSize(oversized.size)}. Please upload below 5MB.`);
              return;
            }
      
            const allArray = image.map((itm: any) => ({
              uri: itm.path,
              type: itm.mime,
              name: itm.path.substring(itm.path.lastIndexOf("/") + 1),
            }));
      
            const existing = Array.isArray(props.value) ? props.value : [];
            props.imageData([...existing, ...allArray]);
          } else {
            console.log(image.size)
            if (image.size > MAX_SIZE) {
              Alert.alert("File Too Large", `Image size: ${formatSize(image.size)}. Please upload below 5MB.`);
              return;
            }
      
            const singleImage = {
              uri: image.path,
              type: image.mime,
              name: image.path.substring(image.path.lastIndexOf("/") + 1),
            };
      
            const existing = Array.isArray(props.value) ? props.value : [];
      
            if (existing.length > 0) {
              props.imageData([...existing, singleImage]);
            } else {
              props.imageData(props.multiple ? [singleImage] : singleImage);
            }
          }
        });
      };
      
    const handleGalleryPress = () => {
        ImagePicker.openPicker({
          cropping: true,
          multiple: props.multiple ? props.multiple : false,
          compressImageQuality: 1,
          freeStyleCropEnabled: true,
        }).then((image: any) => {
          props.setVisible(false);
      
          const MAX_SIZE = 5 * 1024 * 1024; // 5MB in bytes
      
          const formatSize = (size: number) => `${(size / (1024 * 1024)).toFixed(2)} MB`;
      
          // Multiple images
          if (props.multiple && image?.length > 0) {
            const oversized = image.find((img: any) => img.size > MAX_SIZE);
            if (oversized) {
              Alert.alert(
                "File Too Large",
                `One or more files exceed 5MB.\nCurrent size: ${formatSize(oversized.size)}`
              );
              return;
            }
      
            const allArray = image.map((itm: any) => ({
              uri: itm.path,
              type: itm.mime,
              name: itm.path.substring(itm.path.lastIndexOf("/") + 1),
            }));
      
            if (!props?.value || props?.value?.length === 0) {
              props.imageData(allArray);
            } else {
              const newAdd = [...props.value];
              const getNew = newAdd.concat(allArray);
              props.imageData(getNew);
            }
          } else {
            // Single image
            if (image.size > MAX_SIZE) {
              Alert.alert(
                "File Too Large",
                `Please upload images below 5MB.\nCurrent size: ${formatSize(image.size)}`
              );
              return;
            }
      
            props.imageData({
              uri: image.path,
              type: image.mime,
              name: image.path.substring(image.path.lastIndexOf("/") + 1),
            });
          }
        });
      };
      
    const handleBrowsePress = async () => {
        const result: any = await DocumentPicker.pick({
            type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
        });
        if (result?.length > 0) {
            props.setVisible(false);
            props.imageData(
                {
                    uri: result[0]?.uri,
                    type: result[0]?.type,
                    name: result[0]?.name
                }
            )
        }
    }

    return (
        <Modal style={styles.fullContainer} coverScreen={true}
            isVisible={props.Visible}
            backdropOpacity={0.30}>
            <View style={styles.pickerModal}>
                <View style={styles.pickerModalCon}>
                    <View style={styles.cancelModalVw}>
                        <TouchableOpacity onPress={() => props.setVisible(false)}>
                            <Image
                                source={images.close}
                                style={styles.componentsImg}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.straightVw}>
                        <TouchableOpacity
                            onPress={async () => {
                                const res = await handlePermission(
                                    'gallery',
                                    strings.txt_setting_heading_media,
                                    strings.txt_setting_description_media,
                                );
                                if (res == 'setting1') {
                                    openPermissionSetting(
                                        strings.txt_setting_heading_media,
                                        strings.txt_setting_description_media,
                                    );
                                } else if (res) {
                                    if (props.docType === 'all') {
                                        handleBrowsePress()
                                    } else {
                                        handleGalleryPress()
                                    }
                                }
                            }}
                            style={styles.componentsVw}>
                            <Image
                                style={styles.componentsImg}
                                resizeMode={'contain'}
                                source={images.gallery}
                            />
                            <Text style={styles.componentsTxt}>{strings.galleryHeader}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.componentsVw}
                            onPress={async () => {

                                const res = await handlePermission(
                                    'camera',
                                    strings.txt_setting_heading_camera,
                                    strings.txt_setting_description_camera,
                                );

                                if (res == 'setting1') {
                                    openPermissionSetting(
                                        strings.txt_setting_heading_camera,
                                        strings.txt_setting_description_camera,
                                    );
                                } else if (res) {
                                    handleCameraPress()
                                }
                            }}
                        >
                            <Image
                                style={styles.componentsImg}
                                resizeMode={'contain'}
                                source={images.camera}
                            />
                            <Text style={styles.componentsTxt}>{strings.cameraHeader}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal >
    );
};

export default PicturePickerModal;
