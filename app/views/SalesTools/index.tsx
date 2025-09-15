import React from 'react';
import SalesToolsView from './components/SalesToolsView';

const SalesToolsScreen = ({ navigation }: any) => {
    const handleDrawerPress = () => {
        navigation.toggleDrawer();
    };
    return (
        <>
            <SalesToolsView
                handleDrawerPress={handleDrawerPress}
            />
        </>
    )
}

export default SalesToolsScreen