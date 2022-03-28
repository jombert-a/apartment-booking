# Apartments booking

## Project's database architecture (24.03.2022)

![image](https://user-images.githubusercontent.com/57063378/160011795-a380c494-f1e8-4c3c-a229-0d8f00dca4eb.png)

## Dockerize Posrtgres

```bash
docker run --rm -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres
```

## ENV

```bash
JWT_SECRET=apartment
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=postgres
```
