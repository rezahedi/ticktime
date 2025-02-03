import { describe, it, expect } from "vitest";

describe("something truthy and falsy", () => {
  it("true expect to be true", () => {
    expect(true).toBeTruthy()
  });

  it("false expect to be false", () => {
    expect(false).toBeFalsy()
  })
})