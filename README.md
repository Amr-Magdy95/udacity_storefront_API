# Storefront Backend Project

## How to setup and connect to the database
```
// Connect to psql terminal then do the following
>CREATE DATABASE storefront;
>CREATE DATABASE storefront_test;
>\c storefront
>CREATE USER anon WITH PASSWORD 'password@12';
>GRANT ALL PRIVILEGES ON DATABASE storefront TO anon;
>\c storefront_test
>CREATE USER test WITH PASSWORD 'password@12';
>GRANT ALL PRIVILEGES ON DATABASE storefront_test TO test;
// db-migrate command on scripts should handle the rest
```



## PORTS
You should use the following ports:
- 5432 for postgres
- 3000 for the server

## Package installation instructions
```
>npm i -g db-migrate
>npm i
// to run tests
>npm run tests
// to run the application
>npm run watch
```
## .ENV File
```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB_DEV=storefront
POSTGRES_DB_TEST=storefront_test
POSTGRES_USER_DEV=anon
POSTGRES_PASSWORD_DEV=password@12
POSTGRES_USER_TEST=test
POSTGRES_PASSWORD_TEST=password@12
BCRYPT_PASSWORD=weliveonaplacidislandofignorance
SALT_ROUNDS=10
PEPPER=@gfdjhgf@_gfdgfd643654_@gfdhgf
TOKEN_SECRET=thisisatokensecretformyapplication
ENV=dev
```

## HELPFUL RESOURCES
- https://dba.stackexchange.com/questions/193495/postgresql-truncate-a-table-on-cascade-and-reset-all-hierarchic-sequences-with
- https://stackoverflow.com/questions/13989243/sequence-does-not-reset-after-truncating-the-table
- https://stackoverflow.com/questions/13223820/postgresql-delete-all-content 
- https://stackoverflow.com/questions/69794934/set-an-authentication-token-in-a-request-header-when-using-supertest-with-jest-a 
- https://stackoverflow.com/questions/57213162/why-are-my-custom-process-env-not-working-within-dotenv 
- https://stackoverflow.com/questions/47277133/disable-unnecessary-escape-character-no-useless-escape 
- https://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters 
- https://stackoverflow.com/questions/9628879/javascript-regex-username-validation 
- https://www.w3resource.com/javascript/form/email-validation.php
- https://db-migrate.readthedocs.io/en/latest/Getting%20Started/configuration/ 
- https://dba.stackexchange.com/questions/68266/what-is-the-best-way-to-store-an-email-address-in-postgresql 
- https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-unique-constraint/#:~:text=PostgreSQL%20provides%20you%20with%20the,if%20the%20value%20already%20exists. 
- https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-numeric/#:~:text=Introduction%20to%20PostgreSQL%20NUMERIC%20data%20type&text=For%20example%2C%20the%20number%201234.567,digits%20after%20the%20decimal%20point.
