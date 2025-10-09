import { v4 as uuidv4 } from 'uuid';

export const UserRole = {
  USER: "USER",
  TURF_ADMIN: "TURF_ADMIN",
  TURF_MANAGER: "TURF_MANAGER",
};

export const TurfStatus = [
  { value: "Open", label: "Open" },
  { value: "Closed", label: "Closed" },
];

export function getUUID() {
  return uuidv4();
}

export function getShortUUID() {
  return Math.floor(new Date().valueOf() * Math.random()).toString();
}

export const readMsgFromObject = (obj) => {
  if (typeof obj === "string") {
    return obj.toString();
  } else if (Object.keys(obj).length > 0) {
    let msg = "";
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === "string") {
        msg += `${msg.length > 0 ? ", " : ""}${obj[key]}`;
      } else if (Object.keys(obj[key]).length > 0) {
        Object.keys(obj[key]).forEach((key2) => {
          msg += `${msg.length > 0 ? ", " : ""}${obj[key][key2]}`;
        });
      }
    });
    return msg;
  }
  return "";
};

export const toErrorMsg = (error) => {
  if (error) {
    try {
      if (Array.isArray(error)) {
        return error.join(", ");
      } else if (typeof error === "object") {
        let msg = "";
        Object.keys(error).forEach((key) => {
          msg += `${msg.length > 0 ? ", " : ""}${error[key]}`;
        });
        return msg;
      } else {
        return error;
      }
    } catch (ex) {
      return "";
    }
  } else {
    return "";
  }
};