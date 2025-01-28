import { cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, mockProjects } from "../../../../../testing";
import { Filters } from "../Filters";

describe("LinkIssues", () => {
  describe("Filters", () => {
    beforeAll(() => {
      window.HTMLElement.prototype.scrollTo = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = render((
        <Filters
          projects={[]}
          selectedProject={undefined}
          onChangeProject={jest.fn()}
        />
      ), { wrappers: { theme: true }});

      expect(await findByText(/Project/i)).toBeInTheDocument();
    });

    test("should show no \"No project(s) found\" if no projects", async () => {
      const { findByText } = render((
        <Filters
          projects={[]}
          selectedProject={undefined}
          onChangeProject={jest.fn()}
        />
      ), { wrappers: { appSdk: true }});

      const projectSelect = await findByText(/Select Value/i);

      await act(async () => {
        await userEvent.click(projectSelect as Element);
      });

      expect(await findByText(/No project\(s\) found/i)).toBeInTheDocument();
    });

    test("should show projects", async () => {
      const { findByText } = render((
        <Filters
          projects={mockProjects as never[]}
          selectedProject={undefined}
          onChangeProject={jest.fn()}
        />
      ), { wrappers: { appSdk: true }});

      const projectSelect = await findByText(/Select Value/i);

      await act(async () => {
        await userEvent.click(projectSelect as Element);
      });

      expect(await findByText(/Project MeisterTask App/i)).toBeInTheDocument();
      expect(await findByText(/Project PM/i)).toBeInTheDocument();
      expect(await findByText(/Project: Lesson Planning/i)).toBeInTheDocument();
    });
  });
});
