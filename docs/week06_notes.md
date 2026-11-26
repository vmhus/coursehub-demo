# Buổi 6 - Docker, Testing and GitHub Actions

## 1. Environment

- OS: Windows
- Docker version:
- Docker Compose version:
- Python version:
- Node.js version:

## 2. Docker Images

- Backend image: `coursehub-backend:week06`
- Frontend image: `coursehub-frontend:week06`
- Backend Dockerfile: `backend/Dockerfile`
- Frontend Dockerfile: `frontend/Dockerfile`

## 3. Docker Compose

- Compose file: `compose.yaml`
- Frontend URL: `http://127.0.0.1:8080`
- Backend URL: `http://127.0.0.1:8000`
- Database: Existing PostgreSQL on host
- Database host in Docker: `host.docker.internal`

## 4. Test Results

- `pytest backend/tests -q`:
- `npm test`:
- `npm run build`:
- `docker compose config`:
- `docker compose up --build`:

## 5. Integration Test

- Student ID:
- Class section:
- Request:
- HTTP status:
- SQL verification:
- Result:

## 6. Debugging

- Problem:
- Evidence from logs or Network:
- Root cause:
- Solution:

## 7. AI Usage

- Problem investigated:
- AI suggestion:
- Changes accepted or rejected:
- How the suggestion was verified:

## 8. Git and CI

- Branch: `week06-docker-ci`
- Pull Request:
- Reviewer:
- GitHub Actions Backend:
- GitHub Actions Frontend:
- GitHub Actions Docker:

## 9. Conclusion

CourseHub was packaged into separate Backend and Frontend Docker images.
Docker Compose was used to connect the two services while keeping the
existing PostgreSQL database on the host machine.

Backend tests, Frontend tests and production build checks were executed.
GitHub Actions was configured to validate the project automatically
when changes were pushed or a Pull Request was created.