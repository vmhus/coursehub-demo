students = [
    {
        "id": "22000001",
        "name": "Nguyen Minh Anh",
        "major": "KHDL"
    },
    {
        "id": "22000002",
        "name": "Tran Duc Long",
        "major": "KHDL"
    },
]

courses = [
    {
        "code": "INT2204",
        "name": "Co so du lieu Web va he thong thong tin",
        "capacity": 3,
        "enrolled": 2,
    },
    {
        "code": "INT2205",
        "name": "Khai pha du lieu",
        "capacity": 2,
        "enrolled": 2,
    },
]

enrollments = [
    {
        "student_id": "22000001",
        "course_code": "INT2204"
    }
]


# 1. Hiển thị số chỗ còn lại
for course in courses:
    remaining = course["capacity"] - course["enrolled"]
    print(course["code"], "- con", remaining, "cho")


# 2. Tìm học phần theo mã
def find_course(course_code):
    for course in courses:
        if course["code"] == course_code:
            return course

    return None


print(find_course("INT2204"))


# 3. Kiểm tra sinh viên có thể đăng ký hay không
def can_enroll(student_id, course_code):
    course = find_course(course_code)

    if course is None:
        return False, "Hoc phan khong ton tai"

    duplicated = any(
        item["student_id"] == student_id
        and item["course_code"] == course_code
        for item in enrollments
    )

    if duplicated:
        return False, "Sinh vien da dang ky hoc phan nay"

    if course["enrolled"] >= course["capacity"]:
        return False, "Lop da du so luong"

    return True, "Co the dang ky"


print(can_enroll("22000002", "INT2204"))

def enroll_student(student_id, course_code):
    # Kiểm tra sinh viên tồn tại
    student_exists = any(
        student["id"] == student_id
        for student in students
    )

    if not student_exists:
        return False, "Sinh vien khong ton tai"

    # Kiểm tra học phần và các điều kiện đăng ký
    can_register, message = can_enroll(student_id, course_code)

    if not can_register:
        return False, message

    # Tìm học phần
    course = find_course(course_code)

    # Thêm đăng ký
    enrollments.append({
        "student_id": student_id,
        "course_code": course_code
    })

    # Cập nhật số lượng sinh viên đã đăng ký
    course["enrolled"] += 1

    return True, "Dang ky thanh cong"

# 4. Xử lý dữ liệu nhập sai
try:
    limit = int(input("Nhap so luong hoc phan muon hien thi: "))
    print(courses[:limit])
except ValueError:
    print("So luong phai la so nguyen")


# 5. Tìm kiếm học phần theo mã hoặc tên
def search_courses(keyword):
    normalized = keyword.strip().lower()

    results = []

    for course in courses:
        code = course["code"].lower()
        name = course["name"].lower()

        if normalized in code or normalized in name:
            results.append(course)

    return results


print(search_courses("web"))

print("\n===== KIEM THU ENROLL STUDENT =====")

# 1. Đăng ký thành công
print("Test 1:")
print(enroll_student("22000002", "INT2204"))

# 2. Đăng ký trùng
print("Test 2:")
print(enroll_student("22000002", "INT2204"))

# 3. Lớp đầy
print("Test 3:")
print(enroll_student("22000001", "INT2205"))

# 4. Mã học phần không tồn tại
print("Test 4:")
print(enroll_student("22000002", "INT9999"))

# 5. Mã sinh viên không tồn tại
print("Test 5:")
print(enroll_student("99999999", "INT2204"))