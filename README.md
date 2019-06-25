# Virtual Cashier

This is a fictional application!! It is a software to control cash flow in a small
store.
Normal work flow:
- Create Category;
- Register a operation with this fields:
  - Value;
  - Type: 1 for input / -1 for output;
  - Categories: Array of categories;
  - Currency: just a string field;
- See Resume of current day operations and balance;

See the API's [documentation](DOCS.md).

## Local Environment

#### Requirements

- NodeJS version 8
- mongoDB

#### Commands

Create a env file 

```bash
  .touch env
```
Insert this variables in this file, and alter values by your taste

MASTER_KEY=put_your_value
JWT_SECRET=jwt_is_awesome

**Use your master key on query of every request**


```bash
$ npm run dev
Express server listening on http://0.0.0.0:9000, in development mode
```

Please ignore tests was not prepared completely
