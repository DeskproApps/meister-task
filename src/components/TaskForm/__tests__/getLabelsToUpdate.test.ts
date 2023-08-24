import { getLabelsToUpdate } from "../utils";

describe("TaskForm", () => {
  describe("getLabelsToUpdate", () => {
    test("should return labels to update", () => {
      expect(getLabelsToUpdate(
        [1, 2] as never,
        { labels: [1] } as never,
      )).toEqual({ add: [], rem: [2] });

      expect(getLabelsToUpdate(
        [1, 2] as never,
        { labels: [2, 3] } as never,
      )).toEqual({ add: [3], rem: [1] });
    });

    test("should return nothing to update", () => {
      expect(getLabelsToUpdate(
        [] as never,
        { labels: [] } as never,
      )).toEqual({ add: [], rem: [] });

      expect(getLabelsToUpdate(
        [1, 2] as never,
        { labels: [1, 2] } as never,
      )).toEqual({ add: [], rem: [] });
    });
  });
});
