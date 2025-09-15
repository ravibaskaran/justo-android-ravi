import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import {
  BLACK_COLOR,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import AllocateCPDetails from "../components/AllocateDetails";
import styles from "./styles";

const AllocateCPView = (props: any) => {
  return (
    <View style={styles.mainContainer}>
      <Header
        headerText={strings.cpAllocation}
        headerStyle={styles.headerStyle}
        headerTextStyle={styles.headerTextStyle}
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        RightSecondIconStyle={{ tintColor: WHITE_COLOR }}
        leftImageIconStyle={{ tintColor: WHITE_COLOR }}
        handleOnLeftIconPress={props.onPressBack}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <View style={styles.containerVw}>
        <Text style={styles.headerTxt}>{strings.newAllocateTxt}</Text>
        <View style={styles.selectedBox}>
          {props?.selectedCp?.length > 0 ? (
            <>
              {props?.selectedCp?.map((item: any, index: any) => {
                return (
                  <View
                    style={[styles.innerBoxVw, { justifyContent: "center" }]}
                  >
                    <Text>{item.cpName}</Text>
                    <TouchableOpacity
                      onPress={() => props.handleDelete(item, index)}
                    >
                      <Image source={images.close} style={styles.crossVw} />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </>
          ) : (
            <Text style={styles.noSelectedTxt}>{strings.noCpSelected}</Text>
          )}
        </View>
        <TextInput
          placeholder={strings.search}
          placeholderTextColor={BLACK_COLOR}
          style={styles.searchInputVw}
          onFocus={() => props.setAllList(true)}
          onChangeText={(text: any) => props.handleSearch(text)}
        />
        {props.allList ? (
          <FlatList
removeClippedSubviews={false}
            data={props.cpList}
            renderItem={({ item, index }: any) => {
              const getSelected =
                props?.selectedCp?.length === 0
                  ? ""
                  : props?.selectedCp?.map(({ cpName }: any) => cpName);
              return (
                <View style={styles.innerBoxVw}>
                  <Text>{item.cpName}</Text>
                  <TouchableOpacity
                    onPress={() => props.handleSelects(item)}
                    style={styles.checkBoxVw}
                  >
                    {/* <Image
                      style={styles.checksVw}
                      source={
                        getSelected?.toString()?.includes(item.cpName)
                          ? images.check
                          : null
                      }
                    /> */}
                    {getSelected?.toString()?.includes(item.cpName) ? (
                      <Image style={styles.checksVw} source={images.check} />
                    ) : (
                      <View style={styles.checksVw}></View>
                    )}
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        ) : null}

        <View style={{ marginTop: 25, alignItems: "flex-end" }}>
          <Button
            width={150}
            height={40}
            btnTxtsize={16}
            buttonText={strings.cpAllocation}
            textTransform={null}
            handleBtnPress={() => props.handleAddTarget()}
          />
        </View>
      </View>
      <AllocateCPDetails
        Visible={props.CPDetails}
        setIsVisible={props.setCPDetails}
        handleAddTarget={() => props.setCPDetails(false)}
      />
    </View>
  );
};
export default AllocateCPView;
