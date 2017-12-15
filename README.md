-- run the command "npm install"
-- run the command "npm start"
//the app will  run on port 3000

Use postman or alike tools to test the apis

--localhost:8000/login for login( use any username and password)
	- jwt token will be received in response
	- use the token for authorization other endpoints

swagger is also included in the api

	- to see the object key and value type
	- swagger can be seen in /docs route
	- we can test with swagger . But only one endpoints /login, other two won't work because bearer token authorization is not supported in swagger 2.0 . I am sorry to say that I cannot find proper module for version 3.0 . So other enpoints cannot be tested with swagger.

/jsonpatch --for patching the json 
/thumbnail --for uploadiing the image

thanks!!
