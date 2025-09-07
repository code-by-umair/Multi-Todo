export const formatDate = (date) => {if(date==false){
  return false
}else{
  const updateddate = new Date(date).toLocaleString("en-GB", {
    year: "numeric", // e.g. '2025'
    month: "short", // e.g. 'January'
    day: "numeric", // e.g. '21'
    hour: "2-digit", // e.g. '13'
    minute: "2-digit", // e.g. '45'
    second: "2-digit", // e.g. '01'
  });
  return updateddate;}
};
