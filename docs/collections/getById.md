# Get collection by id

Returns a collection unique.

- URL: `/api/collections/:id`
- Params: `id=[String]` where `id` is the ID of the Collection
- Method: `GET`
- Auth required: NO

## Success Response

Code: `200`
Content: Object

```json
{
  "id": "cl9oszwak0002562cry3q2bxf",
  "name": "Test Name Collection",
  "image": "https://images.unsplash.com/photo-1666644235536-b3524428b331?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1113&q=80",
  "description": "Description of collection",
  "disccount": 0.3,
  "owner": {
    "name": "owner of collection"
  },
  "creator": {
    "name": "cretor of collection"
  },
  "createdAt": "",
  "updatedAt": "",
  "nfts": [
    {
      "id": "cl9qe7iuk001c56jraw2advp9",
      "name": "Rustic Soft Chips",
      "image": "https://loremflickr.com/cache/resized/65535_51788078747_3b0972967b_c_640_480_nofilter.jpg",
      "price": 11.23,
      "owner": {
        "name": "Tami Connelly"
      },
      "_count": {
        "likedBy": 3,
        "viewedBy": 12
      }
    }
  ]
}
```

## Error Response

Code: `404`
Content: Object

```json
{
  "success": false,
  "status": 404,
  "message": "Couldn't found collection with id asdfasd",
  "apiMessage": "No Collection found"
}
```

- `message`: custom message can be edited
- `apiMessage`: default ORM response.
