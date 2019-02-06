document.addEventListener("DOMContentLoaded", setupPage);
let bookList = document.querySelector('#list')
let bookInfo = document.querySelector('#show-panel')

function setupPage() {
    renderAllBooks()
} 

function renderAllBooks() { 
    bookList.innerHTML = ""
    let url = `http://localhost:3000/books`;
    getBook(url).then(function (data) {
        data.forEach(renderBook)
    })
}  

function getBook(url) { 
    return fetch(url).then(res => res.json())
}  

function renderBook(book) {
    let element = document.createElement('li')
    element.dataset.id = book.id
    element.textContent = book.title
    element.addEventListener('click', () => renderBookInfo(book.id))
    bookList.appendChild(element)
}

function renderBookInfo(id) {
    bookInfo.innerHTML = ""
    let url2 = `http://localhost:3000/books/${id}`; 
    getBook(url2).then(bookInfoView)
}

function bookInfoView(book) {
    let bookImg = document.createElement('img')
    bookImg.src = book.img_url
    bookInfo.appendChild(bookImg)
    
    let bookDes = document.createElement('p')
    bookDes.textContent = book.description
    bookInfo.appendChild(bookDes) 

    let userContainer = document.createElement('h4')
    userContainer.textContent = 'User Likes'
    bookInfo.appendChild(userContainer) 

        let users = book.users 
        for (let user in users) {
            let usernameCont = document.createElement('li')
            usernameCont.textContent = users[user]['username']
            userContainer.appendChild(usernameCont)
        } 
    let likeBtn = document.createElement('button')
    likeBtn.textContent = "Like <3"
    likeBtn.addEventListener('click', () => addLike(book))
    bookInfo.appendChild(likeBtn)
} 

function addLike(book) {
    let id = book.id
    let me = {id:1, username:"pouros"}
    
    if (book.users.some(e => e.id === 1)) {
        let users = book.users.filter(e => e.id !== 1)
        updateBook(id, users).then(() => renderBookInfo(id))
    } else {
        book.users.push(me)
        let users = book.users
        updateBook(id, users).then(() => renderBookInfo(id))
    }
} 

function updateBook(id, newUsers) {
    return fetch(`http://localhost:3000/books/${id}`,{
        method: 'PATCH',
        headers: 
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        }, 
        body: JSON.stringify({
          users: newUsers
        })
    }) 
}