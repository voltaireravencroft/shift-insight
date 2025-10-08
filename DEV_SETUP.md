# Dev Setup

## Prerequisites
- Node 18+ (local uses 22 fine)
- Docker Desktop

## Local DB (Docker)
```bash
docker start pgdev \
 || docker run --name pgdev -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=appdb -p 5432:5432 -d postgres:16
docker ps
