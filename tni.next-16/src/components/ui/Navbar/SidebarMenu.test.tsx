import { useMediaQuery } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

import { renderWithProvider } from "@/utils/renderWithProvider";
import { RootState } from "@/utils/types";

import SidebarMenu from "./SidebarMenu";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useMediaQuery: jest.fn(),
}));

describe("Navbar Component", () => {
  let mockPush: jest.Mock;
  let reduxStore: Partial<RootState>;
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue("/");
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    mockDispatch = jest.fn();
    reduxStore = {
      user: {
        userInfo: {
          menuPermission: {},
        },
      },
    };
  });

  const setup = () =>
    renderWithProvider(<SidebarMenu />, {
      reduxStore,
      mockDispatch,
    });
  it("renders the SidebarMenu", () => {
    const { getByTestId } = setup();
    const Setup = getByTestId("Provinces-sidebar-button");
    expect(Setup).toBeInTheDocument();
  });
});
