import { getSectionId } from "../utils";
import values from "./mockFormValues.json";

describe("TaskForm", () => {
  describe("getSectionId", () => {
    test("should return section id", () => {
      expect(getSectionId(values as never)).toEqual(31690062);
    });
  });
});
