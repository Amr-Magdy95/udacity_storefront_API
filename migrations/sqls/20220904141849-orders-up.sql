/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS orders(id SERIAL PRIMARY KEY, user_id integer REFERENCES users(id), status VARCHAR(50));