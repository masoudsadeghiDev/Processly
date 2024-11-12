import * as moment from "jalali-moment";
 
export function getYearList() {
  let yearList = [];
  let currentYear = Number(
    moment(new Date())
      .locale("fa")
      .format("YYYY/MM/DD")
      .split("/")[0],
  );
  for (let year = currentYear + 5; year > currentYear - 60; year--) {
    yearList.push({
      value: year,
      name: year,
    });
  }
 
  return yearList;
}
 
export function getNow() {
  return moment(new Date())
    .locale("fa")
    .format("YYYY/MM/DD");
}
 
export function convertDate(date) {
  return moment(new Date(date))
    .locale("fa")
    .format("YYYY/MM/DD");
}
 
export function convertToMilady(date: string) {
  return new Date(moment.from(date, "fa", "YYYY/MM/DD").format("YYYY/MM/DD"));
}