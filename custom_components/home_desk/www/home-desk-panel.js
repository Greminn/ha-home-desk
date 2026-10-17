/*! home-desk-panel v0.1.0 | MIT */
!function(){"use strict";function e(e,t,i,s){var o,r=arguments.length,n=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(n=(r<3?o(n):r>3?o(t,i,n):o(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let r=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(t,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new r(i,e,s)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,m=g.trustedTypes,f=m?m.emptyScript:"",b=g.reactiveElementPolyfillSupport,v=(e,t)=>e,x={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},y=(e,t)=>!l(e,t),_={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=_){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&c(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:o}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const r=s?.call(this);o?.call(this,t),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{if(i)e.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,e.appendChild(s)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:x).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:x;this._$Em=s;const r=o.fromAttribute(t,e.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(e,t,i,s=!1,o){if(void 0!==e){const r=this.constructor;if(!1===s&&(o=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??y)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==o||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[v("elementProperties")]=new Map,k[v("finalized")]=new Map,b?.({ReactiveElement:k}),(g.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,$=e=>e,A=w.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+T,E=`<${z}>`,R=document,L=()=>R.createComment(""),M=e=>null===e||"object"!=typeof e&&"function"!=typeof e,N=Array.isArray,O="[ \t\n\f\r]",I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,D=/>/g,U=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,H=/"/g,B=/^(?:script|style|textarea|title)$/i,q=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),F=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),Z=new WeakMap,G=R.createTreeWalker(R,129);function V(e,t){if(!N(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}let Y=class e{constructor({strings:t,_$litType$:i},s){let o;this.parts=[];let r=0,n=0;const a=t.length-1,l=this.parts,[c,d]=((e,t)=>{const i=e.length-1,s=[];let o,r=2===t?"<svg>":3===t?"<math>":"",n=I;for(let t=0;t<i;t++){const i=e[t];let a,l,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,l=n.exec(i),null!==l);)d=n.lastIndex,n===I?"!--"===l[1]?n=P:void 0!==l[1]?n=D:void 0!==l[2]?(B.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=U):void 0!==l[3]&&(n=U):n===U?">"===l[0]?(n=o??I,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?U:'"'===l[3]?H:j):n===H||n===j?n=U:n===P||n===D?n=I:(n=U,o=void 0);const h=n===U&&e[t+1].startsWith("/>")?" ":"";r+=n===I?i+E:c>=0?(s.push(a),i.slice(0,c)+C+i.slice(c)+T+h):i+T+(-2===c?t:h)}return[V(e,r+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]})(t,i);if(this.el=e.createElement(c,s),G.currentNode=this.el.content,2===i||3===i){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=G.nextNode())&&l.length<a;){if(1===o.nodeType){if(o.hasAttributes())for(const e of o.getAttributeNames())if(e.endsWith(C)){const t=d[n++],i=o.getAttribute(e).split(T),s=/([.?@])?(.*)/.exec(t);l.push({type:1,index:r,name:s[2],strings:i,ctor:"."===s[1]?ee:"?"===s[1]?te:"@"===s[1]?ie:J}),o.removeAttribute(e)}else e.startsWith(T)&&(l.push({type:6,index:r}),o.removeAttribute(e));if(B.test(o.tagName)){const e=o.textContent.split(T),t=e.length-1;if(t>0){o.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],L()),G.nextNode(),l.push({type:2,index:++r});o.append(e[t],L())}}}else if(8===o.nodeType)if(o.data===z)l.push({type:2,index:r});else{let e=-1;for(;-1!==(e=o.data.indexOf(T,e+1));)l.push({type:7,index:r}),e+=T.length-1}r++}}static createElement(e,t){const i=R.createElement("template");return i.innerHTML=e,i}};function X(e,t,i=e,s){if(t===F)return t;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const r=M(t)?void 0:t._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(e),o._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(t=X(e,o._$AS(e,t.values),o,s)),t}class K{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??R).importNode(t,!0);G.currentNode=s;let o=G.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let t;2===a.type?t=new Q(o,o.nextSibling,this,e):1===a.type?t=new a.ctor(o,a.name,a.strings,this,e):6===a.type&&(t=new se(o,this,e)),this._$AV.push(t),a=i[++n]}r!==a?.index&&(o=G.nextNode(),r++)}return G.currentNode=R,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}let Q=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),M(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==F&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>N(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&M(this._$AH)?this._$AA.nextSibling.data=e:this.T(R.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Y.createElement(V(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new K(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=Z.get(e.strings);return void 0===t&&Z.set(e.strings,t=new Y(e)),t}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,o=0;for(const r of t)o===i.length?i.push(s=new e(this.O(L()),this.O(L()),this,this.options)):s=i[o],s._$AI(r),o++;o<i.length&&(this._$AR(s&&s._$AB.nextSibling,o),i.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}};class J{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,s){const o=this.strings;let r=!1;if(void 0===o)e=X(this,e,t,0),r=!M(e)||e!==this._$AH&&e!==F,r&&(this._$AH=e);else{const s=e;let n,a;for(e=o[0],n=0;n<o.length-1;n++)a=X(this,s[i+n],t,n),a===F&&(a=this._$AH[n]),r||=!M(a)||a!==this._$AH[n],a===W?e=W:e!==W&&(e+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!s&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}let ee=class extends J{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}},te=class extends J{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}},ie=class extends J{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??W)===F)return;const i=this._$AH,s=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}};class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const oe=w.litHtmlPolyfillSupport;oe?.(Y,Q),(w.litHtmlVersions??=[]).push("3.3.3");const re=globalThis;let ne=class extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let o=s._$litPart$;if(void 0===o){const e=i?.renderBefore??null;s._$litPart$=o=new Q(t.insertBefore(L(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}};ne._$litElement$=!0,ne.finalized=!0,re.litElementHydrateSupport?.({LitElement:ne});const ae=re.litElementPolyfillSupport;ae?.({LitElement:ne}),(re.litElementVersions??=[]).push("4.2.2");const le={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:y},ce=(e=le,t,i)=>{const{kind:s,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),"accessor"===s){const{name:s}=i;return{set(i){const o=t.get.call(this);t.set.call(this,i),this.requestUpdate(s,o,e,!0,i)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];t.call(this,i),this.requestUpdate(s,o,e,!0,i)}}throw Error("Unsupported decorator location: "+s)};function de(e){return(t,i)=>"object"==typeof i?ce(e,t,i):((e,t,i)=>{const s=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),s?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function he(e){return de({...e,state:!0,attribute:!1})}const pe=e=>(t,i)=>{const s=()=>{customElements.get(e)?console.info(`home-desk: <${e}> already defined — reload the page to pick up the updated panel.`):customElements.define(e,t)};void 0!==i?i.addInitializer(s):s()},ue=n`
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
`;class me{constructor(e){this.hass=e}send(e,t={}){return this.hass.connection.sendMessagePromise({type:`home_desk/${e}`,...t})}async list(e){return(await this.send("list",{status:"all",...e?{q:e}:{}})).tickets}async categories(){try{return(await this.send("categories")).categories}catch{return[]}}createCategory(e){return this.send("category_create",e)}updateCategory(e,t){return this.send("category_update",{category_id:e,...t})}deleteCategory(e){return this.send("category_delete",{category_id:e})}async settings(){try{return await this.send("settings")}catch{return{auto_close:"7d",agent:"",repairs:!0,stt:"",transcribe:!0,notify:{targets:[],new_ticket:!0,comment:!0,resolved:!1}}}}saveSettings(e){return this.send("settings_save",e)}async labels(){return(await this.send("labels")).labels}createLabel(e){return this.send("label_create",e)}updateLabel(e,t){return this.send("label_update",{label_id:e,...t})}deleteLabel(e){return this.send("label_delete",{label_id:e})}get(e){return this.send("get",{ticket_id:e})}create(e){return this.send("create",{...e})}update(e,t){return this.send("update",{ticket_id:e,...t})}markRead(e){return this.send("mark_read",e?{ticket_ids:e}:{})}merge(e,t){return this.send("merge",{ticket_id:e,merge_ids:t})}comment(e,t,i){return this.send("comment",{ticket_id:e,body:t,internal:i})}close(e,t,i){return this.send("close",{ticket_id:e,resolution:t,status:i})}async report(e){if(!this.hass.fetchWithAuth)throw new Error("This page can't send files");const t=await this.hass.fetchWithAuth("/api/home_desk/report",{method:"POST",body:e}),i=await t.json().catch(()=>({}));if(!t.ok)throw new Error(i.message||`The report couldn't be sent (${t.status})`);return i}async attachmentUrl(e,t){const i=`/api/home_desk/attachment/${e}/${t}`;if(!this.hass.callWS)return i;const{path:s}=await this.hass.callWS({type:"auth/sign_path",path:i,expires:3600});return s}subscribe(e){return this.hass.connection.subscribeEvents(e,"home_desk_event")}}const fe={new:"New",open:"In Progress",in_progress:"In Progress",resolved:"Resolved",closed:"Closed"},be={new:"mdi:circle-outline",open:"mdi:circle-slice-4",in_progress:"mdi:circle-slice-4",resolved:"mdi:check-circle-outline",closed:"mdi:close-circle-outline"},ve={new:"var(--success-color, #43a047)",open:"var(--primary-color)",in_progress:"var(--primary-color)",resolved:"var(--purple-color, #926bc7)",closed:"var(--secondary-text-color)"},xe={low:"Low",normal:"Normal",high:"High",urgent:"Urgent"},ye=[["year",31536e3],["month",2592e3],["day",86400],["hour",3600],["minute",60]];function _e(e,t){const i=(new Date(e).getTime()-Date.now())/1e3,s=new Intl.RelativeTimeFormat(t,{numeric:"auto"});for(const[e,t]of ye)if(Math.abs(i)>=t)return s.format(Math.round(i/t),e);return s.format(0,"second")}function ke(e){const t=e.toLowerCase();return t.startsWith("ai:")||t.includes("claude")}function we(e){if(ke(e))return"mdi:star-four-points-outline";const t=e.toLowerCase();return"ha"===t||"home assistant"===t?"mdi:home-assistant":"mdi:account-outline"}function $e(e){const t=e.replace(/^ai:/i,"");return t===t.toLowerCase()?t.charAt(0).toUpperCase()+t.slice(1):t}const Ae={primary:"#03a9f4",accent:"#ff9800",red:"#f44336",pink:"#e91e63",purple:"#926bc7","deep-purple":"#6e41ab",indigo:"#3f51b5",blue:"#2196f3","light-blue":"#03a9f4",cyan:"#00bcd4",teal:"#009688",green:"#4caf50","light-green":"#8bc34a",lime:"#cddc39",yellow:"#ffeb3b",amber:"#ffc107",orange:"#ff9800","deep-orange":"#ff6f22",brown:"#795548","light-grey":"#bdbdbd",grey:"#9e9e9e","dark-grey":"#606060","blue-grey":"#607d8b",black:"#000000",white:"#ffffff"};function Se(e){return"primary"===e?"var(--primary-color, #03a9f4)":"accent"===e?"var(--accent-color, #ff9800)":`var(--${e}-color, ${Ae[e]??"#9e9e9e"})`}function Ce(e){const t=e.trim();let i=/^#([0-9a-f]{3})$/i.exec(t);return i?[...i[1]].map(e=>parseInt(e+e,16)):(i=/^#([0-9a-f]{6})/i.exec(t),i?[0,2,4].map(e=>parseInt(i[1].slice(e,e+2),16)):(i=/^rgba?\(\s*(\d+)[ ,]+(\d+)[ ,]+(\d+)/i.exec(t),i?[Number(i[1]),Number(i[2]),Number(i[3])]:null))}function Te(e){const t=e.replace(/-/g," ");return t.charAt(0).toUpperCase()+t.slice(1)}function ze(e,t){return e.get(t)??{id:t,name:t,color:"grey",description:"",icon:"",builtin:!1,count:0}}function Ee(e){return ke(e)?`AI Agent (${$e(e)})`:$e(e)}const Re={created:"opened this",comment:"commented",note:"added a note",status:"changed the status",priority:"changed the priority",assignee:"changed the assignee",field:"edited it",link:"linked a ticket",merge:"merged a ticket",attachment:"added a file"},Le=["low","normal","high","urgent"],Me=["primary","accent","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","light-grey","grey","dark-grey","blue-grey","black","white"],Ne=["new","open","in_progress"],Oe="blocked",Ie=e=>e.labels.includes("history"),Pe=e=>Ne.includes(e.status)&&!Ie(e),De=e=>e.labels.includes("enhancement"),Ue=[{id:"active",icon:"mdi:inbox-outline",label:"Inbox",count:!0,match:e=>"new"===e.status&&!Ie(e)&&!De(e)},{id:"progress",icon:"mdi:progress-wrench",label:"In Progress",count:!0,match:e=>("in_progress"===e.status||"open"===e.status)&&!Ie(e)},{id:"agent",icon:"mdi:star-four-points-outline",label:"Assigned to AI",count:!0,match:e=>Pe(e)&&ke(e.assignee??"")},{id:"enhancements",icon:"mdi:lightbulb-outline",label:"Enhancements",count:!0,match:e=>Pe(e)&&De(e)},{id:"all",icon:"mdi:format-list-bulleted",label:"All",match:()=>!0}],je=[{id:"",label:"Everything",match:e=>!Ie(e)},{id:"active",label:"Open",match:Pe},{id:"closed",label:"Closed",match:e=>("resolved"===e.status||"closed"===e.status)&&!Ie(e)},{id:"history",label:"History",match:Ie}],He=je.map(({id:e,label:t})=>({id:e,label:t}));function Be(e){return[e.category,e.priority,e.label,e.person,"all"===e.view?e.scope:""].filter(Boolean).length}let qe=class extends ne{constructor(){super(...arguments),this.categoryMap=new Map,this.labelMap=new Map,this.isAdmin=!1,this.maxBadges=4,this.coloured=!1,this.expanded=!1,this.show="all"}_pickCategory(e,t){e.stopPropagation(),e.preventDefault(),this.dispatchEvent(new CustomEvent("pick-category",{detail:{ticket:t,rect:e.currentTarget.getBoundingClientRect()},bubbles:!0,composed:!0}))}_category(e){const t=e.category?this.categoryMap.get(e.category):void 0,i=t=>this._pickCategory(t,e),s=t=>("Enter"===t.key||" "===t.key)&&this._pickCategory(t,e);if(!t&&!this.isAdmin)return W;const o=t?q`<ha-icon .icon=${t.icon||"mdi:tag-outline"}></ha-icon>${t.name}`:q`<ha-icon icon="mdi:plus"></ha-icon>Add Category`;return this.isAdmin?q`<span class="category clickable ${t?"":"none"}" role="button" tabindex="0" aria-haspopup="listbox"
          aria-label=${t?`Category: ${t.name}. Change`:"Add Category"} @click=${i} @keydown=${s}>${o}</span>`:q`<span class="category">${o}</span>`}_askRemove(e,t,i){e.stopPropagation(),e.preventDefault(),this.dispatchEvent(new CustomEvent("remove-label",{detail:{ticket:t,label:i},bubbles:!0,composed:!0}))}_badges(e){const t=e.labels.filter(e=>"home-assistant"!==e).map(e=>ze(this.labelMap,e));return q`${t.slice(0,this.maxBadges).map(t=>q`<span class="badge" role=${this.isAdmin?"group":"img"} aria-label=${t.name}
        style="--label-color: ${Se(t.color)}; --label-fg: ${function(e){let t=null;try{const i="primary"===e?"--primary-color":"accent"===e?"--accent-color":`--${e}-color`;t=Ce(getComputedStyle(document.documentElement).getPropertyValue(i))}catch{}t??(t=Ce(Ae[e]??"#9e9e9e")??[158,158,158]);const i=(([e,t,i])=>{const[s,o,r]=[e,t,i].map(e=>{const t=e/255;return t<=.03928?t/12.92:((t+.055)/1.055)**2.4});return.2126*s+.7152*o+.0722*r})(t);return(i+.05)/.05>=1.05/(i+.05)?"#000000":"#ffffff"}(t.color)}"><ha-icon .icon=${t.icon||"mdi:label-outline"}></ha-icon><span class="name">${t.name}</span>${this.isAdmin?q`<span class="x" role="button" tabindex="0" aria-label="Remove ${t.name} from this ticket"
              @click=${i=>this._askRemove(i,e,t)}
              @keydown=${i=>("Enter"===i.key||" "===i.key)&&this._askRemove(i,e,t)}><ha-icon icon="mdi:close"></ha-icon></span>`:W}</span>`)}${t.length>this.maxBadges?q`<span class="more-labels">+${t.length-this.maxBadges}</span>`:W}`}render(){const e=this.ticket;return q`${"labels"!==this.show?this._category(e):W}${"category"!==this.show?q`${this._badges(e)}<slot></slot>`:W}`}};qe.styles=[ue,n`
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
    `],e([de({attribute:!1})],qe.prototype,"ticket",void 0),e([de({attribute:!1})],qe.prototype,"categoryMap",void 0),e([de({attribute:!1})],qe.prototype,"labelMap",void 0),e([de({type:Boolean})],qe.prototype,"isAdmin",void 0),e([de({type:Number})],qe.prototype,"maxBadges",void 0),e([de({type:Boolean,reflect:!0})],qe.prototype,"coloured",void 0),e([de({type:Boolean,reflect:!0})],qe.prototype,"expanded",void 0),e([de()],qe.prototype,"show",void 0),qe=e([pe("st-ticket-tags")],qe);let Fe=class extends ne{constructor(){super(...arguments),this.tickets=[],this.selectedId=null,this.language=void 0,this.isAdmin=!1,this.categoryMap=new Map,this.labelMap=new Map,this.checked=new Set,this.ticking=!1,this._pressed=!1}_toggle(e,t=!1){this.dispatchEvent(new CustomEvent("toggle-check",{detail:{id:e,range:t},bubbles:!0,composed:!0}))}_pressStart(e){this.isAdmin&&(this._pressed=!1,window.clearTimeout(this._pressTimer),this._pressTimer=window.setTimeout(()=>{this._pressed=!0,this._toggle(e)},500))}_pressEnd(){window.clearTimeout(this._pressTimer)}_rowClick(e,t){this._pressed?this._pressed=!1:this.isAdmin&&(this.ticking||t.shiftKey||t.ctrlKey||t.metaKey)?this._toggle(e,t.shiftKey):this._select(e)}_select(e){this.dispatchEvent(new CustomEvent("select-ticket",{detail:e,bubbles:!0,composed:!0}))}_filterPerson(e,t){e.stopPropagation(),e.preventDefault(),this.dispatchEvent(new CustomEvent("filter-person",{detail:t,bubbles:!0,composed:!0}))}render(){return this.tickets.length?q`${this.tickets.map(e=>{const t="resolved"===e.status||"closed"===e.status;return q`
        <button
          class="row s-${e.status} ${t?"done":""} ${e.id===this.selectedId?"selected":""} ${this.checked.has(e.id)?"checked":""} ${this.ticking?"ticking":""} ${e.unread?"unread":""}"
          @click=${t=>this._rowClick(e.id,t)}
          @pointerdown=${t=>"touch"===t.pointerType&&this._pressStart(e.id)}
          @pointerup=${()=>this._pressEnd()}
          @pointercancel=${()=>this._pressEnd()}
          @pointermove=${()=>this._pressEnd()}
        >
          ${this.isAdmin?q`<span class="lead ${this.checked.has(e.id)?"on":""}" role="checkbox" aria-checked=${this.checked.has(e.id)} aria-label="Select #${e.id}"
                @click=${t=>{t.stopPropagation(),this._toggle(e.id,t.shiftKey)}}>
                <ha-icon class="state" .icon=${be[e.status]} aria-label=${fe[e.status]}></ha-icon>
                <ha-icon class="box" .icon=${this.checked.has(e.id)?"mdi:checkbox-marked":"mdi:checkbox-blank-outline"}></ha-icon>
              </span>`:q`<ha-icon class="state" .icon=${be[e.status]} role="img" aria-label=${fe[e.status]}></ha-icon>`}
          <div class="body">
            <div class="title">${e.title}</div>
            <div class="meta">
              <span class="ref">Opened ${_e(e.created_at,this.language)} by <span class="who" role="button" tabindex="0" aria-label="Show tickets from ${$e(e.requester)}"
                @click=${t=>this._filterPerson(t,e.requester)}
                @keydown=${t=>("Enter"===t.key||" "===t.key)&&this._filterPerson(t,e.requester)}><ha-icon icon=${we(e.requester)}></ha-icon> ${$e(e.requester)}</span></span>
              ${e.unread&&e.activity&&"created"!==e.activity.kind?q`<span class="activity"><ha-icon icon=${we(e.activity.actor)}></ha-icon> ${$e(e.activity.actor)} ${i=e.activity.kind,Re[i]??"updated it"} ${_e(e.activity.at,this.language)}</span>`:e.updated_by?q`<span>Updated ${_e(e.updated_at,this.language)} by <ha-icon icon=${we(e.updated_by)}></ha-icon> ${$e(e.updated_by)}</span>`:W}
              ${e.assignee&&ke(e.assignee)?q`<span><ha-icon icon=${we(e.assignee)}></ha-icon> With AI Agent</span>`:W}
              ${e.labels.includes(Oe)?q`<span class="blocked" title="Waiting on a person, a part or a fix"><ha-icon icon="mdi:timer-sand"></ha-icon> Blocked</span>`:W}
              ${e.comment_count?q`<span><ha-icon icon="mdi:comment-outline"></ha-icon> ${e.comment_count}</span>`:W}
              ${e.attachment_count?q`<span title="Photos and voice messages"><ha-icon icon="mdi:paperclip"></ha-icon> ${e.attachment_count}</span>`:W}
            </div>
            <div class="meta2"><st-ticket-tags .ticket=${e} .categoryMap=${this.categoryMap} .labelMap=${this.labelMap} .isAdmin=${this.isAdmin}></st-ticket-tags></div>
          </div>
          ${"urgent"===e.priority||"high"===e.priority?q`<ha-icon class="prio ${e.priority}" .icon=${"urgent"===e.priority?"mdi:alert":"mdi:alert-outline"}
                role="img" aria-label="${xe[e.priority]} priority"></ha-icon>`:q`<span></span>`}
        </button>
      `;var i})}`:q`<div class="empty">No tickets here.</div>`}};Fe.styles=[ue,n`
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
      /* Unread: a dot in the left margin, a bolder title, and what changed in the accent colour. */
      .row.unread::after {
        content: "";
        position: absolute;
        left: 5px;
        top: 20px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--st-accent);
      }
      .row.unread .title {
        font-weight: 600;
      }
      .meta .activity {
        color: var(--st-accent);
        font-weight: 500;
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
      /* Admins: the state icon turns into a checkbox on hover, and always while ticking tickets. */
      .lead {
        position: relative;
        width: 32px;
        height: 24px;
        margin: -1px 0 0 4px;
        padding: 0;
        border: none;
        background: none;
        cursor: inherit;
        color: inherit;
      }
      .lead .state,
      .lead .box {
        position: absolute;
        left: 0;
        top: 0;
        margin: 0;
      }
      .lead .box {
        --mdc-icon-size: 24px;
        display: none;
        color: var(--st-fg-secondary);
      }
      .lead.on .box {
        color: var(--st-accent);
      }
      .ticking .lead .state,
      .row:hover .lead .state,
      .lead.on .state {
        display: none;
      }
      .ticking .lead .box,
      .row:hover .lead .box,
      .lead.on .box {
        display: block;
      }
      .row.checked {
        background: color-mix(in srgb, var(--st-accent) 12%, transparent);
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
      .meta > span {
        display: inline-flex;
        align-items: center;
        gap: 3px;
      }
      .meta ha-icon {
        --mdc-icon-size: 14px;
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
    `],e([de({attribute:!1})],Fe.prototype,"tickets",void 0),e([de({type:Number})],Fe.prototype,"selectedId",void 0),e([de()],Fe.prototype,"language",void 0),e([de({type:Boolean})],Fe.prototype,"isAdmin",void 0),e([de({attribute:!1})],Fe.prototype,"categoryMap",void 0),e([de({attribute:!1})],Fe.prototype,"labelMap",void 0),e([de({attribute:!1})],Fe.prototype,"checked",void 0),e([de({type:Boolean})],Fe.prototype,"ticking",void 0),Fe=e([pe("st-ticket-list")],Fe);const We=2;class Ze{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}class Ge extends Ze{constructor(e){if(super(e),this.it=W,e.type!==We)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===W||null==e)return this._t=void 0,this.it=e;if(e===F)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}Ge.directiveName="unsafeHTML",Ge.resultType=1;const Ve=(e=>(...t)=>({_$litDirective$:e,values:t}))(Ge);let Ye=class extends ne{constructor(){super(...arguments),this.options=[],this.value="",this.label="",this.placeholder="",this.plain=!1,this.up=!1,this._open=!1}_pick(e){this._open=!1,e!==this.value&&this.dispatchEvent(new CustomEvent("change",{detail:e,bubbles:!0,composed:!0}))}render(){const e=this.options.find(e=>e.id===this.value)??this.options[0];return q`
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
    `}};Ye.styles=[ue,n`
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
    `],e([de({attribute:!1})],Ye.prototype,"options",void 0),e([de()],Ye.prototype,"value",void 0),e([de()],Ye.prototype,"label",void 0),e([de()],Ye.prototype,"placeholder",void 0),e([de({type:Boolean})],Ye.prototype,"plain",void 0),e([de({type:Boolean,reflect:!0})],Ye.prototype,"up",void 0),e([he()],Ye.prototype,"_open",void 0),Ye=e([pe("st-dropdown")],Ye);const Xe=16e3;async function Ke(e){try{const t=await createImageBitmap(e,{imageOrientation:"from-image"}),i=Math.min(1,1600/Math.max(t.width,t.height)),s=document.createElement("canvas");s.width=Math.max(1,Math.round(t.width*i)),s.height=Math.max(1,Math.round(t.height*i));const o=s.getContext("2d");if(!o)return e;o.drawImage(t,0,0,s.width,s.height),t.close();const r=await new Promise(e=>s.toBlob(e,"image/jpeg",.85));return r&&r.size<e.size||i<1&&r?r:e}catch{return e}}function Qe(e,t){const i=t===Xe?e:function(e,t,i){const s=t/i,o=new Float32Array(Math.floor(e.length/s));for(let t=0;t<o.length;t++){const i=Math.floor(t*s),r=Math.min(e.length,Math.max(i+1,Math.floor((t+1)*s)));let n=0;for(let t=i;t<r;t++)n+=e[t];o[t]=n/(r-i)}return o}(e,t,Xe),s=new ArrayBuffer(44+2*i.length),o=new DataView(s),r=(e,t)=>[...t].forEach((t,i)=>o.setUint8(e+i,t.charCodeAt(0)));return r(0,"RIFF"),o.setUint32(4,36+2*i.length,!0),r(8,"WAVE"),r(12,"fmt "),o.setUint32(16,16,!0),o.setUint16(20,1,!0),o.setUint16(22,1,!0),o.setUint32(24,Xe,!0),o.setUint32(28,32e3,!0),o.setUint16(32,2,!0),o.setUint16(34,16,!0),r(36,"data"),o.setUint32(40,2*i.length,!0),i.forEach((e,t)=>o.setInt16(44+2*t,32767*Math.max(-1,Math.min(1,e)),!0)),new Blob([s],{type:"audio/wav"})}const Je=e=>`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`;let et=class extends ne{constructor(){super(...arguments),this.ticketId=0,this.items=[],this._urls={},this._open="",this._signedFor=""}willUpdate(){const e=`${this.ticketId}:${this.items.map(e=>e.id).join(",")}`;if(e===this._signedFor||!this.client)return;this._signedFor=e,this._urls={};const t=this.ticketId;for(const e of this.items)this.client.attachmentUrl(t,e.id).then(i=>{t===this.ticketId&&(this._urls={...this._urls,[e.id]:i})}).catch(()=>{})}render(){const e=this.items.filter(e=>"image"===e.kind),t=this.items.filter(e=>"audio"===e.kind);return e.length||t.length?q`
      ${e.length?q`<div class="photos">
            ${e.map(e=>this._urls[e.id]?q`<button title=${e.name} aria-label=${`Open ${e.name}`} @click=${()=>this._open=e.id}>
                    <img src=${this._urls[e.id]} alt=${e.name} loading="lazy" />
                  </button>`:W)}
          </div>`:W}
      ${t.map(e=>q`<div class="voice">
          <ha-icon icon="mdi:microphone-outline"></ha-icon>
          ${this._urls[e.id]?q`<audio controls preload="none" src=${this._urls[e.id]}></audio>`:W}
          ${e.seconds?q`<span class="length">${Je(e.seconds)}</span>`:W}
        </div>`)}
      ${this._open&&this._urls[this._open]?q`<div class="lightbox" @click=${()=>this._open=""}>
            <img src=${this._urls[this._open]} alt="" />
            <button class="icon" aria-label="Close" @click=${()=>this._open=""}><ha-icon icon="mdi:close"></ha-icon></button>
          </div>`:W}
    `:W}};
/*! @license DOMPurify 3.4.17 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.17/LICENSE */
function tt(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,s=Array(t);i<t;i++)s[i]=e[i];return s}
/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
function it(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var i=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=i){var s,o,r,n,a=[],l=!0,c=!1;try{if(r=(i=i.call(e)).next,0===t);else for(;!(l=(s=r.call(i)).done)&&(a.push(s.value),a.length!==t);l=!0);}catch(e){c=!0,o=e}finally{try{if(!l&&null!=i.return&&(n=i.return(),Object(n)!==n))return}finally{if(c)throw o}}return a}}(e,t)||function(e,t){if(e){if("string"==typeof e)return tt(e,t);var i={}.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?tt(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}et.styles=[ue,n`
      :host {
        display: block;
      }
      .photos {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
        gap: 8px;
      }
      .photos button {
        display: block;
        padding: 0;
        height: auto;
        aspect-ratio: 1;
        overflow: hidden;
        border-radius: var(--st-r-control);
        background: var(--st-bg);
      }
      .photos img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .voice {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 8px;
      }
      .photos + .voice {
        margin-top: 12px;
      }
      .voice ha-icon {
        --mdc-icon-size: 20px;
        flex: none;
        color: var(--st-fg-secondary);
      }
      .voice audio {
        flex: 1;
        min-width: 0;
        height: 36px;
      }
      .voice .length {
        flex: none;
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
      }
      .lightbox {
        position: fixed;
        inset: 0;
        z-index: 20;
        display: flex;
        align-items: center;
        justify-content: center;
        background: color-mix(in srgb, #000 80%, transparent);
      }
      .lightbox img {
        max-width: 96vw;
        max-height: 92vh;
        object-fit: contain;
      }
      .lightbox button {
        position: absolute;
        top: 12px;
        right: 12px;
        color: #fff;
      }
    `],e([de({attribute:!1})],et.prototype,"client",void 0),e([de({type:Number})],et.prototype,"ticketId",void 0),e([de({attribute:!1})],et.prototype,"items",void 0),e([he()],et.prototype,"_urls",void 0),e([he()],et.prototype,"_open",void 0),et=e([pe("st-ticket-attachments")],et);const st=Object.entries,ot=Object.setPrototypeOf,rt=Object.isFrozen,nt=Object.getPrototypeOf,at=Object.getOwnPropertyDescriptor;let lt=Object.freeze,ct=Object.seal,dt=Object.create,ht="undefined"!=typeof Reflect&&Reflect,pt=ht.apply,ut=ht.construct;lt||(lt=function(e){return e}),ct||(ct=function(e){return e}),pt||(pt=function(e,t){for(var i=arguments.length,s=new Array(i>2?i-2:0),o=2;o<i;o++)s[o-2]=arguments[o];return e.apply(t,s)}),ut||(ut=function(e){for(var t=arguments.length,i=new Array(t>1?t-1:0),s=1;s<t;s++)i[s-1]=arguments[s];return new e(...i)});const gt=Dt(Array.prototype.forEach),mt=Dt(Array.prototype.lastIndexOf),ft=Dt(Array.prototype.pop),bt=Dt(Array.prototype.push),vt=Dt(Array.prototype.slice),xt=Dt(Array.prototype.splice),yt=Array.isArray,_t=Ut(Set),kt=Dt(Set.prototype.add),wt=Dt(Set.prototype.has),$t=Dt(String.prototype.toLowerCase),At=Dt(String.prototype.toString),St=Dt(String.prototype.match),Ct=Dt(String.prototype.replace),Tt=Dt(String.prototype.indexOf),zt=Dt(String.prototype.trim),Et=Dt(Number.prototype.toString),Rt=Dt(Boolean.prototype.toString),Lt="undefined"==typeof BigInt?null:Dt(BigInt.prototype.toString),Mt="undefined"==typeof Symbol?null:Dt(Symbol.prototype.toString),Nt=Dt(Object.prototype.hasOwnProperty),Ot=Dt(Object.prototype.toString),It=Dt(RegExp.prototype.test),Pt=Ut(TypeError);function Dt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var i=arguments.length,s=new Array(i>1?i-1:0),o=1;o<i;o++)s[o-1]=arguments[o];return pt(e,t,s)}}function Ut(e){return function(){for(var t=arguments.length,i=new Array(t),s=0;s<t;s++)i[s]=arguments[s];return ut(e,i)}}function jt(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:$t;if(ot&&ot(e,null),!yt(t))return e;let s=t.length;for(;s--;){let o=t[s];if("string"==typeof o){const e=i(o);e!==o&&(rt(t)||(t[s]=e),o=e)}e[o]=!0}return e}function Ht(e){for(let t=0;t<e.length;t++)Nt(e,t)||(e[t]=null);return e}function Bt(e){const t=dt(null);for(const s of st(e)){var i=it(s,2);const o=i[0],r=i[1];Nt(e,o)&&(yt(r)?t[o]=Ht(r):r&&"object"==typeof r&&r.constructor===Object?t[o]=Bt(r):t[o]=r)}return t}function qt(e,t){for(;null!==e;){const i=at(e,t);if(i){if(i.get)return Dt(i.get);if("function"==typeof i.value)return Dt(i.value)}e=nt(e)}return function(){return null}}const Ft=lt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Wt=lt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Zt=lt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Gt=lt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Vt=lt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Yt=lt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Xt=lt(["#text"]),Kt=lt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Qt=lt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Jt=lt(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ei=lt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),ti=ct(/{{[\w\W]*|^[\w\W]*}}/g),ii=ct(/<%[\w\W]*|^[\w\W]*%>/g),si=ct(/\${[\w\W]*/g),oi=ct(/^data-[\-\w.\u00B7-\uFFFF]+$/),ri=ct(/^aria-[\-\w]+$/),ni=ct(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ai=ct(/^(?:\w+script|data):/i),li=ct(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ci=ct(/^html$/i),di=ct(/^[a-z][.\w]*(-[.\w]+)+$/i),hi=ct(/<[/\w!]/g),pi=ct(/<[/\w]/g),ui=ct(/<\/no(script|embed|frames)/i),gi=ct(/\/>/i),mi=1,fi=3,bi=7,vi=8,xi=9,yi=11,_i=lt(jt({},["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"])),ki=function(){return"undefined"==typeof window?null:window},wi=function(e,t,i,s){return Nt(e,t)&&yt(e[t])?jt(s.base?Bt(s.base):{},e[t],s.transform):i},$i=function(e,t,i){const s=Nt(e,t)?e[t]:void 0;return s&&"object"==typeof s?Bt(s):i()};var Ai=function e(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ki();const i=t=>e(t);if(i.version="3.4.17",i.removed=[],!t||!t.document||t.document.nodeType!==xi||!t.Element)return i.isSupported=!1,i;let s=t.document;const o=s,r=o.currentScript;t.DocumentFragment;const n=t.HTMLTemplateElement,a=t.Node,l=t.Element,c=t.NodeFilter;void 0===t.NamedNodeMap&&(t.NamedNodeMap||t.MozNamedAttrMap),t.HTMLFormElement;const d=t.DOMParser,h=t.trustedTypes,p=l.prototype,u=qt(p,"cloneNode"),g=qt(p,"remove"),m=qt(p,"removeAttributeNode"),f=qt(p,"nextSibling"),b=qt(p,"childNodes"),v=qt(p,"parentNode"),x=qt(p,"shadowRoot"),y=qt(p,"attributes"),_=a&&a.prototype?qt(a.prototype,"nodeType"):null,k=a&&a.prototype?qt(a.prototype,"nodeName"):null,w=a&&a.prototype?qt(a.prototype,"ownerDocument"):null,$=function(e){return _?_(e):e.nodeType},A=function(e){return k?k(e):e.nodeName},S=function(e,t){for(;null!==e;){const i=at(e,t);if(i)return i.get?Dt(i.get):null;e=nt(e)}return null}(p,"namespaceURI"),C=function(e){return S?S(e):e.namespaceURI};if("function"==typeof n){const e=s.createElement("template");e.content&&e.content.ownerDocument&&(s=e.content.ownerDocument)}let T,z,E="",R=!1,L=0;const M=function(){if(L>0)throw Pt('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},N=function(e){M(),L++;try{return T.createHTML(e)}finally{L--}},O=function(){return R||(z=function(e,t){if("object"!=typeof e||"function"!=typeof e.createPolicy)return null;let i=null;const s="data-tt-policy-suffix";t&&t.hasAttribute(s)&&(i=t.getAttribute(s));const o="dompurify"+(i?"#"+i:"");try{return e.createPolicy(o,{createHTML:e=>e,createScriptURL:e=>e})}catch(e){return console.warn("TrustedTypes policy "+o+" could not be created."),null}}(h,r),R=!0),z},I=s,P=I.implementation,D=I.createNodeIterator,U=I.createDocumentFragment,j=I.getElementsByTagName,H=o.importNode;let B={afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]};i.isSupported="function"==typeof st&&"function"==typeof v&&P&&void 0!==P.createHTMLDocument;const q=ti,F=ii,W=si,Z=oi,G=ri,V=ai,Y=li,X=di;let K=ni,Q=null;const J=jt({},[...Ft,...Wt,...Zt,...Vt,...Xt]);let ee=null;const te=jt({},[...Kt,...Qt,...Jt,...ei]);let ie=Object.seal(dt(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),se=null,oe=null;const re=Object.seal(dt(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let ne=!0,ae=!0,le=!1,ce=!0,de=!1,he=!0,pe=!1,ue=!1,ge=null,me=null,fe=!1,be=!1,ve=!1,xe=!1,ye=!0,_e=!1;const ke="user-content-";let we=!0,$e=!1,Ae=null,Se={},Ce=null;const Te=jt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let ze=null;const Ee=jt({},["audio","video","img","source","image","track"]);let Re=null;const Le=jt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Me="http://www.w3.org/1998/Math/MathML",Ne="http://www.w3.org/2000/svg",Oe="http://www.w3.org/1999/xhtml";let Ie=Oe,Pe=!1,De=null;const Ue=jt({},[Me,Ne,Oe],At),je=lt(["mi","mo","mn","ms","mtext"]);let He=jt({},je);const Be=lt(["annotation-xml"]);let qe=jt({},Be);const Fe=jt({},["title","style","font","a","script"]);let We=null;const Ze=["application/xhtml+xml","text/html"];let Ge=null,Ve=null;const Ye=s.createElement("form"),Xe=function(e){return e instanceof RegExp||e instanceof Function},Ke=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(Ve&&Ve===e)return;e&&"object"==typeof e||(e={}),e=Bt(e),We=-1===Ze.indexOf(e.PARSER_MEDIA_TYPE)?"text/html":e.PARSER_MEDIA_TYPE,Ge="application/xhtml+xml"===We?At:$t,Q=wi(e,"ALLOWED_TAGS",J,{transform:Ge}),ee=wi(e,"ALLOWED_ATTR",te,{transform:Ge}),De=wi(e,"ALLOWED_NAMESPACES",Ue,{transform:At}),Re=wi(e,"ADD_URI_SAFE_ATTR",Le,{transform:Ge,base:Le}),ze=wi(e,"ADD_DATA_URI_TAGS",Ee,{transform:Ge,base:Ee}),Ce=wi(e,"FORBID_CONTENTS",Te,{transform:Ge}),se=wi(e,"FORBID_TAGS",Bt({}),{transform:Ge}),oe=wi(e,"FORBID_ATTR",Bt({}),{transform:Ge}),Se=!!Nt(e,"USE_PROFILES")&&(e.USE_PROFILES&&"object"==typeof e.USE_PROFILES?Bt(e.USE_PROFILES):e.USE_PROFILES),ne=!1!==e.ALLOW_ARIA_ATTR,ae=!1!==e.ALLOW_DATA_ATTR,le=e.ALLOW_UNKNOWN_PROTOCOLS||!1,ce=!1!==e.ALLOW_SELF_CLOSE_IN_ATTR,de=e.SAFE_FOR_TEMPLATES||!1,he=!1!==e.SAFE_FOR_XML,pe=e.WHOLE_DOCUMENT||!1,be=e.RETURN_DOM||!1,ve=e.RETURN_DOM_FRAGMENT||!1,xe=e.RETURN_TRUSTED_TYPE||!1,fe=e.FORCE_BODY||!1,ye=!1!==e.SANITIZE_DOM,_e=e.SANITIZE_NAMED_PROPS||!1,we=!1!==e.KEEP_CONTENT,$e=e.IN_PLACE||!1,K=function(e){try{return It(e,""),!0}catch(e){return!1}}(e.ALLOWED_URI_REGEXP)?e.ALLOWED_URI_REGEXP:ni,Ie="string"==typeof e.NAMESPACE?e.NAMESPACE:Oe,He=$i(e,"MATHML_TEXT_INTEGRATION_POINTS",()=>jt({},je)),qe=$i(e,"HTML_INTEGRATION_POINTS",()=>jt({},Be));const t=$i(e,"CUSTOM_ELEMENT_HANDLING",()=>dt(null));if(ie=dt(null),Nt(t,"tagNameCheck")&&Xe(t.tagNameCheck)&&(ie.tagNameCheck=t.tagNameCheck),Nt(t,"attributeNameCheck")&&Xe(t.attributeNameCheck)&&(ie.attributeNameCheck=t.attributeNameCheck),Nt(t,"allowCustomizedBuiltInElements")&&"boolean"==typeof t.allowCustomizedBuiltInElements&&(ie.allowCustomizedBuiltInElements=t.allowCustomizedBuiltInElements),ct(ie),de&&(ae=!1),ve&&(be=!0),Se&&(Q=jt({},Xt),ee=dt(null),!0===Se.html&&(jt(Q,Ft),jt(ee,Kt)),!0===Se.svg&&(jt(Q,Wt),jt(ee,Qt),jt(ee,ei)),!0===Se.svgFilters&&(jt(Q,Zt),jt(ee,Qt),jt(ee,ei)),!0===Se.mathMl&&(jt(Q,Vt),jt(ee,Jt),jt(ee,ei))),re.tagCheck=null,re.attributeCheck=null,Nt(e,"ADD_TAGS")&&("function"==typeof e.ADD_TAGS?re.tagCheck=e.ADD_TAGS:yt(e.ADD_TAGS)&&(Q===J&&(Q=Bt(Q)),jt(Q,e.ADD_TAGS,Ge))),Nt(e,"ADD_ATTR")&&("function"==typeof e.ADD_ATTR?re.attributeCheck=e.ADD_ATTR:yt(e.ADD_ATTR)&&(ee===te&&(ee=Bt(ee)),jt(ee,e.ADD_ATTR,Ge))),Nt(e,"ADD_FORBID_CONTENTS")&&yt(e.ADD_FORBID_CONTENTS)&&(Ce===Te&&(Ce=Bt(Ce)),jt(Ce,e.ADD_FORBID_CONTENTS,Ge)),we&&(Q["#text"]=!0),pe&&jt(Q,["html","head","body"]),Q.table&&(jt(Q,["tbody"]),delete se.tbody),e.TRUSTED_TYPES_POLICY){if("function"!=typeof e.TRUSTED_TYPES_POLICY.createHTML)throw Pt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if("function"!=typeof e.TRUSTED_TYPES_POLICY.createScriptURL)throw Pt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const t=T;T=e.TRUSTED_TYPES_POLICY;try{E=N("")}catch(e){throw T=t,e}}else null===e.TRUSTED_TYPES_POLICY?(T=void 0,E=""):(void 0===T&&(T=O()),T&&"string"==typeof E&&(E=N("")));lt&&lt(e),Ve=e},Qe=jt({},[...Wt,...Zt,...Gt]),Je=jt({},[...Vt,...Yt]),et=function(e){const t=C(e),i=$t(A(e)),s=v(e);let o,r;return s&&$(s)===mi?(o={namespaceURI:C(s)},r=$t(A(s))):(o={namespaceURI:Ie},r="template"),!!De[t]&&(t===Ne?function(e,t,i){return t.namespaceURI===Oe?"svg"===e:t.namespaceURI===Me?"svg"===e&&("annotation-xml"===i||He[i]):Boolean(Qe[e])}(i,o,r):t===Me?function(e,t,i){return t.namespaceURI===Oe?"math"===e:t.namespaceURI===Ne?"math"===e&&qe[i]:Boolean(Je[e])}(i,o,r):t===Oe?function(e,t,i){return!(t.namespaceURI===Ne&&!qe[i])&&!(t.namespaceURI===Me&&!He[i])&&!Je[e]&&(Fe[e]||!Qe[e])}(i,o,r):!("application/xhtml+xml"!==We||!De[t]))},tt=function(e){bt(i.removed,{element:e});try{v(e).removeChild(e)}catch(t){if(g(e),!v(e))throw Pt("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},it=function(e,t,i){try{m(e,t)}catch(t){try{e.removeAttribute(i)}catch(e){}}},ot=function(e){ut(e);const t=b(e);t&&gt(vt(t),e=>{try{g(e)}catch(e){}});const i=$(e)===mi?y(e):null;if(i)for(let t=i.length-1;t>=0;--t){const s=i[t],o=s&&s.name;"string"==typeof o&&it(e,s,o)}},rt=function(e,t,s){if(!s)try{s=t.getAttributeNode(e)}catch(e){s=null}bt(i.removed,{attribute:s||null,from:t});try{s?m(t,s):t.removeAttribute(e)}catch(i){try{t.removeAttribute(e)}catch(e){}}if("is"===e)if(be||ve)try{tt(t)}catch(e){}else try{t.setAttribute(e,"")}catch(e){}},ht=function(e){const t=y(e);if(t)for(let i=t.length-1;i>=0;--i){const s=t[i],o=s&&s.name;"string"!=typeof o||ee[Ge(o)]||it(e,s,o)}},pt=function(e,t){let i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];const s=[e];for(;s.length>0;){const e=s.pop();if(!1===t(e))continue;if(i&&$(e)===mi){const t=x(e);Mi(t)&&s.push(t)}const o=b(e);if(o)for(let e=o.length-1;e>=0;--e)s.push(o[e])}},ut=function(e){pt(e,e=>{$(e)===mi&&ht(e)})},Ut=function(e){const t=[];return pt(e,e=>{t.push(e)},!0),t},Ht=function(e,t){let s=!1;return gt(i.removed,t=>{t.element&&(s=s||t.element===e,ut(t.element))}),function(e,t){const i=_t();gt(Ut(e),e=>{$(e)===mi&&kt(i,e)}),gt(t,e=>{$(e)!==mi||wt(i,e)||ht(e)})}(e,t),s},Ai=function(e,t,i,s){const o=Ti(e);let r;for(;r=o.nextNode();)wt(s,r)&&!wt(Ae,r)&&(t&&Oi(B.uponSanitizeShadowNode,r,null),Ui(r,i),Zi(r,i),Mi(r.content)&&Gi(r.content))},Si=function(e,t){return!!he&&("patchsrc"===e||"for"===e&&"label"!==t&&"output"!==t)},Ci=function(e){let t=null,i=null;if(fe)e="<remove></remove>"+e;else{const t=St(e,/^[\r\n\t ]+/);i=t&&t[0]}"application/xhtml+xml"===We&&Ie===Oe&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const o=T?N(e):e;if(Ie===Oe)try{t=(new d).parseFromString(o,We)}catch(e){}if(!t||!t.documentElement){t=P.createDocument(Ie,"template",null);try{t.documentElement.innerHTML=Pe?E:o}catch(e){}}const r=t.body||t.documentElement;return e&&i&&r.insertBefore(s.createTextNode(i),r.childNodes[0]||null),Ie===Oe?j.call(t,pe?"html":"body")[0]:pe?t.documentElement:r},Ti=function(e){const t=w?w(e):e.ownerDocument;return D.call(t||e,e,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},zi=function(e){return e=Ct(e,q," "),e=Ct(e,F," "),e=Ct(e,W," ")},Ei=function(e){var t;Ri(e);const i=null===(t=e.querySelectorAll)||void 0===t?void 0:t.call(e,"template");i&&gt(i,e=>{Mi(e.content)&&Ei(e.content)})},Ri=function(e){e.normalize();const t=w?w(e):e.ownerDocument,i=D.call(t||e,e,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null);let s=i.nextNode();for(;s;)s.data=zi(s.data),s=i.nextNode()},Li=function(e){const t=k?k(e):null;return"string"==typeof t&&("form"===Ge(t)&&("string"!=typeof e.nodeName||"string"!=typeof e.textContent||"function"!=typeof e.removeChild||e.attributes!==y(e)||"function"!=typeof e.removeAttribute||"function"!=typeof e.removeAttributeNode||"function"!=typeof e.getAttributeNode||"function"!=typeof e.setAttribute||"string"!=typeof e.namespaceURI||"function"!=typeof e.insertBefore||"function"!=typeof e.hasChildNodes||e.nodeType!==_(e)||e.childNodes!==b(e)))},Mi=function(e){if(!_||"object"!=typeof e||null===e)return!1;try{return _(e)===yi}catch(e){return!1}},Ni=function(e){if(!_||"object"!=typeof e||null===e)return!1;try{return"number"==typeof _(e)}catch(e){return!1}};function Oi(e,t,s){0!==e.length&&gt(e,e=>{e.call(i,t,s,Ve)})}const Ii=function(e,t){if(e instanceof RegExp)return It(e,t);if(e instanceof Function){for(var i=arguments.length,s=new Array(i>2?i-2:0),o=2;o<i;o++)s[o-2]=arguments[o];return Boolean(e(t,...s))}return!1},Pi=function(e,t,i,s){return 0===e.length?t:t===i||t===s?Bt(t):t},Di=function(e,t){return e!==t&&null===v(e)&&($e&&ut(e),!0)},Ui=function(e,t){var s;if(s=e,Ae&&kt(Ae,s),Oi(B.beforeSanitizeElements,e,null),Di(e,t))return!0;if(Li(e))return tt(e),!0;const o=Ge(A(e));if(Q=Pi(B.uponSanitizeElement,Q,J,ge),Oi(B.uponSanitizeElement,e,{tagName:o,allowedTags:Q}),Di(e,t))return!0;if(function(e,t){return!!(he&&e.hasChildNodes()&&!Ni(e.firstElementChild)&&It(hi,e.textContent)&&It(hi,e.innerHTML))||!!(he&&_i[t]&&$(e)===mi&&C(e)===Oe&&(Ni(e.firstElementChild)||"string"==typeof e.textContent&&It(hi,e.textContent)))||e.nodeType===bi||!(!he||e.nodeType!==vi||!It(pi,e.data))}(e,o))return tt(e),!0;if(se[o]||!(re.tagCheck instanceof Function&&re.tagCheck(o))&&!Q[o]){const i=function(e,t,i){if(!se[t]&&Bi(t)&&Ii(ie.tagNameCheck,t))return!1;if(we&&!Ce[t]&&!Ce[$t(t)]){const t=v(e),s=b(e);if(s&&t)for(let o=s.length-1;o>=0;--o){const r=e===i?u(s[o],!0):s[o];t.insertBefore(r,f(e))}}return tt(e),!0}(e,o,t);return!(!1!==i||(Oi(B.afterSanitizeElements,e,null),!Di(e,t)))||i}if($(e)===mi&&!et(e))return tt(e),!0;if(("noscript"===o||"noembed"===o||"noframes"===o)&&It(ui,e.innerHTML))return tt(e),!0;if(de&&e.nodeType===fi){const t=zi(e.textContent);e.textContent!==t&&(bt(i.removed,{element:e.cloneNode()}),e.textContent=t)}return Oi(B.afterSanitizeElements,e,null),Di(e,t)},ji=function(e,t,i){if(oe[t])return!1;if(Si(t,e))return!1;if(ye&&("id"===t||"name"===t)&&(i in s||i in Ye))return!1;const o=ee[t]||re.attributeCheck instanceof Function&&re.attributeCheck(t,e);return!(!ae||!It(Z,t))||(!(!ne||!It(G,t))||(o?!!Re[t]||(!!It(K,Ct(i,Y,""))||(!("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==Tt(i,"data:")||!ze[e])||(!(!le||It(V,Ct(i,Y,"")))||!i))):Bi(e)&&Ii(ie.tagNameCheck,e)&&Ii(ie.attributeNameCheck,t,e)||"is"===t&&ie.allowCustomizedBuiltInElements&&Ii(ie.tagNameCheck,i)))},Hi=jt({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),Bi=function(e){return!Hi[$t(e)]&&It(X,e)},qi=function(e,t,i,s){if(T&&"object"==typeof h&&"function"==typeof h.getAttributeType&&!i)switch(h.getAttributeType(e,t)){case"TrustedHTML":return N(s);case"TrustedScriptURL":return function(e){M(),L++;try{return T.createScriptURL(e)}finally{L--}}(s)}return s},Fi=function(e,t,i,s){try{return i?e.setAttributeNS(i,t,s):e.setAttribute(t,s),!Li(e)||(tt(e),!1)}catch(i){return rt(t,e),!1}},Wi=function(e,t){return!(!he||!It(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,t))||"attributename"===$t(e)&&null!==St(t,"href")},Zi=function(e,t){if(Oi(B.beforeSanitizeAttributes,e,null),Di(e,t))return;const s=e.attributes;if(!s||Li(e))return;ee=Pi(B.uponSanitizeAttribute,ee,te,me);const o={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ee,forceKeepAttr:void 0};let r=s.length;const n=Ge(e.nodeName);for(;r--;){const t=s[r],a=t.name,l=t.namespaceURI,c=t.value,d=Ge(a),h=c;let p="value"===a?h:zt(h),u=!1;o.attrName=d,o.attrValue=p,o.keepAttr=!0,o.forceKeepAttr=void 0,Oi(B.uponSanitizeAttribute,e,o),p=o.attrValue,!_e||"id"!==d&&"name"!==d||0===Tt(p,ke)||(rt(a,e,t),p=ke+p,u=!0),Wi(a,p)?rt(a,e,t):o.forceKeepAttr||(o.keepAttr&&(ce||!It(gi,p))?(de&&(p=zi(p)),ji(n,d,p)?(p=qi(n,d,l,p),p!==h&&Fi(e,a,l,p)&&u&&ft(i.removed)):rt(a,e,t)):rt(a,e,t))}Oi(B.afterSanitizeAttributes,e,null),Di(e,t)},Gi=function(e){let t=null;const i=Ti(e);for(Oi(B.beforeSanitizeShadowDOM,e,null);t=i.nextNode();)if(Oi(B.uponSanitizeShadowNode,t,null),Ui(t,e),Zi(t,e),Mi(t.content)&&Gi(t.content),$(t)===mi){const e=x(t);Mi(e)&&(Vi(e),Gi(e))}de&&Ri(e),Oi(B.afterSanitizeShadowDOM,e,null)},Vi=function(e){const t=[{node:e,shadow:null}];for(;t.length>0;){const e=t.pop();if(e.shadow){Gi(e.shadow);continue}const i=e.node,s=$(i)===mi,o=b(i);if(o)for(let e=o.length-1;e>=0;--e)t.push({node:o[e],shadow:null});if(s){const e=k?k(i):null;if("string"==typeof e&&"template"===Ge(e)){const e=i.content;Mi(e)&&t.push({node:e,shadow:null})}}if(s){const e=x(i);Mi(e)&&t.push({node:null,shadow:e},{node:e,shadow:null})}}};return i.sanitize=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},s=null,r=null,n=null,a=null;if(Pe=!e,Pe&&(e="\x3c!--\x3e"),"string"!=typeof e&&!Ni(e)&&"string"!=typeof(e=function(e){switch(typeof e){case"string":return e;case"number":return Et(e);case"boolean":return Rt(e);case"bigint":return Lt?Lt(e):"0";case"symbol":return Mt?Mt(e):"Symbol()";case"undefined":default:return Ot(e);case"function":case"object":{if(null===e)return Ot(e);const t=e,i=qt(t,"toString");if("function"==typeof i){const e=i(t);return"string"==typeof e?e:Ot(e)}return Ot(e)}}}(e)))throw Pt("dirty is not a string, aborting");if(!i.isSupported)return e;ue?(Q=ge,ee=me):Ke(t),(B.uponSanitizeElement.length>0||B.uponSanitizeAttribute.length>0)&&(Q=Bt(Q)),B.uponSanitizeAttribute.length>0&&(ee=Bt(ee)),i.removed=[];const l=$e&&"string"!=typeof e&&Ni(e);let c=[];const d=Ae;if(l){h=e,he&&pt(h,e=>{const t=$(e);if(t===bi||t===vi&&It(pi,e.data)){try{g(e)}catch(e){}return!1}if(t===mi){const t=e,i=Ge(A(e));try{t.hasAttribute&&t.hasAttribute("patchsrc")&&t.removeAttribute("patchsrc"),t.hasAttribute&&t.hasAttribute("for")&&Si("for",i)&&t.removeAttribute("for")}catch(e){}}return!0});const t=A(e);if("string"==typeof t){const i=Ge(t);if(!Q[i]||se[i])throw ot(e),Pt("root node is forbidden and cannot be sanitized in-place")}if(Li(e))throw ot(e),Pt("root node is clobbered and cannot be sanitized in-place");c=Ut(e),Ae=_t()}else if(Ni(e))s=Ci("\x3c!----\x3e"),r=s.ownerDocument.importNode(e,!0),r.nodeType===mi&&"BODY"===r.nodeName||"HTML"===r.nodeName?s=r:s.appendChild(r),Vi(s);else{if(!be&&!de&&!pe&&-1===e.indexOf("<"))return T&&xe?N(e):e;if(s=Ci(e),!s)return be?null:xe?E:""}var h;s&&fe&&tt(s.firstChild);const p=l?e:s;try{l&&Vi(e);const t=Ti(p);for(;n=t.nextNode();)Ui(n,p),Zi(n,p),Mi(n.content)&&Gi(n.content);l&&function(e,t){const i=Ae;let s=null;const o=()=>(s||(s=_t(),gt(t,e=>{kt(s,e)})),s);for(let t=0;;t++){const s=Ut(e),r=[e];let n=!1;if(gt(s,e=>{$(e)===yi?bt(r,e):n||wt(i,e)||(n=wt(o(),e))}),!n)return;if(t>=8)throw Pt("the tree kept changing during in-place sanitization; refusing to return it");gt(r,(t,i)=>{Ai(t,i>0,e,o())})}}(e,c)}catch(t){throw l&&(ot(e),Ht(e,c)),t}finally{Ae=d}if(l){if(Ht(e,c))throw Pt("a node selected for removal could not be safely returned; refusing to sanitize in place");return de&&Ei(e),e}if(be){if(de&&Ei(s),ve)for(a=U.call(s.ownerDocument);s.firstChild;)a.appendChild(s.firstChild);else a=s;return(ee.shadowroot||ee.shadowrootmode)&&(a=H.call(o,a,!0)),a}let u=pe?s.outerHTML:s.innerHTML;return pe&&Q["!doctype"]&&s.ownerDocument&&s.ownerDocument.doctype&&s.ownerDocument.doctype.name&&It(ci,s.ownerDocument.doctype.name)&&(u="<!DOCTYPE "+s.ownerDocument.doctype.name+">\n"+u),de&&(u=zi(u)),T&&xe?N(u):u},i.setConfig=function(){Ke(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}),ue=!0,ge=Q,me=ee},i.clearConfig=function(){Ve=null,ue=!1,ge=null,me=null,T=z,E=""},i.isValidAttribute=function(e,t,i){Ve||Ke({});const s=Ge(e),o=Ge(t);return("string"!=typeof i||!(Wi(t,i)||!ce&&It(gi,i)))&&ji(s,o,i)},i.addHook=function(e,t){"function"==typeof t&&Nt(B,e)&&bt(B[e],t)},i.removeHook=function(e,t){if(Nt(B,e)){if(void 0!==t){const i=mt(B[e],t);return-1===i?void 0:xt(B[e],i,1)[0]}return ft(B[e])}},i.removeHooks=function(e){Nt(B,e)&&(B[e]=[])},i.removeAllHooks=function(){B={afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},i}();function Si(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ci={async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null};function Ti(e){Ci=e}var zi={exec:()=>null};function Ei(e,t=""){let i="string"==typeof e?e:e.source,s={replace:(e,t)=>{let o="string"==typeof t?t:t.source;return o=o.replace(Li.caret,"$1"),i=i.replace(e,o),s},getRegex:()=>new RegExp(i,t)};return s}var Ri=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Li={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[\t ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Mi=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ni=/(?:[*+-]|\d{1,9}[.)])/,Oi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ii=Ei(Oi).replace(/bull/g,Ni).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Pi=Ei(Oi).replace(/bull/g,Ni).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Di=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Ui=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ji=Ei(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ui).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Hi=Ei(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ni).getRegex(),Bi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",qi=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Fi=Ei("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$))","i").replace("comment",qi).replace("tag",Bi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Wi=Ei(Di).replace("hr",Mi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Bi).getRegex(),Zi={blockquote:Ei(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Wi).getRegex(),code:/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,def:ji,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,hr:Mi,html:Fi,lheading:Ii,list:Hi,newline:/^(?:[ \t]*(?:\n|$))+/,paragraph:Wi,table:zi,text:/^[^\n]+/},Gi=Ei("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Mi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}\t)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Bi).getRegex(),Vi={...Zi,lheading:Pi,table:Gi,paragraph:Ei(Di).replace("hr",Mi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Gi).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Bi).getRegex()},Yi={...Zi,html:Ei("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",qi).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:zi,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ei(Di).replace("hr",Mi).replace("heading"," *#{1,6} *[^\n]").replace("lheading",Ii).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Xi=/^( {2,}|\\)\n(?!\s*$)/,Ki=/[\p{P}\p{S}]/u,Qi=/[\s\p{P}\p{S}]/u,Ji=/[^\s\p{P}\p{S}]/u,es=Ei(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Qi).getRegex(),ts=/(?!~)[\p{P}\p{S}]/u,is=Ei(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Ri?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ss=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,os=Ei(ss,"u").replace(/punct/g,Ki).getRegex(),rs=Ei(ss,"u").replace(/punct/g,ts).getRegex(),ns="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",as=Ei(ns,"gu").replace(/notPunctSpace/g,Ji).replace(/punctSpace/g,Qi).replace(/punct/g,Ki).getRegex(),ls=Ei(ns,"gu").replace(/notPunctSpace/g,/(?:[^\s\p{P}\p{S}]|~)/u).replace(/punctSpace/g,/(?!~)[\s\p{P}\p{S}]/u).replace(/punct/g,ts).getRegex(),cs=Ei("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ji).replace(/punctSpace/g,Qi).replace(/punct/g,Ki).getRegex(),ds=Ei(/\\(punct)/,"gu").replace(/punct/g,Ki).getRegex(),hs=Ei(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),ps=Ei(qi).replace("(?:--\x3e|$)","--\x3e").getRegex(),us=Ei("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",ps).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),gs=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,ms=Ei(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",gs).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),fs=Ei(/^!?\[(label)\]\[(ref)\]/).replace("label",gs).replace("ref",Ui).getRegex(),bs=Ei(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ui).getRegex(),vs=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,xs={_backpedal:zi,anyPunctuation:ds,autolink:hs,blockSkip:is,br:Xi,code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,del:zi,emStrongLDelim:os,emStrongRDelimAst:as,emStrongRDelimUnd:cs,escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,link:ms,nolink:bs,punctuation:es,reflink:fs,reflinkSearch:Ei("reflink|nolink(?!\\()","g").replace("reflink",fs).replace("nolink",bs).getRegex(),tag:us,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,url:zi},ys={...xs,link:Ei(/^!?\[(label)\]\((.*?)\)/).replace("label",gs).getRegex(),reflink:Ei(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",gs).getRegex()},_s={...xs,emStrongRDelimAst:ls,emStrongLDelim:rs,url:Ei(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",vs).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ei(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",vs).getRegex()},ks={..._s,br:Ei(Xi).replace("{2,}","*").getRegex(),text:Ei(_s.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ws={normal:Zi,gfm:Vi,pedantic:Yi},$s={normal:xs,gfm:_s,breaks:ks,pedantic:ys},As={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ss=e=>As[e];function Cs(e,t){if(t){if(Li.escapeTest.test(e))return e.replace(Li.escapeReplace,Ss)}else if(Li.escapeTestNoEncode.test(e))return e.replace(Li.escapeReplaceNoEncode,Ss);return e}function Ts(e){try{e=encodeURI(e).replace(Li.percentDecode,"%")}catch{return null}return e}function zs(e,t){let i=e.replace(Li.findPipe,(e,t,i)=>{let s=!1,o=t;for(;--o>=0&&"\\"===i[o];)s=!s;return s?"|":" |"}),s=i.split(Li.splitPipe),o=0;if(s[0].trim()||s.shift(),s.length>0&&!s.at(-1)?.trim()&&s.pop(),t)if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;o<s.length;o++)s[o]=s[o].trim().replace(Li.slashPipe,"|");return s}function Es(e,t,i){let s=e.length;if(0===s)return"";let o=0;for(;o<s;){if(e.charAt(s-o-1)!==t)break;o++}return e.slice(0,s-o)}function Rs(e,t,i,s,o){let r=t.href,n=t.title||null,a=e[1].replace(o.other.outputLinkReplace,"$1");s.state.inLink=!0;let l={type:"!"===e[0].charAt(0)?"image":"link",raw:i,href:r,title:n,text:a,tokens:s.inlineTokens(a)};return s.state.inLink=!1,l}var Ls=class{options;rules;lexer;constructor(e){this.options=e||Ci}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let e=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?e:Es(e,"\n")}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let e=t[0],i=function(e,t,i){let s=e.match(i.other.indentCodeCompensation);if(null===s)return t;let o=s[1];return t.split("\n").map(e=>{let t=e.match(i.other.beginningSpace);if(null===t)return e;let[s]=t;return s.length>=o.length?e.slice(o.length):e}).join("\n")}(e,t[3]||"",this.rules);return{type:"code",raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let t=Es(e,"#");(this.options.pedantic||!t||this.rules.other.endingSpaceChar.test(t))&&(e=t.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Es(t[0],"\n")}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let e=Es(t[0],"\n").split("\n"),i="",s="",o=[];for(;e.length>0;){let t,r=!1,n=[];for(t=0;t<e.length;t++)if(this.rules.other.blockquoteStart.test(e[t]))n.push(e[t]),r=!0;else{if(r)break;n.push(e[t])}e=e.slice(t);let a=n.join("\n"),l=a.replace(this.rules.other.blockquoteSetextReplace,"\n    $1").replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}\n${a}`:a,s=s?`${s}\n${l}`:l;let c=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(l,o,!0),this.lexer.state.top=c,0===e.length)break;let d=o.at(-1);if("code"===d?.type)break;if("blockquote"===d?.type){let t=d,r=t.raw+"\n"+e.join("\n"),n=this.blockquote(r);o[o.length-1]=n,i=i.substring(0,i.length-t.raw.length)+n.raw,s=s.substring(0,s.length-t.text.length)+n.text;break}if("list"===d?.type){let t=d,r=t.raw+"\n"+e.join("\n"),n=this.list(r);o[o.length-1]=n,i=i.substring(0,i.length-d.raw.length)+n.raw,s=s.substring(0,s.length-t.raw.length)+n.raw,e=r.substring(o.at(-1).raw.length).split("\n");continue}}return{type:"blockquote",raw:i,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let i=t[1].trim(),s=i.length>1,o={type:"list",raw:"",ordered:s,start:s?+i.slice(0,-1):"",loose:!1,items:[]};i=s?`\\d{1,9}\\${i.slice(-1)}`:`\\${i}`,this.options.pedantic&&(i=s?i:"[*+-]");let r=this.rules.other.listItemRegex(i),n=!1;for(;e;){let i=!1,s="",a="";if(!(t=r.exec(e))||this.rules.block.hr.test(e))break;s=t[0],e=e.substring(s.length);let l=t[2].split("\n",1)[0].replace(this.rules.other.listReplaceTabs,e=>" ".repeat(3*e.length)),c=e.split("\n",1)[0],d=!l.trim(),h=0;if(this.options.pedantic?(h=2,a=l.trimStart()):d?h=t[1].length+1:(h=t[2].search(this.rules.other.nonSpaceChar),h=h>4?1:h,a=l.slice(h),h+=t[1].length),d&&this.rules.other.blankLine.test(c)&&(s+=c+"\n",e=e.substring(c.length+1),i=!0),!i){let t=this.rules.other.nextBulletRegex(h),i=this.rules.other.hrRegex(h),o=this.rules.other.fencesBeginRegex(h),r=this.rules.other.headingBeginRegex(h),n=this.rules.other.htmlBeginRegex(h);for(;e;){let p,u=e.split("\n",1)[0];if(c=u,this.options.pedantic?(c=c.replace(this.rules.other.listReplaceNesting,"  "),p=c):p=c.replace(this.rules.other.tabCharGlobal,"    "),o.test(c)||r.test(c)||n.test(c)||t.test(c)||i.test(c))break;if(p.search(this.rules.other.nonSpaceChar)>=h||!c.trim())a+="\n"+p.slice(h);else{if(d||l.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||o.test(l)||r.test(l)||i.test(l))break;a+="\n"+c}!d&&!c.trim()&&(d=!0),s+=u+"\n",e=e.substring(u.length+1),l=p.slice(h)}}o.loose||(n?o.loose=!0:this.rules.other.doubleBlankLine.test(s)&&(n=!0));let p,u=null;this.options.gfm&&(u=this.rules.other.listIsTask.exec(a),u&&(p="[ ] "!==u[0],a=a.replace(this.rules.other.listReplaceTask,""))),o.items.push({type:"list_item",raw:s,task:!!u,checked:p,loose:!1,text:a,tokens:[]}),o.raw+=s}let a=o.items.at(-1);if(!a)return;a.raw=a.raw.trimEnd(),a.text=a.text.trimEnd(),o.raw=o.raw.trimEnd();for(let e=0;e<o.items.length;e++)if(this.lexer.state.top=!1,o.items[e].tokens=this.lexer.blockTokens(o.items[e].text,[]),!o.loose){let t=o.items[e].tokens.filter(e=>"space"===e.type),i=t.length>0&&t.some(e=>this.rules.other.anyLine.test(e.raw));o.loose=i}if(o.loose)for(let e=0;e<o.items.length;e++)o.items[e].loose=!0;return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:"pre"===t[1]||"script"===t[1]||"style"===t[1],text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let e=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:e,raw:t[0],href:i,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let i=zs(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split("\n"):[],r={type:"table",raw:t[0],header:[],align:[],rows:[]};if(i.length===s.length){for(let e of s)this.rules.other.tableAlignRight.test(e)?r.align.push("right"):this.rules.other.tableAlignCenter.test(e)?r.align.push("center"):this.rules.other.tableAlignLeft.test(e)?r.align.push("left"):r.align.push(null);for(let e=0;e<i.length;e++)r.header.push({text:i[e],tokens:this.lexer.inline(i[e]),header:!0,align:r.align[e]});for(let e of o)r.rows.push(zs(e,r.header.length).map((e,t)=>({text:e,tokens:this.lexer.inline(e),header:!1,align:r.align[t]})));return r}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:"="===t[2].charAt(0)?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let e="\n"===t[1].charAt(t[1].length-1)?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let e=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(e)){if(!this.rules.other.endAngleBracket.test(e))return;let t=Es(e.slice(0,-1),"\\");if((e.length-t.length)%2==0)return}else{let e=function(e,t){if(-1===e.indexOf(t[1]))return-1;let i=0;for(let s=0;s<e.length;s++)if("\\"===e[s])s++;else if(e[s]===t[0])i++;else if(e[s]===t[1]&&(i--,i<0))return s;return i>0?-2:-1}(t[2],"()");if(-2===e)return;if(e>-1){let i=(0===t[0].indexOf("!")?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){let e=this.rules.other.pedanticHrefTitle.exec(i);e&&(i=e[1],s=e[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(i=this.options.pedantic&&!this.rules.other.endAngleBracket.test(e)?i.slice(1):i.slice(1,-1)),Rs(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let i;if((i=this.rules.inline.reflink.exec(e))||(i=this.rules.inline.nolink.exec(e))){let e=t[(i[2]||i[1]).replace(this.rules.other.multipleSpaceGlobal," ").toLowerCase()];if(!e){let e=i[0].charAt(0);return{type:"text",raw:e,text:e}}return Rs(i,e,i[0],this.lexer,this.rules)}}emStrong(e,t,i=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!(!s||s[3]&&i.match(this.rules.other.unicodeAlphaNumeric))&&(!s[1]&&!s[2]||!i||this.rules.inline.punctuation.exec(i))){let i,o,r=[...s[0]].length-1,n=r,a=0,l="*"===s[0][0]?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(l.lastIndex=0,t=t.slice(-1*e.length+r);null!=(s=l.exec(t));){if(i=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!i)continue;if(o=[...i].length,s[3]||s[4]){n+=o;continue}if((s[5]||s[6])&&r%3&&!((r+o)%3)){a+=o;continue}if(n-=o,n>0)continue;o=Math.min(o,o+n+a);let t=[...s[0]][0].length,l=e.slice(0,r+s.index+t+o);if(Math.min(r,o)%2){let e=l.slice(1,-1);return{type:"em",raw:l,text:e,tokens:this.lexer.inlineTokens(e)}}let c=l.slice(2,-2);return{type:"strong",raw:l,text:c,tokens:this.lexer.inlineTokens(c)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(e),s=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return i&&s&&(e=e.substring(1,e.length-1)),{type:"codespan",raw:t[0],text:e}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let e,i;return"@"===t[2]?(e=t[1],i="mailto:"+e):(e=t[1],i=e),{type:"link",raw:t[0],text:e,href:i,tokens:[{type:"text",raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,i;if("@"===t[2])e=t[0],i="mailto:"+e;else{let s;do{s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??""}while(s!==t[0]);e=t[0],i="www."===t[1]?"http://"+t[0]:t[0]}return{type:"link",raw:t[0],text:e,href:i,tokens:[{type:"text",raw:e,text:e}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let e=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:e}}}},Ms=class e{tokens;options;state;tokenizer;inlineQueue;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Ci,this.options.tokenizer=this.options.tokenizer||new Ls,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:Li,block:ws.normal,inline:$s.normal};this.options.pedantic?(t.block=ws.pedantic,t.inline=$s.pedantic):this.options.gfm&&(t.block=ws.gfm,this.options.breaks?t.inline=$s.breaks:t.inline=$s.gfm),this.tokenizer.rules=t}static get rules(){return{block:ws,inline:$s}}static lex(t,i){return new e(i).lex(t)}static lexInline(t,i){return new e(i).inlineTokens(t)}lex(e){e=e.replace(Li.carriageReturn,"\n"),this.blockTokens(e,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let t=this.inlineQueue[e];this.inlineTokens(t.src,t.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],i=!1){for(this.options.pedantic&&(e=e.replace(Li.tabCharGlobal,"    ").replace(Li.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>!!(s=i.call({lexer:this},e,t))&&(e=e.substring(s.raw.length),t.push(s),!0)))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=t.at(-1);1===s.raw.length&&void 0!==i?i.raw+="\n":t.push(s);continue}if(s=this.tokenizer.code(e)){e=e.substring(s.raw.length);let i=t.at(-1);"paragraph"===i?.type||"text"===i?.type?(i.raw+=(i.raw.endsWith("\n")?"":"\n")+s.raw,i.text+="\n"+s.text,this.inlineQueue.at(-1).src=i.text):t.push(s);continue}if(s=this.tokenizer.fences(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.heading(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.hr(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.blockquote(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.list(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.html(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.def(e)){e=e.substring(s.raw.length);let i=t.at(-1);"paragraph"===i?.type||"text"===i?.type?(i.raw+=(i.raw.endsWith("\n")?"":"\n")+s.raw,i.text+="\n"+s.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},t.push(s));continue}if(s=this.tokenizer.table(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.lheading(e)){e=e.substring(s.raw.length),t.push(s);continue}let o=e;if(this.options.extensions?.startBlock){let t,i=1/0,s=e.slice(1);this.options.extensions.startBlock.forEach(e=>{t=e.call({lexer:this},s),"number"==typeof t&&t>=0&&(i=Math.min(i,t))}),i<1/0&&i>=0&&(o=e.substring(0,i+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let r=t.at(-1);i&&"paragraph"===r?.type?(r.raw+=(r.raw.endsWith("\n")?"":"\n")+s.raw,r.text+="\n"+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=r.text):t.push(s),i=o.length!==e.length,e=e.substring(s.raw.length);continue}if(s=this.tokenizer.text(e)){e=e.substring(s.raw.length);let i=t.at(-1);"text"===i?.type?(i.raw+=(i.raw.endsWith("\n")?"":"\n")+s.raw,i.text+="\n"+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):t.push(s);continue}if(e){let t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw new Error(t)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let i,s=e,o=null;if(this.tokens.links){let e=Object.keys(this.tokens.links);if(e.length>0)for(;null!=(o=this.tokenizer.rules.inline.reflinkSearch.exec(s));)e.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!=(o=this.tokenizer.rules.inline.anyPunctuation.exec(s));)s=s.slice(0,o.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;null!=(o=this.tokenizer.rules.inline.blockSkip.exec(s));)i=o[2]?o[2].length:0,s=s.slice(0,o.index+i)+"["+"a".repeat(o[0].length-i-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);s=this.options.hooks?.emStrongMask?.call({lexer:this},s)??s;let r=!1,n="";for(;e;){let i;if(r||(n=""),r=!1,this.options.extensions?.inline?.some(s=>!!(i=s.call({lexer:this},e,t))&&(e=e.substring(i.raw.length),t.push(i),!0)))continue;if(i=this.tokenizer.escape(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.tag(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.link(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(i.raw.length);let s=t.at(-1);"text"===i.type&&"text"===s?.type?(s.raw+=i.raw,s.text+=i.text):t.push(i);continue}if(i=this.tokenizer.emStrong(e,s,n)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.codespan(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.br(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.del(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.autolink(e)){e=e.substring(i.raw.length),t.push(i);continue}if(!this.state.inLink&&(i=this.tokenizer.url(e))){e=e.substring(i.raw.length),t.push(i);continue}let o=e;if(this.options.extensions?.startInline){let t,i=1/0,s=e.slice(1);this.options.extensions.startInline.forEach(e=>{t=e.call({lexer:this},s),"number"==typeof t&&t>=0&&(i=Math.min(i,t))}),i<1/0&&i>=0&&(o=e.substring(0,i+1))}if(i=this.tokenizer.inlineText(o)){e=e.substring(i.raw.length),"_"!==i.raw.slice(-1)&&(n=i.raw.slice(-1)),r=!0;let s=t.at(-1);"text"===s?.type?(s.raw+=i.raw,s.text+=i.text):t.push(i);continue}if(e){let t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw new Error(t)}}return t}},Ns=class{options;parser;constructor(e){this.options=e||Ci}space(e){return""}code({text:e,lang:t,escaped:i}){let s=(t||"").match(Li.notSpaceStart)?.[0],o=e.replace(Li.endingNewline,"")+"\n";return s?'<pre><code class="language-'+Cs(s)+'">'+(i?o:Cs(o,!0))+"</code></pre>\n":"<pre><code>"+(i?o:Cs(o,!0))+"</code></pre>\n"}blockquote({tokens:e}){return`<blockquote>\n${this.parser.parse(e)}</blockquote>\n`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>\n`}hr(e){return"<hr>\n"}list(e){let t=e.ordered,i=e.start,s="";for(let t=0;t<e.items.length;t++){let i=e.items[t];s+=this.listitem(i)}let o=t?"ol":"ul";return"<"+o+(t&&1!==i?' start="'+i+'"':"")+">\n"+s+"</"+o+">\n"}listitem(e){let t="";if(e.task){let i=this.checkbox({checked:!!e.checked});e.loose?"paragraph"===e.tokens[0]?.type?(e.tokens[0].text=i+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&"text"===e.tokens[0].tokens[0].type&&(e.tokens[0].tokens[0].text=i+" "+Cs(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):t+=i+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>\n`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>\n`}table(e){let t="",i="";for(let t=0;t<e.header.length;t++)i+=this.tablecell(e.header[t]);t+=this.tablerow({text:i});let s="";for(let t=0;t<e.rows.length;t++){let o=e.rows[t];i="";for(let e=0;e<o.length;e++)i+=this.tablecell(o[e]);s+=this.tablerow({text:i})}return s&&(s=`<tbody>${s}</tbody>`),"<table>\n<thead>\n"+t+"</thead>\n"+s+"</table>\n"}tablerow({text:e}){return`<tr>\n${e}</tr>\n`}tablecell(e){let t=this.parser.parseInline(e.tokens),i=e.header?"th":"td";return(e.align?`<${i} align="${e.align}">`:`<${i}>`)+t+`</${i}>\n`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Cs(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:i}){let s=this.parser.parseInline(i),o=Ts(e);if(null===o)return s;let r='<a href="'+(e=o)+'"';return t&&(r+=' title="'+Cs(t)+'"'),r+=">"+s+"</a>",r}image({href:e,title:t,text:i,tokens:s}){s&&(i=this.parser.parseInline(s,this.parser.textRenderer));let o=Ts(e);if(null===o)return Cs(i);let r=`<img src="${e=o}" alt="${i}"`;return t&&(r+=` title="${Cs(t)}"`),r+=">",r}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Cs(e.text)}},Os=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},Is=class e{options;renderer;textRenderer;constructor(e){this.options=e||Ci,this.options.renderer=this.options.renderer||new Ns,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Os}static parse(t,i){return new e(i).parse(t)}static parseInline(t,i){return new e(i).parseInline(t)}parse(e,t=!0){let i="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let e=o,t=this.options.extensions.renderers[e.type].call({parser:this},e);if(!1!==t||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(e.type)){i+=t||"";continue}}let r=o;switch(r.type){case"space":i+=this.renderer.space(r);continue;case"hr":i+=this.renderer.hr(r);continue;case"heading":i+=this.renderer.heading(r);continue;case"code":i+=this.renderer.code(r);continue;case"table":i+=this.renderer.table(r);continue;case"blockquote":i+=this.renderer.blockquote(r);continue;case"list":i+=this.renderer.list(r);continue;case"html":i+=this.renderer.html(r);continue;case"def":i+=this.renderer.def(r);continue;case"paragraph":i+=this.renderer.paragraph(r);continue;case"text":{let o=r,n=this.renderer.text(o);for(;s+1<e.length&&"text"===e[s+1].type;)o=e[++s],n+="\n"+this.renderer.text(o);i+=t?this.renderer.paragraph({type:"paragraph",raw:n,text:n,tokens:[{type:"text",raw:n,text:n,escaped:!0}]}):n;continue}default:{let e='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(e),"";throw new Error(e)}}}return i}parseInline(e,t=this.renderer){let i="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let e=this.options.extensions.renderers[o.type].call({parser:this},o);if(!1!==e||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){i+=e||"";continue}}let r=o;switch(r.type){case"escape":case"text":i+=t.text(r);break;case"html":i+=t.html(r);break;case"link":i+=t.link(r);break;case"image":i+=t.image(r);break;case"strong":i+=t.strong(r);break;case"em":i+=t.em(r);break;case"codespan":i+=t.codespan(r);break;case"br":i+=t.br(r);break;case"del":i+=t.del(r);break;default:{let e='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(e),"";throw new Error(e)}}}return i}},Ps=class{options;block;constructor(e){this.options=e||Ci}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ms.lex:Ms.lexInline}provideParser(){return this.block?Is.parse:Is.parseInline}},Ds=class{defaults={async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null};options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=Is;Renderer=Ns;TextRenderer=Os;Lexer=Ms;Tokenizer=Ls;Hooks=Ps;constructor(...e){this.use(...e)}walkTokens(e,t){let i=[];for(let s of e)switch(i=i.concat(t.call(this,s)),s.type){case"table":{let e=s;for(let s of e.header)i=i.concat(this.walkTokens(s.tokens,t));for(let s of e.rows)for(let e of s)i=i.concat(this.walkTokens(e.tokens,t));break}case"list":{let e=s;i=i.concat(this.walkTokens(e.items,t));break}default:{let e=s;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach(s=>{let o=e[s].flat(1/0);i=i.concat(this.walkTokens(o,t))}):e.tokens&&(i=i.concat(this.walkTokens(e.tokens,t)))}}return i}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(e=>{let i={...e};if(i.async=this.defaults.async||i.async||!1,e.extensions&&(e.extensions.forEach(e=>{if(!e.name)throw new Error("extension name required");if("renderer"in e){let i=t.renderers[e.name];t.renderers[e.name]=i?function(...t){let s=e.renderer.apply(this,t);return!1===s&&(s=i.apply(this,t)),s}:e.renderer}if("tokenizer"in e){if(!e.level||"block"!==e.level&&"inline"!==e.level)throw new Error("extension level must be 'block' or 'inline'");let i=t[e.level];i?i.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&("block"===e.level?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:"inline"===e.level&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}"childTokens"in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)}),i.extensions=t),e.renderer){let t=this.defaults.renderer||new Ns(this.defaults);for(let i in e.renderer){if(!(i in t))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let s=i,o=e.renderer[s],r=t[s];t[s]=(...e)=>{let i=o.apply(t,e);return!1===i&&(i=r.apply(t,e)),i||""}}i.renderer=t}if(e.tokenizer){let t=this.defaults.tokenizer||new Ls(this.defaults);for(let i in e.tokenizer){if(!(i in t))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let s=i,o=e.tokenizer[s],r=t[s];t[s]=(...e)=>{let i=o.apply(t,e);return!1===i&&(i=r.apply(t,e)),i}}i.tokenizer=t}if(e.hooks){let t=this.defaults.hooks||new Ps;for(let i in e.hooks){if(!(i in t))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let s=i,o=e.hooks[s],r=t[s];Ps.passThroughHooks.has(i)?t[s]=e=>{if(this.defaults.async&&Ps.passThroughHooksRespectAsync.has(i))return(async()=>{let i=await o.call(t,e);return r.call(t,i)})();let s=o.call(t,e);return r.call(t,s)}:t[s]=(...e)=>{if(this.defaults.async)return(async()=>{let i=await o.apply(t,e);return!1===i&&(i=await r.apply(t,e)),i})();let i=o.apply(t,e);return!1===i&&(i=r.apply(t,e)),i}}i.hooks=t}if(e.walkTokens){let t=this.defaults.walkTokens,s=e.walkTokens;i.walkTokens=function(e){let i=[];return i.push(s.call(this,e)),t&&(i=i.concat(t.call(this,e))),i}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ms.lex(e,t??this.defaults)}parser(e,t){return Is.parse(e,t??this.defaults)}parseMarkdown(e){return(t,i)=>{let s={...i},o={...this.defaults,...s},r=this.onError(!!o.silent,!!o.async);if(!0===this.defaults.async&&!1===s.async)return r(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||null===t)return r(new Error("marked(): input parameter is undefined or null"));if("string"!=typeof t)return r(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,s=await(o.hooks?await o.hooks.provideLexer():e?Ms.lex:Ms.lexInline)(i,o),r=o.hooks?await o.hooks.processAllTokens(s):s;o.walkTokens&&await Promise.all(this.walkTokens(r,o.walkTokens));let n=await(o.hooks?await o.hooks.provideParser():e?Is.parse:Is.parseInline)(r,o);return o.hooks?await o.hooks.postprocess(n):n})().catch(r);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?Ms.lex:Ms.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let s=(o.hooks?o.hooks.provideParser():e?Is.parse:Is.parseInline)(i,o);return o.hooks&&(s=o.hooks.postprocess(s)),s}catch(e){return r(e)}}}onError(e,t){return i=>{if(i.message+="\nPlease report this to https://github.com/markedjs/marked.",e){let e="<p>An error occurred:</p><pre>"+Cs(i.message+"",!0)+"</pre>";return t?Promise.resolve(e):e}if(t)return Promise.reject(i);throw i}}},Us=new Ds;function js(e,t){return Us.parse(e,t)}js.options=js.setOptions=function(e){return Us.setOptions(e),js.defaults=Us.defaults,Ti(js.defaults),js},js.getDefaults=Si,js.defaults=Ci,js.use=function(...e){return Us.use(...e),js.defaults=Us.defaults,Ti(js.defaults),js},js.walkTokens=function(e,t){return Us.walkTokens(e,t)},js.parseInline=Us.parseInline,js.Parser=Is,js.parser=Is.parse,js.Renderer=Ns,js.TextRenderer=Os,js.Lexer=Ms,js.lexer=Ms.lex,js.Tokenizer=Ls,js.Hooks=Ps,js.parse=js,js.options,js.setOptions,js.use,js.walkTokens,js.parseInline,Is.parse,Ms.lex;const Hs=new Ds({gfm:!0,breaks:!1});function Bs(e){const t=Hs.parse(e,{async:!1});return Ai.sanitize(t,{FORBID_TAGS:["img","picture","source","style","form","input","button","select","textarea","svg","math"]})}Hs.use({renderer:{image:({href:e,title:t,text:i})=>`<a href="${e}"${t?` title="${t}"`:""}>${i||e}</a>`}}),Ai.addHook("afterSanitizeAttributes",e=>{"A"===e.tagName&&(e.setAttribute("target","_blank"),e.setAttribute("rel","noopener noreferrer"))});let qs=class extends ne{constructor(){super(...arguments),this.ticket=null,this.seenAt="",this.me="",this.isAdmin=!1,this.narrow=!1,this.language=void 0,this.agentName="claude",this.labelMap=new Map,this.people=new Map,this.categoryMap=new Map,this._expanded=!1,this._showHistory=!1,this._descCollapsed=!1,this._descFull=0,this._descSettle=0,this._agentToggle=null,this._priorityTo="",this._comment="",this._expandDescription=()=>{this._descCollapsed&&(this._setDescCollapsed(!1),this.renderRoot.querySelector(".scroll")?.scrollTo({top:0}))},this._scrollTo=null,this._titleKey=e=>{const t=e.target;"Enter"===e.key?(e.preventDefault(),t.blur()):"Escape"===e.key&&(t.value=this.ticket?.title??t.value,t.blur())}}willUpdate(e){if(e.has("ticket")){this.toggleAttribute("open",!!this.ticket);const t=e.get("ticket"),i=t?.events.length??0;t?.id!==this.ticket?.id?(this._scrollTo="top",this._descCollapsed=!1,this._agentToggle=null,this._priorityTo="",this._expanded=!1,this._comment=""):this.ticket&&this.ticket.events.length>i&&(this._scrollTo="bottom")}}_onScroll(e){if(Date.now()<this._descSettle||this._descFull<=56)return;const t=e.currentTarget.scrollTop;!this._descCollapsed&&t>4?this._setDescCollapsed(!0):this._descCollapsed&&t<=0&&this._setDescCollapsed(!1)}_setDescCollapsed(e){this._descCollapsed=e,this._descSettle=Date.now()+400}_fitTitle(e){e.style.height="auto",e.style.height=`${e.scrollHeight+(e.offsetHeight-e.clientHeight)}px`}_saveTitle(e){const t=e.value.replace(/\s+/g," ").trim();t&&t!==this.ticket?.title?this._patch({title:t}):e.value=this.ticket?.title??"",this._fitTitle(e)}connectedCallback(){super.connectedCallback(),this._resizer=new ResizeObserver(()=>{const e=this.renderRoot.querySelector("textarea.title-edit");e&&this._fitTitle(e)}),this._resizer.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._resizer?.disconnect()}updated(){const e=this.renderRoot.querySelector("textarea.title-edit");if(e&&this._fitTitle(e),!this._descCollapsed){const e=this.renderRoot.querySelector(".desc-sticky .card");this._descFull=e?e.offsetHeight:0}if(this._scrollTo){const e=this.renderRoot.querySelector(".scroll"),t=this._scrollTo;this._scrollTo=null,e?.scrollTo({top:"top"===t?0:e.scrollHeight,behavior:"top"===t?"auto":"smooth"})}}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_patch(e){this._fire("patch-ticket",e)}_addLabelControl(e){return q`<button class="add-label" title="Add Label" aria-label="Add Label" aria-haspopup="listbox"
      @click=${t=>this.dispatchEvent(new CustomEvent("pick-label",{detail:{ticket:e,rect:t.currentTarget.getBoundingClientRect()},bubbles:!0,composed:!0}))}><ha-icon icon="mdi:plus"></ha-icon></button>`}_shownPriority(e){return this._priorityTo||e.priority}_togglePriority(e,t){const i=this._shownPriority(e)===t?"normal":t;this._priorityTo=i===e.priority?"":i}_priorityPills(e){const t=this._shownPriority(e),i={high:"mdi:alert-outline",urgent:"mdi:alert"};return q`<div class="assign prio-group" role="group" aria-label="Priority">
      ${["high","urgent"].map(s=>{const o=t===s;return q`<button class="prio-dot ${s} ${o?"on":""}"
          aria-pressed=${o?"true":"false"} aria-label=${xe[s]}
          title=${o?`Priority is ${xe[s]}. Click to clear.`:`Set priority to ${xe[s]}`}
          @click=${()=>this._togglePriority(e,s)}><ha-icon .icon=${i[s]}></ha-icon></button>`})}
    </div>`}_withAgent(e){return!!e.assignee&&ke(e.assignee)}_agentDefault(e){if(this._withAgent(e)||"resolved"===e.status||"closed"===e.status)return!1;const t=[...e.events].reverse().find(e=>"comment"===e.kind||"note"===e.kind);return!!t&&ke(t.actor)}_agentOn(e){return this._agentToggle??(this._withAgent(e)||this._agentDefault(e))}_agentApplies(e){return this._agentOn(e)!==this._withAgent(e)&&(null!==this._agentToggle||!!this._comment.trim())}_canSubmit(e){return!!this._comment.trim()||this._agentApplies(e)||!!this._priorityTo}_agentChip(e){const t=this._agentOn(e),i=this._withAgent(e);return q`<button class="assign-chip ${i&&t?"current":""} ${t&&!i?"picked":""} ${i&&!t?"dropping":""}"
      aria-pressed=${t?"true":"false"} aria-label="Assign to AI Agent" title=${i?t?"With the AI Agent. Click to take it back.":"Will be taken back from the AI Agent. Click to keep it with them.":t?"Will be assigned to the AI Agent. Click to switch off.":"Assign to the AI Agent"}
      @click=${()=>this._agentToggle=!t}><ha-icon icon="mdi:creation"></ha-icon><span><span class="verb">Assign to </span>AI Agent</span></button>`}_submitLabel(e){const t=this._agentApplies(e),i=this._agentOn(e)?"Assign to AI Agent":"Unassign from AI Agent";return this._comment.trim()?t?`Comment and ${i}`:"Comment":t&&this._priorityTo?"Update":t?i:this._priorityTo?"Set Priority":"Comment"}_commentAndReopen(){const e=this._comment.trim();e&&(this._fire("comment",{body:e,internal:!1}),this._comment="",this._patch({status:"in_progress"}))}_submitComment(){const e=this.ticket;if(!e||!this._canSubmit(e))return;const t=this._comment.trim();t&&this._fire("comment",{body:t,internal:!1});const i={};this._agentApplies(e)&&(i.assignee=this._agentOn(e)?this.agentName:null),this._priorityTo&&(i.priority=this._priorityTo),Object.keys(i).length&&this._patch(i),this._comment="",this._agentToggle=null,this._priorityTo=""}_resolve(){const e=this._comment.trim();e?(this._fire("close-ticket",{resolution:e,status:"resolved"}),this._comment=""):this._patch({status:"resolved"})}_change(e){const t=e.data??{},i=e=>Array.isArray(e)?e.map(e=>"labels"===t.field?ze(this.labelMap,String(e)).name:String(e)).join(", ")||"none":null==e||""===e?"none":String(e);switch(e.kind){case"created":return"created this ticket";case"status":return`changed status from ${fe[t.from]??i(t.from)} to ${fe[t.to]??i(t.to)}`;case"priority":return`changed priority from ${i(t.from)} to ${i(t.to)}`;case"assignee":return t.to?`assigned this to ${i(t.to)}`:"unassigned this";case"link":return`linked ticket #${String(t.to)}`;case"merge":return t.from?`merged ticket #${String(t.from)} into this one`:`merged this into ticket #${String(t.into)}`;case"attachment":return`added ${String(t.to)}`;case"field":return"description"===t.field?"edited the description":`changed ${String(t.field)}${"labels"===t.field||"entities"===t.field?` to ${i(t.to)}`:""}`;default:return e.kind}}_detail(e){const t=e.data??{},i=e=>Array.isArray(e)?e.map(e=>"labels"===t.field?ze(this.labelMap,String(e)).name:String(e)).join(", ")||"none":null==e||""===e?"none":String(e);switch(e.kind){case"created":return{field:"Ticket Opened",to:"",icon:"mdi:ticket-outline",tone:"var(--st-accent)"};case"status":return{field:"Status",from:fe[t.from]??i(t.from),to:fe[t.to]??i(t.to),icon:"mdi:progress-check",tone:"resolved"===t.to||"closed"===t.to?"var(--st-success)":"var(--st-accent)"};case"priority":return{field:"Priority",from:i(t.from),to:i(t.to),icon:"mdi:flag-outline",tone:"var(--st-warning)"};case"assignee":return{field:"Assignee",from:i(t.from),to:i(t.to),icon:"mdi:account-outline",tone:"var(--st-fg-secondary)"};case"link":return{field:"Linked",to:`ticket #${String(t.to)}`,icon:"mdi:link-variant",tone:"var(--st-fg-secondary)"};case"merge":{const t=e.data??{};return t.from?{field:"Merged",to:`ticket #${t.from} into this one`,icon:"mdi:call-merge",tone:"var(--st-fg-secondary)"}:{field:"Merged",to:`into ticket #${String(t.into)}`,icon:"mdi:call-merge",tone:"var(--st-fg-secondary)"}}case"attachment":return{field:"Added",to:String(t.to),icon:"mdi:paperclip",tone:"var(--st-fg-secondary)"};case"field":{const e=String(t.field??"field"),s=e.charAt(0).toUpperCase()+e.slice(1),o="labels"===e?"mdi:label-outline":"category"===e?"mdi:shape-outline":"mdi:pencil-outline";return"description"===e?{field:s,to:"edited",icon:o,tone:"var(--st-fg-secondary)"}:{field:s,from:i(t.from),to:i(t.to),icon:o,tone:"var(--st-fg-secondary)"}}default:return{field:e.kind,to:"",icon:"mdi:circle-small",tone:"var(--st-fg-secondary)"}}}_avatar(e){const t=ke(e)?void 0:this.people.get($e(e).toLowerCase())?.picture;return t?q`<div class="avatar photo"><img src=${t} alt=${$e(e)} /></div>`:q`<div class="avatar"><ha-icon .icon=${function(e){const t=e.toLowerCase();return ke(e)?"mdi:creation":"ha"===t||"home assistant"===t?"mdi:home-assistant":"import"===t?"mdi:database-import-outline":"mdi:account-circle-outline"}(e)}></ha-icon></div>`}_isNew(e){return!!this.seenAt&&e.created_at>this.seenAt&&e.actor!==this.me}_eventTemplate(e){const t=this._isNew(e),i=(s=e.created_at,o=this.language,new Date(s).toLocaleString(o,{dateStyle:"medium",timeStyle:"short"}));var s,o;const r=this._showHistory?q`<span title=${_e(e.created_at,this.language)}>${i}</span>`:q`<span title=${i}>${_e(e.created_at,this.language)}</span>`;if("comment"===e.kind||"note"===e.kind)return q`
        <div class="ev ${t?"new":""}">
          ${this._avatar(e.actor)}
          <div>
            <div class="who"><b>${Ee(e.actor)}</b> · <span class="when">${r}</span>${t?q`<span class="label dense new-tag">new</span>`:W}${"note"===e.kind?q`<span class="label dense">internal note</span>`:W}${e.data?.merged_from?q`<span class="label dense" title="Copied here when a ticket was merged">from #${e.data.merged_from}</span>`:W}</div>
            <div class="bubble md ${"note"===e.kind?"note":""}">${Ve(Bs(e.body??""))}</div>
          </div>
        </div>`;const n=this._detail(e);return q`
      <div class="ev system ${t?"new":""}">
        <ha-icon .icon=${n.icon}></ha-icon>
        <div class="line">
          <span><b>${n.field}</b> ${n.to}${void 0!==n.from?q`<s>${n.from}</s>`:W}</span>
          <span class="stamp">${t?q`<b class="new-text">New · </b>`:W}${Ee(e.actor)} · ${i}</span>
        </div>
      </div>`}render(){const e=this.ticket;if(!e)return q`<div class="empty"><ha-icon icon="mdi:ticket-outline"></ha-icon><span>Select a ticket</span></div>`;const t=e.description.length>1800,i="resolved"===e.status||"closed"===e.status;return q`
      <div class="top">
        <div class="head ${this.isAdmin?"admin":""}">
          ${this.narrow?q`<button class="icon back" title="Back" aria-label="Back" @click=${()=>this._fire("back")}><ha-icon icon="mdi:arrow-left"></ha-icon></button>`:W}
          ${this.isAdmin?q`<textarea class="title-edit" rows="1" aria-label="Title" spellcheck="false" .value=${e.title}
                @input=${e=>this._fitTitle(e.target)}
                @keydown=${this._titleKey}
                @blur=${e=>this._saveTitle(e.target)}></textarea>`:q`<h1>${e.title}</h1>`}
          ${this.isAdmin?q`<button class="icon hist merge" title="Merge into another ticket" aria-label="Merge into another ticket"
                @click=${e=>this._fire("pick-merge",{rect:e.currentTarget.getBoundingClientRect()})}>
                <ha-icon icon="mdi:call-merge"></ha-icon></button>`:W}
          <button class="icon hist" aria-pressed=${this._showHistory?"true":"false"}
            title=${this._showHistory?"Hide history":"Show history"} aria-label="Show history"
            @click=${()=>this._showHistory=!this._showHistory}><ha-icon icon="mdi:history"></ha-icon></button>
        </div>
        <div class="sub">
          <div class="meta-line">
            <span>Opened ${_e(e.created_at,this.language)} by <ha-icon icon=${we(e.requester)}></ha-icon> ${$e(e.requester)}</span>
            ${e.updated_by?q`<span>Updated ${_e(e.updated_at,this.language)} by <ha-icon icon=${we(e.updated_by)}></ha-icon> ${$e(e.updated_by)}</span>`:W}
            ${e.assignee&&ke(e.assignee)?q`<span><ha-icon icon=${we(e.assignee)}></ha-icon> With ${Ee(e.assignee)}</span>`:W}
            ${e.labels.includes(Oe)?q`<span class="blocked" title="Waiting on a person, a part or a fix"><ha-icon icon="mdi:timer-sand"></ha-icon> Blocked</span>`:W}
            ${e.comment_count?q`<span><ha-icon icon="mdi:comment-outline"></ha-icon> ${e.comment_count}</span>`:W}
          </div>
          <!-- Second line: the category, status and priority, then the labels (which wrap on to their own line if they don't fit). -->
          <div class="tag-line">
            <st-ticket-tags show="category" .ticket=${e} .categoryMap=${this.categoryMap} .labelMap=${this.labelMap} .isAdmin=${this.isAdmin}></st-ticket-tags>
            <span class="status" style="--state: ${ve[e.status]}"><ha-icon .icon=${be[e.status]}></ha-icon>${fe[e.status]}</span>
            ${"urgent"===e.priority||"high"===e.priority?q`<span class="prio ${e.priority}"><ha-icon .icon=${"urgent"===e.priority?"mdi:alert":"mdi:alert-outline"}></ha-icon>${xe[e.priority]}</span>`:W}
            <!-- The labels are one block: when they don't fit beside the category they drop to a line of their own. -->
            <st-ticket-tags show="labels" .ticket=${e} .categoryMap=${this.categoryMap} .labelMap=${this.labelMap} .isAdmin=${this.isAdmin} .maxBadges=${12} coloured expanded>
              ${this.isAdmin?this._addLabelControl(e):W}
            </st-ticket-tags>
          </div>
        </div>
      </div>
      <div class="scroll" @scroll=${this._onScroll}>
        <div class="wrap">
        ${e.description||e.attachments?.length?q`<div class="desc-sticky ${this._descCollapsed?"one":""}"
              role=${this._descCollapsed?"button":W} tabindex=${this._descCollapsed?0:W}
              aria-label=${this._descCollapsed?"Show the full description":W}
              @click=${this._expandDescription}
              @keydown=${e=>("Enter"===e.key||" "===e.key)&&this._descCollapsed&&(e.preventDefault(),this._expandDescription())}>
              <div class="card desc">
                ${e.description?q`<div class="md ${t&&!this._expanded?"clamp":""}">${Ve(Bs(e.description))}</div>`:W}
                ${e.attachments?.length&&this.client?q`<st-ticket-attachments class="attached" .client=${this.client} .ticketId=${e.id} .items=${e.attachments}></st-ticket-attachments>`:W}
                ${t?q`<button class="more" @click=${()=>this._expanded=!this._expanded}>${this._expanded?"Show Less":"Show All"}</button>`:W}
                ${e.entities.length?q`<div class="entities">${e.entities.map(e=>q`<code>${e}</code>`)}</div>`:W}
              </div>
              <ha-icon class="pin-hint" icon="mdi:chevron-up"></ha-icon>
            </div>`:W}

        ${e.resolution?q`<div class="card resolution"><h3>Resolution</h3><div class="md">${Ve(Bs(e.resolution))}</div></div>`:W}

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
    `}};qs.styles=[ue,n`
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
      .desc-sticky.one .entities,
      .desc-sticky.one .attached {
        display: none;
      }
      .attached {
        margin-top: 12px;
      }
      .md + .attached {
        margin-top: 16px;
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
      .head.admin {
        padding-right: 88px;
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
      /* The merge button sits just left of the history button. */
      .hist.merge {
        right: 44px;
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
      /* Each item (icon and words) is a centred row, so icons line up with the text whatever the font. */
      .meta-line > span {
        display: inline-flex;
        align-items: center;
        gap: 4px;
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
      .ev .label.new-tag {
        background: var(--st-accent);
        color: var(--st-on-accent, #fff);
      }
      .ev.new .bubble {
        box-shadow: -3px 0 0 var(--st-accent);
      }
      .ev.system .new-text {
        color: var(--st-accent);
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
    `],e([de({attribute:!1})],qs.prototype,"ticket",void 0),e([de({attribute:!1})],qs.prototype,"client",void 0),e([de()],qs.prototype,"seenAt",void 0),e([de()],qs.prototype,"me",void 0),e([de({type:Boolean})],qs.prototype,"isAdmin",void 0),e([de({type:Boolean})],qs.prototype,"narrow",void 0),e([de()],qs.prototype,"language",void 0),e([de()],qs.prototype,"agentName",void 0),e([de({attribute:!1})],qs.prototype,"labelMap",void 0),e([de({attribute:!1})],qs.prototype,"people",void 0),e([de({attribute:!1})],qs.prototype,"categoryMap",void 0),e([he()],qs.prototype,"_expanded",void 0),e([he()],qs.prototype,"_showHistory",void 0),e([he()],qs.prototype,"_descCollapsed",void 0),e([he()],qs.prototype,"_agentToggle",void 0),e([he()],qs.prototype,"_priorityTo",void 0),e([he()],qs.prototype,"_comment",void 0),qs=e([pe("st-ticket-detail")],qs);const Fs=[{id:"bug",name:"Bug"},{id:"enhancement",name:"Enhancement"},{id:"question",name:"Question"},{id:"task",name:"Task",admin:!0}];let Ws=class extends ne{constructor(){super(...arguments),this.isAdmin=!1,this.categories=[],this._category="",this._title="",this._description="",this._kind="bug",this._priority="normal"}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_submit(){this._title.trim()&&this._fire("create",{title:this._title.trim(),description:this._description,labels:[this._kind],priority:this._priority,...this.isAdmin&&this._category?{category:this._category}:{}})}render(){return q`
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
                ${Fs.filter(e=>!e.admin||this.isAdmin).map(e=>q`<option value=${e.id} ?selected=${e.id===this._kind}>${e.name}</option>`)}
              </select>
            </div>
            ${this.isAdmin?q`<div>
                  <label for="prio">Priority</label>
                  <select id="prio" .value=${this._priority}
                    @change=${e=>this._priority=e.target.value}>
                    ${Le.filter(e=>"low"!==e).map(e=>q`<option value=${e} ?selected=${e===this._priority}>${xe[e]}</option>`)}
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
    `}};Ws.styles=[ue,n`
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
    `],e([de({type:Boolean})],Ws.prototype,"isAdmin",void 0),e([de({attribute:!1})],Ws.prototype,"categories",void 0),e([he()],Ws.prototype,"_category",void 0),e([he()],Ws.prototype,"_title",void 0),e([he()],Ws.prototype,"_description",void 0),e([he()],Ws.prototype,"_kind",void 0),e([he()],Ws.prototype,"_priority",void 0),Ws=e([pe("st-new-ticket-dialog")],Ws);let Zs=class extends ne{constructor(){super(...arguments),this.labels=[],this._q="",this._draft=null,this._orig=null,this._shake=!1,this._toRemove=null,this._colorsOpen=!1,this._colorQ="",this._error=""}_fire(e){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0}))}_message(e){return String(e&&"object"==typeof e&&"message"in e?e.message:e)}get _shown(){const e=this._q.trim().toLowerCase();return e?this.labels.filter(t=>t.name.toLowerCase().includes(e)||t.description.toLowerCase().includes(e)):this.labels}_open(e){this._error="",this._colorsOpen=!1,this._draft=e?{id:e.id,name:e.name,icon:e.icon,color:e.color,description:e.description}:{id:null,name:"",icon:"",color:"",description:""},this._orig=this._draft}async _save(){const e=this._draft;if(e&&e.name.trim())try{e.id?await this.client.updateLabel(e.id,{name:e.name.trim(),icon:e.icon.trim(),description:e.description,...e.color?{color:e.color}:{}}):await this.client.createLabel({name:e.name.trim(),icon:e.icon.trim(),description:e.description,...e.color?{color:e.color}:{}}),this._draft=null,this._fire("labels-changed")}catch(e){this._error=this._message(e)}}_tryClose(){if(!this._toRemove)return this._dirty?(this._shake=!0,void window.setTimeout(()=>this._shake=!1,400)):void(this._draft=null)}get _dirty(){const e=this._draft,t=this._orig;return!(!e||!t)&&(e.name!==t.name||e.icon!==t.icon||e.color!==t.color||e.description!==t.description)}async _remove(){const e=this._toRemove;if(e)try{await this.client.deleteLabel(e.id),this._toRemove=null,this._draft=null,this._fire("labels-changed")}catch(e){this._toRemove=null,this._error=this._message(e)}}_row(e){return q`<div class="row ${e.builtin?"locked":""}" role="row"
      @click=${()=>!e.builtin&&this._open(e)}>
      <span class="ico"><ha-icon .icon=${e.icon||"mdi:label-outline"}></ha-icon></span>
      <span class="swatch" style="--c: ${Se(e.color)}"></span>
      <div class="text">
        <div class="name">${e.name}</div>
        ${e.description?q`<div class="desc" title=${e.description}>${e.description}</div>`:W}
      </div>
      <span class="count">${e.count} ticket${1===e.count?"":"s"}</span>
      <span class="end" @click=${e=>e.stopPropagation()}>
        ${e.builtin?q`<ha-icon icon="mdi:lock-outline" title="Built in: can't be changed or deleted"></ha-icon>`:q`<button class="icon" title="Delete Label" aria-label="Delete ${e.name}" @click=${()=>this._toRemove=e}><ha-icon icon="mdi:delete-outline"></ha-icon></button>`}
      </span>
    </div>`}_dialog(e){const t=e.color?Te(e.color):"",i=customElements.get("ha-icon-picker"),s=this._colorQ.trim().toLowerCase(),o=e.id?this._orig?.name??e.name:"New Label";return q`<div class="scrim" @click=${e=>e.target===e.currentTarget&&this._tryClose()}
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
          ${e.color?q`<span class="lead-ico"><span class="dot" style="--c: ${Se(e.color)}"></span></span>`:q`<span class="lead-ico"></span>`}
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
                ${Me.filter(e=>!s||Te(e).toLowerCase().includes(s)).map(t=>q`<button class="opt ${t===e.color?"selected":""}" role="option"
                    @click=${()=>{this._draft={...e,color:t},this._colorsOpen=!1}}>
                    <span class="dot big" style="--c: ${Se(t)}"></span>${Te(t)}
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
    `}};Zs.styles=[ue,n`
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
    `],e([de({attribute:!1})],Zs.prototype,"client",void 0),e([de({attribute:!1})],Zs.prototype,"labels",void 0),e([he()],Zs.prototype,"_q",void 0),e([he()],Zs.prototype,"_draft",void 0),e([he()],Zs.prototype,"_orig",void 0),e([he()],Zs.prototype,"_shake",void 0),e([he()],Zs.prototype,"_toRemove",void 0),e([he()],Zs.prototype,"_colorsOpen",void 0),e([he()],Zs.prototype,"_colorQ",void 0),e([he()],Zs.prototype,"_error",void 0),Zs=e([pe("st-label-manager")],Zs);let Gs=class extends ne{constructor(){super(...arguments),this.categories=[],this._q="",this._draft=null,this._orig=null,this._shake=!1,this._toRemove=null,this._error=""}_fire(e){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0}))}_message(e){return String(e&&"object"==typeof e&&"message"in e?e.message:e)}get _shown(){const e=this._q.trim().toLowerCase();return e?this.categories.filter(t=>t.name.toLowerCase().includes(e)):this.categories}get _dirty(){const e=this._draft,t=this._orig;return!(!e||!t||e.name===t.name&&e.icon===t.icon)}_open(e){this._error="",this._draft=e?{id:e.id,name:e.name,icon:e.icon}:{id:null,name:"",icon:""},this._orig=this._draft}async _save(){const e=this._draft;if(e&&e.name.trim())try{const t={name:e.name.trim(),icon:e.icon.trim()};e.id?await this.client.updateCategory(e.id,t):await this.client.createCategory(t),this._draft=null,this._fire("categories-changed")}catch(e){this._error=this._message(e)}}_tryClose(){if(!this._toRemove)return this._dirty||this._draft&&!this._draft.id&&(this._draft.name||this._draft.icon)?(this._shake=!0,void window.setTimeout(()=>this._shake=!1,400)):void(this._draft=null)}async _remove(){const e=this._toRemove;if(e)try{await this.client.deleteCategory(e.id),this._toRemove=null,this._draft=null,this._fire("categories-changed")}catch(e){this._toRemove=null,this._error=this._message(e)}}_row(e){return q`<div class="row ${e.builtin?"locked":""}" role="row" @click=${()=>!e.builtin&&this._open(e)}>
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
    `}};Gs.styles=[ue,n`
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
    `],e([de({attribute:!1})],Gs.prototype,"client",void 0),e([de({attribute:!1})],Gs.prototype,"categories",void 0),e([he()],Gs.prototype,"_q",void 0),e([he()],Gs.prototype,"_draft",void 0),e([he()],Gs.prototype,"_orig",void 0),e([he()],Gs.prototype,"_shake",void 0),e([he()],Gs.prototype,"_toRemove",void 0),e([he()],Gs.prototype,"_error",void 0),Gs=e([pe("st-category-manager")],Gs);const Vs=[{id:"immediately",label:"Straight away"},{id:"1h",label:"After 1 hour"},{id:"6h",label:"After 6 hours"},{id:"1d",label:"After 1 day"},{id:"3d",label:"After 3 days"},{id:"7d",label:"After 7 days"},{id:"14d",label:"After 14 days"},{id:"30d",label:"After 30 days"},{id:"never",label:"Never"}];let Ys=class extends ne{constructor(){super(...arguments),this._s=null,this._error=""}async connectedCallback(){super.connectedCallback(),this._s=await this.client.settings()}async _save(e){const t=this._s;if(t){this._s={...t,...e,notify:{...t.notify,...e.notify}};try{this._s=await this.client.saveSettings(e),this._error="",this.dispatchEvent(new CustomEvent("settings-changed",{detail:this._s,bubbles:!0,composed:!0}))}catch{this._error="Couldn't save that. These options need the newer Home Desk integration.",this._s=t}}}_targetName(e){if("persistent_notification"===e)return"Home Assistant notifications (the bell)";const t=e.startsWith("mobile_app_"),i=e.replace(/^mobile_app_/,"").replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase());return t?`${i} (mobile app)`:i}get _targets(){const e=Object.keys(this.hass.services?.notify??{}),t=this._s?.notify.targets??[];return[...new Set([...e,...t])].filter(e=>"notify"!==e).sort()}get _agents(){return Object.entries(this.hass.states??{}).filter(([e])=>e.startsWith("ai_task.")||e.startsWith("conversation.")).map(([e,t])=>({id:e,label:String(t.attributes.friendly_name??e)})).sort((e,t)=>e.label.localeCompare(t.label))}get _engines(){return Object.entries(this.hass.states??{}).filter(([e])=>e.startsWith("stt.")).map(([e,t])=>({id:e,label:String(t.attributes.friendly_name??e)})).sort((e,t)=>e.label.localeCompare(t.label))}_switch(e,t,i){return q`<button class="switch" role="switch" aria-checked=${e?"true":"false"} aria-label=${t}
      @click=${()=>i(!e)}></button>`}_toggleTarget(e){const t=this._s;if(!t)return;const i=t.notify.targets.includes(e);this._save({notify:{targets:i?t.notify.targets.filter(t=>t!==e):[...t.notify.targets,e]}})}render(){const e=this._s;if(!e)return q`<div class="page"><p class="help">Loading…</p></div>`;const t=[{id:"",label:"None"},...this._agents];return q`<div class="page">
      ${this._error?q`<div class="error">${this._error}</div>`:W}

      <h2>Tickets</h2>
      <div class="card">
        <div class="srow">
          <div class="text">
            <div class="name">Close resolved tickets</div>
            <div class="desc">A resolved ticket closes by itself after this long. A new comment on it can reopen it first.</div>
          </div>
          <st-dropdown plain label="Close resolved tickets" .value=${e.auto_close} .options=${Vs}
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

      <h2>Voice messages</h2>
      <div class="card">
        <div class="srow">
          <div class="text">
            <div class="name">Write out voice messages</div>
            <div class="desc">A voice message sent with a report is turned into text on the ticket, using Home Assistant's speech-to-text. The recording is kept either way.</div>
          </div>
          ${this._switch(e.transcribe,"Write out voice messages",e=>{this._save({transcribe:e})})}
        </div>
        <div class="srow">
          <div class="text">
            <div class="name">Speech-to-text</div>
            <div class="desc">Which engine listens. The default is the one your Assist setup uses.</div>
          </div>
          <st-dropdown plain label="Speech-to-text" .value=${e.stt} .options=${[{id:"",label:"Assist default"},...this._engines]}
            @change=${e=>{this._save({stt:e.detail})}}></st-dropdown>
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
    </div>`}};Ys.styles=[ue,n`
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
    `],e([de({attribute:!1})],Ys.prototype,"client",void 0),e([de({attribute:!1})],Ys.prototype,"hass",void 0),e([he()],Ys.prototype,"_s",void 0),e([he()],Ys.prototype,"_error",void 0),Ys=e([pe("st-settings")],Ys);const Xs={labels:"Labels",categories:"Categories",settings:"Settings"};let Ks=class extends ne{constructor(){super(...arguments),this.page="",this.view="active",this.tickets=[],this.narrow=!1,this.admin=!1,this._menuOpen=!1}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_choose(e){this._menuOpen=!1,this._fire("page-change",e)}render(){return q`
      <div class="bar">
        <div class="side ${this.page?"wide":""}">
          ${this.page?q`<button class="icon" title="Back" aria-label="Back" @click=${()=>this._choose("")}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
                <h1 class="crumb">${Xs[this.page]}</h1>`:q`${this.narrow?q`<button class="icon" title="Menu" @click=${()=>this._fire("hass-toggle-menu")}><ha-icon icon="mdi:menu"></ha-icon></button>`:W}
              <h1><svg class="mark" viewBox="0 0 86.2 86.2" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M84.15 19.86 84.66 19.10 85.07 18.28 85.36 17.41 85.47 16.97 85.59 16.06 85.59 15.14 85.47 14.23 85.36 13.79 85.07 12.92 84.66 12.10 84.42 11.71 83.86 10.98 83.22 10.34 82.86 10.05 82.10 9.54 81.28 9.13 80.41 8.84 79.51 8.66 79.06 8.61 78.60 8.60 77.69 8.66 76.79 8.84 75.92 9.13 75.10 9.54 74.34 10.05 73.98 10.34 57.89 26.41 65.19 32.80 65.76 33.34 66.20 33.82 66.84 34.65 67.32 35.43 67.77 36.33 83.55 20.55ZM35.60 12.37 34.89 12.03 34.15 11.78 33.38 11.62 32.60 11.57 32.21 11.59 31.43 11.69 31.05 11.78 30.31 12.03 29.60 12.37 28.95 12.81 2.65 35.81 2.09 36.36 1.84 36.67 1.41 37.32 1.22 37.67 0.92 38.39 0.72 39.15 0.61 39.93 0.60 40.32 0.61 71.99 0.72 72.77 0.92 73.53 1.22 74.25 1.61 74.93 2.09 75.56 2.64 76.11 3.27 76.59 3.95 76.98 4.67 77.28 5.05 77.40 5.82 77.55 6.60 77.60 58.99 77.59 59.77 77.48 60.53 77.28 61.25 76.98 61.93 76.59 62.56 76.11 63.11 75.56 63.59 74.93 63.98 74.25 64.28 73.53 64.40 73.15 64.55 72.38 64.60 71.60 64.60 40.32 64.55 39.55 37.55 66.55 36.86 67.15 36.10 67.66 35.28 68.07 34.41 68.36 33.97 68.47 33.06 68.59 32.14 68.59 31.23 68.47 30.79 68.36 29.92 68.07 29.10 67.66 28.34 67.15 27.98 66.86 11.65 50.55 11.34 50.22 10.78 49.49 10.32 48.70 9.97 47.85 9.73 46.97 9.66 46.51 9.60 45.60 9.66 44.69 9.84 43.79 10.13 42.92 10.54 42.10 11.05 41.34 11.65 40.65 12.34 40.05 13.10 39.54 13.92 39.13 14.79 38.84 15.69 38.66 16.60 38.60 17.51 38.66 18.41 38.84 18.85 38.97 19.70 39.32 20.49 39.78 21.22 40.34 32.60 51.70 55.05 29.25 36.55 13.06 35.93 12.58Z"/></svg><span>Home Desk</span></h1>`}
        </div>
        ${this.page||!this.admin?q`<div class="tabs"></div>`:q`<div class="tabs" role="tablist">
              ${Ue.map(e=>q`<button class="tab ${e.id===this.view?"active":""}" role="tab" title=${e.label} aria-label=${e.label}
                  aria-selected=${e.id===this.view} @click=${()=>this._fire("view-change",e.id)}>
                  <ha-icon .icon=${e.icon}></ha-icon><span class="tab-text">${e.label}</span>${e.count?q`<span class="count ${this.tickets.some(t=>t.unread&&e.match(t))?"unread":""}" title=${this.tickets.some(t=>t.unread&&e.match(t))?"Has updates you haven't seen":""}>${this.tickets.filter(e.match).length}</span>`:W}
                </button>`)}
            </div>`}
        <div class="side end">
          ${this.admin?q`<button class="icon" title="Settings" aria-label="Settings" @click=${()=>this._choose("settings")}><ha-icon icon="mdi:cog-outline"></ha-icon></button>`:W}
          ${this.admin?q`<button class="icon" title="More options" aria-label="More options" aria-haspopup="menu" aria-expanded=${this._menuOpen}
                @click=${()=>this._menuOpen=!this._menuOpen}><ha-icon icon="mdi:dots-vertical"></ha-icon></button>`:W}
          ${this.admin&&this._menuOpen?q`<button class="menu-backdrop" aria-label="Close menu" @click=${()=>this._menuOpen=!1}></button>
                <div class="menu-popover" role="menu">
                  <button role="menuitem" @click=${()=>{this._menuOpen=!1,this._fire("refresh")}}><ha-icon icon="mdi:refresh"></ha-icon>Refresh</button>
                  <button role="menuitem" @click=${()=>{this._menuOpen=!1,this._fire("mark-all-read")}}><ha-icon icon="mdi:email-open-multiple-outline"></ha-icon>Mark All as Read</button>
                  ${this.admin?q`<button role="menuitem" @click=${()=>this._choose("labels")}><ha-icon icon="mdi:label-multiple-outline"></ha-icon>Manage Labels</button>
                        <button role="menuitem" @click=${()=>this._choose("categories")}><ha-icon icon="mdi:shape-outline"></ha-icon>Manage Categories</button>`:W}
                </div>`:W}
        </div>
      </div>
    `}};Ks.styles=[ue,n`
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
        margin-left: 6.4px; /* puts the roof's peak (32/86 across the mark) over the centre of the New Ticket button below */
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
      /* Something in this tab changed since you looked: the count lights up. */
      .tab .count.unread {
        background: var(--st-accent);
        color: var(--st-on-accent, #fff);
        font-weight: 500;
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
    `],e([de()],Ks.prototype,"page",void 0),e([de()],Ks.prototype,"view",void 0),e([de({attribute:!1})],Ks.prototype,"tickets",void 0),e([de({type:Boolean})],Ks.prototype,"narrow",void 0),e([de({type:Boolean})],Ks.prototype,"admin",void 0),e([he()],Ks.prototype,"_menuOpen",void 0),Ks=e([pe("st-app-header")],Ks);let Qs=class extends ne{constructor(){super(...arguments),this.q="",this.open=!1,this.tickets=[],this.categories=[],this.labels=[],this.selectable=!1,this.selecting=!1,this.checkedCount=0}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_change(e){return t=>this._fire("filters-change",{[e]:t.detail})}_merge(e){const t=e.currentTarget.getBoundingClientRect();this._fire("merge-selected",{rect:t})}render(){const e=this.filters,t=Be(e);return this.checkedCount?q`<div class="toolbar selbar">
        <button class="icon" title="Clear selection" aria-label="Clear selection" @click=${()=>this._fire("clear-selection")}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
        <span class="count">${this.checkedCount} selected</span>
        <button class="icon" title="Mark as read" aria-label="Mark as read" @click=${()=>this._fire("mark-read-selected")}>
          <ha-icon icon="mdi:email-open-outline"></ha-icon>
        </button>
        <button class="icon" title="Select all" aria-label="Select all" @click=${()=>this._fire("select-all")}>
          <ha-icon icon="mdi:select-all"></ha-icon>
        </button>
        <button class="merge" ?disabled=${this.checkedCount<2} title=${this.checkedCount<2?"Select at least two tickets":"Merge selected tickets"}
          @click=${e=>this.checkedCount>=2&&this._merge(e)}>
          <ha-icon icon="mdi:call-merge"></ha-icon> Merge
        </button>
      </div>`:q`
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
        ${this.selectable?q`<button class="icon filter-btn ${this.selecting?"on":""}" title="Select Tickets" aria-label="Select Tickets" aria-pressed=${this.selecting}
              @click=${()=>this._fire("toggle-select")}>
              <ha-icon icon="mdi:checkbox-multiple-marked-outline"></ha-icon>
            </button>`:W}
        <button class="icon filter-btn ${t?"on":""}" title="Filters" aria-label="Filters" aria-expanded=${this.open}
          @click=${()=>this._fire("toggle-filters")}>
          <ha-icon icon="mdi:filter-variant"></ha-icon>${t?q`<span class="dot"></span>`:W}
        </button>
      </div>
      ${this.open?q`<div class="filters">
            ${"all"===e.view?q`<st-dropdown label="Show" .options=${He} .value=${e.scope} @change=${this._change("scope")}></st-dropdown>`:W}
            <st-dropdown label="Category" placeholder="Category" .options=${s=this.categories,[{id:"",label:"Any Category"},{id:"none",label:"No Category"},...s.map(e=>({id:e.id,label:e.name}))]} .value=${e.category}
              @change=${this._change("category")}></st-dropdown>
            ${e.person?q`<st-dropdown label="Raised By" placeholder="Raised By" .options=${function(e,t){const i=[...new Set(e.map(e=>e.requester).filter(Boolean))].sort();return t&&!i.includes(t)&&i.push(t),[{id:"",label:"Anyone"},...i.map(e=>({id:e,label:$e(e)}))]}(this.tickets,e.person)} .value=${e.person}
                  @change=${this._change("person")}></st-dropdown>`:W}
            <st-dropdown label="Priority" placeholder="Priority" .options=${[{id:"",label:"Any Priority"},...Le.filter(e=>"low"!==e).map(e=>({id:e,label:xe[e]}))]} .value=${e.priority}
              @change=${this._change("priority")}></st-dropdown>
            <st-dropdown label="Label" placeholder="Label" .options=${i=this.labels,[{id:"",label:"Any Label"},...i.map(e=>({id:e.id,label:e.name}))]} .value=${e.label}
              @change=${this._change("label")}></st-dropdown>
          </div>`:W}
    `;var i,s}};Qs.styles=[ue,n`
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
      .selbar .count {
        flex: 1;
        font-size: var(--st-fs-body);
        font-weight: 500;
      }
      .selbar .merge {
        flex: none;
        height: var(--st-h-bar);
        padding: 0 16px;
        gap: 8px;
        border-radius: var(--st-r-pill);
      }
      .selbar .merge[disabled] {
        opacity: 0.5;
        cursor: default;
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
    `],e([de()],Qs.prototype,"q",void 0),e([de({attribute:!1})],Qs.prototype,"filters",void 0),e([de({type:Boolean})],Qs.prototype,"open",void 0),e([de({attribute:!1})],Qs.prototype,"tickets",void 0),e([de({attribute:!1})],Qs.prototype,"categories",void 0),e([de({attribute:!1})],Qs.prototype,"labels",void 0),e([de({type:Boolean})],Qs.prototype,"selectable",void 0),e([de({type:Boolean})],Qs.prototype,"selecting",void 0),e([de({type:Number})],Qs.prototype,"checkedCount",void 0),Qs=e([pe("st-list-toolbar")],Qs);const Js=[{id:"bug",name:"Problem",icon:"mdi:alert-circle-outline",hint:"Something isn't working"},{id:"enhancement",name:"Suggestion",icon:"mdi:lightbulb-on-outline",hint:"An idea or a request"}];let eo=class extends ne{constructor(){super(...arguments),this._title="",this._details="",this._kind="bug",this._sending=!1,this._sent=!1,this._error="",this._photos=[],this._voice=null,this._recording=null,this._busy=!1,this._sentWith={photos:0,voice:!1},this._recorder=null}disconnectedCallback(){super.disconnectedCallback(),this._recorder?.cancel(),this._forget()}_forget(){this._photos.forEach(e=>URL.revokeObjectURL(e.url)),this._voice&&URL.revokeObjectURL(this._voice.url),this._photos=[],this._voice=null}async _addPhotos(e){const t=e.target,i=[...t.files??[]].slice(0,6-this._photos.length);if(t.value="",i.length){this._busy=!0;try{for(const e of i){const t=await Ke(e);this._photos=[...this._photos,{blob:t,url:URL.createObjectURL(t),name:e.name}]}}finally{this._busy=!1}}}_removePhoto(e){URL.revokeObjectURL(e.url),this._photos=this._photos.filter(t=>t!==e)}_setVoice(e,t){this._voice&&URL.revokeObjectURL(this._voice.url),this._voice={blob:e,url:URL.createObjectURL(e),seconds:t}}async _record(){this._error="";try{this._recording=0,this._recorder=await async function(e,t){const i=await navigator.mediaDevices.getUserMedia({audio:{channelCount:1,echoCancellation:!0,noiseSuppression:!0}}),s=new AudioContext,o=s.createMediaStreamSource(i),r=s.createScriptProcessor(4096,1,1),n=[];let a=0,l=!1;r.onaudioprocess=i=>{if(l)return;const o=new Float32Array(i.inputBuffer.getChannelData(0));n.push(o),a+=o.length;const r=a/s.sampleRate;e(Math.floor(r)),r>=180&&t()},o.connect(r),r.connect(s.destination);const c=()=>{l=!0,r.disconnect(),o.disconnect(),i.getTracks().forEach(e=>e.stop()),s.close()};return{cancel:c,stop:async()=>{const e=s.sampleRate;c();const t=new Float32Array(a);let i=0;for(const e of n)t.set(e,i),i+=e.length;return{blob:Qe(t,e),seconds:Math.round(a/e)}}}}(e=>this._recording=e,()=>{this._stopRecording()})}catch{this._recording=null,this._error="The microphone isn't available. Check it is allowed for this page, or add a recording from your device."}}async _stopRecording(){const e=this._recorder;if(this._recorder=null,this._recording=null,!e)return;const{blob:t,seconds:i}=await e.stop();i>0&&this._setVoice(t,i)}async _addVoiceFile(e){const t=e.target,i=t.files?.[0];if(t.value="",i){this._busy=!0,this._error="";try{const{blob:e,seconds:t}=await async function(e){const t=new AudioContext;try{const i=await t.decodeAudioData(await e.arrayBuffer()),s=Math.ceil(i.duration*Xe),o=new OfflineAudioContext(1,s,Xe),r=o.createBufferSource();return r.buffer=i,r.connect(o.destination),r.start(),{blob:Qe((await o.startRendering()).getChannelData(0),Xe),seconds:Math.round(i.duration)}}finally{t.close()}}(i);this._setVoice(e,t)}catch{this._error="That recording couldn't be read. Try another, or type the message instead."}finally{this._busy=!1}}}async _send(){if(this._title.trim()&&!this._sending&&!this._busy&&null===this._recording){this._sending=!0,this._error="";try{const e=new FormData;e.append("kind",this._kind),e.append("title",this._title.trim()),e.append("details",this._details),this._photos.forEach((t,i)=>e.append("image",t.blob,`photo-${i+1}.${"image/jpeg"===t.blob.type?"jpg":"img"}`)),this._voice&&e.append("audio",this._voice.blob,"voice-message.wav");const t=await this.client.report(e);this._sentWith={photos:t.photos,voice:t.voice},this._sent=!0,this._title="",this._details="",this._kind="bug",this._forget()}catch(e){this._error=String(e&&"object"==typeof e&&"message"in e?e.message:e)}finally{this._sending=!1}}}render(){return this._sent?q`<div class="page thanks">
        <ha-icon icon="mdi:check-circle-outline"></ha-icon>
        <h2>Thanks, that's been sent</h2>
        <p class="lead">Whoever looks after the smart home will see it${this._sentWith.photos||this._sentWith.voice?", with what you added":""}. They may talk to you about it.</p>
        <div class="actions">
          <button @click=${()=>this._sent=!1}>Report something else</button>
        </div>
      </div>`:q`<div class="page">
      <h2>Report a problem or an idea</h2>
      <p class="lead">Tell us what happened or what you'd like. You don't need to know what's wrong.</p>

      <div class="field">
        <label class="caption" id="kind-label">What is it?</label>
        <div class="kinds" role="radiogroup" aria-labelledby="kind-label">
          ${Js.map(e=>q`<button class="kind" role="radio" aria-checked=${this._kind===e.id?"true":"false"}
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

      <div class="field">
        <label class="caption">Show or tell us (optional)</label>
        <div class="attach">
          <button ?disabled=${this._photos.length>=6||this._busy}
            @click=${()=>this.renderRoot.querySelector("#photo-input")?.click()}>
            <ha-icon icon="mdi:camera-outline"></ha-icon>Add photos
          </button>
          ${null===this._recording?q`<button ?disabled=${this._busy}
                @click=${()=>navigator.mediaDevices?.getUserMedia&&"undefined"!=typeof AudioContext?void this._record():this.renderRoot.querySelector("#voice-input")?.click()}>
                <ha-icon icon="mdi:microphone-outline"></ha-icon>${this._voice?"Record again":"Record a message"}
              </button>`:W}
        </div>
        <input id="photo-input" type="file" accept="image/*" multiple @change=${this._addPhotos} />
        <input id="voice-input" type="file" accept="audio/*" capture @change=${this._addVoiceFile} />

        ${this._photos.length?q`<div class="photos">
              ${this._photos.map(e=>q`<div class="photo">
                  <img src=${e.url} alt=${e.name} />
                  <button class="remove" title="Remove" aria-label="Remove photo" @click=${()=>this._removePhoto(e)}>
                    <ha-icon icon="mdi:close"></ha-icon>
                  </button>
                </div>`)}
            </div>`:W}
        ${null!==this._recording?q`<div class="voice">
              <span class="rec-dot"></span>
              <span class="time">Recording ${Je(this._recording)}</span>
              <button class="primary" @click=${()=>{this._stopRecording()}}>Stop</button>
            </div>`:this._voice?q`<div class="voice">
                <audio controls src=${this._voice.url}></audio>
                <button class="icon" title="Remove" aria-label="Remove voice message"
                  @click=${()=>{URL.revokeObjectURL(this._voice.url),this._voice=null}}>
                  <ha-icon icon="mdi:delete-outline"></ha-icon>
                </button>
              </div>`:W}
        ${this._voice?q`<div class="note">Your message will be written out as text for whoever reads this.</div>`:W}
      </div>

      ${this._error?q`<div class="error">${this._error}</div>`:W}
      <div class="actions">
        <button class="primary" ?disabled=${!this._title.trim()||this._sending||this._busy||null!==this._recording} @click=${()=>{this._send()}}>
          ${this._sending?"Sending…":"Send"}
        </button>
      </div>
    </div>`}};eo.styles=[ue,n`
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
      /* Photos and a voice message: two quiet buttons, then what has been added. */
      .attach {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .attach button {
        border: 1px solid var(--st-outline);
        color: var(--st-fg);
        gap: 8px;
      }
      .attach button ha-icon {
        --mdc-icon-size: 20px;
        color: var(--st-fg-secondary);
      }
      .photos {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
        gap: 8px;
        margin-top: 12px;
      }
      .photo {
        position: relative;
        aspect-ratio: 1;
        border-radius: var(--st-r-control);
        overflow: hidden;
        background: var(--st-bg);
      }
      .photo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .photo .remove {
        position: absolute;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        top: 4px;
        right: 4px;
        width: 28px;
        height: 28px;
        min-width: 0;
        padding: 0;
        border-radius: 50%;
        background: color-mix(in srgb, #000 60%, transparent);
        color: #fff;
      }
      .remove ha-icon {
        --mdc-icon-size: 18px;
        color: #fff;
      }
      .voice {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 12px;
        padding: 8px 8px 8px 16px;
        border: 1px solid var(--st-outline);
        border-radius: var(--st-r-control);
      }
      .voice audio {
        flex: 1;
        min-width: 0;
        height: 36px;
      }
      .voice .rec-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--st-danger);
        animation: pulse 1.2s ease-in-out infinite;
      }
      .voice .time {
        flex: 1;
        font-variant-numeric: tabular-nums;
        font-size: var(--st-fs-body);
      }
      @keyframes pulse {
        50% {
          opacity: 0.25;
        }
      }
      .note {
        margin-top: 8px;
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
      }
      input[type="file"] {
        display: none;
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
    `],e([de({attribute:!1})],eo.prototype,"client",void 0),e([he()],eo.prototype,"_title",void 0),e([he()],eo.prototype,"_details",void 0),e([he()],eo.prototype,"_kind",void 0),e([he()],eo.prototype,"_sending",void 0),e([he()],eo.prototype,"_sent",void 0),e([he()],eo.prototype,"_error",void 0),e([he()],eo.prototype,"_photos",void 0),e([he()],eo.prototype,"_voice",void 0),e([he()],eo.prototype,"_recording",void 0),e([he()],eo.prototype,"_busy",void 0),e([he()],eo.prototype,"_sentWith",void 0),eo=e([pe("st-report-form")],eo);let to=class extends ne{constructor(){super(...arguments),this.heading="",this.body="",this.confirmLabel="Confirm",this.danger=!1}_fire(e){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0}))}firstUpdated(){this.renderRoot.querySelector("button.primary")?.focus()}render(){return q`<div class="scrim" @click=${e=>e.target===e.currentTarget&&this._fire("cancel")}
      @keydown=${e=>"Escape"===e.key&&this._fire("cancel")}>
      <div class="dialog" role="alertdialog" aria-modal="true" aria-label=${this.heading}>
        <h2>${this.heading}</h2>
        <p>${this.body}</p>
        <div class="actions">
          <button @click=${()=>this._fire("cancel")}>Cancel</button>
          <button class="primary ${this.danger?"danger":""}" @click=${()=>this._fire("confirm")}>${this.confirmLabel}</button>
        </div>
      </div>
    </div>`}};to.styles=[ue,n`
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
    `],e([de()],to.prototype,"heading",void 0),e([de()],to.prototype,"body",void 0),e([de()],to.prototype,"confirmLabel",void 0),e([de({type:Boolean})],to.prototype,"danger",void 0),to=e([pe("st-confirm-dialog")],to);let io=class extends ne{constructor(){super(...arguments),this.rect=null,this.items=[],this.additional=()=>[],this.value="",this.emptyLabel="Nothing here",this._q="",this._active=0}get _rows(){const e=this._q.trim().toLowerCase(),t=e?this.items.filter(t=>`${t.primary} ${t.secondary??""}`.toLowerCase().includes(e)):this.items;return[...t,...this.additional(this._q.trim())]}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_onKey(e){const t=this._rows;"Escape"===e.key?this._fire("close"):"ArrowDown"===e.key?(this._active=Math.min(this._active+1,t.length-1),e.preventDefault()):"ArrowUp"===e.key?(this._active=Math.max(this._active-1,0),e.preventDefault()):"Enter"===e.key&&t[this._active]&&this._fire("pick",{id:t[this._active].id,search:this._q.trim()})}firstUpdated(){this.renderRoot.querySelector("input")?.focus()}get _position(){const e=this.rect;if(!e)return"";const t=Math.max(8,Math.min(e.left,window.innerWidth-348)),i=window.innerHeight-e.bottom;return i>=300||i>=e.top?`left:${t}px;top:${e.bottom+4}px;max-height:${Math.max(160,Math.min(380,i-12))}px`:`left:${t}px;bottom:${window.innerHeight-e.top+4}px;max-height:${Math.max(160,Math.min(380,e.top-12))}px`}render(){const e=this._rows;return q`
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
      </div>`}};io.styles=[ue,n`
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
    `],e([de({attribute:!1})],io.prototype,"rect",void 0),e([de({attribute:!1})],io.prototype,"items",void 0),e([de({attribute:!1})],io.prototype,"additional",void 0),e([de()],io.prototype,"value",void 0),e([de()],io.prototype,"emptyLabel",void 0),e([he()],io.prototype,"_q",void 0),e([he()],io.prototype,"_active",void 0),io=e([pe("st-picker-popup")],io);let so=class extends ne{constructor(){super(...arguments),this.name="",this.error="",this._name="",this._icon="",this._shake=!1}connectedCallback(){super.connectedCallback(),this._name=this.name}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_tryClose(){this._name.trim()||this._icon.trim()?(this._shake=!0,window.setTimeout(()=>this._shake=!1,400)):this._fire("close")}_create(){this._name.trim()&&this._fire("create",{name:this._name.trim(),icon:this._icon.trim()})}firstUpdated(){this.renderRoot.querySelector("#name")?.focus()}render(){return q`<div class="scrim" @click=${e=>e.target===e.currentTarget&&this._tryClose()}
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
    </div>`}};so.styles=[ue,n`
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
    `],e([de()],so.prototype,"name",void 0),e([de()],so.prototype,"error",void 0),e([he()],so.prototype,"_name",void 0),e([he()],so.prototype,"_icon",void 0),e([he()],so.prototype,"_shake",void 0),so=e([pe("st-category-dialog")],so);const oo="___add_new___",ro="___none___",no="(max-width: 870px)";let ao=class extends ne{constructor(){super(...arguments),this.narrow=!1,this.route=void 0,this._tickets=[],this._matchIds=null,this._selected=null,this._selectedId=null,this._view="active",this._q="",this._priority="",this._label="",this._category="",this._person="",this._filtersOpen=!1,this._compact=window.matchMedia(no).matches,this._scope="",this._labelList=[],this._categoryList=[],this._settings=null,this._merging=null,this._mergeConfirm=null,this._checked=new Set,this._ticking=!1,this._lastChecked=null,this._seenAt="",this._pickingLabel=null,this._picking=null,this._newCategory=null,this._removing=null,this._page="",this._creating=!1,this._error="",this._onVisible=()=>{document.hidden||this._refresh()},this._mq=window.matchMedia(no),this._onCompact=()=>{this._compact=this._mq.matches},this._pickerAdditional=e=>{const t=this._categoryList.some(t=>t.name.toLowerCase()===e.toLowerCase());return e&&!t?[{id:oo+e,primary:`Add New Category '${e}'`,icon:"mdi:plus"}]:[{id:oo,primary:"Add New Category…",icon:"mdi:plus"}]},this._labelPickerAdditional=e=>{const t=this._labelList.some(t=>t.name.toLowerCase()===e.toLowerCase());return e&&!t?[{id:oo+e,primary:`Add New Label '${e}'`,icon:"mdi:plus"}]:[]}}get _admin(){return this.hass?.user?.is_admin??!1}recheckTheme(){const e=document.createElement("span");e.style.color="var(--card-background-color)",this.renderRoot.appendChild(e);const t=/rgba?\((\d+)[ ,]+(\d+)[ ,]+(\d+)/.exec(getComputedStyle(e).color);e.remove(),t&&this.toggleAttribute("light",(.299*+t[1]+.587*+t[2]+.114*+t[3])/255>.5)}willUpdate(e){if(e.has("hass")&&this.hass){const e=this.hass.themes;e===this._themeKey&&this.hasUpdated||(this._themeKey=e,this.updateComplete.then(()=>this.recheckTheme()))}e.has("hass")&&this.hass&&!this._client&&(this._client=new me(this.hass),this._restoreState(),this._refresh(),this._syncFromRoute(),this._subscribe()),e.has("route")&&this._client&&this._syncFromRoute()}get _prefix(){return this.route?.prefix??"/home-desk"}_navigate(e){if(location.pathname!==e)try{history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}catch{}}async _syncFromRoute(){const e=Number((this.route?.path??"").replace(/^\//,"")),t=Number.isInteger(e)&&e>0?e:null;t!==this._selectedId&&(null===t?(this._selectedId=null,this._selected=null):await this._open(t,!1))}_subscribe(){this._client&&(this._client.subscribe(()=>this._scheduleRefresh()).then(e=>{this._unsub=e}).catch(e=>{console.warn("[home-desk] live updates unavailable, polling instead:",e),this._unsub=void 0}),window.clearInterval(this._pollTimer),this._pollTimer=window.setInterval(()=>{document.hidden||this._refresh()},2e4))}connectedCallback(){super.connectedCallback(),this._mq.addEventListener("change",this._onCompact),document.addEventListener("visibilitychange",this._onVisible),this._client&&!this._unsub&&this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._mq.removeEventListener("change",this._onCompact),document.removeEventListener("visibilitychange",this._onVisible),window.clearInterval(this._pollTimer),this._unsub?.(),this._unsub=void 0,window.clearTimeout(this._searchTimer),window.clearTimeout(this._refreshTimer)}_restoreState(){try{const e=localStorage.getItem("home-desk-view");e&&Ue.some(t=>t.id===e)&&(this._view=e)}catch{}}_setView(e){this._view=e,"all"===e&&(this._filtersOpen=!0);try{localStorage.setItem("home-desk-view",e)}catch{}}_scheduleRefresh(){window.clearTimeout(this._refreshTimer),this._refreshTimer=window.setTimeout(()=>{this._refresh()},300)}async _refresh(){if(this._client&&this._admin)try{[this._tickets,this._labelList,this._categoryList]=await Promise.all([this._client.list(),this._client.labels(),this._client.categories()]),this._admin&&(this._settings=await this._client.settings()),this._q.trim()&&await this._runSearch(),null!==this._selectedId&&await this._loadSelected(this._selectedId),this._error=""}catch(e){this._error=`Could not load tickets: ${this._message(e)}`}}async _loadSelected(e){if(this._client)try{const t=await this._client.get(e);this._selected?.id===e&&this._seenAt||(this._seenAt=t.seen_at??""),this._selected=t,this._tickets.find(t=>t.id===e)?.unread&&this._markRead([e])}catch(e){this._selected=null,this._selectedId=null,this._navigate(this._prefix),this._error=this._message(e)}}async _markRead(e){if(this._client){this._tickets=this._tickets.map(t=>!e||e.includes(t.id)?{...t,unread:!1}:t);try{await this._client.markRead(e)}catch{}}}async _runSearch(){if(!this._client)return;const e=this._q.trim();this._matchIds=e?new Set((await this._client.list(e)).map(e=>e.id)):null}_message(e){return String(e&&"object"==typeof e&&"message"in e?e.message:e)}async _act(e){if(this._client)try{this._selected=await e(this._client),this._error="",this._refresh()}catch(e){this._error=this._message(e)}}_search(e){this._q=e,window.clearTimeout(this._searchTimer),this._searchTimer=window.setTimeout(()=>{this._runSearch()},250)}async _open(e,t=!0){this._selectedId!==e&&(this._seenAt=""),this._selectedId=e,t&&this._navigate(`${this._prefix}/${e}`),await this._loadSelected(e)}get _pickerItems(){const e=this._picking?.ticket.category;return[...e?[{id:ro,primary:"No Category",icon:"mdi:shape-outline"}]:[],...this._categoryList.map(e=>({id:e.id,primary:e.name,icon:e.icon||"mdi:tag-outline"}))]}get _mergeItems(){const e=this._merging?.ids;if(e)return this._tickets.filter(t=>e.includes(t.id)).sort((e,t)=>e.id-t.id).map((e,t)=>({id:String(e.id),primary:`#${e.id} ${e.title}`,secondary:`${0===t?"Oldest · ":""}${fe[e.status]} · ${$e(e.requester)}`,icon:"mdi:ticket-outline"}));const t=this._selectedId,i=e=>"resolved"!==e.status&&"closed"!==e.status;return this._tickets.filter(e=>e.id!==t&&!e.merged_into).sort((e,t)=>Number(i(t))-Number(i(e))||t.updated_at.localeCompare(e.updated_at)).map(e=>({id:String(e.id),primary:`#${e.id} ${e.title}`,secondary:`${fe[e.status]} · ${$e(e.requester)}`,icon:"mdi:ticket-outline"}))}_mergePicked(e){const t=this._merging?.ids;this._merging=null;const i=this._tickets.find(t=>t.id===Number(e)),s=t?this._tickets.filter(i=>t.includes(i.id)&&i.id!==Number(e)):this._tickets.filter(e=>e.id===this._selectedId);s.length&&i&&(this._mergeConfirm={from:s,into:i})}_toggleCheck({id:e,range:t}){const i=new Set(this._checked),s=this._filtered.map(e=>e.id);if(t&&null!==this._lastChecked&&s.includes(this._lastChecked)){const[t,o]=[s.indexOf(this._lastChecked),s.indexOf(e)].sort((e,t)=>e-t);for(const e of s.slice(t,o+1))i.add(e)}else i.has(e)?i.delete(e):i.add(e);this._lastChecked=e,this._checked=i,i.size&&(this._ticking=!0)}_clearChecked(){this._checked=new Set,this._ticking=!1,this._lastChecked=null}async _doMerge(){const e=this._mergeConfirm;if(this._mergeConfirm=null,e&&this._client)try{await this._client.merge(e.into.id,e.from.map(e=>e.id)),this._clearChecked(),this._error="",await this._refresh(),await this._open(e.into.id)}catch(e){this._error=this._message(e)}}get _labelPickerItems(){const e=new Set(this._pickingLabel?.ticket.labels??[]);return this._labelList.filter(t=>!e.has(t.id)).map(e=>({id:e.id,primary:e.name,icon:e.icon||"mdi:label-outline",...e.description?{secondary:e.description}:{}}))}async _labelPicked({id:e}){const t=this._pickingLabel;if(this._pickingLabel=null,!t||!this._client)return;const i=e.startsWith(oo)?e.slice(13):e;try{await this._client.update(t.ticket.id,{labels:[...t.ticket.labels,i]}),this._error="",this._refresh()}catch(e){this._error=this._message(e)}}async _picked({id:e}){const t=this._picking;this._picking=null,t&&(e.startsWith(oo)?this._newCategory={ticket:t.ticket,name:e.slice(13),error:""}:await this._setCategory(t.ticket,e===ro?null:e))}async _setCategory(e,t){if(this._client)try{await this._client.update(e.id,{category:t}),this._error="",this._refresh()}catch(e){this._error=this._message(e)}}async _createCategory(e){const t=this._newCategory;if(t&&this._client)try{const i=await this._client.createCategory(e);this._newCategory=null,await this._setCategory(t.ticket,i.id)}catch(e){this._newCategory={...t,error:this._message(e)}}}async _removeLabel(){const e=this._removing;if(this._removing=null,e&&this._client)try{await this._client.update(e.ticket.id,{labels:e.ticket.labels.filter(t=>t!==e.label.id)}),this._error="",this._refresh()}catch(e){this._error=this._message(e)}}_close(){this._selectedId=null,this._selected=null,this._navigate(this._prefix)}async _create(e){if(this._client)try{const t=await this._client.create(e);this._creating=!1,this._setView("active"),this._selected=t,this._open(t.id),this._refresh()}catch(e){this._error=this._message(e)}}_applyFilters(e){void 0!==e.scope&&(this._scope=e.scope),void 0!==e.category&&(this._category=e.category),void 0!==e.person&&(this._person=e.person),void 0!==e.priority&&(this._priority=e.priority),void 0!==e.label&&(this._label=e.label)}get _filters(){return{view:this._view,scope:this._scope,category:this._category,priority:this._priority,label:this._label,person:this._person}}get _filtered(){return function(e,t,i){const s=Ue.find(e=>e.id===t.view)??Ue[0];return e.filter(e=>s.match(e)&&("all"!==s.id||!t.scope||je.find(e=>e.id===t.scope).match(e))&&(!i||i.has(e.id))&&(!t.priority||e.priority===t.priority)&&(!t.label||e.labels.includes(t.label))&&(!t.person||e.requester===t.person)&&(!t.category||("none"===t.category?!e.category:e.category===t.category)))}(this._tickets,this._filters,this._matchIds)}get _filterCount(){return Be(this._filters)}get _agentName(){const e=this._settings?.agent;return`ai:${(e?String(this.hass.states?.[e]?.attributes.friendly_name??""):"").replace(/\s*(AI Task|conversation|agent)\s*$/i,"").trim()||"Claude"}`}get _people(){const e=new Map;for(const[t,i]of Object.entries(this.hass?.states??{})){if(!t.startsWith("person."))continue;const s=String(i.attributes.friendly_name??t.slice(7)),o=i.attributes.entity_picture;e.set(s.toLowerCase(),{name:s,..."string"==typeof o&&o?{picture:o}:{}})}return e}get _labelMap(){return new Map(this._labelList.map(e=>[e.id,e]))}render(){if(!this.hass)return W;const e=this.hass.language,t=null!==this._selectedId;return q`
      <st-app-header .page=${this._page} .view=${this._view} .tickets=${this._tickets} .narrow=${this.narrow} .admin=${this._admin}
        @page-change=${e=>this._page=e.detail}
        @view-change=${e=>this._setView(e.detail)}
        @refresh=${()=>{this._refresh()}}
        @mark-all-read=${()=>{this._markRead()}}></st-app-header>
      ${this._error?q`<div class="banner">${this._error}</div>`:W}
      ${!this._admin&&this._client?q`<st-report-form .client=${this._client}></st-report-form>`:"labels"===this._page&&this._client?q`<st-label-manager .client=${this._client} .labels=${this._labelList}
            @labels-changed=${()=>{this._refresh()}}></st-label-manager>`:"categories"===this._page&&this._client?q`<st-category-manager .client=${this._client} .categories=${this._categoryList}
              @categories-changed=${()=>{this._refresh()}}></st-category-manager>`:"settings"===this._page&&this._client?q`<st-settings .client=${this._client} .hass=${this.hass}
                @settings-changed=${e=>this._settings=e.detail}></st-settings>`:q`<main class=${t?"has-selection":""}>
        <div class="list-pane">
          <st-list-toolbar .q=${this._q} .filters=${this._filters} .open=${this._filtersOpen} .tickets=${this._tickets}
            .categories=${this._categoryList} .labels=${this._labelList}
            .selectable=${this._admin} .selecting=${this._ticking} .checkedCount=${this._checked.size}
            @toggle-select=${()=>this._ticking?this._clearChecked():this._ticking=!0}
            @clear-selection=${()=>this._clearChecked()}
            @mark-read-selected=${()=>{this._markRead([...this._checked]).then(()=>this._clearChecked())}}
            @select-all=${()=>this._checked=new Set(this._filtered.map(e=>e.id))}
            @merge-selected=${e=>this._merging={rect:e.detail.rect,ids:this._tickets.filter(e=>this._checked.has(e.id)&&!e.merged_into).map(e=>e.id)}}
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
            .checked=${this._checked}
            .ticking=${this._ticking}
            .categoryMap=${new Map(this._categoryList.map(e=>[e.id,e]))}
            @toggle-check=${e=>this._toggleCheck(e.detail)}
            @select-ticket=${e=>{this._open(e.detail)}}
            @filter-person=${e=>{this._person=e.detail,this._filtersOpen=!0}}
            @pick-category=${e=>this._picking=e.detail}
            @remove-label=${e=>this._removing=e.detail}
          ></st-ticket-list>
        </div>
        <st-ticket-detail
          .ticket=${this._selected}
          .client=${this._client}
          .isAdmin=${this._admin}
          .narrow=${this._compact}
          .language=${e}
          .seenAt=${this._seenAt}
          .me=${this.hass.user?.name??""}
          .agentName=${this._agentName}
          .labelMap=${this._labelMap}
          .people=${this._people}
          .categoryMap=${new Map(this._categoryList.map(e=>[e.id,e]))}
          @pick-category=${e=>this._picking=e.detail}
          @remove-label=${e=>this._removing=e.detail}
          @pick-label=${e=>this._pickingLabel=e.detail}
          @pick-merge=${e=>this._merging=e.detail}
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
      ${this._merging?q`<st-picker-popup .rect=${this._merging.rect} .items=${this._mergeItems} emptyLabel="No other tickets"
            @close=${()=>this._merging=null}
            @pick=${e=>this._mergePicked(e.detail.id)}></st-picker-popup>`:W}
      ${this._mergeConfirm?q`<st-confirm-dialog heading="Merge Tickets?" confirmLabel="Merge" danger
            body="Merge ${this._mergeConfirm.from.map(e=>"#"+e.id).join(", ")} into #${this._mergeConfirm.into.id} (${this._mergeConfirm.into.title})? The comments, labels and files of ${this._mergeConfirm.from.length>1?"the others":"#"+this._mergeConfirm.from[0].id} move to #${this._mergeConfirm.into.id}, and ${this._mergeConfirm.from.length>1?"they are":"it is"} closed. This can't be undone."
            @cancel=${()=>this._mergeConfirm=null}
            @confirm=${()=>{this._doMerge()}}></st-confirm-dialog>`:W}
      ${this._removing?q`<st-confirm-dialog heading="Remove Label?" confirmLabel="Remove" danger
            body="Are you sure you want to remove label ${this._removing.label.name} from this ticket?"
            @cancel=${()=>this._removing=null}
            @confirm=${()=>{this._removeLabel()}}></st-confirm-dialog>`:W}
      ${this._creating?q`<st-new-ticket-dialog .isAdmin=${this._admin} .categories=${this._categoryList}
            @close=${()=>this._creating=!1}
            @create=${e=>{this._create(e.detail)}}></st-new-ticket-dialog>`:W}
    `}};ao.styles=[ue,ge],e([de({attribute:!1})],ao.prototype,"hass",void 0),e([de({type:Boolean})],ao.prototype,"narrow",void 0),e([de({attribute:!1})],ao.prototype,"route",void 0),e([he()],ao.prototype,"_tickets",void 0),e([he()],ao.prototype,"_matchIds",void 0),e([he()],ao.prototype,"_selected",void 0),e([he()],ao.prototype,"_selectedId",void 0),e([he()],ao.prototype,"_view",void 0),e([he()],ao.prototype,"_q",void 0),e([he()],ao.prototype,"_priority",void 0),e([he()],ao.prototype,"_label",void 0),e([he()],ao.prototype,"_category",void 0),e([he()],ao.prototype,"_person",void 0),e([he()],ao.prototype,"_filtersOpen",void 0),e([he()],ao.prototype,"_compact",void 0),e([he()],ao.prototype,"_scope",void 0),e([he()],ao.prototype,"_labelList",void 0),e([he()],ao.prototype,"_categoryList",void 0),e([he()],ao.prototype,"_settings",void 0),e([he()],ao.prototype,"_merging",void 0),e([he()],ao.prototype,"_mergeConfirm",void 0),e([he()],ao.prototype,"_checked",void 0),e([he()],ao.prototype,"_ticking",void 0),e([he()],ao.prototype,"_seenAt",void 0),e([he()],ao.prototype,"_pickingLabel",void 0),e([he()],ao.prototype,"_picking",void 0),e([he()],ao.prototype,"_newCategory",void 0),e([he()],ao.prototype,"_removing",void 0),e([he()],ao.prototype,"_page",void 0),e([he()],ao.prototype,"_creating",void 0),e([he()],ao.prototype,"_error",void 0),ao=e([pe("home-desk-panel")],ao)}();
