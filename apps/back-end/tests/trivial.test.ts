import { describe, expect, test } from "vitest";

describe("Trivial test", () => {
    test("1 is equal to 1. Big surprise, I know.", () => {
        // Imagine if this ends up failing lol.
        expect(1).toBe(1)
    })
})
