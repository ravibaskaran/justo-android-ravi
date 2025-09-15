import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import EmptyListScreen from "../../../../components/CommonScreen/EmptyListScreen";
import Header from "../../../../components/Header";
import AddTargetModal from "../../../../components/Modals/AddTargetModal";
import ConfirmModal from "../../../../components/Modals/ConfirmModal";
import FilterModal from "../../../../components/Modals/FilterModal";
import {
  PRIMARY_THEME_COLOR,
  ROLE_IDS,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import usePermission from "../../../../components/utilities/UserPermissions";
import ClosingManagersItem from "./ClosingMangerItem";
import styles from "./styles";

const ClosingDetailsView = (props: any) => {
  const loadingref = false;
  const { create } = usePermission({
    create: "add_new_closing_manager",
  });
  const { userData = {} } = useSelector((state: any) => state.userData);

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        // rightFirstImageScr={images.filter}
        rightSecondImageScr={images.notification}
        headerText={
          userData?.data?.role_id === ROLE_IDS.clusterhead_id
            ? strings.closingTL
            : strings.closingManagerHeader
        }
        handleOnLeftIconPress={props.handleDrawerPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        // handleOnRightFirstIconPress={() => props.setFilterisVisible(true)}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={"light-content"}
      />
      <Text style={styles.count}>
        {" "}
        Count :{" "}
        {props?.ClosingManagers?.length > 0
          ? props?.ClosingManagers?.length
          : 0}
      </Text>
      {create && (
        <View style={{ alignItems: "flex-end", paddingVertical: 10 }}>
          <Button
            height={30}
            width={150}
            buttonText={strings.addNewCM}
            textTransform={null}
            btnTxtsize={15}
            handleBtnPress={() => props.handleAddNewCM("add", {})}
          />
        </View>
      )}
      <View style={styles.listViewsec}>
        <FlatList
          removeClippedSubviews={false}
          showsVerticalScrollIndicator={false}
          data={props?.ClosingManagers}
          renderItem={({ item }) => (
            <ClosingManagersItem
              items={item}
              onPressEditCM={() => props.handleAddNewCM("edit", item)}
              onPressView={() => props.onPressViews(item)}
              onPressEditTarget={(item: any) => props.onPressEditTarget(item)}
            />
          )}
          refreshing={loadingref}
          onRefresh={() => props.onRefresh()}
          ListEmptyComponent={
            <EmptyListScreen
              message={
                userData?.data?.role_id === ROLE_IDS.clusterhead_id
                  ? strings.closingTL
                  : strings.closingManagerHeader
              }
            />
          }
        />
      </View>
      <ConfirmModal
        Visible={props.status}
        setIsVisible={props.setStatus}
        stringshow={strings.selectCM}
        middleTxt={
          strings.selectCM + " " + strings.transferToAllVisitor + " CM Name ?"
        }
        confirmtype={""}
      />
      <FilterModal
        Visible={props.filterisVisible}
        setIsVisible={props.setFilterisVisible}
      />
      <AddTargetModal
        Visible={props.isVisible}
        setIsVisible={props.setIsVisible}
        targetForm={props.targetForm}
        setTargetForm={props.setTargetForm}
        handleAddTarget={props.handleAddTarget}
        roleIdForSelectedUser={props.roleIdForSelectedUser}
        type={"single"}
      />
    </View>
  );
};
export default ClosingDetailsView;
