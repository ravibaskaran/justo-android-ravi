import moment from "moment";
import React from "react";
import { ScrollView, Text, View } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { RadioButton } from "react-native-paper";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import DropdownInput from "../../../../components/DropDown";
import Header from "../../../../components/Header";
import InputCalender from "../../../../components/InputCalender";
import InputField from "../../../../components/InputField";
import Styles from '../../../../components/Modals/styles';
import { normalizeSpacing } from "../../../../components/scaleFontSize";
import { AMOUNT_TYPE, DATE_FORMAT, Isios, PRIMARY_THEME_COLOR } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";

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
                handleOnLeftIconPress={() => props.setScreenType(0)}
                barStyle={'light-content'}
                statusBarColor={PRIMARY_THEME_COLOR}
            />
            <View style={styles.noMoveVw}>
                {/* <TopScreensViewer type={props.screenType} /> */}
            </View>
            <ScrollView automaticallyAdjustKeyboardInsets={Isios ? true : false} contentContainerStyle={styles.wrap}>
                <View style={styles.typeVw}>
                    <Text style={styles.typeTxt}>Property Required</Text>
                    <View style={styles.typeBorders} />
                </View>
                <View style={[styles.inputWrap, { marginTop: normalizeSpacing(16) }]}>
                    <DropdownInput
                        headingText={strings.configurations}
                        placeholder={props.updateForm?.configuration ?
                            props.updateForm?.configuration : strings.configurations}
                        data={Array.isArray(props?.configuration) ? props?.configuration : []}
                        inputWidth={'100%'}
                        paddingLeft={16}
                        maxHeight={300}
                        labelField={"title"}
                        valueField={'_id'}
                        value={props?.updateForm?.configuration_id}
                        onChange={(item: any) => {
                            props.setUpdateForm({
                                ...props.updateForm,
                                configuration_id: item._id,
                                configuration: item.title
                            })
                        }}
                        newRenderItem={(item: any) => {
                            return (
                                <>
                                    <View style={Styles.item}>
                                        <Text style={Styles.textItem}>{item.title}</Text>
                                    </View>
                                </>
                            );
                        }}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputCalender
                        leftIcon={images.event}
                        mode={"date"}
                        placeholderText={"Expected Possession Date"}
                        headingText={"Expected Possession Date"}
                        editable={false}
                        minimumDate={new Date()}
                        dateData={(data: any) => {
                            props.setUpdateForm({
                                ...props.updateForm,
                                expected_possession_date: moment(data).format(DATE_FORMAT),
                            });
                        }}
                        setDateshow={(data: any) => {
                            props.setUpdateForm({
                                ...props.updateForm,
                                expected_possession_date: moment(data).format(DATE_FORMAT),
                            });
                        }}
                        value={props?.updateForm?.expected_possession_date === '' ||
                            props?.updateForm?.expected_possession_date === undefined ||
                            props?.updateForm?.expected_possession_date === null ?
                            "" :
                            moment(props?.updateForm?.expected_possession_date).format(DATE_FORMAT)
                        }
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        disableSpecialCharacters={true}
                        placeholderText={"Area(Sq ft.)"}
                        handleInputBtnPress={() => { }}
                        onChangeText={(text: any) => {
                            props.setUpdateForm({
                                ...props.updateForm,
                                areain_sqlft: text
                            })
                        }}
                        maxLength={10}
                        valueshow={props?.updateForm?.areain_sqlft?.toString()}
                        headingText={"Area(Sq ft.)"}
                        keyboardtype={'number-pad'}
                    />
                </View>
                <View style={styles.smallCont}>
                    <Text style={[styles.headingsTxt, { width: '56%' }]}>Min Budget</Text>
                    <Text style={[styles.headingsTxt, { width: '50%' }]}>Max Budget</Text>
                </View>
                <View style={styles.inputContVw}>
                    <View style={styles.smallContVw}>
                        <TextInput
                            value={props?.updateForm?.min_budget?.toString()}
                            onChangeText={(data: any) => {
                                props.setUpdateForm({
                                    ...props.updateForm,
                                    min_budget: data
                                })
                            }}
                            maxLength={4}
                            keyboardType={'number-pad'}
                            placeholder='Min Budget'
                            style={styles.budgetInput} />
                        <DropdownInput
                            inputWidth={Isios ? 45 : 49}
                            inputheight={Isios ? 20 : 38}
                            paddingLeft={Isios ? 6 : 10}
                            itemContainerStyle={{ width: 100 }}
                            iconStyle={{ width: 15, height: 15 }}
                            data={AMOUNT_TYPE}
                            itemTextStyle={{ fontSize: 8 }}
                            labelField="value"
                            valueField={'value'}
                            placeholder={props?.updateForm?.min_budget_type}
                            value={props?.updateForm?.min_budget_type}
                            onChange={(item: any) => {
                                props.setUpdateForm({
                                    ...props.updateForm,
                                    min_budget_type: item.value,
                                })
                            }}
                            newRenderItem={(item: any) => {
                                return (
                                    <>
                                        <View style={Styles.item}>
                                            <Text style={Styles.textItem}>{item.value}</Text>
                                        </View>
                                    </>
                                );
                            }}
                        />
                    </View>
                    <View style={[styles.smallContVw, { justifyContent: 'flex-end' }]}>
                        <TextInput
                            value={props?.updateForm?.max_budget?.toString()}
                            onChangeText={(data: any) => {
                                props.setUpdateForm({
                                    ...props.updateForm,
                                    max_budget: data
                                })
                            }}
                            maxLength={4}
                            keyboardType={'number-pad'}
                            placeholder='Max Budget'
                            style={styles.budgetInput} />
                        <DropdownInput
                            inputWidth={Isios ? 45 : 49}
                            inputheight={Isios ? 20 : 38}
                            paddingLeft={Isios ? 6 : 10}
                            itemContainerStyle={{ width: 100 }}
                            iconStyle={{ width: 15, height: 15 }}
                            data={AMOUNT_TYPE}
                            itemTextStyle={{ fontSize: 8 }}
                            labelField="value"
                            valueField={'value'}
                            placeholder={props?.updateForm?.max_budget_type}
                            value={props?.updateForm?.max_budget_type}
                            onChange={(item: any) => {
                                props.setUpdateForm({
                                    ...props.updateForm,
                                    max_budget_type: item.value,
                                })
                            }}
                            newRenderItem={(item: any) => {
                                return (
                                    <>
                                        <View style={Styles.item}>
                                            <Text style={Styles.textItem}>{item.value}</Text>
                                        </View>
                                    </>
                                );
                            }}
                        />
                    </View>
                </View>
                <View style={styles.selectsView}>
                    <Text style={styles.selectsTxt}>{"Nature Of Fuding"}</Text>
                </View>
                <View style={styles.straightVw}>
                    <View style={[styles.radioView, { marginHorizontal: 0 }]}>
                        <RadioButton.Android
                            value={props.updateForm?.funding_type}
                            status={props.updateForm.funding_type === "loan" ? "checked" : "unchecked"}
                            onPress={() => props.setUpdateForm({
                                ...props.updateForm,
                                funding_type: 'loan'
                            })}
                            color={PRIMARY_THEME_COLOR}
                        />
                        <Text style={styles.checkTxt}>{'Loan'}</Text>
                    </View>
                    <View style={[styles.radioView, { marginHorizontal: 0 }]}>
                        <RadioButton.Android
                            value={props.updateForm?.funding_type}
                            status={props.updateForm.funding_type === "self" ? "checked" : "unchecked"}
                            onPress={() => props.setUpdateForm({
                                ...props.updateForm,
                                funding_type: 'self'
                            })}
                            color={PRIMARY_THEME_COLOR}
                        />
                        <Text style={styles.checkTxt}>{'Self Funding'}</Text>
                    </View>
                    <View style={[styles.radioView, { marginHorizontal: 0 }]}>
                        <RadioButton.Android
                            value={props.updateForm?.funding_type}
                            status={props.updateForm.funding_type === "both" ? "checked" : "unchecked"}
                            onPress={() => props.setUpdateForm({
                                ...props.updateForm,
                                funding_type: 'both'
                            })}
                            color={PRIMARY_THEME_COLOR}
                        />
                        <Text style={styles.checkTxt}>{'Both'}</Text>
                    </View>
                </View>
                <View style={styles.smallCont}>
                    <Text style={[styles.headingsTxt, { width: '56%' }]}>Min EMI Pay</Text>
                    <Text style={[styles.headingsTxt, { width: '50%' }]}>Max EMI Pay</Text>
                </View>
                <View style={styles.inputContVw}>
                    <View style={styles.smallContVw}>
                        <TextInput
                            value={props?.updateForm?.min_emi_budget?.toString()}
                            onChangeText={(data: any) => {
                                props.setUpdateForm({
                                    ...props.updateForm,
                                    min_emi_budget: data
                                })
                            }}
                            maxLength={4}
                            keyboardType={'number-pad'}
                            placeholder='Min EMI Pay'
                            style={styles.budgetInput} />
                        <DropdownInput
                            inputWidth={Isios ? 45 : 49}
                            inputheight={Isios ? 20 : 38}
                            paddingLeft={Isios ? 6 : 10}
                            itemContainerStyle={{ width: 100 }}
                            iconStyle={{ width: 15, height: 15 }}
                            data={AMOUNT_TYPE}
                            itemTextStyle={{ fontSize: 8 }}
                            labelField="value"
                            valueField={'value'}
                            placeholder={props?.updateForm?.min_emi_budget_type}
                            value={props?.updateForm?.min_emi_budget_type}
                            onChange={(item: any) => {
                                props.setUpdateForm({
                                    ...props.updateForm,
                                    min_emi_budget_type: item.value,
                                })
                            }}
                            newRenderItem={(item: any) => {
                                return (
                                    <>
                                        <View style={Styles.item}>
                                            <Text style={Styles.textItem}>{item.value}</Text>
                                        </View>
                                    </>
                                );
                            }}
                        />
                    </View>
                    <View style={[styles.smallContVw, { justifyContent: 'flex-end' }]}>
                        <TextInput
                            value={props?.updateForm?.max_emi_budget}
                            onChangeText={(data: any) => {
                                props.setUpdateForm({
                                    ...props.updateForm,
                                    max_emi_budget: data
                                })
                            }}
                            maxLength={4}
                            keyboardType={'number-pad'}
                            placeholder='Max EMI Pay'
                            style={styles.budgetInput} />
                        <DropdownInput
                            inputWidth={Isios ? 45 : 49}
                            inputheight={Isios ? 20 : 38}
                            paddingLeft={Isios ? 6 : 10}
                            itemContainerStyle={{ width: 100 }}
                            iconStyle={{ width: 15, height: 15 }}
                            data={AMOUNT_TYPE}
                            itemTextStyle={{ fontSize: 8 }}
                            labelField="value"
                            valueField={'value'}
                            placeholder={props?.updateForm?.max_emi_budget_type}
                            value={props?.updateForm?.max_emi_budget_type}
                            onChange={(item: any) => {
                                props.setUpdateForm({
                                    ...props.updateForm,
                                    max_emi_budget_type: item.value,
                                })
                            }}
                            newRenderItem={(item: any) => {
                                return (
                                    <>
                                        <View style={Styles.item}>
                                            <Text style={Styles.textItem}>{item.value}</Text>
                                        </View>
                                    </>
                                );
                            }}
                        />
                    </View>
                </View>
                <View style={styles.selectsView}>
                    <Text style={styles.selectsTxt}>{"Purpose"}</Text>
                </View>
                <View style={[styles.straightVw, { width: '80%' }]}>
                    <View style={[styles.radioView, { marginHorizontal: 0 }]}>
                        <RadioButton.Android
                            value={props.updateForm?.purpose}
                            status={props.updateForm.purpose === "end user" ? "checked" : "unchecked"}
                            onPress={() => props.setUpdateForm({
                                ...props.updateForm,
                                purpose: 'end user'
                            })}
                            color={PRIMARY_THEME_COLOR}
                        />
                        <Text style={styles.checkTxt}>{'End User'}</Text>
                    </View>
                    <View style={[styles.radioView, { marginHorizontal: 0 }]}>
                        <RadioButton.Android
                            value={props.updateForm?.purpose}
                            status={props.updateForm.purpose === "invest" ? "checked" : "unchecked"}
                            onPress={() => props.setUpdateForm({
                                ...props.updateForm,
                                purpose: 'invest'
                            })}
                            color={PRIMARY_THEME_COLOR}
                        />
                        <Text style={styles.checkTxt}>{'Investment'}</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.noMoveVw}>
                <Button
                    handleBtnPress={(type: any) => props.onPressNext(2)}
                    rightImage={images.forwardArrow}
                    buttonText={strings.next}
                    textTransform={"uppercase"}
                />
            </View>
        </View>
    )
}
export default VisitorUpdateView