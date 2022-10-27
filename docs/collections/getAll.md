# Get all collections

Returns all collections created in the database.

- URL: `/api/collections/`
- Method: `GET`
- Auth required: NO
- Permissions required: None

## Success Response

Code: `200`
Content: Array

```json
[
  {
    "id": "cl9oszwak0002562cry3q2bxf",
    "name": "Collection test name",
    "image": "https://images.unsplash.com/photo-1666644235536-b3524428b331?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1113&q=80",
    "owner": {
      "name": "Owner Name"
    },
    "_count": {
      "nfts": 3
    }
  }
]
```

- `image`: can be null
- `_count.nfts`: number of nfts
