import React, { useEffect, useState } from "react";

export const useTestId = <T extends HTMLSpanElement>(
  ref: React.RefObject<null>,
  testId?: string
) => {
  const [dataTestId, setDataTestId] = useState(testId);
  useEffect(() => {
    if (ref.current && dataTestId) {
      const el = ref.current as T;
      el.setAttribute("data-testid", dataTestId);
    }
  }, [ref, dataTestId]);
  return setDataTestId;
};
