!function(t){function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}var e={};n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(n){return t[n]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="/",n(n.s="mdyV")}({"6Fq7":function(t,n,e){"use strict";(function(t){function o(n){var e=n.name,o=n.exerciseStat,a=Object(r.b)(c[0]),s=a[0],f=a[1];Object(r.a)((function(){var t=[{x:o.map((function(t){return t.date})),y:o.map((function(t){var n=t[s];return i.has(s)&&"lbs"===t.weightUnit?(n/2.20462).toFixed(2):n.toFixed(2)})),type:"bar",marker:{color:"crimson"},text:o.map((function(t){return _.has(s)?t.eachRepDuration:t.eachRep}))}];Plotly.newPlot(e,t,{title:e,xaxis:{title:"Date"},yaxis:{title:u[s]},height:700,width:900},{responsive:!0})}),[e,o,s]);return t("div",null,t("select",{value:s,onChange:function(t){f(t.target.value)}},c.map((function(n){return t("option",{value:n,key:n},l[n])}))),t("div",{id:e}))}e.d(n,"a",(function(){return o}));var r=e("QRet"),i=new Set(["totalWeight","minWeight","maxWeight"]),_=new Set(["totalSeconds"]),u={totalReps:"Total Reps",totalWeight:"Total Weight - kg",minWeight:"Min Weight - kg",maxWeight:"Max Weight - kg",totalSeconds:"Total Duration - s"},l={totalReps:"Total Reps",totalWeight:"Total Weight",minWeight:"Min Weight",maxWeight:"Max Weight",totalSeconds:"Total Duration"},c=["totalReps","totalWeight","minWeight","maxWeight","totalSeconds"]}).call(this,e("hosL").h)},HQGO:function(t,n,e){"use strict";(function(t){function o(){return t("p",{className:"loader"},"Loading...")}e.d(n,"a",(function(){return o}))}).call(this,e("hosL").h)},MV5A:function(){},QRet:function(t,n,e){"use strict";function o(t,n){d.options.__h&&d.options.__h(f,t,h||n),h=0;var e=f.__H||(f.__H={__:[],__h:[]});return t>=e.__.length&&e.__.push({}),e.__[t]}function r(t){return h=1,function(t,n,e){var r=o(s++,2);return r.t=t,r.__c||(r.__=[e?e(n):a(void 0,n),function(t){var n=r.t(r.__[0],t);r.__[0]!==n&&(r.__=[n,r.__[1]],r.__c.setState({}))}],r.__c=f),r.__}(a,t)}function i(t,n){var e=o(s++,3);!d.options.__s&&c(e.__H,n)&&(e.__=t,e.__H=n,f.__H.__h.push(e))}function _(){v.forEach((function(t){if(t.__P)try{t.__H.__h.forEach(u),t.__H.__h.forEach(l),t.__H.__h=[]}catch(n){t.__H.__h=[],d.options.__e(n,t.__v)}})),v=[]}function u(t){var n=f;"function"==typeof t.__c&&t.__c(),f=n}function l(t){var n=f;t.__c=t.__(),f=n}function c(t,n){return!t||t.length!==n.length||n.some((function(n,e){return n!==t[e]}))}function a(t,n){return"function"==typeof n?n(t):n}e.d(n,"b",(function(){return r})),e.d(n,"a",(function(){return i}));var s,f,p,d=e("hosL"),h=0,v=[],m=d.options.__b,y=d.options.__r,g=d.options.diffed,b=d.options.__c,k=d.options.unmount;d.options.__b=function(t){f=null,m&&m(t)},d.options.__r=function(t){y&&y(t),s=0;var n=(f=t.__c).__H;n&&(n.__h.forEach(u),n.__h.forEach(l),n.__h=[])},d.options.diffed=function(t){g&&g(t);var n=t.__c;n&&n.__H&&n.__H.__h.length&&(1!==v.push(n)&&p===d.options.requestAnimationFrame||((p=d.options.requestAnimationFrame)||function(t){var n,e=function(){clearTimeout(o),S&&cancelAnimationFrame(n),setTimeout(t)},o=setTimeout(e,100);S&&(n=requestAnimationFrame(e))})(_)),f=void 0},d.options.__c=function(t,n){n.some((function(t){try{t.__h.forEach(u),t.__h=t.__h.filter((function(t){return!t.__||l(t)}))}catch(e){n.some((function(t){t.__h&&(t.__h=[])})),n=[],d.options.__e(e,t.__v)}})),b&&b(t,n)},d.options.unmount=function(t){k&&k(t);var n=t.__c;if(n&&n.__H)try{n.__H.__.forEach(u)}catch(t){d.options.__e(t,n.__v)}};var S="function"==typeof requestAnimationFrame},QfWi:function(t,n,e){"use strict";e.r(n),function(t){function o(){return t("div",{className:"content"},t("h1",{className:"title",id:"title"},"Strong Dashboard"),t(r.a,null))}e.d(n,"default",(function(){return o}));var r=e("Vj9D");e("MV5A")}.call(this,e("hosL").h)},Vj9D:function(t,n,e){"use strict";(function(t,o){function r(){var n=Object(_.b)(!0),e=n[0],r=n[1],a=Object(_.b)(null),s=a[0],f=a[1],p=Object(_.b)(null),d=p[0],h=p[1],v=Object(u.createRef)();Object(_.a)((function(){var t=Object(i.a)();t&&h(t),r(!1)}),[]);var m=function(){Object(i.b)(),f(null),h(null)};return e?t(c.a,null):s?t(o,null,t("button",{className:"control-btn",onClick:m},"Upload a new file"),t("div",{className:"border-bottom"}),t("p",null,s)):d?t("div",null,t("button",{className:"control-btn",onClick:m},"Upload a new file"),t("div",{className:"border-bottom"}),t(l.a,{data:d})):t("form",{className:"upload-form border-bottom",onSubmit:function(t){return new Promise((function(n,e){var o,_,u,l=function(t){return function(n){try{return r(!1),t&&t.call(this,n)}catch(t){return e(t)}}.bind(this)}.bind(this);if(t.preventDefault(),!(u=null==(o=v.current)||null==(_=o.files)?void 0:_[0]))return n();var c=function(){try{return n()}catch(t){return e(t)}},a=function(t){try{return console.log(t),f((null==t?void 0:t.message)||"Something went wrong"),l(c)()}catch(t){return l(e)(t)}};try{return r(!0),Promise.resolve(Object(i.c)(u)).then((function(t){try{return h(t),l(c)()}catch(t){return a(t)}}),a)}catch(t){a(t)}}))},enctype:"multipart/form-data"},t("label",null,t("p",null,"Welcome to Strong Dashboard. Upload your csv file exported from the Strong app to visualize your data and get a sense of your progress."),t("input",{className:"control-btn",type:"file",accept:".csv",name:"myFile",ref:v}),t("input",{className:"control-btn",style:{marginLeft:8},type:"submit",value:"Upload File"})))}e.d(n,"a",(function(){return r}));var i=e("Vnwg"),_=e("QRet"),u=e("hosL"),l=e("m1/V"),c=e("HQGO")}).call(this,e("hosL").h,e("hosL").Fragment)},Vnwg:function(t,n,e){"use strict";function o(){window.localStorage.removeItem("StrongData")}function r(){var t=window.localStorage.getItem("StrongData");return t?JSON.parse(t):null}function i(t){return new Promise((function(n,e){var o,r,i;return(o=new FormData).append("myFile",t,(null==t?void 0:t.name)||"strong.csv"),Promise.resolve(fetch("api/v1/upload",{method:"POST",body:o})).then(function(t){try{return 200===(r=t).status?Promise.resolve(r.json()).then((function(t){try{return(o=i=t)&&0===Object.keys(o).length&&o.constructor===Object?e(new Error("No data returned. Please check your file.")):(window.localStorage.setItem("StrongData",JSON.stringify(i)),n(i))}catch(t){return e(t)}var o}),e):e(new Error("Failed to get data"))}catch(t){return e(t)}}.bind(this),e)}))}e.d(n,"b",(function(){return o})),e.d(n,"a",(function(){return r})),e.d(n,"c",(function(){return i}))},hosL:function(t,n,e){"use strict";function o(t,n){for(var e in n)t[e]=n[e];return t}function r(t){var n=t.parentNode;n&&n.removeChild(t)}function i(t,n,e){var o,r,i,u=arguments,l={};for(i in n)"key"==i?o=n[i]:"ref"==i?r=n[i]:l[i]=n[i];if(arguments.length>3)for(e=[e],i=3;i<arguments.length;i++)e.push(u[i]);if(null!=e&&(l.children=e),"function"==typeof t&&null!=t.defaultProps)for(i in t.defaultProps)void 0===l[i]&&(l[i]=t.defaultProps[i]);return _(t,l,o,r,null)}function _(t,n,e,o,r){var i={type:t,props:n,key:e,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==r?++E.__v:r};return null!=E.vnode&&E.vnode(i),i}function u(){return{current:null}}function l(t){return t.children}function c(t,n){this.props=t,this.context=n}function a(t,n){if(null==n)return t.__?a(t.__,t.__.__k.indexOf(t)+1):null;for(var e;n<t.__k.length;n++)if(null!=(e=t.__k[n])&&null!=e.__e)return e.__e;return"function"==typeof t.type?a(t):null}function s(t){var n,e;if(null!=(t=t.__)&&null!=t.__c){for(t.__e=t.__c.base=null,n=0;n<t.__k.length;n++)if(null!=(e=t.__k[n])&&null!=e.__e){t.__e=t.__c.base=e.__e;break}return s(t)}}function f(t){(!t.__d&&(t.__d=!0)&&L.push(t)&&!p.__r++||H!==E.debounceRendering)&&((H=E.debounceRendering)||A)(p)}function p(){for(var t;p.__r=L.length;)t=L.sort((function(t,n){return t.__v.__b-n.__v.__b})),L=[],t.some((function(t){var n,e,r,i,_,u;t.__d&&(_=(i=(n=t).__v).__e,(u=n.__P)&&(e=[],(r=o({},i)).__v=i.__v+1,S(u,i,r,n.__n,void 0!==u.ownerSVGElement,null!=i.__h?[_]:null,e,null==_?a(i):_,i.__h),x(e,i),i.__e!=_&&s(i)))}))}function d(t,n,e,o,r,i,u,c,s,f){var p,d,v,y,g,b,k,x=o&&o.__k||M,w=x.length;for(e.__k=[],p=0;p<n.length;p++)if(null!=(y=e.__k[p]=null==(y=n[p])||"boolean"==typeof y?null:"string"==typeof y||"number"==typeof y||"bigint"==typeof y?_(null,y,null,null,y):Array.isArray(y)?_(l,{children:y},null,null,null):y.__b>0?_(y.type,y.props,y.key,null,y.__v):y)){if(y.__=e,y.__b=e.__b+1,null===(v=x[p])||v&&y.key==v.key&&y.type===v.type)x[p]=void 0;else for(d=0;d<w;d++){if((v=x[d])&&y.key==v.key&&y.type===v.type){x[d]=void 0;break}v=null}S(t,y,v=v||R,r,i,u,c,s,f),g=y.__e,(d=y.ref)&&v.ref!=d&&(k||(k=[]),v.ref&&k.push(v.ref,null,y),k.push(d,y.__c||g,y)),null!=g?(null==b&&(b=g),"function"==typeof y.type&&null!=y.__k&&y.__k===v.__k?y.__d=s=h(y,s,t):s=m(t,y,v,x,g,s),f||"option"!==e.type?"function"==typeof e.type&&(e.__d=s):t.value=""):s&&v.__e==s&&s.parentNode!=t&&(s=a(v))}for(e.__e=b,p=w;p--;)null!=x[p]&&("function"==typeof e.type&&null!=x[p].__e&&x[p].__e==e.__d&&(e.__d=a(o,p+1)),P(x[p],x[p]));if(k)for(p=0;p<k.length;p++)C(k[p],k[++p],k[++p])}function h(t,n,e){var o,r;for(o=0;o<t.__k.length;o++)(r=t.__k[o])&&(r.__=t,n="function"==typeof r.type?h(r,n,e):m(e,r,r,t.__k,r.__e,n));return n}function v(t,n){return n=n||[],null==t||"boolean"==typeof t||(Array.isArray(t)?t.some((function(t){v(t,n)})):n.push(t)),n}function m(t,n,e,o,r,i){var _,u,l;if(void 0!==n.__d)_=n.__d,n.__d=void 0;else if(null==e||r!=i||null==r.parentNode)t:if(null==i||i.parentNode!==t)t.appendChild(r),_=null;else{for(u=i,l=0;(u=u.nextSibling)&&l<o.length;l+=2)if(u==r)break t;t.insertBefore(r,i),_=i}return void 0!==_?_:r.nextSibling}function y(t,n,e){"-"===n[0]?t.setProperty(n,e):t[n]=null==e?"":"number"!=typeof e||U.test(n)?e:e+"px"}function g(t,n,e,o,r){var i;t:if("style"===n)if("string"==typeof e)t.style.cssText=e;else{if("string"==typeof o&&(t.style.cssText=o=""),o)for(n in o)e&&n in e||y(t.style,n,"");if(e)for(n in e)o&&e[n]===o[n]||y(t.style,n,e[n])}else if("o"===n[0]&&"n"===n[1])i=n!==(n=n.replace(/Capture$/,"")),n=n.toLowerCase()in t?n.toLowerCase().slice(2):n.slice(2),t.l||(t.l={}),t.l[n+i]=e,e?o||t.addEventListener(n,i?k:b,i):t.removeEventListener(n,i?k:b,i);else if("dangerouslySetInnerHTML"!==n){if(r)n=n.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==n&&"list"!==n&&"form"!==n&&"tabIndex"!==n&&"download"!==n&&n in t)try{t[n]=null==e?"":e;break t}catch(t){}"function"==typeof e||(null!=e&&(!1!==e||"a"===n[0]&&"r"===n[1])?t.setAttribute(n,e):t.removeAttribute(n))}}function b(t){this.l[t.type+!1](E.event?E.event(t):t)}function k(t){this.l[t.type+!0](E.event?E.event(t):t)}function S(t,n,e,r,i,_,u,a,s){var f,p,h,v,m,y,g,b,k,S,x,C=n.type;if(void 0!==n.constructor)return null;null!=e.__h&&(s=e.__h,a=n.__e=e.__e,n.__h=null,_=[a]),(f=E.__b)&&f(n);try{t:if("function"==typeof C){if(b=n.props,k=(f=C.contextType)&&r[f.__c],S=f?k?k.props.value:f.__:r,e.__c?g=(p=n.__c=e.__c).__=p.__E:("prototype"in C&&C.prototype.render?n.__c=p=new C(b,S):(n.__c=p=new c(b,S),p.constructor=C,p.render=W),k&&k.sub(p),p.props=b,p.state||(p.state={}),p.context=S,p.__n=r,h=p.__d=!0,p.__h=[]),null==p.__s&&(p.__s=p.state),null!=C.getDerivedStateFromProps&&(p.__s==p.state&&(p.__s=o({},p.__s)),o(p.__s,C.getDerivedStateFromProps(b,p.__s))),v=p.props,m=p.state,h)null==C.getDerivedStateFromProps&&null!=p.componentWillMount&&p.componentWillMount(),null!=p.componentDidMount&&p.__h.push(p.componentDidMount);else{if(null==C.getDerivedStateFromProps&&b!==v&&null!=p.componentWillReceiveProps&&p.componentWillReceiveProps(b,S),!p.__e&&null!=p.shouldComponentUpdate&&!1===p.shouldComponentUpdate(b,p.__s,S)||n.__v===e.__v){p.props=b,p.state=p.__s,n.__v!==e.__v&&(p.__d=!1),p.__v=n,n.__e=e.__e,n.__k=e.__k,n.__k.forEach((function(t){t&&(t.__=n)})),p.__h.length&&u.push(p);break t}null!=p.componentWillUpdate&&p.componentWillUpdate(b,p.__s,S),null!=p.componentDidUpdate&&p.__h.push((function(){p.componentDidUpdate(v,m,y)}))}p.context=S,p.props=b,p.state=p.__s,(f=E.__r)&&f(n),p.__d=!1,p.__v=n,p.__P=t,f=p.render(p.props,p.state,p.context),p.state=p.__s,null!=p.getChildContext&&(r=o(o({},r),p.getChildContext())),h||null==p.getSnapshotBeforeUpdate||(y=p.getSnapshotBeforeUpdate(v,m)),x=null!=f&&f.type===l&&null==f.key?f.props.children:f,d(t,Array.isArray(x)?x:[x],n,e,r,i,_,u,a,s),p.base=n.__e,n.__h=null,p.__h.length&&u.push(p),g&&(p.__E=p.__=null),p.__e=!1}else null==_&&n.__v===e.__v?(n.__k=e.__k,n.__e=e.__e):n.__e=w(e.__e,n,e,r,i,_,u,s);(f=E.diffed)&&f(n)}catch(t){n.__v=null,(s||null!=_)&&(n.__e=a,n.__h=!!s,_[_.indexOf(a)]=null),E.__e(t,n,e)}}function x(t,n){E.__c&&E.__c(n,t),t.some((function(n){try{t=n.__h,n.__h=[],t.some((function(t){t.call(n)}))}catch(t){E.__e(t,n.__v)}}))}function w(t,n,e,o,i,_,u,l){var c,a,s,f,p=e.props,h=n.props,v=n.type,m=0;if("svg"===v&&(i=!0),null!=_)for(;m<_.length;m++)if((c=_[m])&&(c===t||(v?c.localName==v:3==c.nodeType))){t=c,_[m]=null;break}if(null==t){if(null===v)return document.createTextNode(h);t=i?document.createElementNS("http://www.w3.org/2000/svg",v):document.createElement(v,h.is&&h),_=null,l=!1}if(null===v)p===h||l&&t.data===h||(t.data=h);else{if(_=_&&M.slice.call(t.childNodes),a=(p=e.props||R).dangerouslySetInnerHTML,s=h.dangerouslySetInnerHTML,!l){if(null!=_)for(p={},f=0;f<t.attributes.length;f++)p[t.attributes[f].name]=t.attributes[f].value;(s||a)&&(s&&(a&&s.__html==a.__html||s.__html===t.innerHTML)||(t.innerHTML=s&&s.__html||""))}if(function(t,n,e,o,r){var i;for(i in e)"children"===i||"key"===i||i in n||g(t,i,null,e[i],o);for(i in n)r&&"function"!=typeof n[i]||"children"===i||"key"===i||"value"===i||"checked"===i||e[i]===n[i]||g(t,i,n[i],e[i],o)}(t,h,p,i,l),s)n.__k=[];else if(m=n.props.children,d(t,Array.isArray(m)?m:[m],n,e,o,i&&"foreignObject"!==v,_,u,t.firstChild,l),null!=_)for(m=_.length;m--;)null!=_[m]&&r(_[m]);l||("value"in h&&void 0!==(m=h.value)&&(m!==t.value||"progress"===v&&!m)&&g(t,"value",m,p.value,!1),"checked"in h&&void 0!==(m=h.checked)&&m!==t.checked&&g(t,"checked",m,p.checked,!1))}return t}function C(t,n,e){try{"function"==typeof t?t(n):t.current=n}catch(t){E.__e(t,e)}}function P(t,n,e){var o,i,_;if(E.unmount&&E.unmount(t),(o=t.ref)&&(o.current&&o.current!==t.__e||C(o,null,n)),e||"function"==typeof t.type||(e=null!=(i=t.__e)),t.__e=t.__d=void 0,null!=(o=t.__c)){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(t){E.__e(t,n)}o.base=o.__P=null}if(o=t.__k)for(_=0;_<o.length;_++)o[_]&&P(o[_],n,e);null!=i&&r(i)}function W(t,n,e){return this.constructor(t,e)}function O(t,n,e){var o,r,_;E.__&&E.__(t,n),r=(o="function"==typeof e)?null:e&&e.__k||n.__k,_=[],S(n,t=(!o&&e||n).__k=i(l,null,[t]),r||R,R,void 0!==n.ownerSVGElement,!o&&e?[e]:r?null:n.firstChild?M.slice.call(n.childNodes):null,_,!o&&e?e:r?r.__e:n.firstChild,o),x(_,t)}function D(t,n){O(t,n,D)}function N(t,n,e){var r,i,u,l=arguments,c=o({},t.props);for(u in n)"key"==u?r=n[u]:"ref"==u?i=n[u]:c[u]=n[u];if(arguments.length>3)for(e=[e],u=3;u<arguments.length;u++)e.push(l[u]);return null!=e&&(c.children=e),_(t.type,c,r||t.key,i||t.ref,null)}function T(t,n){var e={__c:n="__cC"+F++,__:t,Consumer:function(t,n){return t.children(n)},Provider:function(t){var e,o;return this.getChildContext||(e=[],(o={})[n]=this,this.getChildContext=function(){return o},this.shouldComponentUpdate=function(t){this.props.value!==t.value&&e.some(f)},this.sub=function(t){e.push(t);var n=t.componentWillUnmount;t.componentWillUnmount=function(){e.splice(e.indexOf(t),1),n&&n.call(t)}}),t.children}};return e.Provider.__=e.Consumer.contextType=e}e.r(n),e.d(n,"render",(function(){return O})),e.d(n,"hydrate",(function(){return D})),e.d(n,"createElement",(function(){return i})),e.d(n,"h",(function(){return i})),e.d(n,"Fragment",(function(){return l})),e.d(n,"createRef",(function(){return u})),e.d(n,"isValidElement",(function(){return j})),e.d(n,"Component",(function(){return c})),e.d(n,"cloneElement",(function(){return N})),e.d(n,"createContext",(function(){return T})),e.d(n,"toChildArray",(function(){return v})),e.d(n,"options",(function(){return E}));var E,j,L,A,H,F,R={},M=[],U=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;E={__e:function(t,n){for(var e,o,r;n=n.__;)if((e=n.__c)&&!e.__)try{if((o=e.constructor)&&null!=o.getDerivedStateFromError&&(e.setState(o.getDerivedStateFromError(t)),r=e.__d),null!=e.componentDidCatch&&(e.componentDidCatch(t),r=e.__d),r)return e.__E=e}catch(n){t=n}throw t},__v:0},j=function(t){return null!=t&&void 0===t.constructor},c.prototype.setState=function(t,n){var e;e=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=o({},this.state),"function"==typeof t&&(t=t(o({},e),this.props)),t&&o(e,t),null!=t&&this.__v&&(n&&this.__h.push(n),f(this))},c.prototype.forceUpdate=function(t){this.__v&&(this.__e=!0,t&&this.__h.push(t),f(this))},c.prototype.render=l,L=[],A="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,p.__r=0,F=0},"m1/V":function(t,n,e){"use strict";(function(t){function o(n){var e=n.data,o=Object.keys(e),_=Object(r.b)(o[0]),u=_[0],l=_[1];return t("div",{className:"plot-container"},t("div",{className:"bookmarks"},o.map((function(n){return t("a",{className:u===n?"selected":"",onClick:function(){return l(n)},key:n},n)}))),t("div",{className:"plots"},t(i.a,{key:u,name:u,exerciseStat:e[u]})))}e.d(n,"a",(function(){return o}));var r=e("QRet"),i=e("6Fq7")}).call(this,e("hosL").h)},mdyV:function(t,n,e){"use strict";e.r(n);var o=e("hosL"),r=o.h,i=o.render,_=function(t){return t&&t.default?t.default:t};if("serviceWorker"in navigator&&navigator.serviceWorker.register(e.p+"sw.js"),"function"==typeof _(e("QfWi"))){var u=document.getElementById("preact_root")||document.body.firstElementChild;0,function(){var t=_(e("QfWi")),n={},o=document.querySelector('[type="__PREACT_CLI_DATA__"]');o&&(n=JSON.parse(decodeURI(o.innerHTML)).preRenderData||n);var l;n.url&&(l=n.url);u=i(r(t,{CLI_DATA:{preRenderData:n}}),document.body,u)}()}}});
//# sourceMappingURL=bundle.396bf.js.map