Overview
This is a Blog website backend with auth. This backend build with Node.js, Express,typescript,mongoose,zod validation and MongoDB.
First, clone the repository

          git https://github.com/mehedi891/blog-backend.git
          cd blog-backend
          
      
Now run this command

            npm install

            
Now for database connection and port you have to add the .env file in the root and add these two

            PORT:YOUR_prt
            MONGO_URI:Your_mongoDB_atlas_URL
            SALT_ROUNDS: password hash salt number
            JWT_SECRET_KEY: for jwt secretkey

            
Now run this command to start it in development mood:

          npm run dev

          
To run with direct JS file

        npm run build
        npm run start

        
Available Routes: 
     Method: POST -> /api/auth/register //to register a user

     Method: POST -> /api/auth/login //to login a user

     Method: POST ->  /api/blogs //to create a blogs

     Method: GET -> /api/blogs/blogs?search=update&sortBy=createdAt&sortOrder=asc&filter=6765e87bec316d8233afb762 //to get all the blogs with search,filter,sort and sortBy query

     Method: PATCH -> /api/blogs/:id //to update a single blog

     Method: DELETE -> /api/blogs/:id //to Delete a single blog

     Method: PATCH -> /api/admin/users/:userId/block //to block a user

     Method: DELETE -> /api/admin/blogs/:id  //to Delete a single blog
     
for Blog create this a example product object where author is logged-in User's ID

            {
                "title":"Test Blog 8",
                "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lacinia dictum finibus. Suspendisse potenti. Etiam magna ligula, vehicula sed sagittis sit amet, tempus id lorem.",
                "author":"6765e87bec316d8233afb762"
            }

     
  For creating user this is a exaple object 
  
            {
                "name":"Mannaf",
                "email":"mannaf@gmail.com",
                "password":"008856"
            } 

After login there will be a jwt token and the token can be used in header as authorization

            Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzY1ZTg2ZmVjMzE2ZDgyMzNhZmI3NWYiLCJuYW1lIjoiVGFqbmluIiwiZW1haWwiOiJ0YWpuaW5AZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpc0Jsb2NrZWQiOnRydWUsImlhdCI6MTczNDc3ODA3MCwiZXhwIjoxNzM0NzgxNjcwfQ.mKXWAPIL1XswCCzF2iNCKU8AGiHfLFHM0tAWukp1gUc

Also, It will check if the user is blocked or not.

User can only update and delete their own blogs.

Admin can block and delete any block