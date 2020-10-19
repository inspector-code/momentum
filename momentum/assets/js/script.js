const greeting = document.getElementById('greeting')
const name = document.getElementById('name')
const focus = document.getElementById('focus')
const hours = document.getElementById('hour')
const minutes = document.getElementById('minutes')
const seconds = document.getElementById('seconds')
const fullDate = document.getElementById('date')
const displayName = document.getElementById('display__name')
const displayFocus = document.getElementById('display__focus')

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n
}

function showTime() {
    // let today = new Date(2020, 6, 10, 20, 33, 30)
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

    setTimeout(showTime, 1000)
}

function setBgGreet() {
    // let today = new Date(2020, 6, 10, 20, 33, 30)
    let today = new Date()
    let hour = today.getHours()

    if(hour < 12) {
        document.body.style.background = "url('./assets/img/morning/03.jpg') 50% 50%"
        greeting.textContent = 'Good Morning'
    } else if(hour < 18) {
        document.body.style.background = "url('./assets/img/day/03.jpg') 50% 50%"
        greeting.textContent = 'Good Day'
    } else {
        document.body.style.background = "url('./assets/img/evening/03.jpg') 50% 50%"
        greeting.textContent = 'Good Evening'
        document.body.style.color = 'white'
    }
}

function getData(item, displayValue, editValue) {
    let localData = localStorage.getItem(item)
    if(!localData.trim()) {
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
    if(e.type === 'keypress') {
        if(e.code === 'Enter') {
            localStorage.setItem('name', e.target.value)
            name.blur()
            getData('name', displayName, name)
        }
    } else {
        localStorage.setItem('name', e.target.value)
        getData('name', displayName, name)
    }
}

function setFocus(e) {
    if(e.type === 'keypress') {
        if(e.code === 'Enter') {
            localStorage.setItem('focus', e.target.value)
            focus.blur()
        }
    } else {
        localStorage.setItem('focus', e.target.value)
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

name.addEventListener('keypress', setName)
name.addEventListener('blur', setName)
focus.addEventListener('keypress', setFocus)
focus.addEventListener('blur', setFocus)
displayName.addEventListener('click', editModeName)
displayFocus.addEventListener('click', editModeFocus)

showTime()
setBgGreet()
getData('name', displayName, name)
getData('focus', displayFocus, focus)
