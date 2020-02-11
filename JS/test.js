getIpInfo = async () => {
  let response = await fetch("https://ipapi.co/json/");
  let data = await response.json();
  console.log("data", data);

  return data;
};

// getIpInfo().then(data => console.log(data));
