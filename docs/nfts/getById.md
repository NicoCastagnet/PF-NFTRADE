# Get nft by id

Returns a nft unique.

URL: `/api/nfts/:id`
Params: `id=[String]` where `id` is the ID of the Nft
Method: `GET`
Auth required: NO

## Success Response

Code: `200`
Content: Object

```json
{
  "id": "cl9oszwak0002562cry3q2bxf",
  "name": "Test Name Nft",
  "image": "https://images.unsplash.com/photo-1666644235536-b3524428b331?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1113&q=80",
  "description": "Description nft",
  "price": 0.3,
  "published": false,
  "owner": {
    "name": "John Doe"
  },
  "creator": {
    "name": "Mary Jane"
  },
  "_count": {
    "likedBy": 1,
    "viewedBy": 0
  }
}
```

## Error Response

Code: `404`
Content: Object

```json
{
  "success": false,
  "status": 404,
  "message": "Couldn't found nft with id asdfasd",
  "apiMessage": "No Nft found"
}
```

- `message`: custom message can be edited
- `apiMessage`: default ORM response.
