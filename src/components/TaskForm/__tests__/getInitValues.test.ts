import { getInitValues } from "../utils";

describe("TaskForm", () => {
  describe("getInitValues", () => {
    test("should return initial values for new task", () => {
      expect(getInitValues()).toEqual({
        project: 0,
        section: 0,
        name: "",
        description: "",
        assignee: 0,
        dueDate: undefined,
        status: 1,
        labels: [],
      });
    });

    test.todo("should return initial values for edit task");
  });
});
