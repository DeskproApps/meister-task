import { cleanup } from "@testing-library/react";
import { render } from "../../../../testing";
import { getProjectsService } from "../../../services/meister-task";
import { TaskForm } from "../TaskForm";

jest.mock("../../../services/meister-task/getProjectsService");

describe("TaskForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    (getProjectsService as jest.Mock).mockResolvedValue([]);

    const { findByText } = render((
      <TaskForm onSubmit={jest.fn()} onCancel={jest.fn()} />
    ), { wrappers: { theme: true, query: true } });

    expect(await findByText(/Project/i)).toBeInTheDocument();
    expect(await findByText(/Section/i)).toBeInTheDocument();
    expect(await findByText(/Task name/i)).toBeInTheDocument();
    expect(await findByText(/Description/i)).toBeInTheDocument();
    expect(await findByText(/Status/i)).toBeInTheDocument();
    expect(await findByText(/Assignee/i)).toBeInTheDocument();
    expect(await findByText(/Due date/i)).toBeInTheDocument();
    expect(await findByText(/Labels/i)).toBeInTheDocument();
  });

  test("render error", async () => {
    (getProjectsService as jest.Mock).mockResolvedValue([]);

    const { findByText } = render((
      <TaskForm onSubmit={jest.fn()} error="some error" />
    ), { wrappers: { theme: true, query: true } });

    expect(await findByText(/some error/i)).toBeInTheDocument();
  });

  test("render errors", async () => {
    (getProjectsService as jest.Mock).mockResolvedValue([]);

    const { findByText } = render((
      <TaskForm onSubmit={jest.fn()} error={["one error", "two error"]} />
    ), { wrappers: { theme: true, query: true } });

    expect(await findByText(/one error/i)).toBeInTheDocument();
    expect(await findByText(/two error/i)).toBeInTheDocument();
  });
});
