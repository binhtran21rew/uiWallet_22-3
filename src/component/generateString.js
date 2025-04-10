import { addMonths, format } from 'date-fns';

export const generateRandomString = (length = 36) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};
const generateData = () => ({
  address: generateRandomString(30),
  number: Math.floor(100000 + Math.random() * 900000),
});

const formatDate = (date) => {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return new Date(date).toLocaleDateString("en-GB", options).replace(',', '');
};

export const  generateListHistory = (n) => {
  const statusOptions = ["success", "pending", "denied"];
  const name = generateRandomString(15);
  return Array.from({ length: n }, () => {
    const amount = Math.floor(1 + Math.random() * 999999);
    const tips = Math.floor(1 + Math.random() * 499);
    return {
      hash: generateRandomString(30),
      status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
      id: `#${Math.floor(100 + Math.random() * 900)}`,
      time: formatDate(new Date()),
      from: {name, ...generateData()},
      send: {name, ...generateData()},
      amount,
      tips,
      total: amount + tips,
    };
  });
}

export const parseDate = (dateStr) => {
  const months = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", 
                   Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };
  const [day, month, year] = dateStr.split(" ");
  return `${year}-${months[month]}-${day.padStart(2, '0')} 00:00:00`;
};


export const isDateInRange = (dateStr, range) => {
  if (!range || range.length !== 2) return true; // No filter applied
  const date = new Date(parseDate(dateStr)).getTime();
  const start = new Date(range[0]).getTime();
  const end = new Date(range[1]).getTime();
  return date >= start && date <= end;
};


export const formattedUnits = (unit) => {

  return unit.map((u) => ({
    ...u,
    formattedUnit: Number(u.unit).toLocaleString(),  // Add commas
    scientific: u.unit, // Keep scientific notation as a string
  }));
}


export  const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const addMonthsToDateNow = (months) =>  {
  
  const currentDate = new Date();
  const futureDate = addMonths(currentDate, months);

  return format(futureDate, 'dd/MM/yyyy');
}


export default generateRandomString;