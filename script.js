'use strict'


const libraryContainer = document.getElementById('book-container')
const rootContainer = document.getElementById('container')


class Book {
    constructor(author, title, totalPages, currentPage, isRead, DOM) {
        this.author = author
        this.title = title
        this.totalPages = totalPages
        this.currentPage = currentPage
        this.isRead = isRead
        this.DOM = DOM
    }

    static id = 0
}


class BookDOM {
    constructor(book, id) {
        this.id = id
        this.update = (book) => {
            updateClasses(book.isRead)
            updateTextContent(book)
        }

        const bookContainer = document.createElement('div')
        const header = document.createElement('div')
        const author = document.createElement('p')
        const deletePrompt = document.createElement('img')
        const deletePromptCancel = document.createElement('img')
        const title = document.createElement('p')
        const pagesDiv = document.createElement('div')
        const pageLeftButton = document.createElement('button')
        const pages = document.createElement('p')
        const pageRightButton = document.createElement('button')
        const buttonsMain = document.createElement('div')
        const editButton = document.createElement('button')
        const doneButton = document.createElement('button')
        const readButtonDisabled = document.createElement('button')
        const buttonsDelete = document.createElement('div')
        const cancelButton = document.createElement('button')
        const deleteButton = document.createElement('button')

        let pageRightButtonInterval = null
        let pageLeftButtonInterval = null

        const setClasses = () => {
            bookContainer.className = 'book'
            header.className = 'book-header'
            title.className = 'book-title'
            deletePromptCancel.className = 'hidden'
            pagesDiv.className = 'pages-div'
            pages.className = 'book-pages'
            buttonsMain.className = 'book-buttons'
            editButton.className = 'btn-secondary'
            doneButton.className = 'btn-primary'
            readButtonDisabled.className = 'btn-disabled hidden'
            buttonsDelete.className = 'book-buttons hidden'
            cancelButton.className = 'btn-secondary'
            deleteButton.className = 'btn-delete'
        }

        const setTextContent = () => {
            editButton.textContent = 'EDIT'
            doneButton.textContent = 'DONE'
            readButtonDisabled.textContent = 'READ'
            cancelButton.textContent = 'CANCEL'
            deleteButton.textContent = 'DELETE'
            pageLeftButton.textContent = "<"
            pageRightButton.textContent = ">"
        }

        const setAttributes = () => {
            deletePrompt.setAttribute('src', 'images/x.svg')
            deletePromptCancel.setAttribute('src', 'images/dash.svg')
        }

        const updateClasses = (isRead) => {
            if (isRead) {
                pageLeftButton.classList.add('hidden')
                pageRightButton.classList.add('hidden')
                doneButton.classList.add('hidden')

                readButtonDisabled.classList.remove('hidden')
            } else {
                pageLeftButton.classList.remove('hidden')
                pageRightButton.classList.remove('hidden')
                doneButton.classList.remove('hidden')

                readButtonDisabled.classList.add('hidden')
            }
        }

        const updateTextContent = (book) => {
            author.textContent = book.author
            title.textContent = book.title

            if (book.isRead) {
                pages.textContent = `${book.totalPages}`
            } else {
                pages.textContent = `${book.currentPage}/${book.totalPages}`
            }
        }

        const setListeners = () => {

            const done = () => {
                book.isRead = true
                this.update(book)
            }

            const deleteBook = () => {
                delete library[id]
                bookContainer.remove()
            }

            const edit = () => {
                new BookForm(book)
            }

            doneButton.addEventListener('click', done)
            deleteButton.addEventListener('click', deleteBook)
            editButton.addEventListener('click', edit)

            deletePrompt.addEventListener('click', toggleDeleteMenu)
            deletePromptCancel.addEventListener('click', toggleDeleteMenu)
            cancelButton.addEventListener('click', toggleDeleteMenu)

            pageLeftButton.addEventListener('pointerdown', function() {
                function decrementPage() {
                    if (book.currentPage - 1 > 0) {
                        book.currentPage--
                        updatePagesTextContent()
                    }
                }
                decrementPage()
                pageLeftButtonInterval = setInterval(decrementPage, 200)
            })

            pageRightButton.addEventListener('pointerdown', function() {
                function incrementPage() {
                    if (book.currentPage + 1 < book.totalPages) {
                        book.currentPage++
                        updatePagesTextContent()
                    }
                }
                incrementPage()
                pageRightButtonInterval = setInterval(incrementPage, 200)
            })

            // Clear Intervals
            'pointerup pointerleave'.split(' ').forEach(function(event) {
                pageRightButton.addEventListener(event, function() {
                    clearInterval(pageRightButtonInterval)
                })

                pageLeftButton.addEventListener(event, function() {
                    clearInterval(pageLeftButtonInterval)
                })
            })

            function updatePagesTextContent() {
                pages.textContent = `${book.currentPage}/${book.totalPages}`
            }

            function toggleDeleteMenu() {
                deletePrompt.classList.toggle('hidden')         // x.svg
                deletePromptCancel.classList.toggle('hidden')   // dash.svg
                pagesDiv.classList.toggle('hidden')
                buttonsMain.classList.toggle('hidden')
                buttonsDelete.classList.toggle('hidden')
            }
        } // setListeners


        const appendAll = () => {
            header.appendChild(author)
            header.appendChild(deletePrompt)
            header.appendChild(deletePromptCancel)

            pagesDiv.appendChild(pageLeftButton)
            pagesDiv.appendChild(pages)
            pagesDiv.appendChild(pageRightButton)

            buttonsMain.appendChild(editButton)
            buttonsMain.appendChild(doneButton)
            buttonsMain.appendChild(readButtonDisabled)

            buttonsDelete.appendChild(cancelButton)
            buttonsDelete.appendChild(deleteButton)

            bookContainer.appendChild(header)
            bookContainer.appendChild(title)
            bookContainer.appendChild(pagesDiv)
            bookContainer.appendChild(buttonsMain)
            bookContainer.appendChild(buttonsDelete)
        }

        const addBookToLibraryContainer = () => {
            const last = libraryContainer.childElementCount

            libraryContainer.insertBefore(bookContainer, libraryContainer.childNodes[last])
        }

        const init = (book) => {
            setClasses()
            setTextContent()
            setAttributes()
            setListeners()

            this.update(book)  // Dynamic content

            appendAll()
            addBookToLibraryContainer()
        }

        init(book)
    }
}


