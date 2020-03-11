import { useEffect, MutableRefObject } from "react";

import { SUPPORT_PASSIVE_EVENT } from "../utils/supportPassiveEvent";
import { throttle } from "../utils/throttle";
import { getElementScrollPosition } from "../utils/getElementScrollPosition";
import { TContext } from "../components/AnchorContext";
import { TStore } from "../components/AnchorProvider";

const PASSIVE_OPTION = SUPPORT_PASSIVE_EVENT && {
  capture: false,
  passive: true
};

export function useAnchorScrollListener(
  ref: MutableRefObject<TStore>,
  setHash: TContext["setHash"]
) {
  useEffect(() => {
    const onScroll = (event?: React.UIEvent<HTMLElement>) => {
      const { blockScrollEvent, sections, scroller, offset } = ref.current;

      if (blockScrollEvent || !sections.length) {
        return;
      }

      const y =
        (scroller
          ? scroller.scrollTop
          : window.pageYOffset || document.documentElement.scrollTop) + offset;

      // Before the first element
      if (getElementScrollPosition(sections[0], scroller) > y) {
        if (event) {
          setHash("#", false);
        }
        return;
      }

      // Get first element overflowing top, get the previous one
      const selectedIndex = sections.findIndex(
        item => getElementScrollPosition(item, scroller) > y
      );

      const selectedElement =
        selectedIndex === -1
          ? sections[sections.length - 1]
          : sections[Math.max(selectedIndex - 1, 0)];

      if (selectedElement) {
        setHash(`#${selectedElement.id}`, false);
      }
    };

    const throttleScrollEvent = throttle(onScroll, 100);
    addEventListener("scroll", throttleScrollEvent, PASSIVE_OPTION);
    onScroll();

    return () => {
      removeEventListener("scroll", throttleScrollEvent, PASSIVE_OPTION);
      throttleScrollEvent.cancel();
    };
  }, []);
}
