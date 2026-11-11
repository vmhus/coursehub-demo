# CourseHub - Buoi 4

## 1. Migration
- Migration 001: enrollment_events.
- Created schema_migrations to track applied migrations.
- Rollback file: 001_add_enrollment_events_rollback.sql.

## 2. Concurrency demo
- Demo class: RACE-01.
- Capacity: 1.
- Two students: 22000002 and 22000004.
- Race condition was reproduced using two Query Tool sessions.
- Used SELECT ... FOR UPDATE to lock the class section row.

## 3. API transaction
- API version: 0.4.0.
- POST /enrollments locks class_sections before checking capacity.
- POST creates enrollment and CREATED event in one transaction.
- DELETE removes enrollment and creates CANCELLED event in one transaction.

## 4. Concurrency test
- Script: backend/tests/week04_concurrency_test.py.
- Expected result: one HTTP 201 and one HTTP 409.
- Final RACE-01 state: capacity = 1, enrolled = 1, remaining = 0.

## 5. Performance
- Generated 100000 rows with dataset = performance.
- Index: idx_enrollment_events_dataset_student_time.
- Query: filter by dataset, student_id and occurred_at.
- Before index:
  - Scan type: Not recorded.
  - Execution Time: Not recorded.
  - Buffers: Not recorded.
- After index:
  - Scan type: Index Scan.
  - Execution Time: 0.154 ms.
  - Planning Time: 0.163 ms.
  - Rows returned: 50.
  - Buffers: shared hit = 53.
  - Index Searches: 1.

## 6. Security
- Used SQLAlchemy bind parameters.
- Tested a special search input through Postman.
- No SQL injection or unintended data changes.

## 7. Git
- Branch: week04-transaction-index.
- Commit: Add transaction locking and query optimization.

Không commit backend/.env.