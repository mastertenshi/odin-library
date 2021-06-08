'use strict'

function Book(title, author, currentPage, totalPages) {
    this.title = title
    this.author = author
    this.currentPage = currentPage
    this.totalPages = totalPages
}
Book.id = 0

// function addBookToLibrary() {

// }

let books = [
    new Book('Sherlock Holmes', 'Arthur Conan Doyle', 1, 5000),
    new Book('Harry Potter', 'J.K. Rowling', 1, 512),
    new Book('12 Rules For Life', 'Jordan B. Peterson', 412, 412)
]

let library = {}

for (let book of books) {
    library[Book.id++] = book
}


let libraryContainer = document.getElementById('book-container')


for (let id in library) {
    let book = document.createElement('div')
    let header = document.createElement('div')
    let author = document.createElement('p')
    let title = document.createElement('p')
    let pages = document.createElement('p')
    let buttons = document.createElement('div')
    let editButton = document.createElement('button')
    let doneButton = document.createElement('button')
    let deleteSVG = document.createElement('img')

    header.className = 'book-header'
    title.className = 'book-title'
    pages.className = 'book-pages'
    buttons.className = 'book-buttons'
    editButton.classList = 'btn-green'
    doneButton.classList = 'btn-primary'

    // Book header (author, x button)
    author.textContent = library[id].author
    deleteSVG.setAttribute('src', 'images/x.svg')

    header.appendChild(author)
    header.appendChild(deleteSVG)

    console.log(library[id].title)
    console.log(library[id].author)

    // Title
    title.textContent = library[id].title

    // Pages
    pages.textContent = `${library[id].currentPage}/${library[id].totalPages}`

    // Buttons
    editButton.textContent = 'EDIT'
    doneButton.textContent = 'DONE'

    buttons.appendChild(editButton)
    buttons.appendChild(doneButton)

    book.setAttribute('data-id', id)
    book.setAttribute('class', 'book')
    book.appendChild(header)
    book.appendChild(title)
    book.appendChild(pages)
    book.appendChild(buttons)

    libraryContainer.appendChild(book)

    // deleteButton.addEventListener("click", deleteBook)
}

function deleteBook() {
    let id = this.parentNode.getAttribute('data-id')

    this.parentNode.remove()
    delete library[id]
}
