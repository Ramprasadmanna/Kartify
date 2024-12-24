const dateTimeFormatter = (dateTime) => {
  const dateUTC = new Date(dateTime);

  const options = {
    timeZone: "Asia/Kolkata",
    hour12: true,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
  };

  const indianDateTime = dateUTC.toLocaleString("en-IN", options);

  return indianDateTime;
}

export { dateTimeFormatter };