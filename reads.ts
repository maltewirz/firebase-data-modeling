import { db } from './config';

// single doc read
const ref = db.collection('posts').doc('postId');
console.log('hi', ref)

// subcollection read
const ref = db.collection('posts').doc('postId').collection('tags');

// Bucket read
const post = db. collection('posts').doc('postId');
const tags = db.collection('tags').doc('postId');

// Multi-document read
const post = await db.collection('posts').doc('postId').get();

const tagsId = post.data().tags;

const tagReads = tagIds.map(tag => db.collection('tags').doc(tag).get())

const tags = await Promise.all(tagReads);

// Helper: Reads an array of IDs from a collection concurrently
const readIds = async (collection, ids) => {
    const reads = ids.map(id => collection.doc(id).get() );
    const result = await Promise.all(reads);
    return result.map(v => v.data());
}
