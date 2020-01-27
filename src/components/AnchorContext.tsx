import { createContext } from "react";

import { noop } from "../utils/noop";

export interface TContext {
  sections: HTMLElement[];
  hash: string;
  registerSection: (element: HTMLElement) => void;
  unregisterSection: (element: HTMLElement) => void;
  setHash: (hash: string, withScroll?: boolean) => void;
}

export const AnchorContext = createContext<TContext>({
  sections: [],
  hash: "",
  registerSection: noop,
  unregisterSection: noop,
  setHash: noop
});
