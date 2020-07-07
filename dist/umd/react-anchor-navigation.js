/**
 * @license react-anchor-navigation 0.2.4
 * MIT License
 * License: MIT
 */
var e,t;e=this,t=function(e,t){"use strict";var r="default"in t?t.default:t,n=()=>{},o=t.createContext({offset:0,sections:[],hash:"",registerSection:n,unregisterSection:n,setHash:n});function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var a="undefined"!=typeof addEventListener&&(()=>{var e=!1;try{var t=()=>{},r=Object.defineProperty({},"passive",{get:()=>e=!0});addEventListener("testPassive",t,r),removeEventListener("testPassive",t,r)}catch(e){}return e})(),i=(e,t)=>{var r=0,n=e;do{r+=n.offsetTop,n=n.offsetParent}while(n&&n!==t);return r},l=a&&{capture:!1,passive:!0};function u(e,r){t.useEffect(()=>{var t=t=>{var{blockScrollEvent:n,sections:o,scroller:s,offset:c}=e.current;if(!n&&o.length){var a=(s?s.scrollTop:window.pageYOffset||document.documentElement.scrollTop)+c;if(i(o[0],s)>a)t&&r("#",!1);else{var l=o.findIndex(e=>i(e,s)>a),u=-1===l?o[o.length-1]:o[Math.max(l-1,0)];u&&r("#".concat(u.id),!1)}}},n=function(e,t){var r=null;function n(){r||(r=setTimeout(()=>{r=null,e()},t))}return n.cancel=()=>{r&&(clearTimeout(r),r=null)},n}(t,100);return addEventListener("scroll",n,l),t(),()=>{removeEventListener("scroll",n,l),n.cancel()}},[])}e.AnchorContext=o,e.AnchorLink=function(e){var{children:n,className:a,activeClassName:i}=e,l=c(e,["children","className","activeClassName"]),{hash:u}=t.useContext(o),f=(a?"".concat(a," "):"")+(u===l.href?i:"");return r.createElement("a",s({},l,{className:f}),n)},e.AnchorProvider=function(e){var{children:n,getScroller:s,offset:c=0}=e,a=t.useRef({offset:c,sections:[],blockScrollEvent:!1,scroller:null});s&&(a.current.scroller=s());var[l,f]=function(e){var[r,n]=t.useState("");return t.useEffect(()=>{var t=t=>{n(location.hash),t&&"hashchange"===t.type&&(e.current.blockScrollEvent=!0,setTimeout(()=>{e.current.blockScrollEvent=!1},100))};return addEventListener("hashchange",t,!1),addEventListener("popstate",t,!1),t(),()=>{removeEventListener("hashchange",t,!1),removeEventListener("popstate",t,!1)}},[]),[r,function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];n(e),globalThis.history&&globalThis.location&&(!t&&"pushState"in history?history.pushState(null,e.substr(1),e):location.hash=e)}]}(a);return u(a,f),r.createElement(o.Provider,{value:{offset:c,hash:l,sections:a.current.sections,setHash:f,registerSection:e=>{var{sections:t,scroller:r}=a.current;if(!t.includes(e)){var n=i(e,r),o=t.findIndex(e=>i(e,r)>n);-1===o?t.push(e):t.splice(o,0,e)}},unregisterSection:e=>{var t=a.current.sections.indexOf(e);-1!==t&&a.current.sections.splice(t,1)}}},n)},e.AnchorSection=function(e){var{children:n}=e,a=c(e,["children"]),{registerSection:i,unregisterSection:l}=t.useContext(o),u=t.useRef(null);return t.useEffect(()=>(u.current&&(i(u.current),a.id===location.hash.substr(1)&&u.current.scrollIntoView()),()=>{u.current&&l(u.current)}),[]),r.createElement(r.Fragment,null,r.createElement("b",s({},a,{ref:u})),n)},Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("react")):"function"==typeof define&&define.amd?define(["exports","react"],t):t((e=e||self).ReactAnchorNavigation={},e.React);
