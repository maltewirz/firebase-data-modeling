// Model and query of a many-to-many-relationship
// Very common and complex

// E.g. User can write reviews about books. We want to enforce 
// one review per user per book. Three collections necessary: 
// `books`, `reviews`, `authors`

import { db } from "./config";

const authorId = 'dostojewski';
const bookId = 'the-idiot';

// 7. Middle Man Collection
// Example
// book collection
// * docId: lorax
//
// reviews collection
// * docId: lorax_jeff-delaney
// * book: lorax
// * review-authors: jeff-delaney
//
// review-authors collection (review authors, not book author)
// * docId: jeff-delaney
const userReviews = db.collection('reviews').where('author', '==', authorId);
const bookReviews = db.collection('reviews').where('book', '==', bookId);

// Single read with composite key
const specificReview = db.collection('reviews').doc(`${bookId}_${authorId}`);

// 8. Map
// Example
// books collection
// * docId: lorax
// * review-authors - map
// * * jeff-delaney - map
// Reviews embedded on books
const bookWithReviews = db.collection('books').doc(bookId);
// we'll only get the books that has this userId
const userReviews = db.collection('books').orderBy('reviews.jeff-delaney');

// 9. Array
// books collection
// * docId: cat-in-the-hat
// * categories - array
// * * fiction
//
// categories collection
// * docId: fiction
const books = db.collection('books').where('categories', 'array-contains', 'fiction');

// 10. Bucket
// books collection
// * docId: lorax
//
// likes collection
// * docId: lorax
// * jeff-delaney -boolean- true
//
// authors collection
// * docId: jeff-delaney
// Get a collection of documents with an array of IDs

const getLikedBooks = async() => {

    //Get books through user likes
    const userLikes = await db.collection('likes').orderBy('jeff-delaney').get();
    const bookIds = userLikes.docs.map(snap => snap.id);

    const bookReads = bookIds.map(id => db.collection('books').doc(id).get());
    const books = Promise.all(bookReads);
}
getLikedBooks()