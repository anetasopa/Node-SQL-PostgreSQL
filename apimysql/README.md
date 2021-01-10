### Shows ALL DBs 
SELECT * FROM pg_database WHERE datistemplate = false;


### How to create new DBs? 
CREATE DATABASE my_db;


### Create new table 
CREATE TABLE test(name CHARACTER VARYING(50), fav int);

INSERT INTO test1(name, fav) 
    VALUES 
        ('A', 3), 
        ('B', 4);
        
INSERT INTO test2(name, fav) 
    VALUES 
        ('C', 3), 
        ('D', 4);
 '*' -> all 
SELECT * FROM test; or SELECT name FROM test;


### Sort values 
SELECT * FROM test ORDER BY name;


### Select only 2 value 
SELECT name FROM test LIMIT 2;


### Combine two tables 
SELECT * FROM test1 JOIN test2;


### Important information 
SQL - Standard Query Language - is a programming language used to communicate with a database.
* A database is a structured collection or table of data.
* A database record represents a collection of fields or elements through an entry.
* A query allows us to ask the database a question about its data and grab relevant information.
* A database schema outlines what attributes correspond to data entries for a particular table.
* PostgreSQL (pronounced post-gress-QL) is a system that allows us to interact with an SQL relational database.

#### Advantages to SQL:
SQL allows to access many records of data within a single command.
SQL allows to interact with our data in multiple ways: insertion, queries, updates, and deletions.
SQL is widely adopted in the programming community and software engineering industry.
The relational model is an approach to organizing data where all f the data is represented by rows and grouped into relations.
Rows may also be called tuples.
SQL has a declarative syntax which makes statements look like English-readable sentences because it describes what the program must accomplish in order to solve a problem.

#### SQL commands:
Use CREATE TABLE to make a table. INSERT INTO <table> VALUES to insert entries into <table>.
Use the SELECT keyword to query data. FROM to specify a database.
Use the WHERE clause to limit data based on a condition. Use LIMIT <number> to limit the resulting queries to the top <number> results.
Use JOIN … ON to combine two tables based on a given condition.


