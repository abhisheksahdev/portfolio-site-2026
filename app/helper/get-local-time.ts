import { Temporal } from "@js-temporal/polyfill";

export const currentLocation = "Ethelbari";

export const makeTimeString = () => {
  const tzId = "Asia/Kolkata";

  const hours =
    Temporal.Now.zonedDateTimeISO(tzId).hour < 10
      ? "0".concat(Temporal.Now.zonedDateTimeISO(tzId).hour.toString())
      : Temporal.Now.zonedDateTimeISO(tzId).hour.toString();
  const minutes =
    Temporal.Now.zonedDateTimeISO(tzId).minute < 10
      ? "0".concat(Temporal.Now.zonedDateTimeISO(tzId).minute.toString())
      : Temporal.Now.zonedDateTimeISO(tzId).minute.toString();
  // const seconds =
  //   Temporal.Now.zonedDateTimeISO(tzId).second < 10
  //     ? "0".concat(Temporal.Now.zonedDateTimeISO(tzId).second.toString())
  //     : Temporal.Now.zonedDateTimeISO(tzId).second.toString();

  return `${hours}:${minutes}`;
};
