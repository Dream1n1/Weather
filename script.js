const form = document.querySelector("form");
const searchInput = document.querySelector("#search");
const temp_f_select = document.querySelector("#temp_f");
const temp_c_select = document.querySelector("#temp_c");
const cityName = document.querySelector("#cityName");
const countryName = document.querySelector("#countryName");
const conditionStatus = document.querySelector("#condition");

async function getWeatherData(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=a9774ad507c042c1b23153602240703&q=${location}&days=3`,
      { mode: "cors" }
    );
    if (response.ok) {
      const data = await response.json();
      const required_data = {
        city_name: data.location.name,
        country_name: data.location.country,
        condition: data.current.condition.text,
        temp_c: data.current.temp_c,
        temp_f: data.current.temp_f,
      };
      return required_data;
    } else {
      throw new Error("Invalid input");
    }
  } catch (error) {
    alert(error);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  getWeatherData(searchInput.value).then((data) => {
    cityName.innerHTML = data.city_name;
    countryName.innerHTML = data.country_name;
    conditionStatus.innerHTML = data.condition;
    temp_c_select.innerHTML = data.temp_c;
    temp_f_select.innerHTML = data.temp_f;
  });
});

//data needed:
