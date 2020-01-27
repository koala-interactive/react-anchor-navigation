import React, { useContext, useRef, useEffect } from "react";

import { AnchorContext } from "./AnchorContext";

interface TProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
}

export function AnchorSection({ children, ...attributes }: TProps) {
  const { registerSection, unregisterSection } = useContext(AnchorContext);
  const ref = useRef<HTMLElement>(null);

  // Logic to register/unregister component
  // when added/removed from DOM
  useEffect(() => {
    if (ref.current) {
      registerSection(ref.current);

      // Initialization of the component.
      // If mounted from a SPA without server-side rendering the hash will not
      // scroll at all, so do it manually
      if (attributes.id === location.hash.substr(1)) {
        ref.current.scrollIntoView();
      }
    }

    return () => {
      if (ref.current) {
        unregisterSection(ref.current);
      }
    };
  }, []);

  return (
    <>
      <b {...attributes} ref={ref}></b>
      {children}
    </>
  );
}
