import { cleanup } from "@testing-library/react";
import {
  render,
  mockTask,
  mockPersons,
  mockProjects,
  mockTaskLabels,
  mockTaskAttachments,
} from "../../../../../testing";
import { Details } from "../Details";

jest.mock("../../../common/DeskproTickets/DeskproTickets", () => ({
  DeskproTickets: () => <>100500</>,
}));

describe("ViewTask", () => {
  describe("Details", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText  } = render((
        <Details
          task={mockTask as never}
          projects={mockProjects}
          persons={mockPersons}
          labels={mockTaskLabels}
          attachments={mockTaskAttachments}
        />
      ), { wrappers: { theme: true }});

      expect(await findByText(/Research/i)).toBeInTheDocument();
      expect(await findByText(/This is description/i)).toBeInTheDocument();
      expect(await findByText(/Project MeisterTask App/i)).toBeInTheDocument();
      expect(await findByText(/In Progress/i)).toBeInTheDocument();
      expect(await findByText(/miTp0RAo/i)).toBeInTheDocument();
      expect(await findByText(/Open/i)).toBeInTheDocument();
      expect(await findByText(/11 Aug, 2023/i)).toBeInTheDocument();
      expect(await findByText(/31 Aug, 2023/i)).toBeInTheDocument();
      expect(await findByText(/100500/i)).toBeInTheDocument();
      expect(await findByText(/MVP/i)).toBeInTheDocument();
      expect(await findByText(/Priority 1/i)).toBeInTheDocument();
      expect(await findByText(/Priority 2/i)).toBeInTheDocument();
      expect(await findByText(/Priority 3/i)).toBeInTheDocument();
      expect(await findByText(/avatar.jpeg/i)).toBeInTheDocument();
      expect(await findByText(/sam-html.pdf/i)).toBeInTheDocument();
    });
  });
});
