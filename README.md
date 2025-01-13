# CRUD/Auth Brief Description 🎯

## All available endpoints
### Server runs on http://localhost:3001
 Users Module():
```typescript
@Controller('users')
@Post() // creates a user instance
@Get() // returns all the available users
@Get(':id') // return a user with id 
@Patch(':id') // edit a user with id
@Delete(':id') // delete a user with id
```
Auth Module():
```typescript
@Controller('auth')
@Post('login) //if the user exists, generates a token using Jwt using passportjs
// Jwt is included in the Bearer of the AuthHeader
@Get() // uses Jwt guards which checks for an existing token
```

Categories Module():
```typescript
  @Controller('categories')
@Post() // creates a category instance
@Get() // returns all the available categories with the corresponding products to each category
@Get(':id') // return a category with id with the corresponding products
@Patch(':id') // edit a category with id
@Delete(':id') // delete a category with id
```
Products Module():
```typescript
@Controller('products')
//each request includes @UseGuards(JwtAuthGuard) to verify the existing token, otherwise return error 401
@Post() // creates a product instance
@Get() // returns all the available products to the current user as well as the id of the category
@Get(':id') // return an existing product but only if it belongs to the user
@Patch(':id') // edit a product if it belongs to the logged user
@Delete(':id') // delete a product if it belongs to the logged user

@Get('byCategory/:category_id) // returns all the products that fall into a certain category belonging to the logged user

//Note : the id of each category must be handled on the FrontEnd using mapper 
```
# Request/Response formats

## Requests:
### Users Module():
@Post() does not take any parameters
@Get(':id'), 
@Patch(':id'), 
@Delete(':id') - they take @Param('id') to handle the unique route for each separate instance

### Auth Module() : 
@Post('login') takes @Req() req:Request which returns the access token
@Get() takes @Req() req:Request which returns information about the user

### Categories Module():
@Post() does not take any parameters
@Get(':id'), 
@Patch(':id'), 
@Delete(':id') - they take @Param('id') to handle the unique route for each separate instance

### Products Module():
Every CRUD request has ` @Req() req: Request ` which includes the decoded information about the user (id, email, exp,iat)
@Post() does not take any parameters
@Get(':id'), 
@Patch(':id'), 
@Delete(':id') - they take @Param('id') to handle the unique route for each separate instance

@Get('byCategory/:category_id') - it take @Param('category_id) - to handle each unique category route

## Where @Body decorator is put the DTO for the current controller is taken into account 
## Responses

### Every response returns an Observable
mainly for hadnling errors, but also to handle asynschronously response more efficiently using the fact that observable executes when it is subscribed to and not immediately when it is handled in the body of the function(unlike a Promise)

 ### Error handling is done using pipe build-in method
 ### mergeMap and map usage in the observables
 - if a value is needed, we use map
 - if an Observable needs to be returned,we use mergeMap( e.g for UpdateResult from typeorm)
 - if more a value is returned, then we use of() for the return
 - if an array or other iterable type is returned, we use from()
   
## Usage of entities to ensure that data is stored in the correct format in postgreSQL


Authentication Requirements
==
## Email has to exist
and only if the email exist then 
## the password is checked.
If both the credentials are verified properly an access token is signed

Docker-compose
==
## Dockerfile, .dockerignore and docker-compose.yml are in the root folder 🐋

Extras 
==
## .env
Includes the information about the postgreSql db
## wait-for-it.sh and wait-for-postgres.sh
Both are being executed beforehand so that given that the database is reached before the timeout of 30s , the docker-compose could start ensuring no errors ocuurring

