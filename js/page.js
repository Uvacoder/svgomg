!function(){"use strict";const e=new Promise((e=>{function t(){"loading"!=document.readyState&&e()}document.addEventListener("readystatechange",t),t()})),t=document.createRange();function n(e){return t.createContextualFragment(e).children[0]}t.selectNode(document.documentElement);const i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};function s(e,...t){return t=t.map((e=>String(e).replace(/[&<>"'\/]/g,(e=>i[e])))),e.reduce(((e,n,i)=>e+(n+(t[i]||""))),"")}function o(e){return new Response(e).text()}function r({removeClass:e=!1}={}){return function(t,n="active",i="transition"){if(e){if(!t.classList.contains(n))return Promise.resolve()}else if(t.classList.contains(n))return Promise.resolve();const s=new Promise((s=>{const o=e=>{e.target==t&&(t.removeEventListener("webkitTransitionEnd",o),t.removeEventListener("transitionend",o),t.classList.remove(i),s())};t.classList.add(i),requestAnimationFrame((()=>{t.addEventListener("webkitTransitionEnd",o),t.addEventListener("transitionend",o),t.classList[e?"remove":"add"](n)}))})),o=new Promise((e=>setTimeout(e,1e3)));return Promise.race([s,o])}}const a=r(),c=r({removeClass:!0});let h=(()=>{let e;function t(){return e||(e=new Promise(((e,t)=>{const n=indexedDB.open("svgo-keyval",1);n.onerror=()=>{t(n.error)},n.onupgradeneeded=()=>{n.result.createObjectStore("keyval")},n.onsuccess=()=>{e(n.result)}}))),e}async function n(e,n){const i=await t();return new Promise(((t,s)=>{const o=i.transaction("keyval",e);o.oncomplete=()=>t(),o.onerror=()=>s(o.error),n(o.objectStore("keyval"))}))}return{async get(e){let t;return await n("readonly",(n=>{t=n.get(e)})),t.result},set:(e,t)=>n("readwrite",(n=>{n.put(t,e)})),delete:e=>n("readwrite",(t=>{t.delete(e)}))}})();self.indexedDB||(h={get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,t)=>Promise.resolve(localStorage.setItem(e,t)),delete:e=>Promise.resolve(localStorage.removeItem(e))});class l{constructor(e){this._requestId=0,this._pending={},this._url=e,this._worker=new Worker(this._url),this._worker.onmessage=e=>this._onMessage(e)}async release(){this._worker&&(this._worker.terminate(),this._worker=null);for(const e of Object.keys(this._pending))this._fulfillPending(id,null,new Error("Worker terminated: "+this._url))}_postMessage(e){this._worker.postMessage(e)}_onMessage(e){e.data.id?this._fulfillPending(e.data.id,e.data.result,e.data.error):console.log("Unexpected message",e)}_fulfillPending(e,t,n){const i=this._pending[e];i?(delete this._pending[e],n?i[1](new Error(n)):i[0](t)):console.log("No resolver for",{id:e,result:t,error:n})}_requestResponse(e){return new Promise(((t,n)=>{e.id=++this._requestId,this._pending[e.id]=[t,n],this._postMessage(e)}))}}const d=new class extends l{constructor(){super("js/gzip-worker.js")}compress(e){return this._requestResponse({data:e})}};class u{constructor(e,t,n){this.text=e,this._compressedSize=null,this._url="",this._blob=null,this.width=t,this.height=n}async size({compress:e}){return e?(this._compressedSize||(this._compressedSize=d.compress(this.text).then((e=>e.byteLength))),this._compressedSize):this.text.length}_create(){this._blob=new Blob([this.text],{type:"image/svg+xml"}),this._url=URL.createObjectURL(this._blob)}get blob(){return this._blob||this._create(),this._blob}get url(){return this._url||this._create(),this._url}release(){this._url&&(this._blob=null,URL.revokeObjectURL(this._url))}}function p(e){return{x:e.pageX,y:e.pageY}}function _(e,t){const n=Math.abs(t.x-e.x),i=Math.abs(t.y-e.y);return Math.sqrt(n*n+i*i)}function v(e,t){return{x:(e.x+t.x)/2,y:(e.y+t.y)/2}}function m(e){return e.touches?Array.from(e.touches).map((e=>p(e))):[p(e)]}class g{constructor(e,{eventArea:t=e,shouldCaptureFunc:n=(()=>!0)}={}){this._target=e,this._shouldCaptureFunc=n,this._dx=0,this._dy=0,this._scale=1,this._active=0,this._lastPoints=[],["_onPointerDown","_onPointerMove","_onPointerUp"].forEach((e=>{this[e]=this[e].bind(this)})),t.addEventListener("mousedown",this._onPointerDown),t.addEventListener("touchstart",this._onPointerDown),t.addEventListener("wheel",(e=>this._onWheel(e)))}reset(){this._dx=0,this._dy=0,this._scale=1,this._update()}_onWheel(e){if(!this._shouldCaptureFunc(e.target))return;e.preventDefault();const t=this._target.getBoundingClientRect();let n=e.deltaY;1===e.deltaMode&&(n*=15),n=Math.max(Math.min(n,60),-60);const i=n/300+1;this._scale*i<.05||(this._scale*=i,this._dx-=(e.pageX-t.left)*(i-1),this._dy-=(e.pageY-t.top)*(i-1),this._update())}_onFirstPointerDown(e){document.addEventListener("mousemove",this._onPointerMove),document.addEventListener("mouseup",this._onPointerUp),document.addEventListener("touchmove",this._onPointerMove),document.addEventListener("touchend",this._onPointerUp)}_onPointerDown(e){"mousedown"==e.type&&1!=e.which||this._shouldCaptureFunc(e.target)&&(e.preventDefault(),this._lastPoints=m(e),this._active++,1===this._active&&this._onFirstPointerDown(e))}_onPointerMove(e){e.preventDefault();const t=m(e),n=t.reduce(v),i=this._lastPoints.reduce(v),s=this._target.getBoundingClientRect();if(this._dx+=n.x-i.x,this._dy+=n.y-i.y,t[1]){const e=_(t[0],t[1])/_(this._lastPoints[0],this._lastPoints[1]);this._scale*=e,this._dx-=(n.x-s.left)*(e-1),this._dy-=(n.y-s.top)*(e-1)}this._update(),this._lastPoints=t}_update(){this._target.style.WebkitTransform=this._target.style.transform=`translate3d(${this._dx}px, ${this._dy}px, 0) scale(${this._scale})`}_onPointerUp(e){e.preventDefault(),this._active--,this._lastPoints.pop(),this._active?this._lastPoints=m(e):(document.removeEventListener("mousemove",this._onPointerMove),document.removeEventListener("mouseup",this._onPointerUp),document.removeEventListener("touchmove",this._onPointerMove),document.removeEventListener("touchend",this._onPointerUp))}}class f{constructor(){this.container=n('<div class="svg-output"><div class="svg-container"><iframe class="svg-frame" sandbox="allow-scripts"></iframe></div><div class="svg-clickjacker"></div></div>'),this._svgFrame=this.container.querySelector(".svg-frame"),this._svgFrame.scrolling="no",this._svgContainer=this.container.querySelector(".svg-container"),e.then((()=>{this._panZoom=new g(this._svgContainer,{eventArea:this.container})}))}setSvg(e){const t=this._nextLoadPromise();return this._svgFrame.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(e.text),this._svgFrame.width=e.width,this._svgFrame.height=e.height,t}reset(){this._svgFrame.src="about:blank",this._panZoom.reset()}_nextLoadPromise(){return new Promise((e=>{const t=()=>{this._svgFrame.removeEventListener("load",t),e()};this._svgFrame.addEventListener("load",t)}))}}const y=new class extends l{constructor(){super("js/prism-worker.js")}highlight(e){return this._requestResponse({data:e})}};class w{constructor(){this.container=n('<div class="code-output"><pre><code></code></pre></div>'),this._codeEl=this.container.querySelector("code")}async setSvg(e){this._codeEl.innerHTML=await y.highlight(e.text)}reset(){this._codeEl.innerHTML=""}}class L{constructor(){this.container=n('<div class="output-switcher"></div>'),this._types={image:new f,code:new w},this._svgFile=null,this._switchQueue=Promise.resolve(),this.set("image",{noAnimate:!0})}update(e){return this._svgFile=e,this._types[this._activeType].setSvg(e)}reset(){this._types[this._activeType].reset()}set(e,{noAnimate:t=!1}={}){return this._switchQueue=this._switchQueue.then((async()=>{const n=this._activeType&&this._types[this._activeType].container;this._activeType=e;const i=this._types[this._activeType].container;if(this.container.appendChild(i),this._svgFile&&await this.update(this._svgFile),t)i.classList.add("active"),n&&n.classList.remove("active");else{const e=[a(i)];n&&e.push(c(n)),await Promise.all(e)}n&&this.container.removeChild(n)}))}}class b{constructor(){this.container=n('<div class="ripple"></div>')}animate(){this.container.classList.remove("animate"),this.container.offsetLeft,this.container.classList.add("animate")}}class E{constructor(){this.container=n('<div class="spinner"><div class="spinner-container"><div class="spinner-layer"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div></div>'),this._showTimeout=null,this.container.style.display="none";const e=e=>{e.target==this.container&&(this.container.style.display="none")};this.container.addEventListener("webkitAnimationEnd",e),this.container.addEventListener("animationend",e)}show(e=300){clearTimeout(this._showTimeout),this.container.style.display="none",this.container.classList.remove("cooldown"),this._showTimeout=setTimeout((()=>{this.container.style.display=""}),e)}hide(){clearTimeout(this._showTimeout),this.container.classList.add("cooldown")}}class C{constructor({title:e,href:t,iconSvg:i,classList:s,minor:o}){this.container=n((t?"<a>":'<div role="button" tabindex="0">')+i+(t?"</a>":"</div>")),t&&(this.container.href=t),e&&this.container.setAttribute("title",e),this.container.classList.add(o?"minor-floating-action-button":"floating-action-button"),s&&s.forEach((e=>{this.container.classList.add(e)})),this._ripple=new b,this.container.appendChild(this._ripple.container),this._spinner=new E,this.container.appendChild(this._spinner.container),this.container.addEventListener("click",(e=>this._onClick(e)))}_onClick(e){this._ripple.animate()}working(){this._spinner.show(500)}done(){this._spinner.hide()}}class x extends C{constructor(){const e="Download";super({title:e,href:"./",iconSvg:'<svg viewBox="0 0 24 24" class="icon"><title>Download</title><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>'}),this._svgFile=null}_onClick(e){super._onClick(e),"msSaveBlob"in navigator&&(e.preventDefault(),navigator.msSaveBlob(this._svgFile.blob,this._svgFile.filename))}setDownload(e,t){this.container.download=e,this.container.href=t.url,this._svgFile=t}}const S=document.queryCommandSupported&&document.queryCommandSupported("copy");class k extends C{constructor(){const e="Copy as text";super({title:e,iconSvg:`<svg viewBox="0 0 24 24" class="icon"><title>${e}</title><path d="M16 1H4C3 1 2 2 2 3v14h2V3h12V1zm3 4H8C7 5 6 6 6 7v14c0 1 1 2 2 2h11c1 0 2-1 2-2V7c0-1-1-2-2-2zm0 16H8V7h11v14z"/></svg>`,minor:!0}),this._text=null,this._pre=document.createElement("pre")}_onClick(e){super._onClick(e),this._pre.textContent=this._text,document.body.appendChild(this._pre),getSelection().removeAllRanges();const t=document.createRange();t.selectNode(this._pre),window.getSelection().addRange(t),document.execCommand("copy"),getSelection().removeAllRanges(),document.body.removeChild(this._pre)}setCopyText(e,t){this._text=e}}class U extends C{constructor(){const e="Preview on vivid background";super({title:e,iconSvg:`<svg viewBox="0 0 24 24" class="icon"><title>${e}</title><path d="M21.143 9.667c-.733-1.392-1.914-3.05-3.617-4.753-2.977-2.978-5.478-3.914-6.785-3.914-.414 0-.708.094-.86.246l-1.361 1.36c-1.899-.236-3.42.106-4.294.983-.876.875-1.164 2.159-.792 3.523.492 1.806 2.305 4.049 5.905 5.375.038.323.157.638.405.885.588.588 1.535.586 2.121 0s.588-1.533.002-2.119c-.588-.587-1.537-.588-2.123-.001l-.17.256c-2.031-.765-3.395-1.828-4.232-2.9l3.879-3.875c.496 2.73 6.432 8.676 9.178 9.178l-7.115 7.107c-.234.153-2.798-.316-6.156-3.675-3.393-3.393-3.175-5.271-3.027-5.498l1.859-1.856c-.439-.359-.925-1.103-1.141-1.689l-2.134 2.131c-.445.446-.685 1.064-.685 1.82 0 1.634 1.121 3.915 3.713 6.506 2.764 2.764 5.58 4.243 7.432 4.243.648 0 1.18-.195 1.547-.562l8.086-8.078c.91.874-.778 3.538-.778 4.648 0 1.104.896 1.999 2 1.999 1.105 0 2-.896 2-2 0-3.184-1.425-6.81-2.857-9.34zm-16.209-5.371c.527-.53 1.471-.791 2.656-.761l-3.209 3.206c-.236-.978-.049-1.845.553-2.445zm9.292 4.079l-.03-.029c-1.292-1.292-3.803-4.356-3.096-5.063.715-.715 3.488 1.521 5.062 3.096.862.862 2.088 2.247 2.937 3.458-1.717-1.074-3.491-1.469-4.873-1.462z"/></svg>`,classList:["fillAB"],minor:!0})}_onClick(e){super._onClick(e),this.container.classList.contains("active")?(this.container.classList.remove("active"),this.setColor("transparent")):(this.container.classList.add("active"),this.setColor("rgba(0, 0, 0, 0.7)"))}setColor(e){document.documentElement.style.backgroundColor=e}}function P(e,t){const n=Math.pow(10,t);return Math.floor(Math.round(e*n))/n}function F(e){return e<1024?e+" bytes":P(e/1024,2)+"k"}class M{constructor(){this.container=n('<div class="results"><span class="size"></span> <span class="diff"></span></div>'),this._sizeEl=this.container.querySelector(".size"),this._newSizeEl=this.container.querySelector(".newSize"),this._diffEl=this.container.querySelector(".diff")}update({size:e,comparisonSize:t}){this._sizeEl.textContent=t?F(t)+" → "+F(e):F(e),this._diffEl.classList.remove("decrease","increase"),t?e===t?this._diffEl.textContent="100%":(this._diffEl.textContent=P(e/t*100,2)+"%",this._diffEl.classList.add(e>t?"increase":"decrease")):this._diffEl.textContent=""}}var q,T={exports:{}},D="object"==typeof Reflect?Reflect:null,I=D&&"function"==typeof D.apply?D.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};q=D&&"function"==typeof D.ownKeys?D.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var R=Number.isNaN||function(e){return e!=e};function O(){O.init.call(this)}T.exports=O,T.exports.once=function(e,t){return new Promise((function(n,i){function s(n){e.removeListener(t,o),i(n)}function o(){"function"==typeof e.removeListener&&e.removeListener("error",s),n([].slice.call(arguments))}K(e,t,o,{once:!0}),"error"!==t&&function(e,t,n){"function"==typeof e.on&&K(e,"error",t,n)}(e,s,{once:!0})}))},O.EventEmitter=O,O.prototype._events=void 0,O.prototype._eventsCount=0,O.prototype._maxListeners=void 0;var j=10;function z(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function B(e){return void 0===e._maxListeners?O.defaultMaxListeners:e._maxListeners}function A(e,t,n,i){var s,o,r,a;if(z(n),void 0===(o=e._events)?(o=e._events=Object.create(null),e._eventsCount=0):(void 0!==o.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),o=e._events),r=o[t]),void 0===r)r=o[t]=n,++e._eventsCount;else if("function"==typeof r?r=o[t]=i?[n,r]:[r,n]:i?r.unshift(n):r.push(n),(s=B(e))>0&&r.length>s&&!r.warned){r.warned=!0;var c=new Error("Possible EventEmitter memory leak detected. "+r.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");c.name="MaxListenersExceededWarning",c.emitter=e,c.type=t,c.count=r.length,a=c,console&&console.warn&&console.warn(a)}return e}function N(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function W(e,t,n){var i={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},s=N.bind(i);return s.listener=n,i.wrapFn=s,s}function H(e,t,n){var i=e._events;if(void 0===i)return[];var s=i[t];return void 0===s?[]:"function"==typeof s?n?[s.listener||s]:[s]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(s):J(s,s.length)}function V(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function J(e,t){for(var n=new Array(t),i=0;i<t;++i)n[i]=e[i];return n}function K(e,t,n,i){if("function"==typeof e.on)i.once?e.once(t,n):e.on(t,n);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,(function s(o){i.once&&e.removeEventListener(t,s),n(o)}))}}Object.defineProperty(O,"defaultMaxListeners",{enumerable:!0,get:function(){return j},set:function(e){if("number"!=typeof e||e<0||R(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");j=e}}),O.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},O.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||R(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},O.prototype.getMaxListeners=function(){return B(this)},O.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var i="error"===e,s=this._events;if(void 0!==s)i=i&&void 0===s.error;else if(!i)return!1;if(i){var o;if(t.length>0&&(o=t[0]),o instanceof Error)throw o;var r=new Error("Unhandled error."+(o?" ("+o.message+")":""));throw r.context=o,r}var a=s[e];if(void 0===a)return!1;if("function"==typeof a)I(a,this,t);else{var c=a.length,h=J(a,c);for(n=0;n<c;++n)I(h[n],this,t)}return!0},O.prototype.addListener=function(e,t){return A(this,e,t,!1)},O.prototype.on=O.prototype.addListener,O.prototype.prependListener=function(e,t){return A(this,e,t,!0)},O.prototype.once=function(e,t){return z(t),this.on(e,W(this,e,t)),this},O.prototype.prependOnceListener=function(e,t){return z(t),this.prependListener(e,W(this,e,t)),this},O.prototype.removeListener=function(e,t){var n,i,s,o,r;if(z(t),void 0===(i=this._events))return this;if(void 0===(n=i[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(s=-1,o=n.length-1;o>=0;o--)if(n[o]===t||n[o].listener===t){r=n[o].listener,s=o;break}if(s<0)return this;0===s?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,s),1===n.length&&(i[e]=n[0]),void 0!==i.removeListener&&this.emit("removeListener",e,r||t)}return this},O.prototype.off=O.prototype.removeListener,O.prototype.removeAllListeners=function(e){var t,n,i;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var s,o=Object.keys(n);for(i=0;i<o.length;++i)"removeListener"!==(s=o[i])&&this.removeAllListeners(s);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(i=t.length-1;i>=0;i--)this.removeListener(e,t[i]);return this},O.prototype.listeners=function(e){return H(this,e,!0)},O.prototype.rawListeners=function(e){return H(this,e,!1)},O.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):V.call(e,t)},O.prototype.listenerCount=V,O.prototype.eventNames=function(){return this._eventsCount>0?q(this._events):[]};class ${constructor(e){this.container=n('\n      <div class="material-slider">\n        <div class="track">\n          <div class="track-on"></div>\n          <div class="handle">\n            <div class="arrow"></div>\n            <div class="val"></div>\n          </div>\n        </div>\n      </div>\n    '),this.range=e,this._handle=this.container.querySelector(".handle"),this._trackOn=this.container.querySelector(".track-on"),this._val=this.container.querySelector(".val"),e.parentNode.insertBefore(this.container,e),this.container.insertBefore(e,this.container.firstChild),e.addEventListener("input",(()=>this._onInputChange())),this.range.addEventListener("mousedown",(()=>this._onRangeMouseDown())),this.range.addEventListener("touchstart",(()=>this._onRangeTouchStart())),this.range.addEventListener("touchend",(()=>this._onRangeTouchEnd())),this._setPosition()}_onRangeTouchStart(){this.range.focus()}_onRangeTouchEnd(){this.range.blur()}_onRangeMouseDown(){this.range.classList.add("active");const e=t=>{requestAnimationFrame((e=>{this.range.blur()})),this.range.classList.remove("active"),document.removeEventListener("mouseup",e)};document.addEventListener("mouseup",e)}set value(e){this.range.value=e,this._update()}_onInputChange(){this._update()}_update(){requestAnimationFrame((()=>this._setPosition()))}_setPosition(){const{min:e,max:t,value:n}=this.range,i=(Number(n)-e)/(t-e);this._trackOn.style.width=this._handle.style.left=100*i+"%",this._val.textContent=n}}class Y extends T.exports.EventEmitter{constructor(){super(),this._throttleTimeout=null,e.then((()=>{this._pluginInputs=Array.from(document.querySelectorAll(".settings .plugins input")),this._globalInputs=Array.from(document.querySelectorAll(".settings .global input")),this._resetRipple=new b,this._resetBtn=document.querySelector(".setting-reset"),this._resetBtn.appendChild(this._resetRipple.container),this._sliderMap=new WeakMap,Array.from(document.querySelectorAll(".settings input[type=range]")).forEach((e=>this._sliderMap.set(e,new $(e)))),this.container=document.querySelector(".settings"),this._scroller=document.querySelector(".settings-scroller"),this.container.addEventListener("change",(e=>this._onChange(e))),this.container.addEventListener("input",(e=>this._onChange(e))),this._scroller.addEventListener("wheel",(e=>this._onMouseWheel(e))),this._resetBtn.addEventListener("click",(e=>this._onReset(e))),this._scroller.addEventListener("mousedown",(e=>{e.target.closest("input[type=range]")||e.preventDefault()}))}))}_onMouseWheel(e){e.deltaMode||(e.preventDefault(),e.currentTarget.scrollTop+=e.deltaY)}_onChange(e){clearTimeout(this._throttleTimeout),"range"==e.target.type?this._throttleTimeout=setTimeout((()=>this.emit("change")),150):this.emit("change")}_onReset(){this._resetRipple.animate();const e=this.getSettings();for(const e of this._globalInputs)"checkbox"==e.type?e.checked=e.hasAttribute("checked"):"range"==e.type&&(this._sliderMap.get(e).value=e.getAttribute("value"));for(const e of this._pluginInputs)e.checked=e.hasAttribute("checked");this.emit("reset",e),this.emit("change")}setSettings(e){for(const t of this._globalInputs)t.name in e&&("checkbox"==t.type?t.checked=e[t.name]:"range"==t.type&&(this._sliderMap.get(t).value=e[t.name]));for(const t of this._pluginInputs)t.name in e.plugins&&(t.checked=e.plugins[t.name])}getSettings(){const e=[],t={plugins:{}};return this._globalInputs.forEach((n=>{"gzip"!=n.name&&"original"!=n.name&&("checkbox"==n.type?e.push(Number(n.checked)):e.push("|"+n.value+"|")),"checkbox"==n.type?t[n.name]=n.checked:t[n.name]=n.value})),this._pluginInputs.forEach((n=>{e.push(Number(n.checked)),t.plugins[n.name]=n.checked})),t.fingerprint=e.join(),t}}class G extends T.exports.EventEmitter{constructor(){super(),this.allowHide=!1,this._spinner=new E,e.then((()=>{this.container=document.querySelector(".main-menu"),this._loadFileInput=document.querySelector(".load-file-input"),this._pasteInput=document.querySelector(".paste-input"),this._loadDemoBtn=document.querySelector(".load-demo"),this._loadFileBtn=document.querySelector(".load-file"),this._pasteLabel=document.querySelector(".menu-input"),this._overlay=this.container.querySelector(".overlay"),this._menu=this.container.querySelector(".menu"),document.querySelector(".menu-btn").addEventListener("click",(e=>this._onMenuButtonClick(e))),this._overlay.addEventListener("click",(e=>this._onOverlayClick(e))),this._loadFileBtn.addEventListener("click",(e=>this._onLoadFileClick(e))),this._loadDemoBtn.addEventListener("click",(e=>this._onLoadDemoClick(e))),this._loadFileInput.addEventListener("change",(e=>this._onFileInputChange(e))),this._pasteInput.addEventListener("input",(e=>this._onTextInputChange(e)))}))}show(){this.container.classList.remove("hidden"),c(this._overlay,"hidden"),c(this._menu,"hidden")}hide(){this.allowHide&&(this.stopSpinner(),this.container.classList.add("hidden"),a(this._overlay,"hidden"),a(this._menu,"hidden"))}stopSpinner(){this._spinner.hide()}showFilePicker(){this._loadFileInput.click()}_onOverlayClick(e){e.preventDefault(),this.hide()}_onMenuButtonClick(e){e.preventDefault(),this.show()}_onTextInputChange(e){const t=this._pasteInput.value.trim();t.includes("</svg>")&&(this._pasteInput.value="",this._pasteInput.blur(),this._pasteLabel.appendChild(this._spinner.container),this._spinner.show(),this.emit("svgDataLoad",{data:t,filename:"image.svg"}))}_onLoadFileClick(e){e.preventDefault(),e.target.blur(),this.showFilePicker()}async _onFileInputChange(e){const t=this._loadFileInput.files[0];t&&(this._loadFileBtn.appendChild(this._spinner.container),this._spinner.show(),this.emit("svgDataLoad",{data:await o(t),filename:t.name}))}async _onLoadDemoClick(e){e.preventDefault(),e.target.blur(),this._loadDemoBtn.appendChild(this._spinner.container),this._spinner.show();try{this.emit("svgDataLoad",{data:await fetch("test-svgs/car-lite.svg").then((e=>e.text())),filename:"car-lite.svg"})}catch(e){{let e;this.stopSpinner(),e="serviceWorker"in navigator&&navigator.serviceWorker.controller?Error("Demo not available offline"):Error("Couldn't fetch demo SVG"),this.emit("error",{error:e})}}}}class Q{constructor(e,t,i){this.container=n('<div class="toast"><div class="toast-content"></div></div>'),this._content=this.container.querySelector(".toast-content"),this._content.textContent=e,this._answerResolve,this._hideTimeout,this.answer=new Promise((e=>this._answerResolve=e)),i.forEach((e=>{var t=document.createElement("button");t.className="unbutton",t.textContent=e,t.addEventListener("click",(()=>{this._answerResolve(e)})),this.container.appendChild(t)})),t&&(this._hideTimeout=setTimeout((()=>this.hide()),t))}hide(){return clearTimeout(this._hideTimeout),this._answerResolve(),a(this.container,"hide")}}class X{constructor(){this.container=n("<div class='toasts'></div>")}show(e,{duration:t=0,buttons:n=["dismiss"]}={}){const i=new Q(e,t,n);return this.container.appendChild(i.container),i.answer.then((()=>i.hide())).then((()=>{this.container.removeChild(i.container)})),i}}class Z extends T.exports.EventEmitter{constructor(){super(),this.container=n('<div class="drop-overlay">Drop it!</div>'),this._activeEnters=0,this._currentEnteredElement=null,e.then((e=>{document.addEventListener("dragover",(e=>e.preventDefault())),document.addEventListener("dragenter",(e=>this._onDragEnter(e))),document.addEventListener("dragleave",(e=>this._onDragLeave(e))),document.addEventListener("drop",(e=>this._onDrop(e)))}))}_onDragEnter(e){this._currentEnteredElement!=e.target&&(this._currentEnteredElement=e.target,this._activeEnters++||a(this.container))}_onDragLeave(e){this._currentEnteredElement=null,--this._activeEnters||c(this.container)}async _onDrop(e){e.preventDefault(),this._activeEnters=0,c(this.container);const t=e.dataTransfer.files[0];t&&this.emit("svgDataLoad",{data:await o(t),filename:t.name})}}class ee{constructor(){e.then((e=>{this.container=document.querySelector(".preloader"),this.activated=this.container.classList.contains("active"),this.hide()}))}async hide(){await c(this.container,"active"),this.container.style.display="none"}}class te{constructor(e){this.container=n('<section class="changelog"></section>'),this._loadedVersion=e}async showLogFrom(t){if(t==this._loadedVersion)return;const i=await fetch("changelog.json").then((e=>e.json()));let o=0,r=0;for(var c=0;c<i.length;c++){const e=i[c];if(e.version===this._loadedVersion)o=c;else if(e.version===t)break;r=c+1}const h=i.slice(o,r).reduce(((e,t)=>e.concat(t.changes)),[]).map((e=>s`<li>${e}</li>`));this.container.appendChild(n("<h1>Updated!</h1>")),this.container.appendChild(n("<ul>"+h.join("")+"</ul>")),await e,a(this.container)}}class ne{constructor(t){this._results=t,e.then((e=>{this._mobileContainer=document.querySelector(".results-container-mobile"),this._container=document.querySelector(".results-container"),this._query=matchMedia("(min-width: 640px)"),this._query.addListener((()=>this._positionResults())),this._positionResults()}))}_positionResults(){this._query.matches?this._container.appendChild(this._results.container):this._mobileContainer.appendChild(this._results.container)}}class ie extends T.exports.EventEmitter{constructor(){super(),this.container=null,e.then((()=>{this.container=document.querySelector(".view-toggler"),this.container.output[0].checked=!0,this.container.addEventListener("change",(e=>this._onChange(e)))}))}_onChange(e){let t=this.container.output.value;t||(t=Array.from(this.container.output).reduce(((e,t)=>e||(t.checked?t.value:"")),"")),this.emit("change",{value:t})}}class se{constructor(e){this._size=e,this.purge()}purge(){this._fingerprints=[],this._items=[],this._index=0}add(e,t){const n=this._items[this._index];n&&n.release(),this._fingerprints[this._index]=e,this._items[this._index]=t,this._index=(this._index+1)%this._size}match(e){return this._items[this._fingerprints.indexOf(e)]}}class oe{constructor(...e){this._activated=!1,this._toActivate=e}activate(){if(!this._activated)return this._activated=!0,Promise.all(this._toActivate.map((e=>a(e))))}}const re=new class extends l{constructor(){super("js/svgo-worker.js"),this._abortOnNextIteration=!1,this._currentJob=Promise.resolve()}async load(e){const{width:t,height:n}=await this._requestResponse({action:"load",data:e});return new u(e,t,n)}process(e,t){return this._currentJob=this.abortCurrent().then((async()=>{this._abortOnNextIteration=!1;let n=await this._requestResponse({action:"process",settings:e});var i=new u(n.data,n.dimensions.width,n.dimensions.height);if(t(i),e.multipass)for(;n=await this.nextPass();){if(this._abortOnNextIteration)throw Error("abort");i=new u(n.data,n.dimensions.width,n.dimensions.height),t(i)}return i}))}nextPass(){return this._requestResponse({action:"nextPass"})}async abortCurrent(){this._abortOnNextIteration=!0,await this._currentJob}async release(){await this.abortCurrent(),super.release()}};var ae;ae="mouse",document.body.addEventListener("focus",(e=>{e.target.classList.add("key"==ae?"key-focused":"mouse-focused")}),!0),document.body.addEventListener("blur",(e=>{e.target.classList.remove("key-focused"),e.target.classList.remove("mouse-focused")}),!0),document.body.addEventListener("keydown",(()=>{ae="key"}),!0),document.body.addEventListener("mousedown",(()=>{ae="mouse"}),!0),new class{constructor(){this._container=null,this._mainUi=null,this._outputUi=new L,this._downloadButtonUi=new x,this._copyButtonUi=new k,this._bgFillUi=new U,this._resultsUi=new M,this._settingsUi=new Y,this._mainMenuUi=new G,this._toastsUi=new X,this._dropUi=new Z,this._preloaderUi=new ee,this._changelogUi=new te(self.version),this._resultsContainerUi=new ne(this._resultsUi),this._viewTogglerUi=new ie,this._settingsUi.on("change",(()=>this._onSettingsChange())),this._settingsUi.on("reset",(e=>this._onSettingsReset(e))),this._mainMenuUi.on("svgDataLoad",(e=>this._onInputChange(e))),this._dropUi.on("svgDataLoad",(e=>this._onInputChange(e))),this._mainMenuUi.on("error",(({error:e})=>this._handleError(e))),this._viewTogglerUi.on("change",(e=>this._onViewSelectionChange(e))),window.addEventListener("keydown",(e=>this._onGlobalKeyDown(e))),this._inputItem=null,this._cache=new se(10),this._latestCompressJobId=0,this._userHasInteracted=!1,this._reloading=!1,"serviceWorker"in navigator&&navigator.serviceWorker.register("sw.js",{scope:"./"}).then((e=>{e.addEventListener("updatefound",(()=>this._onUpdateFound(e)))})),h.get("last-seen-version").then((e=>{e&&this._changelogUi.showLogFrom(e),h.set("last-seen-version",self.version)})),e.then((()=>{this._container=document.querySelector(".app-output"),this._mainUi=new oe(document.querySelector(".toolbar"),document.querySelector(".action-button-container"),this._outputUi.container,this._settingsUi.container);const e=document.querySelector(".action-button-container"),t=document.querySelector(".minor-action-container");t.appendChild(this._bgFillUi.container),S&&t.appendChild(this._copyButtonUi.container),e.appendChild(this._downloadButtonUi.container),document.querySelector(".output").appendChild(this._outputUi.container),this._container.appendChild(this._toastsUi.container),this._container.appendChild(this._dropUi.container),document.querySelector(".menu-extra").appendChild(this._changelogUi.container),this._loadSettings(),this._preloaderUi.activated&&this._toastsUi.show("Ready now!",{duration:3e3})}))}_onGlobalKeyDown(e){"o"===e.key&&(e.ctrlKey||e.metaKey)&&(e.preventDefault(),this._mainMenuUi.showFilePicker())}_onViewSelectionChange(e){this._outputUi.set(e.value)}_onUpdateFound(e){const t=e.installing;e.installing.addEventListener("statechange",(async()=>{if(!this._reloading)if("activated"!=t.state||navigator.serviceWorker.controller){if("activated"==t.state&&navigator.serviceWorker.controller){if(!this._userHasInteracted)return this._reloading=!0,void location.reload();const e=this._toastsUi.show("Update available",{buttons:["reload","dismiss"]});"reload"==await e.answer&&(this._reloading=!0,location.reload())}}else this._toastsUi.show("Ready to work offline",{duration:5e3})}))}_onSettingsChange(){const e=this._settingsUi.getSettings();this._saveSettings(e),this._compressSvg(e)}async _onSettingsReset(e){const t=this._toastsUi.show("Settings reset",{buttons:["undo","dismiss"],duration:5e3});"undo"===await t.answer&&(this._settingsUi.setSettings(e),this._onSettingsChange())}async _onInputChange(e){const t=this._settingsUi.getSettings();this._userHasInteracted=!0;try{this._inputItem=await re.load(e.data),this._inputFilename=e.filename}catch(e){{const t=new Error("Load failed: "+e.message);return this._mainMenuUi.stopSpinner(),void this._handleError(t)}}this._cache.purge();let n=!0;const i=()=>{n&&(this._outputUi.reset(),this._mainUi.activate(),this._mainMenuUi.allowHide=!0,this._mainMenuUi.hide(),n=!1)};this._compressSvg(t,(()=>i())),n&&i()}_handleError(e){this._toastsUi.show(e.message),console.error(e)}async _loadSettings(){const e=await h.get("settings");e&&this._settingsUi.setSettings(e)}_saveSettings(e){const t=Object.assign({},e);delete t.original,h.set("settings",t)}async _compressSvg(e,t=function(){}){const n=this._latestCompressJobId=Math.random();if(await re.abortCurrent(),n!=this._latestCompressJobId)return;if(e.original)return void this._updateForFile(this._inputItem,{compress:e.gzip});const i=this._cache.match(e.fingerprint);if(i)this._updateForFile(i,{compareToFile:this._inputItem,compress:e.gzip});else{this._downloadButtonUi.working();try{const n=await re.process(e,(n=>{t(n),this._updateForFile(n,{compareToFile:this._inputItem,compress:e.gzip})}));this._cache.add(e.fingerprint,n)}catch(e){if("abort"==e.message)return;e.message="Minifying error: "+e.message,this._handleError(e)}finally{this._downloadButtonUi.done()}}}async _updateForFile(e,{compareToFile:t,compress:n}){this._outputUi.update(e),this._downloadButtonUi.setDownload(this._inputFilename,e),this._copyButtonUi.setCopyText(e.text),this._resultsUi.update({comparisonSize:t&&await t.size({compress:n}),size:await e.size({compress:n})})}}}();
//# sourceMappingURL=page.js.map
