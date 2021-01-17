# Express-SQL-REST-API
A simple but complete, functional application server based on the common threads found in most existing applications. + tests

**Follow the instructions below!**

## 1. Get it

Clone this repo:

```
git clone https://github.com/Gabriellji/Express-SQL-REST-API.git
````
## 2. Install the dependencies

```
cd Express-SQL-REST-API
npm install
```
## 3. Setup the database

Inject the `database/schema.sql` file into MySQL with this command (provide your root password when asked to):

```
mysql -uroot -p < database/schema.sql
```
## 4. Create and edit the `.env` file

This application uses [dotenv](https://www.npmjs.com/package/dotenv), which allows to load variables from a specific file: `.env`. This is where sensitive data, such as database settings, JWT secret key, API keys, etc. are stored.

This file is **not** provided here, because it should **never** be committed! However, the `.env.sample` file will help create you quickly.

First, **copy it** as `.env`:

```
cp .env.sample .env
```

Second, **edit** `.env`. **You have to replace the value behind `DB_PASS=`** with your own root password and `DB_NAME=` with the name of your database.

**How to use it**

- **GET** Get all results

```
/anime
```

It will return all list of objects

- **GET** Get a single item

```
/anime/1
```

It will return you an object with sent id.

- **GET** Sort items (i.e. ascending, descending)

```
/anime/sort/desc
```

You can use with 'desc' or 'asc'.
It will return you sorted list of object.

- **GET** A filter for data that is greater than... (e.g. date greater than 2000-10-10)

```
/search?year=2000-10-10
```

It will return you sorted list of object.

- **GET** A filter for data that contains... (e.g. title containing the string 'host')

```
/search?title=host
```

It will return you list of object that contains passed string.

- **POST** Add new item

```
/anime
```

it will return you an object with a new id.*Title* feild is required.

- **PUT** Update an item

```
/anime/1
```

It will return you updated object with sent id.

- **PUT** Toggle a Boolean value (is_checked to TRUE/FALSE)

```
/anime/list/1
```

It will return you updated object with sent id.

- **DELETE** Delete an item

```
/anime/1
```

The product will be deleted.

- **DELETE** Delete all items with value is_checked = FALSE

```
/anime
```

It will return you all list of object without deleted items.







