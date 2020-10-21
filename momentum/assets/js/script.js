const greeting = document.getElementById('greeting')
const name = document.getElementById('name')
const focus = document.getElementById('focus')
const hours = document.getElementById('hour')
const minutes = document.getElementById('minutes')
const seconds = document.getElementById('seconds')
const fullDate = document.getElementById('date')
const displayName = document.getElementById('display__name')
const displayFocus = document.getElementById('display__focus')
const nextImageButton = document.querySelector('.next-image__button')
const quoteText = document.querySelector('.quotes__text')
const quoteAuthor = document.querySelector('.quotes__author')
const quoteButton = document.querySelector('.quote__button')
const temp = document.querySelector('.weather__temperature')
const air = document.querySelector('.weather__air')
const wind = document.querySelector('.weather__wind')
const weatherIcon = document.querySelector('.weather__icon')
const weatherCity = document.querySelector('.weather__city')
const weatherInput = document.getElementById('city')
const weatherButton = document.querySelector('.weather__button')
const weatherBlock = document.querySelector('.weather__container')

const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg']

if (localStorage.getItem('counter') === null) localStorage.setItem('counter', '0')
if (localStorage.getItem('city') === null) localStorage.setItem('city', 'минск')

let validCity = ''

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n
}

function showTime() {
    const today = new Date()
    const hour = today.getHours()
    const min = today.getMinutes()
    const sec = today.getSeconds()
    const day = today.getDay()
    const date = today.getDate()
    const month = today.getMonth()
    const days = {
        1: 'Понедельник',
        2: 'Вторник',
        3: 'Среда',
        4: 'Четверг',
        5: 'Пятница',
        6: 'Суббота',
        7: 'Воскресенье'
    }
    const months = {
        1: 'Января',
        2: 'Февраля',
        3: 'Марта',
        4: 'Апреля',
        5: 'Мая',
        6: 'Июня',
        7: 'Июля',
        8: 'Августа',
        9: 'Сентября',
        10: 'Октября',
        11: 'Ноября',
        12: 'Декабря'
    }

    hours.innerText = `${addZero(hour)}`
    minutes.innerText = `${addZero(min)}`
    seconds.innerText = `${addZero(sec)}`
    fullDate.innerText = `${days[day]}, ${date} ${months[month]}`

    if (min === 0 && sec === 0) {
        nextImg()
        getQuote()
        getWeather()
    }
    setTimeout(showTime, 1000)
}

function setBgGreet() {
    if (+localStorage.getItem('counter') === images.length) localStorage.setItem('counter', '0')
    const today = new Date()
    const hour = today.getHours()
    const img = document.createElement('img')
    const src = images[+localStorage.getItem('counter')]

    if (hour >= 6 && hour < 12) {
        localStorage.setItem('folderCounter', '0')
        img.src = `./assets/img/morning/${src}`
        img.onload = () => {
            document.body.style.background = `center / cover no-repeat url('./assets/img/morning/${src}')`
        }
        greeting.textContent = 'Доброе утро,'
    } else if (hour >= 12 && hour < 18) {
        localStorage.setItem('folderCounter', '1')
        img.src = `./assets/img/day/${src}`
        img.onload = () => {
            document.body.style.background = `center / cover no-repeat url('./assets/img/day/${src}')`
        }
        greeting.textContent = 'Добрый день,'
    } else if (hour >= 18 && hour < 24) {
        localStorage.setItem('folderCounter', '2')
        img.src = `./assets/img/evening/${src}`
        img.onload = () => {
            document.body.style.background = `center / cover no-repeat url('./assets/img/evening/${src}')`
        }
        greeting.textContent = 'Добрый вечер,'
    } else {
        localStorage.setItem('folderCounter', '3')
        img.src = `./assets/img/night/${src}`
        img.onload = () => {
            document.body.style.background = `center / cover no-repeat url('./assets/img/night/${src}')`
        }
        greeting.textContent = 'Доброй ночи,'
    }
}

function nextImg() {
    nextImageButton.disabled = true
    localStorage.setItem('counter', `${+localStorage.getItem('counter') + 1}`)
    setBgGreet()
    setTimeout(() => nextImageButton.disabled = false, 1000)
}

