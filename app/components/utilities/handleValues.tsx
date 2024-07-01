export const handleValues = (val: any) => {
    if (val === "" || val === undefined || val === null ||
        val === "null" || val === "undefined") {
        return false
    } else {
        return true
    }
}