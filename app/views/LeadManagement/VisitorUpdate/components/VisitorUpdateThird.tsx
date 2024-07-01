import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from "./styles";
import TopScreensViewer from './TopScreensViewer'
import Header from "../../../../components/Header";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import { BLACK_COLOR, Isios, PRIMARY_THEME_COLOR } from "../../../../components/utilities/constant";
import InputField from "../../../../components/InputField";
import Button from "../../../../components/Button";
import { normalize, normalizeSpacing } from "../../../../components/scaleFontSize";
import { RadioButton } from "react-native-paper";
import DropdownInput from "app/components/DropDown";
import Styles from '../../../../components/Modals/styles'

const VisitorUpdateView = (props: any) => {
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                headerText={strings.visitor + " " + strings.update}
                headerStyle={styles.headerStyle}
                RightFirstIconStyle={styles.leftImageIconStyle}
                leftImageIconStyle={styles.leftImageIconStyle}
                handleOnLeftIconPress={() => props.setScreenType(1)}
                barStyle={'light-content'}
                statusBarColor={PRIMARY_THEME_COLOR}
            />
            <View style={styles.noMoveVw}>
                {/* <TopScreensViewer type={props.screenType} /> */}
            </View>
            <ScrollView automaticallyAdjustKeyboardInsets={Isios ? true : false} contentContainerStyle={styles.wrap}>
                <View style={styles.typeVw}>
                    <Text style={styles.typeTxt}>Occupation Details</Text>
                    <View style={styles.typeBorders} />
                </View>
                <View style={styles.selectsView}>
                    <Text style={styles.selectsTxt}>{"Occupation"}</Text>
                </View>
                <View style={styles.straightVw}>
                    <View style={[styles.radioView, {}]}>
                        <RadioButton.Android
                            value={props.updateForm?.occupation}
                            status={props.updateForm.occupation === "salaried" ? "checked" : "unchecked"}
                            onPress={() => props.setUpdateForm({
                                ...props.updateForm,
                                occupation: 'salaried'
                            })}
                            color={PRIMARY_THEME_COLOR}
                        />
                        <Text style={styles.checkTxt}>{'Salaried'}</Text>
                    </View>
                    <View style={[styles.radioView, {}]}>
                        <RadioButton.Android
                            value={props.updateForm?.occupation}
                            status={props.updateForm.occupation === "self employee" ? "checked" : "unchecked"}
                            onPress={() => props.setUpdateForm({
                                ...props.updateForm,
                                occupation: 'self employee'
                            })}
                            color={PRIMARY_THEME_COLOR}
                        />
                        <Text style={styles.checkTxt}>{'Self Employed'}</Text>
                    </View>
                    <View style={[styles.radioView, {}]}>
                        <RadioButton.Android
                            value={props.updateForm?.occupation}
                            status={props.updateForm.occupation === "professional" ? "checked" : "unchecked"}
                            onPress={() => props.setUpdateForm({
                                ...props.updateForm,
                                occupation: 'professional'
                            })}
                            color={PRIMARY_THEME_COLOR}
                        />
                        <Text style={styles.checkTxt}>{'Professional'}</Text>
                    </View>
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        disableSpecialCharacters={true}
                        placeholderText={"Company Name"}
                        handleInputBtnPress={() => { }}
                        onChangeText={(text: any) => {
                            props.setUpdateForm({
                                ...props.updateForm,
                                coumpany_name: text
                            })
                        }}
                        valueshow={props?.updateForm?.coumpany_name}
                        headingText={"Company Name"}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        disableSpecialCharacters={true}
                        placeholderText={"Designation"}
                        handleInputBtnPress={() => { }}
                        onChangeText={(text: any) => {
                            props.setUpdateForm({
                                ...props.updateForm,
                                desigantion: text
                            })
                        }}
                        valueshow={props?.updateForm?.desigantion}
                        headingText={"Designation"}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        placeholderText={"Office Address"}
                        handleInputBtnPress={() => { }}
                        onChangeText={(text: any) => {
                            props.setUpdateForm({
                                ...props.updateForm,
                                office_address: text
                            })
                        }}
                        valueshow={props?.updateForm?.office_address}
                        headingText={"Office Address"}
                    />
                </View>
                {/* 63ecd90787f864d94a3882ee */}
                {/* 63ecd94387f864d94a38838d */}
                {/* <View style={[styles.inputWrap]}>
                        <DropdownInput
                            headingText={'Lead Source'}
                            placeholder={props.updateForm?.lead_source ?
                                props.updateForm?.lead_source: 'Lead Source'}
                            data={props?.masterDatas?.length > 0 && Array.isArray(props?.masterDatas) ? props?.masterDatas : []}
                            onFocus={() => props.handleDropdownPress(13)}
                            inputWidth={'100%'}
                            require
                            paddingLeft={16}
                            maxHeight={300}
                            labelField={"title"}
                            valueField={'_id'}
                            value={props?.updateForm?.lead_source}
                            onChange={(item: any) => {
                                props.setUpdateForm({
                                    ...props.updateForm,
                                    lead_source: item._id,
                                    lead_source_title: item.title
                                })
                            }}
                            newRenderItem={(item: any) => {
                                return item.title !== "" && (
                                    <>
                                        <View style={Styles.item}>
                                            <Text style={Styles.textItem}>{item.title}</Text>
                                        </View>
                                    </>
                                );
                            }}
                        />
                    </View> */}
                <View style={styles.inputWrap}>
                    <InputField
                        placeholderText={"Remark"}
                        handleInputBtnPress={() => { }}
                        onChangeText={(text: any) => {
                            props.setUpdateForm({
                                ...props.updateForm,
                                remark: text
                            })
                        }}
                        valueshow={props?.updateForm?.remark}
                        headingText={"Remark"}
                    />
                </View>
            </ScrollView>
            <View style={styles.noMoveVw}>
                <Button
                    handleBtnPress={(type: any) => props.onPressNext(null)}
                    // rightImage={images.forwardArrow}
                    buttonText={strings.update}
                    textTransform={"uppercase"}
                />
            </View>
        </View>
    )
}
export default VisitorUpdateView