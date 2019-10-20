console.log('Client side javascript file is loaded!')
fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')
messageone.textContent = 'From java Script'
messagetwo.textContent = 'From java Script2'
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()//this is to prevent default behaviour to render the server
    const location = search.value
    messageone.textContent = 'loading....'
    messagetwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data1) => {
            if (data1.error) {
                messageone.textContent = data1.error

            } else {
                messageone.textContent = data1.location
                messagetwo.textContent = data1.forecast
            }

        })
    })


})