import React, { useState } from "react";
import { useSelector } from "react-redux";
const useLoader = () => {
    const { loading } = useSelector((state: any) => state.loadingReducer);
  return [ loading ];
};
export default useLoader;