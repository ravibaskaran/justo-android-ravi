import { Alert, Image, Platform } from 'react-native';
import {
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
  check,
} from 'react-native-permissions';
import { Isios, RED_COLOR } from './constant';
import strings from './Localization';
import images from 'app/assets/images';
import { normalizeWidth, normalizeHeight, normalizeSpacing } from '../scaleFontSize';
import { createNavigationContainerRef } from '@react-navigation/native';
import ErrorMessage from '../ErrorMessage';
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";

const OS: any = Platform
const OsVer = parseInt(OS.constants['Release'], 10); 

export const handlePermission = async (
  permission: any,
  msgHeading = 'Permission',
  message = 'txt_setting_access',
) => {
  let result: any = '';
  switch (permission) {
    case 'camera':
      result = await check(
        Isios ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
      );
      break;
    case 'gallery':
      result = await check(
        Isios
          ? PERMISSIONS.IOS.PHOTO_LIBRARY
          // : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          : +OsVer < 13 ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      );
      break;
    case 'microPhone':
      result = await check(
        Isios ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO,
      );
      break;
    case 'write':
      result = permissionWrite('check');
      break;
  }
  let res: any = false;
  switch (await result) {
    case RESULTS.UNAVAILABLE:
      res = requestPermission(permission, msgHeading, message);
      break;
    case RESULTS.DENIED:
      res = requestPermission(permission, msgHeading, message);
      break;
    case RESULTS.LIMITED:
      res = true;
      break;
    case RESULTS.GRANTED:
      res = true;
      break;
    case RESULTS.BLOCKED:
      res = 'setting1';
      // openPermissionSetting(msgHeading, message);
      break;
  }
  return await res;
};

export const permissionWrite = async (type = 'request') => {
  const res = (type = 'request'
    ? await request(
      Isios
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    )
    : await check(
      Isios
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ));
  return res;
};
export const checkPermissions = async (permission: any) => {
  let result = '';
  switch (permission) {
    case 'camera':
      result = await check(
        Isios ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
      );
      break;
    case 'gallery':
      result = await check(
        Isios
          ? PERMISSIONS.IOS.PHOTO_LIBRARY
          // : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          : +OsVer < 13 ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      );
      break;
  }
  let res: any = false;
  switch (await result) {
    case RESULTS.UNAVAILABLE:
      break;
    case RESULTS.DENIED:
      res = 'denied';
      break;
    case RESULTS.LIMITED:
      res = true;
      break;
    case RESULTS.GRANTED:
      res = true;
      break;
    case RESULTS.BLOCKED:
      res = 'setting1';
      break;
  }
  return await res;
};
export const requestPermission = async (permission: any, msgHeading: any, message: any) => {
  let reqRes: any = '';
  switch (permission) {
    case 'camera':
      reqRes = await request(
        Isios ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
      );
      break;
    case 'location':
      reqRes = await request(
        Isios ? PERMISSIONS.IOS.LOCATION_ALWAYS : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      break;
    case 'gallery':
      reqRes = await request(
        Isios
          ? PERMISSIONS.IOS.PHOTO_LIBRARY
          // : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          : +OsVer < 13 ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      );
      break;
    case 'microPhone':
      reqRes = await request(
        Isios
          ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO,
      );
      break;
    case 'write':
      reqRes = permissionWrite();
      break;
  }
  let res: any = false;
  switch (await reqRes) {
    case RESULTS.UNAVAILABLE:
      openPermissionSetting(msgHeading, message);
      break;
    case RESULTS.DENIED:
      res = false;
      break;
    case RESULTS.LIMITED:
      break;
    case RESULTS.GRANTED:
      res = true;
      break;
    case RESULTS.BLOCKED:
      res = 'setting1';
      break;
  }
  return await res;
};
export const requestPermissions = async (permission: any) => {
  let reqRes = '';
  switch (permission) {
    case 'camera':
      reqRes = await request(PERMISSIONS.ANDROID.CAMERA);
      break;
    case 'location':
      reqRes = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      break;
    case 'gallery':
      reqRes = await request(
        Isios
          ? PERMISSIONS.IOS.PHOTO_LIBRARY
          // : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          : +OsVer < 13 ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      );
      break;
    case 'write':
      reqRes = await permissionWrite();
      break;
  }
  let res: any = false;
  switch (reqRes) {
    case RESULTS.UNAVAILABLE:
      //  openPermissionSetting(msgHeading, message);
      break;
    case RESULTS.DENIED:
      res = false;
      break;
    case RESULTS.LIMITED:
      res = true;
      break;
    case RESULTS.GRANTED:
      res = true;
      break;
    case RESULTS.BLOCKED:
      // res = 'setting2';
      res = false;
      // openPermissionSetting(
      //   'Camera & Media Permission',
      //   strings.txt_setting_media_camera,
      // );
      break;
  }
  return await res;
};

export const openPermissionSetting = (msgHeading: any, message: any,
  onPressCancel = () => {
  }) => {
  Alert.alert(msgHeading, message, [
    {
      text: strings.notNow,
      onPress: () => onPressCancel(),
      style: 'cancel',
    },
    { text: strings.setting, onPress: () => openSettings() },
  ]);
};


export const RequiredStart = () => {
  return (
    <Image
      source={images.star}
      style={{
        width: normalizeWidth(5),
        height: normalizeHeight(5),
        marginLeft: normalizeSpacing(5),
        marginBottom: normalizeSpacing(5),
      }}
    />
  )
}

export const OpenDoc = async (url: any) => {
  function getUrlExtension(url: any) {
    return url.split(/[#?]/)[0].split(".").pop().trim();
  }
  const extension = getUrlExtension(url);

  const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;

  const options = {
    fromUrl: url,
    toFile: localFile,
  };
  RNFS.downloadFile(options)
    .promise.then(() => FileViewer.open(localFile))
    .then((r) => {
      console.log('r', r)
      // success
    })
    .catch((error: any) => {
      console.log('error', error)
      ErrorMessage({
        msg: error?.message,
        backgroundColor: RED_COLOR
      })
    });
};


export function handleDetailResponse(result: any) {
  let data;
  if (Array.isArray(result)) {
    data = result[0];
  } else {
    data = result;
  }
  return data;
}

export const navigationRef: any = createNavigationContainerRef()

export function navigate(name: any, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}