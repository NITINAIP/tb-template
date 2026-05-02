import { DialogSlots, Slide, SlideProps } from "@mui/material";
import { forwardRef } from "react";

export const Transition = forwardRef(function Transition(
  props: SlideProps,
  ref,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const slotsTransition: Record<keyof DialogSlots, any> = {
  transition: Transition,
  container: undefined,
  paper: undefined,
  backdrop: undefined,
  root: undefined,
};
