import { cleanup, renderHook, act } from "@testing-library/react";
import { useDeskproLabel } from "../useDeskproLabel";
import {
  getTaskLabelsService,
  addLabelToTaskService,
  getProjectLabelsService,
  createProjectLabelService,
  removeLabelFromTaskService,
  getTaskLabelRelationsService,
} from "../../services/meister-task";
import {
  mockTask,
  mockLabel,
  mockTaskLabels,
  mockProjectLabels,
  mockTaskLabelRelation,
} from "../../../testing";
import type { Result } from "../useDeskproLabel";

jest.mock("../../services/meister-task/getTaskLabelsService");
jest.mock("../../services/meister-task/addLabelToTaskService");
jest.mock("../../services/meister-task/getProjectLabelsService");
jest.mock("../../services/meister-task/createProjectLabelService");
jest.mock("../../services/meister-task/removeLabelFromTaskService");
jest.mock("../../services/meister-task/getTaskLabelRelationsService");

describe("useDeskproLabel", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should add deskpro label to task", async () => {
    (getProjectLabelsService as jest.Mock).mockResolvedValueOnce(mockProjectLabels);
    (createProjectLabelService as jest.Mock).mockResolvedValueOnce(mockLabel);
    (addLabelToTaskService as jest.Mock).mockResolvedValueOnce(mockTaskLabelRelation);

    const { result } = renderHook<Result, unknown>(() => useDeskproLabel());

    await act(async () => {
      await result.current.addDeskproLabel(mockTask as never);
    });

    expect(getProjectLabelsService).toHaveBeenCalled();
    expect(createProjectLabelService).not.toHaveBeenCalled();
    expect(addLabelToTaskService).toHaveBeenCalled();
  });

  test("should add deskpro label to task and create label if it does not exist on project", async () => {
    (getProjectLabelsService as jest.Mock).mockResolvedValueOnce([mockProjectLabels[1], mockProjectLabels[2]]);
    (createProjectLabelService as jest.Mock).mockResolvedValueOnce(mockLabel);
    (addLabelToTaskService as jest.Mock).mockResolvedValueOnce(mockTaskLabelRelation);

    const { result } = renderHook<Result, unknown>(() => useDeskproLabel());

    await act(async () => {
      await result.current.addDeskproLabel(mockTask as never);
    });

    expect(getProjectLabelsService).toHaveBeenCalled();
    expect(createProjectLabelService).toHaveBeenCalled();
    expect(addLabelToTaskService).toHaveBeenCalled();
  });

  test("should remove deskpro label from task", async () => {
    (getTaskLabelsService as jest.Mock).mockResolvedValueOnce(mockTaskLabels);
    (getTaskLabelRelationsService as jest.Mock).mockResolvedValueOnce([mockTaskLabelRelation]);
    (removeLabelFromTaskService as jest.Mock).mockResolvedValueOnce(undefined);

    const { result } = renderHook<Result, unknown>(() => useDeskproLabel());

    await act(async () => {
      await result.current.removeDeskproLabel(mockTask as never);
    });

    expect(getTaskLabelsService).toHaveBeenCalled();
    expect(getTaskLabelRelationsService).toHaveBeenCalled();
    expect(removeLabelFromTaskService).toHaveBeenCalled();
  });

  test("shouldn't remove deskpro label from task if it does not exist", async () => {
    (getTaskLabelsService as jest.Mock).mockResolvedValueOnce([mockTaskLabels[1]]);
    (getTaskLabelRelationsService as jest.Mock).mockResolvedValueOnce([]);
    (removeLabelFromTaskService as jest.Mock).mockResolvedValueOnce(undefined);

    const { result } = renderHook<Result, unknown>(() => useDeskproLabel());

    await act(async () => {
      await result.current.removeDeskproLabel(mockTask as never);
    });

    expect(getTaskLabelsService).toHaveBeenCalled();
    expect(getTaskLabelRelationsService).toHaveBeenCalled();
    expect(removeLabelFromTaskService).not.toHaveBeenCalled();
  });

  test.todo("shouldn't add deskpro label if disabled in settings");

  test.todo("shouldn't remove deskpro label if disabled in settings");
});
