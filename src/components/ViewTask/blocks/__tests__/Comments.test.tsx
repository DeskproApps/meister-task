import { cleanup } from "@testing-library/react";
import { render, mockPersons, mockTaskComments } from "../../../../../testing";
import { Comments } from "../Comments";

jest.mock('react-time-ago', () => jest.fn().mockReturnValue('7h 30m'));

describe("ViewTask", () => {
  describe("Comments", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = render((
        <Comments
          persons={mockPersons}
          comments={mockTaskComments}
          onNavigateToAddComment={jest.fn()}
        />
      ), { wrappers: { theme: true } });

      expect(await findByText(/Comments \(3\)/i)).toBeInTheDocument();
      expect(await findByText(/First comment/i)).toBeInTheDocument();
      expect(await findByText(/reply to this comment/i)).toBeInTheDocument();
      expect(await findByText(/Second comment/i)).toBeInTheDocument();
    });
  });
});
