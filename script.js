let toggleStatus = "c";
displayCurrentLocationWeatherInfo();

const london = document.querySelector("#london");
const tokyo = document.querySelector("#tokyo");
const NY = document.querySelector("#NY");
const paris = document.querySelector("#paris");
const form = document.querySelector("form");
const searchInput = document.querySelector("#search");
const temp = document.querySelector("#temp");
const currentLocation = document.querySelector("#currentLocation");
const myLoc = document.querySelector("#myLocation");
const cityName = document.querySelector("#cityName");
const countryName = document.querySelector("#countryName");
const conditionStatus = document.querySelector("#condition");
const conditionIcon = document.querySelector("#conditionIcon");
const rise = document.querySelector("#rise");
const set = document.querySelector("#set");
const high = document.querySelector("#high");
const low = document.querySelector("#low");

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
        condition_icon: data.current.condition.icon,
        temp_c: data.current.temp_c,
        temp_f: data.current.temp_f,
        sunrise: data.forecast.forecastday[0].astro.sunrise,
        sunset: data.forecast.forecastday[0].astro.sunset,
        maxtemp_c: data.forecast.forecastday[0].day.maxtemp_c,
        maxtemp_f: data.forecast.forecastday[0].day.maxtemp_f,
        mintemp_c: data.forecast.forecastday[0].day.mintemp_c,
        mintemp_f: data.forecast.forecastday[0].day.mintemp_f,
      };
      return required_data;
    } else {
      throw new Error("Invalid input");
    }
  } catch (error) {
    alert(error);
  }
}
const toggle_C = document.querySelector("#toggle_C");
const toggle_F = document.querySelector("#toggle_F");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  displayWeatherInfo(searchInput.value);
});

london.addEventListener("click", () => {
  displayWeatherInfo("london");
});
tokyo.addEventListener("click", () => {
  displayWeatherInfo("tokyo");
});
NY.addEventListener("click", () => {
  displayWeatherInfo("NY");
});
paris.addEventListener("click", () => {
  displayWeatherInfo("paris");
});
myLoc.addEventListener("click", () => {
  displayCurrentLocationWeatherInfo();
});

function displayWeatherInfo(loc) {
  getWeatherData(loc)
    .then((data) => {
      currentLocation.innerHTML = `${data.city_name}, ${data.country_name}`;
      conditionStatus.innerHTML = data.condition;
      conditionIcon.setAttribute("src", data.condition_icon);
      temp.innerHTML = data[`temp_${toggleStatus}`] + "°";
      rise.innerHTML = `Rise: <span>${data.sunrise}</span> |`;
      set.innerHTML = `Set: <span>${data.sunset}</span> |`;
      high.innerHTML = `High: <span>${
        data[`maxtemp_${toggleStatus}`]
      }°</span> |`;
      low.innerHTML = `Low: <span>${data[`mintemp_${toggleStatus}`]}°</span>`;
      return data;
    })
    .then((data) => {
      toggle(data);
    });
}

function toggle(data) {
  toggle_F.addEventListener("click", () => {
    temp.innerHTML = data.temp_f + "°";
    high.innerHTML = `High: <span>${data.maxtemp_f}°</span> |`;
    low.innerHTML = `Low: <span>${data.mintemp_f}°</span>`;
    toggleStatus = "f";
  });
  toggle_C.addEventListener("click", () => {
    temp.innerHTML = data.temp_c + "°";
    high.innerHTML = `High: <span>${data.maxtemp_c}°</span> |`;
    low.innerHTML = `Low: <span>${data.mintemp_c}°</span>`;
    toggleStatus = "c";
  });
}

function displayCurrentLocationWeatherInfo() {
  navigator.geolocation.getCurrentPosition(showPosition);
  async function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    try {
      const response = await fetch(
        `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=65fe01ab3517a136534026yfvc1453a`
      );
      if (response.ok) {
        const data = await response.json();
        const myCity = data.address.city;
        displayWeatherInfo(myCity);
      } else {
        throw new Error("Invalid Location");
      }
    } catch (error) {
      alert(error);
    }
  }
}
