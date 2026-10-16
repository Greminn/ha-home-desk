/*! home-desk-panel v0.1.0 | MIT */
!function(){"use strict";function e(e,t,i,n){var r,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(s<3?r(o):s>3?r(t,i,o):r(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap;let s=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=r.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(t,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,n)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[n+1],e[0]);return new s(i,e,n)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,n))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:p,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,m=f?f.emptyScript:"",b=g.reactiveElementPolyfillSupport,y=(e,t)=>e,x={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},k=(e,t)=>!l(e,t),v={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:k};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let _=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=v){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(e,i,t);void 0!==n&&c(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){const{get:n,set:r}=p(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:n,set(t){const s=n?.call(this);r?.call(this,t),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??v}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...h(e),...d(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,n)=>{if(i)e.adoptedStyleSheets=n.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of n){const n=document.createElement("style"),r=t.litNonce;void 0!==r&&n.setAttribute("nonce",r),n.textContent=i.cssText,e.appendChild(n)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(void 0!==n&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:x).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,n=i._$Eh.get(e);if(void 0!==n&&this._$Em!==n){const e=i.getPropertyOptions(n),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:x;this._$Em=n;const s=r.fromAttribute(t,e.type);this[n]=s??this._$Ej?.get(n)??s,this._$Em=null}}requestUpdate(e,t,i,n=!1,r){if(void 0!==e){const s=this.constructor;if(!1===n&&(r=this[e]),i??=s.getPropertyOptions(e),!((i.hasChanged??k)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:n,wrapped:r},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==r||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===n&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,n=this[t];!0!==e||this._$AL.has(t)||void 0===n||this.C(t,void 0,i,n)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[y("elementProperties")]=new Map,_[y("finalized")]=new Map,b?.({ReactiveElement:_}),(g.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,$=e=>e,A=w.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,T="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,R="?"+E,z=`<${R}>`,C=document,N=()=>C.createComment(""),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,P=Array.isArray,D="[ \t\n\f\r]",I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,L=/>/g,U=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,B=/"/g,j=/^(?:script|style|textarea|title)$/i,q=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),F=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),Z=new WeakMap,G=C.createTreeWalker(C,129);function Y(e,t){if(!P(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}let V=class e{constructor({strings:t,_$litType$:i},n){let r;this.parts=[];let s=0,o=0;const a=t.length-1,l=this.parts,[c,p]=((e,t)=>{const i=e.length-1,n=[];let r,s=2===t?"<svg>":3===t?"<math>":"",o=I;for(let t=0;t<i;t++){const i=e[t];let a,l,c=-1,p=0;for(;p<i.length&&(o.lastIndex=p,l=o.exec(i),null!==l);)p=o.lastIndex,o===I?"!--"===l[1]?o=M:void 0!==l[1]?o=L:void 0!==l[2]?(j.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=U):void 0!==l[3]&&(o=U):o===U?">"===l[0]?(o=r??I,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?U:'"'===l[3]?B:H):o===B||o===H?o=U:o===M||o===L?o=I:(o=U,r=void 0);const h=o===U&&e[t+1].startsWith("/>")?" ":"";s+=o===I?i+z:c>=0?(n.push(a),i.slice(0,c)+T+i.slice(c)+E+h):i+E+(-2===c?t:h)}return[Y(e,s+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),n]})(t,i);if(this.el=e.createElement(c,n),G.currentNode=this.el.content,2===i||3===i){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=G.nextNode())&&l.length<a;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(T)){const t=p[o++],i=r.getAttribute(e).split(E),n=/([.?@])?(.*)/.exec(t);l.push({type:1,index:s,name:n[2],strings:i,ctor:"."===n[1]?ee:"?"===n[1]?te:"@"===n[1]?ie:J}),r.removeAttribute(e)}else e.startsWith(E)&&(l.push({type:6,index:s}),r.removeAttribute(e));if(j.test(r.tagName)){const e=r.textContent.split(E),t=e.length-1;if(t>0){r.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],N()),G.nextNode(),l.push({type:2,index:++s});r.append(e[t],N())}}}else if(8===r.nodeType)if(r.data===R)l.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf(E,e+1));)l.push({type:7,index:s}),e+=E.length-1}s++}}static createElement(e,t){const i=C.createElement("template");return i.innerHTML=e,i}};function Q(e,t,i=e,n){if(t===F)return t;let r=void 0!==n?i._$Co?.[n]:i._$Cl;const s=O(t)?void 0:t._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),void 0===s?r=void 0:(r=new s(e),r._$AT(e,i,n)),void 0!==n?(i._$Co??=[])[n]=r:i._$Cl=r),void 0!==r&&(t=Q(e,r._$AS(e,t.values),r,n)),t}class X{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,n=(e?.creationScope??C).importNode(t,!0);G.currentNode=n;let r=G.nextNode(),s=0,o=0,a=i[0];for(;void 0!==a;){if(s===a.index){let t;2===a.type?t=new K(r,r.nextSibling,this,e):1===a.type?t=new a.ctor(r,a.name,a.strings,this,e):6===a.type&&(t=new ne(r,this,e)),this._$AV.push(t),a=i[++o]}s!==a?.index&&(r=G.nextNode(),s++)}return G.currentNode=C,n}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}let K=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,n){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),O(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==F&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>P(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(C.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,n="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=V.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(t);else{const e=new X(n,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=Z.get(e.strings);return void 0===t&&Z.set(e.strings,t=new V(e)),t}k(t){P(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let n,r=0;for(const s of t)r===i.length?i.push(n=new e(this.O(N()),this.O(N()),this,this.options)):n=i[r],n._$AI(s),r++;r<i.length&&(this._$AR(n&&n._$AB.nextSibling,r),i.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}};class J{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,r){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,n){const r=this.strings;let s=!1;if(void 0===r)e=Q(this,e,t,0),s=!O(e)||e!==this._$AH&&e!==F,s&&(this._$AH=e);else{const n=e;let o,a;for(e=r[0],o=0;o<r.length-1;o++)a=Q(this,n[i+o],t,o),a===F&&(a=this._$AH[o]),s||=!O(a)||a!==this._$AH[o],a===W?e=W:e!==W&&(e+=(a??"")+r[o+1]),this._$AH[o]=a}s&&!n&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}let ee=class extends J{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}},te=class extends J{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}},ie=class extends J{constructor(e,t,i,n,r){super(e,t,i,n,r),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??W)===F)return;const i=this._$AH,n=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==W&&(i===W||n);n&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}};class ne{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const re=w.litHtmlPolyfillSupport;re?.(V,K),(w.litHtmlVersions??=[]).push("3.3.3");const se=globalThis;let oe=class extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const n=i?.renderBefore??t;let r=n._$litPart$;if(void 0===r){const e=i?.renderBefore??null;n._$litPart$=r=new K(t.insertBefore(N(),e),e,void 0,i??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}};oe._$litElement$=!0,oe.finalized=!0,se.litElementHydrateSupport?.({LitElement:oe});const ae=se.litElementPolyfillSupport;ae?.({LitElement:oe}),(se.litElementVersions??=[]).push("4.2.2");const le={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:k},ce=(e=le,t,i)=>{const{kind:n,metadata:r}=i;let s=globalThis.litPropertyMetadata.get(r);if(void 0===s&&globalThis.litPropertyMetadata.set(r,s=new Map),"setter"===n&&((e=Object.create(e)).wrapped=!0),s.set(i.name,e),"accessor"===n){const{name:n}=i;return{set(i){const r=t.get.call(this);t.set.call(this,i),this.requestUpdate(n,r,e,!0,i)},init(t){return void 0!==t&&this.C(n,void 0,e,t),t}}}if("setter"===n){const{name:n}=i;return function(i){const r=this[n];t.call(this,i),this.requestUpdate(n,r,e,!0,i)}}throw Error("Unsupported decorator location: "+n)};function pe(e){return(t,i)=>"object"==typeof i?ce(e,t,i):((e,t,i)=>{const n=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),n?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function he(e){return pe({...e,state:!0,attribute:!1})}const de=e=>(t,i)=>{const n=()=>{customElements.get(e)?console.info(`home-desk: <${e}> already defined — reload the page to pick up the updated panel.`):customElements.define(e,t)};void 0!==i?i.addInitializer(n):n()},ue=o`
  :host {
    --st-bg: var(--primary-background-color, #fafafa);
    --st-surface: var(--card-background-color, #fff);
    --st-fg: var(--primary-text-color, #212121);
    --st-fg-secondary: var(--secondary-text-color, #727272);
    --st-accent: var(--primary-color, #03a9f4);
    --st-divider: var(--divider-color, #e0e0e0);
    --st-danger: var(--error-color, #db4437);
    --st-warning: var(--warning-color, #ffa600);
    --st-success: var(--success-color, #43a047);
    --st-header-bg: var(--app-header-background-color, var(--st-surface));
    --st-header-fg: var(--app-header-text-color, var(--st-fg));
    --st-fs-caption: 0.75rem;
    --st-fs-small: 0.8125rem;
    --st-fs-body: 0.875rem;
    --st-fs-row: 0.9375rem;
    --st-fs-title: 1.125rem;
    --st-fs-header: 1.25rem;
    --st-r-control: 12px;
    --st-h-control: 40px;
    --st-h-field: 36px;
    --st-hover: color-mix(in srgb, var(--st-fg) 8%, transparent);
    box-sizing: border-box;
    color: var(--st-fg);
    font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
  }
  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }
  button {
    font-family: inherit;
    font-size: var(--st-fs-body);
    font-weight: 500;
    cursor: pointer;
    border: none;
    border-radius: var(--st-r-control);
    height: var(--st-h-control);
    padding: 0 16px;
    background: transparent;
    color: var(--st-accent);
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  button:hover:not(:disabled):not(.primary) {
    background-image: linear-gradient(var(--st-hover), var(--st-hover));
  }
  button:focus-visible {
    outline: 2px solid var(--st-accent);
    outline-offset: 2px;
  }
  button.primary {
    background: var(--st-accent);
    color: var(--text-primary-color, #fff);
  }
  button.primary:hover:not(:disabled) {
    filter: brightness(1.08);
  }
  button.danger {
    color: var(--st-danger);
  }
  button.plain {
    color: var(--st-fg);
    font-weight: 400;
  }
  button:disabled {
    opacity: 0.4;
    cursor: default;
  }
  button.icon {
    width: 48px;
    height: 48px;
    padding: 0;
    border-radius: 50%;
    justify-content: center;
    color: var(--st-fg);
  }
  button.icon ha-icon {
    --mdc-icon-size: 24px;
  }
  input[type="text"],
  input[type="search"],
  select,
  textarea {
    font-family: inherit;
    font-size: var(--st-fs-body);
    color: var(--st-fg);
    background: var(--st-surface);
    border: 1px solid var(--st-divider);
    border-radius: var(--st-r-control);
  }
  input[type="text"],
  input[type="search"],
  select {
    height: var(--st-h-field);
    padding: 0 12px;
  }
  select {
    padding-right: 4px;
  }
  textarea {
    padding: 10px 12px;
    resize: vertical;
    line-height: 1.5;
  }
  input:focus-visible,
  select:focus-visible,
  textarea:focus-visible {
    outline: 2px solid var(--st-accent);
    outline-offset: -1px;
    border-color: transparent;
  }
  ha-icon {
    --mdc-icon-size: 20px;
  }
  /* Tag chip: a tinted background with a solid dot in the tag's colour. */
  .tag {
    --tag-color: var(--st-fg-secondary);
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 24px;
    padding: 0 10px 0 8px;
    border-radius: 8px;
    font-size: var(--st-fs-caption);
    font-weight: 400;
    color: var(--st-fg);
    background: color-mix(in srgb, var(--tag-color) 22%, transparent);
    white-space: nowrap;
  }
  .tag::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--tag-color);
    flex: none;
  }
  /* Rendered markdown (descriptions and comments). */
  .md {
    font-size: var(--st-fs-row);
    line-height: 1.55;
    overflow-wrap: anywhere;
  }
  .md > :first-child {
    margin-top: 0;
  }
  .md > :last-child {
    margin-bottom: 0;
  }
  .md p,
  .md ul,
  .md ol,
  .md pre,
  .md blockquote,
  .md table {
    margin: 0.6em 0;
  }
  .md ul,
  .md ol {
    padding-left: 1.4em;
  }
  .md li {
    margin: 0.2em 0;
  }
  .md a {
    color: var(--st-accent);
  }
  .md code {
    font-family: var(--code-font-family, monospace);
    font-size: 0.875em;
    padding: 1px 5px;
    border-radius: 4px;
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
  }
  .md pre {
    overflow-x: auto;
    padding: 10px 12px;
    border-radius: 8px;
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
  }
  .md pre code {
    padding: 0;
    background: none;
  }
  .md blockquote {
    padding-left: 12px;
    border-left: 3px solid var(--st-divider);
    color: var(--st-fg-secondary);
  }
  .md table {
    border-collapse: collapse;
    display: block;
    overflow-x: auto;
  }
  .md th,
  .md td {
    border: 1px solid var(--st-divider);
    padding: 4px 8px;
    text-align: left;
  }
  .md h1,
  .md h2,
  .md h3,
  .md h4 {
    font-size: var(--st-fs-row);
    font-weight: 500;
    margin: 1em 0 0.4em;
  }
  .md del {
    color: var(--st-fg-secondary);
  }
`;class ge{constructor(e){this.hass=e}send(e,t={}){return this.hass.connection.sendMessagePromise({type:`home_desk/${e}`,...t})}async list(e){return(await this.send("list",{status:"all",...e?{q:e}:{}})).tickets}async tags(){return(await this.send("tags")).tags}createTag(e,t){return this.send("tag_create",{name:e,...t?{color:t}:{}})}updateTag(e,t){return this.send("tag_update",{tag_id:e,...t})}deleteTag(e){return this.send("tag_delete",{tag_id:e})}get(e){return this.send("get",{ticket_id:e})}create(e){return this.send("create",{...e})}update(e,t){return this.send("update",{ticket_id:e,...t})}comment(e,t,i){return this.send("comment",{ticket_id:e,body:t,internal:i})}close(e,t,i){return this.send("close",{ticket_id:e,resolution:t,status:i})}subscribe(e){return this.hass.connection.subscribeEvents(e,"home_desk_event")}}const fe=["new","open","in_progress","waiting","resolved","closed"],me=["issue","request","idea","task","question","log"],be=["low","normal","high","urgent"],ye=["primary","accent","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","light-grey","grey","blue-grey"],xe=["new","open","in_progress","waiting"],ke={new:"New",open:"Open",in_progress:"In progress",waiting:"Waiting",resolved:"Resolved",closed:"Closed"},ve={issue:"Issue",request:"Request",idea:"Idea",task:"Task",question:"Question",log:"History"},_e={low:"Low",normal:"Normal",high:"High",urgent:"Urgent"},we={issue:"mdi:alert-circle-outline",request:"mdi:hand-wave-outline",idea:"mdi:lightbulb-outline",task:"mdi:checkbox-marked-circle-outline",question:"mdi:help-circle-outline",log:"mdi:history"},$e=[["year",31536e3],["month",2592e3],["day",86400],["hour",3600],["minute",60]];function Ae(e,t){const i=(new Date(e).getTime()-Date.now())/1e3,n=new Intl.RelativeTimeFormat(t,{numeric:"auto"});for(const[e,t]of $e)if(Math.abs(i)>=t)return n.format(Math.round(i/t),e);return n.format(0,"second")}function Se(e){return e.replace(/^ai:/i,"")}const Te={primary:"#03a9f4",accent:"#ff9800",red:"#f44336",pink:"#e91e63",purple:"#9c27b0","deep-purple":"#673ab7",indigo:"#3f51b5",blue:"#2196f3","light-blue":"#03a9f4",cyan:"#00bcd4",teal:"#009688",green:"#4caf50","light-green":"#8bc34a",lime:"#cddc39",yellow:"#ffeb3b",amber:"#ffc107",orange:"#ff9800","deep-orange":"#ff5722",brown:"#795548","light-grey":"#bdbdbd",grey:"#9e9e9e","blue-grey":"#607d8b"};function Ee(e){return"primary"===e?"var(--primary-color, #03a9f4)":"accent"===e?"var(--accent-color, #ff9800)":`var(--${e}-color, ${Te[e]??"#9e9e9e"})`}function Re(e,t){return e.get(t)??{id:t,name:t,color:"grey",builtin:!1,count:0}}const ze=e=>q`<span class="tag" style="--tag-color: ${Ee(e.color)}">${e.name}</span>`;let Ce=class extends oe{constructor(){super(...arguments),this.tickets=[],this.selectedId=null,this.language=void 0,this.tagMap=new Map}_select(e){this.dispatchEvent(new CustomEvent("select-ticket",{detail:e,bubbles:!0,composed:!0}))}_chips(e){const t=e.tags.map(e=>Re(this.tagMap,e));return[...t.filter(e=>!e.builtin),...t.filter(e=>e.builtin)]}render(){return this.tickets.length?q`${this.tickets.map(e=>{const t="resolved"===e.status||"closed"===e.status;return q`
        <button
          class="row priority-${e.priority} ${t?"done":""} ${e.id===this.selectedId?"selected":""}"
          @click=${()=>this._select(e.id)}
        >
          <ha-icon class="type" .icon=${we[e.type]} title=${ve[e.type]}></ha-icon>
          <div class="body">
            <div class="title">${e.title}</div>
            <div class="meta">
              <span class="ref">#${e.id}</span>
              <span class="status s-${e.status}">${e.status.replace("_"," ")}</span>
              ${"urgent"===e.priority||"high"===e.priority?q`<span>${e.priority}</span>`:W}
              ${e.assignee?q`<span><ha-icon icon="mdi:account-outline"></ha-icon> ${e.assignee}</span>`:W}
              ${e.comment_count?q`<span><ha-icon icon="mdi:comment-outline"></ha-icon> ${e.comment_count}</span>`:W}
              <span>${Ae(e.updated_at,this.language)}</span>
            </div>
            ${e.tags.length?q`<div class="chips">
                  ${this._chips(e).slice(0,3).map(ze)}
                  ${e.tags.length>3?q`<span class="more-tags">+${e.tags.length-3}</span>`:W}
                </div>`:W}
          </div>
        </button>
      `})}`:q`<div class="empty">No tickets here.</div>`}};Ce.styles=[ue,o`
      :host {
        display: block;
        overflow-y: auto;
      }
      .row {
        display: grid;
        grid-template-columns: 24px minmax(0, 1fr);
        gap: 12px;
        width: 100%;
        height: auto;
        padding: 12px 16px;
        border-radius: 0;
        border-bottom: 1px solid var(--st-divider);
        text-align: left;
        color: var(--st-fg);
        font-weight: 400;
        align-items: start;
        position: relative;
      }
      .row.selected {
        background: color-mix(in srgb, var(--st-accent) 14%, transparent);
      }
      .row.selected::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: var(--st-accent);
      }
      .type {
        color: var(--st-fg-secondary);
        margin-top: 1px;
      }
      .priority-urgent .type {
        color: var(--st-danger);
      }
      .priority-high .type {
        color: var(--st-warning);
      }
      .body {
        min-width: 0;
      }
      .title {
        font-size: var(--st-fs-row);
        line-height: 1.35;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        overflow-wrap: anywhere;
      }
      .done .title {
        color: var(--st-fg-secondary);
      }
      .meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 4px 10px;
        margin-top: 4px;
        font-size: var(--st-fs-caption);
        color: var(--st-fg-secondary);
      }
      .meta ha-icon {
        --mdc-icon-size: 14px;
        vertical-align: -2px;
      }
      .ref {
        font-variant-numeric: tabular-nums;
      }
      .status {
        padding: 1px 8px;
        border-radius: 8px;
        background: color-mix(in srgb, var(--st-fg) 10%, transparent);
      }
      .status.s-new,
      .status.s-open {
        background: color-mix(in srgb, var(--st-accent) 20%, transparent);
        color: var(--st-accent);
      }
      .status.s-in_progress {
        background: color-mix(in srgb, var(--st-success) 22%, transparent);
        color: var(--st-success);
      }
      .status.s-waiting {
        background: color-mix(in srgb, var(--st-warning) 24%, transparent);
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        margin-top: 6px;
      }
      .more-tags {
        font-size: var(--st-fs-caption);
        color: var(--st-fg-secondary);
        line-height: 24px;
      }
      .empty {
        padding: 48px 24px;
        text-align: center;
        color: var(--st-fg-secondary);
        font-size: var(--st-fs-row);
      }
    `],e([pe({attribute:!1})],Ce.prototype,"tickets",void 0),e([pe({type:Number})],Ce.prototype,"selectedId",void 0),e([pe()],Ce.prototype,"language",void 0),e([pe({attribute:!1})],Ce.prototype,"tagMap",void 0),Ce=e([de("st-ticket-list")],Ce);const Ne=2;class Oe{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}class Pe extends Oe{constructor(e){if(super(e),this.it=W,e.type!==Ne)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===W||null==e)return this._t=void 0,this.it=e;if(e===F)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}Pe.directiveName="unsafeHTML",Pe.resultType=1;const De=(e=>(...t)=>({_$litDirective$:e,values:t}))(Pe);
/*! @license DOMPurify 3.4.17 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.17/LICENSE */function Ie(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=Array(t);i<t;i++)n[i]=e[i];return n}
/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
function Me(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var i=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=i){var n,r,s,o,a=[],l=!0,c=!1;try{if(s=(i=i.call(e)).next,0===t);else for(;!(l=(n=s.call(i)).done)&&(a.push(n.value),a.length!==t);l=!0);}catch(e){c=!0,r=e}finally{try{if(!l&&null!=i.return&&(o=i.return(),Object(o)!==o))return}finally{if(c)throw r}}return a}}(e,t)||function(e,t){if(e){if("string"==typeof e)return Ie(e,t);var i={}.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?Ie(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}const Le=Object.entries,Ue=Object.setPrototypeOf,He=Object.isFrozen,Be=Object.getPrototypeOf,je=Object.getOwnPropertyDescriptor;let qe=Object.freeze,Fe=Object.seal,We=Object.create,Ze="undefined"!=typeof Reflect&&Reflect,Ge=Ze.apply,Ye=Ze.construct;qe||(qe=function(e){return e}),Fe||(Fe=function(e){return e}),Ge||(Ge=function(e,t){for(var i=arguments.length,n=new Array(i>2?i-2:0),r=2;r<i;r++)n[r-2]=arguments[r];return e.apply(t,n)}),Ye||(Ye=function(e){for(var t=arguments.length,i=new Array(t>1?t-1:0),n=1;n<t;n++)i[n-1]=arguments[n];return new e(...i)});const Ve=xt(Array.prototype.forEach),Qe=xt(Array.prototype.lastIndexOf),Xe=xt(Array.prototype.pop),Ke=xt(Array.prototype.push),Je=xt(Array.prototype.slice),et=xt(Array.prototype.splice),tt=Array.isArray,it=kt(Set),nt=xt(Set.prototype.add),rt=xt(Set.prototype.has),st=xt(String.prototype.toLowerCase),ot=xt(String.prototype.toString),at=xt(String.prototype.match),lt=xt(String.prototype.replace),ct=xt(String.prototype.indexOf),pt=xt(String.prototype.trim),ht=xt(Number.prototype.toString),dt=xt(Boolean.prototype.toString),ut="undefined"==typeof BigInt?null:xt(BigInt.prototype.toString),gt="undefined"==typeof Symbol?null:xt(Symbol.prototype.toString),ft=xt(Object.prototype.hasOwnProperty),mt=xt(Object.prototype.toString),bt=xt(RegExp.prototype.test),yt=kt(TypeError);function xt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var i=arguments.length,n=new Array(i>1?i-1:0),r=1;r<i;r++)n[r-1]=arguments[r];return Ge(e,t,n)}}function kt(e){return function(){for(var t=arguments.length,i=new Array(t),n=0;n<t;n++)i[n]=arguments[n];return Ye(e,i)}}function vt(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:st;if(Ue&&Ue(e,null),!tt(t))return e;let n=t.length;for(;n--;){let r=t[n];if("string"==typeof r){const e=i(r);e!==r&&(He(t)||(t[n]=e),r=e)}e[r]=!0}return e}function _t(e){for(let t=0;t<e.length;t++)ft(e,t)||(e[t]=null);return e}function wt(e){const t=We(null);for(const n of Le(e)){var i=Me(n,2);const r=i[0],s=i[1];ft(e,r)&&(tt(s)?t[r]=_t(s):s&&"object"==typeof s&&s.constructor===Object?t[r]=wt(s):t[r]=s)}return t}function $t(e,t){for(;null!==e;){const i=je(e,t);if(i){if(i.get)return xt(i.get);if("function"==typeof i.value)return xt(i.value)}e=Be(e)}return function(){return null}}const At=qe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),St=qe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Tt=qe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Et=qe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Rt=qe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),zt=qe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ct=qe(["#text"]),Nt=qe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Ot=qe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Pt=qe(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Dt=qe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),It=Fe(/{{[\w\W]*|^[\w\W]*}}/g),Mt=Fe(/<%[\w\W]*|^[\w\W]*%>/g),Lt=Fe(/\${[\w\W]*/g),Ut=Fe(/^data-[\-\w.\u00B7-\uFFFF]+$/),Ht=Fe(/^aria-[\-\w]+$/),Bt=Fe(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),jt=Fe(/^(?:\w+script|data):/i),qt=Fe(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ft=Fe(/^html$/i),Wt=Fe(/^[a-z][.\w]*(-[.\w]+)+$/i),Zt=Fe(/<[/\w!]/g),Gt=Fe(/<[/\w]/g),Yt=Fe(/<\/no(script|embed|frames)/i),Vt=Fe(/\/>/i),Qt=1,Xt=3,Kt=7,Jt=8,ei=9,ti=11,ii=qe(vt({},["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"])),ni=function(){return"undefined"==typeof window?null:window},ri=function(e,t,i,n){return ft(e,t)&&tt(e[t])?vt(n.base?wt(n.base):{},e[t],n.transform):i},si=function(e,t,i){const n=ft(e,t)?e[t]:void 0;return n&&"object"==typeof n?wt(n):i()};var oi=function e(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ni();const i=t=>e(t);if(i.version="3.4.17",i.removed=[],!t||!t.document||t.document.nodeType!==ei||!t.Element)return i.isSupported=!1,i;let n=t.document;const r=n,s=r.currentScript;t.DocumentFragment;const o=t.HTMLTemplateElement,a=t.Node,l=t.Element,c=t.NodeFilter;void 0===t.NamedNodeMap&&(t.NamedNodeMap||t.MozNamedAttrMap),t.HTMLFormElement;const p=t.DOMParser,h=t.trustedTypes,d=l.prototype,u=$t(d,"cloneNode"),g=$t(d,"remove"),f=$t(d,"removeAttributeNode"),m=$t(d,"nextSibling"),b=$t(d,"childNodes"),y=$t(d,"parentNode"),x=$t(d,"shadowRoot"),k=$t(d,"attributes"),v=a&&a.prototype?$t(a.prototype,"nodeType"):null,_=a&&a.prototype?$t(a.prototype,"nodeName"):null,w=a&&a.prototype?$t(a.prototype,"ownerDocument"):null,$=function(e){return v?v(e):e.nodeType},A=function(e){return _?_(e):e.nodeName},S=function(e,t){for(;null!==e;){const i=je(e,t);if(i)return i.get?xt(i.get):null;e=Be(e)}return null}(d,"namespaceURI"),T=function(e){return S?S(e):e.namespaceURI};if("function"==typeof o){const e=n.createElement("template");e.content&&e.content.ownerDocument&&(n=e.content.ownerDocument)}let E,R,z="",C=!1,N=0;const O=function(){if(N>0)throw yt('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},P=function(e){O(),N++;try{return E.createHTML(e)}finally{N--}},D=function(){return C||(R=function(e,t){if("object"!=typeof e||"function"!=typeof e.createPolicy)return null;let i=null;const n="data-tt-policy-suffix";t&&t.hasAttribute(n)&&(i=t.getAttribute(n));const r="dompurify"+(i?"#"+i:"");try{return e.createPolicy(r,{createHTML:e=>e,createScriptURL:e=>e})}catch(e){return console.warn("TrustedTypes policy "+r+" could not be created."),null}}(h,s),C=!0),R},I=n,M=I.implementation,L=I.createNodeIterator,U=I.createDocumentFragment,H=I.getElementsByTagName,B=r.importNode;let j={afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]};i.isSupported="function"==typeof Le&&"function"==typeof y&&M&&void 0!==M.createHTMLDocument;const q=It,F=Mt,W=Lt,Z=Ut,G=Ht,Y=jt,V=qt,Q=Wt;let X=Bt,K=null;const J=vt({},[...At,...St,...Tt,...Rt,...Ct]);let ee=null;const te=vt({},[...Nt,...Ot,...Pt,...Dt]);let ie=Object.seal(We(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ne=null,re=null;const se=Object.seal(We(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let oe=!0,ae=!0,le=!1,ce=!0,pe=!1,he=!0,de=!1,ue=!1,ge=null,fe=null,me=!1,be=!1,ye=!1,xe=!1,ke=!0,ve=!1;const _e="user-content-";let we=!0,$e=!1,Ae=null,Se={},Te=null;const Ee=vt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let Re=null;const ze=vt({},["audio","video","img","source","image","track"]);let Ce=null;const Ne=vt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Oe="http://www.w3.org/1998/Math/MathML",Pe="http://www.w3.org/2000/svg",De="http://www.w3.org/1999/xhtml";let Ie=De,Me=!1,Ue=null;const He=vt({},[Oe,Pe,De],ot),Ze=qe(["mi","mo","mn","ms","mtext"]);let Ge=vt({},Ze);const Ye=qe(["annotation-xml"]);let kt=vt({},Ye);const _t=vt({},["title","style","font","a","script"]);let oi=null;const ai=["application/xhtml+xml","text/html"];let li=null,ci=null;const pi=n.createElement("form"),hi=function(e){return e instanceof RegExp||e instanceof Function},di=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(ci&&ci===e)return;e&&"object"==typeof e||(e={}),e=wt(e),oi=-1===ai.indexOf(e.PARSER_MEDIA_TYPE)?"text/html":e.PARSER_MEDIA_TYPE,li="application/xhtml+xml"===oi?ot:st,K=ri(e,"ALLOWED_TAGS",J,{transform:li}),ee=ri(e,"ALLOWED_ATTR",te,{transform:li}),Ue=ri(e,"ALLOWED_NAMESPACES",He,{transform:ot}),Ce=ri(e,"ADD_URI_SAFE_ATTR",Ne,{transform:li,base:Ne}),Re=ri(e,"ADD_DATA_URI_TAGS",ze,{transform:li,base:ze}),Te=ri(e,"FORBID_CONTENTS",Ee,{transform:li}),ne=ri(e,"FORBID_TAGS",wt({}),{transform:li}),re=ri(e,"FORBID_ATTR",wt({}),{transform:li}),Se=!!ft(e,"USE_PROFILES")&&(e.USE_PROFILES&&"object"==typeof e.USE_PROFILES?wt(e.USE_PROFILES):e.USE_PROFILES),oe=!1!==e.ALLOW_ARIA_ATTR,ae=!1!==e.ALLOW_DATA_ATTR,le=e.ALLOW_UNKNOWN_PROTOCOLS||!1,ce=!1!==e.ALLOW_SELF_CLOSE_IN_ATTR,pe=e.SAFE_FOR_TEMPLATES||!1,he=!1!==e.SAFE_FOR_XML,de=e.WHOLE_DOCUMENT||!1,be=e.RETURN_DOM||!1,ye=e.RETURN_DOM_FRAGMENT||!1,xe=e.RETURN_TRUSTED_TYPE||!1,me=e.FORCE_BODY||!1,ke=!1!==e.SANITIZE_DOM,ve=e.SANITIZE_NAMED_PROPS||!1,we=!1!==e.KEEP_CONTENT,$e=e.IN_PLACE||!1,X=function(e){try{return bt(e,""),!0}catch(e){return!1}}(e.ALLOWED_URI_REGEXP)?e.ALLOWED_URI_REGEXP:Bt,Ie="string"==typeof e.NAMESPACE?e.NAMESPACE:De,Ge=si(e,"MATHML_TEXT_INTEGRATION_POINTS",()=>vt({},Ze)),kt=si(e,"HTML_INTEGRATION_POINTS",()=>vt({},Ye));const t=si(e,"CUSTOM_ELEMENT_HANDLING",()=>We(null));if(ie=We(null),ft(t,"tagNameCheck")&&hi(t.tagNameCheck)&&(ie.tagNameCheck=t.tagNameCheck),ft(t,"attributeNameCheck")&&hi(t.attributeNameCheck)&&(ie.attributeNameCheck=t.attributeNameCheck),ft(t,"allowCustomizedBuiltInElements")&&"boolean"==typeof t.allowCustomizedBuiltInElements&&(ie.allowCustomizedBuiltInElements=t.allowCustomizedBuiltInElements),Fe(ie),pe&&(ae=!1),ye&&(be=!0),Se&&(K=vt({},Ct),ee=We(null),!0===Se.html&&(vt(K,At),vt(ee,Nt)),!0===Se.svg&&(vt(K,St),vt(ee,Ot),vt(ee,Dt)),!0===Se.svgFilters&&(vt(K,Tt),vt(ee,Ot),vt(ee,Dt)),!0===Se.mathMl&&(vt(K,Rt),vt(ee,Pt),vt(ee,Dt))),se.tagCheck=null,se.attributeCheck=null,ft(e,"ADD_TAGS")&&("function"==typeof e.ADD_TAGS?se.tagCheck=e.ADD_TAGS:tt(e.ADD_TAGS)&&(K===J&&(K=wt(K)),vt(K,e.ADD_TAGS,li))),ft(e,"ADD_ATTR")&&("function"==typeof e.ADD_ATTR?se.attributeCheck=e.ADD_ATTR:tt(e.ADD_ATTR)&&(ee===te&&(ee=wt(ee)),vt(ee,e.ADD_ATTR,li))),ft(e,"ADD_FORBID_CONTENTS")&&tt(e.ADD_FORBID_CONTENTS)&&(Te===Ee&&(Te=wt(Te)),vt(Te,e.ADD_FORBID_CONTENTS,li)),we&&(K["#text"]=!0),de&&vt(K,["html","head","body"]),K.table&&(vt(K,["tbody"]),delete ne.tbody),e.TRUSTED_TYPES_POLICY){if("function"!=typeof e.TRUSTED_TYPES_POLICY.createHTML)throw yt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if("function"!=typeof e.TRUSTED_TYPES_POLICY.createScriptURL)throw yt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const t=E;E=e.TRUSTED_TYPES_POLICY;try{z=P("")}catch(e){throw E=t,e}}else null===e.TRUSTED_TYPES_POLICY?(E=void 0,z=""):(void 0===E&&(E=D()),E&&"string"==typeof z&&(z=P("")));qe&&qe(e),ci=e},ui=vt({},[...St,...Tt,...Et]),gi=vt({},[...Rt,...zt]),fi=function(e){const t=T(e),i=st(A(e)),n=y(e);let r,s;return n&&$(n)===Qt?(r={namespaceURI:T(n)},s=st(A(n))):(r={namespaceURI:Ie},s="template"),!!Ue[t]&&(t===Pe?function(e,t,i){return t.namespaceURI===De?"svg"===e:t.namespaceURI===Oe?"svg"===e&&("annotation-xml"===i||Ge[i]):Boolean(ui[e])}(i,r,s):t===Oe?function(e,t,i){return t.namespaceURI===De?"math"===e:t.namespaceURI===Pe?"math"===e&&kt[i]:Boolean(gi[e])}(i,r,s):t===De?function(e,t,i){return!(t.namespaceURI===Pe&&!kt[i])&&!(t.namespaceURI===Oe&&!Ge[i])&&!gi[e]&&(_t[e]||!ui[e])}(i,r,s):!("application/xhtml+xml"!==oi||!Ue[t]))},mi=function(e){Ke(i.removed,{element:e});try{y(e).removeChild(e)}catch(t){if(g(e),!y(e))throw yt("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},bi=function(e,t,i){try{f(e,t)}catch(t){try{e.removeAttribute(i)}catch(e){}}},yi=function(e){_i(e);const t=b(e);t&&Ve(Je(t),e=>{try{g(e)}catch(e){}});const i=$(e)===Qt?k(e):null;if(i)for(let t=i.length-1;t>=0;--t){const n=i[t],r=n&&n.name;"string"==typeof r&&bi(e,n,r)}},xi=function(e,t,n){if(!n)try{n=t.getAttributeNode(e)}catch(e){n=null}Ke(i.removed,{attribute:n||null,from:t});try{n?f(t,n):t.removeAttribute(e)}catch(i){try{t.removeAttribute(e)}catch(e){}}if("is"===e)if(be||ye)try{mi(t)}catch(e){}else try{t.setAttribute(e,"")}catch(e){}},ki=function(e){const t=k(e);if(t)for(let i=t.length-1;i>=0;--i){const n=t[i],r=n&&n.name;"string"!=typeof r||ee[li(r)]||bi(e,n,r)}},vi=function(e,t){let i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];const n=[e];for(;n.length>0;){const e=n.pop();if(!1===t(e))continue;if(i&&$(e)===Qt){const t=x(e);Oi(t)&&n.push(t)}const r=b(e);if(r)for(let e=r.length-1;e>=0;--e)n.push(r[e])}},_i=function(e){vi(e,e=>{$(e)===Qt&&ki(e)})},wi=function(e){const t=[];return vi(e,e=>{t.push(e)},!0),t},$i=function(e,t){let n=!1;return Ve(i.removed,t=>{t.element&&(n=n||t.element===e,_i(t.element))}),function(e,t){const i=it();Ve(wi(e),e=>{$(e)===Qt&&nt(i,e)}),Ve(t,e=>{$(e)!==Qt||rt(i,e)||ki(e)})}(e,t),n},Ai=function(e,t,i,n){const r=Ei(e);let s;for(;s=r.nextNode();)rt(n,s)&&!rt(Ae,s)&&(t&&Di(j.uponSanitizeShadowNode,s,null),Ui(s,i),Zi(s,i),Oi(s.content)&&Gi(s.content))},Si=function(e,t){return!!he&&("patchsrc"===e||"for"===e&&"label"!==t&&"output"!==t)},Ti=function(e){let t=null,i=null;if(me)e="<remove></remove>"+e;else{const t=at(e,/^[\r\n\t ]+/);i=t&&t[0]}"application/xhtml+xml"===oi&&Ie===De&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const r=E?P(e):e;if(Ie===De)try{t=(new p).parseFromString(r,oi)}catch(e){}if(!t||!t.documentElement){t=M.createDocument(Ie,"template",null);try{t.documentElement.innerHTML=Me?z:r}catch(e){}}const s=t.body||t.documentElement;return e&&i&&s.insertBefore(n.createTextNode(i),s.childNodes[0]||null),Ie===De?H.call(t,de?"html":"body")[0]:de?t.documentElement:s},Ei=function(e){const t=w?w(e):e.ownerDocument;return L.call(t||e,e,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Ri=function(e){return e=lt(e,q," "),e=lt(e,F," "),e=lt(e,W," ")},zi=function(e){var t;Ci(e);const i=null===(t=e.querySelectorAll)||void 0===t?void 0:t.call(e,"template");i&&Ve(i,e=>{Oi(e.content)&&zi(e.content)})},Ci=function(e){e.normalize();const t=w?w(e):e.ownerDocument,i=L.call(t||e,e,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null);let n=i.nextNode();for(;n;)n.data=Ri(n.data),n=i.nextNode()},Ni=function(e){const t=_?_(e):null;return"string"==typeof t&&("form"===li(t)&&("string"!=typeof e.nodeName||"string"!=typeof e.textContent||"function"!=typeof e.removeChild||e.attributes!==k(e)||"function"!=typeof e.removeAttribute||"function"!=typeof e.removeAttributeNode||"function"!=typeof e.getAttributeNode||"function"!=typeof e.setAttribute||"string"!=typeof e.namespaceURI||"function"!=typeof e.insertBefore||"function"!=typeof e.hasChildNodes||e.nodeType!==v(e)||e.childNodes!==b(e)))},Oi=function(e){if(!v||"object"!=typeof e||null===e)return!1;try{return v(e)===ti}catch(e){return!1}},Pi=function(e){if(!v||"object"!=typeof e||null===e)return!1;try{return"number"==typeof v(e)}catch(e){return!1}};function Di(e,t,n){0!==e.length&&Ve(e,e=>{e.call(i,t,n,ci)})}const Ii=function(e,t){if(e instanceof RegExp)return bt(e,t);if(e instanceof Function){for(var i=arguments.length,n=new Array(i>2?i-2:0),r=2;r<i;r++)n[r-2]=arguments[r];return Boolean(e(t,...n))}return!1},Mi=function(e,t,i,n){return 0===e.length?t:t===i||t===n?wt(t):t},Li=function(e,t){return e!==t&&null===y(e)&&($e&&_i(e),!0)},Ui=function(e,t){var n;if(n=e,Ae&&nt(Ae,n),Di(j.beforeSanitizeElements,e,null),Li(e,t))return!0;if(Ni(e))return mi(e),!0;const r=li(A(e));if(K=Mi(j.uponSanitizeElement,K,J,ge),Di(j.uponSanitizeElement,e,{tagName:r,allowedTags:K}),Li(e,t))return!0;if(function(e,t){return!!(he&&e.hasChildNodes()&&!Pi(e.firstElementChild)&&bt(Zt,e.textContent)&&bt(Zt,e.innerHTML))||!!(he&&ii[t]&&$(e)===Qt&&T(e)===De&&(Pi(e.firstElementChild)||"string"==typeof e.textContent&&bt(Zt,e.textContent)))||e.nodeType===Kt||!(!he||e.nodeType!==Jt||!bt(Gt,e.data))}(e,r))return mi(e),!0;if(ne[r]||!(se.tagCheck instanceof Function&&se.tagCheck(r))&&!K[r]){const i=function(e,t,i){if(!ne[t]&&ji(t)&&Ii(ie.tagNameCheck,t))return!1;if(we&&!Te[t]&&!Te[st(t)]){const t=y(e),n=b(e);if(n&&t)for(let r=n.length-1;r>=0;--r){const s=e===i?u(n[r],!0):n[r];t.insertBefore(s,m(e))}}return mi(e),!0}(e,r,t);return!(!1!==i||(Di(j.afterSanitizeElements,e,null),!Li(e,t)))||i}if($(e)===Qt&&!fi(e))return mi(e),!0;if(("noscript"===r||"noembed"===r||"noframes"===r)&&bt(Yt,e.innerHTML))return mi(e),!0;if(pe&&e.nodeType===Xt){const t=Ri(e.textContent);e.textContent!==t&&(Ke(i.removed,{element:e.cloneNode()}),e.textContent=t)}return Di(j.afterSanitizeElements,e,null),Li(e,t)},Hi=function(e,t,i){if(re[t])return!1;if(Si(t,e))return!1;if(ke&&("id"===t||"name"===t)&&(i in n||i in pi))return!1;const r=ee[t]||se.attributeCheck instanceof Function&&se.attributeCheck(t,e);return!(!ae||!bt(Z,t))||(!(!oe||!bt(G,t))||(r?!!Ce[t]||(!!bt(X,lt(i,V,""))||(!("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==ct(i,"data:")||!Re[e])||(!(!le||bt(Y,lt(i,V,"")))||!i))):ji(e)&&Ii(ie.tagNameCheck,e)&&Ii(ie.attributeNameCheck,t,e)||"is"===t&&ie.allowCustomizedBuiltInElements&&Ii(ie.tagNameCheck,i)))},Bi=vt({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),ji=function(e){return!Bi[st(e)]&&bt(Q,e)},qi=function(e,t,i,n){if(E&&"object"==typeof h&&"function"==typeof h.getAttributeType&&!i)switch(h.getAttributeType(e,t)){case"TrustedHTML":return P(n);case"TrustedScriptURL":return function(e){O(),N++;try{return E.createScriptURL(e)}finally{N--}}(n)}return n},Fi=function(e,t,i,n){try{return i?e.setAttributeNS(i,t,n):e.setAttribute(t,n),!Ni(e)||(mi(e),!1)}catch(i){return xi(t,e),!1}},Wi=function(e,t){return!(!he||!bt(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,t))||"attributename"===st(e)&&null!==at(t,"href")},Zi=function(e,t){if(Di(j.beforeSanitizeAttributes,e,null),Li(e,t))return;const n=e.attributes;if(!n||Ni(e))return;ee=Mi(j.uponSanitizeAttribute,ee,te,fe);const r={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ee,forceKeepAttr:void 0};let s=n.length;const o=li(e.nodeName);for(;s--;){const t=n[s],a=t.name,l=t.namespaceURI,c=t.value,p=li(a),h=c;let d="value"===a?h:pt(h),u=!1;r.attrName=p,r.attrValue=d,r.keepAttr=!0,r.forceKeepAttr=void 0,Di(j.uponSanitizeAttribute,e,r),d=r.attrValue,!ve||"id"!==p&&"name"!==p||0===ct(d,_e)||(xi(a,e,t),d=_e+d,u=!0),Wi(a,d)?xi(a,e,t):r.forceKeepAttr||(r.keepAttr&&(ce||!bt(Vt,d))?(pe&&(d=Ri(d)),Hi(o,p,d)?(d=qi(o,p,l,d),d!==h&&Fi(e,a,l,d)&&u&&Xe(i.removed)):xi(a,e,t)):xi(a,e,t))}Di(j.afterSanitizeAttributes,e,null),Li(e,t)},Gi=function(e){let t=null;const i=Ei(e);for(Di(j.beforeSanitizeShadowDOM,e,null);t=i.nextNode();)if(Di(j.uponSanitizeShadowNode,t,null),Ui(t,e),Zi(t,e),Oi(t.content)&&Gi(t.content),$(t)===Qt){const e=x(t);Oi(e)&&(Yi(e),Gi(e))}pe&&Ci(e),Di(j.afterSanitizeShadowDOM,e,null)},Yi=function(e){const t=[{node:e,shadow:null}];for(;t.length>0;){const e=t.pop();if(e.shadow){Gi(e.shadow);continue}const i=e.node,n=$(i)===Qt,r=b(i);if(r)for(let e=r.length-1;e>=0;--e)t.push({node:r[e],shadow:null});if(n){const e=_?_(i):null;if("string"==typeof e&&"template"===li(e)){const e=i.content;Oi(e)&&t.push({node:e,shadow:null})}}if(n){const e=x(i);Oi(e)&&t.push({node:null,shadow:e},{node:e,shadow:null})}}};return i.sanitize=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=null,s=null,o=null,a=null;if(Me=!e,Me&&(e="\x3c!--\x3e"),"string"!=typeof e&&!Pi(e)&&"string"!=typeof(e=function(e){switch(typeof e){case"string":return e;case"number":return ht(e);case"boolean":return dt(e);case"bigint":return ut?ut(e):"0";case"symbol":return gt?gt(e):"Symbol()";case"undefined":default:return mt(e);case"function":case"object":{if(null===e)return mt(e);const t=e,i=$t(t,"toString");if("function"==typeof i){const e=i(t);return"string"==typeof e?e:mt(e)}return mt(e)}}}(e)))throw yt("dirty is not a string, aborting");if(!i.isSupported)return e;ue?(K=ge,ee=fe):di(t),(j.uponSanitizeElement.length>0||j.uponSanitizeAttribute.length>0)&&(K=wt(K)),j.uponSanitizeAttribute.length>0&&(ee=wt(ee)),i.removed=[];const l=$e&&"string"!=typeof e&&Pi(e);let c=[];const p=Ae;if(l){h=e,he&&vi(h,e=>{const t=$(e);if(t===Kt||t===Jt&&bt(Gt,e.data)){try{g(e)}catch(e){}return!1}if(t===Qt){const t=e,i=li(A(e));try{t.hasAttribute&&t.hasAttribute("patchsrc")&&t.removeAttribute("patchsrc"),t.hasAttribute&&t.hasAttribute("for")&&Si("for",i)&&t.removeAttribute("for")}catch(e){}}return!0});const t=A(e);if("string"==typeof t){const i=li(t);if(!K[i]||ne[i])throw yi(e),yt("root node is forbidden and cannot be sanitized in-place")}if(Ni(e))throw yi(e),yt("root node is clobbered and cannot be sanitized in-place");c=wi(e),Ae=it()}else if(Pi(e))n=Ti("\x3c!----\x3e"),s=n.ownerDocument.importNode(e,!0),s.nodeType===Qt&&"BODY"===s.nodeName||"HTML"===s.nodeName?n=s:n.appendChild(s),Yi(n);else{if(!be&&!pe&&!de&&-1===e.indexOf("<"))return E&&xe?P(e):e;if(n=Ti(e),!n)return be?null:xe?z:""}var h;n&&me&&mi(n.firstChild);const d=l?e:n;try{l&&Yi(e);const t=Ei(d);for(;o=t.nextNode();)Ui(o,d),Zi(o,d),Oi(o.content)&&Gi(o.content);l&&function(e,t){const i=Ae;let n=null;const r=()=>(n||(n=it(),Ve(t,e=>{nt(n,e)})),n);for(let t=0;;t++){const n=wi(e),s=[e];let o=!1;if(Ve(n,e=>{$(e)===ti?Ke(s,e):o||rt(i,e)||(o=rt(r(),e))}),!o)return;if(t>=8)throw yt("the tree kept changing during in-place sanitization; refusing to return it");Ve(s,(t,i)=>{Ai(t,i>0,e,r())})}}(e,c)}catch(t){throw l&&(yi(e),$i(e,c)),t}finally{Ae=p}if(l){if($i(e,c))throw yt("a node selected for removal could not be safely returned; refusing to sanitize in place");return pe&&zi(e),e}if(be){if(pe&&zi(n),ye)for(a=U.call(n.ownerDocument);n.firstChild;)a.appendChild(n.firstChild);else a=n;return(ee.shadowroot||ee.shadowrootmode)&&(a=B.call(r,a,!0)),a}let u=de?n.outerHTML:n.innerHTML;return de&&K["!doctype"]&&n.ownerDocument&&n.ownerDocument.doctype&&n.ownerDocument.doctype.name&&bt(Ft,n.ownerDocument.doctype.name)&&(u="<!DOCTYPE "+n.ownerDocument.doctype.name+">\n"+u),pe&&(u=Ri(u)),E&&xe?P(u):u},i.setConfig=function(){di(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}),ue=!0,ge=K,fe=ee},i.clearConfig=function(){ci=null,ue=!1,ge=null,fe=null,E=R,z=""},i.isValidAttribute=function(e,t,i){ci||di({});const n=li(e),r=li(t);return("string"!=typeof i||!(Wi(t,i)||!ce&&bt(Vt,i)))&&Hi(n,r,i)},i.addHook=function(e,t){"function"==typeof t&&ft(j,e)&&Ke(j[e],t)},i.removeHook=function(e,t){if(ft(j,e)){if(void 0!==t){const i=Qe(j[e],t);return-1===i?void 0:et(j[e],i,1)[0]}return Xe(j[e])}},i.removeHooks=function(e){ft(j,e)&&(j[e]=[])},i.removeAllHooks=function(){j={afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},i}();function ai(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var li={async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null};function ci(e){li=e}var pi={exec:()=>null};function hi(e,t=""){let i="string"==typeof e?e:e.source,n={replace:(e,t)=>{let r="string"==typeof t?t:t.source;return r=r.replace(ui.caret,"$1"),i=i.replace(e,r),n},getRegex:()=>new RegExp(i,t)};return n}var di=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),ui={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[\t ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},gi=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,fi=/(?:[*+-]|\d{1,9}[.)])/,mi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,bi=hi(mi).replace(/bull/g,fi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),yi=hi(mi).replace(/bull/g,fi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),xi=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ki=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,vi=hi(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ki).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),_i=hi(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,fi).getRegex(),wi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",$i=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Ai=hi("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$))","i").replace("comment",$i).replace("tag",wi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Si=hi(xi).replace("hr",gi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",wi).getRegex(),Ti={blockquote:hi(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Si).getRegex(),code:/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,def:vi,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,hr:gi,html:Ai,lheading:bi,list:_i,newline:/^(?:[ \t]*(?:\n|$))+/,paragraph:Si,table:pi,text:/^[^\n]+/},Ei=hi("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",gi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}\t)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",wi).getRegex(),Ri={...Ti,lheading:yi,table:Ei,paragraph:hi(xi).replace("hr",gi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ei).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",wi).getRegex()},zi={...Ti,html:hi("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",$i).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:pi,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:hi(xi).replace("hr",gi).replace("heading"," *#{1,6} *[^\n]").replace("lheading",bi).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Ci=/^( {2,}|\\)\n(?!\s*$)/,Ni=/[\p{P}\p{S}]/u,Oi=/[\s\p{P}\p{S}]/u,Pi=/[^\s\p{P}\p{S}]/u,Di=hi(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Oi).getRegex(),Ii=/(?!~)[\p{P}\p{S}]/u,Mi=hi(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",di?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Li=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ui=hi(Li,"u").replace(/punct/g,Ni).getRegex(),Hi=hi(Li,"u").replace(/punct/g,Ii).getRegex(),Bi="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",ji=hi(Bi,"gu").replace(/notPunctSpace/g,Pi).replace(/punctSpace/g,Oi).replace(/punct/g,Ni).getRegex(),qi=hi(Bi,"gu").replace(/notPunctSpace/g,/(?:[^\s\p{P}\p{S}]|~)/u).replace(/punctSpace/g,/(?!~)[\s\p{P}\p{S}]/u).replace(/punct/g,Ii).getRegex(),Fi=hi("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Pi).replace(/punctSpace/g,Oi).replace(/punct/g,Ni).getRegex(),Wi=hi(/\\(punct)/,"gu").replace(/punct/g,Ni).getRegex(),Zi=hi(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Gi=hi($i).replace("(?:--\x3e|$)","--\x3e").getRegex(),Yi=hi("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Gi).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Vi=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Qi=hi(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Vi).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Xi=hi(/^!?\[(label)\]\[(ref)\]/).replace("label",Vi).replace("ref",ki).getRegex(),Ki=hi(/^!?\[(ref)\](?:\[\])?/).replace("ref",ki).getRegex(),Ji=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,en={_backpedal:pi,anyPunctuation:Wi,autolink:Zi,blockSkip:Mi,br:Ci,code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,del:pi,emStrongLDelim:Ui,emStrongRDelimAst:ji,emStrongRDelimUnd:Fi,escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,link:Qi,nolink:Ki,punctuation:Di,reflink:Xi,reflinkSearch:hi("reflink|nolink(?!\\()","g").replace("reflink",Xi).replace("nolink",Ki).getRegex(),tag:Yi,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,url:pi},tn={...en,link:hi(/^!?\[(label)\]\((.*?)\)/).replace("label",Vi).getRegex(),reflink:hi(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Vi).getRegex()},nn={...en,emStrongRDelimAst:qi,emStrongLDelim:Hi,url:hi(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Ji).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:hi(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Ji).getRegex()},rn={...nn,br:hi(Ci).replace("{2,}","*").getRegex(),text:hi(nn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},sn={normal:Ti,gfm:Ri,pedantic:zi},on={normal:en,gfm:nn,breaks:rn,pedantic:tn},an={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ln=e=>an[e];function cn(e,t){if(t){if(ui.escapeTest.test(e))return e.replace(ui.escapeReplace,ln)}else if(ui.escapeTestNoEncode.test(e))return e.replace(ui.escapeReplaceNoEncode,ln);return e}function pn(e){try{e=encodeURI(e).replace(ui.percentDecode,"%")}catch{return null}return e}function hn(e,t){let i=e.replace(ui.findPipe,(e,t,i)=>{let n=!1,r=t;for(;--r>=0&&"\\"===i[r];)n=!n;return n?"|":" |"}),n=i.split(ui.splitPipe),r=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;r<n.length;r++)n[r]=n[r].trim().replace(ui.slashPipe,"|");return n}function dn(e,t,i){let n=e.length;if(0===n)return"";let r=0;for(;r<n;){if(e.charAt(n-r-1)!==t)break;r++}return e.slice(0,n-r)}function un(e,t,i,n,r){let s=t.href,o=t.title||null,a=e[1].replace(r.other.outputLinkReplace,"$1");n.state.inLink=!0;let l={type:"!"===e[0].charAt(0)?"image":"link",raw:i,href:s,title:o,text:a,tokens:n.inlineTokens(a)};return n.state.inLink=!1,l}var gn=class{options;rules;lexer;constructor(e){this.options=e||li}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let e=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?e:dn(e,"\n")}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let e=t[0],i=function(e,t,i){let n=e.match(i.other.indentCodeCompensation);if(null===n)return t;let r=n[1];return t.split("\n").map(e=>{let t=e.match(i.other.beginningSpace);if(null===t)return e;let[n]=t;return n.length>=r.length?e.slice(r.length):e}).join("\n")}(e,t[3]||"",this.rules);return{type:"code",raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let t=dn(e,"#");(this.options.pedantic||!t||this.rules.other.endingSpaceChar.test(t))&&(e=t.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:dn(t[0],"\n")}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let e=dn(t[0],"\n").split("\n"),i="",n="",r=[];for(;e.length>0;){let t,s=!1,o=[];for(t=0;t<e.length;t++)if(this.rules.other.blockquoteStart.test(e[t]))o.push(e[t]),s=!0;else{if(s)break;o.push(e[t])}e=e.slice(t);let a=o.join("\n"),l=a.replace(this.rules.other.blockquoteSetextReplace,"\n    $1").replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}\n${a}`:a,n=n?`${n}\n${l}`:l;let c=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(l,r,!0),this.lexer.state.top=c,0===e.length)break;let p=r.at(-1);if("code"===p?.type)break;if("blockquote"===p?.type){let t=p,s=t.raw+"\n"+e.join("\n"),o=this.blockquote(s);r[r.length-1]=o,i=i.substring(0,i.length-t.raw.length)+o.raw,n=n.substring(0,n.length-t.text.length)+o.text;break}if("list"===p?.type){let t=p,s=t.raw+"\n"+e.join("\n"),o=this.list(s);r[r.length-1]=o,i=i.substring(0,i.length-p.raw.length)+o.raw,n=n.substring(0,n.length-t.raw.length)+o.raw,e=s.substring(r.at(-1).raw.length).split("\n");continue}}return{type:"blockquote",raw:i,tokens:r,text:n}}}list(e){let t=this.rules.block.list.exec(e);if(t){let i=t[1].trim(),n=i.length>1,r={type:"list",raw:"",ordered:n,start:n?+i.slice(0,-1):"",loose:!1,items:[]};i=n?`\\d{1,9}\\${i.slice(-1)}`:`\\${i}`,this.options.pedantic&&(i=n?i:"[*+-]");let s=this.rules.other.listItemRegex(i),o=!1;for(;e;){let i=!1,n="",a="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;n=t[0],e=e.substring(n.length);let l=t[2].split("\n",1)[0].replace(this.rules.other.listReplaceTabs,e=>" ".repeat(3*e.length)),c=e.split("\n",1)[0],p=!l.trim(),h=0;if(this.options.pedantic?(h=2,a=l.trimStart()):p?h=t[1].length+1:(h=t[2].search(this.rules.other.nonSpaceChar),h=h>4?1:h,a=l.slice(h),h+=t[1].length),p&&this.rules.other.blankLine.test(c)&&(n+=c+"\n",e=e.substring(c.length+1),i=!0),!i){let t=this.rules.other.nextBulletRegex(h),i=this.rules.other.hrRegex(h),r=this.rules.other.fencesBeginRegex(h),s=this.rules.other.headingBeginRegex(h),o=this.rules.other.htmlBeginRegex(h);for(;e;){let d,u=e.split("\n",1)[0];if(c=u,this.options.pedantic?(c=c.replace(this.rules.other.listReplaceNesting,"  "),d=c):d=c.replace(this.rules.other.tabCharGlobal,"    "),r.test(c)||s.test(c)||o.test(c)||t.test(c)||i.test(c))break;if(d.search(this.rules.other.nonSpaceChar)>=h||!c.trim())a+="\n"+d.slice(h);else{if(p||l.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||r.test(l)||s.test(l)||i.test(l))break;a+="\n"+c}!p&&!c.trim()&&(p=!0),n+=u+"\n",e=e.substring(u.length+1),l=d.slice(h)}}r.loose||(o?r.loose=!0:this.rules.other.doubleBlankLine.test(n)&&(o=!0));let d,u=null;this.options.gfm&&(u=this.rules.other.listIsTask.exec(a),u&&(d="[ ] "!==u[0],a=a.replace(this.rules.other.listReplaceTask,""))),r.items.push({type:"list_item",raw:n,task:!!u,checked:d,loose:!1,text:a,tokens:[]}),r.raw+=n}let a=r.items.at(-1);if(!a)return;a.raw=a.raw.trimEnd(),a.text=a.text.trimEnd(),r.raw=r.raw.trimEnd();for(let e=0;e<r.items.length;e++)if(this.lexer.state.top=!1,r.items[e].tokens=this.lexer.blockTokens(r.items[e].text,[]),!r.loose){let t=r.items[e].tokens.filter(e=>"space"===e.type),i=t.length>0&&t.some(e=>this.rules.other.anyLine.test(e.raw));r.loose=i}if(r.loose)for(let e=0;e<r.items.length;e++)r.items[e].loose=!0;return r}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:"pre"===t[1]||"script"===t[1]||"style"===t[1],text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let e=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",n=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:e,raw:t[0],href:i,title:n}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let i=hn(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),r=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split("\n"):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(i.length===n.length){for(let e of n)this.rules.other.tableAlignRight.test(e)?s.align.push("right"):this.rules.other.tableAlignCenter.test(e)?s.align.push("center"):this.rules.other.tableAlignLeft.test(e)?s.align.push("left"):s.align.push(null);for(let e=0;e<i.length;e++)s.header.push({text:i[e],tokens:this.lexer.inline(i[e]),header:!0,align:s.align[e]});for(let e of r)s.rows.push(hn(e,s.header.length).map((e,t)=>({text:e,tokens:this.lexer.inline(e),header:!1,align:s.align[t]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:"="===t[2].charAt(0)?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let e="\n"===t[1].charAt(t[1].length-1)?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let e=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(e)){if(!this.rules.other.endAngleBracket.test(e))return;let t=dn(e.slice(0,-1),"\\");if((e.length-t.length)%2==0)return}else{let e=function(e,t){if(-1===e.indexOf(t[1]))return-1;let i=0;for(let n=0;n<e.length;n++)if("\\"===e[n])n++;else if(e[n]===t[0])i++;else if(e[n]===t[1]&&(i--,i<0))return n;return i>0?-2:-1}(t[2],"()");if(-2===e)return;if(e>-1){let i=(0===t[0].indexOf("!")?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let i=t[2],n="";if(this.options.pedantic){let e=this.rules.other.pedanticHrefTitle.exec(i);e&&(i=e[1],n=e[3])}else n=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(i=this.options.pedantic&&!this.rules.other.endAngleBracket.test(e)?i.slice(1):i.slice(1,-1)),un(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:n&&n.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let i;if((i=this.rules.inline.reflink.exec(e))||(i=this.rules.inline.nolink.exec(e))){let e=t[(i[2]||i[1]).replace(this.rules.other.multipleSpaceGlobal," ").toLowerCase()];if(!e){let e=i[0].charAt(0);return{type:"text",raw:e,text:e}}return un(i,e,i[0],this.lexer,this.rules)}}emStrong(e,t,i=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&i.match(this.rules.other.unicodeAlphaNumeric))&&(!n[1]&&!n[2]||!i||this.rules.inline.punctuation.exec(i))){let i,r,s=[...n[0]].length-1,o=s,a=0,l="*"===n[0][0]?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(l.lastIndex=0,t=t.slice(-1*e.length+s);null!=(n=l.exec(t));){if(i=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!i)continue;if(r=[...i].length,n[3]||n[4]){o+=r;continue}if((n[5]||n[6])&&s%3&&!((s+r)%3)){a+=r;continue}if(o-=r,o>0)continue;r=Math.min(r,r+o+a);let t=[...n[0]][0].length,l=e.slice(0,s+n.index+t+r);if(Math.min(s,r)%2){let e=l.slice(1,-1);return{type:"em",raw:l,text:e,tokens:this.lexer.inlineTokens(e)}}let c=l.slice(2,-2);return{type:"strong",raw:l,text:c,tokens:this.lexer.inlineTokens(c)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(e),n=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return i&&n&&(e=e.substring(1,e.length-1)),{type:"codespan",raw:t[0],text:e}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let e,i;return"@"===t[2]?(e=t[1],i="mailto:"+e):(e=t[1],i=e),{type:"link",raw:t[0],text:e,href:i,tokens:[{type:"text",raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,i;if("@"===t[2])e=t[0],i="mailto:"+e;else{let n;do{n=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??""}while(n!==t[0]);e=t[0],i="www."===t[1]?"http://"+t[0]:t[0]}return{type:"link",raw:t[0],text:e,href:i,tokens:[{type:"text",raw:e,text:e}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let e=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:e}}}},fn=class e{tokens;options;state;tokenizer;inlineQueue;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||li,this.options.tokenizer=this.options.tokenizer||new gn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:ui,block:sn.normal,inline:on.normal};this.options.pedantic?(t.block=sn.pedantic,t.inline=on.pedantic):this.options.gfm&&(t.block=sn.gfm,this.options.breaks?t.inline=on.breaks:t.inline=on.gfm),this.tokenizer.rules=t}static get rules(){return{block:sn,inline:on}}static lex(t,i){return new e(i).lex(t)}static lexInline(t,i){return new e(i).inlineTokens(t)}lex(e){e=e.replace(ui.carriageReturn,"\n"),this.blockTokens(e,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let t=this.inlineQueue[e];this.inlineTokens(t.src,t.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],i=!1){for(this.options.pedantic&&(e=e.replace(ui.tabCharGlobal,"    ").replace(ui.spaceLine,""));e;){let n;if(this.options.extensions?.block?.some(i=>!!(n=i.call({lexer:this},e,t))&&(e=e.substring(n.raw.length),t.push(n),!0)))continue;if(n=this.tokenizer.space(e)){e=e.substring(n.raw.length);let i=t.at(-1);1===n.raw.length&&void 0!==i?i.raw+="\n":t.push(n);continue}if(n=this.tokenizer.code(e)){e=e.substring(n.raw.length);let i=t.at(-1);"paragraph"===i?.type||"text"===i?.type?(i.raw+=(i.raw.endsWith("\n")?"":"\n")+n.raw,i.text+="\n"+n.text,this.inlineQueue.at(-1).src=i.text):t.push(n);continue}if(n=this.tokenizer.fences(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.heading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.hr(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.blockquote(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.list(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.html(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.def(e)){e=e.substring(n.raw.length);let i=t.at(-1);"paragraph"===i?.type||"text"===i?.type?(i.raw+=(i.raw.endsWith("\n")?"":"\n")+n.raw,i.text+="\n"+n.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title},t.push(n));continue}if(n=this.tokenizer.table(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.lheading(e)){e=e.substring(n.raw.length),t.push(n);continue}let r=e;if(this.options.extensions?.startBlock){let t,i=1/0,n=e.slice(1);this.options.extensions.startBlock.forEach(e=>{t=e.call({lexer:this},n),"number"==typeof t&&t>=0&&(i=Math.min(i,t))}),i<1/0&&i>=0&&(r=e.substring(0,i+1))}if(this.state.top&&(n=this.tokenizer.paragraph(r))){let s=t.at(-1);i&&"paragraph"===s?.type?(s.raw+=(s.raw.endsWith("\n")?"":"\n")+n.raw,s.text+="\n"+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):t.push(n),i=r.length!==e.length,e=e.substring(n.raw.length);continue}if(n=this.tokenizer.text(e)){e=e.substring(n.raw.length);let i=t.at(-1);"text"===i?.type?(i.raw+=(i.raw.endsWith("\n")?"":"\n")+n.raw,i.text+="\n"+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):t.push(n);continue}if(e){let t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw new Error(t)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let i,n=e,r=null;if(this.tokens.links){let e=Object.keys(this.tokens.links);if(e.length>0)for(;null!=(r=this.tokenizer.rules.inline.reflinkSearch.exec(n));)e.includes(r[0].slice(r[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,r.index)+"["+"a".repeat(r[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!=(r=this.tokenizer.rules.inline.anyPunctuation.exec(n));)n=n.slice(0,r.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;null!=(r=this.tokenizer.rules.inline.blockSkip.exec(n));)i=r[2]?r[2].length:0,n=n.slice(0,r.index+i)+"["+"a".repeat(r[0].length-i-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let s=!1,o="";for(;e;){let i;if(s||(o=""),s=!1,this.options.extensions?.inline?.some(n=>!!(i=n.call({lexer:this},e,t))&&(e=e.substring(i.raw.length),t.push(i),!0)))continue;if(i=this.tokenizer.escape(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.tag(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.link(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(i.raw.length);let n=t.at(-1);"text"===i.type&&"text"===n?.type?(n.raw+=i.raw,n.text+=i.text):t.push(i);continue}if(i=this.tokenizer.emStrong(e,n,o)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.codespan(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.br(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.del(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.autolink(e)){e=e.substring(i.raw.length),t.push(i);continue}if(!this.state.inLink&&(i=this.tokenizer.url(e))){e=e.substring(i.raw.length),t.push(i);continue}let r=e;if(this.options.extensions?.startInline){let t,i=1/0,n=e.slice(1);this.options.extensions.startInline.forEach(e=>{t=e.call({lexer:this},n),"number"==typeof t&&t>=0&&(i=Math.min(i,t))}),i<1/0&&i>=0&&(r=e.substring(0,i+1))}if(i=this.tokenizer.inlineText(r)){e=e.substring(i.raw.length),"_"!==i.raw.slice(-1)&&(o=i.raw.slice(-1)),s=!0;let n=t.at(-1);"text"===n?.type?(n.raw+=i.raw,n.text+=i.text):t.push(i);continue}if(e){let t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw new Error(t)}}return t}},mn=class{options;parser;constructor(e){this.options=e||li}space(e){return""}code({text:e,lang:t,escaped:i}){let n=(t||"").match(ui.notSpaceStart)?.[0],r=e.replace(ui.endingNewline,"")+"\n";return n?'<pre><code class="language-'+cn(n)+'">'+(i?r:cn(r,!0))+"</code></pre>\n":"<pre><code>"+(i?r:cn(r,!0))+"</code></pre>\n"}blockquote({tokens:e}){return`<blockquote>\n${this.parser.parse(e)}</blockquote>\n`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>\n`}hr(e){return"<hr>\n"}list(e){let t=e.ordered,i=e.start,n="";for(let t=0;t<e.items.length;t++){let i=e.items[t];n+=this.listitem(i)}let r=t?"ol":"ul";return"<"+r+(t&&1!==i?' start="'+i+'"':"")+">\n"+n+"</"+r+">\n"}listitem(e){let t="";if(e.task){let i=this.checkbox({checked:!!e.checked});e.loose?"paragraph"===e.tokens[0]?.type?(e.tokens[0].text=i+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&"text"===e.tokens[0].tokens[0].type&&(e.tokens[0].tokens[0].text=i+" "+cn(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):t+=i+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>\n`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>\n`}table(e){let t="",i="";for(let t=0;t<e.header.length;t++)i+=this.tablecell(e.header[t]);t+=this.tablerow({text:i});let n="";for(let t=0;t<e.rows.length;t++){let r=e.rows[t];i="";for(let e=0;e<r.length;e++)i+=this.tablecell(r[e]);n+=this.tablerow({text:i})}return n&&(n=`<tbody>${n}</tbody>`),"<table>\n<thead>\n"+t+"</thead>\n"+n+"</table>\n"}tablerow({text:e}){return`<tr>\n${e}</tr>\n`}tablecell(e){let t=this.parser.parseInline(e.tokens),i=e.header?"th":"td";return(e.align?`<${i} align="${e.align}">`:`<${i}>`)+t+`</${i}>\n`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${cn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:i}){let n=this.parser.parseInline(i),r=pn(e);if(null===r)return n;let s='<a href="'+(e=r)+'"';return t&&(s+=' title="'+cn(t)+'"'),s+=">"+n+"</a>",s}image({href:e,title:t,text:i,tokens:n}){n&&(i=this.parser.parseInline(n,this.parser.textRenderer));let r=pn(e);if(null===r)return cn(i);let s=`<img src="${e=r}" alt="${i}"`;return t&&(s+=` title="${cn(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:cn(e.text)}},bn=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},yn=class e{options;renderer;textRenderer;constructor(e){this.options=e||li,this.options.renderer=this.options.renderer||new mn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new bn}static parse(t,i){return new e(i).parse(t)}static parseInline(t,i){return new e(i).parseInline(t)}parse(e,t=!0){let i="";for(let n=0;n<e.length;n++){let r=e[n];if(this.options.extensions?.renderers?.[r.type]){let e=r,t=this.options.extensions.renderers[e.type].call({parser:this},e);if(!1!==t||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(e.type)){i+=t||"";continue}}let s=r;switch(s.type){case"space":i+=this.renderer.space(s);continue;case"hr":i+=this.renderer.hr(s);continue;case"heading":i+=this.renderer.heading(s);continue;case"code":i+=this.renderer.code(s);continue;case"table":i+=this.renderer.table(s);continue;case"blockquote":i+=this.renderer.blockquote(s);continue;case"list":i+=this.renderer.list(s);continue;case"html":i+=this.renderer.html(s);continue;case"def":i+=this.renderer.def(s);continue;case"paragraph":i+=this.renderer.paragraph(s);continue;case"text":{let r=s,o=this.renderer.text(r);for(;n+1<e.length&&"text"===e[n+1].type;)r=e[++n],o+="\n"+this.renderer.text(r);i+=t?this.renderer.paragraph({type:"paragraph",raw:o,text:o,tokens:[{type:"text",raw:o,text:o,escaped:!0}]}):o;continue}default:{let e='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(e),"";throw new Error(e)}}}return i}parseInline(e,t=this.renderer){let i="";for(let n=0;n<e.length;n++){let r=e[n];if(this.options.extensions?.renderers?.[r.type]){let e=this.options.extensions.renderers[r.type].call({parser:this},r);if(!1!==e||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=e||"";continue}}let s=r;switch(s.type){case"escape":case"text":i+=t.text(s);break;case"html":i+=t.html(s);break;case"link":i+=t.link(s);break;case"image":i+=t.image(s);break;case"strong":i+=t.strong(s);break;case"em":i+=t.em(s);break;case"codespan":i+=t.codespan(s);break;case"br":i+=t.br(s);break;case"del":i+=t.del(s);break;default:{let e='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(e),"";throw new Error(e)}}}return i}},xn=class{options;block;constructor(e){this.options=e||li}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?fn.lex:fn.lexInline}provideParser(){return this.block?yn.parse:yn.parseInline}},kn=class{defaults={async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null};options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=yn;Renderer=mn;TextRenderer=bn;Lexer=fn;Tokenizer=gn;Hooks=xn;constructor(...e){this.use(...e)}walkTokens(e,t){let i=[];for(let n of e)switch(i=i.concat(t.call(this,n)),n.type){case"table":{let e=n;for(let n of e.header)i=i.concat(this.walkTokens(n.tokens,t));for(let n of e.rows)for(let e of n)i=i.concat(this.walkTokens(e.tokens,t));break}case"list":{let e=n;i=i.concat(this.walkTokens(e.items,t));break}default:{let e=n;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach(n=>{let r=e[n].flat(1/0);i=i.concat(this.walkTokens(r,t))}):e.tokens&&(i=i.concat(this.walkTokens(e.tokens,t)))}}return i}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(e=>{let i={...e};if(i.async=this.defaults.async||i.async||!1,e.extensions&&(e.extensions.forEach(e=>{if(!e.name)throw new Error("extension name required");if("renderer"in e){let i=t.renderers[e.name];t.renderers[e.name]=i?function(...t){let n=e.renderer.apply(this,t);return!1===n&&(n=i.apply(this,t)),n}:e.renderer}if("tokenizer"in e){if(!e.level||"block"!==e.level&&"inline"!==e.level)throw new Error("extension level must be 'block' or 'inline'");let i=t[e.level];i?i.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&("block"===e.level?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:"inline"===e.level&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}"childTokens"in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)}),i.extensions=t),e.renderer){let t=this.defaults.renderer||new mn(this.defaults);for(let i in e.renderer){if(!(i in t))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let n=i,r=e.renderer[n],s=t[n];t[n]=(...e)=>{let i=r.apply(t,e);return!1===i&&(i=s.apply(t,e)),i||""}}i.renderer=t}if(e.tokenizer){let t=this.defaults.tokenizer||new gn(this.defaults);for(let i in e.tokenizer){if(!(i in t))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let n=i,r=e.tokenizer[n],s=t[n];t[n]=(...e)=>{let i=r.apply(t,e);return!1===i&&(i=s.apply(t,e)),i}}i.tokenizer=t}if(e.hooks){let t=this.defaults.hooks||new xn;for(let i in e.hooks){if(!(i in t))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let n=i,r=e.hooks[n],s=t[n];xn.passThroughHooks.has(i)?t[n]=e=>{if(this.defaults.async&&xn.passThroughHooksRespectAsync.has(i))return(async()=>{let i=await r.call(t,e);return s.call(t,i)})();let n=r.call(t,e);return s.call(t,n)}:t[n]=(...e)=>{if(this.defaults.async)return(async()=>{let i=await r.apply(t,e);return!1===i&&(i=await s.apply(t,e)),i})();let i=r.apply(t,e);return!1===i&&(i=s.apply(t,e)),i}}i.hooks=t}if(e.walkTokens){let t=this.defaults.walkTokens,n=e.walkTokens;i.walkTokens=function(e){let i=[];return i.push(n.call(this,e)),t&&(i=i.concat(t.call(this,e))),i}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return fn.lex(e,t??this.defaults)}parser(e,t){return yn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,i)=>{let n={...i},r={...this.defaults,...n},s=this.onError(!!r.silent,!!r.async);if(!0===this.defaults.async&&!1===n.async)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||null===t)return s(new Error("marked(): input parameter is undefined or null"));if("string"!=typeof t)return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(r.hooks&&(r.hooks.options=r,r.hooks.block=e),r.async)return(async()=>{let i=r.hooks?await r.hooks.preprocess(t):t,n=await(r.hooks?await r.hooks.provideLexer():e?fn.lex:fn.lexInline)(i,r),s=r.hooks?await r.hooks.processAllTokens(n):n;r.walkTokens&&await Promise.all(this.walkTokens(s,r.walkTokens));let o=await(r.hooks?await r.hooks.provideParser():e?yn.parse:yn.parseInline)(s,r);return r.hooks?await r.hooks.postprocess(o):o})().catch(s);try{r.hooks&&(t=r.hooks.preprocess(t));let i=(r.hooks?r.hooks.provideLexer():e?fn.lex:fn.lexInline)(t,r);r.hooks&&(i=r.hooks.processAllTokens(i)),r.walkTokens&&this.walkTokens(i,r.walkTokens);let n=(r.hooks?r.hooks.provideParser():e?yn.parse:yn.parseInline)(i,r);return r.hooks&&(n=r.hooks.postprocess(n)),n}catch(e){return s(e)}}}onError(e,t){return i=>{if(i.message+="\nPlease report this to https://github.com/markedjs/marked.",e){let e="<p>An error occurred:</p><pre>"+cn(i.message+"",!0)+"</pre>";return t?Promise.resolve(e):e}if(t)return Promise.reject(i);throw i}}},vn=new kn;function _n(e,t){return vn.parse(e,t)}_n.options=_n.setOptions=function(e){return vn.setOptions(e),_n.defaults=vn.defaults,ci(_n.defaults),_n},_n.getDefaults=ai,_n.defaults=li,_n.use=function(...e){return vn.use(...e),_n.defaults=vn.defaults,ci(_n.defaults),_n},_n.walkTokens=function(e,t){return vn.walkTokens(e,t)},_n.parseInline=vn.parseInline,_n.Parser=yn,_n.parser=yn.parse,_n.Renderer=mn,_n.TextRenderer=bn,_n.Lexer=fn,_n.lexer=fn.lex,_n.Tokenizer=gn,_n.Hooks=xn,_n.parse=_n,_n.options,_n.setOptions,_n.use,_n.walkTokens,_n.parseInline,yn.parse,fn.lex;const wn=new kn({gfm:!0,breaks:!1});function $n(e){const t=wn.parse(e,{async:!1});return oi.sanitize(t)}oi.addHook("afterSanitizeAttributes",e=>{"A"===e.tagName&&(e.setAttribute("target","_blank"),e.setAttribute("rel","noopener noreferrer"))});let An=class extends oe{constructor(){super(...arguments),this.ticket=null,this.isAdmin=!1,this.narrow=!1,this.language=void 0,this.assignees=[],this.tagMap=new Map,this._editingTitle=!1,this._titleDraft="",this._expanded=!1,this._comment="",this._internal=!1,this._resolving=!1,this._resolution="",this._tagDraft=""}willUpdate(e){if(e.has("ticket")){const t=e.get("ticket");t?.id!==this.ticket?.id&&(this._editingTitle=!1,this._expanded=!1,this._comment="",this._internal=!1,this._resolving=!1,this._resolution="",this._tagDraft="")}}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_patch(e){this._fire("patch-ticket",e)}_addTag(){const e=this._tagDraft.trim();if(this._tagDraft="",!e||!this.ticket)return;const t=[...this.tagMap.values()].find(t=>t.name.toLowerCase()===e.toLowerCase()||t.id===e);t&&this.ticket.tags.includes(t.id)||this._patch({tags:[...this.ticket.tags,t?t.id:e]})}_submitComment(){const e=this._comment.trim();e&&(this._fire("comment",{body:e,internal:this._internal}),this._comment="")}_submitResolve(e){const t=this._resolution.trim();t&&(this._fire("close-ticket",{resolution:t,status:e}),this._resolving=!1,this._resolution="")}_change(e){const t=e.data??{},i=e=>Array.isArray(e)?e.map(e=>"tags"===t.field?Re(this.tagMap,String(e)).name:String(e)).join(", ")||"none":null==e||""===e?"none":String(e);switch(e.kind){case"created":return"created this ticket";case"status":return`changed status from ${ke[t.from]??i(t.from)} to ${ke[t.to]??i(t.to)}`;case"priority":return`changed priority from ${i(t.from)} to ${i(t.to)}`;case"assignee":return t.to?`assigned this to ${i(t.to)}`:"unassigned this";case"link":return`linked ticket #${String(t.to)}`;case"field":return"description"===t.field?"edited the description":`changed ${String(t.field)}${"tags"===t.field||"entities"===t.field?` to ${i(t.to)}`:""}`;default:return e.kind}}_eventTemplate(e){const t=q`<span title=${i=e.created_at,n=this.language,new Date(i).toLocaleString(n,{dateStyle:"medium",timeStyle:"short"})}>${Ae(e.created_at,this.language)}</span>`;var i,n;return"comment"===e.kind||"note"===e.kind?q`
        <div class="ev">
          <ha-icon .icon=${function(e){const t=e.toLowerCase();return t.startsWith("ai:")||t.includes("claude")?"mdi:robot-outline":"ha"===t||"home assistant"===t?"mdi:home-assistant":"import"===t?"mdi:database-import-outline":"mdi:account-circle-outline"}(e.actor)}></ha-icon>
          <div>
            <div class="who"><b>${Se(e.actor)}</b> · ${t}${"note"===e.kind?q`<span class="tag">internal note</span>`:W}</div>
            <div class="bubble md ${"note"===e.kind?"note":""}">${De($n(e.body??""))}</div>
          </div>
        </div>`:q`
      <div class="ev system">
        <ha-icon icon="mdi:circle-small"></ha-icon>
        <div class="who"><b>${Se(e.actor)}</b> ${this._change(e)} · ${t}</div>
      </div>`}render(){const e=this.ticket;if(!e)return q`<div class="empty"><ha-icon icon="mdi:ticket-outline"></ha-icon><span>Select a ticket</span></div>`;const t=e.description.length>1800,i="resolved"===e.status||"closed"===e.status;return q`
      <div class="wrap">
        ${this.narrow?q`<button class="icon back" title="Back" @click=${()=>this._fire("back")}><ha-icon icon="mdi:arrow-left"></ha-icon></button>`:W}
        <div class="head">
          ${this._editingTitle?q`<input class="title-input" type="text" .value=${this._titleDraft}
                @input=${e=>this._titleDraft=e.target.value}
                @keydown=${e=>{"Enter"===e.key&&this._titleDraft.trim()?(this._patch({title:this._titleDraft.trim()}),this._editingTitle=!1):"Escape"===e.key&&(this._editingTitle=!1)}} />`:q`<h1>${e.title}</h1>`}
          ${this.isAdmin&&!this._editingTitle?q`<button class="icon" title="Edit title" @click=${()=>{this._titleDraft=e.title,this._editingTitle=!0}}><ha-icon icon="mdi:pencil-outline"></ha-icon></button>`:W}
        </div>
        <div class="sub">
          #${e.id}${e.legacy_ref?q` · ${e.legacy_ref}`:W} · raised by ${Se(e.requester)}
          ${Ae(e.created_at,this.language)}${e.source?q` · imported from ${e.source}`:W}
        </div>

        <div class="props">
          <div>
            <label>Status</label>
            ${this.isAdmin?q`<select @change=${e=>this._patch({status:e.target.value})}>
                  ${fe.map(t=>q`<option value=${t} ?selected=${t===e.status}>${ke[t]}</option>`)}
                </select>`:q`<div class="ro">${ke[e.status]}</div>`}
          </div>
          <div>
            <label>Priority</label>
            ${this.isAdmin?q`<select @change=${e=>this._patch({priority:e.target.value})}>
                  ${be.map(t=>q`<option value=${t} ?selected=${t===e.priority}>${_e[t]}</option>`)}
                </select>`:q`<div class="ro">${_e[e.priority]}</div>`}
          </div>
          <div>
            <label>Type</label>
            ${this.isAdmin?q`<select @change=${e=>this._patch({ticket_type:e.target.value})}>
                  ${me.map(t=>q`<option value=${t} ?selected=${t===e.type}>${ve[t]}</option>`)}
                </select>`:q`<div class="ro">${ve[e.type]}</div>`}
          </div>
          <div>
            <label>Assignee</label>
            ${this.isAdmin?q`<input type="text" list="assignees" .value=${e.assignee??""} placeholder="Unassigned"
                  @change=${e=>this._patch({assignee:e.target.value.trim()||null})} />
                <datalist id="assignees">${this.assignees.map(e=>q`<option value=${e}></option>`)}</datalist>`:q`<div class="ro">${e.assignee??"Unassigned"}</div>`}
          </div>
        </div>

        ${e.tags.length||this.isAdmin?q`<div class="chips">
              ${e.tags.map(t=>{const i=Re(this.tagMap,t);return q`<span class="tag" style="--tag-color: ${Ee(i.color)}">${i.name}${this.isAdmin?q`<button title="Remove tag" @click=${()=>this._patch({tags:e.tags.filter(e=>e!==t)})}><ha-icon icon="mdi:close"></ha-icon></button>`:W}</span>`})}
              ${this.isAdmin?q`<input type="text" placeholder="Add tag" list="tag-options" .value=${this._tagDraft}
                    @input=${e=>this._tagDraft=e.target.value}
                    @keydown=${e=>"Enter"===e.key&&this._addTag()}
                    @change=${()=>this._addTag()} />
                  <datalist id="tag-options">${[...this.tagMap.values()].filter(t=>!e.tags.includes(t.id)).map(e=>q`<option value=${e.name}></option>`)}</datalist>`:W}
            </div>`:W}

        ${e.description?q`<div class="card">
              <h3>Description</h3>
              <div class="md ${t&&!this._expanded?"clamp":""}">${De($n(e.description))}</div>
              ${t?q`<button class="more" @click=${()=>this._expanded=!this._expanded}>${this._expanded?"Show less":"Show all"}</button>`:W}
              ${e.entities.length?q`<div class="entities">${e.entities.map(e=>q`<code>${e}</code>`)}</div>`:W}
            </div>`:W}

        ${e.resolution?q`<div class="card resolution"><h3>Resolution</h3><div class="md">${De($n(e.resolution))}</div></div>`:W}

        ${e.related?.length?q`<div class="chips"><span class="who">Related</span>${e.related.map(e=>q`<span class="chip link" title=${e.title} @click=${()=>this._fire("open-ticket",e.id)}>#${e.id} ${e.title.length>40?e.title.slice(0,40)+"…":e.title}</span>`)}</div>`:W}

        <div class="timeline">
          <h2>Activity</h2>
          ${e.events.map(e=>this._eventTemplate(e))}
        </div>

        <div class="card composer">
          <textarea rows="3" placeholder="Add a comment" .value=${this._comment}
            @input=${e=>this._comment=e.target.value}></textarea>
          <div class="bar">
            ${this.isAdmin?q`<label class="inline"><input type="checkbox" .checked=${this._internal}
                  @change=${e=>this._internal=e.target.checked} /> Internal note</label>`:W}
            <span class="grow"></span>
            ${this.isAdmin&&!i?q`<button @click=${()=>this._resolving=!this._resolving}><ha-icon icon="mdi:check-circle-outline"></ha-icon>Resolve</button>`:W}
            ${this.isAdmin&&i?q`<button @click=${()=>this._patch({status:"open"})}><ha-icon icon="mdi:restore"></ha-icon>Reopen</button>`:W}
            <button class="primary" ?disabled=${!this._comment.trim()} @click=${this._submitComment}>Comment</button>
          </div>
          ${this._resolving?q`<div class="resolve-form">
                <textarea rows="3" placeholder="What was the cause and what fixed it?" .value=${this._resolution}
                  @input=${e=>this._resolution=e.target.value}></textarea>
                <div class="bar">
                  <span class="grow"></span>
                  <button @click=${()=>this._resolving=!1}>Cancel</button>
                  <button ?disabled=${!this._resolution.trim()} @click=${()=>this._submitResolve("closed")}>Close without fix</button>
                  <button class="primary" ?disabled=${!this._resolution.trim()} @click=${()=>this._submitResolve("resolved")}>Resolve</button>
                </div>
              </div>`:W}
        </div>
      </div>
    `}};An.styles=[ue,o`
      :host {
        display: block;
        overflow-y: auto;
        overflow-x: hidden;
      }
      .wrap {
        min-width: 0;
        max-width: 880px;
        margin: 0 auto;
        padding: 16px 24px 48px;
      }
      .back {
        display: none;
      }
      @media (max-width: 870px) {
        .back {
          display: inline-flex;
          margin: 0 0 4px -12px;
        }
        .wrap {
          padding: 8px 16px 40px;
        }
      }
      .head {
        display: flex;
        align-items: flex-start;
        gap: 8px;
      }
      h1 {
        flex: 1;
        margin: 0;
        font-size: 1.375rem;
        font-weight: 400;
        line-height: 1.3;
        overflow-wrap: anywhere;
      }
      .title-input {
        flex: 1;
        height: 40px;
        font-size: var(--st-fs-title);
      }
      .sub {
        margin: 6px 0 16px;
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
      }
      .props {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 12px;
        padding: 16px;
        margin-bottom: 16px;
        border: 1px solid var(--st-divider);
        border-radius: var(--ha-card-border-radius, 12px);
        background: var(--st-surface);
      }
      .props label {
        display: block;
        margin-bottom: 4px;
        font-size: var(--st-fs-caption);
        color: var(--st-fg-secondary);
      }
      .props select,
      .props input {
        width: 100%;
      }
      .ro {
        font-size: var(--st-fs-body);
        line-height: var(--st-h-field);
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 6px;
        margin-bottom: 16px;
      }
      .chip {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        height: 28px;
        padding: 0 10px;
        border-radius: 8px;
        font-size: var(--st-fs-small);
        font-weight: 400;
        color: var(--st-fg);
        background: color-mix(in srgb, var(--st-fg) 10%, transparent);
      }
      .tag button {
        all: unset;
        display: inline-flex;
        cursor: pointer;
        margin-right: -6px;
        padding: 0 4px;
        color: var(--st-fg-secondary);
      }
      .tag button ha-icon {
        --mdc-icon-size: 14px;
      }
      .chip.link {
        cursor: pointer;
        height: 28px;
      }
      .chips input {
        width: 120px;
        height: 28px;
        padding: 0 10px;
        border-radius: 8px;
        font-size: var(--st-fs-small);
      }
      .card {
        padding: 16px;
        margin-bottom: 16px;
        border: 1px solid var(--st-divider);
        border-radius: var(--ha-card-border-radius, 12px);
        background: var(--st-surface);
      }
      .card h3 {
        margin: 0 0 8px;
        font-size: var(--st-fs-caption);
        font-weight: 500;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--st-fg-secondary);
      }
      .card.resolution {
        border-left: 4px solid var(--st-success);
      }
      .clamp {
        max-height: 22em;
        overflow: hidden;
        -webkit-mask-image: linear-gradient(#000 70%, transparent);
        mask-image: linear-gradient(#000 70%, transparent);
      }
      .more {
        margin: 4px 0 0 -12px;
        height: 32px;
      }
      .entities {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 12px;
      }
      .entities code {
        font-family: var(--code-font-family, monospace);
        font-size: var(--st-fs-caption);
        padding: 2px 6px;
        border-radius: 4px;
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
      }
      .timeline {
        margin: 24px 0 16px;
        padding-left: 4px;
      }
      .timeline h2 {
        margin: 0 0 12px;
        font-size: var(--st-fs-title);
        font-weight: 500;
      }
      .ev {
        display: grid;
        grid-template-columns: 28px minmax(0, 1fr);
        gap: 12px;
        margin-bottom: 12px;
      }
      .ev > ha-icon {
        --mdc-icon-size: 24px;
        color: var(--st-fg-secondary);
        margin-top: 2px;
      }
      .ev.system > ha-icon {
        --mdc-icon-size: 16px;
        margin: 4px 4px 0;
      }
      .ev .who {
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
      }
      .ev .who b {
        font-weight: 500;
        color: var(--st-fg);
      }
      .ev .bubble {
        margin-top: 4px;
        padding: 10px 14px;
        border-radius: 12px;
        background: var(--st-surface);
        border: 1px solid var(--st-divider);
      }
      .ev .bubble.note {
        background: color-mix(in srgb, var(--st-warning) 14%, var(--st-surface));
        border-color: color-mix(in srgb, var(--st-warning) 45%, transparent);
      }
      .ev .tag {
        margin-left: 6px;
        padding: 0 6px;
        border-radius: 6px;
        font-size: var(--st-fs-caption);
        background: color-mix(in srgb, var(--st-warning) 30%, transparent);
        color: var(--st-fg);
      }
      .composer textarea {
        width: 100%;
      }
      .composer .bar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        margin-top: 8px;
      }
      .composer .bar .grow {
        flex: 1;
      }
      .composer label.inline {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
      }
      .resolve-form {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid var(--st-divider);
      }
      .empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: 8px;
        color: var(--st-fg-secondary);
      }
      .empty ha-icon {
        --mdc-icon-size: 48px;
        opacity: 0.5;
      }
    `],e([pe({attribute:!1})],An.prototype,"ticket",void 0),e([pe({type:Boolean})],An.prototype,"isAdmin",void 0),e([pe({type:Boolean})],An.prototype,"narrow",void 0),e([pe()],An.prototype,"language",void 0),e([pe({attribute:!1})],An.prototype,"assignees",void 0),e([pe({attribute:!1})],An.prototype,"tagMap",void 0),e([he()],An.prototype,"_editingTitle",void 0),e([he()],An.prototype,"_titleDraft",void 0),e([he()],An.prototype,"_expanded",void 0),e([he()],An.prototype,"_comment",void 0),e([he()],An.prototype,"_internal",void 0),e([he()],An.prototype,"_resolving",void 0),e([he()],An.prototype,"_resolution",void 0),e([he()],An.prototype,"_tagDraft",void 0),An=e([de("st-ticket-detail")],An);let Sn=class extends oe{constructor(){super(...arguments),this.isAdmin=!1,this._title="",this._description="",this._type="issue",this._priority="normal"}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_submit(){this._title.trim()&&this._fire("create",{title:this._title.trim(),description:this._description,ticket_type:this._type,priority:this._priority})}render(){return q`
      <div class="scrim" @click=${e=>e.target===e.currentTarget&&this._fire("close")}
        @keydown=${e=>"Escape"===e.key&&this._fire("close")}>
        <div class="dialog" role="dialog" aria-label="New ticket">
          <h2>New ticket</h2>
          <div class="field">
            <label for="title">Title</label>
            <input id="title" type="text" autofocus .value=${this._title}
              @input=${e=>this._title=e.target.value}
              @keydown=${e=>"Enter"===e.key&&this._submit()} />
          </div>
          <div class="field">
            <label for="desc">Description</label>
            <textarea id="desc" rows="6" .value=${this._description}
              @input=${e=>this._description=e.target.value}></textarea>
          </div>
          <div class="pair field">
            <div>
              <label for="type">Type</label>
              <select id="type" .value=${this._type}
                @change=${e=>this._type=e.target.value}>
                ${me.filter(e=>"log"!==e).map(e=>q`<option value=${e} ?selected=${e===this._type}>${ve[e]}</option>`)}
              </select>
            </div>
            ${this.isAdmin?q`<div>
                  <label for="prio">Priority</label>
                  <select id="prio" .value=${this._priority}
                    @change=${e=>this._priority=e.target.value}>
                    ${be.map(e=>q`<option value=${e} ?selected=${e===this._priority}>${_e[e]}</option>`)}
                  </select>
                </div>`:""}
          </div>
          <div class="actions">
            <button @click=${()=>this._fire("close")}>Cancel</button>
            <button class="primary" ?disabled=${!this._title.trim()} @click=${this._submit}>Create</button>
          </div>
        </div>
      </div>
    `}};Sn.styles=[ue,o`
      .scrim {
        position: fixed;
        inset: 0;
        z-index: 20;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        background: rgba(0, 0, 0, 0.32);
      }
      .dialog {
        width: min(560px, 100%);
        max-height: 100%;
        overflow-y: auto;
        padding: 24px;
        border-radius: 28px;
        background: var(--st-surface);
        box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
      }
      h2 {
        margin: 0 0 16px;
        font-size: 1.375rem;
        font-weight: 400;
      }
      label {
        display: block;
        margin-bottom: 4px;
        font-size: var(--st-fs-caption);
        color: var(--st-fg-secondary);
      }
      .field {
        margin-bottom: 16px;
      }
      .field input,
      .field textarea {
        width: 100%;
      }
      .pair {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }
      .pair select {
        width: 100%;
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        margin-top: 8px;
      }
    `],e([pe({type:Boolean})],Sn.prototype,"isAdmin",void 0),e([he()],Sn.prototype,"_title",void 0),e([he()],Sn.prototype,"_description",void 0),e([he()],Sn.prototype,"_type",void 0),e([he()],Sn.prototype,"_priority",void 0),Sn=e([de("st-new-ticket-dialog")],Sn);let Tn=class extends oe{constructor(){super(...arguments),this.tags=[],this._newName="",this._error="",this._palette=null,this._confirm=null}_fire(e){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0}))}async _run(e){try{await e(),this._error="",this._fire("tags-changed")}catch(e){this._error=String(e&&"object"==typeof e&&"message"in e?e.message:e)}}async _add(){const e=this._newName.trim();e&&(await this._run(()=>this.client.createTag(e)),this._error||(this._newName=""))}_rename(e,t){const i=t.target,n=i.value.trim();n&&n!==e.name?this._run(()=>this.client.updateTag(e.id,{name:n})).then(()=>{this._error&&(i.value=e.name)}):i.value=e.name}_recolor(e,t){this._palette=null,this._run(()=>this.client.updateTag(e.id,{color:t}))}_delete(e){this._confirm=null,this._run(()=>this.client.deleteTag(e.id))}render(){return q`
      <div class="scrim" @click=${e=>e.target===e.currentTarget&&this._fire("close")}
        @keydown=${e=>"Escape"===e.key&&this._fire("close")}>
        <div class="dialog" role="dialog" aria-label="Manage tags">
          <h2>Manage tags</h2>
          <p class="hint">Tags group tickets by system or topic. Home Assistant is built in and can't be changed.</p>
          <div class="rows">
            ${this.tags.map(e=>q`
              <div class="row">
                <button class="swatch" style="--c: ${Ee(e.color)}" ?disabled=${e.builtin}
                  title=${e.builtin?"Built-in colour":"Change colour"} aria-label="Colour of ${e.name}"
                  @click=${()=>this._palette=this._palette===e.id?null:e.id}></button>
                <div class="name">
                  ${e.builtin?q`<span class="fixed">${e.name}</span>`:q`<input type="text" .value=${e.name} aria-label="Name of ${e.name}"
                        @change=${t=>this._rename(e,t)}
                        @keydown=${e=>"Enter"===e.key&&e.target.blur()} />`}
                </div>
                <span class="count">${e.count} ticket${1===e.count?"":"s"}</span>
                ${e.builtin?q`<span class="lock" title="Built in: can't be changed or deleted"><ha-icon icon="mdi:lock-outline"></ha-icon></span>`:q`<button class="icon" title="Delete tag" @click=${()=>this._confirm=e.id}><ha-icon icon="mdi:delete-outline"></ha-icon></button>`}
                ${this._palette===e.id?q`<div class="palette">
                      ${ye.map(t=>q`<button style="--c: ${Ee(t)}" class=${t===e.color?"selected":""}
                        title=${t.replace("-"," ")} aria-label=${t} @click=${()=>this._recolor(e,t)}></button>`)}
                    </div>`:W}
                ${this._confirm===e.id?q`<div class="confirm">
                      <span class="grow">${e.count?`Remove “${e.name}” from ${e.count} ticket${1===e.count?"":"s"} and delete it?`:`Delete “${e.name}”?`}</span>
                      <button @click=${()=>this._confirm=null}>Cancel</button>
                      <button class="danger" @click=${()=>this._delete(e)}>Delete</button>
                    </div>`:W}
              </div>`)}
          </div>
          <div class="add">
            <input type="text" placeholder="New tag" .value=${this._newName}
              @input=${e=>this._newName=e.target.value}
              @keydown=${e=>"Enter"===e.key&&void this._add()} />
            <button class="primary" ?disabled=${!this._newName.trim()} @click=${()=>{this._add()}}>Add tag</button>
          </div>
          ${this._error?q`<div class="error">${this._error}</div>`:W}
          <div class="actions"><button @click=${()=>this._fire("close")}>Done</button></div>
        </div>
      </div>
    `}};Tn.styles=[ue,o`
      .scrim {
        position: fixed;
        inset: 0;
        z-index: 20;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        background: rgba(0, 0, 0, 0.32);
      }
      .dialog {
        display: flex;
        flex-direction: column;
        width: min(560px, 100%);
        max-height: min(720px, 100%);
        padding: 24px 0 16px;
        border-radius: 28px;
        background: var(--st-surface);
        box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
      }
      h2 {
        margin: 0;
        padding: 0 24px 4px;
        font-size: 1.375rem;
        font-weight: 400;
      }
      .hint {
        margin: 0;
        padding: 0 24px 12px;
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
      }
      .rows {
        flex: 1;
        overflow-y: auto;
        border-top: 1px solid var(--st-divider);
        border-bottom: 1px solid var(--st-divider);
      }
      .row {
        display: grid;
        grid-template-columns: 32px minmax(0, 1fr) 84px 48px;
        align-items: center;
        gap: 12px;
        padding: 8px 16px 8px 24px;
        min-height: 56px;
      }
      .row + .row {
        border-top: 1px solid var(--st-divider);
      }
      .swatch {
        width: 28px;
        height: 28px;
        padding: 0;
        border-radius: 50%;
        background: var(--c);
        border: 2px solid color-mix(in srgb, var(--c) 50%, var(--st-surface));
      }
      .swatch:disabled {
        opacity: 1;
        cursor: default;
      }
      .name input {
        width: 100%;
      }
      .name .fixed {
        font-size: var(--st-fs-body);
      }
      .count {
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
        white-space: nowrap;
      }
      .lock {
        color: var(--st-fg-secondary);
        width: 48px;
        text-align: center;
      }
      button.icon {
        width: 40px;
        height: 40px;
      }
      .palette {
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: repeat(auto-fill, 32px);
        gap: 8px;
        padding: 4px 0 8px 44px;
      }
      .palette button {
        width: 28px;
        height: 28px;
        padding: 0;
        border-radius: 50%;
        background: var(--c);
        border: 2px solid transparent;
      }
      .palette button.selected {
        border-color: var(--st-fg);
      }
      .confirm {
        grid-column: 1 / -1;
        display: flex;
        align-items: center;
        gap: 8px;
        padding-left: 44px;
        font-size: var(--st-fs-small);
      }
      .confirm .grow {
        flex: 1;
      }
      .add {
        display: flex;
        gap: 8px;
        padding: 12px 24px 0;
      }
      .add input {
        flex: 1;
        min-width: 0;
      }
      .error {
        margin: 8px 24px 0;
        font-size: var(--st-fs-small);
        color: var(--st-danger);
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        padding: 12px 24px 0;
      }
    `],e([pe({attribute:!1})],Tn.prototype,"client",void 0),e([pe({attribute:!1})],Tn.prototype,"tags",void 0),e([he()],Tn.prototype,"_newName",void 0),e([he()],Tn.prototype,"_error",void 0),e([he()],Tn.prototype,"_palette",void 0),e([he()],Tn.prototype,"_confirm",void 0),Tn=e([de("st-tag-manager")],Tn);const En=e=>xe.includes(e.status)&&"log"!==e.type,Rn=[{id:"active",label:"Inbox",match:En},{id:"review",label:"Needs review",match:e=>En(e)&&e.tags.includes("needs-review")},{id:"waiting",label:"Waiting",match:e=>"waiting"===e.status},{id:"resolved",label:"Resolved",match:e=>("resolved"===e.status||"closed"===e.status)&&"log"!==e.type},{id:"history",label:"History",match:e=>"log"===e.type},{id:"all",label:"All",match:()=>!0}];let zn=class extends oe{constructor(){super(...arguments),this.narrow=!1,this._tickets=[],this._matchIds=null,this._selected=null,this._selectedId=null,this._view="active",this._q="",this._type="",this._priority="",this._assignee="",this._tag="",this._tagList=[],this._managingTags=!1,this._creating=!1,this._error=""}get _admin(){return this.hass?.user?.is_admin??!1}willUpdate(e){e.has("hass")&&this.hass&&!this._client&&(this._client=new ge(this.hass),this._restoreState(),this._refresh(),this._client.subscribe(()=>this._scheduleRefresh()).then(e=>this._unsub=e))}disconnectedCallback(){super.disconnectedCallback(),this._unsub?.(),window.clearTimeout(this._searchTimer),window.clearTimeout(this._refreshTimer)}_restoreState(){try{const e=localStorage.getItem("home-desk-view");e&&Rn.some(t=>t.id===e)&&(this._view=e)}catch{}}_setView(e){this._view=e;try{localStorage.setItem("home-desk-view",e)}catch{}}_scheduleRefresh(){window.clearTimeout(this._refreshTimer),this._refreshTimer=window.setTimeout(()=>{this._refresh()},300)}async _refresh(){if(this._client)try{[this._tickets,this._tagList]=await Promise.all([this._client.list(),this._client.tags()]),this._q.trim()&&await this._runSearch(),null!==this._selectedId&&await this._loadSelected(this._selectedId),this._error=""}catch(e){this._error=`Could not load tickets: ${this._message(e)}`}}async _loadSelected(e){if(this._client)try{this._selected=await this._client.get(e)}catch(e){this._selected=null,this._selectedId=null,this._error=this._message(e)}}async _runSearch(){if(!this._client)return;const e=this._q.trim();this._matchIds=e?new Set((await this._client.list(e)).map(e=>e.id)):null}_message(e){return String(e&&"object"==typeof e&&"message"in e?e.message:e)}async _act(e){if(this._client)try{this._selected=await e(this._client),this._error="",this._refresh()}catch(e){this._error=this._message(e)}}_onSearch(e){this._q=e.target.value,window.clearTimeout(this._searchTimer),this._searchTimer=window.setTimeout(()=>{this._runSearch()},250)}async _open(e){this._selectedId=e,await this._loadSelected(e)}async _create(e){if(this._client)try{const t=await this._client.create(e);this._creating=!1,this._setView("active"),this._selectedId=t.id,this._selected=t,this._refresh()}catch(e){this._error=this._message(e)}}get _filtered(){const e=Rn.find(e=>e.id===this._view)??Rn[0];return this._tickets.filter(t=>e.match(t)&&(!this._matchIds||this._matchIds.has(t.id))&&(!this._type||t.type===this._type)&&(!this._priority||t.priority===this._priority)&&(!this._tag||t.tags.includes(this._tag))&&(!this._assignee||("unassigned"===this._assignee?!t.assignee:t.assignee===this._assignee)))}get _assignees(){return[...new Set(["simon","claude",...this._tickets.map(e=>e.assignee).filter(e=>!!e)])].sort()}get _tagMap(){return new Map(this._tagList.map(e=>[e.id,e]))}render(){if(!this.hass)return W;const e=this.hass.language,t=null!==this._selectedId;return q`
      <header>
        <div class="bar">
          ${this.narrow?q`<button class="icon menu" title="Menu" @click=${()=>this.dispatchEvent(new CustomEvent("hass-toggle-menu",{bubbles:!0,composed:!0}))}><ha-icon icon="mdi:menu"></ha-icon></button>`:W}
          <h1>Home Desk</h1>
          <button class="new" title="New ticket" @click=${()=>this._creating=!0}><ha-icon icon="mdi:plus"></ha-icon><span class="label">New ticket</span></button>
          ${this._admin?q`<button class="icon" title="Manage tags" @click=${()=>this._managingTags=!0}><ha-icon icon="mdi:tag-multiple-outline"></ha-icon></button>`:W}
          <button class="icon" title="Refresh" @click=${()=>{this._refresh()}}><ha-icon icon="mdi:refresh"></ha-icon></button>
        </div>
        <div class="tabs">
          ${Rn.map(e=>q`<button class="tab ${e.id===this._view?"active":""}" @click=${()=>this._setView(e.id)}>
              ${e.label} <span class="count">${this._tickets.filter(e.match).length}</span>
            </button>`)}
        </div>
      </header>
      ${this._error?q`<div class="banner">${this._error}</div>`:W}
      <main class=${t?"has-selection":""}>
        <div class="list-pane">
          <div class="filters">
            <input type="search" placeholder="Search tickets" .value=${this._q} @input=${this._onSearch} />
            <select aria-label="Type" @change=${e=>this._type=e.target.value}>
              <option value="">Any type</option>
              ${me.map(e=>q`<option value=${e} ?selected=${e===this._type}>${ve[e]}</option>`)}
            </select>
            <select aria-label="Priority" @change=${e=>this._priority=e.target.value}>
              <option value="">Any priority</option>
              ${be.map(e=>q`<option value=${e} ?selected=${e===this._priority}>${_e[e]}</option>`)}
            </select>
            <select aria-label="Assignee" @change=${e=>this._assignee=e.target.value}>
              <option value="">Anyone</option>
              <option value="unassigned" ?selected=${"unassigned"===this._assignee}>Unassigned</option>
              ${this._assignees.map(e=>q`<option value=${e} ?selected=${e===this._assignee}>${e}</option>`)}
            </select>
            <select aria-label="Tag" @change=${e=>this._tag=e.target.value}>
              <option value="">Any tag</option>
              ${this._tagList.map(e=>q`<option value=${e.id} ?selected=${e.id===this._tag}>${e.name}</option>`)}
            </select>
          </div>
          <st-ticket-list
            .tickets=${this._filtered}
            .selectedId=${this._selectedId}
            .language=${e}
            .tagMap=${this._tagMap}
            @select-ticket=${e=>{this._open(e.detail)}}
          ></st-ticket-list>
        </div>
        <st-ticket-detail
          .ticket=${this._selected}
          .isAdmin=${this._admin}
          .narrow=${this.narrow||window.matchMedia("(max-width: 870px)").matches}
          .language=${e}
          .assignees=${this._assignees}
          .tagMap=${this._tagMap}
          @back=${()=>{this._selectedId=null,this._selected=null}}
          @open-ticket=${e=>{this._open(e.detail)}}
          @patch-ticket=${e=>this._selected&&void this._act(t=>t.update(this._selected.id,e.detail))}
          @comment=${e=>this._selected&&void this._act(t=>t.comment(this._selected.id,e.detail.body,e.detail.internal))}
          @close-ticket=${e=>this._selected&&void this._act(t=>t.close(this._selected.id,e.detail.resolution,e.detail.status))}
        ></st-ticket-detail>
      </main>
      ${this._managingTags&&this._client?q`<st-tag-manager .client=${this._client} .tags=${this._tagList}
            @close=${()=>this._managingTags=!1}
            @tags-changed=${()=>{this._refresh()}}></st-tag-manager>`:W}
      ${this._creating?q`<st-new-ticket-dialog .isAdmin=${this._admin}
            @close=${()=>this._creating=!1}
            @create=${e=>{this._create(e.detail)}}></st-new-ticket-dialog>`:W}
    `}};zn.styles=[ue,o`
      :host {
        display: flex;
        flex-direction: column;
        height: 100vh;
        height: 100dvh;
        background: var(--st-bg);
      }
      header {
        flex: none;
        background: var(--st-header-bg);
        color: var(--st-header-fg);
        border-bottom: 1px solid var(--st-divider);
      }
      .bar {
        display: flex;
        align-items: center;
        height: 56px;
        padding: 0 8px 0 4px;
        gap: 4px;
      }
      .bar h1 {
        flex: 1;
        margin: 0 0 0 8px;
        font-size: var(--st-fs-header);
        font-weight: 400;
      }
      .bar .menu {
        margin-right: -4px;
      }
      .tabs {
        display: flex;
        overflow-x: auto;
        scrollbar-width: none;
        padding: 0 8px;
      }
      .tabs::-webkit-scrollbar {
        display: none;
      }
      .tab {
        flex: none;
        height: 48px;
        padding: 0 16px;
        border-radius: 0;
        color: color-mix(in srgb, var(--st-header-fg) 70%, transparent);
        font-weight: 500;
        border-bottom: 2px solid transparent;
        text-transform: none;
      }
      .tab.active {
        color: var(--st-header-fg);
        border-bottom-color: var(--st-header-fg);
      }
      .tab .count {
        font-weight: 400;
        font-size: var(--st-fs-caption);
        padding: 1px 7px;
        border-radius: 10px;
        background: color-mix(in srgb, var(--st-header-fg) 18%, transparent);
      }
      main {
        flex: 1;
        display: grid;
        grid-template-columns: minmax(320px, 420px) minmax(0, 1fr);
        min-height: 0;
      }
      .list-pane {
        display: flex;
        flex-direction: column;
        min-height: 0;
        border-right: 1px solid var(--st-divider);
        background: var(--st-surface);
      }
      .filters {
        flex: none;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        padding: 12px 16px;
        border-bottom: 1px solid var(--st-divider);
      }
      .filters input[type="search"] {
        flex: 1 1 100%;
      }
      .filters select {
        flex: 1 1 0;
        min-width: 0;
        max-width: 100%;
      }
      st-ticket-list {
        flex: 1;
        min-height: 0;
      }
      st-ticket-detail {
        min-height: 0;
      }
      @media (max-width: 870px) {
        main {
          grid-template-columns: minmax(0, 1fr);
        }
        main.has-selection .list-pane,
        main:not(.has-selection) st-ticket-detail {
          display: none;
        }
      }
      .banner {
        padding: 12px 16px;
        font-size: var(--st-fs-body);
        border-left: 4px solid var(--st-danger);
        background: color-mix(in srgb, var(--st-danger) 12%, var(--st-surface));
      }
      .new {
        color: var(--st-header-fg);
        background: color-mix(in srgb, var(--st-header-fg) 16%, transparent);
        margin-right: 4px;
      }
      @media (max-width: 600px) {
        .new .label {
          display: none;
        }
        .new {
          padding: 0 12px;
        }
      }
      .list-pane,
      st-ticket-list,
      st-ticket-detail {
        min-width: 0;
      }
    `],e([pe({attribute:!1})],zn.prototype,"hass",void 0),e([pe({type:Boolean})],zn.prototype,"narrow",void 0),e([he()],zn.prototype,"_tickets",void 0),e([he()],zn.prototype,"_matchIds",void 0),e([he()],zn.prototype,"_selected",void 0),e([he()],zn.prototype,"_selectedId",void 0),e([he()],zn.prototype,"_view",void 0),e([he()],zn.prototype,"_q",void 0),e([he()],zn.prototype,"_type",void 0),e([he()],zn.prototype,"_priority",void 0),e([he()],zn.prototype,"_assignee",void 0),e([he()],zn.prototype,"_tag",void 0),e([he()],zn.prototype,"_tagList",void 0),e([he()],zn.prototype,"_managingTags",void 0),e([he()],zn.prototype,"_creating",void 0),e([he()],zn.prototype,"_error",void 0),zn=e([de("home-desk-panel")],zn)}();
