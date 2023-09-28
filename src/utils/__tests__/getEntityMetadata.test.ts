import { getEntityMetadata } from "../getEntityMetadata";
import { mockTask } from "../../../testing/mocks";

const task = {
  ...mockTask,
  notes: "this is description",
};

const project = { id: 101, name: "Project MeisterTask App" };

const assignee = { id: 401, fullName: "Armen Tamzarian" };

const labels = [
  { id: 501, name: "MVP" },
  { id: 502, name: "Deskpro" },
  { id: 503, name: "Priority 1" },
];

describe("getEntityMetadata", () => {
  test("should return metadata", () => {
    const result = getEntityMetadata(
      task as never,
      project as never,
      assignee as never,
      labels as never,
    );
    expect(result).toStrictEqual({
      id: "305",
      name: "Research",
      description: "this is description",
      projectId: "101",
      projectName: "Project MeisterTask App",
      sectionId: "202",
      sectionName: "In Progress",
      assignee: { id: "401", fullName: "Armen Tamzarian" },
      labels: [
        { id: "501", name: "MVP" },
        { id: "502", name: "Deskpro" },
        { id: "503", name: "Priority 1" },
      ],
      dueDate: "2023-08-31T09:00:00.000000Z",
    });
  });

  test("shouldn't return assignee", () => {
    const result = getEntityMetadata(
      { ...task, assignee_name: "Taras Shevchenko" } as never,
      project as never,
      undefined,
      labels as never,
    );
    expect(result).toStrictEqual({
      id: "305",
      name: "Research",
      description: "this is description",
      projectId: "101",
      projectName: "Project MeisterTask App",
      sectionId: "202",
      sectionName: "In Progress",
      assignee: { id: "401", fullName: "Taras Shevchenko" },
      labels: [
        { id: "501", name: "MVP" },
        { id: "502", name: "Deskpro" },
        { id: "503", name: "Priority 1" },
      ],
      dueDate: "2023-08-31T09:00:00.000000Z",
    });
  });

  test("shouldn't return due date", () => {
    const result = getEntityMetadata(
      { ...task, due: null } as never,
      project as never,
      assignee as never,
      labels as never,
    );
    expect(result).toStrictEqual({
      id: "305",
      name: "Research",
      description: "this is description",
      projectId: "101",
      projectName: "Project MeisterTask App",
      sectionId: "202",
      sectionName: "In Progress",
      assignee: { id: "401", fullName: "Armen Tamzarian" },
      labels: [
        { id: "501", name: "MVP" },
        { id: "502", name: "Deskpro" },
        { id: "503", name: "Priority 1" },
      ],
      dueDate: "",
    });
  });

  test("shouldn't return labels", () => {
    const result = getEntityMetadata(
      task as never,
      project as never,
      assignee as never,
    );
    expect(result).toStrictEqual({
      id: "305",
      name: "Research",
      description: "this is description",
      projectId: "101",
      projectName: "Project MeisterTask App",
      sectionId: "202",
      sectionName: "In Progress",
      assignee: { id: "401", fullName: "Armen Tamzarian" },
      labels: [],
      dueDate: "2023-08-31T09:00:00.000000Z",
    });
  });

  test("shouldn't return metadata", () => {
    expect(getEntityMetadata()).toBeUndefined();
  });
});
