import moment from "moment";

// Convert time string (HH:mm) to minutes
export const toMinutes = (time: string): number => {
  return moment(time, "HH:mm").hours() * 60 + moment(time, "HH:mm").minutes();
};

// Convert minutes to HH:mm:ss format
export const toTimeWithSeconds = (mins: number): string => {
  return moment()
    .startOf("day")
    .add(mins, "minutes")
    .format("HH:mm:ss");
};

// Convert minutes to 12-hour format (e.g., 8:30 PM)
export const to12HrFormat = (mins: number): string => {
  return moment()
    .startOf("day")
    .add(mins, "minutes")
    .format("h:mm A");
};

// Validate and format time input
export const formatTime = (time: string): string | null => {
  const m = moment(time, ["HH:mm", "H:mm", "HH:mm:ss"], true); // strict parse
  return m.isValid() ? m.format("HH:mm") : null;
};
