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
    let deletePrompt = document.createElement('img')
    let deletePromptCancel = document.createElement('img')
    let title = document.createElement('p')
    let pages = document.createElement('p')
    let buttonsMain = document.createElement('div')
    let editButton = document.createElement('button')
    let doneButton = document.createElement('button')
    let buttonsDelete = document.createElement('div')
    let cancelButton = document.createElement('button')
    let deleteButton = document.createElement('button')

    book.className = 'book'
    header.className = 'book-header'
    title.className = 'book-title'
    deletePromptCancel.className = 'hidden'
    pages.className = 'book-pages'
    buttonsMain.className = 'book-buttons'
    editButton.classList = 'btn-green'
    doneButton.classList = 'btn-primary'
    buttonsDelete.className = 'book-buttons hidden'
    cancelButton.classList = 'btn-green'
    deleteButton.classList = 'btn-delete'

    // Book header (author, x button)
    author.textContent = library[id].author

    deletePrompt.setAttribute('src', 'images/x.svg')
    deletePromptCancel.setAttribute('src', 'images/dash.svg')

    deletePrompt.addEventListener('click', toggleDeleteMenu)
    deletePromptCancel.addEventListener('click', toggleDeleteMenu)

    header.appendChild(author)
    header.appendChild(deletePrompt)
    header.appendChild(deletePromptCancel)

    // Title
    title.textContent = library[id].title

    // Pages
    pages.textContent = `${library[id].currentPage}/${library[id].totalPages}`

    // Buttons
    editButton.textContent = 'EDIT'
    doneButton.textContent = 'DONE'
    cancelButton.textContent = 'CANCEL'
    deleteButton.textContent = 'DELETE'

    // -main
    buttonsMain.appendChild(editButton)
    buttonsMain.appendChild(doneButton)

    // -delete
    cancelButton.addEventListener('click', toggleDeleteMenu)
    deleteButton.addEventListener('click', deleteBook)

    buttonsDelete.appendChild(cancelButton)
    buttonsDelete.appendChild(deleteButton)

    // Book
    book.setAttribute('data-id', id)

    book.appendChild(header)
    book.appendChild(title)
    book.appendChild(pages)
    book.appendChild(buttonsMain)
    book.appendChild(buttonsDelete)

    libraryContainer.appendChild(book)
}

function deleteBook() {
    let id = this.parentNode.parentNode.getAttribute('data-id')

    this.parentNode.parentNode.remove()
    delete library[id]
}

function toggleDeleteMenu() {
    let book = this.parentNode.parentNode
    // book-header
    book.childNodes[0].childNodes[1].classList.toggle('hidden') // x.svg
    book.childNodes[0].childNodes[2].classList.toggle('hidden') // dash.svg
    // book-pages
    book.childNodes[2].classList.toggle('hidden')
    // book-buttons
    book.childNodes[3].classList.toggle('hidden') // main
    book.childNodes[4].classList.toggle('hidden') // delete
}