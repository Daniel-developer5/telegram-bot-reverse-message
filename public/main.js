document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault()
    
    fetch('/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: this.message.value })
    })
    .then(() => alert('Message has sent'))
    .catch(err => console.error(err))

    this.message.value = ''
})

document.querySelector('.users button').addEventListener('click', () => {
    const list = document.querySelector('.users ul')

    list.innerHTML = ''

    fetch('/users')
        .then(res => res.json())
        .then(({ users }) => users.map(user => list.innerHTML += `<li>${user}</li>`))
})