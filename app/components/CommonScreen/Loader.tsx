import React from 'react'
import { View ,Text,ActivityIndicator} from 'react-native';
import styles from './styles'
import strings from '../utilities/Localization'
import { PRIMARY_THEME_COLOR_DARK, PRIMARY_THEME_COLOR } from '../utilities/constant'

const Loader = (props: any) => {
 return (
  <View style={styles.containerStyle}>
    <View style={styles.indicatorViewStyle}>
      {<ActivityIndicator size={'large'} color={PRIMARY_THEME_COLOR} />}
    </View>
  </View>
 )

};

export default Loader;