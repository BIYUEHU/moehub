import{ac as u}from"./index-DgChYpsb.js";const l=o=>({color:o.colorLink,textDecoration:"none",outline:"none",cursor:"pointer",transition:`color ${o.motionDurationSlow}`,"&:focus, &:hover":{color:o.colorLinkHover},"&:active":{color:o.colorLinkActive}});var e=function(r){if(u()&&window.document.documentElement){var t=Array.isArray(r)?r:[r],n=window.document.documentElement;return t.some(function(i){return i in n.style})}return!1},c=function(r,t){if(!e(r))return!1;var n=document.createElement("div"),i=n.style[r];return n.style[r]=t,n.style[r]!==i};function p(o,r){return!Array.isArray(o)&&r!==void 0?c(o,r):e(o)}export{p as i,l as o};
