import { createContext } from "react";

import { noop } from "../utils/noop";

export interface TContext {
  offset: number;
  sections: HTMLElement[];
  hash: string;
  registerSection: (element: HTMLElement) => void;
  unregisterSection: (element: HTMLElement) => void;
  setHash: (hash: string, withScroll?: boolean) => void;
}

export const AnchorContext = createContext<TContext>({
  offset: 0,
  sections: [],
  hash: "",
  registerSection: noop,
  unregisterSection: noop,
  setHash: noop
});
