import images from "app/assets/images";
import strings from "app/components/utilities/Localization";

export const MENUITEMS = [
    // {
    //     title: strings.dashboardHeader,
    //     icon: images.dashboard,
    //     path: "DashboardScreen",
    //     permission: true,
    //     deploy: true,
    //     sort: 1
    // },
    {
        title: strings.closingManagerHeader,
        icon: images.property,
        path: "ClosingManager",
        permission: true,
        deploy: true,
        slug: 'closing_manager',
        sort: 3
    },
    {
        title: strings.SourcingManagersHeader,
        icon: images.property,
        path: "SourcingManager",
        permission: true,
        deploy: true,
        slug: 'sourcing_manager',
        sort: 3
    },
    {
        title: strings.UserManagerHeader,
        icon: images.property,
        path: "UserManager",
        permission: true,
        deploy: true,
        slug: 'user_management',
        sort: 3
    },
    {
        title: strings.propertyManagementHeader,
        icon: images.property,
        path: "PropertyScreenView",
        permission: true,
        deploy: true,
        slug: 'property_management',
        sort: 2
    },
    {
        title: strings.appointmentHeader,
        icon: images.property,
        path: "Appointments",
        permission: true,
        deploy: true,
        slug: 'appointment_management',
        sort: 4
    },
    {
        title: strings.appointmentForVisitHeader,
        icon: images.event,
        path: "AppointmentForSite",
        permission: true,
        deploy: true,
        slug: 'appointment_ site_visit',
        sort: 3
    },
    {
        title: strings.cancelBooking,
        icon: images.property,
        path: "CancelBooking",
        permission: true,
        deploy: true,
        slug: 'cancel_booking',
        sort: 5
    },
    {
        title: strings.readytoBookHeader,
        icon: images.lead,
        path: "BookingList",
        permission: true,
        deploy: true,
        type: 'readyToBook',
        slug: 'ready_to_book',
        sort: 5
    },
    {
        title: strings.bookingRequestHead,
        icon: images.lead,
        path: "BookingList",
        permission: true,
        deploy: true,
        type: 'request',
        slug: 'booking_management',
        sort: 5
    },
    {
        title: strings.registrationReqHead,
        icon: images.lead,
        path: "BookingList",
        permission: true,
        deploy: true,
        type: 'register',
        slug: 'registration_management',
        sort: 5
    },
   
    {
        title: strings.recoveryHeader,
        icon: images.property,
        path: "Recovery",
        permission: true,
        deploy: true,
        slug: 'recovery',
        sort: 5
    },
    {
        title: strings.agencyHeader,
        icon: images.agency,
        path: "AgencyListing",
        permission: true,
        deploy: true,
        slug: 'channel_management',
        sort: 3
    },
    {
        title: strings.leadManagementHeader,
        icon: images.lead,
        path: "LeadManagementScreen",
        permission: true,
        deploy: true,
        slug: 'visitor_management',
        sort: 2
    },
    {
        title: strings.followupHeader,
        icon: images.event,
        path: "FollowUpScreen",
        permission: true,
        deploy: true,
        slug: 'followup_management',
        sort: 6
    },
    {
        title: strings.appointmentWithSMHeader,
        icon: images.event,
        path: "AppointmentScreenCPSM",
        permission: true,
        deploy: true,
        slug: 'appointment_with_sm',
        sort: 7
    },
    {
        title: strings.appointmentWithCPHeader,
        icon: images.event,
        path: "AppointmentScreenCPSM",
        permission: true,
        deploy: true,
        slug: 'appointment_with_cp',
        sort: 7
    },
   
    {
        title: strings.cpChecking,
        icon: images.lead,
        path: "CpChecking",
        permission: true,
        deploy: true,
        slug: 'cp_checking',
        sort: 9
    },
    {
        title: strings.leaderBoardHeader,
        icon: images.event,
        path: "LeaderBoard",
        permission: true,
        deploy: true,
        slug: 'leader_Board',
        sort: 8
    },
    {
        title: strings.PickuprequestHeader,
        icon: images.event,
        path: "PickupRequest",
        permission: true,
        deploy: true,
        slug: 'pickup_request',
        sort: 10
    },
    {
        title: strings.supportForumHeader,
        icon: images.support,
        path: "SupportForum",
        permission: true,
        deploy: true,
        slug: 'support_forum',
        sort: 8
    },
    {
        title: strings.supportHeader,
        icon: images.support,
        path: "Support",
        permission: true,
        deploy: true,
        slug: 'support',
        sort: 6
    },
    {
        title: strings.reportHeader,
        icon: images.report,
        path: "Report",
        permission: true,
        deploy: true,
        slug: 'report',
        sort: 4
    },
    {
        title: strings.projectDetailsReport,
        icon: images.report,
        path: "PDRScreen",
        permission: true,
        deploy: true,
        slug: 'project_details_report',
        sort: 4
    },
    {
        title: strings.chatHeader,
        icon: images.chat,
        path: "Chat",
        permission: true,
        deploy: true,
        slug: 'chat',
        sort: 6
    },
    // {
    //     title: strings.saleToolHeader,
    //     icon: images.support,
    //     path: "SalesTools",
    //     permission: true,
    //     deploy: true,
    //     slug: 'sales_tools',
    // },
    {
        title: strings.setting,
        icon: images.setting,
        path: "SettingScreen",
        permission: true,
        deploy: true,
        slug: '',
    },

]