import { getLabelsToUpdate } from "../utils";

const relations = [
  { id: 1011, label_id: 1, task_id: 101 },
  { id: 1012, label_id: 2, task_id: 101 },
];

describe("TaskForm", () => {
  describe("getLabelsToUpdate", () => {

    test("should return labels to update", () => {
      expect(getLabelsToUpdate(relations as never, { labels: [1] } as never))
        .toEqual({ add: [], rem: [1012] });

      expect(getLabelsToUpdate(relations as never, { labels: [2, 3] } as never))
        .toEqual({ add: [3], rem: [1011] });
    });

    test("should return nothing to update", () => {
      expect(getLabelsToUpdate(
        [] as never,
        { labels: [] } as never,
      )).toEqual({ add: [], rem: [] });

      expect(getLabelsToUpdate(relations as never, { labels: [1, 2] } as never))
        .toEqual({ add: [], rem: [] });
    });
  });
});
