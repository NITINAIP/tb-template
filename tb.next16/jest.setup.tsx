import '@testing-library/jest-dom';

import React from 'react';

global.React = React;

jest.mock("@mui/icons-material", () => {
  return new Proxy(
    {},
    {
      get: (target, prop) => () => <svg data-testid={prop} />
    }
  );
});

jest.mock("@mui/icons-material/DashboardOutlined", () => ({
  __esModule: true,
  default: () => <svg data-testid="DashboardOutlinedIcon" />
}));

jest.mock("@mui/icons-material/ContentPasteSearchOutlinedIcon", () => ({
  __esModule: true,
  default: () => <svg data-testid="ContentPasteSearchOutlinedIcon" />
}));

jest.mock("@mui/icons-material/MenuOpenIcon", () => ({
  __esModule: true,
  default: () => <svg data-testid="MenuOpenIcon" />
}));

jest.mock("@mui/icons-material/MenuIcon", () => ({
  __esModule: true,
  default: () => <svg data-testid="MenuIcon" />
}));
jest.spyOn(console, "error").mockImplementation(() => jest.fn());
jest.spyOn(console, "warn").mockImplementation(() => jest.fn());