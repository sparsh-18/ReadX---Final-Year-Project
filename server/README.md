
# ReadX API
The Backend API for the ReadX System

## Tech

**Server:** NodeJS

**Framework** ExpressJs

**Database** MongoDb


  
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
DB = # your database link
GOOGLE_CLIENT_ID = # your id
GOOGLE_CLIENT_SECRET = # your key
```


  
## Installation

Clone the project


Go to the server directory
```
cd ReadX---Final-Year-Project
cd server
```

Create the database using MongoDb

Run the API
```
node app.js
```
  
## API Reference


### Register a user

```http
  POST /api/users/register
```
**Body**
```
{
    "name": "User 3",
    "email": "user3@example.com",
    "password": "user2user3"
}
```


### Login

```http
  GET /api/users/login
```
**Body**
```
{
    "email": "user3@example.com",
    "password": "user2user3"
}
```


### Google Login

```http
  GET /api/users/google/login
```

### Get all exchange posts

```http
  GET /api/exchangeposts/all
```


### Get one exchange post

```http
  GET /api/exchangeposts/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `postId` | `string` | **Required**. The post id |


### Get exchange posts via location

```http
  GET /api/exchangeposts/:latitude/:longitude/:distance
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `longitude` | `string` | **Required**. longitude |
| `latitude` | `string` | **Required**. latitude|
| `distance` | `string` | **Required**. distance |




### Add new exchange post

```http
  GET /api/addnew/exchangepost
```
**Body**
```
{
  book_name:
  author:
  post_img:
  latitude:
  longitude:
  user_posted:
}
```


### Get all discuss posts

```http
  GET /api/discusspost/all
```


### Get one discuss post

```http
  GET /api/discusspost/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `postId` | `string` | **Required**. The post id |



### Add new discuss post

```http
  POST /api/addnew/discusspost
```
**Body**
```
{
    title:
    body:
    likes:
    user_posted:
    user_posted_comment:
    commentBody:
}
```

### Add new comment in discuss post

```http
  POST /api/discusspost/commented
```
**Body**
```
{
    id:
    body:
    use_posted:
}
```


  
## Authors

- [Sparsh Verma](https://github.com/sparsh-18)

- [Mohd Rafey Khan](https://github.com/mohd-rafey-khan)

  