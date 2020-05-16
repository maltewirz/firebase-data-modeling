Access Control List (ACL), where the content determines which users have authorization.

![acl](./img/acl.png)


```js
// rules.json
match /posts/{document} {
    allow read;
    allow write: if resource.data.members.hasAny(request.auth.uid);
}
```

Also possible: Mix of access and role based access:
User has roles that define access AND posts have access control list.

![acl-role-mix](./acl-role-mix.png)