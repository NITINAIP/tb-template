import { useMediaQuery } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

import { fireEvent, renderWithProvider } from "@/utils/renderWithProvider";

import Dialog from "./Dialog";
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn()
}));

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useMediaQuery: jest.fn()
}));

describe("Dialog Component", () => {
  let mockPush: jest.Mock;
  let reduxStore: Partial<any>;
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue("/");
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    mockDispatch = jest.fn();
    reduxStore = {
      dialog: {
        open: true,
        dialogDetail: {
          status: "",
          title: "",
          content: "",
          onConfirm: () => jest.fn(),
          onCancel: () => jest.fn(),
          redirectPath: ""
        }
      }
    };
  });

  const setup = () =>
    renderWithProvider(<Dialog />, {
      reduxStore,
      mockDispatch
    });
  it("renders the Dialog", async () => {
    const { container, findByTestId } = setup();
    const closeBtn = await findByTestId(`dialog-close-btn`);
    const confirmBtn = await findByTestId(`dialog-confirm-btn`);
    fireEvent.click(confirmBtn);
    expect(container).toBeInTheDocument();
    expect(confirmBtn).toBeInTheDocument();
    expect(closeBtn).toBeInTheDocument();
  });
  it("Dialog close action", async () => {
    const { container, findByTestId } = setup();
    const closeBtn = await findByTestId(`dialog-close-btn`);
    fireEvent.click(closeBtn);
    expect(container).toBeInTheDocument();
    expect(closeBtn).toBeInTheDocument();
  });
});
