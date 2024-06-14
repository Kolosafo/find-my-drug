import { SignUpFornType } from "@/app/(root)/auth/sign-up/page";
import { LocationSearchType } from "@/types";
import moment from "moment";
import { SearchLocations } from "./mockups";

export const priceCalculator = (location: LocationSearchType[]) => {
  const removeEveryWhere = location.filter((l) => l !== "everywhere");
  const removeEveryWhereBase = SearchLocations.filter(
    (l) => l !== "everywhere",
  );
  if (removeEveryWhere.length === removeEveryWhereBase.length) {
    //THE FES ONE SIMILATES WHEN A USER CLICKS ON ALL LOCATIONS (WHICH IS SELECTING EVERYWHERE) WITHOUT EXPLICITLY CLICKING ON EVERWHERE
    //THE second ONE  EXPLICITLY CLICKS ON EVERWHERE WHICH GIVES ALL THE LOCATIONS
    // WE THE FEE FOR SEARCHING PHARMACIES AROUND NIGERIA SHOULD IS SET TO 30k, we can review this later
    return {
      price: 5000,
      searchAmount: removeEveryWhere.length * 120,
      locationCount: removeEveryWhere.length,
    };
  }

  // NOW IF THE SELECTED LOCATIONS ARE NOT ALL THE LOCATIONS WE WAN RETURN AN INCREMENTAL PRICE BASED ON HOW MANY LOCATIONS SELECTED
  return {
    price: 1000 * removeEveryWhere.length,
    searchAmount: removeEveryWhere.length * 120,
    locationCount: removeEveryWhere.length,
  };
};

export const authValidator = (
  data: SignUpFornType,
  handleErrorMsg: (msg: string) => void,
) => {
  if (data.confirmPassword !== data.password) {
    handleErrorMsg("Passwords do not match");
    return false;
  }
  if (typeof data.phoneNumber === "string" && data.phoneNumber.length !== 11) {
    handleErrorMsg("Invalid phone number");
    return false;
  }
  if (
    data.email &&
    data.password &&
    data.confirmPassword &&
    data.location &&
    data.phoneNumber &&
    data.userType
  ) {
    return true;
  }
  handleErrorMsg("All fields are required");
  return false;
};

export const checkIsTodayOrYesterday = (dateString: string) => {
  const date = moment(dateString);
  const today = moment();
  const yesterday = today.clone().subtract(1, "days");

  const isToday = date.isSame(today, "day");
  const isYesterday = date.isSame(yesterday, "day");

  return isToday
    ? "Today"
    : isYesterday
      ? "Yesterday"
      : date.toLocaleString().length > 13
        ? date.toLocaleString().substring(0, 11)
        : date.toLocaleString;
};

export function getRandomHexColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
