import{R as L,y as a,bS as Q,C as X,A as Y,bT as Z,h as w,bU as h,bV as E}from"./index-DgChYpsb.js";const j=L.createContext({latestIndex:0}),ee=j.Provider,te=l=>{let{className:i,index:n,children:e,split:s,style:u}=l;const{latestIndex:t}=a.useContext(j);return e==null?null:a.createElement(a.Fragment,null,a.createElement("div",{className:i,style:u},e),n<t&&s&&a.createElement("span",{className:`${i}-split`},s))};var se=function(l,i){var n={};for(var e in l)Object.prototype.hasOwnProperty.call(l,e)&&i.indexOf(e)<0&&(n[e]=l[e]);if(l!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,e=Object.getOwnPropertySymbols(l);s<e.length;s++)i.indexOf(e[s])<0&&Object.prototype.propertyIsEnumerable.call(l,e[s])&&(n[e[s]]=l[e[s]]);return n};const le=a.forwardRef((l,i)=>{var n,e,s;const{getPrefixCls:u,space:t,direction:V}=a.useContext(X),{size:c=(n=t==null?void 0:t.size)!==null&&n!==void 0?n:"small",align:S,className:I,rootClassName:_,children:A,direction:b="horizontal",prefixCls:k,split:G,style:R,wrap:H=!1,classNames:v,styles:f}=l,F=se(l,["size","align","className","rootClassName","children","direction","prefixCls","split","style","wrap","classNames","styles"]),[d,m]=Array.isArray(c)?c:[c,c],N=h(m),z=h(d),M=E(m),T=E(d),O=Y(A,{keepEmpty:!0}),$=S===void 0&&b==="horizontal"?"center":S,o=u("space",k),[U,W,q]=Z(o),B=w(o,t==null?void 0:t.className,W,`${o}-${b}`,{[`${o}-rtl`]:V==="rtl",[`${o}-align-${$}`]:$,[`${o}-gap-row-${m}`]:N,[`${o}-gap-col-${d}`]:z},I,_,q),P=w(`${o}-item`,(e=v==null?void 0:v.item)!==null&&e!==void 0?e:(s=t==null?void 0:t.classNames)===null||s===void 0?void 0:s.item);let y=0;const D=O.map((r,C)=>{var x,g;r!=null&&(y=C);const K=(r==null?void 0:r.key)||`${P}-${C}`;return a.createElement(te,{className:P,key:K,index:C,split:G,style:(x=f==null?void 0:f.item)!==null&&x!==void 0?x:(g=t==null?void 0:t.styles)===null||g===void 0?void 0:g.item},r)}),J=a.useMemo(()=>({latestIndex:y}),[y]);if(O.length===0)return null;const p={};return H&&(p.flexWrap="wrap"),!z&&T&&(p.columnGap=d),!N&&M&&(p.rowGap=m),U(a.createElement("div",Object.assign({ref:i,className:B,style:Object.assign(Object.assign(Object.assign({},p),t==null?void 0:t.style),R)},F),a.createElement(ee,{value:J},D)))}),ae=le;ae.Compact=Q;export{ae as S};