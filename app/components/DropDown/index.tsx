import { View, Text } from 'react-native'
import React, { useRef } from 'react'
import { Dropdown, IDropdownRef } from 'react-native-element-dropdown';
import styles from './styles';
import { dropdownData } from '../utilities/DemoData';
import { normalize, normalizeHeight } from '../scaleFontSize';
import { RequiredStart } from '../utilities/GlobalFuncations';
import { Isios } from '../utilities/constant';

const DropdownInput = (props: any) => {
    const ref = useRef<IDropdownRef>(null);
    const {
        inputWidth = '100%',
        inputheight = Isios ? 35 : 50,
        paddingLeft = 0,
        require = false
    } = props
    const renderItem = (item: any) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
            </View>
        );
    };
    return (
        <View>
            <View style={styles.inputHeadinView}>
                <Text numberOfLines={1} style={styles.inputHeadingText}>{props.headingText}</Text>
                {require ? (<RequiredStart />) : null}
            </View>
            <View style={styles.mainContainer}>
                <Dropdown
                    ref={ref}
                    style={[styles.dropdown, {
                        width: inputWidth,
                        height: normalizeHeight(inputheight),
                        paddingLeft: normalize(paddingLeft),
                    }]}
                    search={props.search}
                    searchPlaceholder={props.searchPlaceholder}
                    inputSearchStyle={styles.searchInput}
                    itemTextStyle={{ fontSize: 10 }}
                    itemContainerStyle={props.itemContainerStyle}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={props.selectedTextStyle ? props.selectedTextStyle : styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={props.data ? props.data : dropdownData}
                    maxHeight={props.maxHeight ? props.maxHeight : 300}
                    labelField={props.labelField ? props.labelField : "label"}
                    valueField={props.valueField ? props.valueField : "value"}
                    placeholder={props.placeholder}
                    disable={props.disable}
                    value={props.value}
                    onChange={(item) => {
                        props.onChange(item);
                    }}
                    onFocus={props.onFocus}
                    renderItem={props.newRenderItem ? props.newRenderItem : renderItem}
                />
            </View>
        </View>
    )
}

export default DropdownInput