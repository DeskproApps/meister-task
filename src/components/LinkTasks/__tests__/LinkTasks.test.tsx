import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../../testing";
import { LinkTasks } from "../LinkTasks";

describe("LinkIssues", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should navigate to \"create task\" page", async () => {
    const mockOnNavigateToCreate = jest.fn();
    const { findByRole } = render((
      <LinkTasks
        isLoading={false}
        onChangeSearch={jest.fn()}
        tasks={[]}
        projects={[]}
        selectedTasks={[]}
        onChangeSelectedTask={jest.fn()}
        isSubmitting={false}
        onLinkTasks={jest.fn()}
        onCancel={jest.fn()}
        selectedProject={null}
        onChangeProject={jest.fn()}
        onNavigateToCreate={mockOnNavigateToCreate}
      />
    ), { wrappers: { theme: true } });

    const createButton = await findByRole("button", { name: "Create Task" });

    await userEvent.click(createButton as Element);

    expect(mockOnNavigateToCreate).toBeCalled();
  });
});
