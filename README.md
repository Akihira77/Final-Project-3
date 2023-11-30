# How To Use

first run  
`npm install`

for create a database, make sure to passing database connection string as an argument  
`npm run db:create -- <conection_string>`  
ex: `npm run db:create -- postgres://dbuser:secretpassword@database.host:3211/mydb`

for initialize model, make sure to passing `model_name` as an argument.  
`npm run migration:generate -- <model_name>`  
ex: `npm run migration:generate -- User`  
Change file extension to `.cjs` and create the `model.ts` inside `src/db/models`  
migration code and .model.ts is must be same so after the project run it won't override one to another 

for apply the migrations, passing database connection string as an argument (use connection string for db:create or use an another existing database connection string)  
`npm run db:migrate -- <connection_string>`

run project  
`npm run start:dev`

go to [Here](https://crimson-star-882099.postman.co/workspace/MBKM-Final-Project~68237437-130b-4c66-9a06-152945108d50/overview) to see the request collection and the environment in Postman to help you interact with our API
