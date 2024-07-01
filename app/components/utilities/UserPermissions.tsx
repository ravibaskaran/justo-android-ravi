import React from "react";
import { useSelector } from "react-redux";
import { handleDetailResponse } from "./GlobalFuncations";

const usePermission = ({
    create: createStr,
    view: viewStr,
    edit: editStr,
    remove: removeStr,
    status : statusStar,
    approve : approveStar,
    allocate : allocateStar,
}: any) => {
    const permissionSelector = useSelector((state: any) => state.permissions);
    const { response={} } = permissionSelector;
    const result = response?.data
    let create = createStr &&
    handleDetailResponse(
        result.filter((i: any) => i.slug === createStr)
        )?.permission;
    let edit = editStr &&
        handleDetailResponse(
            result.filter((i: any) => i.slug === editStr)
        )?.permission;
    let view = viewStr &&
        handleDetailResponse(
            result.filter((i: any) => i.slug === viewStr)
        )?.permission;
    let status = statusStar &&
        handleDetailResponse(
            result.filter((i: any) => i.slug === statusStar)
        )?.permission;
    let approve = approveStar &&
        handleDetailResponse(
            result.filter((i: any) => i.slug === approveStar)
        )?.permission;
    let allocate = allocateStar &&
        handleDetailResponse(
            result.filter((i: any) => i.slug === allocateStar)
        )?.permission;
   
    return { create, edit, view, status, approve, allocate };
};
export default usePermission;
