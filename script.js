async function getWeatherData(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=a9774ad507c042c1b23153602240703&q=${location}`,
      { mode: "cors" }
    );
    const data = await response.json();
    const required_data = {
      city_name: data.location.name,
      country_name: data.location.country,
      temp_c: data.current.temp_c,
      temp_f: data.current.temp_f,
    };
    console.log(required_data);
  } catch (error) {
    console.log(error);
  }
}

getWeatherData("rabat");
