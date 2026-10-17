/*! home-desk-panel v0.1.0 | MIT */
!function(){"use strict";function e(e,t,i,r){var s,o=arguments.length,n=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),s=new WeakMap;let o=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(t,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new o(i,e,r)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,r))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,m=f?f.emptyScript:"",b=g.reactiveElementPolyfillSupport,v=(e,t)=>e,x={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},y=(e,t)=>!l(e,t),_={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=_){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&c(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:s}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const o=r?.call(this);s?.call(this,t),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,r)=>{if(i)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of r){const r=document.createElement("style"),s=t.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=i.cssText,e.appendChild(r)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:x).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:x;this._$Em=r;const o=s.fromAttribute(t,e.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(e,t,i,r=!1,s){if(void 0!==e){const o=this.constructor;if(!1===r&&(s=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??y)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:s},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==s||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[v("elementProperties")]=new Map,k[v("finalized")]=new Map,b?.({ReactiveElement:k}),(g.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,$=e=>e,A=w.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,T="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+C,E=`<${z}>`,R=document,L=()=>R.createComment(""),N=e=>null===e||"object"!=typeof e&&"function"!=typeof e,I=Array.isArray,O="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,D=/>/g,H=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,B=/"/g,U=/^(?:script|style|textarea|title)$/i,q=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),F=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),Z=new WeakMap,G=R.createTreeWalker(R,129);function Y(e,t){if(!I(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}let X=class e{constructor({strings:t,_$litType$:i},r){let s;this.parts=[];let o=0,n=0;const a=t.length-1,l=this.parts,[c,d]=((e,t)=>{const i=e.length-1,r=[];let s,o=2===t?"<svg>":3===t?"<math>":"",n=P;for(let t=0;t<i;t++){const i=e[t];let a,l,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,l=n.exec(i),null!==l);)d=n.lastIndex,n===P?"!--"===l[1]?n=M:void 0!==l[1]?n=D:void 0!==l[2]?(U.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=H):void 0!==l[3]&&(n=H):n===H?">"===l[0]?(n=s??P,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?H:'"'===l[3]?B:j):n===B||n===j?n=H:n===M||n===D?n=P:(n=H,s=void 0);const h=n===H&&e[t+1].startsWith("/>")?" ":"";o+=n===P?i+E:c>=0?(r.push(a),i.slice(0,c)+T+i.slice(c)+C+h):i+C+(-2===c?t:h)}return[Y(e,o+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]})(t,i);if(this.el=e.createElement(c,r),G.currentNode=this.el.content,2===i||3===i){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=G.nextNode())&&l.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(T)){const t=d[n++],i=s.getAttribute(e).split(C),r=/([.?@])?(.*)/.exec(t);l.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?ee:"?"===r[1]?te:"@"===r[1]?ie:J}),s.removeAttribute(e)}else e.startsWith(C)&&(l.push({type:6,index:o}),s.removeAttribute(e));if(U.test(s.tagName)){const e=s.textContent.split(C),t=e.length-1;if(t>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],L()),G.nextNode(),l.push({type:2,index:++o});s.append(e[t],L())}}}else if(8===s.nodeType)if(s.data===z)l.push({type:2,index:o});else{let e=-1;for(;-1!==(e=s.data.indexOf(C,e+1));)l.push({type:7,index:o}),e+=C.length-1}o++}}static createElement(e,t){const i=R.createElement("template");return i.innerHTML=e,i}};function Q(e,t,i=e,r){if(t===F)return t;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const o=N(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),void 0===o?s=void 0:(s=new o(e),s._$AT(e,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(t=Q(e,s._$AS(e,t.values),s,r)),t}class V{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??R).importNode(t,!0);G.currentNode=r;let s=G.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let t;2===a.type?t=new K(s,s.nextSibling,this,e):1===a.type?t=new a.ctor(s,a.name,a.strings,this,e):6===a.type&&(t=new re(s,this,e)),this._$AV.push(t),a=i[++n]}o!==a?.index&&(s=G.nextNode(),o++)}return G.currentNode=R,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}let K=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),N(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==F&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>I(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(R.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=X.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new V(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=Z.get(e.strings);return void 0===t&&Z.set(e.strings,t=new X(e)),t}k(t){I(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let r,s=0;for(const o of t)s===i.length?i.push(r=new e(this.O(L()),this.O(L()),this,this.options)):r=i[s],r._$AI(o),s++;s<i.length&&(this._$AR(r&&r._$AB.nextSibling,s),i.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}};class J{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,s){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,r){const s=this.strings;let o=!1;if(void 0===s)e=Q(this,e,t,0),o=!N(e)||e!==this._$AH&&e!==F,o&&(this._$AH=e);else{const r=e;let n,a;for(e=s[0],n=0;n<s.length-1;n++)a=Q(this,r[i+n],t,n),a===F&&(a=this._$AH[n]),o||=!N(a)||a!==this._$AH[n],a===W?e=W:e!==W&&(e+=(a??"")+s[n+1]),this._$AH[n]=a}o&&!r&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}let ee=class extends J{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}},te=class extends J{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}},ie=class extends J{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??W)===F)return;const i=this._$AH,r=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==W&&(i===W||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}};class re{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const se=w.litHtmlPolyfillSupport;se?.(X,K),(w.litHtmlVersions??=[]).push("3.3.3");const oe=globalThis;let ne=class extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let s=r._$litPart$;if(void 0===s){const e=i?.renderBefore??null;r._$litPart$=s=new K(t.insertBefore(L(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}};ne._$litElement$=!0,ne.finalized=!0,oe.litElementHydrateSupport?.({LitElement:ne});const ae=oe.litElementPolyfillSupport;ae?.({LitElement:ne}),(oe.litElementVersions??=[]).push("4.2.2");const le={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:y},ce=(e=le,t,i)=>{const{kind:r,metadata:s}=i;let o=globalThis.litPropertyMetadata.get(s);if(void 0===o&&globalThis.litPropertyMetadata.set(s,o=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),o.set(i.name,e),"accessor"===r){const{name:r}=i;return{set(i){const s=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,s,e,!0,i)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=i;return function(i){const s=this[r];t.call(this,i),this.requestUpdate(r,s,e,!0,i)}}throw Error("Unsupported decorator location: "+r)};function de(e){return(t,i)=>"object"==typeof i?ce(e,t,i):((e,t,i)=>{const r=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function he(e){return de({...e,state:!0,attribute:!1})}const pe=e=>(t,i)=>{const r=()=>{customElements.get(e)?console.info(`home-desk: <${e}> already defined — reload the page to pick up the updated panel.`):customElements.define(e,t)};void 0!==i?i.addInitializer(r):r()},ue=n`
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
    /* HA's own type scale (px, so it doesn't depend on the page's root font size). */
    --st-fs-caption: var(--ha-font-size-s, 12px);
    --st-fs-small: var(--ha-font-size-s, 12px);
    --st-fs-body: var(--ha-font-size-m, 14px);
    --st-fs-row: var(--ha-font-size-m, 14px);
    --st-fs-field: var(--ha-font-size-l, 16px);
    --st-fs-title: var(--ha-font-size-l, 16px);
    --st-fs-dialog: 22px;
    --st-fs-header: var(--ha-font-size-xl, 20px);
    --st-fs-heading: var(--ha-font-size-2xl, 24px);
    --st-fw-heading: var(--ha-font-weight-heading, 700);
    --st-shadow-m: var(--ha-box-shadow-m, 0 3px 6px -1px rgba(0, 0, 0, 0.35), 0 8px 16px -2px rgba(0, 0, 0, 0.45));
    --st-shadow-l: var(--ha-box-shadow-l, 0 6px 12px -3px rgba(0, 0, 0, 0.4), 0 16px 32px -6px rgba(0, 0, 0, 0.55));
    --st-r-control: var(--ha-border-radius-lg, 12px);
    /* HA's toolbar controls (search, filter buttons): compact, tight corners, outlined. */
    /* HA's data-table toolbar: 32px controls; the search box has 10px corners (8px and 40px on narrow
       screens), chips and buttons are pills. */
    --st-h-bar: 32px;
    --st-r-bar: 10px;
    --st-r-pill: var(--ha-border-radius-pill, 9999px);
    --st-outline: var(--outline-color, var(--divider-color, #e0e0e0));
    /* Idle and hover outlines of HA's inputs (from its neutral border tokens). */
    --st-field-outline: var(--ha-color-border-neutral-quiet, color-mix(in srgb, var(--st-fg) 38%, transparent));
    --st-field-outline-hover: var(--ha-color-border-neutral-normal, var(--st-fg));
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
  /* People who ask for less motion get none: no sliding, fading or shaking. */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
      scroll-behavior: auto !important;
    }
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
  /* Label pill, as HA's <ha-label> draws it: a solid colour with contrasting text, a 1px outline,
     12px medium text. Regular is 32px with 16px corners; "dense" (in lists) is 20px with 8px corners. */
  .label {
    --label-color: var(--st-fg-secondary);
    --label-fg: #fff;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    height: 32px;
    padding: 0 16px;
    border: 1px solid var(--st-outline);
    border-radius: var(--ha-border-radius-xl, 16px);
    font-size: var(--ha-font-size-s, 12px);
    font-weight: var(--ha-font-weight-medium, 500);
    line-height: 1.2;
    letter-spacing: 0.1px;
    color: var(--label-fg);
    background: var(--label-color);
    white-space: nowrap;
  }
  .label > ha-icon {
    --mdc-icon-size: 12px;
    margin: 0 8px 0 -8px;
  }
  .label.dense {
    height: 20px;
    padding: 0 12px;
    border-radius: var(--ha-border-radius-md, 8px);
  }
  .label.dense > ha-icon {
    margin: 0 4px 0 -4px;
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
`,ge=n`
      /*
       * The panel fills the screen and never scrolls as a whole: the header and search bar stay put, and
       * the ticket list and the open ticket each scroll inside their own column. (!important because a
       * host page that styles this element as a plain block would otherwise break that.)
       */
      :host {
        display: flex !important;
        flex-direction: column;
        height: 100vh;
        height: 100dvh;
        overflow: hidden;
        background: var(--st-bg);
        position: relative;
        /*
         * The colour of the selected ticket: its row in the list, and the open ticket beside it. A soft tint of
         * the accent colour in a dark theme, and a light grey in a light one.
         */
        --st-selected: color-mix(in srgb, var(--st-accent) 7%, var(--st-surface));
        /* The open ticket's description and comments: the same tint at about half strength. */
        --st-selected-soft: color-mix(in srgb, var(--st-accent) 3%, var(--st-surface));
        /* The brand mark's blue: a touch brighter on a dark theme. */
        --st-brand: #03a9f4;
      }
      /* Light grey, kept lighter than the divider line so the edge between the list and the ticket stays visible. */
      :host([light]) {
        --st-selected: color-mix(in srgb, var(--st-fg) 5%, var(--st-surface));
        --st-selected-soft: color-mix(in srgb, var(--st-fg) 2%, var(--st-surface));
        --st-brand: #039be5;
      }
      main {
        flex: 1;
        display: grid;
        grid-template-columns: minmax(320px, 420px) minmax(0, 1fr);
        grid-template-rows: minmax(0, 1fr);
        min-height: 0;
        overflow: hidden;
      }
      .list-pane {
        position: relative;
        display: flex;
        flex-direction: column;
        min-height: 0;
        overflow: hidden;
        border-right: 1px solid var(--st-divider);
        background: var(--st-surface);
      }
      /* Narrow: one pane at a time. */
      @media (max-width: 870px) {
        main {
          grid-template-columns: minmax(0, 1fr);
        }
        main.has-selection .list-pane,
        main:not(.has-selection) st-ticket-detail {
          display: none;
        }
      }
      /* HA's data-table toolbar (hass-tabs-subpage-data-table): 56px, on the page background. */
      st-ticket-list {
        flex: 1;
        min-height: 0;
      }
      st-ticket-detail {
        min-height: 0;
      }
      .banner {
        padding: 12px 16px;
        font-size: var(--st-fs-body);
        border-left: 4px solid var(--st-danger);
        background: color-mix(in srgb, var(--st-danger) 12%, var(--st-surface));
      }
      .list-pane,
      st-ticket-list,
      st-ticket-detail {
        min-width: 0;
      }
`;class fe{constructor(e){this.hass=e}send(e,t={}){return this.hass.connection.sendMessagePromise({type:`home_desk/${e}`,...t})}async list(e){return(await this.send("list",{status:"all",...e?{q:e}:{}})).tickets}async categories(){try{return(await this.send("categories")).categories}catch{return[]}}createCategory(e){return this.send("category_create",e)}updateCategory(e,t){return this.send("category_update",{category_id:e,...t})}deleteCategory(e){return this.send("category_delete",{category_id:e})}async settings(){try{return await this.send("settings")}catch{return{auto_close:"7d",agent:"",repairs:!0,notify:{targets:[],new_ticket:!0,comment:!0,resolved:!1}}}}saveSettings(e){return this.send("settings_save",e)}async labels(){return(await this.send("labels")).labels}createLabel(e){return this.send("label_create",e)}updateLabel(e,t){return this.send("label_update",{label_id:e,...t})}deleteLabel(e){return this.send("label_delete",{label_id:e})}get(e){return this.send("get",{ticket_id:e})}create(e){return this.send("create",{...e})}update(e,t){return this.send("update",{ticket_id:e,...t})}comment(e,t,i){return this.send("comment",{ticket_id:e,body:t,internal:i})}close(e,t,i){return this.send("close",{ticket_id:e,resolution:t,status:i})}subscribe(e){return this.hass.connection.subscribeEvents(e,"home_desk_event")}}const me=["low","normal","high","urgent"],be=["primary","accent","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","light-grey","grey","dark-grey","blue-grey","black","white"],ve=["new","open","in_progress"],xe="blocked",ye={new:"New",open:"In Progress",in_progress:"In Progress",resolved:"Resolved",closed:"Closed"},_e={new:"mdi:circle-outline",open:"mdi:circle-slice-4",in_progress:"mdi:circle-slice-4",resolved:"mdi:check-circle-outline",closed:"mdi:close-circle-outline"},ke={new:"var(--success-color, #43a047)",open:"var(--primary-color)",in_progress:"var(--primary-color)",resolved:"var(--purple-color, #926bc7)",closed:"var(--secondary-text-color)"},we={low:"Low",normal:"Normal",high:"High",urgent:"Urgent"},$e=[["year",31536e3],["month",2592e3],["day",86400],["hour",3600],["minute",60]];function Ae(e,t){const i=(new Date(e).getTime()-Date.now())/1e3,r=new Intl.RelativeTimeFormat(t,{numeric:"auto"});for(const[e,t]of $e)if(Math.abs(i)>=t)return r.format(Math.round(i/t),e);return r.format(0,"second")}function Se(e){const t=e.toLowerCase();return t.startsWith("ai:")||t.includes("claude")}function Te(e){if(Se(e))return"mdi:star-four-points-outline";const t=e.toLowerCase();return"ha"===t||"home assistant"===t?"mdi:home-assistant":"mdi:account-outline"}function Ce(e){const t=e.replace(/^ai:/i,"");return t===t.toLowerCase()?t.charAt(0).toUpperCase()+t.slice(1):t}const ze={primary:"#03a9f4",accent:"#ff9800",red:"#f44336",pink:"#e91e63",purple:"#926bc7","deep-purple":"#6e41ab",indigo:"#3f51b5",blue:"#2196f3","light-blue":"#03a9f4",cyan:"#00bcd4",teal:"#009688",green:"#4caf50","light-green":"#8bc34a",lime:"#cddc39",yellow:"#ffeb3b",amber:"#ffc107",orange:"#ff9800","deep-orange":"#ff6f22",brown:"#795548","light-grey":"#bdbdbd",grey:"#9e9e9e","dark-grey":"#606060","blue-grey":"#607d8b",black:"#000000",white:"#ffffff"};function Ee(e){return"primary"===e?"var(--primary-color, #03a9f4)":"accent"===e?"var(--accent-color, #ff9800)":`var(--${e}-color, ${ze[e]??"#9e9e9e"})`}function Re(e){const t=e.trim();let i=/^#([0-9a-f]{3})$/i.exec(t);return i?[...i[1]].map(e=>parseInt(e+e,16)):(i=/^#([0-9a-f]{6})/i.exec(t),i?[0,2,4].map(e=>parseInt(i[1].slice(e,e+2),16)):(i=/^rgba?\(\s*(\d+)[ ,]+(\d+)[ ,]+(\d+)/i.exec(t),i?[Number(i[1]),Number(i[2]),Number(i[3])]:null))}function Le(e){const t=e.replace(/-/g," ");return t.charAt(0).toUpperCase()+t.slice(1)}function Ne(e,t){return e.get(t)??{id:t,name:t,color:"grey",description:"",icon:"",builtin:!1,count:0}}function Ie(e){return Se(e)?`AI Agent (${Ce(e)})`:Ce(e)}const Oe=e=>e.labels.includes("history"),Pe=e=>ve.includes(e.status)&&!Oe(e),Me=e=>e.labels.includes("enhancement"),De=[{id:"active",icon:"mdi:inbox-outline",label:"Inbox",count:!0,match:e=>"new"===e.status&&!Oe(e)&&!Me(e)},{id:"progress",icon:"mdi:progress-wrench",label:"In Progress",count:!0,match:e=>("in_progress"===e.status||"open"===e.status)&&!Oe(e)},{id:"enhancements",icon:"mdi:lightbulb-outline",label:"Enhancements",count:!0,match:e=>Pe(e)&&Me(e)},{id:"all",icon:"mdi:format-list-bulleted",label:"All",match:()=>!0}],He=[{id:"",label:"Everything",match:e=>!Oe(e)},{id:"active",label:"Open",match:Pe},{id:"closed",label:"Closed",match:e=>("resolved"===e.status||"closed"===e.status)&&!Oe(e)},{id:"history",label:"History",match:Oe}],je=He.map(({id:e,label:t})=>({id:e,label:t}));function Be(e){return[e.category,e.priority,e.label,e.person,e.agent,"all"===e.view?e.scope:""].filter(Boolean).length}let Ue=class extends ne{constructor(){super(...arguments),this.categoryMap=new Map,this.labelMap=new Map,this.isAdmin=!1,this.maxBadges=4,this.coloured=!1,this.expanded=!1,this.show="all"}_pickCategory(e,t){e.stopPropagation(),e.preventDefault(),this.dispatchEvent(new CustomEvent("pick-category",{detail:{ticket:t,rect:e.currentTarget.getBoundingClientRect()},bubbles:!0,composed:!0}))}_category(e){const t=e.category?this.categoryMap.get(e.category):void 0,i=t=>this._pickCategory(t,e),r=t=>("Enter"===t.key||" "===t.key)&&this._pickCategory(t,e);if(!t&&!this.isAdmin)return W;const s=t?q`<ha-icon .icon=${t.icon||"mdi:tag-outline"}></ha-icon>${t.name}`:q`<ha-icon icon="mdi:plus"></ha-icon>Add Category`;return this.isAdmin?q`<span class="category clickable ${t?"":"none"}" role="button" tabindex="0" aria-haspopup="listbox"
          aria-label=${t?`Category: ${t.name}. Change`:"Add Category"} @click=${i} @keydown=${r}>${s}</span>`:q`<span class="category">${s}</span>`}_askRemove(e,t,i){e.stopPropagation(),e.preventDefault(),this.dispatchEvent(new CustomEvent("remove-label",{detail:{ticket:t,label:i},bubbles:!0,composed:!0}))}_badges(e){const t=e.labels.filter(e=>"home-assistant"!==e).map(e=>Ne(this.labelMap,e));return q`${t.slice(0,this.maxBadges).map(t=>q`<span class="badge" role=${this.isAdmin?"group":"img"} aria-label=${t.name}
        style="--label-color: ${Ee(t.color)}; --label-fg: ${function(e){let t=null;try{const i="primary"===e?"--primary-color":"accent"===e?"--accent-color":`--${e}-color`;t=Re(getComputedStyle(document.documentElement).getPropertyValue(i))}catch{}t??(t=Re(ze[e]??"#9e9e9e")??[158,158,158]);const i=(([e,t,i])=>{const[r,s,o]=[e,t,i].map(e=>{const t=e/255;return t<=.03928?t/12.92:((t+.055)/1.055)**2.4});return.2126*r+.7152*s+.0722*o})(t);return(i+.05)/.05>=1.05/(i+.05)?"#000000":"#ffffff"}(t.color)}"><ha-icon .icon=${t.icon||"mdi:label-outline"}></ha-icon><span class="name">${t.name}</span>${this.isAdmin?q`<span class="x" role="button" tabindex="0" aria-label="Remove ${t.name} from this ticket"
              @click=${i=>this._askRemove(i,e,t)}
              @keydown=${i=>("Enter"===i.key||" "===i.key)&&this._askRemove(i,e,t)}><ha-icon icon="mdi:close"></ha-icon></span>`:W}</span>`)}${t.length>this.maxBadges?q`<span class="more-labels">+${t.length-this.maxBadges}</span>`:W}`}render(){const e=this.ticket;return q`${"labels"!==this.show?this._category(e):W}${"category"!==this.show?q`${this._badges(e)}<slot></slot>`:W}`}};Ue.styles=[ue,n`
      :host {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 6px;
      }
      .badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        min-width: 24px;
        height: 24px;
        padding: 0 4px; /* 4 + 14 + 4 + the 1px borders: a 24px circle until it expands */
        border-radius: 12px;
        border: 1px solid var(--st-outline);
        white-space: nowrap;
        /* Quiet grey until you point at one, then its own colour, so a long list isn't a wall of colour. */
        background: color-mix(in srgb, var(--st-fg) 12%, transparent);
        color: var(--st-fg-secondary);
        transition:
          background-color 150ms ease-in-out,
          color 150ms ease-in-out,
          border-color 150ms ease-in-out;
      }
      /* In the ticket header the badges are in their own colour all the time. */
      :host([coloured]) .badge {
        background: var(--label-color);
        color: var(--label-fg);
        border-color: transparent;
        /* Muted until you point at one, so they don't compete with the title. */
        opacity: 0.75;
        transition:
          opacity 150ms ease-in-out,
          background-color 150ms ease-in-out,
          color 150ms ease-in-out,
          border-color 150ms ease-in-out;
      }
      :host([coloured]) .badge:hover,
      :host([coloured]) .badge:focus-within {
        opacity: 1;
      }
      /* In the ticket header every badge is open: its name, and the x for admins. */
      :host([expanded]) .badge {
        padding-right: 10px;
      }
      :host([expanded]) .badge .name {
        max-width: 160px;
        margin-left: 6px;
        opacity: 1;
      }
      :host([expanded]) .badge .x {
        max-width: 18px;
        margin-left: 4px;
        margin-right: -6px;
        opacity: 1;
      }
      /* Keyboard focus opens a badge the way pointing at it does. */
      .badge:focus-within {
        padding-right: 10px;
        background: var(--label-color);
        color: var(--label-fg);
      }
      .badge:focus-within .name {
        max-width: 160px;
        margin-left: 6px;
        opacity: 1;
      }
      .badge:focus-within .x {
        max-width: 18px;
        margin-left: 4px;
        margin-right: -6px;
        opacity: 1;
      }
      .badge:hover {
        padding-right: 10px;
        background: var(--label-color);
        color: var(--label-fg);
      }
      .badge ha-icon {
        --mdc-icon-size: 14px;
      }
      /* The label's name grows out to the right of the icon when you point at the badge. */
      .badge .name {
        max-width: 0;
        margin-left: 0;
        overflow: hidden;
        opacity: 0;
        font-size: var(--st-fs-caption);
        font-weight: var(--ha-font-weight-medium, 500);
        transition:
          max-width 200ms ease-in-out,
          margin-left 200ms ease-in-out,
          opacity 150ms ease-in-out;
      }
      .badge:hover .name {
        max-width: 160px;
        margin-left: 6px;
        opacity: 1;
      }
      /* A small x at the right end of an expanded badge removes the label from this ticket (after a confirmation). */
      .badge .x {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        max-width: 0;
        margin-left: 0;
        overflow: hidden;
        opacity: 0;
        border-radius: 50%;
        cursor: pointer;
        transition:
          max-width 200ms ease-in-out,
          margin-left 200ms ease-in-out,
          opacity 150ms ease-in-out;
      }
      .badge:hover .x {
        max-width: 18px;
        margin-left: 4px;
        margin-right: -6px;
        opacity: 1;
      }
      .badge .x:hover,
      .badge .x:focus-visible {
        background: color-mix(in srgb, var(--label-fg) 22%, transparent);
        outline: none;
      }
      .badge .x ha-icon {
        --mdc-icon-size: 14px;
      }
      @media (prefers-reduced-motion: reduce) {
        .badge .name,
        .badge .x {
          transition: none;
        }
      }
      .more-labels {
        font-size: var(--st-fs-caption);
        color: var(--st-fg-secondary);
      }
      .category {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        height: 24px;
        padding: 0 12px 0 8px;
        box-sizing: border-box;
        border: 1px solid var(--st-outline);
        border-radius: var(--st-r-pill);
        font-size: var(--st-fs-caption);
        font-weight: var(--ha-font-weight-medium, 500);
        /* Grey until you point at it, then it comes up to full contrast. */
        color: var(--st-fg-secondary);
        max-width: 100%;
        transition:
          color 150ms ease-in-out,
          border-color 150ms ease-in-out;
      }
      .category:hover {
        color: var(--st-fg);
        border-color: var(--st-field-outline-hover);
      }
      .category ha-icon {
        --mdc-icon-size: 16px;
        color: inherit;
      }
      .category.clickable {
        cursor: pointer;
      }
      /* Not sorted yet: a dashed outline that invites you to add one. */
      .category.none {
        border-style: dashed;
      }
    `],e([de({attribute:!1})],Ue.prototype,"ticket",void 0),e([de({attribute:!1})],Ue.prototype,"categoryMap",void 0),e([de({attribute:!1})],Ue.prototype,"labelMap",void 0),e([de({type:Boolean})],Ue.prototype,"isAdmin",void 0),e([de({type:Number})],Ue.prototype,"maxBadges",void 0),e([de({type:Boolean,reflect:!0})],Ue.prototype,"coloured",void 0),e([de({type:Boolean,reflect:!0})],Ue.prototype,"expanded",void 0),e([de()],Ue.prototype,"show",void 0),Ue=e([pe("st-ticket-tags")],Ue);let qe=class extends ne{constructor(){super(...arguments),this.tickets=[],this.selectedId=null,this.language=void 0,this.isAdmin=!1,this.categoryMap=new Map,this.labelMap=new Map}_select(e){this.dispatchEvent(new CustomEvent("select-ticket",{detail:e,bubbles:!0,composed:!0}))}_filterPerson(e,t){e.stopPropagation(),e.preventDefault(),this.dispatchEvent(new CustomEvent("filter-person",{detail:t,bubbles:!0,composed:!0}))}render(){return this.tickets.length?q`${this.tickets.map(e=>{const t="resolved"===e.status||"closed"===e.status;return q`
        <button
          class="row s-${e.status} ${t?"done":""} ${e.id===this.selectedId?"selected":""}"
          @click=${()=>this._select(e.id)}
        >
          <ha-icon class="state" .icon=${_e[e.status]} role="img" aria-label=${ye[e.status]}></ha-icon>
          <div class="body">
            <div class="title">${e.title}</div>
            <div class="meta">
              <span class="ref">Opened ${Ae(e.created_at,this.language)} by <span class="who" role="button" tabindex="0" aria-label="Show tickets from ${Ce(e.requester)}"
                @click=${t=>this._filterPerson(t,e.requester)}
                @keydown=${t=>("Enter"===t.key||" "===t.key)&&this._filterPerson(t,e.requester)}><ha-icon icon=${Te(e.requester)}></ha-icon> ${Ce(e.requester)}</span></span>
              ${e.assignee&&Se(e.assignee)?q`<span><ha-icon icon=${Te(e.assignee)}></ha-icon> With AI Agent</span>`:W}
              ${e.labels.includes(xe)?q`<span class="blocked" title="Waiting on a person, a part or a fix"><ha-icon icon="mdi:timer-sand"></ha-icon> Blocked</span>`:W}
              ${e.comment_count?q`<span><ha-icon icon="mdi:comment-outline"></ha-icon> ${e.comment_count}</span>`:W}
            </div>
            <div class="meta2"><st-ticket-tags .ticket=${e} .categoryMap=${this.categoryMap} .labelMap=${this.labelMap} .isAdmin=${this.isAdmin}></st-ticket-tags></div>
          </div>
          ${"urgent"===e.priority||"high"===e.priority?q`<ha-icon class="prio ${e.priority}" .icon=${"urgent"===e.priority?"mdi:alert":"mdi:alert-outline"}
                role="img" aria-label="${we[e.priority]} priority"></ha-icon>`:q`<span></span>`}
        </button>
      `})}`:q`<div class="empty">No tickets here.</div>`}};qe.styles=[ue,n`
      :host {
        display: block;
        overflow-y: auto;
        overflow-x: hidden;
      }
      .row {
        display: grid;
        /* State icon (4px in), the text, then the priority icon: 18px from the state icon to the text, 14px from the text to the priority icon, and 20px from both edges. */
        grid-template-columns: 32px minmax(0, 1fr) 16px;
        gap: 14px;
        width: 100%;
        height: auto;
        padding: 12px 20px 12px 16px;
        border-radius: 0;
        border-bottom: 1px solid var(--st-divider);
        text-align: left;
        color: var(--st-fg);
        font-weight: 400;
        align-items: start;
        position: relative;
      }
      .row:hover:not(.selected) {
        background: var(--st-hover);
      }
      .row.selected {
        background: var(--st-selected, var(--st-hover));
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
      /* State colours: open is green, in progress blue, resolved purple, closed grey. */
      .state {
        --mdc-icon-size: 24px;
        /* Its centre lines up with the centre of the New Ticket button above (32px in). */
        margin: -1px 0 0 4px;
        color: var(--st-fg-secondary);
      }
      .s-new .state {
        color: var(--success-color, var(--st-success));
      }
      .s-in_progress .state,
      .s-open .state {
        color: var(--st-accent);
      }
      .s-resolved .state {
        color: var(--purple-color, #926bc7);
      }
      .body {
        min-width: 0;
      }
      .title {
        font-size: var(--st-fs-row);
        line-height: 22px;
        overflow-wrap: anywhere;
      }
      .done .title {
        color: var(--st-fg-secondary);
      }
      /*
       * The category sits where the labels used to: what part of the home this ticket is about.
       * An outlined pill, so it reads as a different kind of thing from the filled label pills.
       */
      /* The category pill and, to its right, the ticket's labels as small round icon badges. */
      .meta2 {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 8px;
      }
      .meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 2px 10px;
        margin-top: 4px;
        font-size: var(--st-fs-caption);
        color: var(--st-fg-secondary);
      }
      .meta ha-icon {
        --mdc-icon-size: 14px;
        vertical-align: -2px;
      }
      .who {
        cursor: pointer;
        border-radius: 4px;
      }
      .who:hover,
      .who:focus-visible {
        color: var(--st-fg);
        text-decoration: underline;
        outline: none;
      }
      /* Blocked is the one label that says nothing can happen until something outside changes, so it is spelled out. */
      .meta .blocked {
        color: var(--st-warning);
        font-weight: 500;
      }
      .ref {
        font-variant-numeric: tabular-nums;
      }
      /*
       * Priority is a small warning icon in a fixed column at the right of every row, so it always lines up.
       * Only urgent (a red filled triangle) and high (an amber outlined one) show one: normal and low are the
       * quiet default.
       */
      .prio {
        --mdc-icon-size: 16px;
        margin-top: 2px;
      }
      .prio.urgent {
        color: var(--st-danger);
      }
      .prio.high {
        color: var(--st-warning);
      }
      .empty {
        padding: 48px 24px;
        text-align: center;
        color: var(--st-fg-secondary);
        font-size: var(--st-fs-row);
      }
    `],e([de({attribute:!1})],qe.prototype,"tickets",void 0),e([de({type:Number})],qe.prototype,"selectedId",void 0),e([de()],qe.prototype,"language",void 0),e([de({type:Boolean})],qe.prototype,"isAdmin",void 0),e([de({attribute:!1})],qe.prototype,"categoryMap",void 0),e([de({attribute:!1})],qe.prototype,"labelMap",void 0),qe=e([pe("st-ticket-list")],qe);const Fe=2;class We{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}class Ze extends We{constructor(e){if(super(e),this.it=W,e.type!==Fe)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===W||null==e)return this._t=void 0,this.it=e;if(e===F)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}Ze.directiveName="unsafeHTML",Ze.resultType=1;const Ge=(e=>(...t)=>({_$litDirective$:e,values:t}))(Ze);let Ye=class extends ne{constructor(){super(...arguments),this.options=[],this.value="",this.label="",this.placeholder="",this.plain=!1,this.up=!1,this._open=!1}_pick(e){this._open=!1,e!==this.value&&this.dispatchEvent(new CustomEvent("change",{detail:e,bubbles:!0,composed:!0}))}render(){const e=this.options.find(e=>e.id===this.value)??this.options[0];return q`
      <button class="dd ${this.value&&!this.plain?"active":""}" aria-haspopup="listbox" aria-expanded=${this._open}
        aria-label=${this.label} @click=${()=>this._open=!this._open}
        @keydown=${e=>"Escape"===e.key&&(this._open=!1)}>
        <span>${!this.value&&this.placeholder?this.placeholder:e?.label??""}</span><ha-icon icon="mdi:menu-down"></ha-icon>
      </button>
      ${this._open?q`<button class="backdrop" tabindex="-1" aria-label="Close" @click=${()=>this._open=!1}></button>
            <div class="menu" role="listbox" @keydown=${e=>"Escape"===e.key&&(this._open=!1)}>
              ${this.options.map(e=>q`<button role="option" aria-selected=${e.id===this.value}
                class=${e.id===this.value?"selected":""} @click=${()=>this._pick(e.id)}>${e.label}</button>`)}
            </div>`:W}
    `}};
/*! @license DOMPurify 3.4.17 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.17/LICENSE */
function Xe(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,r=Array(t);i<t;i++)r[i]=e[i];return r}
/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
function Qe(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var i=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=i){var r,s,o,n,a=[],l=!0,c=!1;try{if(o=(i=i.call(e)).next,0===t);else for(;!(l=(r=o.call(i)).done)&&(a.push(r.value),a.length!==t);l=!0);}catch(e){c=!0,s=e}finally{try{if(!l&&null!=i.return&&(n=i.return(),Object(n)!==n))return}finally{if(c)throw s}}return a}}(e,t)||function(e,t){if(e){if("string"==typeof e)return Xe(e,t);var i={}.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?Xe(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}Ye.styles=[ue,n`
      :host {
        position: relative;
        display: inline-block;
        min-width: 0;
      }
      button.dd {
        width: 100%;
        height: var(--st-h-bar);
        padding: 0 8px 0 var(--ha-space-4, 16px);
        gap: 4px;
        border: 1px solid var(--st-outline);
        border-radius: var(--st-r-pill);
        background: transparent;
        color: var(--st-fg);
        font-weight: 400;
        font-size: var(--st-fs-body);
        justify-content: space-between;
      }
      button.dd:hover {
        background-image: linear-gradient(var(--st-hover), var(--st-hover));
      }
      button.dd.active {
        color: var(--st-accent);
        border-color: var(--st-accent);
      }
      button.dd span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      button.dd ha-icon {
        --mdc-icon-size: 24px;
        flex: none;
        color: var(--st-fg-secondary);
      }
      .backdrop {
        position: fixed;
        inset: 0;
        z-index: 10;
        height: auto;
        padding: 0;
        border-radius: 0;
        background: transparent;
        cursor: default;
      }
      .menu {
        position: absolute;
        z-index: 11;
        top: calc(100% + 4px);
        left: 0;
        min-width: 100%;
        max-height: 60vh;
        overflow-y: auto;
        padding: 8px 0;
        border-radius: 4px;
        background: var(--st-surface);
        box-shadow: var(--st-shadow-m);
        outline: 1px solid var(--st-divider);
      }
      /* Docked at the bottom of a pane: open upward. */
      :host([up]) .menu {
        top: auto;
        bottom: calc(100% + 4px);
      }
      .menu button {
        width: 100%;
        height: 44px;
        padding: 0 16px;
        border-radius: 0;
        justify-content: flex-start;
        color: var(--st-fg);
        font-weight: 400;
        font-size: var(--st-fs-body);
        white-space: nowrap;
      }
      .menu button.selected {
        color: var(--st-accent);
        background: color-mix(in srgb, var(--st-accent) 12%, transparent);
      }
    `],e([de({attribute:!1})],Ye.prototype,"options",void 0),e([de()],Ye.prototype,"value",void 0),e([de()],Ye.prototype,"label",void 0),e([de()],Ye.prototype,"placeholder",void 0),e([de({type:Boolean})],Ye.prototype,"plain",void 0),e([de({type:Boolean,reflect:!0})],Ye.prototype,"up",void 0),e([he()],Ye.prototype,"_open",void 0),Ye=e([pe("st-dropdown")],Ye);const Ve=Object.entries,Ke=Object.setPrototypeOf,Je=Object.isFrozen,et=Object.getPrototypeOf,tt=Object.getOwnPropertyDescriptor;let it=Object.freeze,rt=Object.seal,st=Object.create,ot="undefined"!=typeof Reflect&&Reflect,nt=ot.apply,at=ot.construct;it||(it=function(e){return e}),rt||(rt=function(e){return e}),nt||(nt=function(e,t){for(var i=arguments.length,r=new Array(i>2?i-2:0),s=2;s<i;s++)r[s-2]=arguments[s];return e.apply(t,r)}),at||(at=function(e){for(var t=arguments.length,i=new Array(t>1?t-1:0),r=1;r<t;r++)i[r-1]=arguments[r];return new e(...i)});const lt=Lt(Array.prototype.forEach),ct=Lt(Array.prototype.lastIndexOf),dt=Lt(Array.prototype.pop),ht=Lt(Array.prototype.push),pt=Lt(Array.prototype.slice),ut=Lt(Array.prototype.splice),gt=Array.isArray,ft=Nt(Set),mt=Lt(Set.prototype.add),bt=Lt(Set.prototype.has),vt=Lt(String.prototype.toLowerCase),xt=Lt(String.prototype.toString),yt=Lt(String.prototype.match),_t=Lt(String.prototype.replace),kt=Lt(String.prototype.indexOf),wt=Lt(String.prototype.trim),$t=Lt(Number.prototype.toString),At=Lt(Boolean.prototype.toString),St="undefined"==typeof BigInt?null:Lt(BigInt.prototype.toString),Tt="undefined"==typeof Symbol?null:Lt(Symbol.prototype.toString),Ct=Lt(Object.prototype.hasOwnProperty),zt=Lt(Object.prototype.toString),Et=Lt(RegExp.prototype.test),Rt=Nt(TypeError);function Lt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var i=arguments.length,r=new Array(i>1?i-1:0),s=1;s<i;s++)r[s-1]=arguments[s];return nt(e,t,r)}}function Nt(e){return function(){for(var t=arguments.length,i=new Array(t),r=0;r<t;r++)i[r]=arguments[r];return at(e,i)}}function It(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:vt;if(Ke&&Ke(e,null),!gt(t))return e;let r=t.length;for(;r--;){let s=t[r];if("string"==typeof s){const e=i(s);e!==s&&(Je(t)||(t[r]=e),s=e)}e[s]=!0}return e}function Ot(e){for(let t=0;t<e.length;t++)Ct(e,t)||(e[t]=null);return e}function Pt(e){const t=st(null);for(const r of Ve(e)){var i=Qe(r,2);const s=i[0],o=i[1];Ct(e,s)&&(gt(o)?t[s]=Ot(o):o&&"object"==typeof o&&o.constructor===Object?t[s]=Pt(o):t[s]=o)}return t}function Mt(e,t){for(;null!==e;){const i=tt(e,t);if(i){if(i.get)return Lt(i.get);if("function"==typeof i.value)return Lt(i.value)}e=et(e)}return function(){return null}}const Dt=it(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ht=it(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),jt=it(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Bt=it(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ut=it(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),qt=it(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ft=it(["#text"]),Wt=it(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Zt=it(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Gt=it(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Yt=it(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Xt=rt(/{{[\w\W]*|^[\w\W]*}}/g),Qt=rt(/<%[\w\W]*|^[\w\W]*%>/g),Vt=rt(/\${[\w\W]*/g),Kt=rt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Jt=rt(/^aria-[\-\w]+$/),ei=rt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ti=rt(/^(?:\w+script|data):/i),ii=rt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ri=rt(/^html$/i),si=rt(/^[a-z][.\w]*(-[.\w]+)+$/i),oi=rt(/<[/\w!]/g),ni=rt(/<[/\w]/g),ai=rt(/<\/no(script|embed|frames)/i),li=rt(/\/>/i),ci=1,di=3,hi=7,pi=8,ui=9,gi=11,fi=it(It({},["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"])),mi=function(){return"undefined"==typeof window?null:window},bi=function(e,t,i,r){return Ct(e,t)&&gt(e[t])?It(r.base?Pt(r.base):{},e[t],r.transform):i},vi=function(e,t,i){const r=Ct(e,t)?e[t]:void 0;return r&&"object"==typeof r?Pt(r):i()};var xi=function e(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:mi();const i=t=>e(t);if(i.version="3.4.17",i.removed=[],!t||!t.document||t.document.nodeType!==ui||!t.Element)return i.isSupported=!1,i;let r=t.document;const s=r,o=s.currentScript;t.DocumentFragment;const n=t.HTMLTemplateElement,a=t.Node,l=t.Element,c=t.NodeFilter;void 0===t.NamedNodeMap&&(t.NamedNodeMap||t.MozNamedAttrMap),t.HTMLFormElement;const d=t.DOMParser,h=t.trustedTypes,p=l.prototype,u=Mt(p,"cloneNode"),g=Mt(p,"remove"),f=Mt(p,"removeAttributeNode"),m=Mt(p,"nextSibling"),b=Mt(p,"childNodes"),v=Mt(p,"parentNode"),x=Mt(p,"shadowRoot"),y=Mt(p,"attributes"),_=a&&a.prototype?Mt(a.prototype,"nodeType"):null,k=a&&a.prototype?Mt(a.prototype,"nodeName"):null,w=a&&a.prototype?Mt(a.prototype,"ownerDocument"):null,$=function(e){return _?_(e):e.nodeType},A=function(e){return k?k(e):e.nodeName},S=function(e,t){for(;null!==e;){const i=tt(e,t);if(i)return i.get?Lt(i.get):null;e=et(e)}return null}(p,"namespaceURI"),T=function(e){return S?S(e):e.namespaceURI};if("function"==typeof n){const e=r.createElement("template");e.content&&e.content.ownerDocument&&(r=e.content.ownerDocument)}let C,z,E="",R=!1,L=0;const N=function(){if(L>0)throw Rt('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},I=function(e){N(),L++;try{return C.createHTML(e)}finally{L--}},O=function(){return R||(z=function(e,t){if("object"!=typeof e||"function"!=typeof e.createPolicy)return null;let i=null;const r="data-tt-policy-suffix";t&&t.hasAttribute(r)&&(i=t.getAttribute(r));const s="dompurify"+(i?"#"+i:"");try{return e.createPolicy(s,{createHTML:e=>e,createScriptURL:e=>e})}catch(e){return console.warn("TrustedTypes policy "+s+" could not be created."),null}}(h,o),R=!0),z},P=r,M=P.implementation,D=P.createNodeIterator,H=P.createDocumentFragment,j=P.getElementsByTagName,B=s.importNode;let U={afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]};i.isSupported="function"==typeof Ve&&"function"==typeof v&&M&&void 0!==M.createHTMLDocument;const q=Xt,F=Qt,W=Vt,Z=Kt,G=Jt,Y=ti,X=ii,Q=si;let V=ei,K=null;const J=It({},[...Dt,...Ht,...jt,...Ut,...Ft]);let ee=null;const te=It({},[...Wt,...Zt,...Gt,...Yt]);let ie=Object.seal(st(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),re=null,se=null;const oe=Object.seal(st(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let ne=!0,ae=!0,le=!1,ce=!0,de=!1,he=!0,pe=!1,ue=!1,ge=null,fe=null,me=!1,be=!1,ve=!1,xe=!1,ye=!0,_e=!1;const ke="user-content-";let we=!0,$e=!1,Ae=null,Se={},Te=null;const Ce=It({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let ze=null;const Ee=It({},["audio","video","img","source","image","track"]);let Re=null;const Le=It({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ne="http://www.w3.org/1998/Math/MathML",Ie="http://www.w3.org/2000/svg",Oe="http://www.w3.org/1999/xhtml";let Pe=Oe,Me=!1,De=null;const He=It({},[Ne,Ie,Oe],xt),je=it(["mi","mo","mn","ms","mtext"]);let Be=It({},je);const Ue=it(["annotation-xml"]);let qe=It({},Ue);const Fe=It({},["title","style","font","a","script"]);let We=null;const Ze=["application/xhtml+xml","text/html"];let Ge=null,Ye=null;const Xe=r.createElement("form"),Qe=function(e){return e instanceof RegExp||e instanceof Function},Ke=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(Ye&&Ye===e)return;e&&"object"==typeof e||(e={}),e=Pt(e),We=-1===Ze.indexOf(e.PARSER_MEDIA_TYPE)?"text/html":e.PARSER_MEDIA_TYPE,Ge="application/xhtml+xml"===We?xt:vt,K=bi(e,"ALLOWED_TAGS",J,{transform:Ge}),ee=bi(e,"ALLOWED_ATTR",te,{transform:Ge}),De=bi(e,"ALLOWED_NAMESPACES",He,{transform:xt}),Re=bi(e,"ADD_URI_SAFE_ATTR",Le,{transform:Ge,base:Le}),ze=bi(e,"ADD_DATA_URI_TAGS",Ee,{transform:Ge,base:Ee}),Te=bi(e,"FORBID_CONTENTS",Ce,{transform:Ge}),re=bi(e,"FORBID_TAGS",Pt({}),{transform:Ge}),se=bi(e,"FORBID_ATTR",Pt({}),{transform:Ge}),Se=!!Ct(e,"USE_PROFILES")&&(e.USE_PROFILES&&"object"==typeof e.USE_PROFILES?Pt(e.USE_PROFILES):e.USE_PROFILES),ne=!1!==e.ALLOW_ARIA_ATTR,ae=!1!==e.ALLOW_DATA_ATTR,le=e.ALLOW_UNKNOWN_PROTOCOLS||!1,ce=!1!==e.ALLOW_SELF_CLOSE_IN_ATTR,de=e.SAFE_FOR_TEMPLATES||!1,he=!1!==e.SAFE_FOR_XML,pe=e.WHOLE_DOCUMENT||!1,be=e.RETURN_DOM||!1,ve=e.RETURN_DOM_FRAGMENT||!1,xe=e.RETURN_TRUSTED_TYPE||!1,me=e.FORCE_BODY||!1,ye=!1!==e.SANITIZE_DOM,_e=e.SANITIZE_NAMED_PROPS||!1,we=!1!==e.KEEP_CONTENT,$e=e.IN_PLACE||!1,V=function(e){try{return Et(e,""),!0}catch(e){return!1}}(e.ALLOWED_URI_REGEXP)?e.ALLOWED_URI_REGEXP:ei,Pe="string"==typeof e.NAMESPACE?e.NAMESPACE:Oe,Be=vi(e,"MATHML_TEXT_INTEGRATION_POINTS",()=>It({},je)),qe=vi(e,"HTML_INTEGRATION_POINTS",()=>It({},Ue));const t=vi(e,"CUSTOM_ELEMENT_HANDLING",()=>st(null));if(ie=st(null),Ct(t,"tagNameCheck")&&Qe(t.tagNameCheck)&&(ie.tagNameCheck=t.tagNameCheck),Ct(t,"attributeNameCheck")&&Qe(t.attributeNameCheck)&&(ie.attributeNameCheck=t.attributeNameCheck),Ct(t,"allowCustomizedBuiltInElements")&&"boolean"==typeof t.allowCustomizedBuiltInElements&&(ie.allowCustomizedBuiltInElements=t.allowCustomizedBuiltInElements),rt(ie),de&&(ae=!1),ve&&(be=!0),Se&&(K=It({},Ft),ee=st(null),!0===Se.html&&(It(K,Dt),It(ee,Wt)),!0===Se.svg&&(It(K,Ht),It(ee,Zt),It(ee,Yt)),!0===Se.svgFilters&&(It(K,jt),It(ee,Zt),It(ee,Yt)),!0===Se.mathMl&&(It(K,Ut),It(ee,Gt),It(ee,Yt))),oe.tagCheck=null,oe.attributeCheck=null,Ct(e,"ADD_TAGS")&&("function"==typeof e.ADD_TAGS?oe.tagCheck=e.ADD_TAGS:gt(e.ADD_TAGS)&&(K===J&&(K=Pt(K)),It(K,e.ADD_TAGS,Ge))),Ct(e,"ADD_ATTR")&&("function"==typeof e.ADD_ATTR?oe.attributeCheck=e.ADD_ATTR:gt(e.ADD_ATTR)&&(ee===te&&(ee=Pt(ee)),It(ee,e.ADD_ATTR,Ge))),Ct(e,"ADD_FORBID_CONTENTS")&&gt(e.ADD_FORBID_CONTENTS)&&(Te===Ce&&(Te=Pt(Te)),It(Te,e.ADD_FORBID_CONTENTS,Ge)),we&&(K["#text"]=!0),pe&&It(K,["html","head","body"]),K.table&&(It(K,["tbody"]),delete re.tbody),e.TRUSTED_TYPES_POLICY){if("function"!=typeof e.TRUSTED_TYPES_POLICY.createHTML)throw Rt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if("function"!=typeof e.TRUSTED_TYPES_POLICY.createScriptURL)throw Rt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const t=C;C=e.TRUSTED_TYPES_POLICY;try{E=I("")}catch(e){throw C=t,e}}else null===e.TRUSTED_TYPES_POLICY?(C=void 0,E=""):(void 0===C&&(C=O()),C&&"string"==typeof E&&(E=I("")));it&&it(e),Ye=e},Je=It({},[...Ht,...jt,...Bt]),ot=It({},[...Ut,...qt]),nt=function(e){const t=T(e),i=vt(A(e)),r=v(e);let s,o;return r&&$(r)===ci?(s={namespaceURI:T(r)},o=vt(A(r))):(s={namespaceURI:Pe},o="template"),!!De[t]&&(t===Ie?function(e,t,i){return t.namespaceURI===Oe?"svg"===e:t.namespaceURI===Ne?"svg"===e&&("annotation-xml"===i||Be[i]):Boolean(Je[e])}(i,s,o):t===Ne?function(e,t,i){return t.namespaceURI===Oe?"math"===e:t.namespaceURI===Ie?"math"===e&&qe[i]:Boolean(ot[e])}(i,s,o):t===Oe?function(e,t,i){return!(t.namespaceURI===Ie&&!qe[i])&&!(t.namespaceURI===Ne&&!Be[i])&&!ot[e]&&(Fe[e]||!Je[e])}(i,s,o):!("application/xhtml+xml"!==We||!De[t]))},at=function(e){ht(i.removed,{element:e});try{v(e).removeChild(e)}catch(t){if(g(e),!v(e))throw Rt("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},Nt=function(e,t,i){try{f(e,t)}catch(t){try{e.removeAttribute(i)}catch(e){}}},Ot=function(e){ki(e);const t=b(e);t&&lt(pt(t),e=>{try{g(e)}catch(e){}});const i=$(e)===ci?y(e):null;if(i)for(let t=i.length-1;t>=0;--t){const r=i[t],s=r&&r.name;"string"==typeof s&&Nt(e,r,s)}},xi=function(e,t,r){if(!r)try{r=t.getAttributeNode(e)}catch(e){r=null}ht(i.removed,{attribute:r||null,from:t});try{r?f(t,r):t.removeAttribute(e)}catch(i){try{t.removeAttribute(e)}catch(e){}}if("is"===e)if(be||ve)try{at(t)}catch(e){}else try{t.setAttribute(e,"")}catch(e){}},yi=function(e){const t=y(e);if(t)for(let i=t.length-1;i>=0;--i){const r=t[i],s=r&&r.name;"string"!=typeof s||ee[Ge(s)]||Nt(e,r,s)}},_i=function(e,t){let i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];const r=[e];for(;r.length>0;){const e=r.pop();if(!1===t(e))continue;if(i&&$(e)===ci){const t=x(e);Ni(t)&&r.push(t)}const s=b(e);if(s)for(let e=s.length-1;e>=0;--e)r.push(s[e])}},ki=function(e){_i(e,e=>{$(e)===ci&&yi(e)})},wi=function(e){const t=[];return _i(e,e=>{t.push(e)},!0),t},$i=function(e,t){let r=!1;return lt(i.removed,t=>{t.element&&(r=r||t.element===e,ki(t.element))}),function(e,t){const i=ft();lt(wi(e),e=>{$(e)===ci&&mt(i,e)}),lt(t,e=>{$(e)!==ci||bt(i,e)||yi(e)})}(e,t),r},Ai=function(e,t,i,r){const s=Ci(e);let o;for(;o=s.nextNode();)bt(r,o)&&!bt(Ae,o)&&(t&&Oi(U.uponSanitizeShadowNode,o,null),Hi(o,i),Zi(o,i),Ni(o.content)&&Gi(o.content))},Si=function(e,t){return!!he&&("patchsrc"===e||"for"===e&&"label"!==t&&"output"!==t)},Ti=function(e){let t=null,i=null;if(me)e="<remove></remove>"+e;else{const t=yt(e,/^[\r\n\t ]+/);i=t&&t[0]}"application/xhtml+xml"===We&&Pe===Oe&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const s=C?I(e):e;if(Pe===Oe)try{t=(new d).parseFromString(s,We)}catch(e){}if(!t||!t.documentElement){t=M.createDocument(Pe,"template",null);try{t.documentElement.innerHTML=Me?E:s}catch(e){}}const o=t.body||t.documentElement;return e&&i&&o.insertBefore(r.createTextNode(i),o.childNodes[0]||null),Pe===Oe?j.call(t,pe?"html":"body")[0]:pe?t.documentElement:o},Ci=function(e){const t=w?w(e):e.ownerDocument;return D.call(t||e,e,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},zi=function(e){return e=_t(e,q," "),e=_t(e,F," "),e=_t(e,W," ")},Ei=function(e){var t;Ri(e);const i=null===(t=e.querySelectorAll)||void 0===t?void 0:t.call(e,"template");i&&lt(i,e=>{Ni(e.content)&&Ei(e.content)})},Ri=function(e){e.normalize();const t=w?w(e):e.ownerDocument,i=D.call(t||e,e,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null);let r=i.nextNode();for(;r;)r.data=zi(r.data),r=i.nextNode()},Li=function(e){const t=k?k(e):null;return"string"==typeof t&&("form"===Ge(t)&&("string"!=typeof e.nodeName||"string"!=typeof e.textContent||"function"!=typeof e.removeChild||e.attributes!==y(e)||"function"!=typeof e.removeAttribute||"function"!=typeof e.removeAttributeNode||"function"!=typeof e.getAttributeNode||"function"!=typeof e.setAttribute||"string"!=typeof e.namespaceURI||"function"!=typeof e.insertBefore||"function"!=typeof e.hasChildNodes||e.nodeType!==_(e)||e.childNodes!==b(e)))},Ni=function(e){if(!_||"object"!=typeof e||null===e)return!1;try{return _(e)===gi}catch(e){return!1}},Ii=function(e){if(!_||"object"!=typeof e||null===e)return!1;try{return"number"==typeof _(e)}catch(e){return!1}};function Oi(e,t,r){0!==e.length&&lt(e,e=>{e.call(i,t,r,Ye)})}const Pi=function(e,t){if(e instanceof RegExp)return Et(e,t);if(e instanceof Function){for(var i=arguments.length,r=new Array(i>2?i-2:0),s=2;s<i;s++)r[s-2]=arguments[s];return Boolean(e(t,...r))}return!1},Mi=function(e,t,i,r){return 0===e.length?t:t===i||t===r?Pt(t):t},Di=function(e,t){return e!==t&&null===v(e)&&($e&&ki(e),!0)},Hi=function(e,t){var r;if(r=e,Ae&&mt(Ae,r),Oi(U.beforeSanitizeElements,e,null),Di(e,t))return!0;if(Li(e))return at(e),!0;const s=Ge(A(e));if(K=Mi(U.uponSanitizeElement,K,J,ge),Oi(U.uponSanitizeElement,e,{tagName:s,allowedTags:K}),Di(e,t))return!0;if(function(e,t){return!!(he&&e.hasChildNodes()&&!Ii(e.firstElementChild)&&Et(oi,e.textContent)&&Et(oi,e.innerHTML))||!!(he&&fi[t]&&$(e)===ci&&T(e)===Oe&&(Ii(e.firstElementChild)||"string"==typeof e.textContent&&Et(oi,e.textContent)))||e.nodeType===hi||!(!he||e.nodeType!==pi||!Et(ni,e.data))}(e,s))return at(e),!0;if(re[s]||!(oe.tagCheck instanceof Function&&oe.tagCheck(s))&&!K[s]){const i=function(e,t,i){if(!re[t]&&Ui(t)&&Pi(ie.tagNameCheck,t))return!1;if(we&&!Te[t]&&!Te[vt(t)]){const t=v(e),r=b(e);if(r&&t)for(let s=r.length-1;s>=0;--s){const o=e===i?u(r[s],!0):r[s];t.insertBefore(o,m(e))}}return at(e),!0}(e,s,t);return!(!1!==i||(Oi(U.afterSanitizeElements,e,null),!Di(e,t)))||i}if($(e)===ci&&!nt(e))return at(e),!0;if(("noscript"===s||"noembed"===s||"noframes"===s)&&Et(ai,e.innerHTML))return at(e),!0;if(de&&e.nodeType===di){const t=zi(e.textContent);e.textContent!==t&&(ht(i.removed,{element:e.cloneNode()}),e.textContent=t)}return Oi(U.afterSanitizeElements,e,null),Di(e,t)},ji=function(e,t,i){if(se[t])return!1;if(Si(t,e))return!1;if(ye&&("id"===t||"name"===t)&&(i in r||i in Xe))return!1;const s=ee[t]||oe.attributeCheck instanceof Function&&oe.attributeCheck(t,e);return!(!ae||!Et(Z,t))||(!(!ne||!Et(G,t))||(s?!!Re[t]||(!!Et(V,_t(i,X,""))||(!("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==kt(i,"data:")||!ze[e])||(!(!le||Et(Y,_t(i,X,"")))||!i))):Ui(e)&&Pi(ie.tagNameCheck,e)&&Pi(ie.attributeNameCheck,t,e)||"is"===t&&ie.allowCustomizedBuiltInElements&&Pi(ie.tagNameCheck,i)))},Bi=It({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),Ui=function(e){return!Bi[vt(e)]&&Et(Q,e)},qi=function(e,t,i,r){if(C&&"object"==typeof h&&"function"==typeof h.getAttributeType&&!i)switch(h.getAttributeType(e,t)){case"TrustedHTML":return I(r);case"TrustedScriptURL":return function(e){N(),L++;try{return C.createScriptURL(e)}finally{L--}}(r)}return r},Fi=function(e,t,i,r){try{return i?e.setAttributeNS(i,t,r):e.setAttribute(t,r),!Li(e)||(at(e),!1)}catch(i){return xi(t,e),!1}},Wi=function(e,t){return!(!he||!Et(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,t))||"attributename"===vt(e)&&null!==yt(t,"href")},Zi=function(e,t){if(Oi(U.beforeSanitizeAttributes,e,null),Di(e,t))return;const r=e.attributes;if(!r||Li(e))return;ee=Mi(U.uponSanitizeAttribute,ee,te,fe);const s={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ee,forceKeepAttr:void 0};let o=r.length;const n=Ge(e.nodeName);for(;o--;){const t=r[o],a=t.name,l=t.namespaceURI,c=t.value,d=Ge(a),h=c;let p="value"===a?h:wt(h),u=!1;s.attrName=d,s.attrValue=p,s.keepAttr=!0,s.forceKeepAttr=void 0,Oi(U.uponSanitizeAttribute,e,s),p=s.attrValue,!_e||"id"!==d&&"name"!==d||0===kt(p,ke)||(xi(a,e,t),p=ke+p,u=!0),Wi(a,p)?xi(a,e,t):s.forceKeepAttr||(s.keepAttr&&(ce||!Et(li,p))?(de&&(p=zi(p)),ji(n,d,p)?(p=qi(n,d,l,p),p!==h&&Fi(e,a,l,p)&&u&&dt(i.removed)):xi(a,e,t)):xi(a,e,t))}Oi(U.afterSanitizeAttributes,e,null),Di(e,t)},Gi=function(e){let t=null;const i=Ci(e);for(Oi(U.beforeSanitizeShadowDOM,e,null);t=i.nextNode();)if(Oi(U.uponSanitizeShadowNode,t,null),Hi(t,e),Zi(t,e),Ni(t.content)&&Gi(t.content),$(t)===ci){const e=x(t);Ni(e)&&(Yi(e),Gi(e))}de&&Ri(e),Oi(U.afterSanitizeShadowDOM,e,null)},Yi=function(e){const t=[{node:e,shadow:null}];for(;t.length>0;){const e=t.pop();if(e.shadow){Gi(e.shadow);continue}const i=e.node,r=$(i)===ci,s=b(i);if(s)for(let e=s.length-1;e>=0;--e)t.push({node:s[e],shadow:null});if(r){const e=k?k(i):null;if("string"==typeof e&&"template"===Ge(e)){const e=i.content;Ni(e)&&t.push({node:e,shadow:null})}}if(r){const e=x(i);Ni(e)&&t.push({node:null,shadow:e},{node:e,shadow:null})}}};return i.sanitize=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=null,o=null,n=null,a=null;if(Me=!e,Me&&(e="\x3c!--\x3e"),"string"!=typeof e&&!Ii(e)&&"string"!=typeof(e=function(e){switch(typeof e){case"string":return e;case"number":return $t(e);case"boolean":return At(e);case"bigint":return St?St(e):"0";case"symbol":return Tt?Tt(e):"Symbol()";case"undefined":default:return zt(e);case"function":case"object":{if(null===e)return zt(e);const t=e,i=Mt(t,"toString");if("function"==typeof i){const e=i(t);return"string"==typeof e?e:zt(e)}return zt(e)}}}(e)))throw Rt("dirty is not a string, aborting");if(!i.isSupported)return e;ue?(K=ge,ee=fe):Ke(t),(U.uponSanitizeElement.length>0||U.uponSanitizeAttribute.length>0)&&(K=Pt(K)),U.uponSanitizeAttribute.length>0&&(ee=Pt(ee)),i.removed=[];const l=$e&&"string"!=typeof e&&Ii(e);let c=[];const d=Ae;if(l){h=e,he&&_i(h,e=>{const t=$(e);if(t===hi||t===pi&&Et(ni,e.data)){try{g(e)}catch(e){}return!1}if(t===ci){const t=e,i=Ge(A(e));try{t.hasAttribute&&t.hasAttribute("patchsrc")&&t.removeAttribute("patchsrc"),t.hasAttribute&&t.hasAttribute("for")&&Si("for",i)&&t.removeAttribute("for")}catch(e){}}return!0});const t=A(e);if("string"==typeof t){const i=Ge(t);if(!K[i]||re[i])throw Ot(e),Rt("root node is forbidden and cannot be sanitized in-place")}if(Li(e))throw Ot(e),Rt("root node is clobbered and cannot be sanitized in-place");c=wi(e),Ae=ft()}else if(Ii(e))r=Ti("\x3c!----\x3e"),o=r.ownerDocument.importNode(e,!0),o.nodeType===ci&&"BODY"===o.nodeName||"HTML"===o.nodeName?r=o:r.appendChild(o),Yi(r);else{if(!be&&!de&&!pe&&-1===e.indexOf("<"))return C&&xe?I(e):e;if(r=Ti(e),!r)return be?null:xe?E:""}var h;r&&me&&at(r.firstChild);const p=l?e:r;try{l&&Yi(e);const t=Ci(p);for(;n=t.nextNode();)Hi(n,p),Zi(n,p),Ni(n.content)&&Gi(n.content);l&&function(e,t){const i=Ae;let r=null;const s=()=>(r||(r=ft(),lt(t,e=>{mt(r,e)})),r);for(let t=0;;t++){const r=wi(e),o=[e];let n=!1;if(lt(r,e=>{$(e)===gi?ht(o,e):n||bt(i,e)||(n=bt(s(),e))}),!n)return;if(t>=8)throw Rt("the tree kept changing during in-place sanitization; refusing to return it");lt(o,(t,i)=>{Ai(t,i>0,e,s())})}}(e,c)}catch(t){throw l&&(Ot(e),$i(e,c)),t}finally{Ae=d}if(l){if($i(e,c))throw Rt("a node selected for removal could not be safely returned; refusing to sanitize in place");return de&&Ei(e),e}if(be){if(de&&Ei(r),ve)for(a=H.call(r.ownerDocument);r.firstChild;)a.appendChild(r.firstChild);else a=r;return(ee.shadowroot||ee.shadowrootmode)&&(a=B.call(s,a,!0)),a}let u=pe?r.outerHTML:r.innerHTML;return pe&&K["!doctype"]&&r.ownerDocument&&r.ownerDocument.doctype&&r.ownerDocument.doctype.name&&Et(ri,r.ownerDocument.doctype.name)&&(u="<!DOCTYPE "+r.ownerDocument.doctype.name+">\n"+u),de&&(u=zi(u)),C&&xe?I(u):u},i.setConfig=function(){Ke(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}),ue=!0,ge=K,fe=ee},i.clearConfig=function(){Ye=null,ue=!1,ge=null,fe=null,C=z,E=""},i.isValidAttribute=function(e,t,i){Ye||Ke({});const r=Ge(e),s=Ge(t);return("string"!=typeof i||!(Wi(t,i)||!ce&&Et(li,i)))&&ji(r,s,i)},i.addHook=function(e,t){"function"==typeof t&&Ct(U,e)&&ht(U[e],t)},i.removeHook=function(e,t){if(Ct(U,e)){if(void 0!==t){const i=ct(U[e],t);return-1===i?void 0:ut(U[e],i,1)[0]}return dt(U[e])}},i.removeHooks=function(e){Ct(U,e)&&(U[e]=[])},i.removeAllHooks=function(){U={afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},i}();function yi(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var _i={async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null};function ki(e){_i=e}var wi={exec:()=>null};function $i(e,t=""){let i="string"==typeof e?e:e.source,r={replace:(e,t)=>{let s="string"==typeof t?t:t.source;return s=s.replace(Si.caret,"$1"),i=i.replace(e,s),r},getRegex:()=>new RegExp(i,t)};return r}var Ai=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Si={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[\t ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Ti=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ci=/(?:[*+-]|\d{1,9}[.)])/,zi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ei=$i(zi).replace(/bull/g,Ci).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ri=$i(zi).replace(/bull/g,Ci).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Li=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Ni=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ii=$i(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ni).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Oi=$i(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ci).getRegex(),Pi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Mi=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Di=$i("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$))","i").replace("comment",Mi).replace("tag",Pi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Hi=$i(Li).replace("hr",Ti).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Pi).getRegex(),ji={blockquote:$i(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Hi).getRegex(),code:/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,def:Ii,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,hr:Ti,html:Di,lheading:Ei,list:Oi,newline:/^(?:[ \t]*(?:\n|$))+/,paragraph:Hi,table:wi,text:/^[^\n]+/},Bi=$i("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Ti).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}\t)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Pi).getRegex(),Ui={...ji,lheading:Ri,table:Bi,paragraph:$i(Li).replace("hr",Ti).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Bi).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Pi).getRegex()},qi={...ji,html:$i("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",Mi).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:wi,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:$i(Li).replace("hr",Ti).replace("heading"," *#{1,6} *[^\n]").replace("lheading",Ei).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Fi=/^( {2,}|\\)\n(?!\s*$)/,Wi=/[\p{P}\p{S}]/u,Zi=/[\s\p{P}\p{S}]/u,Gi=/[^\s\p{P}\p{S}]/u,Yi=$i(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Zi).getRegex(),Xi=/(?!~)[\p{P}\p{S}]/u,Qi=$i(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Ai?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Vi=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ki=$i(Vi,"u").replace(/punct/g,Wi).getRegex(),Ji=$i(Vi,"u").replace(/punct/g,Xi).getRegex(),er="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",tr=$i(er,"gu").replace(/notPunctSpace/g,Gi).replace(/punctSpace/g,Zi).replace(/punct/g,Wi).getRegex(),ir=$i(er,"gu").replace(/notPunctSpace/g,/(?:[^\s\p{P}\p{S}]|~)/u).replace(/punctSpace/g,/(?!~)[\s\p{P}\p{S}]/u).replace(/punct/g,Xi).getRegex(),rr=$i("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Gi).replace(/punctSpace/g,Zi).replace(/punct/g,Wi).getRegex(),sr=$i(/\\(punct)/,"gu").replace(/punct/g,Wi).getRegex(),or=$i(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),nr=$i(Mi).replace("(?:--\x3e|$)","--\x3e").getRegex(),ar=$i("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",nr).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),lr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,cr=$i(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",lr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),dr=$i(/^!?\[(label)\]\[(ref)\]/).replace("label",lr).replace("ref",Ni).getRegex(),hr=$i(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ni).getRegex(),pr=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ur={_backpedal:wi,anyPunctuation:sr,autolink:or,blockSkip:Qi,br:Fi,code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,del:wi,emStrongLDelim:Ki,emStrongRDelimAst:tr,emStrongRDelimUnd:rr,escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,link:cr,nolink:hr,punctuation:Yi,reflink:dr,reflinkSearch:$i("reflink|nolink(?!\\()","g").replace("reflink",dr).replace("nolink",hr).getRegex(),tag:ar,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,url:wi},gr={...ur,link:$i(/^!?\[(label)\]\((.*?)\)/).replace("label",lr).getRegex(),reflink:$i(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",lr).getRegex()},fr={...ur,emStrongRDelimAst:ir,emStrongLDelim:Ji,url:$i(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",pr).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:$i(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",pr).getRegex()},mr={...fr,br:$i(Fi).replace("{2,}","*").getRegex(),text:$i(fr.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},br={normal:ji,gfm:Ui,pedantic:qi},vr={normal:ur,gfm:fr,breaks:mr,pedantic:gr},xr={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},yr=e=>xr[e];function _r(e,t){if(t){if(Si.escapeTest.test(e))return e.replace(Si.escapeReplace,yr)}else if(Si.escapeTestNoEncode.test(e))return e.replace(Si.escapeReplaceNoEncode,yr);return e}function kr(e){try{e=encodeURI(e).replace(Si.percentDecode,"%")}catch{return null}return e}function wr(e,t){let i=e.replace(Si.findPipe,(e,t,i)=>{let r=!1,s=t;for(;--s>=0&&"\\"===i[s];)r=!r;return r?"|":" |"}),r=i.split(Si.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(Si.slashPipe,"|");return r}function $r(e,t,i){let r=e.length;if(0===r)return"";let s=0;for(;s<r;){if(e.charAt(r-s-1)!==t)break;s++}return e.slice(0,r-s)}function Ar(e,t,i,r,s){let o=t.href,n=t.title||null,a=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let l={type:"!"===e[0].charAt(0)?"image":"link",raw:i,href:o,title:n,text:a,tokens:r.inlineTokens(a)};return r.state.inLink=!1,l}var Sr=class{options;rules;lexer;constructor(e){this.options=e||_i}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let e=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?e:$r(e,"\n")}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let e=t[0],i=function(e,t,i){let r=e.match(i.other.indentCodeCompensation);if(null===r)return t;let s=r[1];return t.split("\n").map(e=>{let t=e.match(i.other.beginningSpace);if(null===t)return e;let[r]=t;return r.length>=s.length?e.slice(s.length):e}).join("\n")}(e,t[3]||"",this.rules);return{type:"code",raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let t=$r(e,"#");(this.options.pedantic||!t||this.rules.other.endingSpaceChar.test(t))&&(e=t.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:$r(t[0],"\n")}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let e=$r(t[0],"\n").split("\n"),i="",r="",s=[];for(;e.length>0;){let t,o=!1,n=[];for(t=0;t<e.length;t++)if(this.rules.other.blockquoteStart.test(e[t]))n.push(e[t]),o=!0;else{if(o)break;n.push(e[t])}e=e.slice(t);let a=n.join("\n"),l=a.replace(this.rules.other.blockquoteSetextReplace,"\n    $1").replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}\n${a}`:a,r=r?`${r}\n${l}`:l;let c=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(l,s,!0),this.lexer.state.top=c,0===e.length)break;let d=s.at(-1);if("code"===d?.type)break;if("blockquote"===d?.type){let t=d,o=t.raw+"\n"+e.join("\n"),n=this.blockquote(o);s[s.length-1]=n,i=i.substring(0,i.length-t.raw.length)+n.raw,r=r.substring(0,r.length-t.text.length)+n.text;break}if("list"===d?.type){let t=d,o=t.raw+"\n"+e.join("\n"),n=this.list(o);s[s.length-1]=n,i=i.substring(0,i.length-d.raw.length)+n.raw,r=r.substring(0,r.length-t.raw.length)+n.raw,e=o.substring(s.at(-1).raw.length).split("\n");continue}}return{type:"blockquote",raw:i,tokens:s,text:r}}}list(e){let t=this.rules.block.list.exec(e);if(t){let i=t[1].trim(),r=i.length>1,s={type:"list",raw:"",ordered:r,start:r?+i.slice(0,-1):"",loose:!1,items:[]};i=r?`\\d{1,9}\\${i.slice(-1)}`:`\\${i}`,this.options.pedantic&&(i=r?i:"[*+-]");let o=this.rules.other.listItemRegex(i),n=!1;for(;e;){let i=!1,r="",a="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;r=t[0],e=e.substring(r.length);let l=t[2].split("\n",1)[0].replace(this.rules.other.listReplaceTabs,e=>" ".repeat(3*e.length)),c=e.split("\n",1)[0],d=!l.trim(),h=0;if(this.options.pedantic?(h=2,a=l.trimStart()):d?h=t[1].length+1:(h=t[2].search(this.rules.other.nonSpaceChar),h=h>4?1:h,a=l.slice(h),h+=t[1].length),d&&this.rules.other.blankLine.test(c)&&(r+=c+"\n",e=e.substring(c.length+1),i=!0),!i){let t=this.rules.other.nextBulletRegex(h),i=this.rules.other.hrRegex(h),s=this.rules.other.fencesBeginRegex(h),o=this.rules.other.headingBeginRegex(h),n=this.rules.other.htmlBeginRegex(h);for(;e;){let p,u=e.split("\n",1)[0];if(c=u,this.options.pedantic?(c=c.replace(this.rules.other.listReplaceNesting,"  "),p=c):p=c.replace(this.rules.other.tabCharGlobal,"    "),s.test(c)||o.test(c)||n.test(c)||t.test(c)||i.test(c))break;if(p.search(this.rules.other.nonSpaceChar)>=h||!c.trim())a+="\n"+p.slice(h);else{if(d||l.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||s.test(l)||o.test(l)||i.test(l))break;a+="\n"+c}!d&&!c.trim()&&(d=!0),r+=u+"\n",e=e.substring(u.length+1),l=p.slice(h)}}s.loose||(n?s.loose=!0:this.rules.other.doubleBlankLine.test(r)&&(n=!0));let p,u=null;this.options.gfm&&(u=this.rules.other.listIsTask.exec(a),u&&(p="[ ] "!==u[0],a=a.replace(this.rules.other.listReplaceTask,""))),s.items.push({type:"list_item",raw:r,task:!!u,checked:p,loose:!1,text:a,tokens:[]}),s.raw+=r}let a=s.items.at(-1);if(!a)return;a.raw=a.raw.trimEnd(),a.text=a.text.trimEnd(),s.raw=s.raw.trimEnd();for(let e=0;e<s.items.length;e++)if(this.lexer.state.top=!1,s.items[e].tokens=this.lexer.blockTokens(s.items[e].text,[]),!s.loose){let t=s.items[e].tokens.filter(e=>"space"===e.type),i=t.length>0&&t.some(e=>this.rules.other.anyLine.test(e.raw));s.loose=i}if(s.loose)for(let e=0;e<s.items.length;e++)s.items[e].loose=!0;return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:"pre"===t[1]||"script"===t[1]||"style"===t[1],text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let e=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:e,raw:t[0],href:i,title:r}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let i=wr(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split("\n"):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(i.length===r.length){for(let e of r)this.rules.other.tableAlignRight.test(e)?o.align.push("right"):this.rules.other.tableAlignCenter.test(e)?o.align.push("center"):this.rules.other.tableAlignLeft.test(e)?o.align.push("left"):o.align.push(null);for(let e=0;e<i.length;e++)o.header.push({text:i[e],tokens:this.lexer.inline(i[e]),header:!0,align:o.align[e]});for(let e of s)o.rows.push(wr(e,o.header.length).map((e,t)=>({text:e,tokens:this.lexer.inline(e),header:!1,align:o.align[t]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:"="===t[2].charAt(0)?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let e="\n"===t[1].charAt(t[1].length-1)?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let e=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(e)){if(!this.rules.other.endAngleBracket.test(e))return;let t=$r(e.slice(0,-1),"\\");if((e.length-t.length)%2==0)return}else{let e=function(e,t){if(-1===e.indexOf(t[1]))return-1;let i=0;for(let r=0;r<e.length;r++)if("\\"===e[r])r++;else if(e[r]===t[0])i++;else if(e[r]===t[1]&&(i--,i<0))return r;return i>0?-2:-1}(t[2],"()");if(-2===e)return;if(e>-1){let i=(0===t[0].indexOf("!")?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let i=t[2],r="";if(this.options.pedantic){let e=this.rules.other.pedanticHrefTitle.exec(i);e&&(i=e[1],r=e[3])}else r=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(i=this.options.pedantic&&!this.rules.other.endAngleBracket.test(e)?i.slice(1):i.slice(1,-1)),Ar(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let i;if((i=this.rules.inline.reflink.exec(e))||(i=this.rules.inline.nolink.exec(e))){let e=t[(i[2]||i[1]).replace(this.rules.other.multipleSpaceGlobal," ").toLowerCase()];if(!e){let e=i[0].charAt(0);return{type:"text",raw:e,text:e}}return Ar(i,e,i[0],this.lexer,this.rules)}}emStrong(e,t,i=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&i.match(this.rules.other.unicodeAlphaNumeric))&&(!r[1]&&!r[2]||!i||this.rules.inline.punctuation.exec(i))){let i,s,o=[...r[0]].length-1,n=o,a=0,l="*"===r[0][0]?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(l.lastIndex=0,t=t.slice(-1*e.length+o);null!=(r=l.exec(t));){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(s=[...i].length,r[3]||r[4]){n+=s;continue}if((r[5]||r[6])&&o%3&&!((o+s)%3)){a+=s;continue}if(n-=s,n>0)continue;s=Math.min(s,s+n+a);let t=[...r[0]][0].length,l=e.slice(0,o+r.index+t+s);if(Math.min(o,s)%2){let e=l.slice(1,-1);return{type:"em",raw:l,text:e,tokens:this.lexer.inlineTokens(e)}}let c=l.slice(2,-2);return{type:"strong",raw:l,text:c,tokens:this.lexer.inlineTokens(c)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(e),r=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return i&&r&&(e=e.substring(1,e.length-1)),{type:"codespan",raw:t[0],text:e}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let e,i;return"@"===t[2]?(e=t[1],i="mailto:"+e):(e=t[1],i=e),{type:"link",raw:t[0],text:e,href:i,tokens:[{type:"text",raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,i;if("@"===t[2])e=t[0],i="mailto:"+e;else{let r;do{r=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??""}while(r!==t[0]);e=t[0],i="www."===t[1]?"http://"+t[0]:t[0]}return{type:"link",raw:t[0],text:e,href:i,tokens:[{type:"text",raw:e,text:e}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let e=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:e}}}},Tr=class e{tokens;options;state;tokenizer;inlineQueue;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||_i,this.options.tokenizer=this.options.tokenizer||new Sr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:Si,block:br.normal,inline:vr.normal};this.options.pedantic?(t.block=br.pedantic,t.inline=vr.pedantic):this.options.gfm&&(t.block=br.gfm,this.options.breaks?t.inline=vr.breaks:t.inline=vr.gfm),this.tokenizer.rules=t}static get rules(){return{block:br,inline:vr}}static lex(t,i){return new e(i).lex(t)}static lexInline(t,i){return new e(i).inlineTokens(t)}lex(e){e=e.replace(Si.carriageReturn,"\n"),this.blockTokens(e,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let t=this.inlineQueue[e];this.inlineTokens(t.src,t.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],i=!1){for(this.options.pedantic&&(e=e.replace(Si.tabCharGlobal,"    ").replace(Si.spaceLine,""));e;){let r;if(this.options.extensions?.block?.some(i=>!!(r=i.call({lexer:this},e,t))&&(e=e.substring(r.raw.length),t.push(r),!0)))continue;if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length);let i=t.at(-1);1===r.raw.length&&void 0!==i?i.raw+="\n":t.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length);let i=t.at(-1);"paragraph"===i?.type||"text"===i?.type?(i.raw+=(i.raw.endsWith("\n")?"":"\n")+r.raw,i.text+="\n"+r.text,this.inlineQueue.at(-1).src=i.text):t.push(r);continue}if(r=this.tokenizer.fences(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.heading(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.hr(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.blockquote(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.list(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.html(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length);let i=t.at(-1);"paragraph"===i?.type||"text"===i?.type?(i.raw+=(i.raw.endsWith("\n")?"":"\n")+r.raw,i.text+="\n"+r.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title},t.push(r));continue}if(r=this.tokenizer.table(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.lheading(e)){e=e.substring(r.raw.length),t.push(r);continue}let s=e;if(this.options.extensions?.startBlock){let t,i=1/0,r=e.slice(1);this.options.extensions.startBlock.forEach(e=>{t=e.call({lexer:this},r),"number"==typeof t&&t>=0&&(i=Math.min(i,t))}),i<1/0&&i>=0&&(s=e.substring(0,i+1))}if(this.state.top&&(r=this.tokenizer.paragraph(s))){let o=t.at(-1);i&&"paragraph"===o?.type?(o.raw+=(o.raw.endsWith("\n")?"":"\n")+r.raw,o.text+="\n"+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):t.push(r),i=s.length!==e.length,e=e.substring(r.raw.length);continue}if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length);let i=t.at(-1);"text"===i?.type?(i.raw+=(i.raw.endsWith("\n")?"":"\n")+r.raw,i.text+="\n"+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):t.push(r);continue}if(e){let t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw new Error(t)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let i,r=e,s=null;if(this.tokens.links){let e=Object.keys(this.tokens.links);if(e.length>0)for(;null!=(s=this.tokenizer.rules.inline.reflinkSearch.exec(r));)e.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!=(s=this.tokenizer.rules.inline.anyPunctuation.exec(r));)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;null!=(s=this.tokenizer.rules.inline.blockSkip.exec(r));)i=s[2]?s[2].length:0,r=r.slice(0,s.index+i)+"["+"a".repeat(s[0].length-i-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let o=!1,n="";for(;e;){let i;if(o||(n=""),o=!1,this.options.extensions?.inline?.some(r=>!!(i=r.call({lexer:this},e,t))&&(e=e.substring(i.raw.length),t.push(i),!0)))continue;if(i=this.tokenizer.escape(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.tag(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.link(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(i.raw.length);let r=t.at(-1);"text"===i.type&&"text"===r?.type?(r.raw+=i.raw,r.text+=i.text):t.push(i);continue}if(i=this.tokenizer.emStrong(e,r,n)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.codespan(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.br(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.del(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.autolink(e)){e=e.substring(i.raw.length),t.push(i);continue}if(!this.state.inLink&&(i=this.tokenizer.url(e))){e=e.substring(i.raw.length),t.push(i);continue}let s=e;if(this.options.extensions?.startInline){let t,i=1/0,r=e.slice(1);this.options.extensions.startInline.forEach(e=>{t=e.call({lexer:this},r),"number"==typeof t&&t>=0&&(i=Math.min(i,t))}),i<1/0&&i>=0&&(s=e.substring(0,i+1))}if(i=this.tokenizer.inlineText(s)){e=e.substring(i.raw.length),"_"!==i.raw.slice(-1)&&(n=i.raw.slice(-1)),o=!0;let r=t.at(-1);"text"===r?.type?(r.raw+=i.raw,r.text+=i.text):t.push(i);continue}if(e){let t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw new Error(t)}}return t}},Cr=class{options;parser;constructor(e){this.options=e||_i}space(e){return""}code({text:e,lang:t,escaped:i}){let r=(t||"").match(Si.notSpaceStart)?.[0],s=e.replace(Si.endingNewline,"")+"\n";return r?'<pre><code class="language-'+_r(r)+'">'+(i?s:_r(s,!0))+"</code></pre>\n":"<pre><code>"+(i?s:_r(s,!0))+"</code></pre>\n"}blockquote({tokens:e}){return`<blockquote>\n${this.parser.parse(e)}</blockquote>\n`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>\n`}hr(e){return"<hr>\n"}list(e){let t=e.ordered,i=e.start,r="";for(let t=0;t<e.items.length;t++){let i=e.items[t];r+=this.listitem(i)}let s=t?"ol":"ul";return"<"+s+(t&&1!==i?' start="'+i+'"':"")+">\n"+r+"</"+s+">\n"}listitem(e){let t="";if(e.task){let i=this.checkbox({checked:!!e.checked});e.loose?"paragraph"===e.tokens[0]?.type?(e.tokens[0].text=i+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&"text"===e.tokens[0].tokens[0].type&&(e.tokens[0].tokens[0].text=i+" "+_r(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):t+=i+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>\n`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>\n`}table(e){let t="",i="";for(let t=0;t<e.header.length;t++)i+=this.tablecell(e.header[t]);t+=this.tablerow({text:i});let r="";for(let t=0;t<e.rows.length;t++){let s=e.rows[t];i="";for(let e=0;e<s.length;e++)i+=this.tablecell(s[e]);r+=this.tablerow({text:i})}return r&&(r=`<tbody>${r}</tbody>`),"<table>\n<thead>\n"+t+"</thead>\n"+r+"</table>\n"}tablerow({text:e}){return`<tr>\n${e}</tr>\n`}tablecell(e){let t=this.parser.parseInline(e.tokens),i=e.header?"th":"td";return(e.align?`<${i} align="${e.align}">`:`<${i}>`)+t+`</${i}>\n`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${_r(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:i}){let r=this.parser.parseInline(i),s=kr(e);if(null===s)return r;let o='<a href="'+(e=s)+'"';return t&&(o+=' title="'+_r(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:i,tokens:r}){r&&(i=this.parser.parseInline(r,this.parser.textRenderer));let s=kr(e);if(null===s)return _r(i);let o=`<img src="${e=s}" alt="${i}"`;return t&&(o+=` title="${_r(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:_r(e.text)}},zr=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},Er=class e{options;renderer;textRenderer;constructor(e){this.options=e||_i,this.options.renderer=this.options.renderer||new Cr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new zr}static parse(t,i){return new e(i).parse(t)}static parseInline(t,i){return new e(i).parseInline(t)}parse(e,t=!0){let i="";for(let r=0;r<e.length;r++){let s=e[r];if(this.options.extensions?.renderers?.[s.type]){let e=s,t=this.options.extensions.renderers[e.type].call({parser:this},e);if(!1!==t||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(e.type)){i+=t||"";continue}}let o=s;switch(o.type){case"space":i+=this.renderer.space(o);continue;case"hr":i+=this.renderer.hr(o);continue;case"heading":i+=this.renderer.heading(o);continue;case"code":i+=this.renderer.code(o);continue;case"table":i+=this.renderer.table(o);continue;case"blockquote":i+=this.renderer.blockquote(o);continue;case"list":i+=this.renderer.list(o);continue;case"html":i+=this.renderer.html(o);continue;case"def":i+=this.renderer.def(o);continue;case"paragraph":i+=this.renderer.paragraph(o);continue;case"text":{let s=o,n=this.renderer.text(s);for(;r+1<e.length&&"text"===e[r+1].type;)s=e[++r],n+="\n"+this.renderer.text(s);i+=t?this.renderer.paragraph({type:"paragraph",raw:n,text:n,tokens:[{type:"text",raw:n,text:n,escaped:!0}]}):n;continue}default:{let e='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(e),"";throw new Error(e)}}}return i}parseInline(e,t=this.renderer){let i="";for(let r=0;r<e.length;r++){let s=e[r];if(this.options.extensions?.renderers?.[s.type]){let e=this.options.extensions.renderers[s.type].call({parser:this},s);if(!1!==e||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){i+=e||"";continue}}let o=s;switch(o.type){case"escape":case"text":i+=t.text(o);break;case"html":i+=t.html(o);break;case"link":i+=t.link(o);break;case"image":i+=t.image(o);break;case"strong":i+=t.strong(o);break;case"em":i+=t.em(o);break;case"codespan":i+=t.codespan(o);break;case"br":i+=t.br(o);break;case"del":i+=t.del(o);break;default:{let e='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(e),"";throw new Error(e)}}}return i}},Rr=class{options;block;constructor(e){this.options=e||_i}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Tr.lex:Tr.lexInline}provideParser(){return this.block?Er.parse:Er.parseInline}},Lr=class{defaults={async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null};options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=Er;Renderer=Cr;TextRenderer=zr;Lexer=Tr;Tokenizer=Sr;Hooks=Rr;constructor(...e){this.use(...e)}walkTokens(e,t){let i=[];for(let r of e)switch(i=i.concat(t.call(this,r)),r.type){case"table":{let e=r;for(let r of e.header)i=i.concat(this.walkTokens(r.tokens,t));for(let r of e.rows)for(let e of r)i=i.concat(this.walkTokens(e.tokens,t));break}case"list":{let e=r;i=i.concat(this.walkTokens(e.items,t));break}default:{let e=r;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach(r=>{let s=e[r].flat(1/0);i=i.concat(this.walkTokens(s,t))}):e.tokens&&(i=i.concat(this.walkTokens(e.tokens,t)))}}return i}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(e=>{let i={...e};if(i.async=this.defaults.async||i.async||!1,e.extensions&&(e.extensions.forEach(e=>{if(!e.name)throw new Error("extension name required");if("renderer"in e){let i=t.renderers[e.name];t.renderers[e.name]=i?function(...t){let r=e.renderer.apply(this,t);return!1===r&&(r=i.apply(this,t)),r}:e.renderer}if("tokenizer"in e){if(!e.level||"block"!==e.level&&"inline"!==e.level)throw new Error("extension level must be 'block' or 'inline'");let i=t[e.level];i?i.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&("block"===e.level?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:"inline"===e.level&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}"childTokens"in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)}),i.extensions=t),e.renderer){let t=this.defaults.renderer||new Cr(this.defaults);for(let i in e.renderer){if(!(i in t))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let r=i,s=e.renderer[r],o=t[r];t[r]=(...e)=>{let i=s.apply(t,e);return!1===i&&(i=o.apply(t,e)),i||""}}i.renderer=t}if(e.tokenizer){let t=this.defaults.tokenizer||new Sr(this.defaults);for(let i in e.tokenizer){if(!(i in t))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let r=i,s=e.tokenizer[r],o=t[r];t[r]=(...e)=>{let i=s.apply(t,e);return!1===i&&(i=o.apply(t,e)),i}}i.tokenizer=t}if(e.hooks){let t=this.defaults.hooks||new Rr;for(let i in e.hooks){if(!(i in t))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let r=i,s=e.hooks[r],o=t[r];Rr.passThroughHooks.has(i)?t[r]=e=>{if(this.defaults.async&&Rr.passThroughHooksRespectAsync.has(i))return(async()=>{let i=await s.call(t,e);return o.call(t,i)})();let r=s.call(t,e);return o.call(t,r)}:t[r]=(...e)=>{if(this.defaults.async)return(async()=>{let i=await s.apply(t,e);return!1===i&&(i=await o.apply(t,e)),i})();let i=s.apply(t,e);return!1===i&&(i=o.apply(t,e)),i}}i.hooks=t}if(e.walkTokens){let t=this.defaults.walkTokens,r=e.walkTokens;i.walkTokens=function(e){let i=[];return i.push(r.call(this,e)),t&&(i=i.concat(t.call(this,e))),i}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Tr.lex(e,t??this.defaults)}parser(e,t){return Er.parse(e,t??this.defaults)}parseMarkdown(e){return(t,i)=>{let r={...i},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(!0===this.defaults.async&&!1===r.async)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||null===t)return o(new Error("marked(): input parameter is undefined or null"));if("string"!=typeof t)return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(t):t,r=await(s.hooks?await s.hooks.provideLexer():e?Tr.lex:Tr.lexInline)(i,s),o=s.hooks?await s.hooks.processAllTokens(r):r;s.walkTokens&&await Promise.all(this.walkTokens(o,s.walkTokens));let n=await(s.hooks?await s.hooks.provideParser():e?Er.parse:Er.parseInline)(o,s);return s.hooks?await s.hooks.postprocess(n):n})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let i=(s.hooks?s.hooks.provideLexer():e?Tr.lex:Tr.lexInline)(t,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let r=(s.hooks?s.hooks.provideParser():e?Er.parse:Er.parseInline)(i,s);return s.hooks&&(r=s.hooks.postprocess(r)),r}catch(e){return o(e)}}}onError(e,t){return i=>{if(i.message+="\nPlease report this to https://github.com/markedjs/marked.",e){let e="<p>An error occurred:</p><pre>"+_r(i.message+"",!0)+"</pre>";return t?Promise.resolve(e):e}if(t)return Promise.reject(i);throw i}}},Nr=new Lr;function Ir(e,t){return Nr.parse(e,t)}Ir.options=Ir.setOptions=function(e){return Nr.setOptions(e),Ir.defaults=Nr.defaults,ki(Ir.defaults),Ir},Ir.getDefaults=yi,Ir.defaults=_i,Ir.use=function(...e){return Nr.use(...e),Ir.defaults=Nr.defaults,ki(Ir.defaults),Ir},Ir.walkTokens=function(e,t){return Nr.walkTokens(e,t)},Ir.parseInline=Nr.parseInline,Ir.Parser=Er,Ir.parser=Er.parse,Ir.Renderer=Cr,Ir.TextRenderer=zr,Ir.Lexer=Tr,Ir.lexer=Tr.lex,Ir.Tokenizer=Sr,Ir.Hooks=Rr,Ir.parse=Ir,Ir.options,Ir.setOptions,Ir.use,Ir.walkTokens,Ir.parseInline,Er.parse,Tr.lex;const Or=new Lr({gfm:!0,breaks:!1});function Pr(e){const t=Or.parse(e,{async:!1});return xi.sanitize(t,{FORBID_TAGS:["img","picture","source","style","form","input","button","select","textarea","svg","math"]})}Or.use({renderer:{image:({href:e,title:t,text:i})=>`<a href="${e}"${t?` title="${t}"`:""}>${i||e}</a>`}}),xi.addHook("afterSanitizeAttributes",e=>{"A"===e.tagName&&(e.setAttribute("target","_blank"),e.setAttribute("rel","noopener noreferrer"))});let Mr=class extends ne{constructor(){super(...arguments),this.ticket=null,this.isAdmin=!1,this.narrow=!1,this.language=void 0,this.agentName="claude",this.labelMap=new Map,this.people=new Map,this.categoryMap=new Map,this._expanded=!1,this._showHistory=!1,this._descCollapsed=!1,this._descFull=0,this._descSettle=0,this._agentToggle=null,this._priorityTo="",this._comment="",this._expandDescription=()=>{this._descCollapsed&&(this._setDescCollapsed(!1),this.renderRoot.querySelector(".scroll")?.scrollTo({top:0}))},this._scrollTo=null,this._titleKey=e=>{const t=e.target;"Enter"===e.key?(e.preventDefault(),t.blur()):"Escape"===e.key&&(t.value=this.ticket?.title??t.value,t.blur())}}willUpdate(e){if(e.has("ticket")){this.toggleAttribute("open",!!this.ticket);const t=e.get("ticket"),i=t?.events.length??0;t?.id!==this.ticket?.id?(this._scrollTo="top",this._descCollapsed=!1,this._agentToggle=null,this._priorityTo="",this._expanded=!1,this._comment=""):this.ticket&&this.ticket.events.length>i&&(this._scrollTo="bottom")}}_onScroll(e){if(Date.now()<this._descSettle||this._descFull<=56)return;const t=e.currentTarget.scrollTop;!this._descCollapsed&&t>4?this._setDescCollapsed(!0):this._descCollapsed&&t<=0&&this._setDescCollapsed(!1)}_setDescCollapsed(e){this._descCollapsed=e,this._descSettle=Date.now()+400}_fitTitle(e){e.style.height="auto",e.style.height=`${e.scrollHeight+(e.offsetHeight-e.clientHeight)}px`}_saveTitle(e){const t=e.value.replace(/\s+/g," ").trim();t&&t!==this.ticket?.title?this._patch({title:t}):e.value=this.ticket?.title??"",this._fitTitle(e)}connectedCallback(){super.connectedCallback(),this._resizer=new ResizeObserver(()=>{const e=this.renderRoot.querySelector("textarea.title-edit");e&&this._fitTitle(e)}),this._resizer.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._resizer?.disconnect()}updated(){const e=this.renderRoot.querySelector("textarea.title-edit");if(e&&this._fitTitle(e),!this._descCollapsed){const e=this.renderRoot.querySelector(".desc-sticky .card");this._descFull=e?e.offsetHeight:0}if(this._scrollTo){const e=this.renderRoot.querySelector(".scroll"),t=this._scrollTo;this._scrollTo=null,e?.scrollTo({top:"top"===t?0:e.scrollHeight,behavior:"top"===t?"auto":"smooth"})}}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_patch(e){this._fire("patch-ticket",e)}_addLabelControl(e){return q`<button class="add-label" title="Add Label" aria-label="Add Label" aria-haspopup="listbox"
      @click=${t=>this.dispatchEvent(new CustomEvent("pick-label",{detail:{ticket:e,rect:t.currentTarget.getBoundingClientRect()},bubbles:!0,composed:!0}))}><ha-icon icon="mdi:plus"></ha-icon></button>`}_shownPriority(e){return this._priorityTo||e.priority}_togglePriority(e,t){const i=this._shownPriority(e)===t?"normal":t;this._priorityTo=i===e.priority?"":i}_priorityPills(e){const t=this._shownPriority(e),i={high:"mdi:alert-outline",urgent:"mdi:alert"};return q`<div class="assign prio-group" role="group" aria-label="Priority">
      ${["high","urgent"].map(r=>{const s=t===r;return q`<button class="prio-dot ${r} ${s?"on":""}"
          aria-pressed=${s?"true":"false"} aria-label=${we[r]}
          title=${s?`Priority is ${we[r]}. Click to clear.`:`Set priority to ${we[r]}`}
          @click=${()=>this._togglePriority(e,r)}><ha-icon .icon=${i[r]}></ha-icon></button>`})}
    </div>`}_withAgent(e){return!!e.assignee&&Se(e.assignee)}_agentDefault(e){if(this._withAgent(e)||"resolved"===e.status||"closed"===e.status)return!1;const t=[...e.events].reverse().find(e=>"comment"===e.kind||"note"===e.kind);return!!t&&Se(t.actor)}_agentOn(e){return this._agentToggle??(this._withAgent(e)||this._agentDefault(e))}_agentApplies(e){return this._agentOn(e)!==this._withAgent(e)&&(null!==this._agentToggle||!!this._comment.trim())}_canSubmit(e){return!!this._comment.trim()||this._agentApplies(e)||!!this._priorityTo}_agentChip(e){const t=this._agentOn(e),i=this._withAgent(e);return q`<button class="assign-chip ${i&&t?"current":""} ${t&&!i?"picked":""} ${i&&!t?"dropping":""}"
      aria-pressed=${t?"true":"false"} aria-label="Assign to AI Agent" title=${i?t?"With the AI Agent. Click to take it back.":"Will be taken back from the AI Agent. Click to keep it with them.":t?"Will be assigned to the AI Agent. Click to switch off.":"Assign to the AI Agent"}
      @click=${()=>this._agentToggle=!t}><ha-icon icon="mdi:creation"></ha-icon><span><span class="verb">Assign to </span>AI Agent</span></button>`}_submitLabel(e){const t=this._agentApplies(e),i=this._agentOn(e)?"Assign to AI Agent":"Unassign from AI Agent";return this._comment.trim()?t?`Comment and ${i}`:"Comment":t&&this._priorityTo?"Update":t?i:this._priorityTo?"Set Priority":"Comment"}_commentAndReopen(){const e=this._comment.trim();e&&(this._fire("comment",{body:e,internal:!1}),this._comment="",this._patch({status:"in_progress"}))}_submitComment(){const e=this.ticket;if(!e||!this._canSubmit(e))return;const t=this._comment.trim();t&&this._fire("comment",{body:t,internal:!1});const i={};this._agentApplies(e)&&(i.assignee=this._agentOn(e)?this.agentName:null),this._priorityTo&&(i.priority=this._priorityTo),Object.keys(i).length&&this._patch(i),this._comment="",this._agentToggle=null,this._priorityTo=""}_resolve(){const e=this._comment.trim();e?(this._fire("close-ticket",{resolution:e,status:"resolved"}),this._comment=""):this._patch({status:"resolved"})}_change(e){const t=e.data??{},i=e=>Array.isArray(e)?e.map(e=>"labels"===t.field?Ne(this.labelMap,String(e)).name:String(e)).join(", ")||"none":null==e||""===e?"none":String(e);switch(e.kind){case"created":return"created this ticket";case"status":return`changed status from ${ye[t.from]??i(t.from)} to ${ye[t.to]??i(t.to)}`;case"priority":return`changed priority from ${i(t.from)} to ${i(t.to)}`;case"assignee":return t.to?`assigned this to ${i(t.to)}`:"unassigned this";case"link":return`linked ticket #${String(t.to)}`;case"field":return"description"===t.field?"edited the description":`changed ${String(t.field)}${"labels"===t.field||"entities"===t.field?` to ${i(t.to)}`:""}`;default:return e.kind}}_detail(e){const t=e.data??{},i=e=>Array.isArray(e)?e.map(e=>"labels"===t.field?Ne(this.labelMap,String(e)).name:String(e)).join(", ")||"none":null==e||""===e?"none":String(e);switch(e.kind){case"created":return{field:"Ticket Opened",to:"",icon:"mdi:ticket-outline",tone:"var(--st-accent)"};case"status":return{field:"Status",from:ye[t.from]??i(t.from),to:ye[t.to]??i(t.to),icon:"mdi:progress-check",tone:"resolved"===t.to||"closed"===t.to?"var(--st-success)":"var(--st-accent)"};case"priority":return{field:"Priority",from:i(t.from),to:i(t.to),icon:"mdi:flag-outline",tone:"var(--st-warning)"};case"assignee":return{field:"Assignee",from:i(t.from),to:i(t.to),icon:"mdi:account-outline",tone:"var(--st-fg-secondary)"};case"link":return{field:"Linked",to:`ticket #${String(t.to)}`,icon:"mdi:link-variant",tone:"var(--st-fg-secondary)"};case"field":{const e=String(t.field??"field"),r=e.charAt(0).toUpperCase()+e.slice(1),s="labels"===e?"mdi:label-outline":"category"===e?"mdi:shape-outline":"mdi:pencil-outline";return"description"===e?{field:r,to:"edited",icon:s,tone:"var(--st-fg-secondary)"}:{field:r,from:i(t.from),to:i(t.to),icon:s,tone:"var(--st-fg-secondary)"}}default:return{field:e.kind,to:"",icon:"mdi:circle-small",tone:"var(--st-fg-secondary)"}}}_avatar(e){const t=Se(e)?void 0:this.people.get(Ce(e).toLowerCase())?.picture;return t?q`<div class="avatar photo"><img src=${t} alt=${Ce(e)} /></div>`:q`<div class="avatar"><ha-icon .icon=${function(e){const t=e.toLowerCase();return Se(e)?"mdi:creation":"ha"===t||"home assistant"===t?"mdi:home-assistant":"import"===t?"mdi:database-import-outline":"mdi:account-circle-outline"}(e)}></ha-icon></div>`}_eventTemplate(e){const t=(i=e.created_at,r=this.language,new Date(i).toLocaleString(r,{dateStyle:"medium",timeStyle:"short"}));var i,r;const s=this._showHistory?q`<span title=${Ae(e.created_at,this.language)}>${t}</span>`:q`<span title=${t}>${Ae(e.created_at,this.language)}</span>`;if("comment"===e.kind||"note"===e.kind)return q`
        <div class="ev">
          ${this._avatar(e.actor)}
          <div>
            <div class="who"><b>${Ie(e.actor)}</b> · <span class="when">${s}</span>${"note"===e.kind?q`<span class="label dense">internal note</span>`:W}</div>
            <div class="bubble md ${"note"===e.kind?"note":""}">${Ge(Pr(e.body??""))}</div>
          </div>
        </div>`;const o=this._detail(e);return q`
      <div class="ev system">
        <ha-icon .icon=${o.icon}></ha-icon>
        <div class="line">
          <span><b>${o.field}</b> ${o.to}${void 0!==o.from?q`<s>${o.from}</s>`:W}</span>
          <span class="stamp">${Ie(e.actor)} · ${t}</span>
        </div>
      </div>`}render(){const e=this.ticket;if(!e)return q`<div class="empty"><ha-icon icon="mdi:ticket-outline"></ha-icon><span>Select a ticket</span></div>`;const t=e.description.length>1800,i="resolved"===e.status||"closed"===e.status;return q`
      <div class="top">
        <div class="head">
          ${this.narrow?q`<button class="icon back" title="Back" aria-label="Back" @click=${()=>this._fire("back")}><ha-icon icon="mdi:arrow-left"></ha-icon></button>`:W}
          ${this.isAdmin?q`<textarea class="title-edit" rows="1" aria-label="Title" spellcheck="false" .value=${e.title}
                @input=${e=>this._fitTitle(e.target)}
                @keydown=${this._titleKey}
                @blur=${e=>this._saveTitle(e.target)}></textarea>`:q`<h1>${e.title}</h1>`}
          <button class="icon hist" aria-pressed=${this._showHistory?"true":"false"}
            title=${this._showHistory?"Hide history":"Show history"} aria-label="Show history"
            @click=${()=>this._showHistory=!this._showHistory}><ha-icon icon="mdi:history"></ha-icon></button>
        </div>
        <div class="sub">
          <div class="meta-line">
            <span>Opened ${Ae(e.created_at,this.language)} by <ha-icon icon=${Te(e.requester)}></ha-icon> ${Ce(e.requester)}</span>
            ${e.assignee&&Se(e.assignee)?q`<span><ha-icon icon=${Te(e.assignee)}></ha-icon> With ${Ie(e.assignee)}</span>`:W}
            ${e.labels.includes(xe)?q`<span class="blocked" title="Waiting on a person, a part or a fix"><ha-icon icon="mdi:timer-sand"></ha-icon> Blocked</span>`:W}
            ${e.comment_count?q`<span><ha-icon icon="mdi:comment-outline"></ha-icon> ${e.comment_count}</span>`:W}
          </div>
          <!-- Second line: the category, status and priority, then the labels (which wrap on to their own line if they don't fit). -->
          <div class="tag-line">
            <st-ticket-tags show="category" .ticket=${e} .categoryMap=${this.categoryMap} .labelMap=${this.labelMap} .isAdmin=${this.isAdmin}></st-ticket-tags>
            <span class="status" style="--state: ${ke[e.status]}"><ha-icon .icon=${_e[e.status]}></ha-icon>${ye[e.status]}</span>
            ${"urgent"===e.priority||"high"===e.priority?q`<span class="prio ${e.priority}"><ha-icon .icon=${"urgent"===e.priority?"mdi:alert":"mdi:alert-outline"}></ha-icon>${we[e.priority]}</span>`:W}
            <!-- The labels are one block: when they don't fit beside the category they drop to a line of their own. -->
            <st-ticket-tags show="labels" .ticket=${e} .categoryMap=${this.categoryMap} .labelMap=${this.labelMap} .isAdmin=${this.isAdmin} .maxBadges=${12} coloured expanded>
              ${this.isAdmin?this._addLabelControl(e):W}
            </st-ticket-tags>
          </div>
        </div>
      </div>
      <div class="scroll" @scroll=${this._onScroll}>
        <div class="wrap">
        ${e.description?q`<div class="desc-sticky ${this._descCollapsed?"one":""}"
              role=${this._descCollapsed?"button":W} tabindex=${this._descCollapsed?0:W}
              aria-label=${this._descCollapsed?"Show the full description":W}
              @click=${this._expandDescription}
              @keydown=${e=>("Enter"===e.key||" "===e.key)&&this._descCollapsed&&(e.preventDefault(),this._expandDescription())}>
              <div class="card desc">
                <div class="md ${t&&!this._expanded?"clamp":""}">${Ge(Pr(e.description))}</div>
                ${t?q`<button class="more" @click=${()=>this._expanded=!this._expanded}>${this._expanded?"Show Less":"Show All"}</button>`:W}
                ${e.entities.length?q`<div class="entities">${e.entities.map(e=>q`<code>${e}</code>`)}</div>`:W}
              </div>
              <ha-icon class="pin-hint" icon="mdi:chevron-up"></ha-icon>
            </div>`:W}

        ${e.resolution?q`<div class="card resolution"><h3>Resolution</h3><div class="md">${Ge(Pr(e.resolution))}</div></div>`:W}

        ${e.related?.length?q`<div class="chips"><span class="sect">Related</span>${e.related.map(e=>q`<span class="chip link" title=${e.title} @click=${()=>this._fire("open-ticket",e.id)}>#${e.id} ${e.title.length>40?e.title.slice(0,40)+"…":e.title}</span>`)}</div>`:W}

        <div class="timeline" aria-live="polite" aria-relevant="additions">
          <h2>${this._showHistory?"Activity":"Comments"}</h2>
          ${e.events.filter(e=>this._showHistory||"comment"===e.kind||"note"===e.kind).map(e=>this._eventTemplate(e))}
          ${this._showHistory||e.events.some(e=>"comment"===e.kind||"note"===e.kind)?W:q`<div class="none">No comments yet</div>`}
        </div>
      </div></div>

      <div class="dock">
        <div class="card composer">
          <textarea rows="2" placeholder="Add a comment" .value=${this._comment}
            @input=${e=>this._comment=e.target.value}></textarea>
          <div class="bar">
            <div class="opts">
              ${this.isAdmin?q`${this._agentChip(e)}
                    ${this._priorityPills(e)}`:W}
            </div>
            <div class="acts">
            ${this.isAdmin&&!i?q`<button title="Mark as resolved. Anything typed above is saved as the resolution." @click=${()=>this._resolve()}><ha-icon icon="mdi:check-circle-outline"></ha-icon>Resolve</button>`:W}
            ${this.isAdmin&&i?q`<button title="Move this ticket back to In Progress. Anything typed above is posted as a comment first." @click=${()=>this._comment.trim()?this._commentAndReopen():this._patch({status:"in_progress"})}><ha-icon icon="mdi:restore"></ha-icon>Reopen</button>`:W}
            <button class="primary" ?disabled=${!this._canSubmit(e)} @click=${this._submitComment}>${this._agentApplies(e)&&this._agentOn(e)?q`<ha-icon icon="mdi:creation"></ha-icon>`:W}${this._submitLabel(e)}</button>
            </div>
          </div>
        </div>
      </div>
    `}};Mr.styles=[ue,n`
      :host {
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      /* The ticket scrolls; the comment box stays docked at the bottom of the pane. */
      .top {
        flex: none;
        min-width: 0;
        /* The title's middle lines up with the search row's (56px tall) in the list beside it. */
        padding: 13px 18px 12px;
        border-bottom: 1px solid var(--st-divider);
      }
      .scroll {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        overflow-x: hidden;
        /* The pinned description changes height as you scroll; the browser must not "correct" the scroll position for that. */
        overflow-anchor: none;
        /* The description and comments carry a lighter version of the ticket's tint (header and comment box keep the full one). */
        background: var(--st-selected-soft, var(--st-surface));
      }
      .dock {
        flex: none;
        padding: 12px 18px 16px;
        border-top: 1px solid var(--st-divider);
      }
      .dock .card.composer {
        margin: 0;
        padding: 0;
      }
      /* An open ticket sits on the same colour as its row in the list, so the two read as one thing. */
      :host([open]) {
        background: var(--st-selected, var(--st-hover));
      }
      /* The ticket uses the whole pane and is laid out flat: sections divided by lines, not boxed in cards. */
      .wrap {
        --wrap-top: 16px;
        min-width: 0;
        padding: var(--wrap-top) 18px 12px;
      }
      /*
       * A description of more than a couple of lines is pinned at the top as you scroll, and shrinks as you go
       * until it is one line ending in an ellipsis (the panel sets its height from the scroll position).
       */
      .desc-sticky {
        position: sticky;
        top: 0;
        z-index: 3;
        /* The pane's top padding belongs to this block, so the text has the same space above it whether or not it is pinned. */
        margin-top: calc(var(--wrap-top) * -1);
        padding-top: var(--wrap-top);
        overflow: hidden;
        background: var(--st-selected-soft, var(--st-surface));
      }
      .desc-sticky.one {
        cursor: pointer;
      }
      .desc-sticky.one .card {
        margin: 0 0 16px;
        padding: 0 28px 16px 0;
      }
      .desc-sticky.one .md {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        max-height: none;
        -webkit-mask-image: none;
        mask-image: none;
        color: var(--st-fg-secondary);
      }
      .desc-sticky.one .md > * {
        margin: 0;
      }
      .desc-sticky.one .more,
      .desc-sticky.one .entities {
        display: none;
      }
      .desc-sticky .pin-hint {
        --mdc-icon-size: 20px;
        position: absolute;
        right: 0;
        top: calc(var(--wrap-top) + 1px);
        display: none;
        color: var(--st-fg-secondary);
      }
      .desc-sticky.one .pin-hint {
        display: inline-flex;
      }
      .back {
        display: none;
      }
      @media (max-width: 870px) {
        .top {
          padding: 13px 16px 12px;
        }
        .wrap {
          --wrap-top: 12px;
          padding: var(--wrap-top) 16px 12px;
        }
      }
      /* The history button floats at the right so it never changes the header's height: the gap under the title is the same for one line or three. */
      .head {
        position: relative;
        display: flex;
        align-items: flex-start;
        padding-right: 44px;
      }
      h1 {
        flex: 1;
        margin: 0;
        font-size: var(--st-fs-heading);
        font-weight: var(--st-fw-heading);
        line-height: 1.25;
        overflow-wrap: anywhere;
      }
      /*
       * The title edits in place: for someone who can edit it, it is a text box that looks like the heading until
       * you point at it (an outline appears) or click into it (an accent outline). It grows with the text.
       */
      textarea.title-edit {
        display: block;
        flex: 1;
        min-width: 0;
        box-sizing: border-box;
        margin: -3px -9px;
        padding: 2px 8px;
        width: calc(100% + 18px);
        border: 1px solid transparent;
        border-radius: var(--st-r-bar);
        background: transparent;
        color: inherit;
        font: inherit;
        font-size: var(--st-fs-heading);
        font-weight: var(--st-fw-heading);
        line-height: 1.25;
        resize: none;
        overflow: hidden;
        cursor: text;
        transition: border-color 150ms ease-in-out;
      }
      textarea.title-edit:hover {
        border-color: var(--st-outline);
      }
      textarea.title-edit:focus {
        outline: none;
        border-color: var(--st-accent);
      }
      .add-label {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 24px;
        height: 24px;
        border-radius: 12px;
        border: 1px dashed var(--st-outline);
        color: var(--st-fg-secondary);
        cursor: pointer;
      }
      .add-label:hover,
      .add-label:focus-visible {
        color: var(--st-fg);
        border-color: var(--st-field-outline-hover);
      }
      .add-label ha-icon {
        --mdc-icon-size: 14px;
      }
      .hist {
        position: absolute;
        /* Centred on the title's first line (30px tall), however many lines the title wraps to. */
        top: -9px;
        right: 0;
        width: var(--st-h-bar);
        height: var(--st-h-bar);
        color: var(--st-fg-secondary);
      }
      .hist ha-icon {
        --mdc-icon-size: 20px;
      }
      .hist[aria-pressed="true"] {
        color: var(--st-accent);
        background: color-mix(in srgb, var(--st-accent) 14%, transparent);
      }
      /* On a phone the back arrow sits on the title's first line, like the history button on the right. */
      @media (max-width: 870px) {
        .head {
          padding-left: 36px;
        }
        .back {
          position: absolute;
          top: -9px;
          left: -8px;
          display: inline-flex;
          width: var(--st-h-bar);
          height: var(--st-h-bar);
          margin: 0;
          color: var(--st-fg);
        }
        .back ha-icon {
          --mdc-icon-size: 24px;
        }
      }
      .sub {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin: 16px 0 0;
        font-size: var(--st-fs-body);
        color: var(--st-fg-secondary);
      }
      .meta-line,
      .tag-line {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px 10px;
      }
      .sub .status {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-weight: 500;
        color: var(--state);
      }
      .sub .blocked {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        color: var(--st-warning);
        font-weight: 500;
      }
      .sub .prio {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-weight: 500;
      }
      .sub .prio.urgent {
        color: var(--st-danger);
      }
      .sub .prio.high {
        color: var(--st-warning);
      }
      .sub ha-icon {
        --mdc-icon-size: 16px;
        vertical-align: -3px;
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
      .chip.link {
        cursor: pointer;
        height: 28px;
      }
      .card {
        padding: 0 0 16px;
        margin-bottom: 16px;
        border-bottom: 1px solid var(--st-divider);
      }
      .card.composer {
        border-bottom: 0;
      }
      .card h3 {
        margin: 0 0 8px;
        font-size: var(--st-fs-title);
        font-weight: 500;
        color: var(--st-fg-secondary);
      }
      .card.resolution {
        padding-left: 12px;
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
        margin: 0;
      }
      .timeline > .ev:last-child {
        margin-bottom: 0;
      }
      .timeline h2 {
        margin: 0 0 12px;
        font-size: var(--st-fs-title);
        font-weight: 500;
        color: var(--st-fg-secondary);
      }
      .sect {
        margin-right: 4px;
        font-size: var(--st-fs-title);
        font-weight: 500;
        color: var(--st-fg-secondary);
      }
      .none {
        font-size: var(--st-fs-body);
        color: var(--st-fg-secondary);
      }
      /*
       * Comments are the main part of a ticket: a round avatar, the author and time, and the message in a soft
       * bubble. A change record (shown by the history button) is only a faint line under them, with the old
       * value struck through.
       */
      .ev {
        display: grid;
        grid-template-columns: 32px minmax(0, 1fr);
        gap: 12px;
        margin-bottom: 16px;
      }
      .ev .avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        color: var(--st-accent);
        background: color-mix(in srgb, var(--st-accent) 16%, var(--st-surface));
      }
      .ev .avatar.photo {
        overflow: hidden;
        background: none;
      }
      .ev .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .ev .avatar ha-icon {
        --mdc-icon-size: 20px;
      }
      .ev .who {
        display: flex;
        align-items: center;
        gap: 6px;
        min-height: 32px;
        color: var(--st-fg-secondary);
      }
      .ev .who b {
        font-size: var(--st-fs-title);
        font-weight: 500;
        color: var(--st-fg);
      }
      .ev .who .when {
        font-size: var(--st-fs-caption);
      }
      .ev .bubble {
        margin-top: 2px;
        padding: 10px 14px;
        border-radius: 8px;
        background: color-mix(in srgb, var(--st-fg) 7%, transparent);
      }
      .ev .bubble > :first-child {
        margin-top: 0;
      }
      .ev .bubble > :last-child {
        margin-bottom: 0;
      }
      .ev .bubble.note {
        background: color-mix(in srgb, var(--st-warning) 14%, transparent);
      }
      .ev.system {
        margin-bottom: 8px;
        align-items: center;
        font-size: var(--st-fs-caption);
        color: var(--st-fg-secondary);
      }
      .ev.system > ha-icon {
        --mdc-icon-size: 16px;
        justify-self: center;
      }
      .ev.system b {
        font-weight: 500;
        color: var(--st-fg);
      }
      .ev.system .line {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 0 16px;
      }
      .ev.system .stamp {
        font-variant-numeric: tabular-nums;
      }
      .ev.system s {
        margin-left: 4px;
        opacity: 0.7;
      }
      .ev .label {
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
        justify-content: flex-end;
        gap: 8px;
        margin-top: 8px;
      }
      /* The priority pills sit after the assign chips, set off by a thin line. */
      .prio-group {
        margin-left: 6px;
        padding: 0 12px;
        border-left: 1px solid var(--st-divider);
        border-right: 1px solid var(--st-divider);
      }
      /*
       * Priority is two round badges, as tall as the assign chips: a grey circle with a coloured icon at rest, then
       * filled with their colour when you point at one, and they stay filled once clicked on.
       */
      .prio-dot {
        --c: var(--st-warning);
        --fg: #000;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: var(--st-h-bar);
        height: var(--st-h-bar);
        padding: 0;
        border: 1px solid var(--st-outline);
        border-radius: 50%;
        background: color-mix(in srgb, var(--st-fg) 12%, transparent);
        /* At rest the circle is grey and only the icon is coloured. */
        color: var(--c);
        transition:
          background-color 150ms ease-in-out,
          color 150ms ease-in-out,
          border-color 150ms ease-in-out;
      }
      .prio-dot.urgent {
        --c: var(--st-danger);
        --fg: #fff;
      }
      .prio-dot:hover,
      .prio-dot.on {
        background: var(--c);
        border-color: transparent;
        color: var(--fg);
      }
      .prio-dot ha-icon {
        --mdc-icon-size: 18px;
        /* A triangle's weight sits low in its box, so lift it a little to look centred in the circle. */
        margin-top: -1px;
      }

      .assign {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .assign-chip {
        height: 32px;
        padding: 0 12px 0 4px;
        gap: 6px;
        border: 1px solid var(--st-outline);
        border-radius: var(--st-r-pill);
        background: transparent;
        color: var(--st-fg-secondary);
        font-size: var(--st-fs-body);
        font-weight: 400;
      }
      .assign-chip ha-icon {
        --mdc-icon-size: 24px;
      }
      .assign-chip img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        object-fit: cover;
      }
      .assign-chip:hover {
        color: var(--st-fg);
        border-color: var(--st-field-outline-hover);
      }
      /* Has it now: filled quietly. Picked to take it: accent. Picked to unassign: dashed. */
      .assign-chip.current {
        color: var(--st-fg);
        background: color-mix(in srgb, var(--st-fg) 10%, transparent);
      }
      .assign-chip.picked {
        color: var(--st-accent);
        border-color: var(--st-accent);
        background: color-mix(in srgb, var(--st-accent) 14%, transparent);
      }
      .assign-chip.dropping {
        color: var(--st-fg-secondary);
        border-style: dashed;
      }
      /* Handing a ticket to the AI Agent matters, so its button also carries the agent's spark icon. */
      .composer button.primary {
        gap: 8px;
      }
      .composer button.primary ha-icon {
        --mdc-icon-size: 18px;
      }
      .composer .opts,
      .composer .acts {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
      }
      .composer .acts {
        justify-content: flex-end;
      }
      /*
       * The composer reacts to its own width, not the window's. Narrower than a desktop pane the chip loses the
       * word "Assign to" (its tooltip and label still say it) and the divider after the priority icons goes, so
       * everything stays on one line. On a phone the options sit on one line and the buttons stack full width
       * beneath, with their labels centred.
       */
      .dock {
        container-type: inline-size;
      }
      @container (max-width: 860px) {
        .composer .verb {
          display: none;
        }
        .composer .prio-group {
          border-right: 0;
          padding-right: 0;
        }
      }
      @container (max-width: 560px) {
        .composer .bar {
          flex-direction: column;
          align-items: stretch;
        }
        .composer .verb {
          display: inline;
        }
        .composer .acts button {
          flex: 1 1 100%;
          justify-content: center;
        }
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
    `],e([de({attribute:!1})],Mr.prototype,"ticket",void 0),e([de({type:Boolean})],Mr.prototype,"isAdmin",void 0),e([de({type:Boolean})],Mr.prototype,"narrow",void 0),e([de()],Mr.prototype,"language",void 0),e([de()],Mr.prototype,"agentName",void 0),e([de({attribute:!1})],Mr.prototype,"labelMap",void 0),e([de({attribute:!1})],Mr.prototype,"people",void 0),e([de({attribute:!1})],Mr.prototype,"categoryMap",void 0),e([he()],Mr.prototype,"_expanded",void 0),e([he()],Mr.prototype,"_showHistory",void 0),e([he()],Mr.prototype,"_descCollapsed",void 0),e([he()],Mr.prototype,"_agentToggle",void 0),e([he()],Mr.prototype,"_priorityTo",void 0),e([he()],Mr.prototype,"_comment",void 0),Mr=e([pe("st-ticket-detail")],Mr);const Dr=[{id:"bug",name:"Bug"},{id:"enhancement",name:"Enhancement"},{id:"question",name:"Question"},{id:"task",name:"Task",admin:!0}];let Hr=class extends ne{constructor(){super(...arguments),this.isAdmin=!1,this.categories=[],this._category="",this._title="",this._description="",this._kind="bug",this._priority="normal"}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_submit(){this._title.trim()&&this._fire("create",{title:this._title.trim(),description:this._description,labels:[this._kind],priority:this._priority,...this.isAdmin&&this._category?{category:this._category}:{}})}render(){return q`
      <div class="scrim" @click=${e=>e.target===e.currentTarget&&this._fire("close")}
        @keydown=${e=>"Escape"===e.key&&this._fire("close")}>
        <div class="dialog" role="dialog" aria-modal="true" aria-label="New Ticket">
          <h2>New Ticket</h2>
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
              <label for="kind">Kind</label>
              <select id="kind" .value=${this._kind}
                @change=${e=>this._kind=e.target.value}>
                ${Dr.filter(e=>!e.admin||this.isAdmin).map(e=>q`<option value=${e.id} ?selected=${e.id===this._kind}>${e.name}</option>`)}
              </select>
            </div>
            ${this.isAdmin?q`<div>
                  <label for="prio">Priority</label>
                  <select id="prio" .value=${this._priority}
                    @change=${e=>this._priority=e.target.value}>
                    ${me.filter(e=>"low"!==e).map(e=>q`<option value=${e} ?selected=${e===this._priority}>${we[e]}</option>`)}
                  </select>
                </div>`:""}
          </div>
          ${this.isAdmin?q`<div class="field">
                <label for="cat">Category</label>
                <select id="cat" .value=${this._category}
                  @change=${e=>this._category=e.target.value}>
                  <option value="" ?selected=${!this._category}>No Category</option>
                  ${this.categories.map(e=>q`<option value=${e.id} ?selected=${e.id===this._category}>${e.name}</option>`)}
                </select>
              </div>`:""}
          <div class="actions">
            <button @click=${()=>this._fire("close")}>Cancel</button>
            <button class="primary" ?disabled=${!this._title.trim()} @click=${this._submit}>Create</button>
          </div>
        </div>
      </div>
    `}};Hr.styles=[ue,n`
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
        box-shadow: var(--st-shadow-l);
      }
      h2 {
        margin: 0 0 16px;
        font-size: var(--st-fs-dialog);
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
    `],e([de({type:Boolean})],Hr.prototype,"isAdmin",void 0),e([de({attribute:!1})],Hr.prototype,"categories",void 0),e([he()],Hr.prototype,"_category",void 0),e([he()],Hr.prototype,"_title",void 0),e([he()],Hr.prototype,"_description",void 0),e([he()],Hr.prototype,"_kind",void 0),e([he()],Hr.prototype,"_priority",void 0),Hr=e([pe("st-new-ticket-dialog")],Hr);let jr=class extends ne{constructor(){super(...arguments),this.labels=[],this._q="",this._draft=null,this._orig=null,this._shake=!1,this._toRemove=null,this._colorsOpen=!1,this._colorQ="",this._error=""}_fire(e){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0}))}_message(e){return String(e&&"object"==typeof e&&"message"in e?e.message:e)}get _shown(){const e=this._q.trim().toLowerCase();return e?this.labels.filter(t=>t.name.toLowerCase().includes(e)||t.description.toLowerCase().includes(e)):this.labels}_open(e){this._error="",this._colorsOpen=!1,this._draft=e?{id:e.id,name:e.name,icon:e.icon,color:e.color,description:e.description}:{id:null,name:"",icon:"",color:"",description:""},this._orig=this._draft}async _save(){const e=this._draft;if(e&&e.name.trim())try{e.id?await this.client.updateLabel(e.id,{name:e.name.trim(),icon:e.icon.trim(),description:e.description,...e.color?{color:e.color}:{}}):await this.client.createLabel({name:e.name.trim(),icon:e.icon.trim(),description:e.description,...e.color?{color:e.color}:{}}),this._draft=null,this._fire("labels-changed")}catch(e){this._error=this._message(e)}}_tryClose(){if(!this._toRemove)return this._dirty?(this._shake=!0,void window.setTimeout(()=>this._shake=!1,400)):void(this._draft=null)}get _dirty(){const e=this._draft,t=this._orig;return!(!e||!t)&&(e.name!==t.name||e.icon!==t.icon||e.color!==t.color||e.description!==t.description)}async _remove(){const e=this._toRemove;if(e)try{await this.client.deleteLabel(e.id),this._toRemove=null,this._draft=null,this._fire("labels-changed")}catch(e){this._toRemove=null,this._error=this._message(e)}}_row(e){return q`<div class="row ${e.builtin?"locked":""}" role="row"
      @click=${()=>!e.builtin&&this._open(e)}>
      <span class="ico"><ha-icon .icon=${e.icon||"mdi:label-outline"}></ha-icon></span>
      <span class="swatch" style="--c: ${Ee(e.color)}"></span>
      <div class="text">
        <div class="name">${e.name}</div>
        ${e.description?q`<div class="desc" title=${e.description}>${e.description}</div>`:W}
      </div>
      <span class="count">${e.count} ticket${1===e.count?"":"s"}</span>
      <span class="end" @click=${e=>e.stopPropagation()}>
        ${e.builtin?q`<ha-icon icon="mdi:lock-outline" title="Built in: can't be changed or deleted"></ha-icon>`:q`<button class="icon" title="Delete Label" aria-label="Delete ${e.name}" @click=${()=>this._toRemove=e}><ha-icon icon="mdi:delete-outline"></ha-icon></button>`}
      </span>
    </div>`}_dialog(e){const t=e.color?Le(e.color):"",i=customElements.get("ha-icon-picker"),r=this._colorQ.trim().toLowerCase(),s=e.id?this._orig?.name??e.name:"New Label";return q`<div class="scrim" @click=${e=>e.target===e.currentTarget&&this._tryClose()}
      @keydown=${e=>"Escape"===e.key&&this._tryClose()}>
      <div class="dialog ${this._shake?"shake":""}" role="dialog" aria-modal="true" aria-label=${s}>
        <div class="dhead">
          <button class="icon" title="Close" @click=${()=>this._draft=null}><ha-icon icon="mdi:close"></ha-icon></button>
          <h2>${s}</h2>
        </div>
        <div class="field">
          <label for="ln">Name*</label>
          <input id="ln" type="text" autofocus .value=${e.name}
            @input=${t=>this._draft={...e,name:t.target.value}}
            @keydown=${e=>"Enter"===e.key&&void this._save()} />
        </div>
        ${i?q`<div class="field plain"><ha-icon-picker .label=${"Icon"} .value=${e.icon}
              @value-changed=${t=>this._draft={...e,icon:t.detail.value??""}}></ha-icon-picker></div>`:q`<div class="field lead">
              ${e.icon?q`<ha-icon class="lead-ico" .icon=${e.icon}></ha-icon>`:q`<span class="lead-ico"></span>`}
              <div class="body">
                <label for="li">Icon</label>
                <input id="li" type="text" .value=${e.icon}
                  @input=${t=>this._draft={...e,icon:t.target.value}} />
              </div>
              ${e.icon?q`<button class="icon clear" title="Clear" @click=${()=>this._draft={...e,icon:""}}><ha-icon icon="mdi:close"></ha-icon></button>`:W}
              <ha-icon class="caret" icon="mdi:menu-down"></ha-icon>
            </div>`}
        <div class="field lead">
          ${e.color?q`<span class="lead-ico"><span class="dot" style="--c: ${Ee(e.color)}"></span></span>`:q`<span class="lead-ico"></span>`}
          <button class="body pick" aria-haspopup="listbox" @click=${()=>{this._colorsOpen=!this._colorsOpen,this._colorQ=""}}>
            <label>Colour</label>
            <span class="val">${t}</span>
          </button>
          ${e.color&&!e.id?q`<button class="icon clear" title="Clear" @click=${()=>this._draft={...e,color:""}}><ha-icon icon="mdi:close"></ha-icon></button>`:W}
          <ha-icon class="caret" icon="mdi:menu-down"></ha-icon>
          ${this._colorsOpen?q`<div class="colors" role="listbox">
                <div class="csearch"><ha-icon icon="mdi:magnify"></ha-icon>
                  <input type="search" placeholder="Search" autofocus .value=${this._colorQ}
                    @input=${e=>this._colorQ=e.target.value} /></div>
                ${be.filter(e=>!r||Le(e).toLowerCase().includes(r)).map(t=>q`<button class="opt ${t===e.color?"selected":""}" role="option"
                    @click=${()=>{this._draft={...e,color:t},this._colorsOpen=!1}}>
                    <span class="dot big" style="--c: ${Ee(t)}"></span>${Le(t)}
                  </button>`)}
              </div>`:W}
        </div>
        <div class="field">
          <label for="ld">Description</label>
          <textarea id="ld" rows="3" .value=${e.description}
            @input=${t=>this._draft={...e,description:t.target.value}}></textarea>
        </div>
        ${this._error?q`<div class="error">${this._error}</div>`:W}
        <div class="dactions">
          ${e.id?q`<button class="textbtn danger" @click=${()=>this._toRemove=this.labels.find(t=>t.id===e.id)??null}>Delete</button>`:W}
          <span class="grow"></span>
          <button class="pill primary" ?disabled=${!e.name.trim()||null!==e.id&&!this._dirty} @click=${()=>{this._save()}}>${e.id?"Update":"Create"}</button>
        </div>
      </div>
    </div>`}_confirm(e){return q`<div class="scrim top" @click=${e=>e.target===e.currentTarget&&(this._toRemove=null)}
      @keydown=${e=>"Escape"===e.key&&(this._toRemove=null)}>
      <div class="dialog confirm" role="alertdialog" aria-modal="true" aria-label="Remove Label?">
        <h2>Remove Label?</h2>
        <p>Are you sure you want to remove label ${e.name}? ${e.count?`It will be removed from ${e.count} ticket${1===e.count?"":"s"}.`:"No tickets use it."}</p>
        <div class="dactions">
          <span class="grow"></span>
          <button class="textbtn" @click=${()=>this._toRemove=null}>Cancel</button>
          <button class="pill remove" @click=${()=>{this._remove()}}>Remove</button>
        </div>
      </div>
    </div>`}render(){const e=this._shown;return q`
      <div class="toolbar">
        <div class="search">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input type="search" placeholder="Search" aria-label="Search labels" .value=${this._q}
            @input=${e=>this._q=e.target.value} />
        </div>
      </div>
      <div class="list">
        <div class="head"><span></span><span></span><span>Name</span><span></span><span></span></div>
        ${e.length?e.map(e=>this._row(e)):q`<div class="empty">No labels match.</div>`}
        ${this._error&&!this._draft?q`<div class="error">${this._error}</div>`:W}
      </div>
      <button class="fab" @click=${()=>this._open(null)}><ha-icon icon="mdi:plus"></ha-icon>Create Label</button>
      ${this._draft?this._dialog(this._draft):W}
      ${this._toRemove?this._confirm(this._toRemove):W}
    `}};jr.styles=[ue,n`
      :host {
        position: relative;
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
        background: var(--st-surface);
      }
      .toolbar {
        flex: none;
        display: flex;
        align-items: center;
        height: 56px;
        box-sizing: border-box;
        padding: 0 16px;
        background: var(--st-bg);
        border-bottom: 1px solid var(--st-divider);
      }
      .search {
        flex: 1;
        position: relative;
        display: flex;
        align-items: center;
      }
      .search ha-icon {
        position: absolute;
        left: 8px;
        --mdc-icon-size: 18px;
        color: var(--st-fg-secondary);
        pointer-events: none;
      }
      .search input {
        width: 100%;
        height: var(--st-h-bar);
        padding: 0 8px 0 34px;
        border: 1px solid var(--st-field-outline);
        border-radius: var(--st-r-bar);
        background: var(--card-background-color, var(--st-surface));
        transition: border-color 250ms ease-in-out;
      }
      .search input:hover {
        border-color: var(--st-field-outline-hover);
      }
      .search input:focus {
        outline: none;
        border-color: var(--st-accent);
      }
      .list {
        flex: 1;
        overflow-y: auto;
        padding-bottom: 88px;
      }
      .head,
      .row {
        display: grid;
        grid-template-columns: 56px 40px minmax(0, 1fr) 88px 56px;
        align-items: center;
        padding: 0 8px 0 8px;
      }
      .head {
        height: 56px;
        border-bottom: 1px solid var(--st-divider);
        font-size: var(--st-fs-small);
        font-weight: 500;
        color: var(--st-fg-secondary);
      }
      .head span:nth-child(3) {
        color: var(--st-fg);
      }
      .row {
        position: relative;
        width: 100%;
        min-height: 56px;
        height: auto;
        padding-top: 8px;
        padding-bottom: 8px;
        border-radius: 0;
        border-bottom: 1px solid var(--st-divider);
        text-align: left;
        color: var(--st-fg);
        font-weight: 400;
        font-size: var(--st-fs-body);
        cursor: pointer;
      }
      .row.locked {
        cursor: default;
      }
      .row .ico {
        display: flex;
        justify-content: center;
        color: var(--st-fg-secondary);
      }
      .row .ico ha-icon {
        --mdc-icon-size: 24px;
      }
      /* HA's renderLabelColorBadge: 20px, 8px corners, 1px outline. */
      .swatch {
        box-sizing: border-box;
        width: var(--ha-space-5, 20px);
        height: var(--ha-space-5, 20px);
        border-radius: var(--ha-border-radius-md, 8px);
        border: 1px solid var(--st-outline);
        background: var(--c);
      }
      .text {
        min-width: 0;
        padding: 0 8px;
      }
      .text .name {
        font-size: var(--st-fs-body);
      }
      .text .desc {
        line-height: 1.4;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
      }
      .count {
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
        text-align: right;
        padding-right: 8px;
      }
      .end {
        display: flex;
        justify-content: center;
        position: relative;
        color: var(--st-fg-secondary);
      }
      .end button.icon {
        width: 40px;
        height: 40px;
      }
      .empty {
        padding: 48px 24px;
        text-align: center;
        color: var(--st-fg-secondary);
      }
      .fab {
        position: absolute;
        right: 16px;
        bottom: 16px;
        z-index: 3;
        height: 48px;
        padding: 0 20px 0 16px;
        gap: 12px;
        border-radius: 24px;
        font-weight: 500;
        background: var(--st-accent);
        color: var(--text-primary-color, #fff);
        box-shadow: var(--st-shadow-m);
      }
      .fab ha-icon {
        --mdc-icon-size: 24px;
      }
      .error {
        margin: 12px 16px 0;
        font-size: var(--st-fs-small);
        color: var(--st-danger);
      }

      /* The New label / Edit label dialog, as HA draws it. */
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
        gap: 16px;
        width: min(560px, 100%);
        padding: 16px 24px 24px;
        border-radius: 28px;
        background: var(--st-surface);
        box-shadow: var(--st-shadow-l);
      }
      .dhead {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-left: -8px;
      }
      .dhead h2 {
        margin: 0;
        font-size: var(--st-fs-dialog);
        font-weight: 400;
      }
      .field {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 56px;
        padding: 6px 16px 0;
        border-radius: 4px 4px 0 0;
        border-bottom: 1px solid var(--ha-color-border-neutral-loud, var(--st-fg-secondary));
        background: var(--ha-color-form-background, color-mix(in srgb, var(--st-fg) 12%, transparent));
        transition: background-color 250ms ease-in-out;
      }
      .field:hover {
        background: var(--ha-color-form-background-hover, color-mix(in srgb, var(--st-fg) 16%, transparent));
      }
      .field:focus-within {
        border-bottom: 2px solid var(--st-accent);
      }
      .field label {
        font-size: var(--ha-font-size-xs, 10px);
        font-weight: 400;
        color: var(--st-fg-secondary);
      }
      .field:focus-within label {
        color: var(--st-accent);
      }
      .field input,
      .field textarea {
        width: 100%;
        height: 28px;
        padding: 0;
        border: none;
        border-radius: 0;
        background: transparent;
        font-size: var(--st-fs-field);
        outline: none;
      }
      .field textarea {
        height: auto;
        min-height: 56px;
        resize: vertical;
      }
      /* Fields with a leading icon or swatch, a clear button and a caret, as HA's pickers. */
      .field.lead {
        flex-direction: row;
        align-items: center;
        gap: 12px;
        padding: 0 8px 0 12px;
      }
      .field.lead:focus-within {
        border-bottom: 2px solid var(--st-accent);
      }
      .field .lead-ico {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        flex: none;
        color: var(--st-fg-secondary);
      }
      .field .lead-ico ha-icon {
        --mdc-icon-size: 24px;
      }
      .field .body {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 6px 0 0;
      }
      .field button.body.pick {
        height: auto;
        min-height: 56px;
        padding: 6px 0 0;
        border-radius: 0;
        align-items: flex-start;
        gap: 0;
        color: var(--st-fg);
        font-weight: 400;
      }
      .field .val {
        font-size: var(--st-fs-field);
        height: 28px;
        line-height: 28px;
      }
      .field .caret {
        --mdc-icon-size: 24px;
        flex: none;
        color: var(--st-fg-secondary);
        pointer-events: none;
      }
      .field button.clear {
        width: 40px;
        height: 40px;
        color: var(--st-fg-secondary);
      }
      .field.plain {
        padding: 0;
        background: transparent;
        border: none;
      }
      .dot {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: var(--c);
        flex: none;
      }
      .dot.big {
        width: 28px;
        height: 28px;
      }
      .colors {
        position: absolute;
        z-index: 25;
        left: 0;
        right: 0;
        top: 100%;
        max-height: 320px;
        overflow-y: auto;
        padding: 12px 8px 8px;
        border-radius: 4px;
        background: var(--st-surface);
        box-shadow: var(--st-shadow-m);
        outline: 1px solid var(--st-divider);
      }
      .colors .csearch {
        position: relative;
        display: flex;
        align-items: center;
        margin: 0 8px 8px;
      }
      .colors .csearch ha-icon {
        position: absolute;
        left: 10px;
        color: var(--st-fg-secondary);
      }
      .colors .csearch input {
        width: 100%;
        height: 40px;
        padding: 0 12px 0 40px;
        border: 1px solid var(--st-accent);
        border-radius: var(--st-r-bar);
        background: transparent;
      }
      .colors button.opt {
        width: 100%;
        height: 48px;
        padding: 0 16px;
        gap: 16px;
        border-radius: 0;
        justify-content: flex-start;
        color: var(--st-fg);
        font-size: var(--st-fs-field);
        font-weight: 400;
      }
      .colors button.opt.selected {
        color: var(--st-accent);
      }
      .dactions {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 16px;
      }
      .dactions .grow {
        flex: 1;
      }
      /* HA's dialog buttons: text buttons, and fully rounded filled ones. */
      button.textbtn {
        height: 40px;
        padding: 0 var(--ha-space-4, 16px);
        border-radius: var(--st-r-pill);
        font-weight: var(--ha-font-weight-medium, 500);
      }
      button.textbtn.danger {
        color: var(--st-danger);
      }
      button.textbtn.danger:hover {
        background: color-mix(in srgb, var(--st-danger) 18%, transparent);
      }
      button.pill {
        height: 40px;
        padding: 0 var(--ha-space-4, 16px);
        border-radius: var(--st-r-pill);
        font-weight: var(--ha-font-weight-medium, 500);
      }
      button.pill:disabled {
        opacity: 1;
        cursor: default;
        color: color-mix(in srgb, var(--st-fg) 38%, transparent);
        background: color-mix(in srgb, var(--st-fg) 12%, transparent);
      }
      button.pill.remove {
        background: color-mix(in srgb, var(--st-danger) 75%, black);
        color: #fff;
      }
      .dialog.shake {
        animation: shake 0.4s;
      }
      @keyframes shake {
        20% { transform: translateX(-8px); }
        40% { transform: translateX(8px); }
        60% { transform: translateX(-5px); }
        80% { transform: translateX(5px); }
      }
      @media (prefers-reduced-motion: reduce) {
        .dialog.shake { animation: none; }
      }
      .scrim.top {
        z-index: 30;
      }
      /* HA: alert and confirmation dialogs are a fixed 320px. */
      .dialog.confirm {
        gap: 0;
        padding: 24px;
        width: min(320px, 100%);
      }
      .dialog.confirm h2 {
        margin: 0 0 16px;
        font-size: var(--ha-font-size-2xl, 24px);
        font-weight: 400;
      }
      .dialog.confirm p {
        margin: 0 0 8px;
        font-size: var(--st-fs-row);
        line-height: 1.5;
      }
    `],e([de({attribute:!1})],jr.prototype,"client",void 0),e([de({attribute:!1})],jr.prototype,"labels",void 0),e([he()],jr.prototype,"_q",void 0),e([he()],jr.prototype,"_draft",void 0),e([he()],jr.prototype,"_orig",void 0),e([he()],jr.prototype,"_shake",void 0),e([he()],jr.prototype,"_toRemove",void 0),e([he()],jr.prototype,"_colorsOpen",void 0),e([he()],jr.prototype,"_colorQ",void 0),e([he()],jr.prototype,"_error",void 0),jr=e([pe("st-label-manager")],jr);let Br=class extends ne{constructor(){super(...arguments),this.categories=[],this._q="",this._draft=null,this._orig=null,this._shake=!1,this._toRemove=null,this._error=""}_fire(e){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0}))}_message(e){return String(e&&"object"==typeof e&&"message"in e?e.message:e)}get _shown(){const e=this._q.trim().toLowerCase();return e?this.categories.filter(t=>t.name.toLowerCase().includes(e)):this.categories}get _dirty(){const e=this._draft,t=this._orig;return!(!e||!t||e.name===t.name&&e.icon===t.icon)}_open(e){this._error="",this._draft=e?{id:e.id,name:e.name,icon:e.icon}:{id:null,name:"",icon:""},this._orig=this._draft}async _save(){const e=this._draft;if(e&&e.name.trim())try{const t={name:e.name.trim(),icon:e.icon.trim()};e.id?await this.client.updateCategory(e.id,t):await this.client.createCategory(t),this._draft=null,this._fire("categories-changed")}catch(e){this._error=this._message(e)}}_tryClose(){if(!this._toRemove)return this._dirty||this._draft&&!this._draft.id&&(this._draft.name||this._draft.icon)?(this._shake=!0,void window.setTimeout(()=>this._shake=!1,400)):void(this._draft=null)}async _remove(){const e=this._toRemove;if(e)try{await this.client.deleteCategory(e.id),this._toRemove=null,this._draft=null,this._fire("categories-changed")}catch(e){this._toRemove=null,this._error=this._message(e)}}_row(e){return q`<div class="row ${e.builtin?"locked":""}" role="row" @click=${()=>!e.builtin&&this._open(e)}>
      <span class="ico"><ha-icon .icon=${e.icon||"mdi:shape-outline"}></ha-icon></span>
      <div class="text"><div class="name">${e.name}</div></div>
      <span class="count">${e.count} ticket${1===e.count?"":"s"}</span>
      <span class="end" @click=${e=>e.stopPropagation()}>
        ${e.builtin?q`<ha-icon icon="mdi:lock-outline" title="Built in: can't be changed or deleted"></ha-icon>`:q`<button class="icon" title="Delete Category" aria-label="Delete ${e.name}" @click=${()=>this._toRemove=e}><ha-icon icon="mdi:delete-outline"></ha-icon></button>`}
      </span>
    </div>`}_dialog(e){const t=customElements.get("ha-icon-picker"),i=e.id?this._orig?.name??e.name:"New Category";return q`<div class="scrim" @click=${e=>e.target===e.currentTarget&&this._tryClose()}
      @keydown=${e=>"Escape"===e.key&&this._tryClose()}>
      <div class="dialog ${this._shake?"shake":""}" role="dialog" aria-modal="true" aria-label=${i}>
        <div class="dhead">
          <button class="icon" title="Close" @click=${()=>this._draft=null}><ha-icon icon="mdi:close"></ha-icon></button>
          <h2>${i}</h2>
        </div>
        <div class="field">
          <label for="cn">Name*</label>
          <input id="cn" type="text" autofocus .value=${e.name}
            @input=${t=>this._draft={...e,name:t.target.value}}
            @keydown=${e=>"Enter"===e.key&&void this._save()} />
        </div>
        ${t?q`<div class="field plain"><ha-icon-picker .label=${"Icon"} .value=${e.icon}
              @value-changed=${t=>this._draft={...e,icon:t.detail.value??""}}></ha-icon-picker></div>`:q`<div class="field lead">
              ${e.icon?q`<ha-icon class="lead-ico" .icon=${e.icon}></ha-icon>`:q`<span class="lead-ico"></span>`}
              <div class="body">
                <label for="ci">Icon</label>
                <input id="ci" type="text" placeholder="mdi:lan" .value=${e.icon}
                  @input=${t=>this._draft={...e,icon:t.target.value}} />
              </div>
              ${e.icon?q`<button class="icon clear" title="Clear" @click=${()=>this._draft={...e,icon:""}}><ha-icon icon="mdi:close"></ha-icon></button>`:W}
              <ha-icon class="caret" icon="mdi:menu-down"></ha-icon>
            </div>`}
        ${this._error?q`<div class="error">${this._error}</div>`:W}
        <div class="dactions">
          ${e.id?q`<button class="textbtn danger" @click=${()=>this._toRemove=this.categories.find(t=>t.id===e.id)??null}>Delete</button>`:W}
          <span class="grow"></span>
          <button class="pill primary" ?disabled=${!e.name.trim()||null!==e.id&&!this._dirty} @click=${()=>{this._save()}}>${e.id?"Update":"Create"}</button>
        </div>
      </div>
    </div>`}_confirm(e){return q`<div class="scrim top" @click=${e=>e.target===e.currentTarget&&(this._toRemove=null)}
      @keydown=${e=>"Escape"===e.key&&(this._toRemove=null)}>
      <div class="dialog confirm" role="alertdialog" aria-modal="true" aria-label="Remove Category?">
        <h2>Remove Category?</h2>
        <p>Are you sure you want to remove category ${e.name}? ${e.count?`${e.count} ticket${1===e.count?"":"s"} will have no category.`:"No tickets use it."}</p>
        <div class="dactions">
          <span class="grow"></span>
          <button class="textbtn" @click=${()=>this._toRemove=null}>Cancel</button>
          <button class="pill remove" @click=${()=>{this._remove()}}>Remove</button>
        </div>
      </div>
    </div>`}render(){const e=this._shown;return q`
      <div class="toolbar">
        <div class="search">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input type="search" placeholder="Search" aria-label="Search categories" .value=${this._q}
            @input=${e=>this._q=e.target.value} />
        </div>
      </div>
      <div class="list">
        <div class="head"><span></span><span>Name</span><span></span><span></span></div>
        ${e.length?e.map(e=>this._row(e)):q`<div class="empty">No categories match.</div>`}
        ${this._error&&!this._draft?q`<div class="error">${this._error}</div>`:W}
      </div>
      <button class="fab" @click=${()=>this._open(null)}><ha-icon icon="mdi:plus"></ha-icon>Create Category</button>
      ${this._draft?this._dialog(this._draft):W}
      ${this._toRemove?this._confirm(this._toRemove):W}
    `}};Br.styles=[ue,n`
      :host {
        position: relative;
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
        background: var(--st-surface);
      }
      .toolbar {
        flex: none;
        display: flex;
        align-items: center;
        height: 56px;
        box-sizing: border-box;
        padding: 0 16px;
        background: var(--st-bg);
        border-bottom: 1px solid var(--st-divider);
      }
      .search {
        flex: 1;
        position: relative;
        display: flex;
        align-items: center;
      }
      .search ha-icon {
        position: absolute;
        left: 8px;
        --mdc-icon-size: 18px;
        color: var(--st-fg-secondary);
        pointer-events: none;
      }
      .search input {
        width: 100%;
        height: var(--st-h-bar);
        padding: 0 8px 0 34px;
        border: 1px solid var(--st-field-outline);
        border-radius: var(--st-r-bar);
        background: var(--card-background-color, var(--st-surface));
        transition: border-color 250ms ease-in-out;
      }
      .search input:hover {
        border-color: var(--st-field-outline-hover);
      }
      .search input:focus {
        outline: none;
        border-color: var(--st-accent);
      }
      .list {
        flex: 1;
        overflow-y: auto;
        padding-bottom: 88px;
      }
      .head,
      .row {
        display: grid;
        grid-template-columns: 56px 40px minmax(0, 1fr) 88px 56px;
        align-items: center;
        padding: 0 8px 0 8px;
      }
      .head {
        height: 56px;
        border-bottom: 1px solid var(--st-divider);
        font-size: var(--st-fs-small);
        font-weight: 500;
        color: var(--st-fg-secondary);
      }
      .head span:nth-child(3) {
        color: var(--st-fg);
      }
      .row {
        position: relative;
        width: 100%;
        min-height: 56px;
        height: auto;
        padding-top: 8px;
        padding-bottom: 8px;
        border-radius: 0;
        border-bottom: 1px solid var(--st-divider);
        text-align: left;
        color: var(--st-fg);
        font-weight: 400;
        font-size: var(--st-fs-body);
        cursor: pointer;
      }
      .row.locked {
        cursor: default;
      }
      .row .ico {
        display: flex;
        justify-content: center;
        color: var(--st-fg-secondary);
      }
      .row .ico ha-icon {
        --mdc-icon-size: 24px;
      }
      .text {
        min-width: 0;
        padding: 0 8px;
      }
      .text .name {
        font-size: var(--st-fs-body);
      }
      .text .desc {
        line-height: 1.4;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
      }
      .count {
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
        text-align: right;
        padding-right: 8px;
      }
      .end {
        display: flex;
        justify-content: center;
        position: relative;
        color: var(--st-fg-secondary);
      }
      .end button.icon {
        width: 40px;
        height: 40px;
      }
      .empty {
        padding: 48px 24px;
        text-align: center;
        color: var(--st-fg-secondary);
      }
      .fab {
        position: absolute;
        right: 16px;
        bottom: 16px;
        z-index: 3;
        height: 48px;
        padding: 0 20px 0 16px;
        gap: 12px;
        border-radius: 24px;
        font-weight: 500;
        background: var(--st-accent);
        color: var(--text-primary-color, #fff);
        box-shadow: var(--st-shadow-m);
      }
      .fab ha-icon {
        --mdc-icon-size: 24px;
      }
      .error {
        margin: 12px 16px 0;
        font-size: var(--st-fs-small);
        color: var(--st-danger);
      }

      /* The New label / Edit label dialog, as HA draws it. */
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
        gap: 16px;
        width: min(560px, 100%);
        padding: 16px 24px 24px;
        border-radius: 28px;
        background: var(--st-surface);
        box-shadow: var(--st-shadow-l);
      }
      .dhead {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-left: -8px;
      }
      .dhead h2 {
        margin: 0;
        font-size: var(--st-fs-dialog);
        font-weight: 400;
      }
      .field {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 56px;
        padding: 6px 16px 0;
        border-radius: 4px 4px 0 0;
        border-bottom: 1px solid var(--ha-color-border-neutral-loud, var(--st-fg-secondary));
        background: var(--ha-color-form-background, color-mix(in srgb, var(--st-fg) 12%, transparent));
        transition: background-color 250ms ease-in-out;
      }
      .field:hover {
        background: var(--ha-color-form-background-hover, color-mix(in srgb, var(--st-fg) 16%, transparent));
      }
      .field:focus-within {
        border-bottom: 2px solid var(--st-accent);
      }
      .field label {
        font-size: var(--ha-font-size-xs, 10px);
        font-weight: 400;
        color: var(--st-fg-secondary);
      }
      .field:focus-within label {
        color: var(--st-accent);
      }
      .field input,
      .field textarea {
        width: 100%;
        height: 28px;
        padding: 0;
        border: none;
        border-radius: 0;
        background: transparent;
        font-size: var(--st-fs-field);
        outline: none;
      }
      .field textarea {
        height: auto;
        min-height: 56px;
        resize: vertical;
      }
      /* Fields with a leading icon or swatch, a clear button and a caret, as HA's pickers. */
      .field.lead {
        flex-direction: row;
        align-items: center;
        gap: 12px;
        padding: 0 8px 0 12px;
      }
      .field.lead:focus-within {
        border-bottom: 2px solid var(--st-accent);
      }
      .field .lead-ico {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        flex: none;
        color: var(--st-fg-secondary);
      }
      .field .lead-ico ha-icon {
        --mdc-icon-size: 24px;
      }
      .field .body {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 6px 0 0;
      }
      .field button.body.pick {
        height: auto;
        min-height: 56px;
        padding: 6px 0 0;
        border-radius: 0;
        align-items: flex-start;
        gap: 0;
        color: var(--st-fg);
        font-weight: 400;
      }
      .field .val {
        font-size: var(--st-fs-field);
        height: 28px;
        line-height: 28px;
      }
      .field .caret {
        --mdc-icon-size: 24px;
        flex: none;
        color: var(--st-fg-secondary);
        pointer-events: none;
      }
      .field button.clear {
        width: 40px;
        height: 40px;
        color: var(--st-fg-secondary);
      }
      .field.plain {
        padding: 0;
        background: transparent;
        border: none;
      }
      .dactions {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 16px;
      }
      .dactions .grow {
        flex: 1;
      }
      /* HA's dialog buttons: text buttons, and fully rounded filled ones. */
      button.textbtn {
        height: 40px;
        padding: 0 var(--ha-space-4, 16px);
        border-radius: var(--st-r-pill);
        font-weight: var(--ha-font-weight-medium, 500);
      }
      button.textbtn.danger {
        color: var(--st-danger);
      }
      button.textbtn.danger:hover {
        background: color-mix(in srgb, var(--st-danger) 18%, transparent);
      }
      button.pill {
        height: 40px;
        padding: 0 var(--ha-space-4, 16px);
        border-radius: var(--st-r-pill);
        font-weight: var(--ha-font-weight-medium, 500);
      }
      button.pill:disabled {
        opacity: 1;
        cursor: default;
        color: color-mix(in srgb, var(--st-fg) 38%, transparent);
        background: color-mix(in srgb, var(--st-fg) 12%, transparent);
      }
      button.pill.remove {
        background: color-mix(in srgb, var(--st-danger) 75%, black);
        color: #fff;
      }
      .dialog.shake {
        animation: shake 0.4s;
      }
      @keyframes shake {
        20% { transform: translateX(-8px); }
        40% { transform: translateX(8px); }
        60% { transform: translateX(-5px); }
        80% { transform: translateX(5px); }
      }
      @media (prefers-reduced-motion: reduce) {
        .dialog.shake { animation: none; }
      }
      .scrim.top {
        z-index: 30;
      }
      /* HA: alert and confirmation dialogs are a fixed 320px. */
      .dialog.confirm {
        gap: 0;
        padding: 24px;
        width: min(320px, 100%);
      }
      .dialog.confirm h2 {
        margin: 0 0 16px;
        font-size: var(--ha-font-size-2xl, 24px);
        font-weight: 400;
      }
      .dialog.confirm p {
        margin: 0 0 8px;
        font-size: var(--st-fs-row);
        line-height: 1.5;
      }
      /* Categories have no colour column. */
      .head,
      .row {
        grid-template-columns: 56px minmax(0, 1fr) 88px 56px;
      }
    `],e([de({attribute:!1})],Br.prototype,"client",void 0),e([de({attribute:!1})],Br.prototype,"categories",void 0),e([he()],Br.prototype,"_q",void 0),e([he()],Br.prototype,"_draft",void 0),e([he()],Br.prototype,"_orig",void 0),e([he()],Br.prototype,"_shake",void 0),e([he()],Br.prototype,"_toRemove",void 0),e([he()],Br.prototype,"_error",void 0),Br=e([pe("st-category-manager")],Br);const Ur=[{id:"immediately",label:"Straight away"},{id:"1h",label:"After 1 hour"},{id:"6h",label:"After 6 hours"},{id:"1d",label:"After 1 day"},{id:"3d",label:"After 3 days"},{id:"7d",label:"After 7 days"},{id:"14d",label:"After 14 days"},{id:"30d",label:"After 30 days"},{id:"never",label:"Never"}];let qr=class extends ne{constructor(){super(...arguments),this._s=null,this._error=""}async connectedCallback(){super.connectedCallback(),this._s=await this.client.settings()}async _save(e){const t=this._s;if(t){this._s={...t,...e,notify:{...t.notify,...e.notify}};try{this._s=await this.client.saveSettings(e),this._error="",this.dispatchEvent(new CustomEvent("settings-changed",{detail:this._s,bubbles:!0,composed:!0}))}catch{this._error="Couldn't save that. These options need the newer Home Desk integration.",this._s=t}}}_targetName(e){if("persistent_notification"===e)return"Home Assistant notifications (the bell)";const t=e.startsWith("mobile_app_"),i=e.replace(/^mobile_app_/,"").replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase());return t?`${i} (mobile app)`:i}get _targets(){const e=Object.keys(this.hass.services?.notify??{}),t=this._s?.notify.targets??[];return[...new Set([...e,...t])].filter(e=>"notify"!==e).sort()}get _agents(){return Object.entries(this.hass.states??{}).filter(([e])=>e.startsWith("ai_task.")||e.startsWith("conversation.")).map(([e,t])=>({id:e,label:String(t.attributes.friendly_name??e)})).sort((e,t)=>e.label.localeCompare(t.label))}_switch(e,t,i){return q`<button class="switch" role="switch" aria-checked=${e?"true":"false"} aria-label=${t}
      @click=${()=>i(!e)}></button>`}_toggleTarget(e){const t=this._s;if(!t)return;const i=t.notify.targets.includes(e);this._save({notify:{targets:i?t.notify.targets.filter(t=>t!==e):[...t.notify.targets,e]}})}render(){const e=this._s;if(!e)return q`<div class="page"><p class="help">Loading…</p></div>`;const t=[{id:"",label:"None"},...this._agents];return q`<div class="page">
      ${this._error?q`<div class="error">${this._error}</div>`:W}

      <h2>Tickets</h2>
      <div class="card">
        <div class="srow">
          <div class="text">
            <div class="name">Close resolved tickets</div>
            <div class="desc">A resolved ticket closes by itself after this long. A new comment on it can reopen it first.</div>
          </div>
          <st-dropdown plain label="Close resolved tickets" .value=${e.auto_close} .options=${Ur}
            @change=${e=>{this._save({auto_close:e.detail})}}></st-dropdown>
        </div>
        <div class="srow">
          <div class="text">
            <div class="name">Tickets from Repairs</div>
            <div class="desc">Raise a ticket for each Home Assistant repair, and resolve it when the repair clears.</div>
          </div>
          ${this._switch(e.repairs,"Tickets from Repairs",e=>{this._save({repairs:e})})}
        </div>
      </div>

      <h2>AI Agent</h2>
      <div class="card">
        <div class="srow">
          <div class="text">
            <div class="name">AI Agent</div>
            <div class="desc">The agent a ticket is assigned to. Pick one of the AI agents set up in Home Assistant.</div>
          </div>
          <st-dropdown plain label="AI Agent" .value=${e.agent} .options=${t}
            @change=${e=>{this._save({agent:e.detail})}}></st-dropdown>
        </div>
      </div>

      <h2>Notifications</h2>
      <p class="help">These are your own settings. Each manager chooses where their notifications go and what they hear about.</p>
      <div class="card">
        <div class="srow">
          <div class="text"><div class="name">Notify me when</div></div>
        </div>
        <div class="srow">
          <div class="text"><div class="name">A new ticket is raised</div><div class="desc">From a household member, an AI agent or a repair.</div></div>
          ${this._switch(e.notify.new_ticket,"New ticket raised",e=>{this._save({notify:{new_ticket:e}})})}
        </div>
        <div class="srow">
          <div class="text"><div class="name">Someone else comments</div><div class="desc">Including the AI Agent replying to a ticket.</div></div>
          ${this._switch(e.notify.comment,"Someone else comments",e=>{this._save({notify:{comment:e}})})}
        </div>
        <div class="srow">
          <div class="text"><div class="name">A ticket is resolved</div></div>
          ${this._switch(e.notify.resolved,"A ticket is resolved",e=>{this._save({notify:{resolved:e}})})}
        </div>
      </div>
      <h2>Send notifications to</h2>
      <div class="card">
        ${this._targets.length?this._targets.map(t=>q`<label class="srow pick">
                <input class="check" type="checkbox" .checked=${e.notify.targets.includes(t)} @change=${()=>this._toggleTarget(t)} />
                <div class="text"><div class="name">${this._targetName(t)}</div></div>
              </label>`):q`<div class="note">Home Assistant has no notify services yet. Install the Companion app on a phone to get one.</div>`}
      </div>
    </div>`}};qr.styles=[ue,n`
      :host {
        display: block;
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        background: var(--st-surface);
      }
      .page {
        max-width: 720px;
        margin: 0 auto;
        padding: 24px 16px 48px;
      }
      h2 {
        margin: 24px 0 8px;
        font-size: var(--st-fs-title);
        font-weight: 500;
      }
      h2:first-child {
        margin-top: 0;
      }
      .help {
        margin: 0 0 12px;
        font-size: var(--st-fs-body);
        color: var(--st-fg-secondary);
      }
      .card {
        border: 1px solid var(--st-outline);
        border-radius: var(--ha-border-radius-xl, 12px);
        overflow: hidden;
      }
      .srow {
        display: flex;
        align-items: center;
        gap: 16px;
        min-height: 64px;
        padding: 12px 16px;
        border-bottom: 1px solid var(--st-divider);
      }
      .srow:last-child {
        border-bottom: 0;
      }
      .srow .text {
        flex: 1;
        min-width: 0;
      }
      .srow .name {
        font-size: var(--st-fs-body);
      }
      .srow .desc {
        margin-top: 2px;
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
      }
      .srow st-dropdown {
        width: 220px;
        flex: none;
      }
      /* HA's switch: a 36x14 track with a 20px thumb. */
      .switch {
        position: relative;
        flex: none;
        width: 36px;
        height: 14px;
        padding: 0;
        border-radius: 7px;
        background: color-mix(in srgb, var(--st-fg) 38%, transparent);
        transition: background-color 150ms ease-in-out;
      }
      .switch::after {
        content: "";
        position: absolute;
        top: -3px;
        left: -2px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--card-background-color, var(--st-surface));
        box-shadow: var(--st-shadow-m);
        transition: transform 150ms ease-in-out, background-color 150ms ease-in-out;
      }
      .switch[aria-checked="true"] {
        background: color-mix(in srgb, var(--st-accent) 54%, transparent);
      }
      .switch[aria-checked="true"]::after {
        background: var(--st-accent);
        transform: translateX(22px);
      }
      .check {
        flex: none;
        width: 24px;
        height: 24px;
        accent-color: var(--st-accent);
      }
      .srow.pick {
        cursor: pointer;
      }
      .note {
        padding: 12px 16px;
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
      }
      .error {
        margin-bottom: 12px;
        padding: 12px 16px;
        border-left: 4px solid var(--st-danger);
        font-size: var(--st-fs-body);
        background: color-mix(in srgb, var(--st-danger) 12%, var(--st-surface));
      }
    `],e([de({attribute:!1})],qr.prototype,"client",void 0),e([de({attribute:!1})],qr.prototype,"hass",void 0),e([he()],qr.prototype,"_s",void 0),e([he()],qr.prototype,"_error",void 0),qr=e([pe("st-settings")],qr);const Fr={labels:"Labels",categories:"Categories",settings:"Settings"};let Wr=class extends ne{constructor(){super(...arguments),this.page="",this.view="active",this.tickets=[],this.narrow=!1,this.admin=!1,this._menuOpen=!1}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_choose(e){this._menuOpen=!1,this._fire("page-change",e)}render(){return q`
      <div class="bar">
        <div class="side ${this.page?"wide":""}">
          ${this.page?q`<button class="icon" title="Back" aria-label="Back" @click=${()=>this._choose("")}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
                <h1 class="crumb">${Fr[this.page]}</h1>`:q`${this.narrow?q`<button class="icon" title="Menu" @click=${()=>this._fire("hass-toggle-menu")}><ha-icon icon="mdi:menu"></ha-icon></button>`:W}
              <h1><svg class="mark" viewBox="0 0 86.2 86.2" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M84.15 19.86 84.66 19.10 85.07 18.28 85.36 17.41 85.47 16.97 85.59 16.06 85.59 15.14 85.47 14.23 85.36 13.79 85.07 12.92 84.66 12.10 84.42 11.71 83.86 10.98 83.22 10.34 82.86 10.05 82.10 9.54 81.28 9.13 80.41 8.84 79.51 8.66 79.06 8.61 78.60 8.60 77.69 8.66 76.79 8.84 75.92 9.13 75.10 9.54 74.34 10.05 73.98 10.34 57.89 26.41 65.19 32.80 65.76 33.34 66.20 33.82 66.84 34.65 67.32 35.43 67.77 36.33 83.55 20.55ZM35.60 12.37 34.89 12.03 34.15 11.78 33.38 11.62 32.60 11.57 32.21 11.59 31.43 11.69 31.05 11.78 30.31 12.03 29.60 12.37 28.95 12.81 2.65 35.81 2.09 36.36 1.84 36.67 1.41 37.32 1.22 37.67 0.92 38.39 0.72 39.15 0.61 39.93 0.60 40.32 0.61 71.99 0.72 72.77 0.92 73.53 1.22 74.25 1.61 74.93 2.09 75.56 2.64 76.11 3.27 76.59 3.95 76.98 4.67 77.28 5.05 77.40 5.82 77.55 6.60 77.60 58.99 77.59 59.77 77.48 60.53 77.28 61.25 76.98 61.93 76.59 62.56 76.11 63.11 75.56 63.59 74.93 63.98 74.25 64.28 73.53 64.40 73.15 64.55 72.38 64.60 71.60 64.60 40.32 64.55 39.55 37.55 66.55 36.86 67.15 36.10 67.66 35.28 68.07 34.41 68.36 33.97 68.47 33.06 68.59 32.14 68.59 31.23 68.47 30.79 68.36 29.92 68.07 29.10 67.66 28.34 67.15 27.98 66.86 11.65 50.55 11.34 50.22 10.78 49.49 10.32 48.70 9.97 47.85 9.73 46.97 9.66 46.51 9.60 45.60 9.66 44.69 9.84 43.79 10.13 42.92 10.54 42.10 11.05 41.34 11.65 40.65 12.34 40.05 13.10 39.54 13.92 39.13 14.79 38.84 15.69 38.66 16.60 38.60 17.51 38.66 18.41 38.84 18.85 38.97 19.70 39.32 20.49 39.78 21.22 40.34 32.60 51.70 55.05 29.25 36.55 13.06 35.93 12.58Z"/></svg><span>Home Desk</span></h1>`}
        </div>
        ${this.page||!this.admin?q`<div class="tabs"></div>`:q`<div class="tabs" role="tablist">
              ${De.map(e=>q`<button class="tab ${e.id===this.view?"active":""}" role="tab" title=${e.label} aria-label=${e.label}
                  aria-selected=${e.id===this.view} @click=${()=>this._fire("view-change",e.id)}>
                  <ha-icon .icon=${e.icon}></ha-icon><span class="tab-text">${e.label}</span>${e.count?q`<span class="count">${this.tickets.filter(e.match).length}</span>`:W}
                </button>`)}
            </div>`}
        <div class="side end">
          ${this.admin?q`<button class="icon" title="Settings" aria-label="Settings" @click=${()=>this._choose("settings")}><ha-icon icon="mdi:cog-outline"></ha-icon></button>`:W}
          ${this.admin?q`<button class="icon" title="More options" aria-label="More options" aria-haspopup="menu" aria-expanded=${this._menuOpen}
                @click=${()=>this._menuOpen=!this._menuOpen}><ha-icon icon="mdi:dots-vertical"></ha-icon></button>`:W}
          ${this.admin&&this._menuOpen?q`<button class="menu-backdrop" aria-label="Close menu" @click=${()=>this._menuOpen=!1}></button>
                <div class="menu-popover" role="menu">
                  <button role="menuitem" @click=${()=>{this._menuOpen=!1,this._fire("refresh")}}><ha-icon icon="mdi:refresh"></ha-icon>Refresh</button>
                  ${this.admin?q`<button role="menuitem" @click=${()=>this._choose("labels")}><ha-icon icon="mdi:label-multiple-outline"></ha-icon>Manage Labels</button>
                        <button role="menuitem" @click=${()=>this._choose("categories")}><ha-icon icon="mdi:shape-outline"></ha-icon>Manage Categories</button>`:W}
                </div>`:W}
        </div>
      </div>
    `}};Wr.styles=[ue,n`
      :host {
        display: block;
        flex: none;
        background: var(--st-header-bg);
        color: var(--st-header-fg);
        border-bottom: 1px solid var(--st-divider);
      }
      .bar {
        position: relative;
        display: flex;
        align-items: center;
        height: 56px;
        padding: 0 4px;
      }
      .bar > .icon {
        flex: none;
        color: var(--st-header-fg);
      }
      .bar .side {
        flex: 1 1 0;
        min-width: 0;
        display: flex;
        align-items: center;
      }
      .bar .side.end {
        justify-content: flex-end;
        position: relative;
      }
      .bar h1 {
        margin: 0 0 0 12px;
        font-size: var(--st-fs-header);
        font-weight: 400;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      /* The brand mark (a house with a tick) before the title, in the brand's blue. */
      .bar h1:not(.crumb) {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .bar h1 .mark {
        flex: none;
        width: 26px;
        height: 26px;
        color: var(--st-brand, #03a9f4);
      }
      .bar h1.crumb {
        font-size: var(--st-fs-title);
        font-weight: 500;
      }
      .tabs {
        flex: 0 1 auto;
        min-width: 0;
        display: flex;
        align-self: stretch;
        overflow-x: auto;
        scrollbar-width: none;
      }
      .tabs::-webkit-scrollbar {
        display: none;
      }
      .tab {
        flex: none;
        align-self: stretch;
        height: auto;
        padding: 0 16px;
        gap: 8px;
        border-radius: 0;
        color: var(--st-fg);
        font-weight: 500;
        border-bottom: 2px solid transparent;
      }
      .tab:first-child {
        margin-left: auto;
      }
      .tab:last-child {
        margin-right: auto;
      }
      .tab ha-icon {
        --mdc-icon-size: 24px;
      }
      .tab .count {
        font-weight: 400;
        font-size: var(--st-fs-caption);
        padding: 1px 7px;
        border-radius: 10px;
        background: color-mix(in srgb, currentColor 18%, transparent);
      }
      .tab.active {
        color: var(--st-accent);
        border-bottom-color: var(--st-accent);
      }
      @media (max-width: 1000px) {
        .tab:not(.active) .tab-text,
        .tab:not(.active) .count {
          display: none;
        }
      }
      @media (max-width: 600px) {
        .bar h1:not(.crumb) {
          display: none;
        }
        .bar .side:not(.wide) {
          flex: none;
          width: 48px;
        }
        .tabs {
          flex: 1 1 0;
        }
        .tab {
          padding: 0 12px;
        }
      }
      .menu-backdrop {
        position: fixed;
        inset: 0;
        z-index: 4;
        height: auto;
        border-radius: 0;
        padding: 0;
        background: transparent;
        cursor: default;
      }
      .menu-popover {
        position: absolute;
        z-index: 5;
        top: 48px;
        right: 8px;
        min-width: 180px;
        padding: 8px 0;
        border-radius: 4px;
        background: var(--st-surface);
        box-shadow: var(--st-shadow-m);
      }
      .menu-popover button {
        width: 100%;
        height: 48px;
        padding: 0 16px;
        border-radius: 0;
        justify-content: flex-start;
        color: var(--st-fg);
        font-weight: 400;
        font-size: var(--st-fs-row);
      }
      .menu-popover ha-icon {
        color: var(--st-fg-secondary);
      }
    `],e([de()],Wr.prototype,"page",void 0),e([de()],Wr.prototype,"view",void 0),e([de({attribute:!1})],Wr.prototype,"tickets",void 0),e([de({type:Boolean})],Wr.prototype,"narrow",void 0),e([de({type:Boolean})],Wr.prototype,"admin",void 0),e([he()],Wr.prototype,"_menuOpen",void 0),Wr=e([pe("st-app-header")],Wr);let Zr=class extends ne{constructor(){super(...arguments),this.q="",this.open=!1,this.tickets=[],this.categories=[],this.labels=[]}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_change(e){return t=>this._fire("filters-change",{[e]:t.detail})}render(){const e=this.filters,t=Be(e);return q`
      <div class="toolbar ${this.open?"joined":""}">
        <span class="add-slot">
          <button class="icon add-btn" title="New Ticket" aria-label="New Ticket" @click=${()=>this._fire("new-ticket")}>
            <ha-icon icon="mdi:plus"></ha-icon><span class="words">New Ticket</span>
          </button>
        </span>
        <div class="search">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input type="search" placeholder="Search tickets" aria-label="Search tickets" .value=${this.q}
            @input=${e=>this._fire("search",e.target.value)} />
        </div>
        <button class="icon filter-btn ${t?"on":""}" title="Filters" aria-label="Filters" aria-expanded=${this.open}
          @click=${()=>this._fire("toggle-filters")}>
          <ha-icon icon="mdi:filter-variant"></ha-icon>${t?q`<span class="dot"></span>`:W}
        </button>
      </div>
      ${this.open?q`<div class="filters">
            ${"all"===e.view?q`<st-dropdown label="Show" .options=${je} .value=${e.scope} @change=${this._change("scope")}></st-dropdown>`:W}
            <st-dropdown label="Category" placeholder="Category" .options=${r=this.categories,[{id:"",label:"Any Category"},{id:"none",label:"No Category"},...r.map(e=>({id:e.id,label:e.name}))]} .value=${e.category}
              @change=${this._change("category")}></st-dropdown>
            <st-dropdown label="Raised By" placeholder="Raised By" .options=${function(e,t){const i=[...new Set(e.map(e=>e.requester).filter(Boolean))].sort();return t&&!i.includes(t)&&i.push(t),[{id:"",label:"Anyone"},...i.map(e=>({id:e,label:Ce(e)}))]}(this.tickets,e.person)} .value=${e.person}
              @change=${this._change("person")}></st-dropdown>
            <st-dropdown label="AI Agent" placeholder="AI Agent" .options=${[{id:"",label:"Any AI Agent"},{id:"with",label:"With AI Agent"},{id:"without",label:"Not with AI Agent"}]} .value=${e.agent}
              @change=${this._change("agent")}></st-dropdown>
            <st-dropdown label="Priority" placeholder="Priority" .options=${[{id:"",label:"Any Priority"},...me.map(e=>({id:e,label:we[e]}))]} .value=${e.priority}
              @change=${this._change("priority")}></st-dropdown>
            <st-dropdown label="Label" placeholder="Label" .options=${i=this.labels,[{id:"",label:"Any Label"},...i.map(e=>({id:e.id,label:e.name}))]} .value=${e.label}
              @change=${this._change("label")}></st-dropdown>
          </div>`:W}
    `;var i,r}};Zr.styles=[ue,n`
      :host {
        display: block;
        flex: none;
      }
      .toolbar {
        flex: none;
        display: flex;
        align-items: center;
        gap: var(--ha-space-4, 16px);
        height: 56px;
        padding: 0 16px;
        box-sizing: border-box;
        background: var(--st-bg);
        border-bottom: 1px solid var(--st-divider);
      }
      .toolbar.joined {
        border-bottom: none;
      }
      .search {
        flex: 1;
        min-width: 0;
        position: relative;
        display: flex;
        align-items: center;
      }
      .search ha-icon {
        position: absolute;
        left: 8px;
        --mdc-icon-size: 18px;
        color: var(--ha-color-text-secondary, var(--st-fg-secondary));
        pointer-events: none;
      }
      /* ha-input-search, outlined: 40px / 8px corners, and on wide screens 32px / 10px. */
      .search input[type="search"] {
        width: 100%;
        height: 40px;
        padding: 0 8px 0 34px;
        border: 1px solid var(--st-field-outline);
        border-radius: var(--ha-border-radius-md, 8px);
        background: var(--card-background-color, var(--st-surface));
        font-size: var(--st-fs-body);
        transition: border-color 250ms ease-in-out;
      }
      @media (min-width: 871px) {
        .search input[type="search"] {
          height: var(--st-h-bar);
          border-radius: var(--st-r-bar);
        }
      }
      .search input[type="search"]::placeholder {
        color: var(--ha-color-neutral-60, var(--st-fg-secondary));
        opacity: 1;
      }
      .search input[type="search"]:hover {
        border-color: var(--st-field-outline-hover);
      }
      .search input[type="search"]:focus {
        outline: none;
        border-color: var(--st-accent);
      }
      .toolbar .filter-btn {
        position: relative;
        flex: none;
        width: var(--st-h-bar);
        height: var(--st-h-bar);
        padding: 0;
        justify-content: center;
        border: 1px solid var(--st-outline);
        border-radius: var(--st-r-pill);
        background: transparent;
        color: var(--st-fg-secondary);
      }
      .toolbar .filter-btn ha-icon {
        --mdc-icon-size: 20px;
      }
      .toolbar .filter-btn.on {
        color: var(--st-accent);
        border-color: var(--st-accent);
        background: color-mix(in srgb, var(--st-accent) 14%, var(--st-surface));
      }
      .toolbar .filter-btn .dot {
        position: absolute;
        top: 4px;
        right: 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--st-accent);
      }
      .filters {
        flex: none;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        padding: 0 16px 12px;
        background: var(--st-bg);
        border-bottom: 1px solid var(--st-divider);
      }
      .filters st-dropdown {
        flex: 1 1 120px;
      }
      /*
       * New Ticket sits at the left of the toolbar as a round "+". Pointing at it opens it out to the right
       * over the search box, with the words, so the search doesn't move.
       */
      .toolbar .add-slot {
        position: relative;
        flex: none;
        width: var(--st-h-bar);
        height: var(--st-h-bar);
      }
      .toolbar .add-btn {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
        box-sizing: border-box;
        width: max-content;
        min-width: var(--st-h-bar);
        height: var(--st-h-bar);
        padding: 0 5px;
        gap: 0;
        justify-content: flex-start;
        border: 1px solid var(--st-accent);
        border-radius: var(--st-r-pill);
        background: var(--st-accent);
        color: var(--text-primary-color, #fff);
        white-space: nowrap;
        font-size: var(--st-fs-body);
        font-weight: var(--ha-font-weight-medium, 500);
        transition: padding-right 200ms ease-in-out;
      }
      .toolbar .add-btn .words {
        max-width: 0;
        overflow: hidden;
        opacity: 0;
        transition:
          max-width 200ms ease-in-out,
          margin-left 200ms ease-in-out,
          opacity 150ms ease-in-out;
      }
      .toolbar .add-btn:hover,
      .toolbar .add-btn:focus-visible {
        padding-right: 12px;
        box-shadow: var(--st-shadow-m);
      }
      .toolbar .add-btn:hover .words,
      .toolbar .add-btn:focus-visible .words {
        max-width: 100px;
        margin-left: 4px;
        opacity: 1;
      }
      .toolbar .add-btn ha-icon {
        --mdc-icon-size: 20px;
      }
      @media (prefers-reduced-motion: reduce) {
        .toolbar .add-btn,
        .toolbar .add-btn .words {
          transition: none;
        }
      }
    `],e([de()],Zr.prototype,"q",void 0),e([de({attribute:!1})],Zr.prototype,"filters",void 0),e([de({type:Boolean})],Zr.prototype,"open",void 0),e([de({attribute:!1})],Zr.prototype,"tickets",void 0),e([de({attribute:!1})],Zr.prototype,"categories",void 0),e([de({attribute:!1})],Zr.prototype,"labels",void 0),Zr=e([pe("st-list-toolbar")],Zr);const Gr=[{id:"bug",name:"Problem",icon:"mdi:alert-circle-outline",hint:"Something isn't working"},{id:"enhancement",name:"Suggestion",icon:"mdi:lightbulb-on-outline",hint:"An idea or a request"}];let Yr=class extends ne{constructor(){super(...arguments),this._title="",this._details="",this._kind="bug",this._sending=!1,this._sent=!1,this._error=""}async _send(){if(this._title.trim()&&!this._sending){this._sending=!0,this._error="";try{await this.client.create({title:this._title.trim(),description:this._details,labels:[this._kind],priority:"normal"}),this._sent=!0,this._title="",this._details="",this._kind="bug"}catch(e){this._error=String(e&&"object"==typeof e&&"message"in e?e.message:e)}finally{this._sending=!1}}}render(){return this._sent?q`<div class="page thanks">
        <ha-icon icon="mdi:check-circle-outline"></ha-icon>
        <h2>Thanks, that's been sent</h2>
        <p class="lead">Whoever looks after the smart home will see it. They may talk to you about it.</p>
        <div class="actions">
          <button @click=${()=>this._sent=!1}>Report something else</button>
        </div>
      </div>`:q`<div class="page">
      <h2>Report a problem or an idea</h2>
      <p class="lead">Tell us what happened or what you'd like. You don't need to know what's wrong.</p>

      <div class="field">
        <label class="caption" id="kind-label">What is it?</label>
        <div class="kinds" role="radiogroup" aria-labelledby="kind-label">
          ${Gr.map(e=>q`<button class="kind" role="radio" aria-checked=${this._kind===e.id?"true":"false"}
              @click=${()=>this._kind=e.id}>
              <ha-icon .icon=${e.icon}></ha-icon>
              <span><div class="name">${e.name}</div><div class="hint">${e.hint}</div></span>
            </button>`)}
        </div>
      </div>

      <div class="field">
        <label class="caption" for="title">${"bug"===this._kind?"What went wrong?":"What would you like?"}</label>
        <input id="title" type="text" autofocus maxlength="300" .value=${this._title}
          placeholder=${"bug"===this._kind?"The lounge light didn't turn on":"A bedtime scene for the kids' rooms"}
          @input=${e=>this._title=e.target.value}
          @keydown=${e=>"Enter"===e.key&&void this._send()} />
      </div>

      <div class="field">
        <label class="caption" for="details">More detail (optional)</label>
        <textarea id="details" rows="6" .value=${this._details}
          placeholder="When did it happen? Does it always happen? Anything else that might help."
          @input=${e=>this._details=e.target.value}></textarea>
      </div>

      ${this._error?q`<div class="error">${this._error}</div>`:W}
      <div class="actions">
        <button class="primary" ?disabled=${!this._title.trim()||this._sending} @click=${()=>{this._send()}}>
          ${this._sending?"Sending…":"Send"}
        </button>
      </div>
    </div>`}};Yr.styles=[ue,n`
      :host {
        display: block;
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        background: var(--st-surface);
      }
      .page {
        max-width: 560px;
        margin: 0 auto;
        padding: 32px 16px 48px;
      }
      h2 {
        margin: 0 0 4px;
        font-size: var(--st-fs-dialog);
        font-weight: 400;
      }
      .lead {
        margin: 0 0 24px;
        font-size: var(--st-fs-body);
        color: var(--st-fg-secondary);
      }
      label.caption {
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
      /* Problem or Suggestion: two big choices, one picked. */
      .kinds {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }
      .kind {
        display: flex;
        align-items: center;
        gap: 12px;
        height: auto;
        padding: 12px 16px;
        border: 1px solid var(--st-outline);
        border-radius: var(--ha-border-radius-xl, 12px);
        background: transparent;
        color: var(--st-fg);
        font-weight: 400;
        text-align: left;
        justify-content: flex-start;
      }
      .kind ha-icon {
        --mdc-icon-size: 24px;
        flex: none;
        color: var(--st-fg-secondary);
      }
      .kind .name {
        font-size: var(--st-fs-body);
        font-weight: 500;
      }
      .kind .hint {
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
      }
      .kind[aria-checked="true"] {
        border-color: var(--st-accent);
        background: color-mix(in srgb, var(--st-accent) 12%, transparent);
      }
      .kind[aria-checked="true"] ha-icon {
        color: var(--st-accent);
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 24px;
      }
      .error {
        margin-top: 12px;
        font-size: var(--st-fs-body);
        color: var(--st-danger);
      }
      .thanks {
        text-align: center;
        padding-top: 48px;
      }
      .thanks ha-icon {
        --mdc-icon-size: 64px;
        color: var(--st-success);
      }
      .thanks h2 {
        margin-top: 16px;
      }
      .thanks .actions {
        justify-content: center;
      }
    `],e([de({attribute:!1})],Yr.prototype,"client",void 0),e([he()],Yr.prototype,"_title",void 0),e([he()],Yr.prototype,"_details",void 0),e([he()],Yr.prototype,"_kind",void 0),e([he()],Yr.prototype,"_sending",void 0),e([he()],Yr.prototype,"_sent",void 0),e([he()],Yr.prototype,"_error",void 0),Yr=e([pe("st-report-form")],Yr);let Xr=class extends ne{constructor(){super(...arguments),this.heading="",this.body="",this.confirmLabel="Confirm",this.danger=!1}_fire(e){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0}))}firstUpdated(){this.renderRoot.querySelector("button.primary")?.focus()}render(){return q`<div class="scrim" @click=${e=>e.target===e.currentTarget&&this._fire("cancel")}
      @keydown=${e=>"Escape"===e.key&&this._fire("cancel")}>
      <div class="dialog" role="alertdialog" aria-modal="true" aria-label=${this.heading}>
        <h2>${this.heading}</h2>
        <p>${this.body}</p>
        <div class="actions">
          <button @click=${()=>this._fire("cancel")}>Cancel</button>
          <button class="primary ${this.danger?"danger":""}" @click=${()=>this._fire("confirm")}>${this.confirmLabel}</button>
        </div>
      </div>
    </div>`}};Xr.styles=[ue,n`
      .scrim {
        position: fixed;
        inset: 0;
        z-index: 30;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        background: rgba(0, 0, 0, 0.32);
      }
      .dialog {
        width: min(320px, 100%);
        box-sizing: border-box;
        padding: 24px;
        border-radius: var(--ha-border-radius-4xl, 28px);
        background: var(--st-surface);
        box-shadow: var(--st-shadow-l);
      }
      h2 {
        margin: 0 0 16px;
        font-size: var(--ha-font-size-2xl, 24px);
        font-weight: 400;
      }
      p {
        margin: 0 0 24px;
        font-size: var(--st-fs-row);
        line-height: 1.5;
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }
      button {
        height: 40px;
        padding: 0 var(--ha-space-4, 16px);
        border-radius: var(--st-r-pill);
        font-weight: var(--ha-font-weight-medium, 500);
      }
      button.danger {
        background: color-mix(in srgb, var(--st-danger) 75%, black);
        color: #fff;
      }
    `],e([de()],Xr.prototype,"heading",void 0),e([de()],Xr.prototype,"body",void 0),e([de()],Xr.prototype,"confirmLabel",void 0),e([de({type:Boolean})],Xr.prototype,"danger",void 0),Xr=e([pe("st-confirm-dialog")],Xr);let Qr=class extends ne{constructor(){super(...arguments),this.rect=null,this.items=[],this.additional=()=>[],this.value="",this.emptyLabel="Nothing here",this._q="",this._active=0}get _rows(){const e=this._q.trim().toLowerCase(),t=e?this.items.filter(t=>`${t.primary} ${t.secondary??""}`.toLowerCase().includes(e)):this.items;return[...t,...this.additional(this._q.trim())]}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_onKey(e){const t=this._rows;"Escape"===e.key?this._fire("close"):"ArrowDown"===e.key?(this._active=Math.min(this._active+1,t.length-1),e.preventDefault()):"ArrowUp"===e.key?(this._active=Math.max(this._active-1,0),e.preventDefault()):"Enter"===e.key&&t[this._active]&&this._fire("pick",{id:t[this._active].id,search:this._q.trim()})}firstUpdated(){this.renderRoot.querySelector("input")?.focus()}get _position(){const e=this.rect;if(!e)return"";const t=Math.max(8,Math.min(e.left,window.innerWidth-348)),i=window.innerHeight-e.bottom;return i>=300||i>=e.top?`left:${t}px;top:${e.bottom+4}px;max-height:${Math.max(160,Math.min(380,i-12))}px`:`left:${t}px;bottom:${window.innerHeight-e.top+4}px;max-height:${Math.max(160,Math.min(380,e.top-12))}px`}render(){const e=this._rows;return q`
      <button class="backdrop" tabindex="-1" aria-label="Close" @click=${()=>this._fire("close")}></button>
      <div class="popup" style=${this._position} role="listbox" @keydown=${this._onKey}>
        <div class="search">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input type="search" placeholder="Search" aria-label="Search" .value=${this._q}
            @input=${e=>{this._q=e.target.value,this._active=0}} />
        </div>
        <div class="list">
          ${e.length?W:q`<div class="empty">${this.emptyLabel}</div>`}
          ${e.map((e,t)=>q`<button class="item ${t===this._active?"active":""} ${e.id===this.value?"current":""}"
            role="option" aria-selected=${e.id===this.value}
            @mouseenter=${()=>this._active=t}
            @click=${()=>this._fire("pick",{id:e.id,search:this._q.trim()})}>
            <ha-icon .icon=${e.icon??"mdi:tag-outline"}></ha-icon>
            <span class="text"><span>${e.primary}</span>${e.secondary?q`<span class="secondary">${e.secondary}</span>`:W}</span>
          </button>`)}
        </div>
      </div>`}};Qr.styles=[ue,n`
      .backdrop {
        position: fixed;
        inset: 0;
        z-index: 40;
        height: auto;
        padding: 0;
        border-radius: 0;
        background: transparent;
        cursor: default;
      }
      .popup {
        position: fixed;
        z-index: 41;
        width: min(340px, calc(100vw - 16px));
        max-height: 380px;
        display: flex;
        flex-direction: column;
        padding: 12px 0 8px;
        box-sizing: border-box;
        border-radius: var(--ha-border-radius-md, 8px);
        background: var(--st-surface);
        box-shadow: var(--st-shadow-m);
        outline: 1px solid var(--st-divider);
      }
      .search {
        position: relative;
        display: flex;
        align-items: center;
        flex: none;
        margin: 0 12px 8px;
      }
      .search ha-icon {
        position: absolute;
        left: 10px;
        --mdc-icon-size: 20px;
        color: var(--st-fg-secondary);
        pointer-events: none;
      }
      .search input {
        width: 100%;
        height: 40px;
        padding: 0 12px 0 40px;
        border: 1px solid var(--st-accent);
        border-radius: var(--st-r-bar);
        background: transparent;
        font-size: var(--st-fs-field);
      }
      .search input:focus {
        outline: none;
      }
      .list {
        overflow-y: auto;
      }
      .item {
        width: 100%;
        height: auto;
        min-height: 48px;
        padding: 6px 16px;
        gap: 16px;
        border-radius: 0;
        justify-content: flex-start;
        text-align: left;
        color: var(--st-fg);
        font-weight: 400;
        font-size: var(--st-fs-row);
      }
      .item.active {
        background: var(--st-hover);
      }
      .item.current {
        color: var(--st-accent);
      }
      .item ha-icon {
        --mdc-icon-size: 24px;
        color: var(--st-fg-secondary);
        flex: none;
      }
      .item.current ha-icon {
        color: inherit;
      }
      .text {
        min-width: 0;
        display: flex;
        flex-direction: column;
      }
      .text .secondary {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: var(--st-fs-caption);
        color: var(--st-fg-secondary);
      }
      .empty {
        padding: 16px;
        text-align: center;
        color: var(--st-fg-secondary);
      }
    `],e([de({attribute:!1})],Qr.prototype,"rect",void 0),e([de({attribute:!1})],Qr.prototype,"items",void 0),e([de({attribute:!1})],Qr.prototype,"additional",void 0),e([de()],Qr.prototype,"value",void 0),e([de()],Qr.prototype,"emptyLabel",void 0),e([he()],Qr.prototype,"_q",void 0),e([he()],Qr.prototype,"_active",void 0),Qr=e([pe("st-picker-popup")],Qr);let Vr=class extends ne{constructor(){super(...arguments),this.name="",this.error="",this._name="",this._icon="",this._shake=!1}connectedCallback(){super.connectedCallback(),this._name=this.name}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_tryClose(){this._name.trim()||this._icon.trim()?(this._shake=!0,window.setTimeout(()=>this._shake=!1,400)):this._fire("close")}_create(){this._name.trim()&&this._fire("create",{name:this._name.trim(),icon:this._icon.trim()})}firstUpdated(){this.renderRoot.querySelector("#name")?.focus()}render(){return q`<div class="scrim" @click=${e=>e.target===e.currentTarget&&this._tryClose()}
      @keydown=${e=>"Escape"===e.key&&this._tryClose()}>
      <div class="dialog ${this._shake?"shake":""}" role="dialog" aria-modal="true" aria-label="New Category">
        <div class="head">
          <button class="icon" title="Close" @click=${()=>this._fire("close")}><ha-icon icon="mdi:close"></ha-icon></button>
          <h2>New Category</h2>
        </div>
        <div class="field">
          <label for="name">Name*</label>
          <input id="name" type="text" .value=${this._name}
            @input=${e=>this._name=e.target.value}
            @keydown=${e=>"Enter"===e.key&&this._create()} />
        </div>
        <div class="field icon">
          ${this._icon?q`<ha-icon .icon=${this._icon}></ha-icon>`:q`<ha-icon icon="mdi:tag-outline"></ha-icon>`}
          <div class="body">
            <label for="icon">Icon</label>
            <input id="icon" type="text" placeholder="mdi:lan" .value=${this._icon}
              @input=${e=>this._icon=e.target.value} />
          </div>
        </div>
        ${this.error?q`<div class="error">${this.error}</div>`:W}
        <div class="actions">
          <button class="pill primary" ?disabled=${!this._name.trim()} @click=${this._create}>Create</button>
        </div>
      </div>
    </div>`}};Vr.styles=[ue,n`
      .scrim {
        position: fixed;
        inset: 0;
        z-index: 30;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        background: rgba(0, 0, 0, 0.32);
      }
      .dialog {
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: min(560px, 100%);
        box-sizing: border-box;
        padding: 16px 24px 24px;
        border-radius: var(--ha-border-radius-4xl, 28px);
        background: var(--st-surface);
        box-shadow: var(--st-shadow-l);
      }
      .dialog.shake {
        animation: shake 0.4s;
      }
      @keyframes shake {
        20% { transform: translateX(-8px); }
        40% { transform: translateX(8px); }
        60% { transform: translateX(-5px); }
        80% { transform: translateX(5px); }
      }
      @media (prefers-reduced-motion: reduce) {
        .dialog.shake { animation: none; }
      }
      .head {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-left: -8px;
      }
      h2 {
        margin: 0;
        font-size: var(--st-fs-dialog);
        font-weight: 400;
      }
      .field {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 56px;
        padding: 6px 16px 0;
        border-radius: 4px 4px 0 0;
        border-bottom: 1px solid var(--ha-color-border-neutral-loud, var(--st-fg-secondary));
        background: var(--ha-color-form-background, color-mix(in srgb, var(--st-fg) 12%, transparent));
      }
      .field:hover {
        background: var(--ha-color-form-background-hover, color-mix(in srgb, var(--st-fg) 16%, transparent));
      }
      .field:focus-within {
        border-bottom: 2px solid var(--st-accent);
      }
      .field label {
        font-size: var(--ha-font-size-xs, 10px);
        color: var(--st-fg-secondary);
      }
      .field:focus-within label {
        color: var(--st-accent);
      }
      .field input {
        width: 100%;
        height: 28px;
        padding: 0;
        border: none;
        border-radius: 0;
        background: transparent;
        font-size: var(--st-fs-field);
        outline: none;
      }
      .field.icon {
        flex-direction: row;
        align-items: center;
        gap: 12px;
        padding-left: 12px;
      }
      .field.icon .body {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding-top: 6px;
      }
      .field.icon ha-icon {
        --mdc-icon-size: 24px;
        width: 28px;
        color: var(--st-fg-secondary);
      }
      .error {
        font-size: var(--st-fs-small);
        color: var(--st-danger);
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 8px;
      }
      button.pill {
        height: 40px;
        padding: 0 var(--ha-space-4, 16px);
        border-radius: var(--st-r-pill);
        font-weight: var(--ha-font-weight-medium, 500);
      }
      button.pill:disabled {
        opacity: 1;
        cursor: default;
        color: color-mix(in srgb, var(--st-fg) 38%, transparent);
        background: color-mix(in srgb, var(--st-fg) 12%, transparent);
      }
    `],e([de()],Vr.prototype,"name",void 0),e([de()],Vr.prototype,"error",void 0),e([he()],Vr.prototype,"_name",void 0),e([he()],Vr.prototype,"_icon",void 0),e([he()],Vr.prototype,"_shake",void 0),Vr=e([pe("st-category-dialog")],Vr);const Kr="___add_new___",Jr="___none___",es="(max-width: 870px)";let ts=class extends ne{constructor(){super(...arguments),this.narrow=!1,this.route=void 0,this._tickets=[],this._matchIds=null,this._selected=null,this._selectedId=null,this._view="active",this._q="",this._priority="",this._label="",this._category="",this._person="",this._agentFilter="",this._filtersOpen=!1,this._compact=window.matchMedia(es).matches,this._scope="",this._labelList=[],this._categoryList=[],this._settings=null,this._pickingLabel=null,this._picking=null,this._newCategory=null,this._removing=null,this._page="",this._creating=!1,this._error="",this._onVisible=()=>{document.hidden||this._refresh()},this._mq=window.matchMedia(es),this._onCompact=()=>{this._compact=this._mq.matches},this._pickerAdditional=e=>{const t=this._categoryList.some(t=>t.name.toLowerCase()===e.toLowerCase());return e&&!t?[{id:Kr+e,primary:`Add New Category '${e}'`,icon:"mdi:plus"}]:[{id:Kr,primary:"Add New Category…",icon:"mdi:plus"}]},this._labelPickerAdditional=e=>{const t=this._labelList.some(t=>t.name.toLowerCase()===e.toLowerCase());return e&&!t?[{id:Kr+e,primary:`Add New Label '${e}'`,icon:"mdi:plus"}]:[]}}get _admin(){return this.hass?.user?.is_admin??!1}recheckTheme(){const e=document.createElement("span");e.style.color="var(--card-background-color)",this.renderRoot.appendChild(e);const t=/rgba?\((\d+)[ ,]+(\d+)[ ,]+(\d+)/.exec(getComputedStyle(e).color);e.remove(),t&&this.toggleAttribute("light",(.299*+t[1]+.587*+t[2]+.114*+t[3])/255>.5)}willUpdate(e){if(e.has("hass")&&this.hass){const e=this.hass.themes;e===this._themeKey&&this.hasUpdated||(this._themeKey=e,this.updateComplete.then(()=>this.recheckTheme()))}e.has("hass")&&this.hass&&!this._client&&(this._client=new fe(this.hass),this._restoreState(),this._refresh(),this._syncFromRoute(),this._subscribe()),e.has("route")&&this._client&&this._syncFromRoute()}get _prefix(){return this.route?.prefix??"/home-desk"}_navigate(e){if(location.pathname!==e)try{history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}catch{}}async _syncFromRoute(){const e=Number((this.route?.path??"").replace(/^\//,"")),t=Number.isInteger(e)&&e>0?e:null;t!==this._selectedId&&(null===t?(this._selectedId=null,this._selected=null):await this._open(t,!1))}_subscribe(){this._client&&(this._client.subscribe(()=>this._scheduleRefresh()).then(e=>{this._unsub=e}).catch(e=>{console.warn("[home-desk] live updates unavailable, polling instead:",e),this._unsub=void 0}),window.clearInterval(this._pollTimer),this._pollTimer=window.setInterval(()=>{document.hidden||this._refresh()},2e4))}connectedCallback(){super.connectedCallback(),this._mq.addEventListener("change",this._onCompact),document.addEventListener("visibilitychange",this._onVisible),this._client&&!this._unsub&&this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._mq.removeEventListener("change",this._onCompact),document.removeEventListener("visibilitychange",this._onVisible),window.clearInterval(this._pollTimer),this._unsub?.(),this._unsub=void 0,window.clearTimeout(this._searchTimer),window.clearTimeout(this._refreshTimer)}_restoreState(){try{const e=localStorage.getItem("home-desk-view");e&&De.some(t=>t.id===e)&&(this._view=e)}catch{}}_setView(e){this._view=e,"all"===e&&(this._filtersOpen=!0);try{localStorage.setItem("home-desk-view",e)}catch{}}_scheduleRefresh(){window.clearTimeout(this._refreshTimer),this._refreshTimer=window.setTimeout(()=>{this._refresh()},300)}async _refresh(){if(this._client&&this._admin)try{[this._tickets,this._labelList,this._categoryList]=await Promise.all([this._client.list(),this._client.labels(),this._client.categories()]),this._admin&&(this._settings=await this._client.settings()),this._q.trim()&&await this._runSearch(),null!==this._selectedId&&await this._loadSelected(this._selectedId),this._error=""}catch(e){this._error=`Could not load tickets: ${this._message(e)}`}}async _loadSelected(e){if(this._client)try{this._selected=await this._client.get(e)}catch(e){this._selected=null,this._selectedId=null,this._navigate(this._prefix),this._error=this._message(e)}}async _runSearch(){if(!this._client)return;const e=this._q.trim();this._matchIds=e?new Set((await this._client.list(e)).map(e=>e.id)):null}_message(e){return String(e&&"object"==typeof e&&"message"in e?e.message:e)}async _act(e){if(this._client)try{this._selected=await e(this._client),this._error="",this._refresh()}catch(e){this._error=this._message(e)}}_search(e){this._q=e,window.clearTimeout(this._searchTimer),this._searchTimer=window.setTimeout(()=>{this._runSearch()},250)}async _open(e,t=!0){this._selectedId=e,t&&this._navigate(`${this._prefix}/${e}`),await this._loadSelected(e)}get _pickerItems(){const e=this._picking?.ticket.category;return[...e?[{id:Jr,primary:"No Category",icon:"mdi:shape-outline"}]:[],...this._categoryList.map(e=>({id:e.id,primary:e.name,icon:e.icon||"mdi:tag-outline"}))]}get _labelPickerItems(){const e=new Set(this._pickingLabel?.ticket.labels??[]);return this._labelList.filter(t=>!e.has(t.id)).map(e=>({id:e.id,primary:e.name,icon:e.icon||"mdi:label-outline",...e.description?{secondary:e.description}:{}}))}async _labelPicked({id:e}){const t=this._pickingLabel;if(this._pickingLabel=null,!t||!this._client)return;const i=e.startsWith(Kr)?e.slice(13):e;try{await this._client.update(t.ticket.id,{labels:[...t.ticket.labels,i]}),this._error="",this._refresh()}catch(e){this._error=this._message(e)}}async _picked({id:e}){const t=this._picking;this._picking=null,t&&(e.startsWith(Kr)?this._newCategory={ticket:t.ticket,name:e.slice(13),error:""}:await this._setCategory(t.ticket,e===Jr?null:e))}async _setCategory(e,t){if(this._client)try{await this._client.update(e.id,{category:t}),this._error="",this._refresh()}catch(e){this._error=this._message(e)}}async _createCategory(e){const t=this._newCategory;if(t&&this._client)try{const i=await this._client.createCategory(e);this._newCategory=null,await this._setCategory(t.ticket,i.id)}catch(e){this._newCategory={...t,error:this._message(e)}}}async _removeLabel(){const e=this._removing;if(this._removing=null,e&&this._client)try{await this._client.update(e.ticket.id,{labels:e.ticket.labels.filter(t=>t!==e.label.id)}),this._error="",this._refresh()}catch(e){this._error=this._message(e)}}_close(){this._selectedId=null,this._selected=null,this._navigate(this._prefix)}async _create(e){if(this._client)try{const t=await this._client.create(e);this._creating=!1,this._setView("active"),this._selected=t,this._open(t.id),this._refresh()}catch(e){this._error=this._message(e)}}_applyFilters(e){void 0!==e.scope&&(this._scope=e.scope),void 0!==e.category&&(this._category=e.category),void 0!==e.person&&(this._person=e.person),void 0!==e.agent&&(this._agentFilter=e.agent),void 0!==e.priority&&(this._priority=e.priority),void 0!==e.label&&(this._label=e.label)}get _filters(){return{view:this._view,scope:this._scope,category:this._category,priority:this._priority,label:this._label,person:this._person,agent:this._agentFilter}}get _filtered(){return function(e,t,i){const r=De.find(e=>e.id===t.view)??De[0];return e.filter(e=>r.match(e)&&("all"!==r.id||!t.scope||He.find(e=>e.id===t.scope).match(e))&&(!i||i.has(e.id))&&(!t.priority||e.priority===t.priority)&&(!t.label||e.labels.includes(t.label))&&(!t.person||e.requester===t.person)&&(!t.agent||Se(e.assignee??"")===("with"===t.agent))&&(!t.category||("none"===t.category?!e.category:e.category===t.category)))}(this._tickets,this._filters,this._matchIds)}get _filterCount(){return Be(this._filters)}get _agentName(){const e=this._settings?.agent;return`ai:${(e?String(this.hass.states?.[e]?.attributes.friendly_name??""):"").replace(/\s*(AI Task|conversation|agent)\s*$/i,"").trim()||"Claude"}`}get _people(){const e=new Map;for(const[t,i]of Object.entries(this.hass?.states??{})){if(!t.startsWith("person."))continue;const r=String(i.attributes.friendly_name??t.slice(7)),s=i.attributes.entity_picture;e.set(r.toLowerCase(),{name:r,..."string"==typeof s&&s?{picture:s}:{}})}return e}get _labelMap(){return new Map(this._labelList.map(e=>[e.id,e]))}render(){if(!this.hass)return W;const e=this.hass.language,t=null!==this._selectedId;return q`
      <st-app-header .page=${this._page} .view=${this._view} .tickets=${this._tickets} .narrow=${this.narrow} .admin=${this._admin}
        @page-change=${e=>this._page=e.detail}
        @view-change=${e=>this._setView(e.detail)}
        @refresh=${()=>{this._refresh()}}></st-app-header>
      ${this._error?q`<div class="banner">${this._error}</div>`:W}
      ${!this._admin&&this._client?q`<st-report-form .client=${this._client}></st-report-form>`:"labels"===this._page&&this._client?q`<st-label-manager .client=${this._client} .labels=${this._labelList}
            @labels-changed=${()=>{this._refresh()}}></st-label-manager>`:"categories"===this._page&&this._client?q`<st-category-manager .client=${this._client} .categories=${this._categoryList}
              @categories-changed=${()=>{this._refresh()}}></st-category-manager>`:"settings"===this._page&&this._client?q`<st-settings .client=${this._client} .hass=${this.hass}
                @settings-changed=${e=>this._settings=e.detail}></st-settings>`:q`<main class=${t?"has-selection":""}>
        <div class="list-pane">
          <st-list-toolbar .q=${this._q} .filters=${this._filters} .open=${this._filtersOpen} .tickets=${this._tickets}
            .categories=${this._categoryList} .labels=${this._labelList}
            @search=${e=>this._search(e.detail)}
            @toggle-filters=${()=>this._filtersOpen=!this._filtersOpen}
            @filters-change=${e=>this._applyFilters(e.detail)}
            @new-ticket=${()=>this._creating=!0}></st-list-toolbar>
          <st-ticket-list
            .tickets=${this._filtered}
            .selectedId=${this._selectedId}
            .language=${e}
            .isAdmin=${this._admin}
            .labelMap=${this._labelMap}
            .categoryMap=${new Map(this._categoryList.map(e=>[e.id,e]))}
            @select-ticket=${e=>{this._open(e.detail)}}
            @filter-person=${e=>{this._person=e.detail,this._filtersOpen=!0}}
            @pick-category=${e=>this._picking=e.detail}
            @remove-label=${e=>this._removing=e.detail}
          ></st-ticket-list>
        </div>
        <st-ticket-detail
          .ticket=${this._selected}
          .isAdmin=${this._admin}
          .narrow=${this._compact}
          .language=${e}
          .agentName=${this._agentName}
          .labelMap=${this._labelMap}
          .people=${this._people}
          .categoryMap=${new Map(this._categoryList.map(e=>[e.id,e]))}
          @pick-category=${e=>this._picking=e.detail}
          @remove-label=${e=>this._removing=e.detail}
          @pick-label=${e=>this._pickingLabel=e.detail}
          @back=${()=>this._close()}
          @open-ticket=${e=>{this._open(e.detail)}}
          @patch-ticket=${e=>this._selected&&void this._act(t=>t.update(this._selected.id,e.detail))}
          @comment=${e=>this._selected&&void this._act(t=>t.comment(this._selected.id,e.detail.body,e.detail.internal))}
          @close-ticket=${e=>this._selected&&void this._act(t=>t.close(this._selected.id,e.detail.resolution,e.detail.status))}
        ></st-ticket-detail>
      </main>`}
      ${this._pickingLabel?q`<st-picker-popup .rect=${this._pickingLabel.rect} .items=${this._labelPickerItems} .additional=${this._labelPickerAdditional}
            emptyLabel="No more labels to add"
            @close=${()=>this._pickingLabel=null}
            @pick=${e=>{this._labelPicked(e.detail)}}></st-picker-popup>`:W}
      ${this._picking?q`<st-picker-popup .rect=${this._picking.rect} .items=${this._pickerItems} .additional=${this._pickerAdditional}
            .value=${this._picking.ticket.category??""} emptyLabel="No categories available"
            @close=${()=>this._picking=null}
            @pick=${e=>{this._picked(e.detail)}}></st-picker-popup>`:W}
      ${this._newCategory?q`<st-category-dialog .name=${this._newCategory.name} .error=${this._newCategory.error}
            @close=${()=>this._newCategory=null}
            @create=${e=>{this._createCategory(e.detail)}}></st-category-dialog>`:W}
      ${this._removing?q`<st-confirm-dialog heading="Remove Label?" confirmLabel="Remove" danger
            body="Are you sure you want to remove label ${this._removing.label.name} from this ticket?"
            @cancel=${()=>this._removing=null}
            @confirm=${()=>{this._removeLabel()}}></st-confirm-dialog>`:W}
      ${this._creating?q`<st-new-ticket-dialog .isAdmin=${this._admin} .categories=${this._categoryList}
            @close=${()=>this._creating=!1}
            @create=${e=>{this._create(e.detail)}}></st-new-ticket-dialog>`:W}
    `}};ts.styles=[ue,ge],e([de({attribute:!1})],ts.prototype,"hass",void 0),e([de({type:Boolean})],ts.prototype,"narrow",void 0),e([de({attribute:!1})],ts.prototype,"route",void 0),e([he()],ts.prototype,"_tickets",void 0),e([he()],ts.prototype,"_matchIds",void 0),e([he()],ts.prototype,"_selected",void 0),e([he()],ts.prototype,"_selectedId",void 0),e([he()],ts.prototype,"_view",void 0),e([he()],ts.prototype,"_q",void 0),e([he()],ts.prototype,"_priority",void 0),e([he()],ts.prototype,"_label",void 0),e([he()],ts.prototype,"_category",void 0),e([he()],ts.prototype,"_person",void 0),e([he()],ts.prototype,"_agentFilter",void 0),e([he()],ts.prototype,"_filtersOpen",void 0),e([he()],ts.prototype,"_compact",void 0),e([he()],ts.prototype,"_scope",void 0),e([he()],ts.prototype,"_labelList",void 0),e([he()],ts.prototype,"_categoryList",void 0),e([he()],ts.prototype,"_settings",void 0),e([he()],ts.prototype,"_pickingLabel",void 0),e([he()],ts.prototype,"_picking",void 0),e([he()],ts.prototype,"_newCategory",void 0),e([he()],ts.prototype,"_removing",void 0),e([he()],ts.prototype,"_page",void 0),e([he()],ts.prototype,"_creating",void 0),e([he()],ts.prototype,"_error",void 0),ts=e([pe("home-desk-panel")],ts)}();
