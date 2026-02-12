import { describe, it, expect, beforeEach } from "vitest";
import { designersApi } from "./designersApi";

describe("designersApi", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("creates and lists designers", async () => {
    const created = await designersApi.create({ fullName: "Test User", workingHours: 40 });
    expect(created.data.fullName).toBe("Test User");

    const list = await designersApi.list();
    expect(list.data.length).toBe(1);
    expect(list.data[0].fullName).toBe("Test User");
  });
});
