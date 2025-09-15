import React, { useEffect, useRef, useState } from "react";
import { AppState, View } from "react-native";
import "react-native-gesture-handler";
import { useSelector } from "react-redux";
import Route from "./route";
import Loader from "../components/CommonScreen/Loader";
import useLoader from "../components/useLoader";
import apiEndPoints from "../components/utilities/apiEndPoints";
import { apiCall } from "../components/utilities/httpClient";

const Root = () => {
  const [loading] = useLoader();

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const { userData = {} } = useSelector((state: any) => state.userData);

  const handleCreateActivity = async (item: any) => {
    const res = await apiCall("post", apiEndPoints.CREATEUSERACTIVITY, item);
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState.match(/inactive|background/)) {
        if (userData?.data?._id) {
          console.log("App has come to the foreground!");
          handleCreateActivity({
            login_id: userData?.data?._id,
            module_name: "App in Background",
          });
        }
      } else if (nextAppState.match(/active/)) {
        if (userData?.data?._id) {
          console.log("App has come to the Active!");
          handleCreateActivity({
            login_id: userData?.data?._id,
            module_name: "App Activated",
          });
        }
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });
    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
      {loading && <Loader />}
      <Route />
    </View>
  );
};

export default Root;
