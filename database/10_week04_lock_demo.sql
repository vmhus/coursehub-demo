-- TAB A: Khóa dòng RACE-01 và giữ khóa trong 8 giây
BEGIN;

SELECT id, capacity
FROM class_sections
WHERE id = 'RACE-01'
FOR UPDATE;

SELECT pg_sleep(8);

COMMIT;


-- TAB B: Chạy khi TAB A đang pg_sleep(8)
BEGIN;

SELECT id, capacity
FROM class_sections
WHERE id = 'RACE-01'
FOR UPDATE;

ROLLBACK;