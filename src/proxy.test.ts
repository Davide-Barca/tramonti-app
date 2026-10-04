// @vitest-environment node
import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { SESSION_COOKIE } from "@/lib/auth/constants";
import { proxy } from "./proxy";

const BASE = "http://localhost:3000";

function request(path: string, cookies: Record<string, string> = {}) {
  const req = new NextRequest(new URL(path, BASE));
  for (const [name, value] of Object.entries(cookies)) {
    req.cookies.set(name, value);
  }
  return req;
}

describe("proxy: admin guard", () => {
  it("redirects to login without session cookie, keeping the origin path", () => {
    const res = proxy(request("/admin/prodotti"));

    expect(res.status).toBe(307);
    const location = new URL(res.headers.get("location")!);
    expect(location.pathname).toBe("/admin/login");
    expect(location.searchParams.get("from")).toBe("/admin/prodotti");
  });

  it("lets the login page through without session cookie", () => {
    const res = proxy(request("/admin/login"));

    expect(res.headers.get("location")).toBeNull();
  });

  it("lets admin pages through when the session cookie exists", () => {
    const res = proxy(request("/admin", { [SESSION_COOKIE]: "token" }));

    expect(res.headers.get("location")).toBeNull();
  });

  it("does not guard paths that only start with 'admin'", () => {
    const res = proxy(request("/administration"));

    expect(res.headers.get("location") ?? "").not.toContain("/admin/login");
  });
});

describe("proxy: i18n (localePrefix as-needed)", () => {
  it("serves the default locale without prefix via rewrite", () => {
    const res = proxy(request("/"));

    expect(res.headers.get("x-middleware-rewrite")).toBe(`${BASE}/it`);
  });

  it("redirects the explicit default-locale prefix to the unprefixed URL", () => {
    const res = proxy(request("/it"));

    expect(res.status).toBe(307);
    expect(new URL(res.headers.get("location")!).pathname).toBe("/");
  });
});
