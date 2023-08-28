import { getInitValues } from "../utils";
import { mockTask } from "../../../../testing";

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

    test("should return initial values for edit task", () => {
      expect(getInitValues(mockTask as never, [305, 100500])).toEqual({
        project: 101,
        section: 202,
        name: "Research",
        description: "### This is description\n\n* __item 1__\n* _item 2_\n* item 3\n\nand here link [This is a link](https://www.meistertask.com)\n\n---\n\nbest regards,\nilia makarov",
        assignee: 401,
        dueDate: new Date("2023-08-31T09:00:00.000Z"),
        status: 1,
        labels: [305, 100500],
      });
    });
  });
});
