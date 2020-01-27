import React, { useRef } from "react";

import { useHash } from "../hooks/useHash";
import { useAnchorScrollListener } from "../hooks/useAnchorScrollListener";
import { getElementScrollPosition } from "../utils/getElementScrollPosition";
import { AnchorContext, TContext } from "./AnchorContext";

export interface TStore {
  sections: TContext["sections"];
  blockScrollEvent: boolean;
  scroller: HTMLElement | null;
}

interface TProps {
  children: React.ReactNode[];
  getScroller?: () => TStore["scroller"];
}

export function AnchorProvider({ children, getScroller }: TProps) {
  const ref = useRef<TStore>({
    sections: [],
    blockScrollEvent: false,
    scroller: null
  });

  if (getScroller) {
    ref.current.scroller = getScroller();
  }

  const [hash, setHash] = useHash(ref);
  useAnchorScrollListener(ref, setHash);

  // Called when a <AnchorSection /> is mounted
  // It will be called with the current HTMLElement to be stored in
  // a list. The list should be sorted by element scroll position to
  // optimize the onscroll event.
  const registerSection: TContext["registerSection"] = element => {
    const { sections, scroller } = ref.current;

    if (sections.includes(element)) {
      return;
    }

    const y = getElementScrollPosition(element, scroller);
    const index = sections.findIndex(
      section => getElementScrollPosition(section, scroller) > y
    );

    if (index === -1) {
      sections.push(element);
    } else {
      sections.splice(index, 0, element);
    }
  };

  // Called when an <AnchorSection is unmounted
  // It will be called with the current element so we can delete it from
  // the list
  const unregisterSection: TContext["unregisterSection"] = element => {
    const index = ref.current.sections.indexOf(element);
    if (index !== -1) {
      ref.current.sections.splice(index, 1);
    }
  };

  return (
    <AnchorContext.Provider
      value={{
        hash,
        sections: ref.current.sections,
        setHash,
        registerSection,
        unregisterSection
      }}
    >
      {children}
    </AnchorContext.Provider>
  );
}
