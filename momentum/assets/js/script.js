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

if (localStorage.getItem('counter') === null) localStorage.setItem('counter', '0')

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

    if (min === 0 && sec === 0) nextImg()
    setTimeout(showTime, 1000)
}

function setBgGreet() {
    const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg']
    if (+localStorage.getItem('counter') === images.length) localStorage.setItem('counter', '0')
    // let today = new Date(2020, 6, 10, 18, 33, 30)
    let today = new Date()
    let hour = today.getHours()
    let img = document.createElement('img')
    let src = images[+localStorage.getItem('counter')]

    if (hour >= 6 && hour < 12) {
        img.src = `./assets/img/morning/${src}`
        img.onload = () => {
            document.body.style.background = `center / cover no-repeat url('./assets/img/morning/${src}')`
        }
        greeting.textContent = 'Доброе утро'
    } else if (hour >= 12 && hour < 18) {
        img.src = `./assets/img/day/${src}`
        img.onload = () => {
            document.body.style.background = `center / cover no-repeat url('./assets/img/day/${src}')`
        }
        greeting.textContent = 'Добрый день'
    } else if (hour >= 18 && hour < 24) {
        img.src = `./assets/img/evening/${src}`
        img.onload = () => {
            document.body.style.background = `center / cover no-repeat url('./assets/img/evening/${src}')`
        }
        greeting.textContent = 'Добрый вечер'
    } else {
        img.src = `./assets/img/night/${src}`
        img.onload = () => {
            document.body.style.background = `center / cover no-repeat url('./assets/img/night/${src}')`
        }
        greeting.textContent = 'Доброй ночи'
    }
}

function nextImg() {
    nextImageButton.disabled = true
    localStorage.setItem('counter', `${+localStorage.getItem('counter') + 1}`)
    setBgGreet()
    setTimeout(() => nextImageButton.disabled = false, 1000)
}

function getData(item, displayValue, editValue) {
    let localData = localStorage.getItem(item)
    if (!localData) {
        displayValue.textContent = ''
        editValue.value = ''
        displayValue.style.display = 'none'
        editValue.style.display = 'block'
    } else {
        displayValue.textContent = localData
        editValue.value = localData
        displayValue.style.display = 'block'
        editValue.style.display = 'none'
    }
}

function setName(e) {
    if (e.type === 'keypress') {
        if (e.code === 'Enter') {
            localStorage.setItem('name', e.target.value.trim())
            name.blur()
            getData('name', displayName, name)
        }
    } else {
        localStorage.setItem('name', e.target.value.trim())
        getData('name', displayName, name)
    }
}

function setFocus(e) {
    if (e.type === 'keypress') {
        if (e.code === 'Enter') {
            localStorage.setItem('focus', e.target.value)
            focus.blur()
            getData('name', displayName, name)
        }
    } else {
        localStorage.setItem('focus', e.target.value)
        getData('focus', displayFocus, focus)
    }
}

function editModeName() {
    displayName.style.display = 'none'
    name.style.display = 'block'
    name.focus()
}

function editModeFocus() {
    displayFocus.style.display = 'none'
    focus.style.display = 'block'
    focus.focus()
}

function getQuote() {
    quoteButton.style.visibility = 'hidden'
    const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru`;
    fetch(url).then(response => response.json()).then(data => {
        quoteText.textContent = data.quoteText
        quoteAuthor.textContent = data.quoteAuthor
        quoteButton.style.visibility = 'visible'
    })
}

name.addEventListener('keypress', setName)
name.addEventListener('blur', setName)
focus.addEventListener('keypress', setFocus)
focus.addEventListener('blur', setFocus)
displayName.addEventListener('click', editModeName)
displayFocus.addEventListener('click', editModeFocus)
nextImageButton.addEventListener('click', nextImg)
quoteButton.addEventListener('click', getQuote)

showTime()
setBgGreet()
getData('name', displayName, name)
getData('focus', displayFocus, focus)
getQuote()


