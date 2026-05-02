import { renderWithProvider } from "@/utils/renderWithProvider";

import UnauthorizedPage from "./page";

describe("UnauthorizedPage", () => {
  const setup = () => renderWithProvider(<UnauthorizedPage />);
  it("renders PageHandler with correct unauthorized message", () => {
    const { container } = setup();

    expect(container).toBeInTheDocument();
    expect(container).toHaveTextContent(
      "ไม่มีสิทธิเข้าใช้งาน กรุณาติดต่อ IT Service Desk",
    );
  });
});
