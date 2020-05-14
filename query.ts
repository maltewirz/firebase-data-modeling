import { db } from './config';

// results gets ordered server-side
const query = db.collection('posts').orderBy('date', 'desc')
    // .limit(20)
    // .startAt(lastWeek)
    .where('date', '==', today).where('name', '==', 'j')

//since not equal does not exist, you can just do two seperate queries:
const above = db.collection('posts').where('name', '>', 'j');
const below = db.collection('posts').where('name', '>', 'j');