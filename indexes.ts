import { db } from './config';

const query = db.collection('posts')
                    .where('author', '==', 'bob')
                    .where('date', '>=', lastWeek)

// Create composite index in firestore
// Or just write the client side code, firestore will then error with 
// option to build the index