// Model and query of a one-to-many-relationship
// Most common data relationsship

// Easiest option is to embed array of maps. Problem: If map has field with 
// publishing date, we'd have to query all authors and then sort.

// => First question: Do i need to query this data?
// If yes, you need a sub-collection.
// => Second question: Do i need to query across multiple parents?
// If yes, you need a root-collection.

import { db } from "./config";

const authorId = 'dostojewski';

// 4. Embedded One-to-Many
// Example
// authors collection
// * docId: dr-seuss
// * books array
// * * map : title, published etc
const authorWithBooks = db.collection('authors').doc('authorId')

// 5. Subcollection
// Example
// authors collection
// * name: dr-seuss
// 
// books collection
// * docId: lorax
const books = db.collection('authors').doc(authorId).collection('books');

// 6. Root Collection, requires index
// Example
// authors collection
// * docId: dr-seuss
// 
// books collection
// * author: dr-seuss
const booksFrom1971 = db.collection('books')
        .where('author', '==', authorId)
        .where('published', '>', 1971);