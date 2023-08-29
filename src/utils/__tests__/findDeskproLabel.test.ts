import { findDeskproLabel } from "../findDeskproLabel";

const dpLabel = { id: 100, name: "Deskpro" };

const labels = [
  { id: 101, name: "MVP" },
  { id: 102, name: "test" },
  { id: 103,  name: "" },
];

describe("findDeskproLabel", () => {
  test("should return Deskpro label", () => {
    expect(findDeskproLabel([dpLabel] as never)).toEqual(dpLabel);
    expect(findDeskproLabel([...labels, dpLabel] as never)).toEqual(dpLabel);
  });

  describe("should return undefined if Deskpro Tag not exist", () => {
    test("", () => {
      expect(findDeskproLabel(labels as never)).toBeUndefined();
    });

    test.each(
      [undefined, null, "", 0, true, false, {}, []]
    )("wrong value %p", (value) => {
      expect(findDeskproLabel(value as never)).toBeUndefined();
    });
  });
});
