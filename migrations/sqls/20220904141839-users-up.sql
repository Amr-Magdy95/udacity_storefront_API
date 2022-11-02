/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY,email text UNIQUE, firstname VARCHAR(50), lastname VARCHAR(50), password_digest text);