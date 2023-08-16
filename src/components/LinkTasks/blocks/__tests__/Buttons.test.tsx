import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../../../testing";
import { Buttons } from "../Buttons";

describe("LinkTasks", () => {
  describe("Buttons", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByRole } = render((
        <Buttons
          selectedTasks={[]}
          onLinkTasks={jest.fn()}
          onCancel={jest.fn()}
          isSubmitting={false}
        />
      ), { wrappers: { theme: true } });

      const linkTasksButton = await findByRole("button", { name: "Link Tasks" });
      const cancelButton = await findByRole("button", { name: "Cancel" });
      expect(linkTasksButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
    });

    test("should click \"link tasks\"", async () => {
      const mockOnLinkTasks = jest.fn();

      const { findByRole } = render((
        <Buttons
          selectedTasks={[{} as never]}
          onLinkTasks={mockOnLinkTasks}
          onCancel={jest.fn()}
          isSubmitting={false}
        />
      ), { wrappers: { theme: true }});

      const linkTasksButton = await findByRole("button", { name: "Link Tasks" });

      await userEvent.click(linkTasksButton as Element);

      expect(mockOnLinkTasks).toBeCalledTimes(1);
    });

    test("should click \"Cancel\"", async () => {
      const mockOnCancel = jest.fn();

      const { findByRole } = render((
        <Buttons
          selectedTasks={[{} as never]}
          onLinkTasks={jest.fn()}
          onCancel={mockOnCancel}
          isSubmitting={false}
        />
      ), { wrappers: { theme: true }});

      const cancelButton = await findByRole("button", { name: "Cancel" });

      await userEvent.click(cancelButton as Element);

      expect(mockOnCancel).toBeCalledTimes(1);
    })
  });
});
