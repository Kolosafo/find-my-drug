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
