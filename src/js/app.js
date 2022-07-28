import * as flsFunctions from "./modules/functions.js"

flsFunctions.phoneInput()

/* ======== feedback ========*/

if (document.querySelector('#feedback__form')) {
    const feedbackForm = document.querySelector('#feedback__form')

    feedbackForm.addEventListener('submit', Feedback)

    async function Feedback(e) {
        e.preventDefault()
        const feedbackFormError = feedbackForm.querySelector('#error')
        feedbackFormError.classList.add('none')
        let error = formValid(feedbackForm)
        let formData = new FormData(feedbackForm)

        if (error === 0) {
            let response = await fetch('./php/addFeedback.php', {
                method: 'POST',
                body: formData
            })
            if (response.ok) {
                let result = await response.json()
                if (result.status === true) {
                    const table = document.querySelector('.table')
                    table.innerHTML = `
                    <div class="table__group">
                        <div>ФИО</div>
                        <div>${result.name}</div>
                    </div>
    
                    <div class="table__group">
                        <div>Адрес</div>
                        <div>${result.address}</div>
                    </div>
    
                    <div class="table__group">
                        <div>Телефон</div>
                        <div>${result.tel}</div>
                    </div>
    
                    <div class="table__group">
                        <div>E-mail</div>
                        <div>${result.email}</div>
                    </div>
                    `
                    feedbackForm.reset()
                } else {
                    result.fields.forEach(field => {
                        let input = document.querySelector(`#${field}`)
                        formAddError(input)
                    })
                    feedbackFormError.textContent = result.message
                    feedbackFormError.classList.remove('none')
                }
            } else {
                alert('Ошибка подключения!')
                feedbackForm.reset()
            }
        } else {
            feedbackFormError.textContent = '*Проверьте правильность ввода!'
            feedbackFormError.classList.remove('none')
        }
    }

}

/* ======== news ========*/

async function outputNews(callback) {
    let response = await fetch('./php/outputNews.php')

    if (response.ok) {
        let result = await response.json()
        if (result.status === true) {
            callback(result)
        } else {
            alert('Ошибка БД!')
        }
    } else {
        alert('Ошибка подключения!')
    }
}

if (document.querySelector('.main__page-news')) {

    function callbackNews(result) {
        const pageNews = document.querySelector('.main__page-news')
        result.news.forEach((el) => {
            let newsHTML = `
            <div class="news">
                <div class="news__group">
                    <div class="news__date">${TimeConverter(el.date)}</div>
                    <div class="news__title">
                    ${el.title}</div>
                </div>
                <div class="news__annonce">${el.content}</div>
            </div>
            `
            pageNews.insertAdjacentHTML('beforeend', newsHTML)
        })
    }

    outputNews(callbackNews)
}

/* ======== index ========*/

if (document.querySelector('.main__page-index')) {

    function callbackIndex(result) {
        const pageNews = document.querySelector('.news__container')
        for (let i = 0; i < 3; i++) {
            let newsHTML = `
            <div class="news">
                <div class="news__group">
                    <div class="news__date">${TimeConverter(result.news[i].date)}</div>
                    <div class="news__title">
                    ${result.news[i].title}</div>
                </div>
                <div class="news__annonce">${result.news[i].annonce}</div>
            </div>
            `
            pageNews.insertAdjacentHTML('beforeend', newsHTML)
        }
    }

    outputNews(callbackIndex)
}


/* ======== helper function ========*/

function formValid(form) {
    let error = 0;
    let input = form.querySelectorAll(`input`)

    for (let i = 0; i < input.length; i++) {
        formRemoveError(input[i])

        if (input[i].value === '') {
            formAddError(input[i])
            error++
        }
    }

    return error
}

function formAddError(input) {
    input.classList.add('border-error')
}

function formRemoveError(input) {
    input.classList.remove('border-error')
}

function TimeConverter(timestamp) {
    let a = new Date(timestamp * 1000),
        year = a.getFullYear(),
        date = a.getDate(),
        month
    if (a.getMonth() + 1 < 10) {
        month = '0' + (a.getMonth() + 1)
    } else {
        month = a.getMonth() + 1
    }
    let time = date + '.' + month + '.' + year;
    return time;
}




