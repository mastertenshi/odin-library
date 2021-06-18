'use strict'


let libraryContainer = document.getElementById('book-container')
let container = document.getElementById('container')

let books = [
    new Book('Arthur Conan Doyle', 'Sherlock Holmes', 5000, 1,),
    new Book('J.K. Rowling', 'Harry Potter', 512, 1),
    new Book('Jordan B. Peterson', '12 Rules For Life', 412, 412)
]

let library = {}


function Book(author, title, totalPages, currentPage) {
    this.author = author
    this.title = title
    this.totalPages = totalPages
    this.currentPage = currentPage
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
    deleteButton.addEventListener('click', function() {
        delete library[id]
        book.remove()
    })

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

    function toggleDeleteMenu() {
        // book-header
        deletePrompt.classList.toggle('hidden') // x.svg
        deletePromptCancel.classList.toggle('hidden') // dash.svg
        // book-pages
        pages.classList.toggle('hidden')
        // book-buttons
        buttonsMain.classList.toggle('hidden')
        buttonsDelete.classList.toggle('hidden')
    }
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
    let buttons = document.createElement('div')
    let cancelButton = document.createElement('button')
    let addButton = document.createElement('button')

    blockContainer.className = 'block-container'
    newBook.className = 'new-book'
    buttons.className = 'book-buttons'
    addButton.className = 'btn-primary'
    cancelButton.className = 'btn-secondary'

    authorLabel.textContent = 'Author'
    titleLabel.textContent = 'Title'
    totalLabel.textContent = 'Total Pages'
    currentLabel.textContent = 'Current Page'
    addButton.textContent = 'ADD'
    cancelButton.textContent = 'CANCEL'

    authorInput.setAttribute('maxlength', '40')
    authorInput.setAttribute('id', 'author-input')
    authorInput.setAttribute('autofocus', '')
    authorInput.setAttribute('required', '')

    titleInput.setAttribute('maxlength', '80')
    titleInput.setAttribute('id', 'title-input')
    titleInput.setAttribute('required', '')

    let exampleNumber = Math.floor((Math.random() * 890) + 101)

    totalInput.setAttribute('type', 'text')
    totalInput.setAttribute('placeholder', `ex. ${exampleNumber.toString()}`)
    totalInput.setAttribute('required', '')

    currentInput.setAttribute('type', 'text')
    currentInput.setAttribute('required', '')

    addButton.setAttribute('type', 'submit')

    authorInput.addEventListener('input', denyNewline)
    titleInput.addEventListener('input', denyNewline)

    totalInput.addEventListener('input', function() {
        totalInput.value = totalInput.value.replace(/[^0-9]+/g, '')

        let totalSize = totalInput.value.length

        let total = parseInt(totalInput.value)
        let current = parseInt(currentInput.value)

        if (total) {
            // Max Book Size
            if (total > 10000) {
                totalInput.value = totalInput.value.slice(0, totalSize - 1)
            } else {
                currentInput.setAttribute('placeholder', `1-${total}`)

                // Keep Current page < Total pages
                if (total < current) {
                    currentInput.value = currentInput.value.slice(0, totalSize)
                }
            }
        } else {
            currentInput.setAttribute('placeholder', '')
            currentInput.value = ''
        }
    })

    currentInput.addEventListener('input', function() {
        currentInput.value = currentInput.value.replace(/[^0-9]+/g, '')

        let currentSize = currentInput.value.length

        let current = parseInt(currentInput.value)
        let total = parseInt(totalInput.value)

        if (current) {
            if (current > total) {
                currentInput.value = currentInput.value.slice(0, currentSize - 1)

            } else if (! total) {
                currentInput.value = ''
            }
        }
    })

    cancelButton.addEventListener('click', function() {
        newBook.remove()
        blockContainer.remove()
    })

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
    newBook.appendChild(buttons)

    buttons.appendChild(addButton)
    buttons.appendChild(cancelButton)

    container.appendChild(blockContainer)
    container.appendChild(newBook)
}

for (let book of books) {
    library[Book.id++] = book
    addBookToLibrary(Book.id - 1)
}
