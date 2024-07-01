import {StyleSheet} from 'react-native';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../../../components/scaleFontSize';

const styles = StyleSheet.create({
  imageStyle: {
    height: normalizeHeight(100),
    width: normalizeWidth(150),
  },
});

export default styles;
