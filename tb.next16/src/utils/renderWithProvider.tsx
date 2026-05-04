import "@testing-library/jest-dom";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";

import rootReducer from "@/redux/rootReducer";
import { store } from "@/redux/store";
import { theme } from "@/styled/theme";

import { MsalProviderMock } from "../../__mocks__/msalMock";

import { RootState } from "./types";

interface TestWrapperProps {
  children: ReactNode;
  reduxStore?: Partial<RootState>;
  mockDispatch?: typeof store.dispatch;
}

const TestWrapper = ({
  children,
  reduxStore,
  mockDispatch,
}: TestWrapperProps) => {
  const store: EnhancedStore = configureStore({
    reducer: rootReducer,
    preloadedState: reduxStore as RootState,
  });

  if (mockDispatch) {
    jest.spyOn(store, "dispatch").mockImplementation(mockDispatch);
  }

  return (
    <Provider store={store}>
      <MsalProviderMock>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </MsalProviderMock>
    </Provider>
  );
};

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  reduxStore?: Partial<RootState>;
  mockDispatch?: typeof store.dispatch;
}

const customRender = (
  ui: ReactElement,
  { reduxStore, mockDispatch, ...options }: CustomRenderOptions = {},
): RenderResult =>
  render(ui, {
    wrapper: (props) => (
      <TestWrapper
        {...props}
        reduxStore={reduxStore}
        mockDispatch={mockDispatch}
      />
    ),
    ...options,
  });

export * from "@testing-library/react";
export { customRender as renderWithProvider };
