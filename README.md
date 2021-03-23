# Spring Data JPA with Hibernate using MySql
This project based on Spring Boot with Spring Data JPA and Hibernate using MySql.

## Description
This Project shows the list of meetings which are stored in the MySql Database. Using the following endpoints, different operations can be achieved

## Libraries used
- Spring Boot
- Spring Data JPA with Hibernate
- MySql
- React.js

## Tools used
- Git 2.29.2
- IntelliJ IDEA Ultimate 2020.2
- Visual Studio Code
- MySql running locally

## How to execute
- `mm_db` - Create new schema with user `root` and password `123`
- `java -jar meeting-manager-1.0.jar` - execute project 
- `http://localhost:8181` - Open URL in your favourite browser

- after first start you need to add some data

INSERT INTO `subdivision` (s_id, sub_name, subname_id) VALUES (1, 'Русский дивизион', 1);
INSERT INTO `subdivision` (s_id, sub_name, subname_id) VALUES (2, 'Matrix Team', 2);
INSERT INTO `subdivision` (s_id, sub_name, subname_id) VALUES (3, 'Команда-А', 3);

INSERT INTO `employee` (n_id, age, name, subdiv_id) VALUES (1, 30, 'Боширов Руслан Николаевич', 1);
INSERT INTO `employee` (n_id, age, name, subdiv_id) VALUES (2, 25, 'Петров Александр Сергеевич', 1);
INSERT INTO `employee` (n_id, age, name, subdiv_id) VALUES (3, 20, 'Сидоров Иван Никитич', 1);
INSERT INTO `employee` (n_id, age, name, subdiv_id) VALUES (4, 40, 'Андерсон Томас', 2);
INSERT INTO `employee` (n_id, age, name, subdiv_id) VALUES (5, 44, 'Смит Агент', 2);
INSERT INTO `employee` (n_id, age, name, subdiv_id) VALUES (6, 25, 'Тринити', 2);
INSERT INTO `employee` (n_id, age, name, subdiv_id) VALUES (7, 45, 'Морфеус', 2);

