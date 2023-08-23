import omit from "lodash/omit";
import { getFullName } from "../getFullName";
import { mockPerson } from "../../../testing";

describe("getFullName", () => {
  test("should return fullName", () => {
    expect(getFullName(mockPerson as never)).toBe("ilia\u00A0makarov");
  });

  test("should return only firstName", () => {
    const person = omit(mockPerson, ["lastname"]);
    expect(getFullName(person as never)).toBe("ilia");
  });

  test("should return only lastName", () => {
    const person = omit(mockPerson, ["firstname"]);
    expect(getFullName(person as never)).toBe("makarov");
  });

  test("should return email if fullName is empty", () => {
    const person = omit(mockPerson, ["firstname", "lastname"]);
    expect(getFullName(person as never)).toBe("ilia.makarov@me.com");
  });

  test("should return \"-\" if no fullName and email", () => {
    const person = omit(mockPerson, ["firstname", "lastname", "email"]);
    expect(getFullName(person as never)).toBe("-");
  });

  test.each([undefined, null, "", 0, true, false, {}])("wrong value %p", (value) => {
    expect(getFullName(value as never)).toBe("-");
  });
});
