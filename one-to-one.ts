// Model and query of a one-to-one-relationship
import { db } from "./config";

const userId = 'Dostojewski';

// 1. Embedded, all data contained on single document, One-to-few
const authorWithAccount = db.collection('authors').doc(userId)

// 2. Shared Document ID
// Example: Author has field: units sold. this sensitive information has to be
// outsoured to different collection `accounts`
// Field `AccountId` has string with accountId, Account has the accountId as
// docId
const author = db.collection('authors').doc(userId)
const account = db.collection('account').doc(userId)

// 3. Join related documents with different IDs
const getAccount = async (userId) => {
    const snapshot = await db.collection('authors').doc(userId).get();
    const user = snapshot.data();

    return db.collection('accounts').doc(user.accountId)
}

