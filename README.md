### Dockerize Posrtgres
```bash
docker run --rm -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres 
```

### ENV
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=postgres
```

