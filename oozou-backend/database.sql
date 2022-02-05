CREATE DATABASE oozoutodo
CREATE TABLE Todo(todoid SERIAL PRIMARY KEY, title VARCHAR(500), todostatus varchar(100),created_at DATE);
CREATE TABLE Subtask(subtaskid SERIAL PRIMARY KEY,todoid INTEGER NOT NULL, subtasktitle VARCHAR(500), subtaskstatus varchar(100),created_at DATE);
