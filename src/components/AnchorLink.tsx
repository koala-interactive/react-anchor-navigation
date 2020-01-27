import React, { useContext } from "react";

import { AnchorContext } from "./AnchorContext";

interface TProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode[] | React.ReactNode;
  activeClassName?: string;
}

export function AnchorLink({
  children,
  className,
  activeClassName,
  ...attributes
}: TProps) {
  const { hash } = useContext(AnchorContext);
  const newClassName =
    (className ? `${className} ` : "") +
    (hash === attributes.href ? activeClassName : "");

  return (
    <a {...attributes} className={newClassName}>
      {children}
    </a>
  );
}
