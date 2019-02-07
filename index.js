document.addEventListener("DOMContentLoaded", setUpPage);

function setUpPage() {
  getBooks()
}

function fetchBooks() {
  return fetch('http://localhost:3000/books')
  .then(res => res.json())
}

function getBooks() {
  fetchBooks().then((books) => {
    books.forEach(renderBookList)
  })
}

function renderBookList(book) {
  const bookList = document.querySelector('#list')
  const titleList = document.createElement('li')
  bookList.appendChild(titleList)

  titleList.textContent = book.title

  titleList.addEventListener('click', function() {renderBookInfo(book)})
}


function renderBookInfo(book) {
  // console.log(book)
  const bookInfoContainer = document.querySelector('#show-panel')

  bookInfoContainer.innerHTML = ""

  const bookThumbnail = document.createElement('img')
  const bookDescription = document.createElement('p')
  const bookLikersList = document.createElement('ul')
  const likeButton = document.createElement('button')

  bookInfoContainer.appendChild(bookThumbnail)
  bookInfoContainer.appendChild(bookDescription)
  bookInfoContainer.appendChild(bookLikersList)
  bookInfoContainer.append(likeButton)


  bookThumbnail.src = book.img_url
  bookDescription.textContent = book.description
  bookLikersList.textContent = 'Liked By: '

  book.users.forEach(function(user) {
    const bookLikers= document.createElement('li')
    bookLikers.textContent = user.username
    bookLikersList.appendChild(bookLikers)
  })

  likeButton.textContent = `Like ${book.title}!`

  likeButton.addEventListener('click', function() {addLike(book)})
}

function addLike(book) {
  let id = book.id
  let me = {id: 1, username: 'pouros'}

  let bookLikersList = event.target.parentElement.querySelector('ul')
  let myUsername = document.createElement('li')
  myUsername.textContent = 'pouros'

  bookLikersList.appendChild(myUsername)

  book.users.push(me)
  updateLike(book)
}

function updateLike(book) {
  fetch(`http://localhost:3000/books/${book.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      users: book.users
    })
  })
}
