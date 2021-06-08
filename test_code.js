'use strict'

let id = 0

let library = {}

let book = "Some book"

library[id++] = book


console.log(library)
console.log(id)

id = 0

book = 'Nani'

function addBook(someBook, someId) {
    library[someId++] = someBook
}

addBook(book, id)

console.log(library)
console.log(id)