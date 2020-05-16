User-to-user follows and follower feeds. Similar to Twitter
Difficult if the user is following a lot of users - query each user for recent stories.

All relational data is held on the followers document.

```js
import { db } from './config';
import * as firebase from 'firebase/app';
const remove = firebase.firestore.FieldValue.arrayRemove;
const union = firebase.firestore.FieldValue.arrayUnion;

export const follow  = (followed, follower) => {
    const followersRef = db.collection('followers').doc(followed);

   followersRef.update({ users: union(follower) });
}

// 2. Unfollow User

export const unfollow  = (followed, follower) => {
    const followersRef = db.collection('followers').doc(followed);

    followersRef.update({ users: remove(follower) });
}



// 3. Get posts of followers

export const getFeed = async() => {

    const followedUsers = await db.collection('followers')
        .where('users', 'array-contains', 'jeffd23')
        .orderBy('lastPost', 'desc')
        .limit(10)
        .get();


    const data = followedUsers.docs.map(doc => doc.data());

    const posts = data.reduce((acc, cur) => acc.concat(cur.recentPosts), []);
 

    const sortedPosts = posts.sort((a, b) => b.published - a.published)


    // render sortedPosts in DOM

}
```

![social-feed](./img/social-feed.png)