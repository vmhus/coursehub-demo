
# CourseHub - Week 05

## 1. Frontend Setup
- Created a React frontend using Vite.
- React version: 18.2.0.
- Vite version: 7.1.7.
- Frontend URL: http://127.0.0.1:5173.
- Backend URL: http://127.0.0.1:8000.
- Configured CORS for local frontend origins.

## 2. React Components
- `App.jsx`: Main application and state management.
- `Notice.jsx`: Displays loading, success and error messages.
- `SectionTable.jsx`: Displays available class sections.
- `EnrollmentList.jsx`: Displays a student's enrollments.
- `api.js`: Shared HTTP request function.

## 3. API Integration
- GET `/courses`.
- GET `/sections`.
- GET `/students/{student_id}/enrollments`.
- POST `/enrollments`.
- DELETE `/enrollments/{student_id}/{class_section_id}`.
- Handles HTTP 201, 204, 404, 409 and 422.
- Uses AbortController to cancel outdated GET requests.

## 4. Enrollment Test
- Demo student: `22000004`.
- Demo class: `WEB-01`.
- Tested enrollment through the React interface.
- Tested cancellation through the React interface.
- Verified enrollment data and event logs in PostgreSQL.

## 5. Error Handling
- Tested invalid student ID.
- Tested full class response (HTTP 409).
- Tested API connection errors.
- Displays loading, empty, success and error states.

## 6. Automated Tests
- Test file: `frontend/tests/api.test.mjs`.
- Tested GET, POST and DELETE.
- Tested HTTP 204, 404, 409 and 422.
- Tested invalid JSON, network errors and AbortError.
- Test result: [Update after running npm test].

## 7. Build
- Ran `npm test`.
- Ran `npm run build`.
- Build result: [Update after running npm run build].

## 8. Database Verification
- SQL file: `database/13_week05_verify.sql`.
- Verified `v_section_summary`.
- Verified `enrollments`.
- Verified `enrollment_events`.
- No database schema changes were required.

## 9. Git
- Branch: `week05-frontend-react`.
- Commit: `Add CourseHub React frontend and CORS`.
- Backend `.env` and frontend `.env.local` are excluded from Git.
