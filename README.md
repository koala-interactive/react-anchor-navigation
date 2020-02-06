# react-anchor-navigation

React lightweight library for anchor scrolling and navigation tied to URL hash.

## Features

The library export multiples helpers designed to make your anchor navigation works seamlessly.

And four components :

- [AnchorContext](#AnchorContext)
- [AnchorLink](#AnchorLink)
- [AnchorProvider](#AnchorProvider)
- [AnchorSection](#AnchorSection)

Two hooks used internally (only import it for advanced or customized handling) :

- [useAnchorScrollListener](#useAnchorScrollListener)
- [useHash](#useHash)

## Getting Started

TODO:
Provide installation instructions, general usage guidance, API examples, and build and deployment information. Assume as little prior knowledge as possible, describing everything in clear and coherent steps. Avoid words such as "just" and "simple," which can be off putting to users who do not understand the instructions.

### Installation

This project uses react hooks and is therefore reliant on react version >=16.8.6

To install and use react-anchor-navigation, add it to your package.json and modules with the following command line :

```js
npm install --save react-anchor-navigation
```

OR

```js
yarn add react-anchor-navigation
```

### Usage

All our features are in these four components, for advanced and customized usage refers to the internal custom hooks documentation [here](#Advanded-Usage)

```jsx
import {
  AnchorContext,
  AnchorLink,
  AnchorProvider,
  AnchorSection
} from "react-anchor-navigation";
```

#### AnchorProvider

AnchorProvider is our top level contextProvider. Wrap it around your top-most component :

```JSX
<AnchorProvider>
  <YourView />
</AnchorProvider>
```

It will provide the AnchorContext to all children.

#### AnchorContext

AnchorContext is the context you can yield with the new `useContext` hook or with old-fashioned Context.consumer.

```js
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

#### AnchorSection

AnchorSection is our most used components, it defines the scroll position you will arrive to on navigation/reloading

```js
<AnchorSection className="dBlock anchor" id="definitions" />
```

Its props are the usual HTMLElement's props (`className, data-*`), along with an id used for recognizing the update the current hash on scroll.

```js
interface TProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
}
```

Internally it creates a `<b/>` tag to which we scroll to on reload and detect if we scrolled past it.

```JSX
<>
  <b {...attributes}></b>
  {...children}
</>
```

#### AnchorLink

AnchorLink is a component made to have an activeClassname if its `href` is the current hash

```js
interface TProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode[] | React.ReactNode;
  activeClassName?: string;
}
```

```JSX
<AnchorLink className="dTable w100 pad15" href="#definitions" activeClassName="blue">
```

### Advanded Usage

Here will be informations about our internals processing hooks. For most use and without needs for great customizations, you will not need to import those hooks.

#### useHash

useHash is a custom react hooks used internally in AnchorProvider. We still export it if you want to have an advanced usage (Otherwise it should not be needed) and not use AnchorProvider.

Usage :

```
export interface TStore {
  sections: TContext["sections"];
  blockScrollEvent: boolean;
  scroller: HTMLElement | null;
}

const ref = useRef<TStore>
  {
    sections: [],
    blockScrollEvent: false,
    scroller: null
  };

const [hash, setHash] = useHash(ref);
```

| Key              |         Type         |                                                                                   Description |
| ---------------- | :------------------: | --------------------------------------------------------------------------------------------: |
| sections         |   `HTMLElement[]`    |   List of the registered sections elements that we watch, in our codebase it is AnchorSection |
| blockScrollEvent |      `boolean`       | Internal boolean to avoid handling native scroll event on hash change causing a second scroll |
| scroller         | `HTMLElement | null` |                                                                        Scroller element's ref |

The hash and its setter are then sent to the AnchorContext.

For further informations you can look into the sources for AnchorProvider.

#### useAnchorScrollListener

useAnchorScrollListener is another custom react hooks used internally in AnchorProvider. If you wish not to use AnchorProvider this hooks can help you customize your anchor handling.

It is called with the setter from `useHash`. The `ref` is the `TStore` also sent to `useHash`. These two hooks works best together.
Internally it listen to the onScroll event and update the hash if one registered sections has been detected above our scroll position.

```js
useAnchorScrollListener(ref, setHash);
```

### Custom Components Examples

TODO

### Embedded Demos

TODO

## Roadmap

- Finish completing the README
- Add an example project
- Add testing
