import { useMediaQuery } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

import { nextApi } from "@/libs/nextApi";
import { closeNavbar, openNavbar } from "@/redux/slices/navbarSlice";
import { fireEvent, renderWithProvider } from "@/utils/renderWithProvider";
import { RootState } from "@/utils/types";

import Navbar from "./Navbar";

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
  let mocklogoutRedirect: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    mocklogoutRedirect = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue("/");
    (useMediaQuery as jest.Mock).mockReturnValue(false);
    mockDispatch = jest.fn();
    reduxStore = {
      navbar: {
        isOpened: true,
      },
      auth: {
        userInfo: {
          menuPermission: {},
        },
      },
    };
  });

  const setup = () =>
    renderWithProvider(<Navbar>test</Navbar>, {
      reduxStore,
      mockDispatch,
    });

  it("renders the logo", () => {
    (usePathname as jest.Mock).mockReturnValue(
      "/setup/master-document-list/8e0a0216-da0d-4acf-8739-0c65075df46f/edit",
    );
    const { getByAltText } = setup();
    const logo = getByAltText("Thanachart Insurance");
    expect(logo).toBeInTheDocument();
  });

  it("should be able to open the navbar", () => {
    reduxStore.navbar = { isOpened: false };
    const { queryByTestId } = setup();
    const openBtn = queryByTestId("open-menu-btn");
    expect(openBtn).toBeInTheDocument();
    fireEvent.click(openBtn!);
    expect(mockDispatch).toHaveBeenCalledWith(openNavbar());
  });

  it("should be able to close the navbar in desktop", () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);
    const { queryByTestId } = setup();
    const closeBtn = queryByTestId("close-menu-btn");
    expect(closeBtn).toBeInTheDocument();
    fireEvent.click(closeBtn!);
    expect(mockDispatch).toHaveBeenCalledWith(closeNavbar());
  });

  it("should clicked icon logout", () => {
    jest.spyOn(nextApi, "post").mockResolvedValue({ success: false });
    const { queryByTestId } = setup();
    const iconLogout = queryByTestId("icon-logout");
    expect(iconLogout).toBeInTheDocument();
  });
});
