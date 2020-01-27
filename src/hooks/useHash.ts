import { useState, useEffect, MutableRefObject } from "react";

import { TContext } from "../components/AnchorContext";
import { TStore } from "../components/AnchorProvider";

// Hook listening for hash change
export function useHash(
  ref: MutableRefObject<TStore>
): [string, TContext["setHash"]] {
  const [hash, setHash] = useState("");

  const changeHash = (newHash: string, withScroll = true) => {
    setHash(newHash);

    if (globalThis.history && globalThis.location) {
      if (withScroll || !("pushState" in history)) {
        location.hash = newHash;
      } else {
        history.pushState(null, newHash.substr(1), newHash);
      }
    }
  };

  useEffect(() => {
    const onHashChange = (event?: HashChangeEvent | PopStateEvent) => {
      setHash(location.hash);

      // Small trick to avoid handling native scroll event on
      // hash change causing a second scroll
      if (event && event.type === "hashchange") {
        ref.current.blockScrollEvent = true;
        setTimeout(() => {
          ref.current.blockScrollEvent = false;
        }, 100);
      }
    };

    addEventListener("hashchange", onHashChange, false);
    addEventListener("popstate", onHashChange, false);

    // Can't set it directly because of mismatch when using
    // Universal Rendering (server-side doesn't get the hash from requests)
    onHashChange();

    return () => {
      removeEventListener("hashchange", onHashChange, false);
      removeEventListener("popstate", onHashChange, false);
    };
  }, []);

  return [hash, changeHash];
}
