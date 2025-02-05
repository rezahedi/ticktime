import { describe, it, expect, beforeAll, vi } from "vitest";
import { calculateRemainedDays } from "./components/Todo/Item"

describe("calculateRemainedDays", () => {

  // Mock the current date to 02/03/2025
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("02/03/2025"))
  })
  
  it("Expect to return 10 that means 10 days remained", () => {
    expect(calculateRemainedDays("2/13/2025")).toBe(10)
  });

  it("Expect to return -2 that means 2 days passed", () => {
    expect(calculateRemainedDays("2/1/2025")).toBe(-2)
  })

  it("Expect to return 0", () => {
    expect(calculateRemainedDays("23423wersdf")).toBe(0)
  })
})