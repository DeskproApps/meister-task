import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, mockTask } from "../../../../testing";
import { CreateTask } from "../CreateTask";

describe("CreateTask", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should navigate to \"link tasks\" page", async () => {
    const mockOnNavigateToLink = jest.fn();
    const { findByRole } = render((
      <CreateTask
        task={mockTask as never}
        onSubmit={jest.fn()}
        onCancel={jest.fn()}
        onNavigateToLink={mockOnNavigateToLink}
      />
    ), { wrappers: { theme: true, query: true } });

    const findButton = await findByRole("button", { name: "Find Task" });

    await userEvent.click(findButton as Element);

    expect(mockOnNavigateToLink).toBeCalled();
  });
});
