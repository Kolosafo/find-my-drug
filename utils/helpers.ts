import { SignUpFornType } from "@/app/(root)/auth/sign-up/page";
import moment from "moment";


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
