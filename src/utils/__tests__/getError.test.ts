import { getError } from "../getError";
import { mockAPIErrors, mockAuthErrors } from "../../../testing";

describe("getError", () => {
  test("should return api error message", () => {
    expect(getError(mockAPIErrors as never)).toBe("Access to project with ID 123 forbidden");
  });

  test("should return auth error message", () => {
    expect(getError(mockAuthErrors as never)).toBe("Error message");
  });

  test.each([undefined, null, "", 0, true, false, {}])("wrong value %p", (value) => {
    expect(getError(value as never)).toBeNull();
  });
});