class BookForm {
    constructor(book) {

        let author = ''
        let title = ''
        let total = ''
        let current = ''
        let isRead = false
        let id = -1

        if (book instanceof Book) {
            author = book.author
            title = book.title
            total = book.totalPages
            current = book.currentPage
            isRead = book.isRead
            id = book.DOM.id
        }

        const backgroundOverlay = document.createElement('div')

        const bookForm = document.createElement('form')
        const authorLabel = document.createElement('label')
        const authorInput = document.createElement('textarea')
        const titleLabel = document.createElement('label')
        const titleInput = document.createElement('textarea')
        const totalLabel = document.createElement('label')
        const totalInput = document.createElement('input')
        const currentLabel = document.createElement('label')
        const currentInput = document.createElement('input')
        const completed = document.createElement('div')
        const completedLabel = document.createElement('label')
        const completedCheckbox = document.createElement('input')
        const buttons = document.createElement('div')
        const cancelButton = document.createElement('button')
        const addButton = document.createElement('button')

        const setClasses = () => {
            backgroundOverlay.className = 'block-container'
            bookForm.className = 'new-book'
            completed.className = 'completed'
            buttons.className = 'book-buttons'
            addButton.className = 'btn-primary'
            cancelButton.className = 'btn-secondary'

            if (isRead) {
                currentLabel.className = 'hidden'
                currentInput.className = 'hidden'
            }
        }

        const setTextContent = () => {
            authorLabel.textContent = 'Author'
            titleLabel.textContent = 'Title'
            totalLabel.textContent = 'Total Pages'
            currentLabel.textContent = 'Current Page'
            completedLabel.textContent = 'Completed'
            addButton.textContent = 'SAVE'
            cancelButton.textContent = 'CANCEL'

            authorInput.value = author
            titleInput.value = title
            totalInput.value = total
            currentInput.value = current
            completedCheckbox.checked = isRead
        }

        const setAttributes = () => {
            authorInput.setAttribute('maxlength', '40')
            authorInput.setAttribute('id', 'author-input')
            authorInput.setAttribute('autofocus', '')
            authorInput.setAttribute('required', '')

            titleInput.setAttribute('maxlength', '80')
            titleInput.setAttribute('id', 'title-input')
            titleInput.setAttribute('required', '')

            totalInput.setAttribute('type', 'text')
            totalInput.setAttribute('required', '')

            currentInput.setAttribute('type', 'text')
            currentInput.setAttribute('required', '')

            completedCheckbox.setAttribute('type', 'checkbox')
            completedCheckbox.setAttribute('id', 'complete')

            completedLabel.setAttribute('for', 'complete')

            addButton.setAttribute('type', 'submit')
        }

        const setListeners = () => {

            authorInput.addEventListener('input', denyNewline)
            titleInput.addEventListener('input', denyNewline)

            const nonPositiveNumber = /^0|[^0-9]+/g

            totalInput.addEventListener('input', function() {
                totalInput.value = totalInput.value.replace(nonPositiveNumber, '')

                const total = parseInt(totalInput.value)
                let current = parseInt(currentInput.value)

                if (total) {
                    // Max book Size
                    if (total > 10000) {
                        totalInput.value = totalInput.value.slice(0, -1)
                    } else {
                        // Ensure current pages number < total
                        while (current > total) {
                            currentInput.value = currentInput.value.slice(1)

                            current = parseInt(currentInput.value)
                        }
                        currentInput.setAttribute('placeholder', `1 - ${total}`)
                    }
                } else {
                    currentInput.setAttribute('placeholder', '')
                    currentInput.value = ''
                }
            })

            currentInput.addEventListener('input', function() {
                currentInput.value = currentInput.value.replace(nonPositiveNumber, '')

                const current = parseInt(currentInput.value)
                const total = parseInt(totalInput.value)

                if (current) {
                    if (current >= total) {
                        currentInput.value = currentInput.value.slice(0, -1)

                    } else if (! total) {
                        currentInput.value = ''
                    }
                }
            })

            completedCheckbox.addEventListener('change', function() {
                if (completedCheckbox.checked) {
                    currentLabel.className = 'hidden'
                    currentInput.className = 'hidden'
                } else {
                    currentLabel.className = ''
                    currentInput.className = ''
                }
            })

            cancelButton.addEventListener('click', deleteForm)

            addButton.addEventListener('click', function() {
                if (authorInput.value !== '' && titleInput.value !== '' &&
                    totalInput.value !== '' && currentInput.value !== '') {

                    let newBook = new Book (
                        authorInput.value,
                        titleInput.value,
                        parseInt(totalInput.value),
                        parseInt(currentInput.value),
                        completedCheckbox.checked
                    )

                    if (id >= 0) {
                        // Update existing Book
                        book.author = newBook.author
                        book.title = newBook.title
                        book.totalPages = newBook.totalPages
                        book.currentPage = newBook.currentPage
                        book.isRead = newBook.isRead

                        book.DOM.update(book)
                    } else {
                        // Add new book to library
                        newBook.DOM = new BookDOM(newBook, Book.id)
                        library[Book.id++] = newBook
                    }

                    deleteForm()
                }
            })

            function denyNewline() {
                this.value = this.value.replace(/[\t\n\r\v]+/g, '')
            }

            function deleteForm() {
                bookForm.remove()
                backgroundOverlay.remove()
            }
        }

        const appendAll = () => {
            completed.appendChild(completedLabel)
            completed.appendChild(completedCheckbox)

            buttons.appendChild(addButton)
            buttons.appendChild(cancelButton)

            bookForm.appendChild(authorLabel)
            bookForm.appendChild(authorInput)
            bookForm.appendChild(titleLabel)
            bookForm.appendChild(titleInput)
            bookForm.appendChild(totalLabel)
            bookForm.appendChild(totalInput)
            bookForm.appendChild(currentLabel)
            bookForm.appendChild(currentInput)
            bookForm.appendChild(completed)
            bookForm.appendChild(buttons)

            rootContainer.appendChild(backgroundOverlay)
            rootContainer.appendChild(bookForm)
        }

        const init = () => {
            setClasses()
            setAttributes()
            setTextContent()
            setListeners()
            appendAll()
        }

        init()
    }
}


let library = {}


const bookList = [
    new Book('Arthur Conan Doyle', 'Sherlock Holmes', 5000, 1, false),
    new Book('J.K. Rowling', 'Harry Potter', 512, 1, false),
    new Book('Jordan B. Peterson', '12 Rules For Life', 412, 411, true),
    new Book('George R. R. Martin', 'Game of Thrones', 1252, 114, false),
    new Book('Simon Sinek', 'Together Is Better: A Little Book of Inspiration', 160, 1, false)
]


for (let book of bookList) {

    book.DOM = new BookDOM(book, Book.id)

    library[Book.id++] = book
}
