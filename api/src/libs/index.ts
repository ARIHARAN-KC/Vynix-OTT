import moment from "moment";

export const UserRole = {
  USER: "USER",
  TURF_ADMIN: "TURF_ADMIN",
  TURF_MANAGER: "TURF_MANAGER",
};

export function percentage(partialValue: any, totalValue: any) {
  return (100 * partialValue) / totalValue;
}

export function toDate(value: any) {
  return moment(value).format("DD/MM/YYYY");
}

export function toDateTime(value: any) {
  return moment(value).format("DD/MM/YYYY hh:mm:ss A");
}

export function toTime(value: any) {
  return moment(value).format("hh:mm:ss A");
}

export function getWeekDay(date: any) {
  switch (moment(date).weekday()) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "";
  }
}

export function getMonth(date: any) {
  switch (moment(date).month()) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      return "";
  }
}

export const getTime = (time: string) => {
  if (time && time.length > 0) {
    let splitArray = time.split(":");
    let hours = parseInt(splitArray[0]);
    let minutes = parseInt(splitArray[1]);
    return `${hours > 9 ? (hours > 12 ? hours - 12 : hours) : "0" + hours}:${
      minutes > 9 ? minutes : "0" + minutes
    } ${hours > 12 ? "PM" : "AM"}`;
  } else {
    return "";
  }
};

export const isFutureDate = (date: Date) => {
  return date.setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0);
};

export const getHString = (req: any, key: string): string => {
  const value = req.headers[key];
  return typeof value === "string"
    ? value
    : Array.isArray(value)
    ? value[0]
    : "";
};
