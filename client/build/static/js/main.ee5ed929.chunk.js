(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{112:function(t,e){},133:function(t,e,n){"use strict";n.r(e),e.default=n.p+"static/media/san-francisco.b7cad415.jpg"},134:function(t,e,n){"use strict";n.r(e),e.default=n.p+"static/media/cblock.02eb09a2.jpg"},135:function(t,e,n){"use strict";n.r(e),e.default=n.p+"static/media/video-file.1f058b06.mp4"},136:function(t,e,n){"use strict";n.r(e);var i=n(6),r=n(4),a=n.n(r),c=n(65),o=n.n(c),s=(n(82),n(31)),u=n(21),l=n(66),d=n.n(l),f=n(8),p=n(9);function b(){var t=Object(f.a)(["\n\tmax-width: 100px;\n\tobject-fit: contain;\n"]);return b=function(){return t},t}function v(){var t=Object(f.a)(["\n\tdisplay: flex;\n\tjustify-content: space-between;\n\tpadding: 20px 0;\n\twidth: 230px;\n"]);return v=function(){return t},t}function m(){var t=Object(f.a)(["\n\tdisplay: flex;\n\tjustify-content: center;\n\twidth: 100%;\n"]);return m=function(){return t},t}function h(){var t=Object(f.a)(["\n\tmargin: 0 auto;\n\tmax-width: 1000px;\n"]);return h=function(){return t},t}function j(){var t=Object(f.a)(["\n\tmin-height: 100vh;\n\tposition: relative;\n\twidth: 100%;\n"]);return j=function(){return t},t}var g=p.b.div(j()),O=p.b.div(h()),x=p.b.header(m()),y=p.b.div(v()),w=(p.b.img(b()),function(t){var e=t.children;return Object(i.jsx)(g,{children:Object(i.jsxs)(O,{children:[Object(i.jsx)(x,{children:Object(i.jsx)(y,{})}),e]})})}),A=n(76);function k(){var t=Object(f.a)(["\n\tbottom: 0;\n\tbackground-color: black;\n\tleft: 0;\n\tposition: absolute;\n\tright: 0;\n\ttop: 0;\n\twidth: 100%;\n\timg.asset {\n\t\theight: 100%;\n\t\tobject-fit: contain;\n\t\twidth: 100%;\n\t}\n"]);return k=function(){return t},t}var C=p.b.div(k()),E=function(t){var e="pannellum"===t.assetType?"360":t.assetType,n=t.activeAsset.type===t.assetType||"360"===e;return Object(i.jsx)(C,{id:e,style:{display:n?"block":"none"},children:t.children})};function M(){var t=Object(f.a)(["\n\tbackground-color: ",";\n\tborder-radius: 9999px;\n\theight: 5px;\n\twidth: 5px;\n"]);return M=function(){return t},t}function F(){var t=Object(f.a)(["\n\tdisplay: flex;\n\tleft: 50%;\n\tposition: absolute;\n\ttop: 120%;\n\ttransform: translateX(-50%);\n"]);return F=function(){return t},t}function I(){var t=Object(f.a)(["\n\tbackground-color: ",";\n\tborder: 2px solid #007bff;\n\tborder-radius: 100px;\n\t","\n\tcolor: ",";\n\tcursor: ",";\n\tfont-weight: 900;\n\tpadding: 8px 20px;\n\tposition: relative;\n\ttext-transform: uppercase;\n\ttransition: all .2s;\n\t","\n"]);return I=function(){return t},t}var S=p.b.button(I(),(function(t){return t.isActive?"#007bff":"transparent"}),(function(t){return t.isActive&&"\n\t\tbox-shadow: 0 0 0 0.2rem rgba(38,143,255,.5);\n\t"}),(function(t){return t.isActive?"#e4e4e4":"#007bff"}),(function(t){return t.isActive?"default":"pointer"}),(function(t){return!t.isActive&&"\n\t\t&:hover {\n\t\t\tbackground-color: #007bff30;\n\t\t\t// color: #e4e4e4;\n\t\t}\n\t"})),P=p.b.div(F()),R=p.b.div(M(),(function(t){return t.bgColor})),B=function(t){return Object(i.jsxs)(S,{isActive:t.isActive,onClick:function(e){t.onClick(t.asset)},children:[t.asset.label,Object(i.jsx)(P,{children:Object.values(t.asset.activeClients).map((function(t,e){return Object(i.jsx)(R,{bgColor:t.color[0]},e)}))})]})};function T(){var t=Object(f.a)(["\n\tbackground-color: #e4e4e4;\n\tdisplay: flex;\n\tjustify-content: flex-start;\n\tpadding: 10px 8px 16px;\n\toverflow: hidden;\n\twidth: 100%;\n\tbutton {\n\t\tmargin: 0 5px;\n\t}\n"]);return T=function(){return t},t}function L(){var t=Object(f.a)(["\n\tbackground-color: red;\n\tborder: 8px solid #e4e4e4;\n\theight: 0;\n\tpadding-bottom: 56.25%;\n\tposition: relative;\n\twidth: 100%;\n"]);return L=function(){return t},t}function N(){var t=Object(f.a)([""]);return N=function(){return t},t}var W={autoLoad:!0,hotSpotDebug:!0,default:{firstScene:"gallery",sceneFadeDuration:500},scenes:{gallery:{type:"equirectangular",panorama:n(63).default,hotSpots:[]},office:{type:"equirectangular",panorama:n(64).default,hotSpots:[]}}},q=p.b.div(N()),D=p.b.div(L()),H=p.b.div(T());var X=function(t){var e=this,n=t.assets,a=t.activeAsset,c=t.changeActiveAsset,o=Object(r.useRef)(),s=Object(r.useRef)();return Object(r.useEffect)((function(){var t=document.createElement("script");return t.src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js",t.async=!0,t.onload=function(){window.pn&&window.pn.destroy(),window.pn=window.pannellum.viewer("360",W)},document.body.appendChild(t),s.current=Object(A.a)(o.current,{autoplay:!0},(function(){console.log("onPlayerReady",e)})),function(){s.current&&s.current.dispose()}}),[]),Object(r.useEffect)((function(){if("pannellum"===a.type)window.pn&&window.pn.getScene()!==a.name&&window.pn.loadScene(a.name);else if("img"===a.type){var t=document.querySelector("#img img");t.getAttribute("src")!==a.path&&t.setAttribute("src",a.path)}else"video"===a.type&&s.current.src(a.path)}),[a]),Object(i.jsxs)(q,{children:[Object(i.jsx)(D,{id:"AssetWindow",children:["pannellum","img","video"].map((function(t,e){return Object(i.jsxs)(E,{assetType:t,activeAsset:a,children:["img"===t&&Object(i.jsx)("img",{className:"asset",src:"",alt:""}),"video"===t&&Object(i.jsx)("div",{"data-vjs-player":!0,children:Object(i.jsx)("video",{style:{width:"100%",height:"100%"},ref:o,className:"video-js"})})]},e)}))}),Object(i.jsx)(H,{children:n.map((function(t,e){return Object(i.jsx)(B,{asset:t,isActive:a.name===t.name,onClick:c},e)}))})]})};function J(){return(J=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t}).apply(this,arguments)}function z(t,e){if(null==t)return{};var n,i,r=function(t,e){if(null==t)return{};var n,i,r={},a=Object.keys(t);for(i=0;i<a.length;i++)n=a[i],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(i=0;i<a.length;i++)n=a[i],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var V=r.createElement("polygon",{fill:"#FFFFFF",points:"8.2,20.9 8.2,4.9 19.8,16.5 13,16.5 12.6,16.6 "}),Y=r.createElement("polygon",{fill:"#FFFFFF",points:"17.3,21.6 13.7,23.1 9,12 12.7,10.5 "}),_=r.createElement("rect",{x:12.5,y:13.6,transform:"matrix(0.9221 -0.3871 0.3871 0.9221 -5.7605 6.5909)",width:2,height:8}),G=r.createElement("polygon",{points:"9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5 "});function K(t,e){var n=t.title,i=t.titleId,a=z(t,["title","titleId"]);return r.createElement("svg",J({id:"Layer_1",preserveAspectRatio:"none",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",enableBackground:"new 0 0 28 28",xmlSpace:"preserve",viewBox:"8.20 4.90 11.60 18.20",width:100,ref:e,"aria-labelledby":i},a),n?r.createElement("title",{id:i},n):null,V,Y,_,G)}var Q=r.forwardRef(K);n.p;function U(){var t=Object(f.a)(["\n\tsvg {\n\t\twidth: 15px;\n\t}\n\tspan {\n\t\tbackground-color: ",";\n\t\tborder: 1px solid ",";\n\t\tborder-radius: 8px;\n\t\tcolor: ",";\n\t\tfont-size: 10px;\n\t\tleft: 135%;\n\t\tpadding: 0 5px;\n\t\tposition: absolute;\n\t\ttop: 15px;\n\t}\n"]);return U=function(){return t},t}var Z=p.b.div(U(),(function(t){return t.color[0]}),(function(t){return t.color[1]}),(function(t){return t.color[1]})),$=function(t){var e=t.id,n=(t.name,t.color);return console.log("re-rendered cursor: ",e),Object(i.jsxs)(Z,{id:e,className:"cursor",color:n,children:[Object(i.jsx)(Q,{}),Object(i.jsx)("span",{children:e})]})};function tt(t,e){return t.id===e.id&&t.name===e.name}var et=a.a.memo($,tt);function nt(){var t=Object(f.a)(["\n\t","\n"]);return nt=function(){return t},t}function it(){var t=Object(f.a)(["",""]);return it=function(){return t},t}var rt=p.b.div(nt(),(function(t){return function(t){for(var e="",n=Object.values(t.clients),i=0;i<n.length;i++)e+="\n\t\t\t#".concat(n[i].id," {\n\t\t\t\ttransform: translate(").concat(n[i].x,"px, ").concat(n[i].y,"px);\n\t\t\t\tdisplay: ").concat(n[i].display,";\n\t\t\t}\n\t\t");return Object(p.a)(it(),e)}(t)})),at=function(t){return Object(i.jsx)(rt,{id:"cursors",clients:t.clients,children:Object.values(t.clients).map((function(t,e){return Object(i.jsx)(et,{id:t.id,name:t.name,color:t.color},t.id)}))})};function ct(t,e){var n,i,r="block";if("pannellum"===e.type){var a=function(t,e){var n=Object(u.a)(t,2),i=n[0],r=n[1],a=e.getConfig(),c=Math.sin(i*Math.PI/180),o=Math.cos(i*Math.PI/180),s=Math.sin(a.pitch*Math.PI/180),l=Math.cos(a.pitch*Math.PI/180),d=Math.cos((-r+a.yaw)*Math.PI/180),f=c*s+o*d*l;if(r<=90&&r>-90&&f<=0||(r>90||r<=-90)&&f<=0)return[0,0];var p=Math.sin((-r+a.yaw)*Math.PI/180),b=Math.tan(a.hfov*Math.PI/360),v=e.getRenderer().getCanvas(),m=v.clientWidth,h=v.clientHeight,j=[-m/b*p*o/f/2,-m/b*(c*l-o*d*s)/f/2],g=Math.sin(a.roll*Math.PI/180),O=Math.cos(a.roll*Math.PI/180);return(j=[j[0]*O-j[1]*g,j[0]*g+j[1]*O])[0]+=m/2+v.getBoundingClientRect().x,j[1]+=h/2+v.getBoundingClientRect().y,j}(t,window.pn);n=a[0],i=a[1];var c=window.pn.getRenderer().getCanvas().getBoundingClientRect(),o=c.left,s=c.right,l=c.top,d=c.bottom;(n<o||n>s||i<l||i>d)&&(r="none")}else{var f=document.getElementById("AssetWindow");n=f.offsetWidth*t[0]+f.offsetLeft,i=f.offsetHeight*t[1]+f.offsetTop}return[n,i,r]}var ot=d()("http://localhost:4001/",{query:"name=Mary"});var st=function(){var t=Object(r.useState)({}),e=Object(u.a)(t,2),n=e[0],a=e[1],c=Object(r.useState)(ut[2]),o=Object(u.a)(c,2),l=o[0],d=o[1],f=Object(r.useState)(ut),p=Object(u.a)(f,2),b=p[0],v=p[1],m=Object(r.useRef)(l);return Object(r.useEffect)((function(){return ot.on("create",(function(t){a((function(e){var n=Object(s.a)({},e);return n[t.id]=t,n}))})),ot.on("delete",(function(t){a((function(e){var n=Object(s.a)({},e);return delete n[t.id],n}))})),ot.on("update",(function(t){var e="block"===t.display&&t.activeAsset.name===m.current.name?"block":"none";a((function(n){var i=Object(s.a)({},n);if("block"===e){var r=ct(t.position,t.activeAsset);i[t.id].x=r[0],i[t.id].y=r[1],e=r[2]}return i[t.id].display=e,i[t.id].activeAsset=t.activeAsset.name,i}))})),ot.on("changeAsset",(function(t){v((function(e){var n=e;return n.forEach((function(e){var n=t.id in e.activeClients;e.name===t.newAssetName&&(n||(e.activeClients[t.id]={color:t.client.color,name:t.client.name})),e.name===t.prevAssetName&&n&&delete e.activeClients[t.id]})),n}))})),ot.on("updateClients",(function(t){var e={};Object.values(t.clients).forEach((function(t){if(t.id!==ot.id){var n="block"===t.display&&t.activeAsset.name===m.current.name?"block":"none";if("block"===n){var i=ct(t.position,t.activeAsset);t.x=i[0],t.y=i[1],n=i[2]}t.display=n,t.activeAsset=t.activeAsset.name,e[t.id]=t}})),a(e)})),function(){ot.disconnect()}}),[]),Object(r.useEffect)((function(){var t,e,n,i,r,a,c,o;function s(i){e=i.pageX,n=i.pageY,t=i}document.addEventListener("mousemove",s);var u=window.setInterval((function(){if(c!==e||o!==n){var s=document.getElementById("AssetWindow"),u=s.contains(t.target)?"block":"none";"pannellum"===l.type?a=window.pn.mouseEventToCoords(t):(i=(e-s.offsetLeft)/s.offsetWidth,r=(n-s.offsetTop)/s.offsetHeight,a=[i,r]),ot.emit("update",{id:ot.id,display:u,activeAsset:l,position:a}),c=e,o=n}}),100);return function(){document.removeEventListener("mousemove",s),window.clearInterval(u)}}),[l]),Object(i.jsxs)(w,{children:[Object(i.jsx)(X,{assets:b,activeAsset:l,changeActiveAsset:function(t){t.name!==l.name&&(d(t),m.current=t,ot.emit("changeAsset",{id:ot.id,newAssetName:t.name,prevAssetName:l.name}))}}),Object(i.jsx)(at,{clients:n})]})},ut=[{path:n(133).default,name:"gallery",label:"San Francisco",type:"pannellum",activeClients:{}},{path:n(63).default,name:"office",label:"Office",type:"pannellum",activeClients:{}},{path:n(64).default,name:"avatar",label:"Avatar",type:"img",activeClients:{}},{path:n(134).default,name:"cblock",label:"C-Block",type:"img",activeClients:{}},{path:n(135).default,name:"cartoon",label:"Video",type:"video",activeClients:{}}],lt=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,137)).then((function(e){var n=e.getCLS,i=e.getFID,r=e.getFCP,a=e.getLCP,c=e.getTTFB;n(t),i(t),r(t),a(t),c(t)}))};o.a.render(Object(i.jsx)(a.a.StrictMode,{children:Object(i.jsx)(st,{})}),document.getElementById("root")),lt()},63:function(t,e,n){"use strict";n.r(e),e.default=n.p+"static/media/360img.27ef5092.jpg"},64:function(t,e,n){"use strict";n.r(e),e.default=n.p+"static/media/avatar.32e70a97.png"},82:function(t,e,n){}},[[136,1,2]]]);
//# sourceMappingURL=main.ee5ed929.chunk.js.map