function nextImgNew() {
    localStorage.setItem('counter', `${+localStorage.getItem('counter') + 1}`)
    if (+localStorage.getItem('counter') === images.length) {
        localStorage.setItem('counter', '0')
        localStorage.setItem('folderCounter', `${+localStorage.getItem('folderCounter') + 1}`)
    }
    const img = document.createElement('img')
    const imageNumber = +localStorage.getItem('counter')
    const folderNumber = +localStorage.getItem('folderCounter')


    const folders = {
        0: 'morning',
        1: 'day',
        2: 'evening',
        3: 'night'
    }

    img.src = `./assets/img/night/${images[imageNumber]}`
    img.onload = () => {
        document.body.style.background = `center / cover no-repeat url('./assets/img/${folders[folderNumber]}/${images[imageNumber]}')`
    }

    // localStorage.setItem('folderCounter', `${+localStorage.getItem('folderCounter') + 1}`)
}

function getData(item, displayValue, editValue) {
    let localData = localStorage.getItem(item)
    if (!localData) {
        displayValue.textContent = ''
        displayValue.style.display = 'none'
        editValue.style.display = 'block'
    } else {
        displayValue.textContent = localData
        displayValue.style.display = 'block'
        editValue.style.display = 'none'
    }
}

function setName(e) {
    if (e.type === 'keypress') {
        if (e.code === 'Enter') {
            e.target.value.trim() && localStorage.setItem('name', e.target.value)
            name.blur()
            getData('name', displayName, name)
        }
    } else {
        e.target.value.trim() && localStorage.setItem('name', e.target.value)
        getData('name', displayName, name)
    }
}

function setFocus(e) {
    if (e.type === 'keypress') {
        if (e.code === 'Enter') {
            e.target.value.trim() && localStorage.setItem('focus', e.target.value)
            focus.blur()
            getData('focus', displayFocus, focus)
        }
    } else {
        e.target.value.trim() && localStorage.setItem('focus', e.target.value)
        getData('focus', displayFocus, focus)
    }
}

function editModeName() {
    displayName.style.display = 'none'
    name.style.display = 'block'
    name.value = ''
    name.focus()
}

function editModeFocus() {
    displayFocus.style.display = 'none'
    focus.style.display = 'block'
    focus.value = ''
    focus.focus()
}

function getQuote() {
    quoteButton.disabled = true
    const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru`
    fetch(url).then(response => response.json()).then(data => {
        quoteText.textContent = data.quoteText
        quoteAuthor.textContent = data.quoteAuthor
        quoteButton.disabled = false
    })
}

function getWeather() {
    const city = localStorage.getItem('city')
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=377548d4b7b255d4668e4666fc59bf50&units=metric`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            weatherCity.textContent = data.name
            if (weatherIcon.classList.length > 2) {
                weatherIcon.classList.remove(weatherIcon.classList[weatherIcon.classList.length - 1])
                weatherIcon.classList.add(`owf-${data.weather[0].id}`)
            } else {
                weatherIcon.classList.add(`owf-${data.weather[0].id}`)
            }
            temp.textContent = `${data.main.temp.toFixed(0)}°C`
            air.innerHTML = `<i class="material-icons">bubble_chart</i><span>&nbsp;${data.main.humidity.toFixed(0)}%</span>`
            wind.innerHTML = `<i class="material-icons">toys</i><span>&nbsp;${data.wind.speed.toFixed(0)} м/с</span>`
            weatherBlock.style.display = 'flex'
            weatherInput.style.display = 'none'
            weatherInput.placeholder = 'введите город'
            weatherInput.value = ''
            validCity = city
        })
        .catch(() => {
            weatherInput.style.display = 'block'
            weatherInput.value = ''
            weatherInput.placeholder = 'такого города нет'
            weatherInput.focus()
        })
}

function editCity() {
    weatherBlock.style.display = 'none'
    weatherInput.style.display = 'block'
    weatherInput.focus()
}

function setCity(e) {
    if (e.type === 'keypress') {
        if (e.code === 'Enter') {
            if (!e.target.value) {
                localStorage.setItem('city', validCity)
                getWeather()
            } else {
                localStorage.setItem('city', e.target.value)
                weatherInput.blur()
                getWeather()
            }
        }
    } else {
        if (!e.target.value) {
            localStorage.setItem('city', validCity)
            getWeather()
        } else {
            localStorage.setItem('city', e.target.value)
            getWeather()
        }
    }
}

name.addEventListener('keypress', setName)
name.addEventListener('blur', setName)
focus.addEventListener('keypress', setFocus)
focus.addEventListener('blur', setFocus)
displayName.addEventListener('click', editModeName)
displayFocus.addEventListener('click', editModeFocus)
nextImageButton.addEventListener('click', nextImg)
quoteButton.addEventListener('click', getQuote)
weatherButton.addEventListener('click', editCity)
weatherInput.addEventListener('keypress', setCity)
weatherInput.addEventListener('blur', setCity)

showTime()
setBgGreet()
getData('name', displayName, name)
getData('focus', displayFocus, focus)
getQuote()
getWeather()
