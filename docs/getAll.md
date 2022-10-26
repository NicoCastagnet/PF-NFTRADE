# Get all nfts

Returns all nfts created in the database.

URL: `/api/nfts/`
Method: `GET`
Auth required: NO
Permissions required: None

## Success Response

Code: `200`
Content: Array

```json
[
  {
    "id": "cl9oszwak0002562cry3q2bxf",
    "name": "Nft test name",
    "image": "https://images.unsplash.com/photo-1666644235536-b3524428b331?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1113&q=80",
    "owner": {
      "name": "John Doe"
    },
    "categories": [
      {
        "id": "cl9osxhrp0000562cnucyd76l",
        "name": "Category Test"
      }
    ],
    "_count": {
      "likedBy": 3,
      "viewedBy": 6
    }
  }
]
```

- `_count.likedBy`: number of likes
- `_count.viewedBy`: number of views
