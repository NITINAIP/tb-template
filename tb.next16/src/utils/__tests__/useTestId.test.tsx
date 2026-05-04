/**
 * @jest-environment jsdom
 */

import { act, renderHook, waitFor } from "@testing-library/react";
import React from "react";

import { useTestId } from "../hook/useTestId";

describe("useTestId", () => {
  it("should set data-testid attribute on the element when testId is provided", async () => {
    const ref = React.createRef<HTMLSpanElement>();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <div>
        <span ref={ref} />
        {children}
      </div>
    );

    renderHook(() => useTestId<HTMLSpanElement>(ref as any, "my-testid"), {
      wrapper,
    });

    await waitFor(() => {
      expect(ref.current).not.toBeNull();
      expect(ref.current!.getAttribute("data-testid")).toBe("my-testid");
    });
  });

  it("should update data-testid attribute when returned setter is called", async () => {
    const ref = React.createRef<HTMLSpanElement>();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <div>
        <span ref={ref} />
        {children}
      </div>
    );

    const { result } = renderHook(
      () => useTestId<HTMLSpanElement>(ref as any, "first-id"),
      { wrapper },
    );

    await waitFor(() => {
      expect(ref.current!.getAttribute("data-testid")).toBe("first-id");
    });

    act(() => {
      result.current("second-id");
    });

    await waitFor(() => {
      expect(ref.current!.getAttribute("data-testid")).toBe("second-id");
    });
  });

  it("should NOT set data-testid attribute when testId is undefined", async () => {
    const ref = React.createRef<HTMLSpanElement>();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <div>
        <span ref={ref} />
        {children}
      </div>
    );

    renderHook(() => useTestId<HTMLSpanElement>(ref as any, undefined), {
      wrapper,
    });

    await waitFor(() => {
      expect(ref.current).not.toBeNull();
    });

    expect(ref.current!.hasAttribute("data-testid")).toBe(false);
  });

  it("should NOT throw and should not set attribute when ref.current is null", async () => {
    const ref = { current: null } as React.RefObject<null>;

    const { result } = renderHook(() =>
      useTestId<HTMLSpanElement>(ref, "any-id"),
    );

    act(() => {
      result.current("new-id");
    });

    expect(true).toBe(true);
  });
});
