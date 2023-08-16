import { filterTasks } from "../filterTasks";
import { mockTasks } from "../../../testing";

describe("filterTasks", () => {
  test.each([undefined, null, "", 0, true, false, {}])("wrong value %p", (value) => {
    expect(filterTasks(value as never)).toStrictEqual([]);
  });

  test("should return full task list if empty searching string", () => {
    expect(filterTasks(mockTasks as never)).toEqual(mockTasks);
  });

  test("should be compared IDs when searching for tasks", () => {
    expect(filterTasks(mockTasks as never, "320")).toMatchObject([
      { id: 320, token: "ot03PXby", name: "Meister Example: Geography Lesson" },
    ]);
  });

  test("should be compared tokens when searching for tasks", () => {
    expect(filterTasks(mockTasks as never, "m0s5xexS")).toMatchObject([
      { id: 308, token: "m0s5xexS", name: "Auth" },
    ]);
  });

  test("should search in the task name", () => {
    expect(filterTasks(mockTasks as never, "search")).toMatchObject([
      { id: 305, token: "miTp0RAo", name: "Research" },
      { id: 322, token: "ypSy5dzM", name: "Add your ideas and search resources here" },
    ]);
  });
});
