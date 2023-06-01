![Logo](https://koala-interactive.com/logo.e927957b.svg)

# react-anchor-navigation

(add badges exemples)

![npm type definitions](https://img.shields.io/npm/types/react-anchor-navigation)

[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

![lint](https://github.com/koala-interactive/react-anchor-navigation/workflows/lint/badge.svg?branch=master)

![e2e](https://github.com/koala-interactive/react-anchor-navigation/workflows/e2e/badge.svg?branch=master)

[see more badges](https://dev.to/envoy_/150-badges-for-github-pnk#group)

## Description

This library exports multiple helpers designed to make your anchor navigation works seamlessly. Check the [examples](./examples/custom-section.html)

## 📖 table of content

- [Installation](#🚀-installation)
- [How to use](#🖥️-how-to-use)
- [How to test](#⏳-how-to-test)
- [How to contribute](#🤝-how-to-contribute)
- [List of our other package](#📦-list-of-our-other-package)
- [Join us](#⛵-join-us)
- [License](#license)

## 🚀 Installation

This project uses react hooks and is therefore reliant on react version >=16.8.6

To install and use react-anchor-navigation, add it to your package.json and modules with the following command line :

```ts
npm install --save react-anchor-navigation
```

OR

```ts
yarn add react-anchor-navigation
```

## 🖥️ How to use

Four components :

- [AnchorContext](#AnchorContext)
- [AnchorLink](#AnchorLink)
- [AnchorProvider](#AnchorProvider)
- [AnchorSection](#AnchorSection)

```tsx
import {
  AnchorContext,
  AnchorLink,
  AnchorProvider,
  AnchorSection,
} from "react-anchor-navigation";
```

#### AnchorProvider

AnchorProvider is our top level contextProvider. Wrap it around your topmost component for your view :

```tsx
<AnchorProvider>
  <YourView />
</AnchorProvider>
```

| Key         |        Type         |                                                                                                      Description |
| ----------- | :-----------------: | ---------------------------------------------------------------------------------------------------------------: |
| offset      |      `number`       | The offset amount of pixels from the top, usefull when handling fixed header or sticky navigation (default: `0`) |
| getScroller | `() => HTMLElement` |                                                     Function to returns the scrollable element (default: `body`) |

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

()

## ⏳ How to test

react-anchor-navigation can be tested with the end-to-end testing library Cypress.

To run the tests, run `yarn cypress` and select the test specs to run in the Cypress window.

Learn more about writing your own Cypress tests with the [Cypress documentation](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Add-a-test-file).

## 🤝 How to contribute

- fork the project
- (write how to to launch it)
- create a branch from main/master like that

      $ contribution/fix/your-github-identity

  OR

      $ contribution/improvment/your-github-identity

- push several (if needed) clear commits
- add tests following the way of the other ones have been wrote
- make sure that all test runs
- push your code

## 📦 List of our other package

- [is-emoji-supported](https://www.npmjs.com/package/is-emoji-supported#fallback-to-images)
- [frenchkiss](https://www.npmjs.com/package/frenchkiss)
- [wowza-webrtc-player](https://www.npmjs.com/package/wowza-webrtc-player)
- [react-rich-mentions](https://www.npmjs.com/package/react-rich-mentions)
- [react-anchor-navigation](https://www.npmjs.com/package/react-anchor-navigation)

## ⛵ Join us

May you want to share more than a pull request
check our [jobs opportunity](https://www.linkedin.com/company/koala-interactive/jobs/)

## License

Copyright (c) 2023 [Koala-Interactive](https://koala-interactive.com/)

This project is [MIT](link-to-your-license-file) licensed.
