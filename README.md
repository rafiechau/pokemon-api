# pokemon-api
pokemon api with express.js
* Express
* UUID
* Fs
  
---
## URL

_Server_
```
http://localhost:3000
```
---


## RESTful endpoints

### GET /api/pokemon
> Get list pokemon

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```
_Response (200)_
```
{

    "data": {
        "<results>": [
	        <pokemon_item>
	       ]
        },

    "status": "Success"

}
```

_Response (500)_
```
{
    "message": "Internal Server Error"
}
```

### GET Detail /api/pokemon/detail/:name
> Get detail pokemon by name

_Request Params_
```
/<name>
```

_Request Body_
```
not needed
```
_Response (200)_
```
{

    "data": {
        <detail_data_pokemon>
        },

    "status": "Success"

}
```

_Response (500)_
```
{
    "message": "Internal Server Error"
}
```

### POST Pokemon /api/pokemon/catch-pokemon/:name
> Post pokemon by name

_Request Params_
```
/<name>
```

_Request Body_
```
not needed
```
_Response (200)_
```
{

    "data": {
        "id": <id>,
        "name": <name>
        },

    "message": "Pokemon berhasil ketangkep"

}
```
```
{
    "message": "Oops, Pokemon KABUR"
}
```
_Response (400)_
```
{
    "message": "Pokemonnya udah kamu tangkap"
}
```
_Response (500)_
```
{
    "message": "Internal Server Error"
}
```

### GET /api/my-pokemon
> Get list my pokemon

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```
_Response (200)_
```
{

    "data": [
      "id": <id>,
      "name": <name>
    ],

    "status": "Success"

}
```

_Response (404)_
```
{
    "message": "Data is empty"
}
```

_Response (500)_
```
{
    "message": "Internal Server Error"
}
```

### DELETE /api/release-my-pokemon/:id
> Release my pokemon by id

_Request Params_
```
/<id>
```

_Request Body_
```
not needed
```
_Response (200)_
```
{

    "data": [
      "id": <id>,
      "name": <name>
    ],

    "message": "Pokemon released successfully."

}
```
```
{
    "message": "Release gagal, silahkan coba lagi"
}
```

_Response (404)_
```
{
    "message": "Pokemon emang ngak ada"
}
```

_Response (500)_
```
{
    "message": "Internal Server Error"
}
```

### PUT /api/rename/:id
> Rename my pokemon by id

_Request Params_
```
/<id>
```

_Request Body_
```
not needed
```
_Response (200)_
```
{

    
    "newName": <name>,
    "message": "Nama Pokemon berhasil diubah."

}
```
```
{
    "message": "Release gagal, silahkan coba lagi"
}
```

_Response (404)_
```
{
    "message": "Pokemon emang ngak ada"
}
```

_Response (400)_
```
{
    "status": "Validation Failed"
    "message": "\"name\" length must be at least 3 characters long"
}
```

_Response (500)_
```
{
    "message": "Internal Server Error"
}
```
