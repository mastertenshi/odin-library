'use strict'


let libraryContainer = document.getElementById('book-container')
let container = document.getElementById('container')

let books = [
    new Book('Sherlock Holmes', 'Arthur Conan Doyle', 1, 5000),
    new Book('Harry Potter', 'J.K. Rowling', 1, 512),
    new Book('12 Rules For Life', 'Jordan B. Peterson', 412, 412)
]

let library = {}


function Book(title, author, currentPage, totalPages) {
    this.title = title
    this.author = author
    this.currentPage = currentPage
    this.totalPages = totalPages
}
Book.id = 0

function addBookToLibrary(id) {
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
    editButton.classList = 'btn-secondary'
    doneButton.classList = 'btn-primary'
    buttonsDelete.className = 'book-buttons hidden'
    cancelButton.classList = 'btn-secondary'
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

    let last = libraryContainer.childElementCount

    libraryContainer.insertBefore(book, libraryContainer.childNodes[last])
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

function denyNewline() {
    this.value = this.value.replace(/[\t\n\r\v]+/g, '')
}

function newBook() {
    let blockContainer = document.createElement('div')

    let newBook = document.createElement('form')
    let authorLabel = document.createElement('label')
    let authorInput = document.createElement('textarea')
    let titleLabel = document.createElement('label')
    let titleInput = document.createElement('textarea')
    let totalLabel = document.createElement('label')
    let totalInput = document.createElement('input')
    let currentLabel = document.createElement('label')
    let currentInput = document.createElement('input')
    let addButton = document.createElement('button')

    blockContainer.className = 'block-container'
    newBook.className = 'new-book'
    addButton.className = 'btn btn-primary'

    authorLabel.textContent = 'Author'
    titleLabel.textContent = 'Title'
    totalLabel.textContent = 'Total Pages'
    currentLabel.textContent = 'Current Page'
    addButton.textContent = 'ADD'

    authorInput.setAttribute('maxlength', '40')
    authorInput.setAttribute('id', 'author-input')
    authorInput.setAttribute('autofocus', '')
    authorInput.setAttribute('required', '')
    authorInput.autofocus

    titleInput.setAttribute('maxlength', '80')
    titleInput.setAttribute('id', 'title-input')
    titleInput.setAttribute('required', '')

    totalInput.setAttribute('type', 'text')
    totalInput.setAttribute('required', '')

    currentInput.setAttribute('type', 'text')
    currentInput.setAttribute('required', '')

    addButton.setAttribute('type', 'submit')

    authorInput.addEventListener('input', denyNewline)
    titleInput.addEventListener('input', denyNewline)

    addButton.addEventListener('click', function() {
        if (authorInput.value !== '' && titleInput.value !== '' &&
            totalInput.value !== '' && currentInput.value !== '') {
                library[Book.id++] =
                new Book(
                    authorInput.value,
                    titleInput.value,
                    totalInput.value,
                    currentInput.value)

            addBookToLibrary(Book.id - 1)

            newBook.remove()
            blockContainer.remove()
        }
    })

    newBook.appendChild(authorLabel)
    newBook.appendChild(authorInput)
    newBook.appendChild(titleLabel)
    newBook.appendChild(titleInput)
    newBook.appendChild(totalLabel)
    newBook.appendChild(totalInput)
    newBook.appendChild(currentLabel)
    newBook.appendChild(currentInput)
    newBook.appendChild(addButton)

    container.appendChild(blockContainer)
    container.appendChild(newBook)
}

for (let book of books) {
    library[Book.id++] = book
    addBookToLibrary(Book.id - 1)
}
