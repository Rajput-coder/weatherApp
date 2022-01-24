// const base = `api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=b6da07fa5a20b57f96ba8111a35df158`;
const wrapper = document.querySelector(".wrapper"),
    inputPart = document.querySelector(".input-part"),
    infoTxt = inputPart.querySelector(".info-txt"),
    inputField = inputPart.querySelector("input"),
    locationBtn = inputPart.querySelector("button"),
    weatherPart = wrapper.querySelector(".weather-part"),
    wIcon = weatherPart.querySelector("img");

let api;


const heading = document.querySelector(".heading i");

inputField.addEventListener("keyup", e => {
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Your browser not support geolocation api");
    }
});

function requestApi(city) {
    if (city == "Sambhajinagar" || city == "sambhajinagar") {
        api = `https://api.openweathermap.org/data/2.5/weather?q=Aurangabad&units=metric&appid=b6da07fa5a20b57f96ba8111a35df158`;
    } else {
        api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b6da07fa5a20b57f96ba8111a35df158`;
    }
    fetchData();
}

function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=b6da07fa5a20b57f96ba8111a35df158`;
    fetchData();
}

function onError(error) {
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function fetchData() {
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() => {
        infoTxt.innerText = "Something went wrong";
        infoTxt.classList.replace("pending", "error");
    });
}

function weatherDetails(info) {
    if (info.cod == "404") {
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    } else {
        const city = info.name;
        const country = info.sys.country;
        const { description, id } = info.weather[0];
        const { temp, feels_like, humidity } = info.main;


        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        weatherPart.querySelector(".weather").innerText = description;
        if (city == "Aurangabad" || city == "aurangabad") {
            weatherPart.querySelector(".location span").innerText = `Sambhajinagar, ${country}`;
        } else {
            weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
        }
        weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        inputField.value = "";
        wrapper.classList.add("active");

        heading.classList.add("display");

    }
}
const btn = document.querySelector(".heading i");
btn.addEventListener('click', () => {
    wrapper.classList.remove("active");
    heading.classList.remove("display");
});