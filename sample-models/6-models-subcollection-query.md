Now possible to query subcollections from May 2019 onwards

```js

// would find all sub-collections called `books`
db.collectionGroup('books').where('published', '==', '1974');
```

