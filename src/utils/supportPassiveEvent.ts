// Passive event support
// https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
export const SUPPORT_PASSIVE_EVENT =
  typeof addEventListener !== 'undefined' &&
  (() => {
    let supportsPassiveOption = false;

    try {
      const noop = () => {};
      const opts = Object.defineProperty({}, "passive", {
        get: () => (supportsPassiveOption = true)
      });

      addEventListener("testPassive", noop, opts);
      removeEventListener("testPassive", noop, opts);
    } catch (e) {
      // error
    }

    return supportsPassiveOption;
  })();
