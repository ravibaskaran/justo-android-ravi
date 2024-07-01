import { authStore, changePasswordReducer, forgotReducer, loadingReducer, otpVerifyReducer, updatepasswordReducer, userData, userDetailReducer, userReducer } from "./AuthReducer";
import { addEditAgencyReducer, addTargetForCpReducer, agencyCreateFormReducer, agencyReducer, agencyStatusReducer } from "./AgencyReducer";
import { SourcingManagerReducer } from "./SourcingManagerReducer";
import { addAgentReducer, agentReducer, editAgentReducer, emailAndMobileReducer } from "./AgentReducer";
import { competitorpropertyReducer, propertyDetailReducer, propertyFormReducer, propertyReducer, removeAllocatePropertyDataReducer } from "./propertyReducers";
import { settingReducer } from "./SettingReducer";
import { appointmentReducer, editAddAppointmentReducer } from "./AppointmentWithCpReducer";
import { AddfollowUpReducer, followUpReducer } from "./FollowUpReducer";
import { masterDataReducer, masterRemoveReducer } from "./MasterReducer";
import { addVisitorReducer, checkVisitorReducer, editVisitorReducer, visitorListReducer, visitorReducer } from "./LeadsReducer";
import { addBookingReducer, appointmentCLReducer } from "./AppointmentCLReducer";
import { ClosingManagerReducer } from "./ClosingManagerReducer";
import { BookingReducer, cancelAddBookingReducer, } from "./BookingReducer";
import { dashboardReducer, statusUpdateReducer } from "./DashboardReducer";
import { deleteNotificationReducer, notificationListReducer } from "./NotificationReducer";
import { PickUpReducer, UpdatePickUpStatusReducer } from "./PickUpReducer";
import { transferVisitorReducer, transferVisitReducer } from "./TransferVisitReducer";
import { firebaseReducer } from "./FirebaseReducer";
import { ChatReducer, getRecentChatList, propertyChatReducer, updateChatStatus } from "./ChatReducer";
import { userAppointmentReducer, userEditAppointmentReducer } from "./AppointmentWithUserReducer";
import { supportForumReducer, supportForumUpdateReducer } from "./SupportForumReducer";
import { CpCheckingReducer } from "./CpCheckingReducer";
import { SupportAddReducer, SupportReducer } from "./SupportReducer";
import { leaderBoardReducer } from "./LearderBoardReducer";
import permissionReducer, { notificationCountReducer } from "./permissionReducer";
import { UserManagerReducer } from "./UserManagerReducer";
import { RecoveryReducer } from "./RecoveryReducer";
import { CompanyReducer, EmployeeReducer } from "./CompanyReducer";
import { ReportReducer } from "./ReportReducer";

export default {
    loadingReducer: loadingReducer,
    userDetail: userDetailReducer,
    userData: userData,
    login: authStore,
    userReducer: userReducer,
    forgotResponce: forgotReducer,
    otpVerifyResponce: otpVerifyReducer,
    updatepasswordResponce: updatepasswordReducer,
    changePasswordResponse: changePasswordReducer,
    // Agency
    agencyForm: agencyCreateFormReducer,
    agency: agencyReducer,
    agencyStatus: agencyStatusReducer,
    addEditAgency: addEditAgencyReducer,
    addTargetForCpData: addTargetForCpReducer,
    editAgentData: editAgentReducer,
    addAgentData: addAgentReducer,

    SourcingManager: SourcingManagerReducer,
    propertyform: propertyFormReducer,
    propertyData: propertyReducer,
    competitorproperty: competitorpropertyReducer,
    removeAllocateproperty: removeAllocatePropertyDataReducer,
    propertydetailData: propertyDetailReducer,
    agentData: agentReducer,
    emailAndMobileData: emailAndMobileReducer,
    settingData: settingReducer,
    appointment: appointmentReducer,
    CpCheckingData: CpCheckingReducer,
    editAddAppointment: editAddAppointmentReducer,
    followUp: followUpReducer,
    AddfollowUp: AddfollowUpReducer,
    masterData: masterDataReducer,
    masterRemove: masterRemoveReducer,
    notificationData: notificationListReducer,
    deleteNotificationData: deleteNotificationReducer,
    transferVisitData: transferVisitReducer,
    transferVisitorData: transferVisitorReducer,
    firebaseData: firebaseReducer,

    //Dashboard
    dashboardData: dashboardReducer,
    statusUpdateData: statusUpdateReducer,

    // Appointment CL
    appointmentCL: appointmentCLReducer,
    userAppointmentData: userAppointmentReducer,
    userEditAppointmentData: userEditAppointmentReducer,

    // Booking
    booking: BookingReducer,
    cancelAddBooking: cancelAddBookingReducer,
    addedBooking: addBookingReducer,

    // chat
    chatData: ChatReducer,
    chatStatusData: updateChatStatus,
    recentChatListData: getRecentChatList,
    propertyChatListData: propertyChatReducer,

    // visit modal
    visitorData: visitorReducer,
    visitorDataList: visitorListReducer,
    editVisitorData: editVisitorReducer,
    addVisitorData: addVisitorReducer,
    checkVisitorData: checkVisitorReducer,

    //closing model
    ClosingManager: ClosingManagerReducer,

    // user manager 
    UserManager: UserManagerReducer,

    //pickUp
    Pickup: PickUpReducer,
    updatePickUpStatusData: UpdatePickUpStatusReducer,

    //support Forum
    supportForumData: supportForumReducer,
    supportForumUpdateData: supportForumUpdateReducer,

    // recovery
    RecoveryData: RecoveryReducer,

    //ledearboard
    leaderBoard: leaderBoardReducer,
    // Raise Ticket (Support)
    SupportAdd: SupportAddReducer,
    SupportData: SupportReducer,

    // Permissions
    permissions: permissionReducer,
    notificationCount: notificationCountReducer,

    //company 

    companyData: CompanyReducer,
    employeeData: EmployeeReducer,

   //report
   reportData : ReportReducer,
}