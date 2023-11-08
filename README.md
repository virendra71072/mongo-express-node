# mongo-express-node
# Backend API server for set up of node express & mongo db

### Highlights
- create User
- update user
- fetch user by id
- fetch all user

### Dependencies

### Setting Node Application
Add configuration in src/app/config/constant.json file

Create new file in 'src/app/config/config.json' & add below code into it.<br />

	
```
	{
    "server": {
        "index": {
            "port": 8088,
            "env": "development"
        }
    },
    "mongoDatabase": {
        "host"           : "localhost",
        "port"           : "27017",
        "user"           : "",
        "password"       : "",
        "database"       : "mongonode-dev",
        "url"            : "mongodb://localhost:27017/mongonode-dev",
        "options"        : {}
    }
}
```

Import database file form query folder.


Postman collection link for API:
https://api.postman.com/collections/17421413-df9347d5-d7f6-4c52-ac10-78c53d7ab1a0?access_key=PMAT-01HEM9042DVWBGAK9015R8V2DR

Postman Document colletion Link:
https://documenter.getpostman.com/view/1460742/S1Lzx6TQ

### Installation
npm install;


npm start

### Testing

### Known Issue
Nothing at the moment :)

## Contributors

 1. Virendra k
