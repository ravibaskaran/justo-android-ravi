import images from "../../assets/images";
import strings from "./Localization";

export const leadTypes: any = [
  { label: `${strings.hot}`, value: `${strings.hot}` },
  { label: `${strings.warm}`, value: `${strings.warm}` },
  { label: `${strings.cold}`, value: `${strings.cold}` },
]
export const VisitStatus: any = [
  { label: `${strings.newLead}`, value: 1 },
  // { label: `${strings.createLead}`, value: 1 },
  { label: `${strings.readytoVisit}`, value: 3 },
  { label: `${strings.STSNotFitForSale}`, value: 6 },
  { label: `${strings.booking}`, value: 4 },
  { label: `${strings.cancelVisit}`, value: 8 },
  // { label: `${strings.registration}`, value: 5 },
  // { label: `${strings.readytoBookHeader}`, value: 7 },
]
export const CpType: any = [
  { label: `${strings.viaIndividual}`, value: 1 },
  { label: `${strings.viaCompany}`, value: 2 },
]
export const SearchByTeam: any = [
  { label: `${strings.sourcingTeam}`, value: 1 },
  { label: `${strings.closingTeam}`, value: 2 },
]

export const DATA: any = [
  { image: images.buildings },
  { image: images.buildings },
  { image: images.buildings },
  { image: images.buildings },
  { image: images.buildings },
  { image: images.buildings },
  { image: images.buildings },
  { image: images.buildings },
  { image: images.buildings },
  { image: images.buildings },
  { image: images.buildings },
  { image: images.buildings },
  { image: images.buildings },
  { image: images.buildings },
  { image: images.buildings },
  { image: images.buildings },
  { image: images.buildings },
  { image: images.buildings },
  { image: images.buildings },
  { image: images.buildings },
  { image: images.buildings },
];

export const dropdownData: any = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

export const AppointMentSmData: any = [
  {
    date: '15/10/2022',
    appointmentType: 'Meetting With SM',
    time: '11:00 AM',
    appointmentWith: 'ABC, XYZ, PKR',
    status: 'Confirm'
  },
  {
    date: '15/10/2022',
    appointmentType: 'Meetting With SM',
    time: '11:00 AM',
    appointmentWith: 'ABC, XYZ, PKR',
    status: 'Confirm'
  },
  {
    date: '15/10/2022',
    appointmentType: 'Meetting With SM',
    time: '11:00 AM',
    appointmentWith: 'ABC, XYZ, PKR',
    status: 'Confirm'
  },
]
export const MyAppointMentData: any = [
  {
    date: '15/10/2022 ',
    appointmentType: 'Meeting with CP',
    time: '11:00 AM',
    appointmentWith: 'CP Name',
    smName: 'SM Name',
    status: 'Pending',
  },
  {
    date: '15/10/2022 ',
    appointmentType: 'On Call meeting',
    time: '11:00 AM',
    appointmentWith: 'CP Name',
    smName: 'SM Name',
    status: 'Confirm',
  },
  {
    date: '15/10/2022 ',
    appointmentType: 'Walking with SH',
    time: '11:00 AM',
    appointmentWith: 'CP Name',
    smName: 'SM Name',
    status: 'Complete',
  },
]


export const users: any = [
  {
    email: 'sourcinghead@gmail.com',
    password: 123456,
    type: 'sourcinghead',
    name: 'Sourcing Head'
  },
  {
    email: 'closingmanager@gmail.com',
    password: 123456,
    type: 'closingmanager',
    name: 'Closing Manager'
  },
  {
    email: 'closinghead@gmail.com',
    password: 123456,
    type: 'closinghead',
    name: 'Closing Head'
  },
  {
    email: 'postsales@gmail.com',
    password: 123456,
    type: 'postsales',
    name: 'Post Sales'
  },
  {
    email: 'sitehead@gmail.com',
    password: 123456,
    type: 'closinghead',
    name: 'Closing Head'
  },
  {
    email: 'sourcingmanager@gmail.com',
    password: 123456,
    type: 'sourcingmanager',
    name: 'Sourcing Manager'
  },
]
