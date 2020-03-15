# kanban
The fancy-todo application is developed using express, posgresql, sequelize, and to be run by nodemon for server side.
Meanwhile for client side is using vue, bootstrap vue, vue google sign and parcel.


------------
Method & URL 
GET | POST | DELETE | PUT
Example of method and url can be found in link: 
https://documenter.getpostman.com/view/10571187/SzRz1qAY


-----------
URL Params

Required:
id=[integer]

-----------
Data Params

title : string
category: string
note : string
email :string
password : string

-----------
Success Response:
Code: 200 
Code: 201 

Error Response:
Code: 400
Code: 401
Code: 500

----------
----------
.ENV 
file .ENV template is provided as example of data to be provided