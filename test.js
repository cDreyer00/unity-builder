const curDate = new Date();

const date = {
    year: curDate.getFullYear(),
    month: curDate.getMonth() + 1,
    day: curDate.getDate(),
    hours: curDate.getHours(),
    minutes: curDate.getMinutes()
};

console.log(`${date.year}${date.month}${date.day}`);