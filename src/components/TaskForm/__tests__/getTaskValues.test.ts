import pick from "lodash/pick";
import { getTaskValues } from "../utils";
import mockValues from "./mockFormValues.json";

describe("TaskForm", () => {
  describe("getTaskValues", () => {
    test("should return required values", () => {
      const values = pick(mockValues, ["name", "section", "project"]);
      expect(getTaskValues(values as never)).toStrictEqual({
        name: "Task for test",
        notes: "",
        label_ids: [],
      });
    });

    test("should return full task values", () => {
      expect(getTaskValues({
        ...mockValues,
        dueDate: new Date(mockValues.dueDate),
      } as never)).toStrictEqual({
        name: "Task for test",
        assigned_to_id: 107758481,
        due: "2023-08-30T21:00:00Z",
        notes: "this is description",
        status: 1,
        label_ids: [9477959, 9477947, 9477948],
      });
    });
  });
});
