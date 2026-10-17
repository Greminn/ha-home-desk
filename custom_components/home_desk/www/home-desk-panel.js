/*! home-desk-panel v0.1.0 | MIT */
!function(){"use strict";function e(e,t,i,r){var o,n=arguments.length,s=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(n<3?o(s):n>3?o(t,i,s):o(t,i))||s);return n>3&&s&&Object.defineProperty(t,i,s),s}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),o=new WeakMap;let n=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(t,e))}return e}toString(){return this.cssText}};const s=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new n(i,e,r)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,r))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,m=f?f.emptyScript:"",b=g.reactiveElementPolyfillSupport,v=(e,t)=>e,x={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},y=(e,t)=>!l(e,t),_={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=_){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&c(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:o}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const n=r?.call(this);o?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,r)=>{if(i)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of r){const r=document.createElement("style"),o=t.litNonce;void 0!==o&&r.setAttribute("nonce",o),r.textContent=i.cssText,e.appendChild(r)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:x).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:x;this._$Em=r;const n=o.fromAttribute(t,e.type);this[r]=n??this._$Ej?.get(r)??n,this._$Em=null}}requestUpdate(e,t,i,r=!1,o){if(void 0!==e){const n=this.constructor;if(!1===r&&(o=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??y)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:o},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==o||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,b?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,$=e=>e,A=k.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,T="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+C,E=`<${z}>`,R=document,L=()=>R.createComment(""),N=e=>null===e||"object"!=typeof e&&"function"!=typeof e,O=Array.isArray,I="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,D=/>/g,H=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,U=/"/g,B=/^(?:script|style|textarea|title)$/i,q=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),F=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),Z=new WeakMap,G=R.createTreeWalker(R,129);function Y(e,t){if(!O(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}let X=class e{constructor({strings:t,_$litType$:i},r){let o;this.parts=[];let n=0,s=0;const a=t.length-1,l=this.parts,[c,d]=((e,t)=>{const i=e.length-1,r=[];let o,n=2===t?"<svg>":3===t?"<math>":"",s=P;for(let t=0;t<i;t++){const i=e[t];let a,l,c=-1,d=0;for(;d<i.length&&(s.lastIndex=d,l=s.exec(i),null!==l);)d=s.lastIndex,s===P?"!--"===l[1]?s=M:void 0!==l[1]?s=D:void 0!==l[2]?(B.test(l[2])&&(o=RegExp("</"+l[2],"g")),s=H):void 0!==l[3]&&(s=H):s===H?">"===l[0]?(s=o??P,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,a=l[1],s=void 0===l[3]?H:'"'===l[3]?U:j):s===U||s===j?s=H:s===M||s===D?s=P:(s=H,o=void 0);const h=s===H&&e[t+1].startsWith("/>")?" ":"";n+=s===P?i+E:c>=0?(r.push(a),i.slice(0,c)+T+i.slice(c)+C+h):i+C+(-2===c?t:h)}return[Y(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]})(t,i);if(this.el=e.createElement(c,r),G.currentNode=this.el.content,2===i||3===i){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=G.nextNode())&&l.length<a;){if(1===o.nodeType){if(o.hasAttributes())for(const e of o.getAttributeNames())if(e.endsWith(T)){const t=d[s++],i=o.getAttribute(e).split(C),r=/([.?@])?(.*)/.exec(t);l.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?ee:"?"===r[1]?te:"@"===r[1]?ie:J}),o.removeAttribute(e)}else e.startsWith(C)&&(l.push({type:6,index:n}),o.removeAttribute(e));if(B.test(o.tagName)){const e=o.textContent.split(C),t=e.length-1;if(t>0){o.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],L()),G.nextNode(),l.push({type:2,index:++n});o.append(e[t],L())}}}else if(8===o.nodeType)if(o.data===z)l.push({type:2,index:n});else{let e=-1;for(;-1!==(e=o.data.indexOf(C,e+1));)l.push({type:7,index:n}),e+=C.length-1}n++}}static createElement(e,t){const i=R.createElement("template");return i.innerHTML=e,i}};function Q(e,t,i=e,r){if(t===F)return t;let o=void 0!==r?i._$Co?.[r]:i._$Cl;const n=N(t)?void 0:t._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(e),o._$AT(e,i,r)),void 0!==r?(i._$Co??=[])[r]=o:i._$Cl=o),void 0!==o&&(t=Q(e,o._$AS(e,t.values),o,r)),t}class V{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??R).importNode(t,!0);G.currentNode=r;let o=G.nextNode(),n=0,s=0,a=i[0];for(;void 0!==a;){if(n===a.index){let t;2===a.type?t=new K(o,o.nextSibling,this,e):1===a.type?t=new a.ctor(o,a.name,a.strings,this,e):6===a.type&&(t=new re(o,this,e)),this._$AV.push(t),a=i[++s]}n!==a?.index&&(o=G.nextNode(),n++)}return G.currentNode=R,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}let K=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),N(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==F&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>O(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(R.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=X.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new V(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=Z.get(e.strings);return void 0===t&&Z.set(e.strings,t=new X(e)),t}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let r,o=0;for(const n of t)o===i.length?i.push(r=new e(this.O(L()),this.O(L()),this,this.options)):r=i[o],r._$AI(n),o++;o<i.length&&(this._$AR(r&&r._$AB.nextSibling,o),i.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}};class J{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,o){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,r){const o=this.strings;let n=!1;if(void 0===o)e=Q(this,e,t,0),n=!N(e)||e!==this._$AH&&e!==F,n&&(this._$AH=e);else{const r=e;let s,a;for(e=o[0],s=0;s<o.length-1;s++)a=Q(this,r[i+s],t,s),a===F&&(a=this._$AH[s]),n||=!N(a)||a!==this._$AH[s],a===W?e=W:e!==W&&(e+=(a??"")+o[s+1]),this._$AH[s]=a}n&&!r&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}let ee=class extends J{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}},te=class extends J{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}},ie=class extends J{constructor(e,t,i,r,o){super(e,t,i,r,o),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??W)===F)return;const i=this._$AH,r=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==W&&(i===W||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}};class re{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const oe=k.litHtmlPolyfillSupport;oe?.(X,K),(k.litHtmlVersions??=[]).push("3.3.3");const ne=globalThis;let se=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let o=r._$litPart$;if(void 0===o){const e=i?.renderBefore??null;r._$litPart$=o=new K(t.insertBefore(L(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}};se._$litElement$=!0,se.finalized=!0,ne.litElementHydrateSupport?.({LitElement:se});const ae=ne.litElementPolyfillSupport;ae?.({LitElement:se}),(ne.litElementVersions??=[]).push("4.2.2");const le={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:y},ce=(e=le,t,i)=>{const{kind:r,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),"accessor"===r){const{name:r}=i;return{set(i){const o=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,o,e,!0,i)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=i;return function(i){const o=this[r];t.call(this,i),this.requestUpdate(r,o,e,!0,i)}}throw Error("Unsupported decorator location: "+r)};function de(e){return(t,i)=>"object"==typeof i?ce(e,t,i):((e,t,i)=>{const r=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function he(e){return de({...e,state:!0,attribute:!1})}const pe=e=>(t,i)=>{const r=()=>{customElements.get(e)?console.info(`home-desk: <${e}> already defined — reload the page to pick up the updated panel.`):customElements.define(e,t)};void 0!==i?i.addInitializer(r):r()},ue=s`
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
`,ge=s`
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
      }
      /* Light grey, kept lighter than the divider line so the edge between the list and the ticket stays visible. */
      :host([light]) {
        --st-selected: color-mix(in srgb, var(--st-fg) 5%, var(--st-surface));
        --st-selected-soft: color-mix(in srgb, var(--st-fg) 2%, var(--st-surface));
      }
      header {
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
        color: #03a9f4;
      }
      :host([light]) .bar h1 .mark {
        color: #039be5;
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
`;class fe{constructor(e){this.hass=e}send(e,t={}){return this.hass.connection.sendMessagePromise({type:`home_desk/${e}`,...t})}async list(e){return(await this.send("list",{status:"all",...e?{q:e}:{}})).tickets}async categories(){try{return(await this.send("categories")).categories}catch{return[]}}createCategory(e){return this.send("category_create",e)}updateCategory(e,t){return this.send("category_update",{category_id:e,...t})}deleteCategory(e){return this.send("category_delete",{category_id:e})}async settings(){try{return await this.send("settings")}catch{return{auto_close:"7d",agent:"",repairs:!0,notify:{targets:[],new_ticket:!0,comment:!0,resolved:!1}}}}saveSettings(e){return this.send("settings_save",e)}async labels(){return(await this.send("labels")).labels}createLabel(e){return this.send("label_create",e)}updateLabel(e,t){return this.send("label_update",{label_id:e,...t})}deleteLabel(e){return this.send("label_delete",{label_id:e})}get(e){return this.send("get",{ticket_id:e})}create(e){return this.send("create",{...e})}update(e,t){return this.send("update",{ticket_id:e,...t})}comment(e,t,i){return this.send("comment",{ticket_id:e,body:t,internal:i})}close(e,t,i){return this.send("close",{ticket_id:e,resolution:t,status:i})}subscribe(e){return this.hass.connection.subscribeEvents(e,"home_desk_event")}}const me=["low","normal","high","urgent"],be=["primary","accent","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","light-grey","grey","dark-grey","blue-grey","black","white"],ve=["new","open","in_progress"],xe="blocked",ye={new:"New",open:"In Progress",in_progress:"In Progress",resolved:"Resolved",closed:"Closed"},_e={new:"mdi:circle-outline",open:"mdi:circle-slice-4",in_progress:"mdi:circle-slice-4",resolved:"mdi:check-circle-outline",closed:"mdi:close-circle-outline"},we={new:"var(--success-color, #43a047)",open:"var(--primary-color)",in_progress:"var(--primary-color)",resolved:"var(--purple-color, #926bc7)",closed:"var(--secondary-text-color)"},ke={low:"Low",normal:"Normal",high:"High",urgent:"Urgent"},$e=[["year",31536e3],["month",2592e3],["day",86400],["hour",3600],["minute",60]];function Ae(e,t){const i=(new Date(e).getTime()-Date.now())/1e3,r=new Intl.RelativeTimeFormat(t,{numeric:"auto"});for(const[e,t]of $e)if(Math.abs(i)>=t)return r.format(Math.round(i/t),e);return r.format(0,"second")}function Se(e){const t=e.toLowerCase();return t.startsWith("ai:")||t.includes("claude")}function Te(e){if(Se(e))return"mdi:star-four-points-outline";const t=e.toLowerCase();return"ha"===t||"home assistant"===t?"mdi:home-assistant":"mdi:account-outline"}function Ce(e){const t=e.replace(/^ai:/i,"");return t===t.toLowerCase()?t.charAt(0).toUpperCase()+t.slice(1):t}const ze={primary:"#03a9f4",accent:"#ff9800",red:"#f44336",pink:"#e91e63",purple:"#926bc7","deep-purple":"#6e41ab",indigo:"#3f51b5",blue:"#2196f3","light-blue":"#03a9f4",cyan:"#00bcd4",teal:"#009688",green:"#4caf50","light-green":"#8bc34a",lime:"#cddc39",yellow:"#ffeb3b",amber:"#ffc107",orange:"#ff9800","deep-orange":"#ff6f22",brown:"#795548","light-grey":"#bdbdbd",grey:"#9e9e9e","dark-grey":"#606060","blue-grey":"#607d8b",black:"#000000",white:"#ffffff"};function Ee(e){return"primary"===e?"var(--primary-color, #03a9f4)":"accent"===e?"var(--accent-color, #ff9800)":`var(--${e}-color, ${ze[e]??"#9e9e9e"})`}function Re(e){const t=e.trim();let i=/^#([0-9a-f]{3})$/i.exec(t);return i?[...i[1]].map(e=>parseInt(e+e,16)):(i=/^#([0-9a-f]{6})/i.exec(t),i?[0,2,4].map(e=>parseInt(i[1].slice(e,e+2),16)):(i=/^rgba?\(\s*(\d+)[ ,]+(\d+)[ ,]+(\d+)/i.exec(t),i?[Number(i[1]),Number(i[2]),Number(i[3])]:null))}function Le(e){const t=e.replace(/-/g," ");return t.charAt(0).toUpperCase()+t.slice(1)}function Ne(e,t){return e.get(t)??{id:t,name:t,color:"grey",description:"",icon:"",builtin:!1,count:0}}function Oe(e){return Se(e)?`AI Agent (${Ce(e)})`:Ce(e)}const Ie=e=>e.labels.includes("history"),Pe=e=>ve.includes(e.status)&&!Ie(e),Me=e=>e.labels.includes("enhancement"),De=[{id:"active",icon:"mdi:inbox-outline",label:"Inbox",count:!0,match:e=>"new"===e.status&&!Ie(e)&&!Me(e)},{id:"progress",icon:"mdi:progress-wrench",label:"In Progress",count:!0,match:e=>("in_progress"===e.status||"open"===e.status)&&!Ie(e)},{id:"enhancements",icon:"mdi:lightbulb-outline",label:"Enhancements",count:!0,match:e=>Pe(e)&&Me(e)},{id:"all",icon:"mdi:format-list-bulleted",label:"All",match:()=>!0}],He=[{id:"",label:"Everything",match:e=>!Ie(e)},{id:"active",label:"Open",match:Pe},{id:"closed",label:"Closed",match:e=>("resolved"===e.status||"closed"===e.status)&&!Ie(e)},{id:"history",label:"History",match:Ie}],je=He.map(({id:e,label:t})=>({id:e,label:t}));let Ue=class extends se{constructor(){super(...arguments),this.categoryMap=new Map,this.labelMap=new Map,this.isAdmin=!1,this.maxBadges=4,this.coloured=!1,this.expanded=!1,this.show="all"}_pickCategory(e,t){e.stopPropagation(),e.preventDefault(),this.dispatchEvent(new CustomEvent("pick-category",{detail:{ticket:t,rect:e.currentTarget.getBoundingClientRect()},bubbles:!0,composed:!0}))}_category(e){const t=e.category?this.categoryMap.get(e.category):void 0,i=t=>this._pickCategory(t,e),r=t=>("Enter"===t.key||" "===t.key)&&this._pickCategory(t,e);if(!t&&!this.isAdmin)return W;const o=t?q`<ha-icon .icon=${t.icon||"mdi:tag-outline"}></ha-icon>${t.name}`:q`<ha-icon icon="mdi:plus"></ha-icon>Add Category`;return this.isAdmin?q`<span class="category clickable ${t?"":"none"}" role="button" tabindex="0" aria-haspopup="listbox"
          aria-label=${t?`Category: ${t.name}. Change`:"Add Category"} @click=${i} @keydown=${r}>${o}</span>`:q`<span class="category">${o}</span>`}_askRemove(e,t,i){e.stopPropagation(),e.preventDefault(),this.dispatchEvent(new CustomEvent("remove-label",{detail:{ticket:t,label:i},bubbles:!0,composed:!0}))}_badges(e){const t=e.labels.filter(e=>"home-assistant"!==e).map(e=>Ne(this.labelMap,e));return q`${t.slice(0,this.maxBadges).map(t=>q`<span class="badge" role=${this.isAdmin?"group":"img"} aria-label=${t.name}
        style="--label-color: ${Ee(t.color)}; --label-fg: ${function(e){let t=null;try{const i="primary"===e?"--primary-color":"accent"===e?"--accent-color":`--${e}-color`;t=Re(getComputedStyle(document.documentElement).getPropertyValue(i))}catch{}t??(t=Re(ze[e]??"#9e9e9e")??[158,158,158]);const i=(([e,t,i])=>{const[r,o,n]=[e,t,i].map(e=>{const t=e/255;return t<=.03928?t/12.92:((t+.055)/1.055)**2.4});return.2126*r+.7152*o+.0722*n})(t);return(i+.05)/.05>=1.05/(i+.05)?"#000000":"#ffffff"}(t.color)}"><ha-icon .icon=${t.icon||"mdi:label-outline"}></ha-icon><span class="name">${t.name}</span>${this.isAdmin?q`<span class="x" role="button" tabindex="0" aria-label="Remove ${t.name} from this ticket"
              @click=${i=>this._askRemove(i,e,t)}
              @keydown=${i=>("Enter"===i.key||" "===i.key)&&this._askRemove(i,e,t)}><ha-icon icon="mdi:close"></ha-icon></span>`:W}</span>`)}${t.length>this.maxBadges?q`<span class="more-labels">+${t.length-this.maxBadges}</span>`:W}`}render(){const e=this.ticket;return q`${"labels"!==this.show?this._category(e):W}${"category"!==this.show?q`${this._badges(e)}<slot></slot>`:W}`}};Ue.styles=[ue,s`
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
    `],e([de({attribute:!1})],Ue.prototype,"ticket",void 0),e([de({attribute:!1})],Ue.prototype,"categoryMap",void 0),e([de({attribute:!1})],Ue.prototype,"labelMap",void 0),e([de({type:Boolean})],Ue.prototype,"isAdmin",void 0),e([de({type:Number})],Ue.prototype,"maxBadges",void 0),e([de({type:Boolean,reflect:!0})],Ue.prototype,"coloured",void 0),e([de({type:Boolean,reflect:!0})],Ue.prototype,"expanded",void 0),e([de()],Ue.prototype,"show",void 0),Ue=e([pe("st-ticket-tags")],Ue);let Be=class extends se{constructor(){super(...arguments),this.tickets=[],this.selectedId=null,this.language=void 0,this.isAdmin=!1,this.categoryMap=new Map,this.labelMap=new Map}_select(e){this.dispatchEvent(new CustomEvent("select-ticket",{detail:e,bubbles:!0,composed:!0}))}_filterPerson(e,t){e.stopPropagation(),e.preventDefault(),this.dispatchEvent(new CustomEvent("filter-person",{detail:t,bubbles:!0,composed:!0}))}render(){return this.tickets.length?q`${this.tickets.map(e=>{const t="resolved"===e.status||"closed"===e.status;return q`
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
                role="img" aria-label="${ke[e.priority]} priority"></ha-icon>`:q`<span></span>`}
        </button>
      `})}`:q`<div class="empty">No tickets here.</div>`}};Be.styles=[ue,s`
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
    `],e([de({attribute:!1})],Be.prototype,"tickets",void 0),e([de({type:Number})],Be.prototype,"selectedId",void 0),e([de()],Be.prototype,"language",void 0),e([de({type:Boolean})],Be.prototype,"isAdmin",void 0),e([de({attribute:!1})],Be.prototype,"categoryMap",void 0),e([de({attribute:!1})],Be.prototype,"labelMap",void 0),Be=e([pe("st-ticket-list")],Be);const qe=2;class Fe{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}class We extends Fe{constructor(e){if(super(e),this.it=W,e.type!==qe)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===W||null==e)return this._t=void 0,this.it=e;if(e===F)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}We.directiveName="unsafeHTML",We.resultType=1;const Ze=(e=>(...t)=>({_$litDirective$:e,values:t}))(We);let Ge=class extends se{constructor(){super(...arguments),this.options=[],this.value="",this.label="",this.placeholder="",this.plain=!1,this.up=!1,this._open=!1}_pick(e){this._open=!1,e!==this.value&&this.dispatchEvent(new CustomEvent("change",{detail:e,bubbles:!0,composed:!0}))}render(){const e=this.options.find(e=>e.id===this.value)??this.options[0];return q`
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
function Ye(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,r=Array(t);i<t;i++)r[i]=e[i];return r}
/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
function Xe(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var i=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=i){var r,o,n,s,a=[],l=!0,c=!1;try{if(n=(i=i.call(e)).next,0===t);else for(;!(l=(r=n.call(i)).done)&&(a.push(r.value),a.length!==t);l=!0);}catch(e){c=!0,o=e}finally{try{if(!l&&null!=i.return&&(s=i.return(),Object(s)!==s))return}finally{if(c)throw o}}return a}}(e,t)||function(e,t){if(e){if("string"==typeof e)return Ye(e,t);var i={}.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?Ye(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}Ge.styles=[ue,s`
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
    `],e([de({attribute:!1})],Ge.prototype,"options",void 0),e([de()],Ge.prototype,"value",void 0),e([de()],Ge.prototype,"label",void 0),e([de()],Ge.prototype,"placeholder",void 0),e([de({type:Boolean})],Ge.prototype,"plain",void 0),e([de({type:Boolean,reflect:!0})],Ge.prototype,"up",void 0),e([he()],Ge.prototype,"_open",void 0),Ge=e([pe("st-dropdown")],Ge);const Qe=Object.entries,Ve=Object.setPrototypeOf,Ke=Object.isFrozen,Je=Object.getPrototypeOf,et=Object.getOwnPropertyDescriptor;let tt=Object.freeze,it=Object.seal,rt=Object.create,ot="undefined"!=typeof Reflect&&Reflect,nt=ot.apply,st=ot.construct;tt||(tt=function(e){return e}),it||(it=function(e){return e}),nt||(nt=function(e,t){for(var i=arguments.length,r=new Array(i>2?i-2:0),o=2;o<i;o++)r[o-2]=arguments[o];return e.apply(t,r)}),st||(st=function(e){for(var t=arguments.length,i=new Array(t>1?t-1:0),r=1;r<t;r++)i[r-1]=arguments[r];return new e(...i)});const at=Rt(Array.prototype.forEach),lt=Rt(Array.prototype.lastIndexOf),ct=Rt(Array.prototype.pop),dt=Rt(Array.prototype.push),ht=Rt(Array.prototype.slice),pt=Rt(Array.prototype.splice),ut=Array.isArray,gt=Lt(Set),ft=Rt(Set.prototype.add),mt=Rt(Set.prototype.has),bt=Rt(String.prototype.toLowerCase),vt=Rt(String.prototype.toString),xt=Rt(String.prototype.match),yt=Rt(String.prototype.replace),_t=Rt(String.prototype.indexOf),wt=Rt(String.prototype.trim),kt=Rt(Number.prototype.toString),$t=Rt(Boolean.prototype.toString),At="undefined"==typeof BigInt?null:Rt(BigInt.prototype.toString),St="undefined"==typeof Symbol?null:Rt(Symbol.prototype.toString),Tt=Rt(Object.prototype.hasOwnProperty),Ct=Rt(Object.prototype.toString),zt=Rt(RegExp.prototype.test),Et=Lt(TypeError);function Rt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var i=arguments.length,r=new Array(i>1?i-1:0),o=1;o<i;o++)r[o-1]=arguments[o];return nt(e,t,r)}}function Lt(e){return function(){for(var t=arguments.length,i=new Array(t),r=0;r<t;r++)i[r]=arguments[r];return st(e,i)}}function Nt(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:bt;if(Ve&&Ve(e,null),!ut(t))return e;let r=t.length;for(;r--;){let o=t[r];if("string"==typeof o){const e=i(o);e!==o&&(Ke(t)||(t[r]=e),o=e)}e[o]=!0}return e}function Ot(e){for(let t=0;t<e.length;t++)Tt(e,t)||(e[t]=null);return e}function It(e){const t=rt(null);for(const r of Qe(e)){var i=Xe(r,2);const o=i[0],n=i[1];Tt(e,o)&&(ut(n)?t[o]=Ot(n):n&&"object"==typeof n&&n.constructor===Object?t[o]=It(n):t[o]=n)}return t}function Pt(e,t){for(;null!==e;){const i=et(e,t);if(i){if(i.get)return Rt(i.get);if("function"==typeof i.value)return Rt(i.value)}e=Je(e)}return function(){return null}}const Mt=tt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Dt=tt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ht=tt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),jt=tt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ut=tt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Bt=tt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),qt=tt(["#text"]),Ft=tt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Wt=tt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Zt=tt(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Gt=tt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Yt=it(/{{[\w\W]*|^[\w\W]*}}/g),Xt=it(/<%[\w\W]*|^[\w\W]*%>/g),Qt=it(/\${[\w\W]*/g),Vt=it(/^data-[\-\w.\u00B7-\uFFFF]+$/),Kt=it(/^aria-[\-\w]+$/),Jt=it(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ei=it(/^(?:\w+script|data):/i),ti=it(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ii=it(/^html$/i),ri=it(/^[a-z][.\w]*(-[.\w]+)+$/i),oi=it(/<[/\w!]/g),ni=it(/<[/\w]/g),si=it(/<\/no(script|embed|frames)/i),ai=it(/\/>/i),li=1,ci=3,di=7,hi=8,pi=9,ui=11,gi=tt(Nt({},["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"])),fi=function(){return"undefined"==typeof window?null:window},mi=function(e,t,i,r){return Tt(e,t)&&ut(e[t])?Nt(r.base?It(r.base):{},e[t],r.transform):i},bi=function(e,t,i){const r=Tt(e,t)?e[t]:void 0;return r&&"object"==typeof r?It(r):i()};var vi=function e(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:fi();const i=t=>e(t);if(i.version="3.4.17",i.removed=[],!t||!t.document||t.document.nodeType!==pi||!t.Element)return i.isSupported=!1,i;let r=t.document;const o=r,n=o.currentScript;t.DocumentFragment;const s=t.HTMLTemplateElement,a=t.Node,l=t.Element,c=t.NodeFilter;void 0===t.NamedNodeMap&&(t.NamedNodeMap||t.MozNamedAttrMap),t.HTMLFormElement;const d=t.DOMParser,h=t.trustedTypes,p=l.prototype,u=Pt(p,"cloneNode"),g=Pt(p,"remove"),f=Pt(p,"removeAttributeNode"),m=Pt(p,"nextSibling"),b=Pt(p,"childNodes"),v=Pt(p,"parentNode"),x=Pt(p,"shadowRoot"),y=Pt(p,"attributes"),_=a&&a.prototype?Pt(a.prototype,"nodeType"):null,w=a&&a.prototype?Pt(a.prototype,"nodeName"):null,k=a&&a.prototype?Pt(a.prototype,"ownerDocument"):null,$=function(e){return _?_(e):e.nodeType},A=function(e){return w?w(e):e.nodeName},S=function(e,t){for(;null!==e;){const i=et(e,t);if(i)return i.get?Rt(i.get):null;e=Je(e)}return null}(p,"namespaceURI"),T=function(e){return S?S(e):e.namespaceURI};if("function"==typeof s){const e=r.createElement("template");e.content&&e.content.ownerDocument&&(r=e.content.ownerDocument)}let C,z,E="",R=!1,L=0;const N=function(){if(L>0)throw Et('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},O=function(e){N(),L++;try{return C.createHTML(e)}finally{L--}},I=function(){return R||(z=function(e,t){if("object"!=typeof e||"function"!=typeof e.createPolicy)return null;let i=null;const r="data-tt-policy-suffix";t&&t.hasAttribute(r)&&(i=t.getAttribute(r));const o="dompurify"+(i?"#"+i:"");try{return e.createPolicy(o,{createHTML:e=>e,createScriptURL:e=>e})}catch(e){return console.warn("TrustedTypes policy "+o+" could not be created."),null}}(h,n),R=!0),z},P=r,M=P.implementation,D=P.createNodeIterator,H=P.createDocumentFragment,j=P.getElementsByTagName,U=o.importNode;let B={afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]};i.isSupported="function"==typeof Qe&&"function"==typeof v&&M&&void 0!==M.createHTMLDocument;const q=Yt,F=Xt,W=Qt,Z=Vt,G=Kt,Y=ei,X=ti,Q=ri;let V=Jt,K=null;const J=Nt({},[...Mt,...Dt,...Ht,...Ut,...qt]);let ee=null;const te=Nt({},[...Ft,...Wt,...Zt,...Gt]);let ie=Object.seal(rt(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),re=null,oe=null;const ne=Object.seal(rt(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let se=!0,ae=!0,le=!1,ce=!0,de=!1,he=!0,pe=!1,ue=!1,ge=null,fe=null,me=!1,be=!1,ve=!1,xe=!1,ye=!0,_e=!1;const we="user-content-";let ke=!0,$e=!1,Ae=null,Se={},Te=null;const Ce=Nt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let ze=null;const Ee=Nt({},["audio","video","img","source","image","track"]);let Re=null;const Le=Nt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ne="http://www.w3.org/1998/Math/MathML",Oe="http://www.w3.org/2000/svg",Ie="http://www.w3.org/1999/xhtml";let Pe=Ie,Me=!1,De=null;const He=Nt({},[Ne,Oe,Ie],vt),je=tt(["mi","mo","mn","ms","mtext"]);let Ue=Nt({},je);const Be=tt(["annotation-xml"]);let qe=Nt({},Be);const Fe=Nt({},["title","style","font","a","script"]);let We=null;const Ze=["application/xhtml+xml","text/html"];let Ge=null,Ye=null;const Xe=r.createElement("form"),Ve=function(e){return e instanceof RegExp||e instanceof Function},Ke=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(Ye&&Ye===e)return;e&&"object"==typeof e||(e={}),e=It(e),We=-1===Ze.indexOf(e.PARSER_MEDIA_TYPE)?"text/html":e.PARSER_MEDIA_TYPE,Ge="application/xhtml+xml"===We?vt:bt,K=mi(e,"ALLOWED_TAGS",J,{transform:Ge}),ee=mi(e,"ALLOWED_ATTR",te,{transform:Ge}),De=mi(e,"ALLOWED_NAMESPACES",He,{transform:vt}),Re=mi(e,"ADD_URI_SAFE_ATTR",Le,{transform:Ge,base:Le}),ze=mi(e,"ADD_DATA_URI_TAGS",Ee,{transform:Ge,base:Ee}),Te=mi(e,"FORBID_CONTENTS",Ce,{transform:Ge}),re=mi(e,"FORBID_TAGS",It({}),{transform:Ge}),oe=mi(e,"FORBID_ATTR",It({}),{transform:Ge}),Se=!!Tt(e,"USE_PROFILES")&&(e.USE_PROFILES&&"object"==typeof e.USE_PROFILES?It(e.USE_PROFILES):e.USE_PROFILES),se=!1!==e.ALLOW_ARIA_ATTR,ae=!1!==e.ALLOW_DATA_ATTR,le=e.ALLOW_UNKNOWN_PROTOCOLS||!1,ce=!1!==e.ALLOW_SELF_CLOSE_IN_ATTR,de=e.SAFE_FOR_TEMPLATES||!1,he=!1!==e.SAFE_FOR_XML,pe=e.WHOLE_DOCUMENT||!1,be=e.RETURN_DOM||!1,ve=e.RETURN_DOM_FRAGMENT||!1,xe=e.RETURN_TRUSTED_TYPE||!1,me=e.FORCE_BODY||!1,ye=!1!==e.SANITIZE_DOM,_e=e.SANITIZE_NAMED_PROPS||!1,ke=!1!==e.KEEP_CONTENT,$e=e.IN_PLACE||!1,V=function(e){try{return zt(e,""),!0}catch(e){return!1}}(e.ALLOWED_URI_REGEXP)?e.ALLOWED_URI_REGEXP:Jt,Pe="string"==typeof e.NAMESPACE?e.NAMESPACE:Ie,Ue=bi(e,"MATHML_TEXT_INTEGRATION_POINTS",()=>Nt({},je)),qe=bi(e,"HTML_INTEGRATION_POINTS",()=>Nt({},Be));const t=bi(e,"CUSTOM_ELEMENT_HANDLING",()=>rt(null));if(ie=rt(null),Tt(t,"tagNameCheck")&&Ve(t.tagNameCheck)&&(ie.tagNameCheck=t.tagNameCheck),Tt(t,"attributeNameCheck")&&Ve(t.attributeNameCheck)&&(ie.attributeNameCheck=t.attributeNameCheck),Tt(t,"allowCustomizedBuiltInElements")&&"boolean"==typeof t.allowCustomizedBuiltInElements&&(ie.allowCustomizedBuiltInElements=t.allowCustomizedBuiltInElements),it(ie),de&&(ae=!1),ve&&(be=!0),Se&&(K=Nt({},qt),ee=rt(null),!0===Se.html&&(Nt(K,Mt),Nt(ee,Ft)),!0===Se.svg&&(Nt(K,Dt),Nt(ee,Wt),Nt(ee,Gt)),!0===Se.svgFilters&&(Nt(K,Ht),Nt(ee,Wt),Nt(ee,Gt)),!0===Se.mathMl&&(Nt(K,Ut),Nt(ee,Zt),Nt(ee,Gt))),ne.tagCheck=null,ne.attributeCheck=null,Tt(e,"ADD_TAGS")&&("function"==typeof e.ADD_TAGS?ne.tagCheck=e.ADD_TAGS:ut(e.ADD_TAGS)&&(K===J&&(K=It(K)),Nt(K,e.ADD_TAGS,Ge))),Tt(e,"ADD_ATTR")&&("function"==typeof e.ADD_ATTR?ne.attributeCheck=e.ADD_ATTR:ut(e.ADD_ATTR)&&(ee===te&&(ee=It(ee)),Nt(ee,e.ADD_ATTR,Ge))),Tt(e,"ADD_FORBID_CONTENTS")&&ut(e.ADD_FORBID_CONTENTS)&&(Te===Ce&&(Te=It(Te)),Nt(Te,e.ADD_FORBID_CONTENTS,Ge)),ke&&(K["#text"]=!0),pe&&Nt(K,["html","head","body"]),K.table&&(Nt(K,["tbody"]),delete re.tbody),e.TRUSTED_TYPES_POLICY){if("function"!=typeof e.TRUSTED_TYPES_POLICY.createHTML)throw Et('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if("function"!=typeof e.TRUSTED_TYPES_POLICY.createScriptURL)throw Et('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const t=C;C=e.TRUSTED_TYPES_POLICY;try{E=O("")}catch(e){throw C=t,e}}else null===e.TRUSTED_TYPES_POLICY?(C=void 0,E=""):(void 0===C&&(C=I()),C&&"string"==typeof E&&(E=O("")));tt&&tt(e),Ye=e},ot=Nt({},[...Dt,...Ht,...jt]),nt=Nt({},[...Ut,...Bt]),st=function(e){const t=T(e),i=bt(A(e)),r=v(e);let o,n;return r&&$(r)===li?(o={namespaceURI:T(r)},n=bt(A(r))):(o={namespaceURI:Pe},n="template"),!!De[t]&&(t===Oe?function(e,t,i){return t.namespaceURI===Ie?"svg"===e:t.namespaceURI===Ne?"svg"===e&&("annotation-xml"===i||Ue[i]):Boolean(ot[e])}(i,o,n):t===Ne?function(e,t,i){return t.namespaceURI===Ie?"math"===e:t.namespaceURI===Oe?"math"===e&&qe[i]:Boolean(nt[e])}(i,o,n):t===Ie?function(e,t,i){return!(t.namespaceURI===Oe&&!qe[i])&&!(t.namespaceURI===Ne&&!Ue[i])&&!nt[e]&&(Fe[e]||!ot[e])}(i,o,n):!("application/xhtml+xml"!==We||!De[t]))},Lt=function(e){dt(i.removed,{element:e});try{v(e).removeChild(e)}catch(t){if(g(e),!v(e))throw Et("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},Ot=function(e,t,i){try{f(e,t)}catch(t){try{e.removeAttribute(i)}catch(e){}}},vi=function(e){wi(e);const t=b(e);t&&at(ht(t),e=>{try{g(e)}catch(e){}});const i=$(e)===li?y(e):null;if(i)for(let t=i.length-1;t>=0;--t){const r=i[t],o=r&&r.name;"string"==typeof o&&Ot(e,r,o)}},xi=function(e,t,r){if(!r)try{r=t.getAttributeNode(e)}catch(e){r=null}dt(i.removed,{attribute:r||null,from:t});try{r?f(t,r):t.removeAttribute(e)}catch(i){try{t.removeAttribute(e)}catch(e){}}if("is"===e)if(be||ve)try{Lt(t)}catch(e){}else try{t.setAttribute(e,"")}catch(e){}},yi=function(e){const t=y(e);if(t)for(let i=t.length-1;i>=0;--i){const r=t[i],o=r&&r.name;"string"!=typeof o||ee[Ge(o)]||Ot(e,r,o)}},_i=function(e,t){let i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];const r=[e];for(;r.length>0;){const e=r.pop();if(!1===t(e))continue;if(i&&$(e)===li){const t=x(e);Ni(t)&&r.push(t)}const o=b(e);if(o)for(let e=o.length-1;e>=0;--e)r.push(o[e])}},wi=function(e){_i(e,e=>{$(e)===li&&yi(e)})},ki=function(e){const t=[];return _i(e,e=>{t.push(e)},!0),t},$i=function(e,t){let r=!1;return at(i.removed,t=>{t.element&&(r=r||t.element===e,wi(t.element))}),function(e,t){const i=gt();at(ki(e),e=>{$(e)===li&&ft(i,e)}),at(t,e=>{$(e)!==li||mt(i,e)||yi(e)})}(e,t),r},Ai=function(e,t,i,r){const o=Ci(e);let n;for(;n=o.nextNode();)mt(r,n)&&!mt(Ae,n)&&(t&&Ii(B.uponSanitizeShadowNode,n,null),Hi(n,i),Zi(n,i),Ni(n.content)&&Gi(n.content))},Si=function(e,t){return!!he&&("patchsrc"===e||"for"===e&&"label"!==t&&"output"!==t)},Ti=function(e){let t=null,i=null;if(me)e="<remove></remove>"+e;else{const t=xt(e,/^[\r\n\t ]+/);i=t&&t[0]}"application/xhtml+xml"===We&&Pe===Ie&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const o=C?O(e):e;if(Pe===Ie)try{t=(new d).parseFromString(o,We)}catch(e){}if(!t||!t.documentElement){t=M.createDocument(Pe,"template",null);try{t.documentElement.innerHTML=Me?E:o}catch(e){}}const n=t.body||t.documentElement;return e&&i&&n.insertBefore(r.createTextNode(i),n.childNodes[0]||null),Pe===Ie?j.call(t,pe?"html":"body")[0]:pe?t.documentElement:n},Ci=function(e){const t=k?k(e):e.ownerDocument;return D.call(t||e,e,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},zi=function(e){return e=yt(e,q," "),e=yt(e,F," "),e=yt(e,W," ")},Ei=function(e){var t;Ri(e);const i=null===(t=e.querySelectorAll)||void 0===t?void 0:t.call(e,"template");i&&at(i,e=>{Ni(e.content)&&Ei(e.content)})},Ri=function(e){e.normalize();const t=k?k(e):e.ownerDocument,i=D.call(t||e,e,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null);let r=i.nextNode();for(;r;)r.data=zi(r.data),r=i.nextNode()},Li=function(e){const t=w?w(e):null;return"string"==typeof t&&("form"===Ge(t)&&("string"!=typeof e.nodeName||"string"!=typeof e.textContent||"function"!=typeof e.removeChild||e.attributes!==y(e)||"function"!=typeof e.removeAttribute||"function"!=typeof e.removeAttributeNode||"function"!=typeof e.getAttributeNode||"function"!=typeof e.setAttribute||"string"!=typeof e.namespaceURI||"function"!=typeof e.insertBefore||"function"!=typeof e.hasChildNodes||e.nodeType!==_(e)||e.childNodes!==b(e)))},Ni=function(e){if(!_||"object"!=typeof e||null===e)return!1;try{return _(e)===ui}catch(e){return!1}},Oi=function(e){if(!_||"object"!=typeof e||null===e)return!1;try{return"number"==typeof _(e)}catch(e){return!1}};function Ii(e,t,r){0!==e.length&&at(e,e=>{e.call(i,t,r,Ye)})}const Pi=function(e,t){if(e instanceof RegExp)return zt(e,t);if(e instanceof Function){for(var i=arguments.length,r=new Array(i>2?i-2:0),o=2;o<i;o++)r[o-2]=arguments[o];return Boolean(e(t,...r))}return!1},Mi=function(e,t,i,r){return 0===e.length?t:t===i||t===r?It(t):t},Di=function(e,t){return e!==t&&null===v(e)&&($e&&wi(e),!0)},Hi=function(e,t){var r;if(r=e,Ae&&ft(Ae,r),Ii(B.beforeSanitizeElements,e,null),Di(e,t))return!0;if(Li(e))return Lt(e),!0;const o=Ge(A(e));if(K=Mi(B.uponSanitizeElement,K,J,ge),Ii(B.uponSanitizeElement,e,{tagName:o,allowedTags:K}),Di(e,t))return!0;if(function(e,t){return!!(he&&e.hasChildNodes()&&!Oi(e.firstElementChild)&&zt(oi,e.textContent)&&zt(oi,e.innerHTML))||!!(he&&gi[t]&&$(e)===li&&T(e)===Ie&&(Oi(e.firstElementChild)||"string"==typeof e.textContent&&zt(oi,e.textContent)))||e.nodeType===di||!(!he||e.nodeType!==hi||!zt(ni,e.data))}(e,o))return Lt(e),!0;if(re[o]||!(ne.tagCheck instanceof Function&&ne.tagCheck(o))&&!K[o]){const i=function(e,t,i){if(!re[t]&&Bi(t)&&Pi(ie.tagNameCheck,t))return!1;if(ke&&!Te[t]&&!Te[bt(t)]){const t=v(e),r=b(e);if(r&&t)for(let o=r.length-1;o>=0;--o){const n=e===i?u(r[o],!0):r[o];t.insertBefore(n,m(e))}}return Lt(e),!0}(e,o,t);return!(!1!==i||(Ii(B.afterSanitizeElements,e,null),!Di(e,t)))||i}if($(e)===li&&!st(e))return Lt(e),!0;if(("noscript"===o||"noembed"===o||"noframes"===o)&&zt(si,e.innerHTML))return Lt(e),!0;if(de&&e.nodeType===ci){const t=zi(e.textContent);e.textContent!==t&&(dt(i.removed,{element:e.cloneNode()}),e.textContent=t)}return Ii(B.afterSanitizeElements,e,null),Di(e,t)},ji=function(e,t,i){if(oe[t])return!1;if(Si(t,e))return!1;if(ye&&("id"===t||"name"===t)&&(i in r||i in Xe))return!1;const o=ee[t]||ne.attributeCheck instanceof Function&&ne.attributeCheck(t,e);return!(!ae||!zt(Z,t))||(!(!se||!zt(G,t))||(o?!!Re[t]||(!!zt(V,yt(i,X,""))||(!("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==_t(i,"data:")||!ze[e])||(!(!le||zt(Y,yt(i,X,"")))||!i))):Bi(e)&&Pi(ie.tagNameCheck,e)&&Pi(ie.attributeNameCheck,t,e)||"is"===t&&ie.allowCustomizedBuiltInElements&&Pi(ie.tagNameCheck,i)))},Ui=Nt({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),Bi=function(e){return!Ui[bt(e)]&&zt(Q,e)},qi=function(e,t,i,r){if(C&&"object"==typeof h&&"function"==typeof h.getAttributeType&&!i)switch(h.getAttributeType(e,t)){case"TrustedHTML":return O(r);case"TrustedScriptURL":return function(e){N(),L++;try{return C.createScriptURL(e)}finally{L--}}(r)}return r},Fi=function(e,t,i,r){try{return i?e.setAttributeNS(i,t,r):e.setAttribute(t,r),!Li(e)||(Lt(e),!1)}catch(i){return xi(t,e),!1}},Wi=function(e,t){return!(!he||!zt(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,t))||"attributename"===bt(e)&&null!==xt(t,"href")},Zi=function(e,t){if(Ii(B.beforeSanitizeAttributes,e,null),Di(e,t))return;const r=e.attributes;if(!r||Li(e))return;ee=Mi(B.uponSanitizeAttribute,ee,te,fe);const o={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ee,forceKeepAttr:void 0};let n=r.length;const s=Ge(e.nodeName);for(;n--;){const t=r[n],a=t.name,l=t.namespaceURI,c=t.value,d=Ge(a),h=c;let p="value"===a?h:wt(h),u=!1;o.attrName=d,o.attrValue=p,o.keepAttr=!0,o.forceKeepAttr=void 0,Ii(B.uponSanitizeAttribute,e,o),p=o.attrValue,!_e||"id"!==d&&"name"!==d||0===_t(p,we)||(xi(a,e,t),p=we+p,u=!0),Wi(a,p)?xi(a,e,t):o.forceKeepAttr||(o.keepAttr&&(ce||!zt(ai,p))?(de&&(p=zi(p)),ji(s,d,p)?(p=qi(s,d,l,p),p!==h&&Fi(e,a,l,p)&&u&&ct(i.removed)):xi(a,e,t)):xi(a,e,t))}Ii(B.afterSanitizeAttributes,e,null),Di(e,t)},Gi=function(e){let t=null;const i=Ci(e);for(Ii(B.beforeSanitizeShadowDOM,e,null);t=i.nextNode();)if(Ii(B.uponSanitizeShadowNode,t,null),Hi(t,e),Zi(t,e),Ni(t.content)&&Gi(t.content),$(t)===li){const e=x(t);Ni(e)&&(Yi(e),Gi(e))}de&&Ri(e),Ii(B.afterSanitizeShadowDOM,e,null)},Yi=function(e){const t=[{node:e,shadow:null}];for(;t.length>0;){const e=t.pop();if(e.shadow){Gi(e.shadow);continue}const i=e.node,r=$(i)===li,o=b(i);if(o)for(let e=o.length-1;e>=0;--e)t.push({node:o[e],shadow:null});if(r){const e=w?w(i):null;if("string"==typeof e&&"template"===Ge(e)){const e=i.content;Ni(e)&&t.push({node:e,shadow:null})}}if(r){const e=x(i);Ni(e)&&t.push({node:null,shadow:e},{node:e,shadow:null})}}};return i.sanitize=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=null,n=null,s=null,a=null;if(Me=!e,Me&&(e="\x3c!--\x3e"),"string"!=typeof e&&!Oi(e)&&"string"!=typeof(e=function(e){switch(typeof e){case"string":return e;case"number":return kt(e);case"boolean":return $t(e);case"bigint":return At?At(e):"0";case"symbol":return St?St(e):"Symbol()";case"undefined":default:return Ct(e);case"function":case"object":{if(null===e)return Ct(e);const t=e,i=Pt(t,"toString");if("function"==typeof i){const e=i(t);return"string"==typeof e?e:Ct(e)}return Ct(e)}}}(e)))throw Et("dirty is not a string, aborting");if(!i.isSupported)return e;ue?(K=ge,ee=fe):Ke(t),(B.uponSanitizeElement.length>0||B.uponSanitizeAttribute.length>0)&&(K=It(K)),B.uponSanitizeAttribute.length>0&&(ee=It(ee)),i.removed=[];const l=$e&&"string"!=typeof e&&Oi(e);let c=[];const d=Ae;if(l){h=e,he&&_i(h,e=>{const t=$(e);if(t===di||t===hi&&zt(ni,e.data)){try{g(e)}catch(e){}return!1}if(t===li){const t=e,i=Ge(A(e));try{t.hasAttribute&&t.hasAttribute("patchsrc")&&t.removeAttribute("patchsrc"),t.hasAttribute&&t.hasAttribute("for")&&Si("for",i)&&t.removeAttribute("for")}catch(e){}}return!0});const t=A(e);if("string"==typeof t){const i=Ge(t);if(!K[i]||re[i])throw vi(e),Et("root node is forbidden and cannot be sanitized in-place")}if(Li(e))throw vi(e),Et("root node is clobbered and cannot be sanitized in-place");c=ki(e),Ae=gt()}else if(Oi(e))r=Ti("\x3c!----\x3e"),n=r.ownerDocument.importNode(e,!0),n.nodeType===li&&"BODY"===n.nodeName||"HTML"===n.nodeName?r=n:r.appendChild(n),Yi(r);else{if(!be&&!de&&!pe&&-1===e.indexOf("<"))return C&&xe?O(e):e;if(r=Ti(e),!r)return be?null:xe?E:""}var h;r&&me&&Lt(r.firstChild);const p=l?e:r;try{l&&Yi(e);const t=Ci(p);for(;s=t.nextNode();)Hi(s,p),Zi(s,p),Ni(s.content)&&Gi(s.content);l&&function(e,t){const i=Ae;let r=null;const o=()=>(r||(r=gt(),at(t,e=>{ft(r,e)})),r);for(let t=0;;t++){const r=ki(e),n=[e];let s=!1;if(at(r,e=>{$(e)===ui?dt(n,e):s||mt(i,e)||(s=mt(o(),e))}),!s)return;if(t>=8)throw Et("the tree kept changing during in-place sanitization; refusing to return it");at(n,(t,i)=>{Ai(t,i>0,e,o())})}}(e,c)}catch(t){throw l&&(vi(e),$i(e,c)),t}finally{Ae=d}if(l){if($i(e,c))throw Et("a node selected for removal could not be safely returned; refusing to sanitize in place");return de&&Ei(e),e}if(be){if(de&&Ei(r),ve)for(a=H.call(r.ownerDocument);r.firstChild;)a.appendChild(r.firstChild);else a=r;return(ee.shadowroot||ee.shadowrootmode)&&(a=U.call(o,a,!0)),a}let u=pe?r.outerHTML:r.innerHTML;return pe&&K["!doctype"]&&r.ownerDocument&&r.ownerDocument.doctype&&r.ownerDocument.doctype.name&&zt(ii,r.ownerDocument.doctype.name)&&(u="<!DOCTYPE "+r.ownerDocument.doctype.name+">\n"+u),de&&(u=zi(u)),C&&xe?O(u):u},i.setConfig=function(){Ke(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}),ue=!0,ge=K,fe=ee},i.clearConfig=function(){Ye=null,ue=!1,ge=null,fe=null,C=z,E=""},i.isValidAttribute=function(e,t,i){Ye||Ke({});const r=Ge(e),o=Ge(t);return("string"!=typeof i||!(Wi(t,i)||!ce&&zt(ai,i)))&&ji(r,o,i)},i.addHook=function(e,t){"function"==typeof t&&Tt(B,e)&&dt(B[e],t)},i.removeHook=function(e,t){if(Tt(B,e)){if(void 0!==t){const i=lt(B[e],t);return-1===i?void 0:pt(B[e],i,1)[0]}return ct(B[e])}},i.removeHooks=function(e){Tt(B,e)&&(B[e]=[])},i.removeAllHooks=function(){B={afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},i}();function xi(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var yi={async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null};function _i(e){yi=e}var wi={exec:()=>null};function ki(e,t=""){let i="string"==typeof e?e:e.source,r={replace:(e,t)=>{let o="string"==typeof t?t:t.source;return o=o.replace(Ai.caret,"$1"),i=i.replace(e,o),r},getRegex:()=>new RegExp(i,t)};return r}var $i=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Ai={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[\t ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Si=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ti=/(?:[*+-]|\d{1,9}[.)])/,Ci=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,zi=ki(Ci).replace(/bull/g,Ti).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ei=ki(Ci).replace(/bull/g,Ti).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ri=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Li=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ni=ki(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Li).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Oi=ki(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ti).getRegex(),Ii="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Pi=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Mi=ki("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$))","i").replace("comment",Pi).replace("tag",Ii).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Di=ki(Ri).replace("hr",Si).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ii).getRegex(),Hi={blockquote:ki(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Di).getRegex(),code:/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,def:Ni,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,hr:Si,html:Mi,lheading:zi,list:Oi,newline:/^(?:[ \t]*(?:\n|$))+/,paragraph:Di,table:wi,text:/^[^\n]+/},ji=ki("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Si).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}\t)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ii).getRegex(),Ui={...Hi,lheading:Ei,table:ji,paragraph:ki(Ri).replace("hr",Si).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ji).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ii).getRegex()},Bi={...Hi,html:ki("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",Pi).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:wi,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ki(Ri).replace("hr",Si).replace("heading"," *#{1,6} *[^\n]").replace("lheading",zi).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},qi=/^( {2,}|\\)\n(?!\s*$)/,Fi=/[\p{P}\p{S}]/u,Wi=/[\s\p{P}\p{S}]/u,Zi=/[^\s\p{P}\p{S}]/u,Gi=ki(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Wi).getRegex(),Yi=/(?!~)[\p{P}\p{S}]/u,Xi=ki(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",$i?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Qi=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Vi=ki(Qi,"u").replace(/punct/g,Fi).getRegex(),Ki=ki(Qi,"u").replace(/punct/g,Yi).getRegex(),Ji="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",er=ki(Ji,"gu").replace(/notPunctSpace/g,Zi).replace(/punctSpace/g,Wi).replace(/punct/g,Fi).getRegex(),tr=ki(Ji,"gu").replace(/notPunctSpace/g,/(?:[^\s\p{P}\p{S}]|~)/u).replace(/punctSpace/g,/(?!~)[\s\p{P}\p{S}]/u).replace(/punct/g,Yi).getRegex(),ir=ki("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Zi).replace(/punctSpace/g,Wi).replace(/punct/g,Fi).getRegex(),rr=ki(/\\(punct)/,"gu").replace(/punct/g,Fi).getRegex(),or=ki(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),nr=ki(Pi).replace("(?:--\x3e|$)","--\x3e").getRegex(),sr=ki("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",nr).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ar=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,lr=ki(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ar).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),cr=ki(/^!?\[(label)\]\[(ref)\]/).replace("label",ar).replace("ref",Li).getRegex(),dr=ki(/^!?\[(ref)\](?:\[\])?/).replace("ref",Li).getRegex(),hr=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,pr={_backpedal:wi,anyPunctuation:rr,autolink:or,blockSkip:Xi,br:qi,code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,del:wi,emStrongLDelim:Vi,emStrongRDelimAst:er,emStrongRDelimUnd:ir,escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,link:lr,nolink:dr,punctuation:Gi,reflink:cr,reflinkSearch:ki("reflink|nolink(?!\\()","g").replace("reflink",cr).replace("nolink",dr).getRegex(),tag:sr,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,url:wi},ur={...pr,link:ki(/^!?\[(label)\]\((.*?)\)/).replace("label",ar).getRegex(),reflink:ki(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ar).getRegex()},gr={...pr,emStrongRDelimAst:tr,emStrongLDelim:Ki,url:ki(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",hr).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ki(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",hr).getRegex()},fr={...gr,br:ki(qi).replace("{2,}","*").getRegex(),text:ki(gr.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},mr={normal:Hi,gfm:Ui,pedantic:Bi},br={normal:pr,gfm:gr,breaks:fr,pedantic:ur},vr={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},xr=e=>vr[e];function yr(e,t){if(t){if(Ai.escapeTest.test(e))return e.replace(Ai.escapeReplace,xr)}else if(Ai.escapeTestNoEncode.test(e))return e.replace(Ai.escapeReplaceNoEncode,xr);return e}function _r(e){try{e=encodeURI(e).replace(Ai.percentDecode,"%")}catch{return null}return e}function wr(e,t){let i=e.replace(Ai.findPipe,(e,t,i)=>{let r=!1,o=t;for(;--o>=0&&"\\"===i[o];)r=!r;return r?"|":" |"}),r=i.split(Ai.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(Ai.slashPipe,"|");return r}function kr(e,t,i){let r=e.length;if(0===r)return"";let o=0;for(;o<r;){if(e.charAt(r-o-1)!==t)break;o++}return e.slice(0,r-o)}function $r(e,t,i,r,o){let n=t.href,s=t.title||null,a=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let l={type:"!"===e[0].charAt(0)?"image":"link",raw:i,href:n,title:s,text:a,tokens:r.inlineTokens(a)};return r.state.inLink=!1,l}var Ar=class{options;rules;lexer;constructor(e){this.options=e||yi}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let e=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?e:kr(e,"\n")}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let e=t[0],i=function(e,t,i){let r=e.match(i.other.indentCodeCompensation);if(null===r)return t;let o=r[1];return t.split("\n").map(e=>{let t=e.match(i.other.beginningSpace);if(null===t)return e;let[r]=t;return r.length>=o.length?e.slice(o.length):e}).join("\n")}(e,t[3]||"",this.rules);return{type:"code",raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let t=kr(e,"#");(this.options.pedantic||!t||this.rules.other.endingSpaceChar.test(t))&&(e=t.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:kr(t[0],"\n")}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let e=kr(t[0],"\n").split("\n"),i="",r="",o=[];for(;e.length>0;){let t,n=!1,s=[];for(t=0;t<e.length;t++)if(this.rules.other.blockquoteStart.test(e[t]))s.push(e[t]),n=!0;else{if(n)break;s.push(e[t])}e=e.slice(t);let a=s.join("\n"),l=a.replace(this.rules.other.blockquoteSetextReplace,"\n    $1").replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}\n${a}`:a,r=r?`${r}\n${l}`:l;let c=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(l,o,!0),this.lexer.state.top=c,0===e.length)break;let d=o.at(-1);if("code"===d?.type)break;if("blockquote"===d?.type){let t=d,n=t.raw+"\n"+e.join("\n"),s=this.blockquote(n);o[o.length-1]=s,i=i.substring(0,i.length-t.raw.length)+s.raw,r=r.substring(0,r.length-t.text.length)+s.text;break}if("list"===d?.type){let t=d,n=t.raw+"\n"+e.join("\n"),s=this.list(n);o[o.length-1]=s,i=i.substring(0,i.length-d.raw.length)+s.raw,r=r.substring(0,r.length-t.raw.length)+s.raw,e=n.substring(o.at(-1).raw.length).split("\n");continue}}return{type:"blockquote",raw:i,tokens:o,text:r}}}list(e){let t=this.rules.block.list.exec(e);if(t){let i=t[1].trim(),r=i.length>1,o={type:"list",raw:"",ordered:r,start:r?+i.slice(0,-1):"",loose:!1,items:[]};i=r?`\\d{1,9}\\${i.slice(-1)}`:`\\${i}`,this.options.pedantic&&(i=r?i:"[*+-]");let n=this.rules.other.listItemRegex(i),s=!1;for(;e;){let i=!1,r="",a="";if(!(t=n.exec(e))||this.rules.block.hr.test(e))break;r=t[0],e=e.substring(r.length);let l=t[2].split("\n",1)[0].replace(this.rules.other.listReplaceTabs,e=>" ".repeat(3*e.length)),c=e.split("\n",1)[0],d=!l.trim(),h=0;if(this.options.pedantic?(h=2,a=l.trimStart()):d?h=t[1].length+1:(h=t[2].search(this.rules.other.nonSpaceChar),h=h>4?1:h,a=l.slice(h),h+=t[1].length),d&&this.rules.other.blankLine.test(c)&&(r+=c+"\n",e=e.substring(c.length+1),i=!0),!i){let t=this.rules.other.nextBulletRegex(h),i=this.rules.other.hrRegex(h),o=this.rules.other.fencesBeginRegex(h),n=this.rules.other.headingBeginRegex(h),s=this.rules.other.htmlBeginRegex(h);for(;e;){let p,u=e.split("\n",1)[0];if(c=u,this.options.pedantic?(c=c.replace(this.rules.other.listReplaceNesting,"  "),p=c):p=c.replace(this.rules.other.tabCharGlobal,"    "),o.test(c)||n.test(c)||s.test(c)||t.test(c)||i.test(c))break;if(p.search(this.rules.other.nonSpaceChar)>=h||!c.trim())a+="\n"+p.slice(h);else{if(d||l.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||o.test(l)||n.test(l)||i.test(l))break;a+="\n"+c}!d&&!c.trim()&&(d=!0),r+=u+"\n",e=e.substring(u.length+1),l=p.slice(h)}}o.loose||(s?o.loose=!0:this.rules.other.doubleBlankLine.test(r)&&(s=!0));let p,u=null;this.options.gfm&&(u=this.rules.other.listIsTask.exec(a),u&&(p="[ ] "!==u[0],a=a.replace(this.rules.other.listReplaceTask,""))),o.items.push({type:"list_item",raw:r,task:!!u,checked:p,loose:!1,text:a,tokens:[]}),o.raw+=r}let a=o.items.at(-1);if(!a)return;a.raw=a.raw.trimEnd(),a.text=a.text.trimEnd(),o.raw=o.raw.trimEnd();for(let e=0;e<o.items.length;e++)if(this.lexer.state.top=!1,o.items[e].tokens=this.lexer.blockTokens(o.items[e].text,[]),!o.loose){let t=o.items[e].tokens.filter(e=>"space"===e.type),i=t.length>0&&t.some(e=>this.rules.other.anyLine.test(e.raw));o.loose=i}if(o.loose)for(let e=0;e<o.items.length;e++)o.items[e].loose=!0;return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:"pre"===t[1]||"script"===t[1]||"style"===t[1],text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let e=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:e,raw:t[0],href:i,title:r}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let i=wr(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split("\n"):[],n={type:"table",raw:t[0],header:[],align:[],rows:[]};if(i.length===r.length){for(let e of r)this.rules.other.tableAlignRight.test(e)?n.align.push("right"):this.rules.other.tableAlignCenter.test(e)?n.align.push("center"):this.rules.other.tableAlignLeft.test(e)?n.align.push("left"):n.align.push(null);for(let e=0;e<i.length;e++)n.header.push({text:i[e],tokens:this.lexer.inline(i[e]),header:!0,align:n.align[e]});for(let e of o)n.rows.push(wr(e,n.header.length).map((e,t)=>({text:e,tokens:this.lexer.inline(e),header:!1,align:n.align[t]})));return n}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:"="===t[2].charAt(0)?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let e="\n"===t[1].charAt(t[1].length-1)?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let e=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(e)){if(!this.rules.other.endAngleBracket.test(e))return;let t=kr(e.slice(0,-1),"\\");if((e.length-t.length)%2==0)return}else{let e=function(e,t){if(-1===e.indexOf(t[1]))return-1;let i=0;for(let r=0;r<e.length;r++)if("\\"===e[r])r++;else if(e[r]===t[0])i++;else if(e[r]===t[1]&&(i--,i<0))return r;return i>0?-2:-1}(t[2],"()");if(-2===e)return;if(e>-1){let i=(0===t[0].indexOf("!")?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let i=t[2],r="";if(this.options.pedantic){let e=this.rules.other.pedanticHrefTitle.exec(i);e&&(i=e[1],r=e[3])}else r=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(i=this.options.pedantic&&!this.rules.other.endAngleBracket.test(e)?i.slice(1):i.slice(1,-1)),$r(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let i;if((i=this.rules.inline.reflink.exec(e))||(i=this.rules.inline.nolink.exec(e))){let e=t[(i[2]||i[1]).replace(this.rules.other.multipleSpaceGlobal," ").toLowerCase()];if(!e){let e=i[0].charAt(0);return{type:"text",raw:e,text:e}}return $r(i,e,i[0],this.lexer,this.rules)}}emStrong(e,t,i=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&i.match(this.rules.other.unicodeAlphaNumeric))&&(!r[1]&&!r[2]||!i||this.rules.inline.punctuation.exec(i))){let i,o,n=[...r[0]].length-1,s=n,a=0,l="*"===r[0][0]?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(l.lastIndex=0,t=t.slice(-1*e.length+n);null!=(r=l.exec(t));){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(o=[...i].length,r[3]||r[4]){s+=o;continue}if((r[5]||r[6])&&n%3&&!((n+o)%3)){a+=o;continue}if(s-=o,s>0)continue;o=Math.min(o,o+s+a);let t=[...r[0]][0].length,l=e.slice(0,n+r.index+t+o);if(Math.min(n,o)%2){let e=l.slice(1,-1);return{type:"em",raw:l,text:e,tokens:this.lexer.inlineTokens(e)}}let c=l.slice(2,-2);return{type:"strong",raw:l,text:c,tokens:this.lexer.inlineTokens(c)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(e),r=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return i&&r&&(e=e.substring(1,e.length-1)),{type:"codespan",raw:t[0],text:e}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let e,i;return"@"===t[2]?(e=t[1],i="mailto:"+e):(e=t[1],i=e),{type:"link",raw:t[0],text:e,href:i,tokens:[{type:"text",raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,i;if("@"===t[2])e=t[0],i="mailto:"+e;else{let r;do{r=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??""}while(r!==t[0]);e=t[0],i="www."===t[1]?"http://"+t[0]:t[0]}return{type:"link",raw:t[0],text:e,href:i,tokens:[{type:"text",raw:e,text:e}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let e=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:e}}}},Sr=class e{tokens;options;state;tokenizer;inlineQueue;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||yi,this.options.tokenizer=this.options.tokenizer||new Ar,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:Ai,block:mr.normal,inline:br.normal};this.options.pedantic?(t.block=mr.pedantic,t.inline=br.pedantic):this.options.gfm&&(t.block=mr.gfm,this.options.breaks?t.inline=br.breaks:t.inline=br.gfm),this.tokenizer.rules=t}static get rules(){return{block:mr,inline:br}}static lex(t,i){return new e(i).lex(t)}static lexInline(t,i){return new e(i).inlineTokens(t)}lex(e){e=e.replace(Ai.carriageReturn,"\n"),this.blockTokens(e,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let t=this.inlineQueue[e];this.inlineTokens(t.src,t.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],i=!1){for(this.options.pedantic&&(e=e.replace(Ai.tabCharGlobal,"    ").replace(Ai.spaceLine,""));e;){let r;if(this.options.extensions?.block?.some(i=>!!(r=i.call({lexer:this},e,t))&&(e=e.substring(r.raw.length),t.push(r),!0)))continue;if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length);let i=t.at(-1);1===r.raw.length&&void 0!==i?i.raw+="\n":t.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length);let i=t.at(-1);"paragraph"===i?.type||"text"===i?.type?(i.raw+=(i.raw.endsWith("\n")?"":"\n")+r.raw,i.text+="\n"+r.text,this.inlineQueue.at(-1).src=i.text):t.push(r);continue}if(r=this.tokenizer.fences(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.heading(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.hr(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.blockquote(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.list(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.html(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length);let i=t.at(-1);"paragraph"===i?.type||"text"===i?.type?(i.raw+=(i.raw.endsWith("\n")?"":"\n")+r.raw,i.text+="\n"+r.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title},t.push(r));continue}if(r=this.tokenizer.table(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.lheading(e)){e=e.substring(r.raw.length),t.push(r);continue}let o=e;if(this.options.extensions?.startBlock){let t,i=1/0,r=e.slice(1);this.options.extensions.startBlock.forEach(e=>{t=e.call({lexer:this},r),"number"==typeof t&&t>=0&&(i=Math.min(i,t))}),i<1/0&&i>=0&&(o=e.substring(0,i+1))}if(this.state.top&&(r=this.tokenizer.paragraph(o))){let n=t.at(-1);i&&"paragraph"===n?.type?(n.raw+=(n.raw.endsWith("\n")?"":"\n")+r.raw,n.text+="\n"+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=n.text):t.push(r),i=o.length!==e.length,e=e.substring(r.raw.length);continue}if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length);let i=t.at(-1);"text"===i?.type?(i.raw+=(i.raw.endsWith("\n")?"":"\n")+r.raw,i.text+="\n"+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):t.push(r);continue}if(e){let t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw new Error(t)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let i,r=e,o=null;if(this.tokens.links){let e=Object.keys(this.tokens.links);if(e.length>0)for(;null!=(o=this.tokenizer.rules.inline.reflinkSearch.exec(r));)e.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!=(o=this.tokenizer.rules.inline.anyPunctuation.exec(r));)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;null!=(o=this.tokenizer.rules.inline.blockSkip.exec(r));)i=o[2]?o[2].length:0,r=r.slice(0,o.index+i)+"["+"a".repeat(o[0].length-i-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let n=!1,s="";for(;e;){let i;if(n||(s=""),n=!1,this.options.extensions?.inline?.some(r=>!!(i=r.call({lexer:this},e,t))&&(e=e.substring(i.raw.length),t.push(i),!0)))continue;if(i=this.tokenizer.escape(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.tag(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.link(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(i.raw.length);let r=t.at(-1);"text"===i.type&&"text"===r?.type?(r.raw+=i.raw,r.text+=i.text):t.push(i);continue}if(i=this.tokenizer.emStrong(e,r,s)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.codespan(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.br(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.del(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.autolink(e)){e=e.substring(i.raw.length),t.push(i);continue}if(!this.state.inLink&&(i=this.tokenizer.url(e))){e=e.substring(i.raw.length),t.push(i);continue}let o=e;if(this.options.extensions?.startInline){let t,i=1/0,r=e.slice(1);this.options.extensions.startInline.forEach(e=>{t=e.call({lexer:this},r),"number"==typeof t&&t>=0&&(i=Math.min(i,t))}),i<1/0&&i>=0&&(o=e.substring(0,i+1))}if(i=this.tokenizer.inlineText(o)){e=e.substring(i.raw.length),"_"!==i.raw.slice(-1)&&(s=i.raw.slice(-1)),n=!0;let r=t.at(-1);"text"===r?.type?(r.raw+=i.raw,r.text+=i.text):t.push(i);continue}if(e){let t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw new Error(t)}}return t}},Tr=class{options;parser;constructor(e){this.options=e||yi}space(e){return""}code({text:e,lang:t,escaped:i}){let r=(t||"").match(Ai.notSpaceStart)?.[0],o=e.replace(Ai.endingNewline,"")+"\n";return r?'<pre><code class="language-'+yr(r)+'">'+(i?o:yr(o,!0))+"</code></pre>\n":"<pre><code>"+(i?o:yr(o,!0))+"</code></pre>\n"}blockquote({tokens:e}){return`<blockquote>\n${this.parser.parse(e)}</blockquote>\n`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>\n`}hr(e){return"<hr>\n"}list(e){let t=e.ordered,i=e.start,r="";for(let t=0;t<e.items.length;t++){let i=e.items[t];r+=this.listitem(i)}let o=t?"ol":"ul";return"<"+o+(t&&1!==i?' start="'+i+'"':"")+">\n"+r+"</"+o+">\n"}listitem(e){let t="";if(e.task){let i=this.checkbox({checked:!!e.checked});e.loose?"paragraph"===e.tokens[0]?.type?(e.tokens[0].text=i+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&"text"===e.tokens[0].tokens[0].type&&(e.tokens[0].tokens[0].text=i+" "+yr(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):t+=i+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>\n`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>\n`}table(e){let t="",i="";for(let t=0;t<e.header.length;t++)i+=this.tablecell(e.header[t]);t+=this.tablerow({text:i});let r="";for(let t=0;t<e.rows.length;t++){let o=e.rows[t];i="";for(let e=0;e<o.length;e++)i+=this.tablecell(o[e]);r+=this.tablerow({text:i})}return r&&(r=`<tbody>${r}</tbody>`),"<table>\n<thead>\n"+t+"</thead>\n"+r+"</table>\n"}tablerow({text:e}){return`<tr>\n${e}</tr>\n`}tablecell(e){let t=this.parser.parseInline(e.tokens),i=e.header?"th":"td";return(e.align?`<${i} align="${e.align}">`:`<${i}>`)+t+`</${i}>\n`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${yr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:i}){let r=this.parser.parseInline(i),o=_r(e);if(null===o)return r;let n='<a href="'+(e=o)+'"';return t&&(n+=' title="'+yr(t)+'"'),n+=">"+r+"</a>",n}image({href:e,title:t,text:i,tokens:r}){r&&(i=this.parser.parseInline(r,this.parser.textRenderer));let o=_r(e);if(null===o)return yr(i);let n=`<img src="${e=o}" alt="${i}"`;return t&&(n+=` title="${yr(t)}"`),n+=">",n}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:yr(e.text)}},Cr=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},zr=class e{options;renderer;textRenderer;constructor(e){this.options=e||yi,this.options.renderer=this.options.renderer||new Tr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Cr}static parse(t,i){return new e(i).parse(t)}static parseInline(t,i){return new e(i).parseInline(t)}parse(e,t=!0){let i="";for(let r=0;r<e.length;r++){let o=e[r];if(this.options.extensions?.renderers?.[o.type]){let e=o,t=this.options.extensions.renderers[e.type].call({parser:this},e);if(!1!==t||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(e.type)){i+=t||"";continue}}let n=o;switch(n.type){case"space":i+=this.renderer.space(n);continue;case"hr":i+=this.renderer.hr(n);continue;case"heading":i+=this.renderer.heading(n);continue;case"code":i+=this.renderer.code(n);continue;case"table":i+=this.renderer.table(n);continue;case"blockquote":i+=this.renderer.blockquote(n);continue;case"list":i+=this.renderer.list(n);continue;case"html":i+=this.renderer.html(n);continue;case"def":i+=this.renderer.def(n);continue;case"paragraph":i+=this.renderer.paragraph(n);continue;case"text":{let o=n,s=this.renderer.text(o);for(;r+1<e.length&&"text"===e[r+1].type;)o=e[++r],s+="\n"+this.renderer.text(o);i+=t?this.renderer.paragraph({type:"paragraph",raw:s,text:s,tokens:[{type:"text",raw:s,text:s,escaped:!0}]}):s;continue}default:{let e='Token with "'+n.type+'" type was not found.';if(this.options.silent)return console.error(e),"";throw new Error(e)}}}return i}parseInline(e,t=this.renderer){let i="";for(let r=0;r<e.length;r++){let o=e[r];if(this.options.extensions?.renderers?.[o.type]){let e=this.options.extensions.renderers[o.type].call({parser:this},o);if(!1!==e||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){i+=e||"";continue}}let n=o;switch(n.type){case"escape":case"text":i+=t.text(n);break;case"html":i+=t.html(n);break;case"link":i+=t.link(n);break;case"image":i+=t.image(n);break;case"strong":i+=t.strong(n);break;case"em":i+=t.em(n);break;case"codespan":i+=t.codespan(n);break;case"br":i+=t.br(n);break;case"del":i+=t.del(n);break;default:{let e='Token with "'+n.type+'" type was not found.';if(this.options.silent)return console.error(e),"";throw new Error(e)}}}return i}},Er=class{options;block;constructor(e){this.options=e||yi}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Sr.lex:Sr.lexInline}provideParser(){return this.block?zr.parse:zr.parseInline}},Rr=class{defaults={async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null};options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=zr;Renderer=Tr;TextRenderer=Cr;Lexer=Sr;Tokenizer=Ar;Hooks=Er;constructor(...e){this.use(...e)}walkTokens(e,t){let i=[];for(let r of e)switch(i=i.concat(t.call(this,r)),r.type){case"table":{let e=r;for(let r of e.header)i=i.concat(this.walkTokens(r.tokens,t));for(let r of e.rows)for(let e of r)i=i.concat(this.walkTokens(e.tokens,t));break}case"list":{let e=r;i=i.concat(this.walkTokens(e.items,t));break}default:{let e=r;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach(r=>{let o=e[r].flat(1/0);i=i.concat(this.walkTokens(o,t))}):e.tokens&&(i=i.concat(this.walkTokens(e.tokens,t)))}}return i}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(e=>{let i={...e};if(i.async=this.defaults.async||i.async||!1,e.extensions&&(e.extensions.forEach(e=>{if(!e.name)throw new Error("extension name required");if("renderer"in e){let i=t.renderers[e.name];t.renderers[e.name]=i?function(...t){let r=e.renderer.apply(this,t);return!1===r&&(r=i.apply(this,t)),r}:e.renderer}if("tokenizer"in e){if(!e.level||"block"!==e.level&&"inline"!==e.level)throw new Error("extension level must be 'block' or 'inline'");let i=t[e.level];i?i.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&("block"===e.level?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:"inline"===e.level&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}"childTokens"in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)}),i.extensions=t),e.renderer){let t=this.defaults.renderer||new Tr(this.defaults);for(let i in e.renderer){if(!(i in t))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let r=i,o=e.renderer[r],n=t[r];t[r]=(...e)=>{let i=o.apply(t,e);return!1===i&&(i=n.apply(t,e)),i||""}}i.renderer=t}if(e.tokenizer){let t=this.defaults.tokenizer||new Ar(this.defaults);for(let i in e.tokenizer){if(!(i in t))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let r=i,o=e.tokenizer[r],n=t[r];t[r]=(...e)=>{let i=o.apply(t,e);return!1===i&&(i=n.apply(t,e)),i}}i.tokenizer=t}if(e.hooks){let t=this.defaults.hooks||new Er;for(let i in e.hooks){if(!(i in t))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let r=i,o=e.hooks[r],n=t[r];Er.passThroughHooks.has(i)?t[r]=e=>{if(this.defaults.async&&Er.passThroughHooksRespectAsync.has(i))return(async()=>{let i=await o.call(t,e);return n.call(t,i)})();let r=o.call(t,e);return n.call(t,r)}:t[r]=(...e)=>{if(this.defaults.async)return(async()=>{let i=await o.apply(t,e);return!1===i&&(i=await n.apply(t,e)),i})();let i=o.apply(t,e);return!1===i&&(i=n.apply(t,e)),i}}i.hooks=t}if(e.walkTokens){let t=this.defaults.walkTokens,r=e.walkTokens;i.walkTokens=function(e){let i=[];return i.push(r.call(this,e)),t&&(i=i.concat(t.call(this,e))),i}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Sr.lex(e,t??this.defaults)}parser(e,t){return zr.parse(e,t??this.defaults)}parseMarkdown(e){return(t,i)=>{let r={...i},o={...this.defaults,...r},n=this.onError(!!o.silent,!!o.async);if(!0===this.defaults.async&&!1===r.async)return n(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||null===t)return n(new Error("marked(): input parameter is undefined or null"));if("string"!=typeof t)return n(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,r=await(o.hooks?await o.hooks.provideLexer():e?Sr.lex:Sr.lexInline)(i,o),n=o.hooks?await o.hooks.processAllTokens(r):r;o.walkTokens&&await Promise.all(this.walkTokens(n,o.walkTokens));let s=await(o.hooks?await o.hooks.provideParser():e?zr.parse:zr.parseInline)(n,o);return o.hooks?await o.hooks.postprocess(s):s})().catch(n);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?Sr.lex:Sr.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let r=(o.hooks?o.hooks.provideParser():e?zr.parse:zr.parseInline)(i,o);return o.hooks&&(r=o.hooks.postprocess(r)),r}catch(e){return n(e)}}}onError(e,t){return i=>{if(i.message+="\nPlease report this to https://github.com/markedjs/marked.",e){let e="<p>An error occurred:</p><pre>"+yr(i.message+"",!0)+"</pre>";return t?Promise.resolve(e):e}if(t)return Promise.reject(i);throw i}}},Lr=new Rr;function Nr(e,t){return Lr.parse(e,t)}Nr.options=Nr.setOptions=function(e){return Lr.setOptions(e),Nr.defaults=Lr.defaults,_i(Nr.defaults),Nr},Nr.getDefaults=xi,Nr.defaults=yi,Nr.use=function(...e){return Lr.use(...e),Nr.defaults=Lr.defaults,_i(Nr.defaults),Nr},Nr.walkTokens=function(e,t){return Lr.walkTokens(e,t)},Nr.parseInline=Lr.parseInline,Nr.Parser=zr,Nr.parser=zr.parse,Nr.Renderer=Tr,Nr.TextRenderer=Cr,Nr.Lexer=Sr,Nr.lexer=Sr.lex,Nr.Tokenizer=Ar,Nr.Hooks=Er,Nr.parse=Nr,Nr.options,Nr.setOptions,Nr.use,Nr.walkTokens,Nr.parseInline,zr.parse,Sr.lex;const Or=new Rr({gfm:!0,breaks:!1});function Ir(e){const t=Or.parse(e,{async:!1});return vi.sanitize(t,{FORBID_TAGS:["img","picture","source","style","form","input","button","select","textarea","svg","math"]})}Or.use({renderer:{image:({href:e,title:t,text:i})=>`<a href="${e}"${t?` title="${t}"`:""}>${i||e}</a>`}}),vi.addHook("afterSanitizeAttributes",e=>{"A"===e.tagName&&(e.setAttribute("target","_blank"),e.setAttribute("rel","noopener noreferrer"))});let Pr=class extends se{constructor(){super(...arguments),this.ticket=null,this.isAdmin=!1,this.narrow=!1,this.language=void 0,this.agentName="claude",this.labelMap=new Map,this.people=new Map,this.categoryMap=new Map,this._expanded=!1,this._showHistory=!1,this._descCollapsed=!1,this._descFull=0,this._descSettle=0,this._agentToggle=null,this._priorityTo="",this._comment="",this._expandDescription=()=>{this._descCollapsed&&(this._setDescCollapsed(!1),this.renderRoot.querySelector(".scroll")?.scrollTo({top:0}))},this._scrollTo=null,this._titleKey=e=>{const t=e.target;"Enter"===e.key?(e.preventDefault(),t.blur()):"Escape"===e.key&&(t.value=this.ticket?.title??t.value,t.blur())}}willUpdate(e){if(e.has("ticket")){this.toggleAttribute("open",!!this.ticket);const t=e.get("ticket"),i=t?.events.length??0;t?.id!==this.ticket?.id?(this._scrollTo="top",this._descCollapsed=!1,this._agentToggle=null,this._priorityTo="",this._expanded=!1,this._comment=""):this.ticket&&this.ticket.events.length>i&&(this._scrollTo="bottom")}}_onScroll(e){if(Date.now()<this._descSettle||this._descFull<=56)return;const t=e.currentTarget.scrollTop;!this._descCollapsed&&t>4?this._setDescCollapsed(!0):this._descCollapsed&&t<=0&&this._setDescCollapsed(!1)}_setDescCollapsed(e){this._descCollapsed=e,this._descSettle=Date.now()+400}_fitTitle(e){e.style.height="auto",e.style.height=`${e.scrollHeight+(e.offsetHeight-e.clientHeight)}px`}_saveTitle(e){const t=e.value.replace(/\s+/g," ").trim();t&&t!==this.ticket?.title?this._patch({title:t}):e.value=this.ticket?.title??"",this._fitTitle(e)}connectedCallback(){super.connectedCallback(),this._resizer=new ResizeObserver(()=>{const e=this.renderRoot.querySelector("textarea.title-edit");e&&this._fitTitle(e)}),this._resizer.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._resizer?.disconnect()}updated(){const e=this.renderRoot.querySelector("textarea.title-edit");if(e&&this._fitTitle(e),!this._descCollapsed){const e=this.renderRoot.querySelector(".desc-sticky .card");this._descFull=e?e.offsetHeight:0}if(this._scrollTo){const e=this.renderRoot.querySelector(".scroll"),t=this._scrollTo;this._scrollTo=null,e?.scrollTo({top:"top"===t?0:e.scrollHeight,behavior:"top"===t?"auto":"smooth"})}}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_patch(e){this._fire("patch-ticket",e)}_addLabelControl(e){return q`<button class="add-label" title="Add Label" aria-label="Add Label" aria-haspopup="listbox"
      @click=${t=>this.dispatchEvent(new CustomEvent("pick-label",{detail:{ticket:e,rect:t.currentTarget.getBoundingClientRect()},bubbles:!0,composed:!0}))}><ha-icon icon="mdi:plus"></ha-icon></button>`}_shownPriority(e){return this._priorityTo||e.priority}_togglePriority(e,t){const i=this._shownPriority(e)===t?"normal":t;this._priorityTo=i===e.priority?"":i}_priorityPills(e){const t=this._shownPriority(e),i={high:"mdi:alert-outline",urgent:"mdi:alert"};return q`<div class="assign prio-group" role="group" aria-label="Priority">
      ${["high","urgent"].map(r=>{const o=t===r;return q`<button class="prio-dot ${r} ${o?"on":""}"
          aria-pressed=${o?"true":"false"} aria-label=${ke[r]}
          title=${o?`Priority is ${ke[r]}. Click to clear.`:`Set priority to ${ke[r]}`}
          @click=${()=>this._togglePriority(e,r)}><ha-icon .icon=${i[r]}></ha-icon></button>`})}
    </div>`}_withAgent(e){return!!e.assignee&&Se(e.assignee)}_agentDefault(e){if(this._withAgent(e)||"resolved"===e.status||"closed"===e.status)return!1;const t=[...e.events].reverse().find(e=>"comment"===e.kind||"note"===e.kind);return!!t&&Se(t.actor)}_agentOn(e){return this._agentToggle??(this._withAgent(e)||this._agentDefault(e))}_agentApplies(e){return this._agentOn(e)!==this._withAgent(e)&&(null!==this._agentToggle||!!this._comment.trim())}_canSubmit(e){return!!this._comment.trim()||this._agentApplies(e)||!!this._priorityTo}_agentChip(e){const t=this._agentOn(e),i=this._withAgent(e);return q`<button class="assign-chip ${i&&t?"current":""} ${t&&!i?"picked":""} ${i&&!t?"dropping":""}"
      aria-pressed=${t?"true":"false"} aria-label="Assign to AI Agent" title=${i?t?"With the AI Agent. Click to take it back.":"Will be taken back from the AI Agent. Click to keep it with them.":t?"Will be assigned to the AI Agent. Click to switch off.":"Assign to the AI Agent"}
      @click=${()=>this._agentToggle=!t}><ha-icon icon="mdi:creation"></ha-icon><span><span class="verb">Assign to </span>AI Agent</span></button>`}_submitLabel(e){const t=this._agentApplies(e),i=this._agentOn(e)?"Assign to AI Agent":"Unassign from AI Agent";return this._comment.trim()?t?`Comment and ${i}`:"Comment":t&&this._priorityTo?"Update":t?i:this._priorityTo?"Set Priority":"Comment"}_commentAndReopen(){const e=this._comment.trim();e&&(this._fire("comment",{body:e,internal:!1}),this._comment="",this._patch({status:"in_progress"}))}_submitComment(){const e=this.ticket;if(!e||!this._canSubmit(e))return;const t=this._comment.trim();t&&this._fire("comment",{body:t,internal:!1});const i={};this._agentApplies(e)&&(i.assignee=this._agentOn(e)?this.agentName:null),this._priorityTo&&(i.priority=this._priorityTo),Object.keys(i).length&&this._patch(i),this._comment="",this._agentToggle=null,this._priorityTo=""}_resolve(){const e=this._comment.trim();e?(this._fire("close-ticket",{resolution:e,status:"resolved"}),this._comment=""):this._patch({status:"resolved"})}_change(e){const t=e.data??{},i=e=>Array.isArray(e)?e.map(e=>"labels"===t.field?Ne(this.labelMap,String(e)).name:String(e)).join(", ")||"none":null==e||""===e?"none":String(e);switch(e.kind){case"created":return"created this ticket";case"status":return`changed status from ${ye[t.from]??i(t.from)} to ${ye[t.to]??i(t.to)}`;case"priority":return`changed priority from ${i(t.from)} to ${i(t.to)}`;case"assignee":return t.to?`assigned this to ${i(t.to)}`:"unassigned this";case"link":return`linked ticket #${String(t.to)}`;case"field":return"description"===t.field?"edited the description":`changed ${String(t.field)}${"labels"===t.field||"entities"===t.field?` to ${i(t.to)}`:""}`;default:return e.kind}}_detail(e){const t=e.data??{},i=e=>Array.isArray(e)?e.map(e=>"labels"===t.field?Ne(this.labelMap,String(e)).name:String(e)).join(", ")||"none":null==e||""===e?"none":String(e);switch(e.kind){case"created":return{field:"Ticket Opened",to:"",icon:"mdi:ticket-outline",tone:"var(--st-accent)"};case"status":return{field:"Status",from:ye[t.from]??i(t.from),to:ye[t.to]??i(t.to),icon:"mdi:progress-check",tone:"resolved"===t.to||"closed"===t.to?"var(--st-success)":"var(--st-accent)"};case"priority":return{field:"Priority",from:i(t.from),to:i(t.to),icon:"mdi:flag-outline",tone:"var(--st-warning)"};case"assignee":return{field:"Assignee",from:i(t.from),to:i(t.to),icon:"mdi:account-outline",tone:"var(--st-fg-secondary)"};case"link":return{field:"Linked",to:`ticket #${String(t.to)}`,icon:"mdi:link-variant",tone:"var(--st-fg-secondary)"};case"field":{const e=String(t.field??"field"),r=e.charAt(0).toUpperCase()+e.slice(1),o="labels"===e?"mdi:label-outline":"category"===e?"mdi:shape-outline":"mdi:pencil-outline";return"description"===e?{field:r,to:"edited",icon:o,tone:"var(--st-fg-secondary)"}:{field:r,from:i(t.from),to:i(t.to),icon:o,tone:"var(--st-fg-secondary)"}}default:return{field:e.kind,to:"",icon:"mdi:circle-small",tone:"var(--st-fg-secondary)"}}}_avatar(e){const t=Se(e)?void 0:this.people.get(Ce(e).toLowerCase())?.picture;return t?q`<div class="avatar photo"><img src=${t} alt=${Ce(e)} /></div>`:q`<div class="avatar"><ha-icon .icon=${function(e){const t=e.toLowerCase();return Se(e)?"mdi:creation":"ha"===t||"home assistant"===t?"mdi:home-assistant":"import"===t?"mdi:database-import-outline":"mdi:account-circle-outline"}(e)}></ha-icon></div>`}_eventTemplate(e){const t=(i=e.created_at,r=this.language,new Date(i).toLocaleString(r,{dateStyle:"medium",timeStyle:"short"}));var i,r;const o=this._showHistory?q`<span title=${Ae(e.created_at,this.language)}>${t}</span>`:q`<span title=${t}>${Ae(e.created_at,this.language)}</span>`;if("comment"===e.kind||"note"===e.kind)return q`
        <div class="ev">
          ${this._avatar(e.actor)}
          <div>
            <div class="who"><b>${Oe(e.actor)}</b> · <span class="when">${o}</span>${"note"===e.kind?q`<span class="label dense">internal note</span>`:W}</div>
            <div class="bubble md ${"note"===e.kind?"note":""}">${Ze(Ir(e.body??""))}</div>
          </div>
        </div>`;const n=this._detail(e);return q`
      <div class="ev system">
        <ha-icon .icon=${n.icon}></ha-icon>
        <div class="line">
          <span><b>${n.field}</b> ${n.to}${void 0!==n.from?q`<s>${n.from}</s>`:W}</span>
          <span class="stamp">${Oe(e.actor)} · ${t}</span>
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
            ${e.assignee&&Se(e.assignee)?q`<span><ha-icon icon=${Te(e.assignee)}></ha-icon> With ${Oe(e.assignee)}</span>`:W}
            ${e.labels.includes(xe)?q`<span class="blocked" title="Waiting on a person, a part or a fix"><ha-icon icon="mdi:timer-sand"></ha-icon> Blocked</span>`:W}
            ${e.comment_count?q`<span><ha-icon icon="mdi:comment-outline"></ha-icon> ${e.comment_count}</span>`:W}
          </div>
          <!-- Second line: the category, status and priority, then the labels (which wrap on to their own line if they don't fit). -->
          <div class="tag-line">
            <st-ticket-tags show="category" .ticket=${e} .categoryMap=${this.categoryMap} .labelMap=${this.labelMap} .isAdmin=${this.isAdmin}></st-ticket-tags>
            <span class="status" style="--state: ${we[e.status]}"><ha-icon .icon=${_e[e.status]}></ha-icon>${ye[e.status]}</span>
            ${"urgent"===e.priority||"high"===e.priority?q`<span class="prio ${e.priority}"><ha-icon .icon=${"urgent"===e.priority?"mdi:alert":"mdi:alert-outline"}></ha-icon>${ke[e.priority]}</span>`:W}
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
                <div class="md ${t&&!this._expanded?"clamp":""}">${Ze(Ir(e.description))}</div>
                ${t?q`<button class="more" @click=${()=>this._expanded=!this._expanded}>${this._expanded?"Show Less":"Show All"}</button>`:W}
                ${e.entities.length?q`<div class="entities">${e.entities.map(e=>q`<code>${e}</code>`)}</div>`:W}
              </div>
              <ha-icon class="pin-hint" icon="mdi:chevron-up"></ha-icon>
            </div>`:W}

        ${e.resolution?q`<div class="card resolution"><h3>Resolution</h3><div class="md">${Ze(Ir(e.resolution))}</div></div>`:W}

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
    `}};Pr.styles=[ue,s`
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
    `],e([de({attribute:!1})],Pr.prototype,"ticket",void 0),e([de({type:Boolean})],Pr.prototype,"isAdmin",void 0),e([de({type:Boolean})],Pr.prototype,"narrow",void 0),e([de()],Pr.prototype,"language",void 0),e([de()],Pr.prototype,"agentName",void 0),e([de({attribute:!1})],Pr.prototype,"labelMap",void 0),e([de({attribute:!1})],Pr.prototype,"people",void 0),e([de({attribute:!1})],Pr.prototype,"categoryMap",void 0),e([he()],Pr.prototype,"_expanded",void 0),e([he()],Pr.prototype,"_showHistory",void 0),e([he()],Pr.prototype,"_descCollapsed",void 0),e([he()],Pr.prototype,"_agentToggle",void 0),e([he()],Pr.prototype,"_priorityTo",void 0),e([he()],Pr.prototype,"_comment",void 0),Pr=e([pe("st-ticket-detail")],Pr);const Mr=[{id:"bug",name:"Bug"},{id:"enhancement",name:"Enhancement"},{id:"question",name:"Question"},{id:"task",name:"Task",admin:!0}];let Dr=class extends se{constructor(){super(...arguments),this.isAdmin=!1,this.categories=[],this._category="",this._title="",this._description="",this._kind="bug",this._priority="normal"}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_submit(){this._title.trim()&&this._fire("create",{title:this._title.trim(),description:this._description,labels:[this._kind],priority:this._priority,...this.isAdmin&&this._category?{category:this._category}:{}})}render(){return q`
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
                ${Mr.filter(e=>!e.admin||this.isAdmin).map(e=>q`<option value=${e.id} ?selected=${e.id===this._kind}>${e.name}</option>`)}
              </select>
            </div>
            ${this.isAdmin?q`<div>
                  <label for="prio">Priority</label>
                  <select id="prio" .value=${this._priority}
                    @change=${e=>this._priority=e.target.value}>
                    ${me.filter(e=>"low"!==e).map(e=>q`<option value=${e} ?selected=${e===this._priority}>${ke[e]}</option>`)}
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
    `}};Dr.styles=[ue,s`
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
    `],e([de({type:Boolean})],Dr.prototype,"isAdmin",void 0),e([de({attribute:!1})],Dr.prototype,"categories",void 0),e([he()],Dr.prototype,"_category",void 0),e([he()],Dr.prototype,"_title",void 0),e([he()],Dr.prototype,"_description",void 0),e([he()],Dr.prototype,"_kind",void 0),e([he()],Dr.prototype,"_priority",void 0),Dr=e([pe("st-new-ticket-dialog")],Dr);let Hr=class extends se{constructor(){super(...arguments),this.labels=[],this._q="",this._draft=null,this._orig=null,this._shake=!1,this._toRemove=null,this._colorsOpen=!1,this._colorQ="",this._error=""}_fire(e){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0}))}_message(e){return String(e&&"object"==typeof e&&"message"in e?e.message:e)}get _shown(){const e=this._q.trim().toLowerCase();return e?this.labels.filter(t=>t.name.toLowerCase().includes(e)||t.description.toLowerCase().includes(e)):this.labels}_open(e){this._error="",this._colorsOpen=!1,this._draft=e?{id:e.id,name:e.name,icon:e.icon,color:e.color,description:e.description}:{id:null,name:"",icon:"",color:"",description:""},this._orig=this._draft}async _save(){const e=this._draft;if(e&&e.name.trim())try{e.id?await this.client.updateLabel(e.id,{name:e.name.trim(),icon:e.icon.trim(),description:e.description,...e.color?{color:e.color}:{}}):await this.client.createLabel({name:e.name.trim(),icon:e.icon.trim(),description:e.description,...e.color?{color:e.color}:{}}),this._draft=null,this._fire("labels-changed")}catch(e){this._error=this._message(e)}}_tryClose(){if(!this._toRemove)return this._dirty?(this._shake=!0,void window.setTimeout(()=>this._shake=!1,400)):void(this._draft=null)}get _dirty(){const e=this._draft,t=this._orig;return!(!e||!t)&&(e.name!==t.name||e.icon!==t.icon||e.color!==t.color||e.description!==t.description)}async _remove(){const e=this._toRemove;if(e)try{await this.client.deleteLabel(e.id),this._toRemove=null,this._draft=null,this._fire("labels-changed")}catch(e){this._toRemove=null,this._error=this._message(e)}}_row(e){return q`<div class="row ${e.builtin?"locked":""}" role="row"
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
    </div>`}_dialog(e){const t=e.color?Le(e.color):"",i=customElements.get("ha-icon-picker"),r=this._colorQ.trim().toLowerCase(),o=e.id?this._orig?.name??e.name:"New Label";return q`<div class="scrim" @click=${e=>e.target===e.currentTarget&&this._tryClose()}
      @keydown=${e=>"Escape"===e.key&&this._tryClose()}>
      <div class="dialog ${this._shake?"shake":""}" role="dialog" aria-modal="true" aria-label=${o}>
        <div class="dhead">
          <button class="icon" title="Close" @click=${()=>this._draft=null}><ha-icon icon="mdi:close"></ha-icon></button>
          <h2>${o}</h2>
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
    `}};Hr.styles=[ue,s`
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
    `],e([de({attribute:!1})],Hr.prototype,"client",void 0),e([de({attribute:!1})],Hr.prototype,"labels",void 0),e([he()],Hr.prototype,"_q",void 0),e([he()],Hr.prototype,"_draft",void 0),e([he()],Hr.prototype,"_orig",void 0),e([he()],Hr.prototype,"_shake",void 0),e([he()],Hr.prototype,"_toRemove",void 0),e([he()],Hr.prototype,"_colorsOpen",void 0),e([he()],Hr.prototype,"_colorQ",void 0),e([he()],Hr.prototype,"_error",void 0),Hr=e([pe("st-label-manager")],Hr);let jr=class extends se{constructor(){super(...arguments),this.categories=[],this._q="",this._draft=null,this._orig=null,this._shake=!1,this._toRemove=null,this._error=""}_fire(e){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0}))}_message(e){return String(e&&"object"==typeof e&&"message"in e?e.message:e)}get _shown(){const e=this._q.trim().toLowerCase();return e?this.categories.filter(t=>t.name.toLowerCase().includes(e)):this.categories}get _dirty(){const e=this._draft,t=this._orig;return!(!e||!t||e.name===t.name&&e.icon===t.icon)}_open(e){this._error="",this._draft=e?{id:e.id,name:e.name,icon:e.icon}:{id:null,name:"",icon:""},this._orig=this._draft}async _save(){const e=this._draft;if(e&&e.name.trim())try{const t={name:e.name.trim(),icon:e.icon.trim()};e.id?await this.client.updateCategory(e.id,t):await this.client.createCategory(t),this._draft=null,this._fire("categories-changed")}catch(e){this._error=this._message(e)}}_tryClose(){if(!this._toRemove)return this._dirty||this._draft&&!this._draft.id&&(this._draft.name||this._draft.icon)?(this._shake=!0,void window.setTimeout(()=>this._shake=!1,400)):void(this._draft=null)}async _remove(){const e=this._toRemove;if(e)try{await this.client.deleteCategory(e.id),this._toRemove=null,this._draft=null,this._fire("categories-changed")}catch(e){this._toRemove=null,this._error=this._message(e)}}_row(e){return q`<div class="row ${e.builtin?"locked":""}" role="row" @click=${()=>!e.builtin&&this._open(e)}>
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
    `}};jr.styles=[ue,s`
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
    `],e([de({attribute:!1})],jr.prototype,"client",void 0),e([de({attribute:!1})],jr.prototype,"categories",void 0),e([he()],jr.prototype,"_q",void 0),e([he()],jr.prototype,"_draft",void 0),e([he()],jr.prototype,"_orig",void 0),e([he()],jr.prototype,"_shake",void 0),e([he()],jr.prototype,"_toRemove",void 0),e([he()],jr.prototype,"_error",void 0),jr=e([pe("st-category-manager")],jr);const Ur=[{id:"immediately",label:"Straight away"},{id:"1h",label:"After 1 hour"},{id:"6h",label:"After 6 hours"},{id:"1d",label:"After 1 day"},{id:"3d",label:"After 3 days"},{id:"7d",label:"After 7 days"},{id:"14d",label:"After 14 days"},{id:"30d",label:"After 30 days"},{id:"never",label:"Never"}];let Br=class extends se{constructor(){super(...arguments),this._s=null,this._error=""}async connectedCallback(){super.connectedCallback(),this._s=await this.client.settings()}async _save(e){const t=this._s;if(t){this._s={...t,...e,notify:{...t.notify,...e.notify}};try{this._s=await this.client.saveSettings(e),this._error="",this.dispatchEvent(new CustomEvent("settings-changed",{detail:this._s,bubbles:!0,composed:!0}))}catch{this._error="Couldn't save that. These options need the newer Home Desk integration.",this._s=t}}}_targetName(e){if("persistent_notification"===e)return"Home Assistant notifications (the bell)";const t=e.startsWith("mobile_app_"),i=e.replace(/^mobile_app_/,"").replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase());return t?`${i} (mobile app)`:i}get _targets(){const e=Object.keys(this.hass.services?.notify??{}),t=this._s?.notify.targets??[];return[...new Set([...e,...t])].filter(e=>"notify"!==e).sort()}get _agents(){return Object.entries(this.hass.states??{}).filter(([e])=>e.startsWith("ai_task.")||e.startsWith("conversation.")).map(([e,t])=>({id:e,label:String(t.attributes.friendly_name??e)})).sort((e,t)=>e.label.localeCompare(t.label))}_switch(e,t,i){return q`<button class="switch" role="switch" aria-checked=${e?"true":"false"} aria-label=${t}
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
    </div>`}};Br.styles=[ue,s`
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
    `],e([de({attribute:!1})],Br.prototype,"client",void 0),e([de({attribute:!1})],Br.prototype,"hass",void 0),e([he()],Br.prototype,"_s",void 0),e([he()],Br.prototype,"_error",void 0),Br=e([pe("st-settings")],Br);let qr=class extends se{constructor(){super(...arguments),this.heading="",this.body="",this.confirmLabel="Confirm",this.danger=!1}_fire(e){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0}))}firstUpdated(){this.renderRoot.querySelector("button.primary")?.focus()}render(){return q`<div class="scrim" @click=${e=>e.target===e.currentTarget&&this._fire("cancel")}
      @keydown=${e=>"Escape"===e.key&&this._fire("cancel")}>
      <div class="dialog" role="alertdialog" aria-modal="true" aria-label=${this.heading}>
        <h2>${this.heading}</h2>
        <p>${this.body}</p>
        <div class="actions">
          <button @click=${()=>this._fire("cancel")}>Cancel</button>
          <button class="primary ${this.danger?"danger":""}" @click=${()=>this._fire("confirm")}>${this.confirmLabel}</button>
        </div>
      </div>
    </div>`}};qr.styles=[ue,s`
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
    `],e([de()],qr.prototype,"heading",void 0),e([de()],qr.prototype,"body",void 0),e([de()],qr.prototype,"confirmLabel",void 0),e([de({type:Boolean})],qr.prototype,"danger",void 0),qr=e([pe("st-confirm-dialog")],qr);let Fr=class extends se{constructor(){super(...arguments),this.rect=null,this.items=[],this.additional=()=>[],this.value="",this.emptyLabel="Nothing here",this._q="",this._active=0}get _rows(){const e=this._q.trim().toLowerCase(),t=e?this.items.filter(t=>`${t.primary} ${t.secondary??""}`.toLowerCase().includes(e)):this.items;return[...t,...this.additional(this._q.trim())]}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_onKey(e){const t=this._rows;"Escape"===e.key?this._fire("close"):"ArrowDown"===e.key?(this._active=Math.min(this._active+1,t.length-1),e.preventDefault()):"ArrowUp"===e.key?(this._active=Math.max(this._active-1,0),e.preventDefault()):"Enter"===e.key&&t[this._active]&&this._fire("pick",{id:t[this._active].id,search:this._q.trim()})}firstUpdated(){this.renderRoot.querySelector("input")?.focus()}get _position(){const e=this.rect;if(!e)return"";const t=Math.max(8,Math.min(e.left,window.innerWidth-348)),i=window.innerHeight-e.bottom;return i>=300||i>=e.top?`left:${t}px;top:${e.bottom+4}px;max-height:${Math.max(160,Math.min(380,i-12))}px`:`left:${t}px;bottom:${window.innerHeight-e.top+4}px;max-height:${Math.max(160,Math.min(380,e.top-12))}px`}render(){const e=this._rows;return q`
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
      </div>`}};Fr.styles=[ue,s`
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
    `],e([de({attribute:!1})],Fr.prototype,"rect",void 0),e([de({attribute:!1})],Fr.prototype,"items",void 0),e([de({attribute:!1})],Fr.prototype,"additional",void 0),e([de()],Fr.prototype,"value",void 0),e([de()],Fr.prototype,"emptyLabel",void 0),e([he()],Fr.prototype,"_q",void 0),e([he()],Fr.prototype,"_active",void 0),Fr=e([pe("st-picker-popup")],Fr);let Wr=class extends se{constructor(){super(...arguments),this.name="",this.error="",this._name="",this._icon="",this._shake=!1}connectedCallback(){super.connectedCallback(),this._name=this.name}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_tryClose(){this._name.trim()||this._icon.trim()?(this._shake=!0,window.setTimeout(()=>this._shake=!1,400)):this._fire("close")}_create(){this._name.trim()&&this._fire("create",{name:this._name.trim(),icon:this._icon.trim()})}firstUpdated(){this.renderRoot.querySelector("#name")?.focus()}render(){return q`<div class="scrim" @click=${e=>e.target===e.currentTarget&&this._tryClose()}
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
    </div>`}};Wr.styles=[ue,s`
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
    `],e([de()],Wr.prototype,"name",void 0),e([de()],Wr.prototype,"error",void 0),e([he()],Wr.prototype,"_name",void 0),e([he()],Wr.prototype,"_icon",void 0),e([he()],Wr.prototype,"_shake",void 0),Wr=e([pe("st-category-dialog")],Wr);const Zr="___add_new___",Gr="___none___",Yr="(max-width: 870px)";let Xr=class extends se{constructor(){super(...arguments),this.narrow=!1,this.route=void 0,this._tickets=[],this._matchIds=null,this._selected=null,this._selectedId=null,this._view="active",this._q="",this._priority="",this._label="",this._category="",this._person="",this._agentFilter="",this._filtersOpen=!1,this._compact=window.matchMedia(Yr).matches,this._scope="",this._menuOpen=!1,this._labelList=[],this._categoryList=[],this._settings=null,this._pickingLabel=null,this._picking=null,this._newCategory=null,this._removing=null,this._page="",this._creating=!1,this._error="",this._onVisible=()=>{document.hidden||this._refresh()},this._mq=window.matchMedia(Yr),this._onCompact=()=>{this._compact=this._mq.matches},this._pickerAdditional=e=>{const t=this._categoryList.some(t=>t.name.toLowerCase()===e.toLowerCase());return e&&!t?[{id:Zr+e,primary:`Add New Category '${e}'`,icon:"mdi:plus"}]:[{id:Zr,primary:"Add New Category…",icon:"mdi:plus"}]},this._labelPickerAdditional=e=>{const t=this._labelList.some(t=>t.name.toLowerCase()===e.toLowerCase());return e&&!t?[{id:Zr+e,primary:`Add New Label '${e}'`,icon:"mdi:plus"}]:[]}}get _admin(){return this.hass?.user?.is_admin??!1}recheckTheme(){const e=document.createElement("span");e.style.color="var(--card-background-color)",this.renderRoot.appendChild(e);const t=/rgba?\((\d+)[ ,]+(\d+)[ ,]+(\d+)/.exec(getComputedStyle(e).color);e.remove(),t&&this.toggleAttribute("light",(.299*+t[1]+.587*+t[2]+.114*+t[3])/255>.5)}willUpdate(e){if(e.has("hass")&&this.hass){const e=this.hass.themes;e===this._themeKey&&this.hasUpdated||(this._themeKey=e,this.updateComplete.then(()=>this.recheckTheme()))}e.has("hass")&&this.hass&&!this._client&&(this._client=new fe(this.hass),this._restoreState(),this._refresh(),this._syncFromRoute(),this._subscribe()),e.has("route")&&this._client&&this._syncFromRoute()}get _prefix(){return this.route?.prefix??"/home-desk"}_navigate(e){if(location.pathname!==e)try{history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}catch{}}async _syncFromRoute(){const e=Number((this.route?.path??"").replace(/^\//,"")),t=Number.isInteger(e)&&e>0?e:null;t!==this._selectedId&&(null===t?(this._selectedId=null,this._selected=null):await this._open(t,!1))}_subscribe(){this._client&&(this._client.subscribe(()=>this._scheduleRefresh()).then(e=>{this._unsub=e}).catch(e=>{console.warn("[home-desk] live updates unavailable, polling instead:",e),this._unsub=void 0}),window.clearInterval(this._pollTimer),this._pollTimer=window.setInterval(()=>{document.hidden||this._refresh()},2e4))}connectedCallback(){super.connectedCallback(),this._mq.addEventListener("change",this._onCompact),document.addEventListener("visibilitychange",this._onVisible),this._client&&!this._unsub&&this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._mq.removeEventListener("change",this._onCompact),document.removeEventListener("visibilitychange",this._onVisible),window.clearInterval(this._pollTimer),this._unsub?.(),this._unsub=void 0,window.clearTimeout(this._searchTimer),window.clearTimeout(this._refreshTimer)}_restoreState(){try{const e=localStorage.getItem("home-desk-view");e&&De.some(t=>t.id===e)&&(this._view=e)}catch{}}_setView(e){this._view=e,"all"===e&&(this._filtersOpen=!0);try{localStorage.setItem("home-desk-view",e)}catch{}}_scheduleRefresh(){window.clearTimeout(this._refreshTimer),this._refreshTimer=window.setTimeout(()=>{this._refresh()},300)}async _refresh(){if(this._client)try{[this._tickets,this._labelList,this._categoryList]=await Promise.all([this._client.list(),this._client.labels(),this._client.categories()]),this._admin&&(this._settings=await this._client.settings()),this._q.trim()&&await this._runSearch(),null!==this._selectedId&&await this._loadSelected(this._selectedId),this._error=""}catch(e){this._error=`Could not load tickets: ${this._message(e)}`}}async _loadSelected(e){if(this._client)try{this._selected=await this._client.get(e)}catch(e){this._selected=null,this._selectedId=null,this._navigate(this._prefix),this._error=this._message(e)}}async _runSearch(){if(!this._client)return;const e=this._q.trim();this._matchIds=e?new Set((await this._client.list(e)).map(e=>e.id)):null}_message(e){return String(e&&"object"==typeof e&&"message"in e?e.message:e)}async _act(e){if(this._client)try{this._selected=await e(this._client),this._error="",this._refresh()}catch(e){this._error=this._message(e)}}_onSearch(e){this._q=e.target.value,window.clearTimeout(this._searchTimer),this._searchTimer=window.setTimeout(()=>{this._runSearch()},250)}async _open(e,t=!0){this._selectedId=e,t&&this._navigate(`${this._prefix}/${e}`),await this._loadSelected(e)}get _pickerItems(){const e=this._picking?.ticket.category;return[...e?[{id:Gr,primary:"No Category",icon:"mdi:shape-outline"}]:[],...this._categoryList.map(e=>({id:e.id,primary:e.name,icon:e.icon||"mdi:tag-outline"}))]}get _labelPickerItems(){const e=new Set(this._pickingLabel?.ticket.labels??[]);return this._labelList.filter(t=>!e.has(t.id)).map(e=>({id:e.id,primary:e.name,icon:e.icon||"mdi:label-outline",...e.description?{secondary:e.description}:{}}))}async _labelPicked({id:e}){const t=this._pickingLabel;if(this._pickingLabel=null,!t||!this._client)return;const i=e.startsWith(Zr)?e.slice(13):e;try{await this._client.update(t.ticket.id,{labels:[...t.ticket.labels,i]}),this._error="",this._refresh()}catch(e){this._error=this._message(e)}}async _picked({id:e}){const t=this._picking;this._picking=null,t&&(e.startsWith(Zr)?this._newCategory={ticket:t.ticket,name:e.slice(13),error:""}:await this._setCategory(t.ticket,e===Gr?null:e))}async _setCategory(e,t){if(this._client)try{await this._client.update(e.id,{category:t}),this._error="",this._refresh()}catch(e){this._error=this._message(e)}}async _createCategory(e){const t=this._newCategory;if(t&&this._client)try{const i=await this._client.createCategory(e);this._newCategory=null,await this._setCategory(t.ticket,i.id)}catch(e){this._newCategory={...t,error:this._message(e)}}}async _removeLabel(){const e=this._removing;if(this._removing=null,e&&this._client)try{await this._client.update(e.ticket.id,{labels:e.ticket.labels.filter(t=>t!==e.label.id)}),this._error="",this._refresh()}catch(e){this._error=this._message(e)}}_close(){this._selectedId=null,this._selected=null,this._navigate(this._prefix)}async _create(e){if(this._client)try{const t=await this._client.create(e);this._creating=!1,this._setView("active"),this._selected=t,this._open(t.id),this._refresh()}catch(e){this._error=this._message(e)}}get _filters(){return{view:this._view,scope:this._scope,category:this._category,priority:this._priority,label:this._label,person:this._person,agent:this._agentFilter}}get _filtered(){return function(e,t,i){const r=De.find(e=>e.id===t.view)??De[0];return e.filter(e=>r.match(e)&&("all"!==r.id||!t.scope||He.find(e=>e.id===t.scope).match(e))&&(!i||i.has(e.id))&&(!t.priority||e.priority===t.priority)&&(!t.label||e.labels.includes(t.label))&&(!t.person||e.requester===t.person)&&(!t.agent||Se(e.assignee??"")===("with"===t.agent))&&(!t.category||("none"===t.category?!e.category:e.category===t.category)))}(this._tickets,this._filters,this._matchIds)}get _filterCount(){return function(e){return[e.category,e.priority,e.label,e.person,e.agent,"all"===e.view?e.scope:""].filter(Boolean).length}(this._filters)}get _agentName(){const e=this._settings?.agent;return`ai:${(e?String(this.hass.states?.[e]?.attributes.friendly_name??""):"").replace(/\s*(AI Task|conversation|agent)\s*$/i,"").trim()||"Claude"}`}get _people(){const e=new Map;for(const[t,i]of Object.entries(this.hass?.states??{})){if(!t.startsWith("person."))continue;const r=String(i.attributes.friendly_name??t.slice(7)),o=i.attributes.entity_picture;e.set(r.toLowerCase(),{name:r,..."string"==typeof o&&o?{picture:o}:{}})}return e}get _labelMap(){return new Map(this._labelList.map(e=>[e.id,e]))}render(){if(!this.hass)return W;const e=this.hass.language,t=null!==this._selectedId;return q`
      <header>
        <div class="bar">
          <div class="side ${this._page?"wide":""}">
            ${this._page?q`<button class="icon" title="Back" aria-label="Back" @click=${()=>this._page=""}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
                  <h1 class="crumb">${{labels:"Labels",categories:"Categories",settings:"Settings"}[this._page]}</h1>`:q`${this.narrow?q`<button class="icon" title="Menu" @click=${()=>this.dispatchEvent(new CustomEvent("hass-toggle-menu",{bubbles:!0,composed:!0}))}><ha-icon icon="mdi:menu"></ha-icon></button>`:W}
                <h1><svg class="mark" viewBox="0 0 86.2 86.2" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M84.15 19.86 84.66 19.10 85.07 18.28 85.36 17.41 85.47 16.97 85.59 16.06 85.59 15.14 85.47 14.23 85.36 13.79 85.07 12.92 84.66 12.10 84.42 11.71 83.86 10.98 83.22 10.34 82.86 10.05 82.10 9.54 81.28 9.13 80.41 8.84 79.51 8.66 79.06 8.61 78.60 8.60 77.69 8.66 76.79 8.84 75.92 9.13 75.10 9.54 74.34 10.05 73.98 10.34 57.89 26.41 65.19 32.80 65.76 33.34 66.20 33.82 66.84 34.65 67.32 35.43 67.77 36.33 83.55 20.55ZM35.60 12.37 34.89 12.03 34.15 11.78 33.38 11.62 32.60 11.57 32.21 11.59 31.43 11.69 31.05 11.78 30.31 12.03 29.60 12.37 28.95 12.81 2.65 35.81 2.09 36.36 1.84 36.67 1.41 37.32 1.22 37.67 0.92 38.39 0.72 39.15 0.61 39.93 0.60 40.32 0.61 71.99 0.72 72.77 0.92 73.53 1.22 74.25 1.61 74.93 2.09 75.56 2.64 76.11 3.27 76.59 3.95 76.98 4.67 77.28 5.05 77.40 5.82 77.55 6.60 77.60 58.99 77.59 59.77 77.48 60.53 77.28 61.25 76.98 61.93 76.59 62.56 76.11 63.11 75.56 63.59 74.93 63.98 74.25 64.28 73.53 64.40 73.15 64.55 72.38 64.60 71.60 64.60 40.32 64.55 39.55 37.55 66.55 36.86 67.15 36.10 67.66 35.28 68.07 34.41 68.36 33.97 68.47 33.06 68.59 32.14 68.59 31.23 68.47 30.79 68.36 29.92 68.07 29.10 67.66 28.34 67.15 27.98 66.86 11.65 50.55 11.34 50.22 10.78 49.49 10.32 48.70 9.97 47.85 9.73 46.97 9.66 46.51 9.60 45.60 9.66 44.69 9.84 43.79 10.13 42.92 10.54 42.10 11.05 41.34 11.65 40.65 12.34 40.05 13.10 39.54 13.92 39.13 14.79 38.84 15.69 38.66 16.60 38.60 17.51 38.66 18.41 38.84 18.85 38.97 19.70 39.32 20.49 39.78 21.22 40.34 32.60 51.70 55.05 29.25 36.55 13.06 35.93 12.58Z"/></svg><span>Home Desk</span></h1>`}
          </div>
          ${this._page?q`<div class="tabs"></div>`:q`<div class="tabs" role="tablist">
            ${De.map(e=>q`<button class="tab ${e.id===this._view?"active":""}" role="tab" title=${e.label} aria-label=${e.label}
                aria-selected=${e.id===this._view} @click=${()=>this._setView(e.id)}>
                <ha-icon .icon=${e.icon}></ha-icon><span class="tab-text">${e.label}</span>${e.count?q`<span class="count">${this._tickets.filter(e.match).length}</span>`:W}
              </button>`)}
          </div>`}
          <div class="side end">
          ${this._admin?q`<button class="icon" title="Settings" aria-label="Settings" @click=${()=>this._page="settings"}><ha-icon icon="mdi:cog-outline"></ha-icon></button>`:W}
          <button class="icon" title="More options" aria-label="More options" aria-haspopup="menu" aria-expanded=${this._menuOpen} @click=${()=>this._menuOpen=!this._menuOpen}><ha-icon icon="mdi:dots-vertical"></ha-icon></button>
          ${this._menuOpen?q`<button class="menu-backdrop" aria-label="Close menu" @click=${()=>this._menuOpen=!1}></button>
                <div class="menu-popover" role="menu">
                  <button role="menuitem" @click=${()=>{this._menuOpen=!1,this._refresh()}}><ha-icon icon="mdi:refresh"></ha-icon>Refresh</button>
                  ${this._admin?q`<button role="menuitem" @click=${()=>{this._menuOpen=!1,this._page="labels"}}><ha-icon icon="mdi:label-multiple-outline"></ha-icon>Manage Labels</button>
                        <button role="menuitem" @click=${()=>{this._menuOpen=!1,this._page="categories"}}><ha-icon icon="mdi:shape-outline"></ha-icon>Manage Categories</button>`:W}
                </div>`:W}
          </div>
        </div>
      </header>
      ${this._error?q`<div class="banner">${this._error}</div>`:W}
      ${"labels"===this._page&&this._client?q`<st-label-manager .client=${this._client} .labels=${this._labelList}
            @labels-changed=${()=>{this._refresh()}}></st-label-manager>`:"categories"===this._page&&this._client?q`<st-category-manager .client=${this._client} .categories=${this._categoryList}
              @categories-changed=${()=>{this._refresh()}}></st-category-manager>`:"settings"===this._page&&this._client?q`<st-settings .client=${this._client} .hass=${this.hass}
                @settings-changed=${e=>this._settings=e.detail}></st-settings>`:q`<main class=${t?"has-selection":""}>
        <div class="list-pane">
          <div class="toolbar ${this._filtersOpen?"joined":""}">
            <span class="add-slot">
              <button class="icon add-btn" title="New Ticket" aria-label="New Ticket" @click=${()=>this._creating=!0}>
                <ha-icon icon="mdi:plus"></ha-icon><span class="words">New Ticket</span>
              </button>
            </span>
            <div class="search">
              <ha-icon icon="mdi:magnify"></ha-icon>
              <input type="search" placeholder="Search tickets" aria-label="Search tickets" .value=${this._q} @input=${this._onSearch} />
            </div>
            <button class="icon filter-btn ${this._filterCount?"on":""}" title="Filters" aria-label="Filters" aria-expanded=${this._filtersOpen}
              @click=${()=>this._filtersOpen=!this._filtersOpen}>
              <ha-icon icon="mdi:filter-variant"></ha-icon>${this._filterCount?q`<span class="dot"></span>`:W}
            </button>
          </div>
          ${this._filtersOpen?q`<div class="filters">
                ${"all"===this._view?q`<st-dropdown label="Show" .options=${je} .value=${this._scope}
                      @change=${e=>this._scope=e.detail}></st-dropdown>`:W}
                <st-dropdown label="Category" placeholder="Category" .options=${r=this._categoryList,[{id:"",label:"Any Category"},{id:"none",label:"No Category"},...r.map(e=>({id:e.id,label:e.name}))]} .value=${this._category}
                  @change=${e=>this._category=e.detail}></st-dropdown>
                <st-dropdown label="Raised By" placeholder="Raised By" .options=${function(e,t){const i=[...new Set(e.map(e=>e.requester).filter(Boolean))].sort();return t&&!i.includes(t)&&i.push(t),[{id:"",label:"Anyone"},...i.map(e=>({id:e,label:Ce(e)}))]}(this._tickets,this._person)} .value=${this._person}
                  @change=${e=>this._person=e.detail}></st-dropdown>
                <st-dropdown label="AI Agent" placeholder="AI Agent" .options=${[{id:"",label:"Any AI Agent"},{id:"with",label:"With AI Agent"},{id:"without",label:"Not with AI Agent"}]} .value=${this._agentFilter}
                  @change=${e=>this._agentFilter=e.detail}></st-dropdown>
                <st-dropdown label="Priority" placeholder="Priority" .options=${[{id:"",label:"Any Priority"},...me.map(e=>({id:e,label:ke[e]}))]} .value=${this._priority}
                  @change=${e=>this._priority=e.detail}></st-dropdown>
                <st-dropdown label="Label" placeholder="Label" .options=${i=this._labelList,[{id:"",label:"Any Label"},...i.map(e=>({id:e.id,label:e.name}))]} .value=${this._label}
                  @change=${e=>this._label=e.detail}></st-dropdown>
              </div>`:W}
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
    `;var i,r}};Xr.styles=[ue,ge],e([de({attribute:!1})],Xr.prototype,"hass",void 0),e([de({type:Boolean})],Xr.prototype,"narrow",void 0),e([de({attribute:!1})],Xr.prototype,"route",void 0),e([he()],Xr.prototype,"_tickets",void 0),e([he()],Xr.prototype,"_matchIds",void 0),e([he()],Xr.prototype,"_selected",void 0),e([he()],Xr.prototype,"_selectedId",void 0),e([he()],Xr.prototype,"_view",void 0),e([he()],Xr.prototype,"_q",void 0),e([he()],Xr.prototype,"_priority",void 0),e([he()],Xr.prototype,"_label",void 0),e([he()],Xr.prototype,"_category",void 0),e([he()],Xr.prototype,"_person",void 0),e([he()],Xr.prototype,"_agentFilter",void 0),e([he()],Xr.prototype,"_filtersOpen",void 0),e([he()],Xr.prototype,"_compact",void 0),e([he()],Xr.prototype,"_scope",void 0),e([he()],Xr.prototype,"_menuOpen",void 0),e([he()],Xr.prototype,"_labelList",void 0),e([he()],Xr.prototype,"_categoryList",void 0),e([he()],Xr.prototype,"_settings",void 0),e([he()],Xr.prototype,"_pickingLabel",void 0),e([he()],Xr.prototype,"_picking",void 0),e([he()],Xr.prototype,"_newCategory",void 0),e([he()],Xr.prototype,"_removing",void 0),e([he()],Xr.prototype,"_page",void 0),e([he()],Xr.prototype,"_creating",void 0),e([he()],Xr.prototype,"_error",void 0),Xr=e([pe("home-desk-panel")],Xr)}();
