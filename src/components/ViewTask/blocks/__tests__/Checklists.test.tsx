import { cleanup } from "@testing-library/react";
import {
  render,
  mockTaskChecklists,
  mockTaskChecklistItems,
} from "../../../../../testing";
import { Checklists } from "../Checklists";

describe("ViewTask", () => {
  describe("Checklists", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText  } = render((
        <Checklists
          checklists={mockTaskChecklists}
          checklistItems={mockTaskChecklistItems as never}
          onCompleteChecklist={jest.fn()}
        />
      ), { wrappers: { theme: true } });

      expect(await findByText(/Checklists/i)).toBeInTheDocument();
      expect(await findByText(/Checklist One/i)).toBeInTheDocument();
      expect(await findByText(/Figure out what the MeisterTask/i)).toBeInTheDocument();
      expect(await findByText(/Figure out the API of the MeisterTask/i)).toBeInTheDocument();
      expect(await findByText(/Create stories/i)).toBeInTheDocument();
      expect(await findByText(/Create repository/i)).toBeInTheDocument();
      expect(await findByText(/Init App/i)).toBeInTheDocument();
      expect(await findByText(/Checklist Two/i)).toBeInTheDocument();
      expect(await findByText(/hey/i)).toBeInTheDocument();
      expect(await findByText(/ho/i)).toBeInTheDocument();
      expect(await findByText(/let's go/i)).toBeInTheDocument();
    });
  });
});
