import{ax as c,aw as m,j as s,t as r,F as w,aI as o,aN as p,aA as l}from"./index-DgChYpsb.js";import{C as u}from"./index-DFkruNbw.js";import{F as e}from"./index-Bi6eMDVY.js";import{I as t}from"./index-CMLhrbuK.js";import{S as h}from"./index-DlSRDo1c.js";import{B as x}from"./button-CElchV4s.js";import"./collapse-BbEVqHco.js";import"./row-wWk8FtEW.js";import"./useLocale-BHh5rfC7.js";import"./TextArea-CZwWy1NO.js";import"./EyeOutlined-Cm8LOwQp.js";const q=()=>{const i=c(),d=m();async function n(a){if(a.newPassword!==a.confirmPassword){o.warning({message:r`view.password.passwordMismatch`});return}try{await p(a.newPassword,a.oldPassword),o.success({message:r`view.password.updateSuccess`}),i(l()),setTimeout(()=>{d(0)},500)}catch{o.error({message:r`view.password.updateFailure`})}}return s.jsxs("div",{children:[s.jsx("h1",{children:r`view.password.changePassword`}),s.jsx(w,{justify:"center",align:"center",vertical:!0,children:s.jsx(u,{hoverable:!0,className:"card cardFixed cardSquare",children:s.jsxs(e,{name:"control-hooks",className:"cardForm cleanAll",onFinish:n,children:[s.jsx(e.Item,{name:"oldPassword",label:r`view.password.oldPassword`,rules:[{required:!0}],children:s.jsx(t,{type:"password"})}),s.jsx(e.Item,{name:"newPassword",label:r`view.password.newPassword`,rules:[{required:!0}],children:s.jsx(t,{type:"password"})}),s.jsx(e.Item,{name:"confirmPassword",label:r`view.password.confirmPassword`,rules:[{required:!0}],children:s.jsx(t,{type:"password"})}),s.jsx("br",{}),s.jsx(e.Item,{children:s.jsx(h,{children:s.jsx(x,{type:"primary",htmlType:"submit",className:"cardButton",children:r`view.password.updatePassword`})})})]})})})]})};export{q as default};
