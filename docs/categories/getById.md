# Get category by id

Returns a category unique.

- URL: `/api/categories/:id`
- Params: `id=[String]` where `id` is the ID of the Category
- Method: `GET`
- Auth required: NO

## Success Response

Code: `200`
Content: Object

```json
{
  "id": "cl9oszwak0002562cry3q2bxf",
  "name": "Test Name Nft",
  "image": "https://images.unsplash.com/photo-1666644235536-b3524428b331?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1113&q=80",
  "nfts": [
    {
      "id": "cl9qe7iuk001c56jraw2advp9",
      "name": "Rustic Soft Chips",
      "image": "https://loremflickr.com/cache/resized/65535_51788078747_3b0972967b_c_640_480_nofilter.jpg",
      "owner": {
        "name": "Tami Connelly"
      },
      "_count": {
        "likedBy": 1,
        "viewedBy": 5
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
  "message": "Couldn't found category with id asdfasd",
  "apiMessage": "No Category found"
}
```

- `message`: custom message can be edited
- `apiMessage`: default ORM response.
