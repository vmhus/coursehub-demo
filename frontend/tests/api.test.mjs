
import test, { afterEach } from "node:test";
import assert from "node:assert/strict";
import { api } from "../src/api.js";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("GET: đọc JSON thành công", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify([{ class_id: "WEB-01" }]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  const result = await api("/sections");

  assert.equal(result[0].class_id, "WEB-01");
});

test("POST: gửi JSON body", async () => {
  let requestOptions;

  globalThis.fetch = async (_url, options) => {
    requestOptions = options;

    return new Response(
      JSON.stringify({ message: "Dang ky thanh cong" }),
      { status: 201 }
    );
  };

  const result = await api("/enrollments", {
    method: "POST",
    body: {
      student_id: "22000004",
      class_section_id: "WEB-01",
    },
  });

  assert.equal(requestOptions.method, "POST");
  assert.equal(
    requestOptions.headers["Content-Type"],
    "application/json"
  );
  assert.equal(
    JSON.parse(requestOptions.body).class_section_id,
    "WEB-01"
  );
  assert.equal(result.message, "Dang ky thanh cong");
});

test("DELETE: xử lý HTTP 204 không có body", async () => {
  globalThis.fetch = async () =>
    new Response(null, { status: 204 });

  const result = await api("/enrollments/22000004/WEB-01", {
    method: "DELETE",
  });

  assert.equal(result, null);
});

test("404: trả thông báo lỗi từ Backend", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ detail: "Student not found" }), {
      status: 404,
    });

  await assert.rejects(
    api("/students/99999999/enrollments"),
    /HTTP 404: Student not found/
  );
});

test("409: xử lý lớp hết chỗ", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ detail: "Lop hoc phan da het cho" }), {
      status: 409,
    });

  await assert.rejects(
    api("/enrollments", {
      method: "POST",
      body: {
        student_id: "22000004",
        class_section_id: "RACE-01",
      },
    }),
    /HTTP 409: Lop hoc phan da het cho/
  );
});

test("422: ghép thông báo lỗi validation", async () => {
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        detail: [
          { msg: "Field required" },
          { msg: "Invalid value" },
        ],
      }),
      { status: 422 }
    );

  await assert.rejects(
    api("/enrollments", { method: "POST", body: {} }),
    /HTTP 422: Field required; Invalid value/
  );
});

test("Phản hồi không phải JSON: báo lỗi", async () => {
  globalThis.fetch = async () =>
    new Response("not-json", { status: 200 });

  await assert.rejects(
    api("/sections"),
    /phản hồi không phải JSON/
  );
});

test("Lỗi mạng: báo lỗi kết nối", async () => {
  globalThis.fetch = async () => {
    throw new TypeError("Network error");
  };

  await assert.rejects(
    api("/sections"),
    /Không nhận được phản hồi API/
  );
});

test("AbortError: giữ nguyên lỗi hủy request", async () => {
  const abortError = new Error("Aborted");
  abortError.name = "AbortError";

  globalThis.fetch = async () => {
    throw abortError;
  };

  await assert.rejects(
    api("/sections"),
    (error) => error.name === "AbortError"
  );
});
