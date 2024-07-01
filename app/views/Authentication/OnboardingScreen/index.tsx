import React from 'react';
import OnboardingView from './components/OnboardingView';

const OnboardingScreen = ({navigation}: any) => {
  const handleOnDonePress = () => {
    navigation.navigate('LoginScreenView');
  };

  return <OnboardingView handleOnDonePress={handleOnDonePress} />;
};

export default OnboardingScreen;
