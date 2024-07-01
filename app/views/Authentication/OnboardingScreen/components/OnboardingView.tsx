import {Image} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import styles from './styles';
import images from '../../../../assets/images';

const OnboardingView = (props: any) => {
  const pages = [
    {
      backgroundColor: '#fff',
      image: (
        <Image
          style={styles.imageStyle}
          source={images.logoWhiteBG}
        />
      ),
      title: 'Onboarding Step one',
      subtitle: 'Done with React Native Onboarding Swiper',
    },
    {
      backgroundColor: '#fff',
      image: (
        <Image
          style={styles.imageStyle}
          source={images.logoWhiteBG}
        />
      ),
      title: 'Onboarding Step two',
      subtitle: 'Done with React Native Onboarding Swiper',
    },
    {
      backgroundColor: '#fff',
      image: (
        <Image
          style={styles.imageStyle}
          source={images.logoWhiteBG}
        />
      ),
      title: 'Onboarding Step three',
      subtitle: 'Done with React Native Onboarding Swiper',
    },
  ];

  return (
    <Onboarding skipToPage={2} onDone={props.handleOnDonePress} pages={pages} />
  );
};

export default OnboardingView;
