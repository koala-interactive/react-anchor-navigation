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
    const throttleScrollEvent = throttle(() => {
      const { blockScrollEvent, sections, scroller } = ref.current;

      if (blockScrollEvent || !sections.length) {
        return;
      }

      const y = scroller
        ? scroller.scrollTop
        : window.pageYOffset || document.documentElement.scrollTop;

      // Before the first element
      if (getElementScrollPosition(sections[0], scroller) > y) {
        setHash(`#`, false);
        return;
      }

      // Get first element overflowing top, get the previous one
      const selectedIndex = sections.findIndex(
        item => getElementScrollPosition(item, scroller) > y
      );
      const selectedElement = sections[Math.max(selectedIndex - 1, 0)];

      if (selectedElement) {
        setHash(`#${selectedElement.id}`, false);
      }
    }, 100);

    addEventListener("scroll", throttleScrollEvent, PASSIVE_OPTION);

    return () => {
      removeEventListener("scroll", throttleScrollEvent, PASSIVE_OPTION);
      throttleScrollEvent.cancel();
    };
  }, []);
}
