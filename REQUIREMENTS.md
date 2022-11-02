# API Requirements
## API Endpoints
#### Products
- Index                     : "GET /products"
- Show                      : "GET /products/:id "
- Create [token required]   " "POST /products"
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]    : "GET /users"
- Show [token required]     : "GET /users/:id"
- Create N[token required]  : "POST /users"
- Authenticate              : "POST /users/auth"

#### Orders
- Index                     : "GET /orders"
- Show                      : "GET /orders/:id "
- Create [token required]   " "POST /orders"
- Current Order by user (args: user id)[token required]  : "GET /users/:id/orders"
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
        _______________           ________________          _______________         ____________
        |              |          |               |        |               |        |          |
        |     USER     |-1-----m--|    ORDER      |-1----m-| ORDER-PRODUCT |-m----1-|  PRODUCT |
        |______________|          |_______________|        |_______________|        |__________|
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- email
- password

#### Orders
- id
- user_id
- status of order (completed  or incomplete)

#### Order-Product
- id
- order_id
- product_id
- quantity

