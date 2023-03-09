# Online shop

**A Fullstack App**

## Menu
- [Description](#description)
- [Technologies (summary)](#technologies-summary)
- [Setup](#setup)

## Description
[Go to menu](#menu)

It has a list of products so users can filter them by category, and add them to cart.

The cart also saves the quantity of each product, and then users can order them.

Users can see their orders, an order shows:

- the ordered products, each product has its quantity and price based on its quantity
- total price of all ordered products
- total quantity of all ordered products
- ID of the order
- Date when the order was created
- The Street to delivery the ordered products

Users can also see their profile data such as email and current balance, and buttons to change the theme color to dark or light.

Users must create an account with email and password to order products.\
Once the account is created, they will receive a random balance to order products.

## Details of the App

- If the user logs out, the client only deletes the auth token (jwt) from the localStorage

- When an account is created, the password is encrypted with bcrypt and then saved in the Database, the email is saved in plain text

- The user can't set the street when ordering products, the street is a default text the clients has and sends to the server

- The client always sends data in json format to the server

- The backend has endpoints to change the password and delete the account but the client isn't using them.\
  If the user could delete its account, its orders would not be deleted

- The backend has an endpoint to add a new product, but it isn't available to the client and existing products are added manually using that endpoint in local development.

## Other details

I consider that the frontend code has a good enough code quality but it can still be improved.

But the backend code is an spaghetti code and it can improve a lot.

## Technologies (summary)
[Go to menu](#menu)

The `front-react` and `back-node` folders have a more detailed list.

Frontend:
- React
- TypeScript
- Vitest & Testing library

Backend:
- Express (Node.js)
- Mongoose (MongoDB)

## Setup
[Go to menu](#menu)

The `front-react` and `back-node` folders have the instructions for setting up this project.

