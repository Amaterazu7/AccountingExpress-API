CREATE TABLE account (create_date timestamp, modification_date timestamp, total_amount float, version integer, user_id uuid not null, primary key (user_id));
CREATE TABLE transaction (id uuid, create_date timestamp, amount float, description varchar(255), status integer, type integer, account_user_id uuid, primary key (id));
CREATE TABLE "user" (id uuid, create_date timestamp, modification_date timestamp, email varchar(255), name varchar(255), surname varchar(255), primary key (id));
ALTER TABLE account ADD CONSTRAINT FK7m8ru44m93ukyb61dfxw0apf6 FOREIGN KEY (user_id) REFERENCES "user";
ALTER TABLE transaction ADD CONSTRAINT FK1c4wnpe8spengnc1fm7hayssi FOREIGN KEY (account_user_id) REFERENCES account;

INSERT INTO "user" (id, create_date, email, name, surname)
        VALUES ('b02b10ca-4029-4c8e-98b9-60d1df21f4df', now(), 'diegoleonel.canete@gmail.com', 'Diego', 'Canete');
INSERT INTO account (create_date, total_amount, version, user_id)
        VALUES (now(), 0, 0, 'b02b10ca-4029-4c8e-98b9-60d1df21f4df');
INSERT INTO transaction (id, create_date, account_user_id, amount, description, status, type)
        VALUES ('0ad98a8b-3dc0-4484-9adb-9e4a4a9af07c', now(),'b02b10ca-4029-4c8e-98b9-60d1df21f4df', 50000.0, 'First Initializer Transaction from the Express JS.', 0, 0);
INSERT INTO transaction (id, create_date, account_user_id, amount, description, status, type)
        VALUES ('a834cbed-6da9-451c-a90e-c54dec13b172', now(),'b02b10ca-4029-4c8e-98b9-60d1df21f4df', 35000.0, 'Second Initializer Transaction from the Express JS.', 0, 0);

UPDATE account SET total_amount = 85000, version = 1, modification_date = now() WHERE user_id = 'b02b10ca-4029-4c8e-98b9-60d1df21f4df' ;
