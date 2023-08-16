import { cleanup } from "@testing-library/react";
import { render, mockTask, mockProjects } from "../../../../testing";
import { TaskItem } from "../TaskItem";

jest.mock("../../common/DeskproTickets/DeskproTickets", () => ({
  DeskproTickets: () => <>100500</>,
}));

describe("TaskItem", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = render((
      <TaskItem projects={mockProjects} task={mockTask as never} onClickTitle={jest.fn()} />
    ), { wrappers: { theme: true } });

    expect(await findByText(/Research/i)).toBeInTheDocument();
    expect(await findByText(/Project MeisterTask App/i)).toBeInTheDocument();
    expect(await findByText(/In Progress/i)).toBeInTheDocument();
    expect(await findByText(/miTp0RAo/i)).toBeInTheDocument();
    expect(await findByText(/Open/i)).toBeInTheDocument();
    expect(await findByText(/11 Aug, 2023/i)).toBeInTheDocument();
    expect(await findByText(/100500/i)).toBeInTheDocument();
  });
});
