import take from "lodash/take";
import { cleanup, waitFor } from "@testing-library/react";
import { render, mockTasks, mockProjects } from "../../../../../testing";
import { Tasks } from "../Tasks";

jest.mock("../../../common/DeskproTickets/DeskproTickets", () => ({
  DeskproTickets: () => <>100500</>,
}));

describe("LinkTasks", () => {
  describe("Tasks", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { queryByText } = render((
        <Tasks
          tasks={take(mockTasks, 5) as never[]}
          selectedTasks={[]}
          isLoading={false}
          projects={mockProjects as never}
          onChangeSelectedTask={jest.fn()}
        />
      ), { wrappers: { theme: true }});

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
        <Tasks
          tasks={{} as never}
          selectedTasks={[]}
          isLoading={false}
          projects={[]}
          onChangeSelectedTask={jest.fn()}
        />
      ), { wrappers: { theme: true }});

      expect(await findByText(/No found/i)).toBeInTheDocument();
    });

    test("should show \"No MeisterTask tasks found\" if no tasks", async () => {
      const { findByText } = render((
        <Tasks
          tasks={[] as never}
          projects={[]}
          selectedTasks={[]}
          isLoading={false}
          onChangeSelectedTask={jest.fn()}
        />
      ), { wrappers: { theme: true }});

      expect(await findByText(/No MeisterTask tasks found/i)).toBeInTheDocument();
    });
  });
});
