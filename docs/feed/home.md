# Get home feed

Returns home feed required

URL: `/api/feed/home`
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
    "name": "Category test name",
    "image": "https://loremflickr.com/640/480",
    "nfts": [
      {
        "id": "cl9osxhrp0000562cnucyd76l",
        "name": "Nft Name Test",
        "image": "",
        "price": 11.23,
        "owner": {
          "name": "Owner Name"
        },
        "_count": {
          "likedBy": 3
        }
      }
    ]
  }
]
```
