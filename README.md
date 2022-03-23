# Apartments booking

## Project's database architecture (24.03.2022)
![image](https://user-images.githubusercontent.com/57063378/159779989-91447b95-b54a-43ee-bc64-7940b0d916d6.png)

## Dockerize Posrtgres
```bash
docker run --rm -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres 
```

## ENV
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=postgres
```

