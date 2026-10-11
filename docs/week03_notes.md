# CourseHub - Buoi 3

Backend: FastAPI + SQLAlchemy Core + PostgreSQL.

Chay tu thu muc goc:

```powershell
python -m uvicorn backend.app.main:app --reload
```

Swagger UI: http://127.0.0.1:8000/docs

Postman environment: base_url = http://127.0.0.1:8000

Thu tu kiem tra du lieu:
GET health -> GET courses/sections -> POST enrollment -> thu loi 409/422 -> DELETE enrollment -> GET sections.

Khong commit backend/.env.

## Ket qua
- FastAPI chay duoc.
- PostgreSQL ket noi thanh cong.
- Da kiem tra cac API doc, tao va huy dang ky.
- Da tao Collection va Environment Postman.