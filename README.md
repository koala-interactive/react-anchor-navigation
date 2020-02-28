# react-anchor-navigation

![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/koala-interactive/react-anchor-navigation/react)
![npm type definitions](https://img.shields.io/npm/types/react-anchor-navigation)

React lightweight library for anchor scrolling and navigation tied to URL hash.

## Features

This library exports multiple helpers designed to make your anchor navigation works seamlessly. Check the [examples](./examples/custom-section.html)

Four components :

- [AnchorContext](#AnchorContext)
- [AnchorLink](#AnchorLink)
- [AnchorProvider](#AnchorProvider)
- [AnchorSection](#AnchorSection)

## Getting Started

### Installation

This project uses react hooks and is therefore reliant on react version >=16.8.6

To install and use react-anchor-navigation, add it to your package.json and modules with the following command line :

```ts
npm install --save react-anchor-navigation
```

OR

```ts
yarn add react-anchor-navigation
```

### Usage

```tsx
import {
  AnchorContext,
  AnchorLink,
  AnchorProvider,
  AnchorSection
} from "react-anchor-navigation";
```

#### AnchorProvider

AnchorProvider is our top level contextProvider. Wrap it around your topmost component for your view :

```tsx
<AnchorProvider>
  <YourView />
</AnchorProvider>
```

| Key         | Type                |                                                                                                      Description |
| ----------- | :-----------------: | ---------------------------------------------------------------------------------------------------------------: |
| offset      | `number`            | The offset amount of pixels from the top, usefull when handling fixed header or sticky navigation (default: `0`) |
| getScroller | `() => HTMLElement` | Function to returns the scrollable element  (default: `body`)                                                    |

It will provide the AnchorContext to all children.

#### AnchorContext

AnchorContext is the context you can yield with the new `useContext` hook or with old-fashioned Context.consumer.

```ts
const { hash, sections } = useContext(AnchorContext);
```

Here is its typing :

| Key               |                      Type                       |                                                                                                                      Description |
| ----------------- | :---------------------------------------------: | -------------------------------------------------------------------------------------------------------------------------------: |
| sections          |                 `HTMLElement[]`                 |                                      List of the registered sections elements that we watch, in our codebase it is AnchorSection |
| hash              |                    `string`                     |                                                                 The registered hash corresponding to our current scroll position |
| registerSection   |        `(element: HTMLElement) => void`         | Function to add a Section to our sections list, our scrollEvent listener will then update the hash if the section is scrolled to |
| unregisterSection |        `(element: HTMLElement) => void`         |                 Function to remove a Section to our sections list, our scrollEvent listener will then stop checking this section |
| setHash           | `(hash: string, withScroll?: boolean) => void;` |                              Setter function from the internal useHash hooks, use it to programmatically change the current hash |
| offset            |                    `number`                     |                 The offset amount of pixels from the top, usefull when handling fixed header or sticky navigation (default: `0`) |

#### AnchorSection

AnchorSection is our most used components, it defines the scroll position you will arrive to on navigation/reloading

```ts
<AnchorSection className="dBlock anchor" id="definitions" />
```

Its props are the usual HTMLElement's props (`className, data-*`), along with an id used for recognizing the update the current hash on scroll.

```ts
interface TProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
}
```

Internally it creates a `<b/>` tag to which we scroll to on reload and detect if we scrolled past it.

```tsx
<>
  <b {...attributes} />
  {...children}
</>
```

#### AnchorLink

AnchorLink is a component made to have an activeClassname if its `href` is the current hash

```ts
interface TProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode[] | React.ReactNode;
  activeClassName?: string;
}
```

```tsx
<AnchorLink className="dTable w100 pad15" href="#definitions" activeClassName="blue">
```

### Custom Components Examples

TODO

## Roadmap

- Finish completing the README
- Add testing
