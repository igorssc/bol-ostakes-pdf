export const formatDate = (date: string) => {
  const d = new Date(date)
    .toISOString()
    .substr(0, 10)
    .split("-")
    .reverse()
    .join("/");

  return d;
};

export const formatNamePdf = () =>
  new Date().toISOString().substr(0, 10).split("-").reverse().join("/") +
  "-" +
  new Date().getHours +
  "h" +
  new Date().getMinutes;
