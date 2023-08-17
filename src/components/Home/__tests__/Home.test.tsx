import take from "lodash/take";
import { cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, mockTasks, mockProjects } from "../../../../testing";
import { Home } from "../Home";

jest.mock("../../common/DeskproTickets/DeskproTickets", () => ({
  DeskproTickets: () => <>100500</>,
}));

describe("Home", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { queryByText } = render((
      <Home
        tasks={take(mockTasks, 5) as never[]}
        projects={mockProjects as never}
        onNavigateToTask={jest.fn()}
      />
    ), { wrappers: { theme: true } });

    await waitFor(() => {
      expect(queryByText(/Create Tasks in "New Requests"/i)).toBeInTheDocument();
      expect(queryByText(/Use Tags to prioritize Tasks/i)).toBeInTheDocument();
      expect(queryByText(/Use Checklists to split Tasks/i)).toBeInTheDocument();
      expect(queryByText(/Move Tasks to "In Progress" when they're being worked on/i)).toBeInTheDocument();
      expect(queryByText(/Research/i)).toBeInTheDocument();
      expect(queryByText(/Move Tasks to "Completed" when they are done/i)).not.toBeInTheDocument();
    });
  });

  test("should show \"No found\" id wrong issues", async () => {
    const { findByText } = render((
      <Home
        tasks={{} as never[]}
        projects={mockProjects as never}
        onNavigateToTask={jest.fn()}
      />
    ), { wrappers: { theme: true } });

    expect(await findByText(/No found/i)).toBeInTheDocument();
  });

  test("should show \"No Bitbucket issues found\" if no issues", async () => {
    const { findByText } = render((
      <Home
        tasks={[] as never[]}
        projects={mockProjects as never}
        onNavigateToTask={jest.fn()}
      />
    ), { wrappers: { theme: true } });

    expect(await findByText(/No MeisterTask tasks found/i)).toBeInTheDocument();
  });

  test("should navigate to task details page", async () => {
    const mockOnNavigateToIssue = jest.fn();

    const { findByText } = render((
      <Home
        tasks={take(mockTasks, 5) as never[]}
        projects={mockProjects as never}
        onNavigateToTask={mockOnNavigateToIssue}
      />
    ), { wrappers: { theme: true } });

    const taskTitle = await findByText(/Research/i);

    await userEvent.click(taskTitle as Element);

    expect(mockOnNavigateToIssue).toHaveBeenCalled();
  })
});
