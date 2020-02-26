const getDate = (a, b) => {
  if (b) {
    console.log("b", b);
  } else {
    console.log("a", a);
  }
};

const useData = () => {
  const data = "data";
  getDate(data);
};

useData();
getDailyAndHourlyOpenWeahter("dakar");
