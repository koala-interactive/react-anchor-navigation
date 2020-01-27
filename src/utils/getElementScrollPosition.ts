import { TStore } from "../components/AnchorProvider";

export const getElementScrollPosition = (
  element: HTMLElement,
  scroller: TStore["scroller"]
): number => {
  let y = 0;
  let el: HTMLElement | null = element;

  do {
    y += el.offsetTop;
    el = el.offsetParent as HTMLElement | null;
  } while (el && el !== scroller);

  return y;
};
