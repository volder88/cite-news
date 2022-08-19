/* ======== app ========*/

const text = document.querySelector('.app__text')
const time = document.querySelector('.options__time')

let sumSec = 0
let sec = 0
let min = 0
let hrs = 0
let t

async function apiText() {
    let response = await fetch('https://baconipsum.com/api/?type=all-meat&paras=1&start-with-lorem=1')

    if (response.ok) {
        let result = await response.json()
        let letters = []
        result.forEach(el => {
            let arr = el.split('')
            for (let i = 0; i < arr.length; i++) {
                letters.push(`<span class="letter_black">${arr[i]}</span>`)
            }
        })
        text.innerHTML = letters.join('')
        return true
    } else {
        alert('Проблемы с получением данных!')
    }
}


async function prog(e) {
    await apiText()

    let i = 0, error = 0, errorDuble
    const pageStart = document.querySelector('.page__start')
    const startBtn = pageStart.querySelector('.start__btn')
    const accuracy = document.querySelector('.options__accuracy')

    function test(e) {
        const letters = document.querySelectorAll('.letter_black')
        
        letters[i].classList.add('letter_focus')

        if (i === letters.length) {
            clearTimeout(t)
            pageStart.classList.remove('none')
            pageStart.innerHTML = `
                <div>Ваше время: ${time.textContent}</div><br>
                <div>Ваша точность: ${accuracy.textContent}</div><br>
                <div>Ваша скороксть: ${(letters.length / sumSec).toFixed(2)} символов в секунду</div><br>
            `
        } else {
            if (letters[i].textContent === e.key && e.key !== 'Shift') {
                letters[i].classList.remove('letter_focus-err')
                letters[i + 1].classList.add('letter_focus')
                letters[i].classList.remove('letter_focus')
                letters[i].classList.add('letter_red')
                
                i++
            } else if (e.key === 'Shift') {
                console.log('Shift')
            } else {
                if (errorDuble !== i) {
                    errorDuble = i
                    error++
                    accuracy.textContent = (100 - (100 / letters.length * error)).toFixed(2) + "%"
                    letters[i].classList.add('letter_focus-err')
                }
            }
            
        } 
    }
    function start() {
       const letters = document.querySelectorAll('.letter_black')
        letters.forEach(el => {
            el.classList.remove('letter_red')
            el.classList.remove('letter_focus')
            el.classList.remove('letter_focus-err')
        })
        i = 0
        error = 0
        sumSec = 0
        sec = 0
        min = 0
        hrs = 0
        accuracy.textContent = '100%'
        pageStart.classList.add('none')
        timer()

        document.addEventListener('keydown', (e) => {
            test(e)
        })
    }

    startBtn.addEventListener('click', start)
}
prog()

function tick(){
    sumSec++
    sec++
    if (sec >= 60) {
        sec = 0
        min++
        if (min >= 60) {
            min = 0
            hrs++
        }
    }
}

function add() {
    tick()
    time.textContent = (hrs > 9 ? hrs : "0" + hrs) 
        	 + ":" + (min > 9 ? min : "0" + min)
       		 + ":" + (sec > 9 ? sec : "0" + sec)
    timer()
}

function timer() {
    t = setTimeout(add, 1000)
}





