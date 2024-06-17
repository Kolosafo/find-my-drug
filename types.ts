export type LocationSearchType =
  | "abuja"
  | "lagos"
  | "ibadan"
  | "enugu"
  | "kaduna"
  | "kano"
  | "owerri"
  | "portHarcourt"
  | "benin"
  | "everywhere";

export type UserType = {
  id?: string;
  userType: "pharmacy" | "individual";
  name: string;
  location: string;
  phoneNumber: number;
  email?: string;
};

export type DrugSearchType = {
  id?: string;
  name: string;
  searchLocations: LocationSearchType[];
  dateCreated: string;
  user?: UserType;
};

export type DrugFoundType = {
  id?: string;
  drugSearchId?: string;
  finderName: string;
  finderLocation: string;
  finderPhoneNumber: number | string;
  dateFound: string;
};

export type HistoryObjectType = {
  id?: string;
  name: string;
  pharmaciesContacted: string;
  responses: string;
  dateCreated: string;
};

export type PharmListType = {
  name: string;
  phoneNumber: string;
  address: string;
};
