'use strict'

// let id = 0

// let library = {}

// let book = "Some book"

// library[id++] = book


// console.log(library)
// console.log(id)

// id = 0

// book = 'Nani'

// function addBook(someBook, someId) {
//     library[someId++] = someBook
// }

// addBook(book, id)

// console.log(library)
// console.log(id)

// let string = 'k k\twot a\n nani omae\n\n wa moue\ris this'
// let re = '/[\t\n\r]*/g'
// // console.log(string)

let result = string.replace(/[\t\n\r\v]+/g, '')

// console.log(result)

let string = 'some string'

string[2] = 'a'

console.log(string)