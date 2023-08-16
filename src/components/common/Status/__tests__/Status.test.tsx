import { cleanup } from "@testing-library/react";
import { Status } from "../Status";
import {render} from "../../../../../testing";

describe("Status", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should render \"Open\" status", async () => {
    const { findByText } = render((
      <Status status={1 as never} />
    ), { wrappers: { theme: true }});

    expect(await findByText(/Open/i)).toBeInTheDocument();
  });

  test("should render \"Completed\" status", async () => {
    const { findByText } = render((
      <Status status={2 as never} />
    ), { wrappers: { theme: true }});

    expect(await findByText(/Completed/i)).toBeInTheDocument();
  });

  test("should render \"Archived\" status", async () => {
    const { findByText } = render((
      <Status status={18 as never} />
    ), { wrappers: { theme: true }});

    expect(await findByText(/Archived/i)).toBeInTheDocument();
  });

  test("should render \"Trashed\" status", async () => {
    const { findByText } = render((
      <Status status={8 as never} />
    ), { wrappers: { theme: true }});

    expect(await findByText(/Trashed/i)).toBeInTheDocument();
  });

  test("should render \"-\" if there are no matches", async () => {
    const { findByText } = render((
      <Status status={0 as never} />
    ), { wrappers: { theme: true }});

    expect(await findByText(/-/i)).toBeInTheDocument();
  });
});
