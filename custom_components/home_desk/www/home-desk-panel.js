/*! home-desk-panel v0.1.0 | MIT */
!function(){"use strict";function e(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let n=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(t,e))}return e}toString(){return this.cssText}};const r=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new n(i,e,s)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,m=g.trustedTypes,f=m?m.emptyScript:"",b=g.reactiveElementPolyfillSupport,v=(e,t)=>e,x={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},y=(e,t)=>!l(e,t),_={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=_){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&c(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:o}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const n=s?.call(this);o?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{if(i)e.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,e.appendChild(s)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:x).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:x;this._$Em=s;const n=o.fromAttribute(t,e.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(e,t,i,s=!1,o){if(void 0!==e){const n=this.constructor;if(!1===s&&(o=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??y)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==o||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,b?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,$=e=>e,A=k.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,T="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+C,R=`<${z}>`,E=document,I=()=>E.createComment(""),L=e=>null===e||"object"!=typeof e&&"function"!=typeof e,N=Array.isArray,M="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,D=/>/g,U=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,j=/"/g,B=/^(?:script|style|textarea|title)$/i,q=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),F=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),G=new WeakMap,Y=E.createTreeWalker(E,129);function Z(e,t){if(!N(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}let V=class e{constructor({strings:t,_$litType$:i},s){let o;this.parts=[];let n=0,r=0;const a=t.length-1,l=this.parts,[c,d]=((e,t)=>{const i=e.length-1,s=[];let o,n=2===t?"<svg>":3===t?"<math>":"",r=O;for(let t=0;t<i;t++){const i=e[t];let a,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===O?"!--"===l[1]?r=P:void 0!==l[1]?r=D:void 0!==l[2]?(B.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=U):void 0!==l[3]&&(r=U):r===U?">"===l[0]?(r=o??O,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?U:'"'===l[3]?j:H):r===j||r===H?r=U:r===P||r===D?r=O:(r=U,o=void 0);const h=r===U&&e[t+1].startsWith("/>")?" ":"";n+=r===O?i+R:c>=0?(s.push(a),i.slice(0,c)+T+i.slice(c)+C+h):i+C+(-2===c?t:h)}return[Z(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]})(t,i);if(this.el=e.createElement(c,s),Y.currentNode=this.el.content,2===i||3===i){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=Y.nextNode())&&l.length<a;){if(1===o.nodeType){if(o.hasAttributes())for(const e of o.getAttributeNames())if(e.endsWith(T)){const t=d[r++],i=o.getAttribute(e).split(C),s=/([.?@])?(.*)/.exec(t);l.push({type:1,index:n,name:s[2],strings:i,ctor:"."===s[1]?ee:"?"===s[1]?te:"@"===s[1]?ie:J}),o.removeAttribute(e)}else e.startsWith(C)&&(l.push({type:6,index:n}),o.removeAttribute(e));if(B.test(o.tagName)){const e=o.textContent.split(C),t=e.length-1;if(t>0){o.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],I()),Y.nextNode(),l.push({type:2,index:++n});o.append(e[t],I())}}}else if(8===o.nodeType)if(o.data===z)l.push({type:2,index:n});else{let e=-1;for(;-1!==(e=o.data.indexOf(C,e+1));)l.push({type:7,index:n}),e+=C.length-1}n++}}static createElement(e,t){const i=E.createElement("template");return i.innerHTML=e,i}};function Q(e,t,i=e,s){if(t===F)return t;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=L(t)?void 0:t._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(e),o._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(t=Q(e,o._$AS(e,t.values),o,s)),t}class X{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??E).importNode(t,!0);Y.currentNode=s;let o=Y.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let t;2===a.type?t=new K(o,o.nextSibling,this,e):1===a.type?t=new a.ctor(o,a.name,a.strings,this,e):6===a.type&&(t=new se(o,this,e)),this._$AV.push(t),a=i[++r]}n!==a?.index&&(o=Y.nextNode(),n++)}return Y.currentNode=E,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}let K=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),L(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==F&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>N(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&L(this._$AH)?this._$AA.nextSibling.data=e:this.T(E.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=V.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new X(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=G.get(e.strings);return void 0===t&&G.set(e.strings,t=new V(e)),t}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,o=0;for(const n of t)o===i.length?i.push(s=new e(this.O(I()),this.O(I()),this,this.options)):s=i[o],s._$AI(n),o++;o<i.length&&(this._$AR(s&&s._$AB.nextSibling,o),i.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}};class J{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,s){const o=this.strings;let n=!1;if(void 0===o)e=Q(this,e,t,0),n=!L(e)||e!==this._$AH&&e!==F,n&&(this._$AH=e);else{const s=e;let r,a;for(e=o[0],r=0;r<o.length-1;r++)a=Q(this,s[i+r],t,r),a===F&&(a=this._$AH[r]),n||=!L(a)||a!==this._$AH[r],a===W?e=W:e!==W&&(e+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}let ee=class extends J{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}},te=class extends J{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}},ie=class extends J{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??W)===F)return;const i=this._$AH,s=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}};class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const oe=k.litHtmlPolyfillSupport;oe?.(V,K),(k.litHtmlVersions??=[]).push("3.3.3");const ne=globalThis;let re=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let o=s._$litPart$;if(void 0===o){const e=i?.renderBefore??null;s._$litPart$=o=new K(t.insertBefore(I(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}};re._$litElement$=!0,re.finalized=!0,ne.litElementHydrateSupport?.({LitElement:re});const ae=ne.litElementPolyfillSupport;ae?.({LitElement:re}),(ne.litElementVersions??=[]).push("4.2.2");const le={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:y},ce=(e=le,t,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),"accessor"===s){const{name:s}=i;return{set(i){const o=t.get.call(this);t.set.call(this,i),this.requestUpdate(s,o,e,!0,i)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];t.call(this,i),this.requestUpdate(s,o,e,!0,i)}}throw Error("Unsupported decorator location: "+s)};function de(e){return(t,i)=>"object"==typeof i?ce(e,t,i):((e,t,i)=>{const s=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),s?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function he(e){return de({...e,state:!0,attribute:!1})}const pe=e=>(t,i)=>{const s=()=>{customElements.get(e)?console.info(`home-desk: <${e}> already defined — reload the page to pick up the updated panel.`):customElements.define(e,t)};void 0!==i?i.addInitializer(s):s()},ue=r`
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
    /* Filled fields, as in Home Assistant's forms: a grey box with a line under it. */
    background: var(--ha-color-form-background, color-mix(in srgb, var(--st-fg) 12%, transparent));
    border: none;
    border-bottom: 1px solid color-mix(in srgb, var(--st-fg) 60%, transparent);
    border-radius: 4px 4px 0 0;
  }
  input[type="text"]:hover,
  input[type="search"]:hover,
  select:hover,
  textarea:hover {
    background: var(--ha-color-form-background-hover, color-mix(in srgb, var(--st-fg) 16%, transparent));
    border-bottom-color: var(--st-fg);
  }
  input[type="text"],
  input[type="search"],
  select {
    height: 48px;
    padding: 0 16px;
  }
  select {
    padding-right: 4px;
  }
  textarea {
    padding: 12px 16px;
    resize: vertical;
    line-height: 1.5;
  }
  input:focus-visible,
  select:focus-visible,
  textarea:focus-visible {
    outline: none;
    border-bottom: 2px solid var(--st-accent);
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
`,ge=r`
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
        main:not(.has-selection) st-ticket-detail,
        main st-home-page {
          display: none;
        }
      }
      /* HA's data-table toolbar (hass-tabs-subpage-data-table): 56px, on the page background. */
      st-ticket-list {
        flex: 1;
        min-height: 0;
      }
      st-ticket-detail,
      st-home-page {
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
      st-ticket-detail,
      st-home-page {
        min-width: 0;
      }
`;class me{constructor(e){this.hass=e}send(e,t={}){return this.hass.connection.sendMessagePromise({type:`home_desk/${e}`,...t})}async list(e){return(await this.send("list",{status:"all",...e?{q:e}:{}})).tickets}async categories(){try{return(await this.send("categories")).categories}catch{return[]}}createCategory(e){return this.send("category_create",e)}updateCategory(e,t){return this.send("category_update",{category_id:e,...t})}deleteCategory(e){return this.send("category_delete",{category_id:e})}async settings(){try{return await this.send("settings")}catch{return{auto_close:"7d",agent:"",repairs:!0,stt:"",transcribe:!0,agent_states:!0,agent_config:!0,agent_related:!0,agent_daily_cap:30,agent_prompt:"",agent_prompt_default:"",agent_prompt_fixed:"",notify:{targets:[],new_ticket:!0,comment:!0,resolved:!1}}}}saveSettings(e){return this.send("settings_save",e)}async labels(){return(await this.send("labels")).labels}createLabel(e){return this.send("label_create",e)}updateLabel(e,t){return this.send("label_update",{label_id:e,...t})}deleteLabel(e){return this.send("label_delete",{label_id:e})}get(e){return this.send("get",{ticket_id:e})}create(e){return this.send("create",{...e})}update(e,t){return this.send("update",{ticket_id:e,...t})}runAgent(e){return this.send("agent_run",{ticket_id:e})}async suggest(e){return(await this.send("suggest",{ticket_id:e})).suggestions}proposal(e,t,i){return this.send("proposal",{ticket_id:e,event_id:t,do:i})}stopAgent(e){return this.send("agent_stop",{ticket_id:e})}testAgent(){return this.send("agent_test")}markRead(e){return this.send("mark_read",e?{ticket_ids:e}:{})}merge(e,t){return this.send("merge",{ticket_id:e,merge_ids:t})}comment(e,t,i){return this.send("comment",{ticket_id:e,body:t,internal:i})}close(e,t,i){return this.send("close",{ticket_id:e,resolution:t,status:i})}async report(e){if(!this.hass.fetchWithAuth)throw new Error("This page can't send files");const t=await this.hass.fetchWithAuth("/api/home_desk/report",{method:"POST",body:e}),i=await t.json().catch(()=>({}));if(!t.ok)throw new Error(i.message||`The report couldn't be sent (${t.status})`);return i}async attachmentUrl(e,t){const i=`/api/home_desk/attachment/${e}/${t}`;if(!this.hass.callWS)return i;const{path:s}=await this.hass.callWS({type:"auth/sign_path",path:i,expires:3600});return s}subscribe(e){return this.hass.connection.subscribeEvents(e,"home_desk_event")}}const fe={new:"New",open:"In Progress",in_progress:"In Progress",resolved:"Resolved",closed:"Closed"},be={new:"mdi:circle-outline",open:"mdi:circle-slice-4",in_progress:"mdi:circle-slice-4",resolved:"mdi:check-circle-outline",closed:"mdi:close-circle-outline"},ve={new:"var(--success-color, #43a047)",open:"var(--primary-color)",in_progress:"var(--primary-color)",resolved:"var(--purple-color, #926bc7)",closed:"var(--secondary-text-color)"},xe={low:"Low",normal:"Normal",high:"High",urgent:"Urgent"},ye=[["year",31536e3],["month",2592e3],["day",86400],["hour",3600],["minute",60]];function _e(e,t){const i=(new Date(e).getTime()-Date.now())/1e3,s=new Intl.RelativeTimeFormat(t,{numeric:"auto"});for(const[e,t]of ye)if(Math.abs(i)>=t)return s.format(Math.round(i/t),e);return s.format(0,"second")}function we(e){const t=e.toLowerCase();return t.startsWith("ai:")||t.includes("claude")}function ke(e){if(we(e))return"mdi:star-four-points-outline";const t=e.toLowerCase();return"ha"===t||"home assistant"===t?"mdi:home-assistant":"mdi:account-outline"}function $e(e){const t=e.replace(/^ai:/i,"");return t===t.toLowerCase()?t.charAt(0).toUpperCase()+t.slice(1):t}const Ae={primary:"#03a9f4",accent:"#ff9800",red:"#f44336",pink:"#e91e63",purple:"#926bc7","deep-purple":"#6e41ab",indigo:"#3f51b5",blue:"#2196f3","light-blue":"#03a9f4",cyan:"#00bcd4",teal:"#009688",green:"#4caf50","light-green":"#8bc34a",lime:"#cddc39",yellow:"#ffeb3b",amber:"#ffc107",orange:"#ff9800","deep-orange":"#ff6f22",brown:"#795548","light-grey":"#bdbdbd",grey:"#9e9e9e","dark-grey":"#606060","blue-grey":"#607d8b",black:"#000000",white:"#ffffff"};function Se(e){return"primary"===e?"var(--primary-color, #03a9f4)":"accent"===e?"var(--accent-color, #ff9800)":`var(--${e}-color, ${Ae[e]??"#9e9e9e"})`}function Te(e){const t=e.trim();let i=/^#([0-9a-f]{3})$/i.exec(t);return i?[...i[1]].map(e=>parseInt(e+e,16)):(i=/^#([0-9a-f]{6})/i.exec(t),i?[0,2,4].map(e=>parseInt(i[1].slice(e,e+2),16)):(i=/^rgba?\(\s*(\d+)[ ,]+(\d+)[ ,]+(\d+)/i.exec(t),i?[Number(i[1]),Number(i[2]),Number(i[3])]:null))}function Ce(e){const t=e.replace(/-/g," ");return t.charAt(0).toUpperCase()+t.slice(1)}function ze(e,t){return e.get(t)??{id:t,name:t,color:"grey",description:"",icon:"",builtin:!1,count:0}}function Re(e){return $e(e)}const Ee={created:"opened this",comment:"commented",note:"added a note",status:"changed the status",priority:"changed the priority",assignee:"changed the assignee",field:"edited it",link:"linked a ticket",merge:"merged a ticket",attachment:"added a file"},Ie=e=>`AI Review (${$e(e)})`,Le=["low","normal","high","urgent"],Ne=["primary","accent","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","light-grey","grey","dark-grey","blue-grey","black","white"],Me=["new","open","in_progress"],Oe="blocked",Pe=e=>e.labels.includes("history"),De=e=>Me.includes(e.status)&&!Pe(e),Ue=e=>e.labels.includes("enhancement"),He=[{id:"active",icon:"mdi:inbox-outline",label:"Inbox",count:!0,match:e=>"new"===e.status&&!Pe(e)&&!Ue(e)},{id:"progress",icon:"mdi:progress-wrench",label:"In Progress",count:!0,match:e=>("in_progress"===e.status||"open"===e.status)&&!Pe(e)},{id:"agent",icon:"mdi:star-four-points-outline",label:"Assigned to AI",count:!0,match:e=>De(e)&&we(e.assignee??"")},{id:"enhancements",icon:"mdi:lightbulb-outline",label:"Enhancements",count:!0,match:e=>De(e)&&Ue(e)},{id:"all",icon:"mdi:format-list-bulleted",label:"All",match:()=>!0}],je=[{id:"",label:"Everything",match:e=>!Pe(e)},{id:"active",label:"Open",match:De},{id:"closed",label:"Closed",match:e=>("resolved"===e.status||"closed"===e.status)&&!Pe(e)},{id:"history",label:"History",match:Pe}],Be=je.map(({id:e,label:t})=>({id:e,label:t}));function qe(e,t,i){const s=He.find(e=>e.id===t.view)??He[0];return e.filter(e=>s.match(e)&&("all"!==s.id||!t.scope||je.find(e=>e.id===t.scope).match(e))&&(!i||i.has(e.id))&&(!t.priority||e.priority===t.priority)&&(!t.label||e.labels.includes(t.label))&&(!t.person||e.requester===t.person)&&(!t.category||("none"===t.category?!e.category:e.category===t.category)))}function Fe(e){return[e.category,e.priority,e.label,e.person,"all"===e.view?e.scope:""].filter(Boolean).length}let We=class extends re{constructor(){super(...arguments),this.categoryMap=new Map,this.labelMap=new Map,this.isAdmin=!1,this.maxBadges=4,this.coloured=!1,this.expanded=!1,this.show="all"}_pickCategory(e,t){e.stopPropagation(),e.preventDefault(),this.dispatchEvent(new CustomEvent("pick-category",{detail:{ticket:t,rect:e.currentTarget.getBoundingClientRect()},bubbles:!0,composed:!0}))}_category(e){const t=e.category?this.categoryMap.get(e.category):void 0,i=t=>this._pickCategory(t,e),s=t=>("Enter"===t.key||" "===t.key)&&this._pickCategory(t,e);if(!t&&!this.isAdmin)return W;const o=t?q`<ha-icon .icon=${t.icon||"mdi:tag-outline"}></ha-icon>${t.name}`:q`<ha-icon icon="mdi:plus"></ha-icon>Add Category`;return this.isAdmin?q`<span class="category clickable ${t?"":"none"}" role="button" tabindex="0" aria-haspopup="listbox"
          aria-label=${t?`Category: ${t.name}. Change`:"Add Category"} @click=${i} @keydown=${s}>${o}</span>`:q`<span class="category">${o}</span>`}_askRemove(e,t,i){e.stopPropagation(),e.preventDefault(),this.dispatchEvent(new CustomEvent("remove-label",{detail:{ticket:t,label:i},bubbles:!0,composed:!0}))}_badges(e){const t=e.labels.filter(e=>"home-assistant"!==e).map(e=>ze(this.labelMap,e));return q`${t.slice(0,this.maxBadges).map(t=>q`<span class="badge" role=${this.isAdmin?"group":"img"} aria-label=${t.name}
        style="--label-color: ${Se(t.color)}; --label-fg: ${function(e){let t=null;try{const i="primary"===e?"--primary-color":"accent"===e?"--accent-color":`--${e}-color`;t=Te(getComputedStyle(document.documentElement).getPropertyValue(i))}catch{}t??(t=Te(Ae[e]??"#9e9e9e")??[158,158,158]);const i=(([e,t,i])=>{const[s,o,n]=[e,t,i].map(e=>{const t=e/255;return t<=.03928?t/12.92:((t+.055)/1.055)**2.4});return.2126*s+.7152*o+.0722*n})(t);return(i+.05)/.05>=1.05/(i+.05)?"#000000":"#ffffff"}(t.color)}"><ha-icon .icon=${t.icon||"mdi:label-outline"}></ha-icon><span class="name">${t.name}</span>${this.isAdmin?q`<span class="x" role="button" tabindex="0" aria-label="Remove ${t.name} from this ticket"
              @click=${i=>this._askRemove(i,e,t)}
              @keydown=${i=>("Enter"===i.key||" "===i.key)&&this._askRemove(i,e,t)}><ha-icon icon="mdi:close"></ha-icon></span>`:W}</span>`)}${t.length>this.maxBadges?q`<span class="more-labels">+${t.length-this.maxBadges}</span>`:W}`}render(){const e=this.ticket;return q`${"labels"!==this.show?this._category(e):W}${"category"!==this.show?q`${this._badges(e)}<slot></slot>`:W}`}};We.styles=[ue,r`
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
    `],e([de({attribute:!1})],We.prototype,"ticket",void 0),e([de({attribute:!1})],We.prototype,"categoryMap",void 0),e([de({attribute:!1})],We.prototype,"labelMap",void 0),e([de({type:Boolean})],We.prototype,"isAdmin",void 0),e([de({type:Number})],We.prototype,"maxBadges",void 0),e([de({type:Boolean,reflect:!0})],We.prototype,"coloured",void 0),e([de({type:Boolean,reflect:!0})],We.prototype,"expanded",void 0),e([de()],We.prototype,"show",void 0),We=e([pe("st-ticket-tags")],We);let Ge=class extends re{constructor(){super(...arguments),this.tickets=[],this.selectedId=null,this.language=void 0,this.isAdmin=!1,this.categoryMap=new Map,this.labelMap=new Map,this.checked=new Set,this.ticking=!1,this._pressed=!1}_toggle(e,t=!1){this.dispatchEvent(new CustomEvent("toggle-check",{detail:{id:e,range:t},bubbles:!0,composed:!0}))}_pressStart(e){this.isAdmin&&(this._pressed=!1,window.clearTimeout(this._pressTimer),this._pressTimer=window.setTimeout(()=>{this._pressed=!0,this._toggle(e)},500))}_pressEnd(){window.clearTimeout(this._pressTimer)}_rowClick(e,t){this._pressed?this._pressed=!1:this.isAdmin&&(this.ticking||t.shiftKey||t.ctrlKey||t.metaKey)?this._toggle(e,t.shiftKey):this._select(e)}updated(e){e.has("selectedId")&&this.renderRoot.querySelector(".row.selected")?.scrollIntoView({block:"nearest"})}_select(e){this.dispatchEvent(new CustomEvent("select-ticket",{detail:e,bubbles:!0,composed:!0}))}_filterPerson(e,t){e.stopPropagation(),e.preventDefault(),this.dispatchEvent(new CustomEvent("filter-person",{detail:t,bubbles:!0,composed:!0}))}render(){return this.tickets.length?q`${this.tickets.map(e=>{const t="resolved"===e.status||"closed"===e.status;return q`
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
                @keydown=${t=>("Enter"===t.key||" "===t.key)&&this._filterPerson(t,e.requester)}><ha-icon icon=${ke(e.requester)}></ha-icon> ${$e(e.requester)}</span></span>
              ${e.agent_state?q`<span class="working"><ha-icon icon="mdi:star-four-points"></ha-icon> ${Ie(`ai:${e.agent_state.agent}`)} working…</span>`:W}
              ${e.unread&&e.activity&&"created"!==e.activity.kind?q`<span class="activity"><ha-icon icon=${ke(e.activity.actor)}></ha-icon> ${$e(e.activity.actor)} ${i=e.activity.kind,Ee[i]??"updated it"} ${_e(e.activity.at,this.language)}</span>`:e.updated_by?q`<span>Updated ${_e(e.updated_at,this.language)} by <ha-icon icon=${ke(e.updated_by)}></ha-icon> ${$e(e.updated_by)}</span>`:W}
              ${e.assignee&&we(e.assignee)?q`<span><ha-icon icon=${ke(e.assignee)}></ha-icon> With AI Agent</span>`:W}
              ${e.labels.includes(Oe)?q`<span class="blocked" title="Waiting on a person, a part or a fix"><ha-icon icon="mdi:timer-sand"></ha-icon> Blocked</span>`:W}
              ${e.comment_count?q`<span><ha-icon icon="mdi:comment-outline"></ha-icon> ${e.comment_count}</span>`:W}
              ${e.attachment_count?q`<span title="Photos and voice messages"><ha-icon icon="mdi:paperclip"></ha-icon> ${e.attachment_count}</span>`:W}
            </div>
            <div class="meta2"><st-ticket-tags .ticket=${e} .categoryMap=${this.categoryMap} .labelMap=${this.labelMap} .isAdmin=${this.isAdmin}></st-ticket-tags></div>
          </div>
          ${"urgent"===e.priority||"high"===e.priority?q`<ha-icon class="prio ${e.priority}" .icon=${"urgent"===e.priority?"mdi:alert":"mdi:alert-outline"}
                role="img" aria-label="${xe[e.priority]} priority"></ha-icon>`:q`<span></span>`}
        </button>
      `;var i})}`:q`<div class="empty">No tickets here.</div>`}};Ge.styles=[ue,r`
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
        font-weight: 700;
      }
      /* The AI Agent is working on it: a sparkle that pulses. */
      .meta .working {
        color: var(--st-accent);
        font-weight: 500;
      }
      .meta .working ha-icon {
        animation: working 1.4s ease-in-out infinite;
      }
      @keyframes working {
        50% {
          opacity: 0.3;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .meta .working ha-icon {
          animation: none;
        }
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
        font-weight: 500;
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
        margin-top: 10px;
      }
      .meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 6px 12px;
        margin-top: 6px;
        line-height: 1.4;
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
        display: inline-flex;
        flex: none;
        align-self: center;
      }
      /* The name, with its icon: one flex row so the icon sits on the text's centre line. */
      .who {
        display: inline-flex;
        align-items: center;
        gap: 3px;
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
      /* "Opened…" always has its own line; "Updated…", the comment count and the rest follow on the next. */
      .ref {
        flex-basis: 100%;
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
    `],e([de({attribute:!1})],Ge.prototype,"tickets",void 0),e([de({type:Number})],Ge.prototype,"selectedId",void 0),e([de()],Ge.prototype,"language",void 0),e([de({type:Boolean})],Ge.prototype,"isAdmin",void 0),e([de({attribute:!1})],Ge.prototype,"categoryMap",void 0),e([de({attribute:!1})],Ge.prototype,"labelMap",void 0),e([de({attribute:!1})],Ge.prototype,"checked",void 0),e([de({type:Boolean})],Ge.prototype,"ticking",void 0),Ge=e([pe("st-ticket-list")],Ge);const Ye=2;class Ze{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}class Ve extends Ze{constructor(e){if(super(e),this.it=W,e.type!==Ye)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===W||null==e)return this._t=void 0,this.it=e;if(e===F)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}Ve.directiveName="unsafeHTML",Ve.resultType=1;const Qe=(e=>(...t)=>({_$litDirective$:e,values:t}))(Ve);let Xe=class extends re{constructor(){super(...arguments),this.options=[],this.value="",this.label="",this.placeholder="",this.plain=!1,this.active=!1,this.icon="",this.field=!1,this.up=!1,this._open=!1,this._at=""}_toggle(e){if(this._open)return void(this._open=!1);const t=e.currentTarget.getBoundingClientRect(),i=window.innerHeight-t.bottom,s=this.up||i<260&&t.top>i,o=Math.max(120,(s?t.top:i)-12);this._at=`left:${t.left}px;min-width:${t.width}px;max-height:${Math.min(o,.6*window.innerHeight)}px;${s?`bottom:${window.innerHeight-t.top+4}px`:`top:${t.bottom+4}px`}`,this._open=!0}_pick(e){this._open=!1,e!==this.value&&this.dispatchEvent(new CustomEvent("change",{detail:e,bubbles:!0,composed:!0}))}render(){const e=this.options.find(e=>e.id===this.value)??this.options[0];return q`
      <button class="dd ${this.active||this.value&&!this.plain?"active":""}" aria-haspopup="listbox" aria-expanded=${this._open}
        aria-label=${this.label} @click=${e=>this._toggle(e)}
        @keydown=${e=>"Escape"===e.key&&(this._open=!1)}>
        ${this.icon?q`<ha-icon class="lead" icon=${this.icon}></ha-icon>`:W}<span>${!this.value&&this.placeholder?this.placeholder:e?.label??""}</span><ha-icon icon="mdi:menu-down"></ha-icon>
      </button>
      ${this._open?q`<button class="backdrop" tabindex="-1" aria-label="Close" @click=${()=>this._open=!1}></button>
            <div class="menu" role="listbox" style=${this._at} @keydown=${e=>"Escape"===e.key&&(this._open=!1)}>
              ${this.options.map(e=>q`<button role="option" aria-selected=${e.id===this.value}
                class=${e.id===this.value?"selected":""} @click=${()=>this._pick(e.id)}>${e.label}</button>`)}
            </div>`:W}
    `}};Xe.styles=[ue,r`
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
      /* A filled field, as in Home Assistant's settings: a grey box with a line under it. */
      :host([field]) button.dd {
        height: 56px;
        padding: 0 12px 0 16px;
        border: none;
        border-bottom: 1px solid color-mix(in srgb, var(--st-fg) 60%, transparent);
        border-radius: 4px 4px 0 0;
        background: var(--ha-color-fill-neutral-quiet-resting, color-mix(in srgb, var(--st-fg) 22%, transparent));
        font-size: var(--st-fs-field);
      }
      :host([field]) button.dd:hover {
        border-bottom-color: var(--st-fg);
      }
      :host([field]) button.dd[aria-expanded="true"] {
        border-bottom: 2px solid var(--st-accent);
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
      button.dd ha-icon.lead {
        margin-left: -4px;
        color: inherit;
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
      /* Fixed, placed from the button's position when it opens, so a card or pane with overflow hidden can't clip it. */
      .menu {
        position: fixed;
        z-index: 11;
        width: max-content;
        max-width: calc(100vw - 32px);
        max-height: 60vh;
        overflow-y: auto;
        padding: 8px 0;
        border-radius: 4px;
        background: var(--st-surface);
        box-shadow: var(--st-shadow-m);
        outline: 1px solid var(--st-divider);
      }
      .menu button {
        display: flex;
        width: auto;
        min-width: 100%;
        box-sizing: border-box;
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
    `],e([de({attribute:!1})],Xe.prototype,"options",void 0),e([de()],Xe.prototype,"value",void 0),e([de()],Xe.prototype,"label",void 0),e([de()],Xe.prototype,"placeholder",void 0),e([de({type:Boolean})],Xe.prototype,"plain",void 0),e([de({type:Boolean})],Xe.prototype,"active",void 0),e([de()],Xe.prototype,"icon",void 0),e([de({type:Boolean,reflect:!0})],Xe.prototype,"field",void 0),e([de({type:Boolean,reflect:!0})],Xe.prototype,"up",void 0),e([he()],Xe.prototype,"_open",void 0),e([he()],Xe.prototype,"_at",void 0),Xe=e([pe("st-dropdown")],Xe);const Ke=16e3;async function Je(e){try{const t=await createImageBitmap(e,{imageOrientation:"from-image"}),i=Math.min(1,1600/Math.max(t.width,t.height)),s=document.createElement("canvas");s.width=Math.max(1,Math.round(t.width*i)),s.height=Math.max(1,Math.round(t.height*i));const o=s.getContext("2d");if(!o)return e;o.drawImage(t,0,0,s.width,s.height),t.close();const n=await new Promise(e=>s.toBlob(e,"image/jpeg",.85));return n&&n.size<e.size||i<1&&n?n:e}catch{return e}}function et(e,t){const i=t===Ke?e:function(e,t,i){const s=t/i,o=new Float32Array(Math.floor(e.length/s));for(let t=0;t<o.length;t++){const i=Math.floor(t*s),n=Math.min(e.length,Math.max(i+1,Math.floor((t+1)*s)));let r=0;for(let t=i;t<n;t++)r+=e[t];o[t]=r/(n-i)}return o}(e,t,Ke),s=new ArrayBuffer(44+2*i.length),o=new DataView(s),n=(e,t)=>[...t].forEach((t,i)=>o.setUint8(e+i,t.charCodeAt(0)));return n(0,"RIFF"),o.setUint32(4,36+2*i.length,!0),n(8,"WAVE"),n(12,"fmt "),o.setUint32(16,16,!0),o.setUint16(20,1,!0),o.setUint16(22,1,!0),o.setUint32(24,Ke,!0),o.setUint32(28,32e3,!0),o.setUint16(32,2,!0),o.setUint16(34,16,!0),n(36,"data"),o.setUint32(40,2*i.length,!0),i.forEach((e,t)=>o.setInt16(44+2*t,32767*Math.max(-1,Math.min(1,e)),!0)),new Blob([s],{type:"audio/wav"})}const tt=e=>`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`;let it=class extends re{constructor(){super(...arguments),this.ticketId=0,this.items=[],this._urls={},this._open="",this._signedFor=""}willUpdate(){const e=`${this.ticketId}:${this.items.map(e=>e.id).join(",")}`;if(e===this._signedFor||!this.client)return;this._signedFor=e,this._urls={};const t=this.ticketId;for(const e of this.items)this.client.attachmentUrl(t,e.id).then(i=>{t===this.ticketId&&(this._urls={...this._urls,[e.id]:i})}).catch(()=>{})}render(){const e=this.items.filter(e=>"image"===e.kind),t=this.items.filter(e=>"audio"===e.kind);return e.length||t.length?q`
      ${e.length?q`<div class="photos">
            ${e.map(e=>this._urls[e.id]?q`<button title=${e.name} aria-label=${`Open ${e.name}`} @click=${()=>this._open=e.id}>
                    <img src=${this._urls[e.id]} alt=${e.name} loading="lazy" />
                  </button>`:W)}
          </div>`:W}
      ${t.map(e=>q`<div class="voice">
          <ha-icon icon="mdi:microphone-outline"></ha-icon>
          ${this._urls[e.id]?q`<audio controls preload="none" src=${this._urls[e.id]}></audio>`:W}
          ${e.seconds?q`<span class="length">${tt(e.seconds)}</span>`:W}
        </div>`)}
      ${this._open&&this._urls[this._open]?q`<div class="lightbox" @click=${()=>this._open=""}>
            <img src=${this._urls[this._open]} alt="" />
            <button class="icon" aria-label="Close" @click=${()=>this._open=""}><ha-icon icon="mdi:close"></ha-icon></button>
          </div>`:W}
    `:W}};it.styles=[ue,r`
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
    `],e([de({attribute:!1})],it.prototype,"client",void 0),e([de({type:Number})],it.prototype,"ticketId",void 0),e([de({attribute:!1})],it.prototype,"items",void 0),e([he()],it.prototype,"_urls",void 0),e([he()],it.prototype,"_open",void 0),it=e([pe("st-ticket-attachments")],it);let st=class extends re{constructor(){super(...arguments),this.rect=null,this.items=[],this.additional=()=>[],this.value="",this.emptyLabel="Nothing here",this.limit=0,this._q="",this._active=0}get _rows(){const e=this._q.trim().toLowerCase(),t=e?this.items.filter(t=>`${t.primary} ${t.secondary??""}`.toLowerCase().includes(e)):this.items;return[...this.limit?t.slice(0,this.limit):t,...this.additional(this._q.trim())]}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_onKey(e){const t=this._rows;"Escape"===e.key?this._fire("close"):"ArrowDown"===e.key?(this._active=Math.min(this._active+1,t.length-1),e.preventDefault()):"ArrowUp"===e.key?(this._active=Math.max(this._active-1,0),e.preventDefault()):"Enter"===e.key&&t[this._active]&&this._fire("pick",{id:t[this._active].id,search:this._q.trim()})}firstUpdated(){this.renderRoot.querySelector("input")?.focus()}get _position(){const e=this.rect;if(!e)return"";const t=Math.max(8,Math.min(e.left,window.innerWidth-348)),i=window.innerHeight-e.bottom;return i>=300||i>=e.top?`left:${t}px;top:${e.bottom+4}px;max-height:${Math.max(160,Math.min(380,i-12))}px`:`left:${t}px;bottom:${window.innerHeight-e.top+4}px;max-height:${Math.max(160,Math.min(380,e.top-12))}px`}render(){const e=this._rows;return q`
      <button class="backdrop" tabindex="-1" aria-label="Close" @click=${()=>this._fire("close")}></button>
      <div class="popup" style=${this._position} role="listbox" @keydown=${this._onKey}>
        <div class="search">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input type="search" placeholder="Search" aria-label="Search" .value=${this._q}
            @input=${e=>{this._q=e.target.value,this._active=0}} />
        </div>
        <div class="list">
          ${this.limit&&this.items.length>this.limit&&!this._q.trim()?q`<div class="empty">Type to search ${this.items.length} items</div>`:W}
          ${e.length?W:q`<div class="empty">${this.emptyLabel}</div>`}
          ${e.map((e,t)=>q`<button class="item ${t===this._active?"active":""} ${e.id===this.value?"current":""}"
            role="option" aria-selected=${e.id===this.value}
            @mouseenter=${()=>this._active=t}
            @click=${()=>this._fire("pick",{id:e.id,search:this._q.trim()})}>
            <ha-icon .icon=${e.icon??"mdi:tag-outline"}></ha-icon>
            <span class="text"><span>${e.primary}</span>${e.secondary?q`<span class="secondary">${e.secondary}</span>`:W}</span>
          </button>`)}
        </div>
      </div>`}};st.styles=[ue,r`
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
    `],e([de({attribute:!1})],st.prototype,"rect",void 0),e([de({attribute:!1})],st.prototype,"items",void 0),e([de({attribute:!1})],st.prototype,"additional",void 0),e([de()],st.prototype,"value",void 0),e([de()],st.prototype,"emptyLabel",void 0),e([de({type:Number})],st.prototype,"limit",void 0),e([he()],st.prototype,"_q",void 0),e([he()],st.prototype,"_active",void 0),st=e([pe("st-picker-popup")],st);const ot={light:"mdi:lightbulb",switch:"mdi:toggle-switch",sensor:"mdi:eye",binary_sensor:"mdi:radiobox-marked",climate:"mdi:thermostat",lock:"mdi:lock",cover:"mdi:window-shutter",camera:"mdi:video",media_player:"mdi:play-circle",automation:"mdi:robot",script:"mdi:script-text",person:"mdi:account",fan:"mdi:fan",vacuum:"mdi:robot-vacuum",device_tracker:"mdi:account",alarm_control_panel:"mdi:shield-home",update:"mdi:package-up",input_boolean:"mdi:toggle-switch",scene:"mdi:palette"};let nt=class extends re{constructor(){super(...arguments),this.entities=[],this.devices=[],this.areas=[],this.editable=!1,this.ticketId=null,this.addLabel="Add device, entity or area",this._rect=null,this._guesses=[],this._guessedFor=""}get _reg(){return this.hass}get _empty(){return!this.entities.length&&!this.devices.length&&!this.areas.length}willUpdate(e){const t=`${this.ticketId}|${this.entities.length}|${this.devices.length}|${this.areas.length}`;(e.has("ticketId")||e.has("entities")||e.has("devices")||e.has("areas"))&&t!==this._guessedFor&&(this._guessedFor=t,this._guesses=[],null!==this.ticketId&&this.client&&this.editable&&this._empty&&this._loadGuesses(this.ticketId))}async _loadGuesses(e){try{const t=await this.client.suggest(e);e===this.ticketId&&this._empty&&(this._guesses=t)}catch{}}_areaName(e){return e&&this._reg.areas?.[e]?.name||""}_describe(e,t){if("area"===e){const e=this._reg.areas?.[t];return{name:e?.name??t,icon:e?.icon||"mdi:texture-box",detail:"",bad:!1,gone:!!this._reg.areas&&!e,area:""}}if("device"===e){const e=this._reg.devices?.[t];return{name:e?.name_by_user||e?.name||t,icon:"mdi:devices",detail:this._areaName(e?.area_id),bad:!1,gone:!!this._reg.devices&&!e,area:this._areaName(e?.area_id)}}const i=this.hass?.states?.[t],s=String(i?.attributes.friendly_name??t),o=i?.attributes.unit_of_measurement,n=i?`${i.state}${o?` ${String(o)}`:""}`:"";return{name:s,icon:String(i?.attributes.icon??ot[t.split(".")[0]??""]??"mdi:shape-outline"),detail:n,bad:"unavailable"===i?.state||"unknown"===i?.state,gone:!i,area:""}}_icon(e,t,i){return"entity"===e&&this.hass?.states?.[t]&&customElements.get("ha-state-icon")?q`<ha-state-icon .hass=${this.hass} .stateObj=${this.hass.states[t]}></ha-state-icon>`:q`<ha-icon .icon=${i}></ha-icon>`}_open(e,t){if("entity"===e)return void this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}));const i="device"===e?`/config/devices/device/${t}`:`/config/areas/area/${t}`;try{history.pushState(null,"",i),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}catch{}}_current(){return{entities:[...this.entities],devices:[...this.devices],areas:[...this.areas]}}_changed(e){this.dispatchEvent(new CustomEvent("change",{detail:e,bubbles:!0,composed:!0}))}_add(e,t){const i=this._current(),s="entity"===e?i.entities:"device"===e?i.devices:i.areas;s.includes(t)||s.push(t),this._guesses=this._guesses.filter(i=>!(i.kind===e&&i.id===t)),this._changed(i)}_remove(e,t){const i=this._current(),s="entity"===e?"entities":"device"===e?"devices":"areas";i[s]=i[s].filter(e=>e!==t),this._changed(i)}get _items(){const e=new Set([...this.entities.map(e=>`entity:${e}`),...this.devices.map(e=>`device:${e}`),...this.areas.map(e=>`area:${e}`)]),t=[];for(const i of Object.values(this._reg.areas??{}))e.has(`area:${i.area_id}`)||t.push({id:`area:${i.area_id}`,primary:i.name,secondary:"Area",icon:i.icon||"mdi:texture-box"});for(const i of Object.values(this._reg.devices??{})){const s=i.name_by_user||i.name;if(s&&!e.has(`device:${i.id}`)){const e=this._areaName(i.area_id);t.push({id:`device:${i.id}`,primary:s,secondary:e?`Device · ${e}`:"Device",icon:"mdi:devices"})}}for(const[i,s]of Object.entries(this.hass?.states??{}))e.has(`entity:${i}`)||t.push({id:`entity:${i}`,primary:String(s.attributes.friendly_name??i),secondary:i,icon:ot[i.split(".")[0]??""]??"mdi:shape-outline"});return t}_picked(e){this._rect=null;const[t,...i]=e.split(":");this._add(t,i.join(":"))}_chip(e,t){const i=this._describe(e,t);return q`<span class="chip ${i.gone?"gone":""}">
      <button class="open" title=${"entity"===e?`${t}: open in Home Assistant`:`Open this ${e} in Home Assistant`} @click=${()=>this._open(e,t)}>
        ${this._icon(e,t,i.icon)}<span class="name">${i.name}</span>
        ${i.gone?q`<span class="detail">not found</span>`:i.detail?q`<span class="detail ${i.bad?"bad":""}">${"device"===e?i.detail:`· ${i.detail}`}</span>`:W}
      </button>
      ${this.editable?q`<button class="rm" title="Remove" aria-label="Remove ${i.name}" @click=${()=>this._remove(e,t)}><ha-icon icon="mdi:close"></ha-icon></button>`:W}
    </span>`}_guess(e){const t=this._describe(e.kind,e.id);return q`<span class="chip guess">
      <button class="open" title="Add this to the ticket" @click=${()=>this._add(e.kind,e.id)}>
        ${this._icon(e.kind,e.id,t.icon)}<span class="name">${e.name}</span>
        ${e.area&&"area"!==e.kind?q`<span class="detail">${e.area}</span>`:W}
        <ha-icon class="plus" icon="mdi:plus"></ha-icon>
      </button>
    </span>`}render(){const e=!this._empty;return e||this.editable?q`<div class="row">
      ${e?q`<span class="sect">About</span>`:W}
      ${this.devices.map(e=>this._chip("device",e))}
      ${this.entities.map(e=>this._chip("entity",e))}
      ${this.areas.map(e=>this._chip("area",e))}
      ${this.editable?q`<button class="add ${e?"":"wide"}" title=${this.addLabel} aria-label=${this.addLabel}
            @click=${e=>this._rect=e.currentTarget.getBoundingClientRect()}>
            <ha-icon icon="mdi:plus"></ha-icon>${e?W:this.addLabel}</button>`:W}
    </div>
    ${this.editable&&this._empty&&this._guesses.length?q`<div class="row" style="margin-top: 8px">
          <span class="sect">Related?</span>
          ${this._guesses.map(e=>this._guess(e))}
        </div>`:W}
    ${this._rect?q`<st-picker-popup .rect=${this._rect} .items=${this._items} emptyLabel="Nothing matches" .limit=${100}
          @close=${()=>this._rect=null} @pick=${e=>this._picked(e.detail.id)}></st-picker-popup>`:W}`:W}};
/*! @license DOMPurify 3.4.17 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.17/LICENSE */
function rt(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,s=Array(t);i<t;i++)s[i]=e[i];return s}
/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
function at(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var i=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=i){var s,o,n,r,a=[],l=!0,c=!1;try{if(n=(i=i.call(e)).next,0===t);else for(;!(l=(s=n.call(i)).done)&&(a.push(s.value),a.length!==t);l=!0);}catch(e){c=!0,o=e}finally{try{if(!l&&null!=i.return&&(r=i.return(),Object(r)!==r))return}finally{if(c)throw o}}return a}}(e,t)||function(e,t){if(e){if("string"==typeof e)return rt(e,t);var i={}.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?rt(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}nt.styles=[ue,r`
      :host {
        display: block;
      }
      .row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
      }
      .sect {
        font-size: var(--st-fs-caption);
        font-weight: 500;
        color: var(--st-fg-secondary);
        margin-right: 2px;
      }
      /* A chip, like the category pill: outlined, with the icon, name and (for an entity) its state. */
      .chip {
        display: inline-flex;
        align-items: center;
        max-width: 100%;
        height: 28px;
        border: 1px solid var(--st-outline);
        border-radius: var(--st-r-pill);
        color: var(--st-fg);
        font-size: var(--st-fs-caption);
        font-weight: 500;
        overflow: hidden;
      }
      .chip .open {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        min-width: 0;
        height: 100%;
        padding: 0 10px 0 8px;
        border-radius: 0;
        background: transparent;
        color: inherit;
        font: inherit;
      }
      .chip .open:hover,
      .chip .open:focus-visible {
        background: var(--st-hover);
      }
      .chip .open ha-icon,
      .chip .open ha-state-icon {
        --mdc-icon-size: 16px;
        flex: none;
        color: var(--st-fg-secondary);
      }
      .chip .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .chip .detail {
        flex: none;
        font-weight: 400;
        color: var(--st-fg-secondary);
      }
      .chip .detail.bad {
        color: var(--st-warning);
        font-weight: 500;
      }
      .chip.gone .name {
        text-decoration: line-through;
        color: var(--st-fg-secondary);
      }
      .chip .rm {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 100%;
        padding: 0;
        border-radius: 0;
        background: transparent;
        color: var(--st-fg-secondary);
      }
      .chip .rm:hover {
        color: var(--st-fg);
        background: var(--st-hover);
      }
      .chip .rm ha-icon {
        --mdc-icon-size: 14px;
      }
      /* A guess: dashed, and a + to accept it. */
      .chip.guess {
        border-style: dashed;
      }
      .chip.guess .open {
        padding-right: 10px;
      }
      .chip.guess .plus {
        color: var(--st-accent);
      }
      .add {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 28px;
        height: 28px;
        border-radius: 14px;
        border: 1px dashed var(--st-outline);
        color: var(--st-fg-secondary);
        cursor: pointer;
      }
      .add.wide {
        width: auto;
        gap: 4px;
        padding: 0 12px 0 8px;
        font-size: var(--st-fs-caption);
      }
      .add:hover,
      .add:focus-visible {
        color: var(--st-fg);
        border-color: var(--st-field-outline-hover);
      }
      .add ha-icon {
        --mdc-icon-size: 16px;
      }
    `],e([de({attribute:!1})],nt.prototype,"hass",void 0),e([de({attribute:!1})],nt.prototype,"entities",void 0),e([de({attribute:!1})],nt.prototype,"devices",void 0),e([de({attribute:!1})],nt.prototype,"areas",void 0),e([de({type:Boolean})],nt.prototype,"editable",void 0),e([de({type:Number})],nt.prototype,"ticketId",void 0),e([de({attribute:!1})],nt.prototype,"client",void 0),e([de()],nt.prototype,"addLabel",void 0),e([he()],nt.prototype,"_rect",void 0),e([he()],nt.prototype,"_guesses",void 0),nt=e([pe("st-ticket-things")],nt);const lt=Object.entries,ct=Object.setPrototypeOf,dt=Object.isFrozen,ht=Object.getPrototypeOf,pt=Object.getOwnPropertyDescriptor;let ut=Object.freeze,gt=Object.seal,mt=Object.create,ft="undefined"!=typeof Reflect&&Reflect,bt=ft.apply,vt=ft.construct;ut||(ut=function(e){return e}),gt||(gt=function(e){return e}),bt||(bt=function(e,t){for(var i=arguments.length,s=new Array(i>2?i-2:0),o=2;o<i;o++)s[o-2]=arguments[o];return e.apply(t,s)}),vt||(vt=function(e){for(var t=arguments.length,i=new Array(t>1?t-1:0),s=1;s<t;s++)i[s-1]=arguments[s];return new e(...i)});const xt=qt(Array.prototype.forEach),yt=qt(Array.prototype.lastIndexOf),_t=qt(Array.prototype.pop),wt=qt(Array.prototype.push),kt=qt(Array.prototype.slice),$t=qt(Array.prototype.splice),At=Array.isArray,St=Ft(Set),Tt=qt(Set.prototype.add),Ct=qt(Set.prototype.has),zt=qt(String.prototype.toLowerCase),Rt=qt(String.prototype.toString),Et=qt(String.prototype.match),It=qt(String.prototype.replace),Lt=qt(String.prototype.indexOf),Nt=qt(String.prototype.trim),Mt=qt(Number.prototype.toString),Ot=qt(Boolean.prototype.toString),Pt="undefined"==typeof BigInt?null:qt(BigInt.prototype.toString),Dt="undefined"==typeof Symbol?null:qt(Symbol.prototype.toString),Ut=qt(Object.prototype.hasOwnProperty),Ht=qt(Object.prototype.toString),jt=qt(RegExp.prototype.test),Bt=Ft(TypeError);function qt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var i=arguments.length,s=new Array(i>1?i-1:0),o=1;o<i;o++)s[o-1]=arguments[o];return bt(e,t,s)}}function Ft(e){return function(){for(var t=arguments.length,i=new Array(t),s=0;s<t;s++)i[s]=arguments[s];return vt(e,i)}}function Wt(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:zt;if(ct&&ct(e,null),!At(t))return e;let s=t.length;for(;s--;){let o=t[s];if("string"==typeof o){const e=i(o);e!==o&&(dt(t)||(t[s]=e),o=e)}e[o]=!0}return e}function Gt(e){for(let t=0;t<e.length;t++)Ut(e,t)||(e[t]=null);return e}function Yt(e){const t=mt(null);for(const s of lt(e)){var i=at(s,2);const o=i[0],n=i[1];Ut(e,o)&&(At(n)?t[o]=Gt(n):n&&"object"==typeof n&&n.constructor===Object?t[o]=Yt(n):t[o]=n)}return t}function Zt(e,t){for(;null!==e;){const i=pt(e,t);if(i){if(i.get)return qt(i.get);if("function"==typeof i.value)return qt(i.value)}e=ht(e)}return function(){return null}}const Vt=ut(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Qt=ut(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Xt=ut(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Kt=ut(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Jt=ut(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),ei=ut(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ti=ut(["#text"]),ii=ut(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),si=ut(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),oi=ut(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ni=ut(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),ri=gt(/{{[\w\W]*|^[\w\W]*}}/g),ai=gt(/<%[\w\W]*|^[\w\W]*%>/g),li=gt(/\${[\w\W]*/g),ci=gt(/^data-[\-\w.\u00B7-\uFFFF]+$/),di=gt(/^aria-[\-\w]+$/),hi=gt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),pi=gt(/^(?:\w+script|data):/i),ui=gt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),gi=gt(/^html$/i),mi=gt(/^[a-z][.\w]*(-[.\w]+)+$/i),fi=gt(/<[/\w!]/g),bi=gt(/<[/\w]/g),vi=gt(/<\/no(script|embed|frames)/i),xi=gt(/\/>/i),yi=1,_i=3,wi=7,ki=8,$i=9,Ai=11,Si=ut(Wt({},["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"])),Ti=function(){return"undefined"==typeof window?null:window},Ci=function(e,t,i,s){return Ut(e,t)&&At(e[t])?Wt(s.base?Yt(s.base):{},e[t],s.transform):i},zi=function(e,t,i){const s=Ut(e,t)?e[t]:void 0;return s&&"object"==typeof s?Yt(s):i()};var Ri=function e(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ti();const i=t=>e(t);if(i.version="3.4.17",i.removed=[],!t||!t.document||t.document.nodeType!==$i||!t.Element)return i.isSupported=!1,i;let s=t.document;const o=s,n=o.currentScript;t.DocumentFragment;const r=t.HTMLTemplateElement,a=t.Node,l=t.Element,c=t.NodeFilter;void 0===t.NamedNodeMap&&(t.NamedNodeMap||t.MozNamedAttrMap),t.HTMLFormElement;const d=t.DOMParser,h=t.trustedTypes,p=l.prototype,u=Zt(p,"cloneNode"),g=Zt(p,"remove"),m=Zt(p,"removeAttributeNode"),f=Zt(p,"nextSibling"),b=Zt(p,"childNodes"),v=Zt(p,"parentNode"),x=Zt(p,"shadowRoot"),y=Zt(p,"attributes"),_=a&&a.prototype?Zt(a.prototype,"nodeType"):null,w=a&&a.prototype?Zt(a.prototype,"nodeName"):null,k=a&&a.prototype?Zt(a.prototype,"ownerDocument"):null,$=function(e){return _?_(e):e.nodeType},A=function(e){return w?w(e):e.nodeName},S=function(e,t){for(;null!==e;){const i=pt(e,t);if(i)return i.get?qt(i.get):null;e=ht(e)}return null}(p,"namespaceURI"),T=function(e){return S?S(e):e.namespaceURI};if("function"==typeof r){const e=s.createElement("template");e.content&&e.content.ownerDocument&&(s=e.content.ownerDocument)}let C,z,R="",E=!1,I=0;const L=function(){if(I>0)throw Bt('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},N=function(e){L(),I++;try{return C.createHTML(e)}finally{I--}},M=function(){return E||(z=function(e,t){if("object"!=typeof e||"function"!=typeof e.createPolicy)return null;let i=null;const s="data-tt-policy-suffix";t&&t.hasAttribute(s)&&(i=t.getAttribute(s));const o="dompurify"+(i?"#"+i:"");try{return e.createPolicy(o,{createHTML:e=>e,createScriptURL:e=>e})}catch(e){return console.warn("TrustedTypes policy "+o+" could not be created."),null}}(h,n),E=!0),z},O=s,P=O.implementation,D=O.createNodeIterator,U=O.createDocumentFragment,H=O.getElementsByTagName,j=o.importNode;let B={afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]};i.isSupported="function"==typeof lt&&"function"==typeof v&&P&&void 0!==P.createHTMLDocument;const q=ri,F=ai,W=li,G=ci,Y=di,Z=pi,V=ui,Q=mi;let X=hi,K=null;const J=Wt({},[...Vt,...Qt,...Xt,...Jt,...ti]);let ee=null;const te=Wt({},[...ii,...si,...oi,...ni]);let ie=Object.seal(mt(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),se=null,oe=null;const ne=Object.seal(mt(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let re=!0,ae=!0,le=!1,ce=!0,de=!1,he=!0,pe=!1,ue=!1,ge=null,me=null,fe=!1,be=!1,ve=!1,xe=!1,ye=!0,_e=!1;const we="user-content-";let ke=!0,$e=!1,Ae=null,Se={},Te=null;const Ce=Wt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let ze=null;const Re=Wt({},["audio","video","img","source","image","track"]);let Ee=null;const Ie=Wt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Le="http://www.w3.org/1998/Math/MathML",Ne="http://www.w3.org/2000/svg",Me="http://www.w3.org/1999/xhtml";let Oe=Me,Pe=!1,De=null;const Ue=Wt({},[Le,Ne,Me],Rt),He=ut(["mi","mo","mn","ms","mtext"]);let je=Wt({},He);const Be=ut(["annotation-xml"]);let qe=Wt({},Be);const Fe=Wt({},["title","style","font","a","script"]);let We=null;const Ge=["application/xhtml+xml","text/html"];let Ye=null,Ze=null;const Ve=s.createElement("form"),Qe=function(e){return e instanceof RegExp||e instanceof Function},Xe=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(Ze&&Ze===e)return;e&&"object"==typeof e||(e={}),e=Yt(e),We=-1===Ge.indexOf(e.PARSER_MEDIA_TYPE)?"text/html":e.PARSER_MEDIA_TYPE,Ye="application/xhtml+xml"===We?Rt:zt,K=Ci(e,"ALLOWED_TAGS",J,{transform:Ye}),ee=Ci(e,"ALLOWED_ATTR",te,{transform:Ye}),De=Ci(e,"ALLOWED_NAMESPACES",Ue,{transform:Rt}),Ee=Ci(e,"ADD_URI_SAFE_ATTR",Ie,{transform:Ye,base:Ie}),ze=Ci(e,"ADD_DATA_URI_TAGS",Re,{transform:Ye,base:Re}),Te=Ci(e,"FORBID_CONTENTS",Ce,{transform:Ye}),se=Ci(e,"FORBID_TAGS",Yt({}),{transform:Ye}),oe=Ci(e,"FORBID_ATTR",Yt({}),{transform:Ye}),Se=!!Ut(e,"USE_PROFILES")&&(e.USE_PROFILES&&"object"==typeof e.USE_PROFILES?Yt(e.USE_PROFILES):e.USE_PROFILES),re=!1!==e.ALLOW_ARIA_ATTR,ae=!1!==e.ALLOW_DATA_ATTR,le=e.ALLOW_UNKNOWN_PROTOCOLS||!1,ce=!1!==e.ALLOW_SELF_CLOSE_IN_ATTR,de=e.SAFE_FOR_TEMPLATES||!1,he=!1!==e.SAFE_FOR_XML,pe=e.WHOLE_DOCUMENT||!1,be=e.RETURN_DOM||!1,ve=e.RETURN_DOM_FRAGMENT||!1,xe=e.RETURN_TRUSTED_TYPE||!1,fe=e.FORCE_BODY||!1,ye=!1!==e.SANITIZE_DOM,_e=e.SANITIZE_NAMED_PROPS||!1,ke=!1!==e.KEEP_CONTENT,$e=e.IN_PLACE||!1,X=function(e){try{return jt(e,""),!0}catch(e){return!1}}(e.ALLOWED_URI_REGEXP)?e.ALLOWED_URI_REGEXP:hi,Oe="string"==typeof e.NAMESPACE?e.NAMESPACE:Me,je=zi(e,"MATHML_TEXT_INTEGRATION_POINTS",()=>Wt({},He)),qe=zi(e,"HTML_INTEGRATION_POINTS",()=>Wt({},Be));const t=zi(e,"CUSTOM_ELEMENT_HANDLING",()=>mt(null));if(ie=mt(null),Ut(t,"tagNameCheck")&&Qe(t.tagNameCheck)&&(ie.tagNameCheck=t.tagNameCheck),Ut(t,"attributeNameCheck")&&Qe(t.attributeNameCheck)&&(ie.attributeNameCheck=t.attributeNameCheck),Ut(t,"allowCustomizedBuiltInElements")&&"boolean"==typeof t.allowCustomizedBuiltInElements&&(ie.allowCustomizedBuiltInElements=t.allowCustomizedBuiltInElements),gt(ie),de&&(ae=!1),ve&&(be=!0),Se&&(K=Wt({},ti),ee=mt(null),!0===Se.html&&(Wt(K,Vt),Wt(ee,ii)),!0===Se.svg&&(Wt(K,Qt),Wt(ee,si),Wt(ee,ni)),!0===Se.svgFilters&&(Wt(K,Xt),Wt(ee,si),Wt(ee,ni)),!0===Se.mathMl&&(Wt(K,Jt),Wt(ee,oi),Wt(ee,ni))),ne.tagCheck=null,ne.attributeCheck=null,Ut(e,"ADD_TAGS")&&("function"==typeof e.ADD_TAGS?ne.tagCheck=e.ADD_TAGS:At(e.ADD_TAGS)&&(K===J&&(K=Yt(K)),Wt(K,e.ADD_TAGS,Ye))),Ut(e,"ADD_ATTR")&&("function"==typeof e.ADD_ATTR?ne.attributeCheck=e.ADD_ATTR:At(e.ADD_ATTR)&&(ee===te&&(ee=Yt(ee)),Wt(ee,e.ADD_ATTR,Ye))),Ut(e,"ADD_FORBID_CONTENTS")&&At(e.ADD_FORBID_CONTENTS)&&(Te===Ce&&(Te=Yt(Te)),Wt(Te,e.ADD_FORBID_CONTENTS,Ye)),ke&&(K["#text"]=!0),pe&&Wt(K,["html","head","body"]),K.table&&(Wt(K,["tbody"]),delete se.tbody),e.TRUSTED_TYPES_POLICY){if("function"!=typeof e.TRUSTED_TYPES_POLICY.createHTML)throw Bt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if("function"!=typeof e.TRUSTED_TYPES_POLICY.createScriptURL)throw Bt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const t=C;C=e.TRUSTED_TYPES_POLICY;try{R=N("")}catch(e){throw C=t,e}}else null===e.TRUSTED_TYPES_POLICY?(C=void 0,R=""):(void 0===C&&(C=M()),C&&"string"==typeof R&&(R=N("")));ut&&ut(e),Ze=e},Ke=Wt({},[...Qt,...Xt,...Kt]),Je=Wt({},[...Jt,...ei]),et=function(e){const t=T(e),i=zt(A(e)),s=v(e);let o,n;return s&&$(s)===yi?(o={namespaceURI:T(s)},n=zt(A(s))):(o={namespaceURI:Oe},n="template"),!!De[t]&&(t===Ne?function(e,t,i){return t.namespaceURI===Me?"svg"===e:t.namespaceURI===Le?"svg"===e&&("annotation-xml"===i||je[i]):Boolean(Ke[e])}(i,o,n):t===Le?function(e,t,i){return t.namespaceURI===Me?"math"===e:t.namespaceURI===Ne?"math"===e&&qe[i]:Boolean(Je[e])}(i,o,n):t===Me?function(e,t,i){return!(t.namespaceURI===Ne&&!qe[i])&&!(t.namespaceURI===Le&&!je[i])&&!Je[e]&&(Fe[e]||!Ke[e])}(i,o,n):!("application/xhtml+xml"!==We||!De[t]))},tt=function(e){wt(i.removed,{element:e});try{v(e).removeChild(e)}catch(t){if(g(e),!v(e))throw Bt("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},it=function(e,t,i){try{m(e,t)}catch(t){try{e.removeAttribute(i)}catch(e){}}},st=function(e){at(e);const t=b(e);t&&xt(kt(t),e=>{try{g(e)}catch(e){}});const i=$(e)===yi?y(e):null;if(i)for(let t=i.length-1;t>=0;--t){const s=i[t],o=s&&s.name;"string"==typeof o&&it(e,s,o)}},ot=function(e,t,s){if(!s)try{s=t.getAttributeNode(e)}catch(e){s=null}wt(i.removed,{attribute:s||null,from:t});try{s?m(t,s):t.removeAttribute(e)}catch(i){try{t.removeAttribute(e)}catch(e){}}if("is"===e)if(be||ve)try{tt(t)}catch(e){}else try{t.setAttribute(e,"")}catch(e){}},nt=function(e){const t=y(e);if(t)for(let i=t.length-1;i>=0;--i){const s=t[i],o=s&&s.name;"string"!=typeof o||ee[Ye(o)]||it(e,s,o)}},rt=function(e,t){let i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];const s=[e];for(;s.length>0;){const e=s.pop();if(!1===t(e))continue;if(i&&$(e)===yi){const t=x(e);Li(t)&&s.push(t)}const o=b(e);if(o)for(let e=o.length-1;e>=0;--e)s.push(o[e])}},at=function(e){rt(e,e=>{$(e)===yi&&nt(e)})},ct=function(e){const t=[];return rt(e,e=>{t.push(e)},!0),t},dt=function(e,t){let s=!1;return xt(i.removed,t=>{t.element&&(s=s||t.element===e,at(t.element))}),function(e,t){const i=St();xt(ct(e),e=>{$(e)===yi&&Tt(i,e)}),xt(t,e=>{$(e)!==yi||Ct(i,e)||nt(e)})}(e,t),s},ft=function(e,t,i,s){const o=Ft(e);let n;for(;n=o.nextNode();)Ct(s,n)&&!Ct(Ae,n)&&(t&&Mi(B.uponSanitizeShadowNode,n,null),Ui(n,i),Gi(n,i),Li(n.content)&&Yi(n.content))},bt=function(e,t){return!!he&&("patchsrc"===e||"for"===e&&"label"!==t&&"output"!==t)},vt=function(e){let t=null,i=null;if(fe)e="<remove></remove>"+e;else{const t=Et(e,/^[\r\n\t ]+/);i=t&&t[0]}"application/xhtml+xml"===We&&Oe===Me&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const o=C?N(e):e;if(Oe===Me)try{t=(new d).parseFromString(o,We)}catch(e){}if(!t||!t.documentElement){t=P.createDocument(Oe,"template",null);try{t.documentElement.innerHTML=Pe?R:o}catch(e){}}const n=t.body||t.documentElement;return e&&i&&n.insertBefore(s.createTextNode(i),n.childNodes[0]||null),Oe===Me?H.call(t,pe?"html":"body")[0]:pe?t.documentElement:n},Ft=function(e){const t=k?k(e):e.ownerDocument;return D.call(t||e,e,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Gt=function(e){return e=It(e,q," "),e=It(e,F," "),e=It(e,W," ")},Ri=function(e){var t;Ei(e);const i=null===(t=e.querySelectorAll)||void 0===t?void 0:t.call(e,"template");i&&xt(i,e=>{Li(e.content)&&Ri(e.content)})},Ei=function(e){e.normalize();const t=k?k(e):e.ownerDocument,i=D.call(t||e,e,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null);let s=i.nextNode();for(;s;)s.data=Gt(s.data),s=i.nextNode()},Ii=function(e){const t=w?w(e):null;return"string"==typeof t&&("form"===Ye(t)&&("string"!=typeof e.nodeName||"string"!=typeof e.textContent||"function"!=typeof e.removeChild||e.attributes!==y(e)||"function"!=typeof e.removeAttribute||"function"!=typeof e.removeAttributeNode||"function"!=typeof e.getAttributeNode||"function"!=typeof e.setAttribute||"string"!=typeof e.namespaceURI||"function"!=typeof e.insertBefore||"function"!=typeof e.hasChildNodes||e.nodeType!==_(e)||e.childNodes!==b(e)))},Li=function(e){if(!_||"object"!=typeof e||null===e)return!1;try{return _(e)===Ai}catch(e){return!1}},Ni=function(e){if(!_||"object"!=typeof e||null===e)return!1;try{return"number"==typeof _(e)}catch(e){return!1}};function Mi(e,t,s){0!==e.length&&xt(e,e=>{e.call(i,t,s,Ze)})}const Oi=function(e,t){if(e instanceof RegExp)return jt(e,t);if(e instanceof Function){for(var i=arguments.length,s=new Array(i>2?i-2:0),o=2;o<i;o++)s[o-2]=arguments[o];return Boolean(e(t,...s))}return!1},Pi=function(e,t,i,s){return 0===e.length?t:t===i||t===s?Yt(t):t},Di=function(e,t){return e!==t&&null===v(e)&&($e&&at(e),!0)},Ui=function(e,t){var s;if(s=e,Ae&&Tt(Ae,s),Mi(B.beforeSanitizeElements,e,null),Di(e,t))return!0;if(Ii(e))return tt(e),!0;const o=Ye(A(e));if(K=Pi(B.uponSanitizeElement,K,J,ge),Mi(B.uponSanitizeElement,e,{tagName:o,allowedTags:K}),Di(e,t))return!0;if(function(e,t){return!!(he&&e.hasChildNodes()&&!Ni(e.firstElementChild)&&jt(fi,e.textContent)&&jt(fi,e.innerHTML))||!!(he&&Si[t]&&$(e)===yi&&T(e)===Me&&(Ni(e.firstElementChild)||"string"==typeof e.textContent&&jt(fi,e.textContent)))||e.nodeType===wi||!(!he||e.nodeType!==ki||!jt(bi,e.data))}(e,o))return tt(e),!0;if(se[o]||!(ne.tagCheck instanceof Function&&ne.tagCheck(o))&&!K[o]){const i=function(e,t,i){if(!se[t]&&Bi(t)&&Oi(ie.tagNameCheck,t))return!1;if(ke&&!Te[t]&&!Te[zt(t)]){const t=v(e),s=b(e);if(s&&t)for(let o=s.length-1;o>=0;--o){const n=e===i?u(s[o],!0):s[o];t.insertBefore(n,f(e))}}return tt(e),!0}(e,o,t);return!(!1!==i||(Mi(B.afterSanitizeElements,e,null),!Di(e,t)))||i}if($(e)===yi&&!et(e))return tt(e),!0;if(("noscript"===o||"noembed"===o||"noframes"===o)&&jt(vi,e.innerHTML))return tt(e),!0;if(de&&e.nodeType===_i){const t=Gt(e.textContent);e.textContent!==t&&(wt(i.removed,{element:e.cloneNode()}),e.textContent=t)}return Mi(B.afterSanitizeElements,e,null),Di(e,t)},Hi=function(e,t,i){if(oe[t])return!1;if(bt(t,e))return!1;if(ye&&("id"===t||"name"===t)&&(i in s||i in Ve))return!1;const o=ee[t]||ne.attributeCheck instanceof Function&&ne.attributeCheck(t,e);return!(!ae||!jt(G,t))||(!(!re||!jt(Y,t))||(o?!!Ee[t]||(!!jt(X,It(i,V,""))||(!("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==Lt(i,"data:")||!ze[e])||(!(!le||jt(Z,It(i,V,"")))||!i))):Bi(e)&&Oi(ie.tagNameCheck,e)&&Oi(ie.attributeNameCheck,t,e)||"is"===t&&ie.allowCustomizedBuiltInElements&&Oi(ie.tagNameCheck,i)))},ji=Wt({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),Bi=function(e){return!ji[zt(e)]&&jt(Q,e)},qi=function(e,t,i,s){if(C&&"object"==typeof h&&"function"==typeof h.getAttributeType&&!i)switch(h.getAttributeType(e,t)){case"TrustedHTML":return N(s);case"TrustedScriptURL":return function(e){L(),I++;try{return C.createScriptURL(e)}finally{I--}}(s)}return s},Fi=function(e,t,i,s){try{return i?e.setAttributeNS(i,t,s):e.setAttribute(t,s),!Ii(e)||(tt(e),!1)}catch(i){return ot(t,e),!1}},Wi=function(e,t){return!(!he||!jt(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,t))||"attributename"===zt(e)&&null!==Et(t,"href")},Gi=function(e,t){if(Mi(B.beforeSanitizeAttributes,e,null),Di(e,t))return;const s=e.attributes;if(!s||Ii(e))return;ee=Pi(B.uponSanitizeAttribute,ee,te,me);const o={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ee,forceKeepAttr:void 0};let n=s.length;const r=Ye(e.nodeName);for(;n--;){const t=s[n],a=t.name,l=t.namespaceURI,c=t.value,d=Ye(a),h=c;let p="value"===a?h:Nt(h),u=!1;o.attrName=d,o.attrValue=p,o.keepAttr=!0,o.forceKeepAttr=void 0,Mi(B.uponSanitizeAttribute,e,o),p=o.attrValue,!_e||"id"!==d&&"name"!==d||0===Lt(p,we)||(ot(a,e,t),p=we+p,u=!0),Wi(a,p)?ot(a,e,t):o.forceKeepAttr||(o.keepAttr&&(ce||!jt(xi,p))?(de&&(p=Gt(p)),Hi(r,d,p)?(p=qi(r,d,l,p),p!==h&&Fi(e,a,l,p)&&u&&_t(i.removed)):ot(a,e,t)):ot(a,e,t))}Mi(B.afterSanitizeAttributes,e,null),Di(e,t)},Yi=function(e){let t=null;const i=Ft(e);for(Mi(B.beforeSanitizeShadowDOM,e,null);t=i.nextNode();)if(Mi(B.uponSanitizeShadowNode,t,null),Ui(t,e),Gi(t,e),Li(t.content)&&Yi(t.content),$(t)===yi){const e=x(t);Li(e)&&(Zi(e),Yi(e))}de&&Ei(e),Mi(B.afterSanitizeShadowDOM,e,null)},Zi=function(e){const t=[{node:e,shadow:null}];for(;t.length>0;){const e=t.pop();if(e.shadow){Yi(e.shadow);continue}const i=e.node,s=$(i)===yi,o=b(i);if(o)for(let e=o.length-1;e>=0;--e)t.push({node:o[e],shadow:null});if(s){const e=w?w(i):null;if("string"==typeof e&&"template"===Ye(e)){const e=i.content;Li(e)&&t.push({node:e,shadow:null})}}if(s){const e=x(i);Li(e)&&t.push({node:null,shadow:e},{node:e,shadow:null})}}};return i.sanitize=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},s=null,n=null,r=null,a=null;if(Pe=!e,Pe&&(e="\x3c!--\x3e"),"string"!=typeof e&&!Ni(e)&&"string"!=typeof(e=function(e){switch(typeof e){case"string":return e;case"number":return Mt(e);case"boolean":return Ot(e);case"bigint":return Pt?Pt(e):"0";case"symbol":return Dt?Dt(e):"Symbol()";case"undefined":default:return Ht(e);case"function":case"object":{if(null===e)return Ht(e);const t=e,i=Zt(t,"toString");if("function"==typeof i){const e=i(t);return"string"==typeof e?e:Ht(e)}return Ht(e)}}}(e)))throw Bt("dirty is not a string, aborting");if(!i.isSupported)return e;ue?(K=ge,ee=me):Xe(t),(B.uponSanitizeElement.length>0||B.uponSanitizeAttribute.length>0)&&(K=Yt(K)),B.uponSanitizeAttribute.length>0&&(ee=Yt(ee)),i.removed=[];const l=$e&&"string"!=typeof e&&Ni(e);let c=[];const d=Ae;if(l){h=e,he&&rt(h,e=>{const t=$(e);if(t===wi||t===ki&&jt(bi,e.data)){try{g(e)}catch(e){}return!1}if(t===yi){const t=e,i=Ye(A(e));try{t.hasAttribute&&t.hasAttribute("patchsrc")&&t.removeAttribute("patchsrc"),t.hasAttribute&&t.hasAttribute("for")&&bt("for",i)&&t.removeAttribute("for")}catch(e){}}return!0});const t=A(e);if("string"==typeof t){const i=Ye(t);if(!K[i]||se[i])throw st(e),Bt("root node is forbidden and cannot be sanitized in-place")}if(Ii(e))throw st(e),Bt("root node is clobbered and cannot be sanitized in-place");c=ct(e),Ae=St()}else if(Ni(e))s=vt("\x3c!----\x3e"),n=s.ownerDocument.importNode(e,!0),n.nodeType===yi&&"BODY"===n.nodeName||"HTML"===n.nodeName?s=n:s.appendChild(n),Zi(s);else{if(!be&&!de&&!pe&&-1===e.indexOf("<"))return C&&xe?N(e):e;if(s=vt(e),!s)return be?null:xe?R:""}var h;s&&fe&&tt(s.firstChild);const p=l?e:s;try{l&&Zi(e);const t=Ft(p);for(;r=t.nextNode();)Ui(r,p),Gi(r,p),Li(r.content)&&Yi(r.content);l&&function(e,t){const i=Ae;let s=null;const o=()=>(s||(s=St(),xt(t,e=>{Tt(s,e)})),s);for(let t=0;;t++){const s=ct(e),n=[e];let r=!1;if(xt(s,e=>{$(e)===Ai?wt(n,e):r||Ct(i,e)||(r=Ct(o(),e))}),!r)return;if(t>=8)throw Bt("the tree kept changing during in-place sanitization; refusing to return it");xt(n,(t,i)=>{ft(t,i>0,e,o())})}}(e,c)}catch(t){throw l&&(st(e),dt(e,c)),t}finally{Ae=d}if(l){if(dt(e,c))throw Bt("a node selected for removal could not be safely returned; refusing to sanitize in place");return de&&Ri(e),e}if(be){if(de&&Ri(s),ve)for(a=U.call(s.ownerDocument);s.firstChild;)a.appendChild(s.firstChild);else a=s;return(ee.shadowroot||ee.shadowrootmode)&&(a=j.call(o,a,!0)),a}let u=pe?s.outerHTML:s.innerHTML;return pe&&K["!doctype"]&&s.ownerDocument&&s.ownerDocument.doctype&&s.ownerDocument.doctype.name&&jt(gi,s.ownerDocument.doctype.name)&&(u="<!DOCTYPE "+s.ownerDocument.doctype.name+">\n"+u),de&&(u=Gt(u)),C&&xe?N(u):u},i.setConfig=function(){Xe(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}),ue=!0,ge=K,me=ee},i.clearConfig=function(){Ze=null,ue=!1,ge=null,me=null,C=z,R=""},i.isValidAttribute=function(e,t,i){Ze||Xe({});const s=Ye(e),o=Ye(t);return("string"!=typeof i||!(Wi(t,i)||!ce&&jt(xi,i)))&&Hi(s,o,i)},i.addHook=function(e,t){"function"==typeof t&&Ut(B,e)&&wt(B[e],t)},i.removeHook=function(e,t){if(Ut(B,e)){if(void 0!==t){const i=yt(B[e],t);return-1===i?void 0:$t(B[e],i,1)[0]}return _t(B[e])}},i.removeHooks=function(e){Ut(B,e)&&(B[e]=[])},i.removeAllHooks=function(){B={afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},i}();function Ei(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ii={async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null};function Li(e){Ii=e}var Ni={exec:()=>null};function Mi(e,t=""){let i="string"==typeof e?e:e.source,s={replace:(e,t)=>{let o="string"==typeof t?t:t.source;return o=o.replace(Pi.caret,"$1"),i=i.replace(e,o),s},getRegex:()=>new RegExp(i,t)};return s}var Oi=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Pi={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[\t ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Di=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ui=/(?:[*+-]|\d{1,9}[.)])/,Hi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ji=Mi(Hi).replace(/bull/g,Ui).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Bi=Mi(Hi).replace(/bull/g,Ui).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),qi=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Fi=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Wi=Mi(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Fi).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Gi=Mi(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ui).getRegex(),Yi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Zi=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Vi=Mi("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$))","i").replace("comment",Zi).replace("tag",Yi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Qi=Mi(qi).replace("hr",Di).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Yi).getRegex(),Xi={blockquote:Mi(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Qi).getRegex(),code:/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,def:Wi,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,hr:Di,html:Vi,lheading:ji,list:Gi,newline:/^(?:[ \t]*(?:\n|$))+/,paragraph:Qi,table:Ni,text:/^[^\n]+/},Ki=Mi("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Di).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}\t)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Yi).getRegex(),Ji={...Xi,lheading:Bi,table:Ki,paragraph:Mi(qi).replace("hr",Di).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ki).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Yi).getRegex()},es={...Xi,html:Mi("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",Zi).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Ni,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Mi(qi).replace("hr",Di).replace("heading"," *#{1,6} *[^\n]").replace("lheading",ji).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ts=/^( {2,}|\\)\n(?!\s*$)/,is=/[\p{P}\p{S}]/u,ss=/[\s\p{P}\p{S}]/u,os=/[^\s\p{P}\p{S}]/u,ns=Mi(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ss).getRegex(),rs=/(?!~)[\p{P}\p{S}]/u,as=Mi(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Oi?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ls=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,cs=Mi(ls,"u").replace(/punct/g,is).getRegex(),ds=Mi(ls,"u").replace(/punct/g,rs).getRegex(),hs="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",ps=Mi(hs,"gu").replace(/notPunctSpace/g,os).replace(/punctSpace/g,ss).replace(/punct/g,is).getRegex(),us=Mi(hs,"gu").replace(/notPunctSpace/g,/(?:[^\s\p{P}\p{S}]|~)/u).replace(/punctSpace/g,/(?!~)[\s\p{P}\p{S}]/u).replace(/punct/g,rs).getRegex(),gs=Mi("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,os).replace(/punctSpace/g,ss).replace(/punct/g,is).getRegex(),ms=Mi(/\\(punct)/,"gu").replace(/punct/g,is).getRegex(),fs=Mi(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),bs=Mi(Zi).replace("(?:--\x3e|$)","--\x3e").getRegex(),vs=Mi("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",bs).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),xs=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,ys=Mi(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",xs).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),_s=Mi(/^!?\[(label)\]\[(ref)\]/).replace("label",xs).replace("ref",Fi).getRegex(),ws=Mi(/^!?\[(ref)\](?:\[\])?/).replace("ref",Fi).getRegex(),ks=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,$s={_backpedal:Ni,anyPunctuation:ms,autolink:fs,blockSkip:as,br:ts,code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,del:Ni,emStrongLDelim:cs,emStrongRDelimAst:ps,emStrongRDelimUnd:gs,escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,link:ys,nolink:ws,punctuation:ns,reflink:_s,reflinkSearch:Mi("reflink|nolink(?!\\()","g").replace("reflink",_s).replace("nolink",ws).getRegex(),tag:vs,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,url:Ni},As={...$s,link:Mi(/^!?\[(label)\]\((.*?)\)/).replace("label",xs).getRegex(),reflink:Mi(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",xs).getRegex()},Ss={...$s,emStrongRDelimAst:us,emStrongLDelim:ds,url:Mi(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ks).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Mi(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ks).getRegex()},Ts={...Ss,br:Mi(ts).replace("{2,}","*").getRegex(),text:Mi(Ss.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Cs={normal:Xi,gfm:Ji,pedantic:es},zs={normal:$s,gfm:Ss,breaks:Ts,pedantic:As},Rs={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Es=e=>Rs[e];function Is(e,t){if(t){if(Pi.escapeTest.test(e))return e.replace(Pi.escapeReplace,Es)}else if(Pi.escapeTestNoEncode.test(e))return e.replace(Pi.escapeReplaceNoEncode,Es);return e}function Ls(e){try{e=encodeURI(e).replace(Pi.percentDecode,"%")}catch{return null}return e}function Ns(e,t){let i=e.replace(Pi.findPipe,(e,t,i)=>{let s=!1,o=t;for(;--o>=0&&"\\"===i[o];)s=!s;return s?"|":" |"}),s=i.split(Pi.splitPipe),o=0;if(s[0].trim()||s.shift(),s.length>0&&!s.at(-1)?.trim()&&s.pop(),t)if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;o<s.length;o++)s[o]=s[o].trim().replace(Pi.slashPipe,"|");return s}function Ms(e,t,i){let s=e.length;if(0===s)return"";let o=0;for(;o<s;){if(e.charAt(s-o-1)!==t)break;o++}return e.slice(0,s-o)}function Os(e,t,i,s,o){let n=t.href,r=t.title||null,a=e[1].replace(o.other.outputLinkReplace,"$1");s.state.inLink=!0;let l={type:"!"===e[0].charAt(0)?"image":"link",raw:i,href:n,title:r,text:a,tokens:s.inlineTokens(a)};return s.state.inLink=!1,l}var Ps=class{options;rules;lexer;constructor(e){this.options=e||Ii}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let e=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?e:Ms(e,"\n")}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let e=t[0],i=function(e,t,i){let s=e.match(i.other.indentCodeCompensation);if(null===s)return t;let o=s[1];return t.split("\n").map(e=>{let t=e.match(i.other.beginningSpace);if(null===t)return e;let[s]=t;return s.length>=o.length?e.slice(o.length):e}).join("\n")}(e,t[3]||"",this.rules);return{type:"code",raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let t=Ms(e,"#");(this.options.pedantic||!t||this.rules.other.endingSpaceChar.test(t))&&(e=t.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Ms(t[0],"\n")}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let e=Ms(t[0],"\n").split("\n"),i="",s="",o=[];for(;e.length>0;){let t,n=!1,r=[];for(t=0;t<e.length;t++)if(this.rules.other.blockquoteStart.test(e[t]))r.push(e[t]),n=!0;else{if(n)break;r.push(e[t])}e=e.slice(t);let a=r.join("\n"),l=a.replace(this.rules.other.blockquoteSetextReplace,"\n    $1").replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}\n${a}`:a,s=s?`${s}\n${l}`:l;let c=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(l,o,!0),this.lexer.state.top=c,0===e.length)break;let d=o.at(-1);if("code"===d?.type)break;if("blockquote"===d?.type){let t=d,n=t.raw+"\n"+e.join("\n"),r=this.blockquote(n);o[o.length-1]=r,i=i.substring(0,i.length-t.raw.length)+r.raw,s=s.substring(0,s.length-t.text.length)+r.text;break}if("list"===d?.type){let t=d,n=t.raw+"\n"+e.join("\n"),r=this.list(n);o[o.length-1]=r,i=i.substring(0,i.length-d.raw.length)+r.raw,s=s.substring(0,s.length-t.raw.length)+r.raw,e=n.substring(o.at(-1).raw.length).split("\n");continue}}return{type:"blockquote",raw:i,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let i=t[1].trim(),s=i.length>1,o={type:"list",raw:"",ordered:s,start:s?+i.slice(0,-1):"",loose:!1,items:[]};i=s?`\\d{1,9}\\${i.slice(-1)}`:`\\${i}`,this.options.pedantic&&(i=s?i:"[*+-]");let n=this.rules.other.listItemRegex(i),r=!1;for(;e;){let i=!1,s="",a="";if(!(t=n.exec(e))||this.rules.block.hr.test(e))break;s=t[0],e=e.substring(s.length);let l=t[2].split("\n",1)[0].replace(this.rules.other.listReplaceTabs,e=>" ".repeat(3*e.length)),c=e.split("\n",1)[0],d=!l.trim(),h=0;if(this.options.pedantic?(h=2,a=l.trimStart()):d?h=t[1].length+1:(h=t[2].search(this.rules.other.nonSpaceChar),h=h>4?1:h,a=l.slice(h),h+=t[1].length),d&&this.rules.other.blankLine.test(c)&&(s+=c+"\n",e=e.substring(c.length+1),i=!0),!i){let t=this.rules.other.nextBulletRegex(h),i=this.rules.other.hrRegex(h),o=this.rules.other.fencesBeginRegex(h),n=this.rules.other.headingBeginRegex(h),r=this.rules.other.htmlBeginRegex(h);for(;e;){let p,u=e.split("\n",1)[0];if(c=u,this.options.pedantic?(c=c.replace(this.rules.other.listReplaceNesting,"  "),p=c):p=c.replace(this.rules.other.tabCharGlobal,"    "),o.test(c)||n.test(c)||r.test(c)||t.test(c)||i.test(c))break;if(p.search(this.rules.other.nonSpaceChar)>=h||!c.trim())a+="\n"+p.slice(h);else{if(d||l.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||o.test(l)||n.test(l)||i.test(l))break;a+="\n"+c}!d&&!c.trim()&&(d=!0),s+=u+"\n",e=e.substring(u.length+1),l=p.slice(h)}}o.loose||(r?o.loose=!0:this.rules.other.doubleBlankLine.test(s)&&(r=!0));let p,u=null;this.options.gfm&&(u=this.rules.other.listIsTask.exec(a),u&&(p="[ ] "!==u[0],a=a.replace(this.rules.other.listReplaceTask,""))),o.items.push({type:"list_item",raw:s,task:!!u,checked:p,loose:!1,text:a,tokens:[]}),o.raw+=s}let a=o.items.at(-1);if(!a)return;a.raw=a.raw.trimEnd(),a.text=a.text.trimEnd(),o.raw=o.raw.trimEnd();for(let e=0;e<o.items.length;e++)if(this.lexer.state.top=!1,o.items[e].tokens=this.lexer.blockTokens(o.items[e].text,[]),!o.loose){let t=o.items[e].tokens.filter(e=>"space"===e.type),i=t.length>0&&t.some(e=>this.rules.other.anyLine.test(e.raw));o.loose=i}if(o.loose)for(let e=0;e<o.items.length;e++)o.items[e].loose=!0;return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:"pre"===t[1]||"script"===t[1]||"style"===t[1],text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let e=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:e,raw:t[0],href:i,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let i=Ns(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split("\n"):[],n={type:"table",raw:t[0],header:[],align:[],rows:[]};if(i.length===s.length){for(let e of s)this.rules.other.tableAlignRight.test(e)?n.align.push("right"):this.rules.other.tableAlignCenter.test(e)?n.align.push("center"):this.rules.other.tableAlignLeft.test(e)?n.align.push("left"):n.align.push(null);for(let e=0;e<i.length;e++)n.header.push({text:i[e],tokens:this.lexer.inline(i[e]),header:!0,align:n.align[e]});for(let e of o)n.rows.push(Ns(e,n.header.length).map((e,t)=>({text:e,tokens:this.lexer.inline(e),header:!1,align:n.align[t]})));return n}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:"="===t[2].charAt(0)?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let e="\n"===t[1].charAt(t[1].length-1)?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let e=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(e)){if(!this.rules.other.endAngleBracket.test(e))return;let t=Ms(e.slice(0,-1),"\\");if((e.length-t.length)%2==0)return}else{let e=function(e,t){if(-1===e.indexOf(t[1]))return-1;let i=0;for(let s=0;s<e.length;s++)if("\\"===e[s])s++;else if(e[s]===t[0])i++;else if(e[s]===t[1]&&(i--,i<0))return s;return i>0?-2:-1}(t[2],"()");if(-2===e)return;if(e>-1){let i=(0===t[0].indexOf("!")?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){let e=this.rules.other.pedanticHrefTitle.exec(i);e&&(i=e[1],s=e[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(i=this.options.pedantic&&!this.rules.other.endAngleBracket.test(e)?i.slice(1):i.slice(1,-1)),Os(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let i;if((i=this.rules.inline.reflink.exec(e))||(i=this.rules.inline.nolink.exec(e))){let e=t[(i[2]||i[1]).replace(this.rules.other.multipleSpaceGlobal," ").toLowerCase()];if(!e){let e=i[0].charAt(0);return{type:"text",raw:e,text:e}}return Os(i,e,i[0],this.lexer,this.rules)}}emStrong(e,t,i=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!(!s||s[3]&&i.match(this.rules.other.unicodeAlphaNumeric))&&(!s[1]&&!s[2]||!i||this.rules.inline.punctuation.exec(i))){let i,o,n=[...s[0]].length-1,r=n,a=0,l="*"===s[0][0]?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(l.lastIndex=0,t=t.slice(-1*e.length+n);null!=(s=l.exec(t));){if(i=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!i)continue;if(o=[...i].length,s[3]||s[4]){r+=o;continue}if((s[5]||s[6])&&n%3&&!((n+o)%3)){a+=o;continue}if(r-=o,r>0)continue;o=Math.min(o,o+r+a);let t=[...s[0]][0].length,l=e.slice(0,n+s.index+t+o);if(Math.min(n,o)%2){let e=l.slice(1,-1);return{type:"em",raw:l,text:e,tokens:this.lexer.inlineTokens(e)}}let c=l.slice(2,-2);return{type:"strong",raw:l,text:c,tokens:this.lexer.inlineTokens(c)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(e),s=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return i&&s&&(e=e.substring(1,e.length-1)),{type:"codespan",raw:t[0],text:e}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let e,i;return"@"===t[2]?(e=t[1],i="mailto:"+e):(e=t[1],i=e),{type:"link",raw:t[0],text:e,href:i,tokens:[{type:"text",raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,i;if("@"===t[2])e=t[0],i="mailto:"+e;else{let s;do{s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??""}while(s!==t[0]);e=t[0],i="www."===t[1]?"http://"+t[0]:t[0]}return{type:"link",raw:t[0],text:e,href:i,tokens:[{type:"text",raw:e,text:e}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let e=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:e}}}},Ds=class e{tokens;options;state;tokenizer;inlineQueue;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Ii,this.options.tokenizer=this.options.tokenizer||new Ps,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:Pi,block:Cs.normal,inline:zs.normal};this.options.pedantic?(t.block=Cs.pedantic,t.inline=zs.pedantic):this.options.gfm&&(t.block=Cs.gfm,this.options.breaks?t.inline=zs.breaks:t.inline=zs.gfm),this.tokenizer.rules=t}static get rules(){return{block:Cs,inline:zs}}static lex(t,i){return new e(i).lex(t)}static lexInline(t,i){return new e(i).inlineTokens(t)}lex(e){e=e.replace(Pi.carriageReturn,"\n"),this.blockTokens(e,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let t=this.inlineQueue[e];this.inlineTokens(t.src,t.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],i=!1){for(this.options.pedantic&&(e=e.replace(Pi.tabCharGlobal,"    ").replace(Pi.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>!!(s=i.call({lexer:this},e,t))&&(e=e.substring(s.raw.length),t.push(s),!0)))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=t.at(-1);1===s.raw.length&&void 0!==i?i.raw+="\n":t.push(s);continue}if(s=this.tokenizer.code(e)){e=e.substring(s.raw.length);let i=t.at(-1);"paragraph"===i?.type||"text"===i?.type?(i.raw+=(i.raw.endsWith("\n")?"":"\n")+s.raw,i.text+="\n"+s.text,this.inlineQueue.at(-1).src=i.text):t.push(s);continue}if(s=this.tokenizer.fences(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.heading(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.hr(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.blockquote(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.list(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.html(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.def(e)){e=e.substring(s.raw.length);let i=t.at(-1);"paragraph"===i?.type||"text"===i?.type?(i.raw+=(i.raw.endsWith("\n")?"":"\n")+s.raw,i.text+="\n"+s.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},t.push(s));continue}if(s=this.tokenizer.table(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.lheading(e)){e=e.substring(s.raw.length),t.push(s);continue}let o=e;if(this.options.extensions?.startBlock){let t,i=1/0,s=e.slice(1);this.options.extensions.startBlock.forEach(e=>{t=e.call({lexer:this},s),"number"==typeof t&&t>=0&&(i=Math.min(i,t))}),i<1/0&&i>=0&&(o=e.substring(0,i+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let n=t.at(-1);i&&"paragraph"===n?.type?(n.raw+=(n.raw.endsWith("\n")?"":"\n")+s.raw,n.text+="\n"+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=n.text):t.push(s),i=o.length!==e.length,e=e.substring(s.raw.length);continue}if(s=this.tokenizer.text(e)){e=e.substring(s.raw.length);let i=t.at(-1);"text"===i?.type?(i.raw+=(i.raw.endsWith("\n")?"":"\n")+s.raw,i.text+="\n"+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):t.push(s);continue}if(e){let t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw new Error(t)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let i,s=e,o=null;if(this.tokens.links){let e=Object.keys(this.tokens.links);if(e.length>0)for(;null!=(o=this.tokenizer.rules.inline.reflinkSearch.exec(s));)e.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!=(o=this.tokenizer.rules.inline.anyPunctuation.exec(s));)s=s.slice(0,o.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;null!=(o=this.tokenizer.rules.inline.blockSkip.exec(s));)i=o[2]?o[2].length:0,s=s.slice(0,o.index+i)+"["+"a".repeat(o[0].length-i-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);s=this.options.hooks?.emStrongMask?.call({lexer:this},s)??s;let n=!1,r="";for(;e;){let i;if(n||(r=""),n=!1,this.options.extensions?.inline?.some(s=>!!(i=s.call({lexer:this},e,t))&&(e=e.substring(i.raw.length),t.push(i),!0)))continue;if(i=this.tokenizer.escape(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.tag(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.link(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(i.raw.length);let s=t.at(-1);"text"===i.type&&"text"===s?.type?(s.raw+=i.raw,s.text+=i.text):t.push(i);continue}if(i=this.tokenizer.emStrong(e,s,r)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.codespan(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.br(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.del(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.autolink(e)){e=e.substring(i.raw.length),t.push(i);continue}if(!this.state.inLink&&(i=this.tokenizer.url(e))){e=e.substring(i.raw.length),t.push(i);continue}let o=e;if(this.options.extensions?.startInline){let t,i=1/0,s=e.slice(1);this.options.extensions.startInline.forEach(e=>{t=e.call({lexer:this},s),"number"==typeof t&&t>=0&&(i=Math.min(i,t))}),i<1/0&&i>=0&&(o=e.substring(0,i+1))}if(i=this.tokenizer.inlineText(o)){e=e.substring(i.raw.length),"_"!==i.raw.slice(-1)&&(r=i.raw.slice(-1)),n=!0;let s=t.at(-1);"text"===s?.type?(s.raw+=i.raw,s.text+=i.text):t.push(i);continue}if(e){let t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw new Error(t)}}return t}},Us=class{options;parser;constructor(e){this.options=e||Ii}space(e){return""}code({text:e,lang:t,escaped:i}){let s=(t||"").match(Pi.notSpaceStart)?.[0],o=e.replace(Pi.endingNewline,"")+"\n";return s?'<pre><code class="language-'+Is(s)+'">'+(i?o:Is(o,!0))+"</code></pre>\n":"<pre><code>"+(i?o:Is(o,!0))+"</code></pre>\n"}blockquote({tokens:e}){return`<blockquote>\n${this.parser.parse(e)}</blockquote>\n`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>\n`}hr(e){return"<hr>\n"}list(e){let t=e.ordered,i=e.start,s="";for(let t=0;t<e.items.length;t++){let i=e.items[t];s+=this.listitem(i)}let o=t?"ol":"ul";return"<"+o+(t&&1!==i?' start="'+i+'"':"")+">\n"+s+"</"+o+">\n"}listitem(e){let t="";if(e.task){let i=this.checkbox({checked:!!e.checked});e.loose?"paragraph"===e.tokens[0]?.type?(e.tokens[0].text=i+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&"text"===e.tokens[0].tokens[0].type&&(e.tokens[0].tokens[0].text=i+" "+Is(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):t+=i+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>\n`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>\n`}table(e){let t="",i="";for(let t=0;t<e.header.length;t++)i+=this.tablecell(e.header[t]);t+=this.tablerow({text:i});let s="";for(let t=0;t<e.rows.length;t++){let o=e.rows[t];i="";for(let e=0;e<o.length;e++)i+=this.tablecell(o[e]);s+=this.tablerow({text:i})}return s&&(s=`<tbody>${s}</tbody>`),"<table>\n<thead>\n"+t+"</thead>\n"+s+"</table>\n"}tablerow({text:e}){return`<tr>\n${e}</tr>\n`}tablecell(e){let t=this.parser.parseInline(e.tokens),i=e.header?"th":"td";return(e.align?`<${i} align="${e.align}">`:`<${i}>`)+t+`</${i}>\n`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Is(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:i}){let s=this.parser.parseInline(i),o=Ls(e);if(null===o)return s;let n='<a href="'+(e=o)+'"';return t&&(n+=' title="'+Is(t)+'"'),n+=">"+s+"</a>",n}image({href:e,title:t,text:i,tokens:s}){s&&(i=this.parser.parseInline(s,this.parser.textRenderer));let o=Ls(e);if(null===o)return Is(i);let n=`<img src="${e=o}" alt="${i}"`;return t&&(n+=` title="${Is(t)}"`),n+=">",n}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Is(e.text)}},Hs=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},js=class e{options;renderer;textRenderer;constructor(e){this.options=e||Ii,this.options.renderer=this.options.renderer||new Us,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Hs}static parse(t,i){return new e(i).parse(t)}static parseInline(t,i){return new e(i).parseInline(t)}parse(e,t=!0){let i="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let e=o,t=this.options.extensions.renderers[e.type].call({parser:this},e);if(!1!==t||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(e.type)){i+=t||"";continue}}let n=o;switch(n.type){case"space":i+=this.renderer.space(n);continue;case"hr":i+=this.renderer.hr(n);continue;case"heading":i+=this.renderer.heading(n);continue;case"code":i+=this.renderer.code(n);continue;case"table":i+=this.renderer.table(n);continue;case"blockquote":i+=this.renderer.blockquote(n);continue;case"list":i+=this.renderer.list(n);continue;case"html":i+=this.renderer.html(n);continue;case"def":i+=this.renderer.def(n);continue;case"paragraph":i+=this.renderer.paragraph(n);continue;case"text":{let o=n,r=this.renderer.text(o);for(;s+1<e.length&&"text"===e[s+1].type;)o=e[++s],r+="\n"+this.renderer.text(o);i+=t?this.renderer.paragraph({type:"paragraph",raw:r,text:r,tokens:[{type:"text",raw:r,text:r,escaped:!0}]}):r;continue}default:{let e='Token with "'+n.type+'" type was not found.';if(this.options.silent)return console.error(e),"";throw new Error(e)}}}return i}parseInline(e,t=this.renderer){let i="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let e=this.options.extensions.renderers[o.type].call({parser:this},o);if(!1!==e||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){i+=e||"";continue}}let n=o;switch(n.type){case"escape":case"text":i+=t.text(n);break;case"html":i+=t.html(n);break;case"link":i+=t.link(n);break;case"image":i+=t.image(n);break;case"strong":i+=t.strong(n);break;case"em":i+=t.em(n);break;case"codespan":i+=t.codespan(n);break;case"br":i+=t.br(n);break;case"del":i+=t.del(n);break;default:{let e='Token with "'+n.type+'" type was not found.';if(this.options.silent)return console.error(e),"";throw new Error(e)}}}return i}},Bs=class{options;block;constructor(e){this.options=e||Ii}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ds.lex:Ds.lexInline}provideParser(){return this.block?js.parse:js.parseInline}},qs=class{defaults={async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null};options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=js;Renderer=Us;TextRenderer=Hs;Lexer=Ds;Tokenizer=Ps;Hooks=Bs;constructor(...e){this.use(...e)}walkTokens(e,t){let i=[];for(let s of e)switch(i=i.concat(t.call(this,s)),s.type){case"table":{let e=s;for(let s of e.header)i=i.concat(this.walkTokens(s.tokens,t));for(let s of e.rows)for(let e of s)i=i.concat(this.walkTokens(e.tokens,t));break}case"list":{let e=s;i=i.concat(this.walkTokens(e.items,t));break}default:{let e=s;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach(s=>{let o=e[s].flat(1/0);i=i.concat(this.walkTokens(o,t))}):e.tokens&&(i=i.concat(this.walkTokens(e.tokens,t)))}}return i}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(e=>{let i={...e};if(i.async=this.defaults.async||i.async||!1,e.extensions&&(e.extensions.forEach(e=>{if(!e.name)throw new Error("extension name required");if("renderer"in e){let i=t.renderers[e.name];t.renderers[e.name]=i?function(...t){let s=e.renderer.apply(this,t);return!1===s&&(s=i.apply(this,t)),s}:e.renderer}if("tokenizer"in e){if(!e.level||"block"!==e.level&&"inline"!==e.level)throw new Error("extension level must be 'block' or 'inline'");let i=t[e.level];i?i.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&("block"===e.level?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:"inline"===e.level&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}"childTokens"in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)}),i.extensions=t),e.renderer){let t=this.defaults.renderer||new Us(this.defaults);for(let i in e.renderer){if(!(i in t))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let s=i,o=e.renderer[s],n=t[s];t[s]=(...e)=>{let i=o.apply(t,e);return!1===i&&(i=n.apply(t,e)),i||""}}i.renderer=t}if(e.tokenizer){let t=this.defaults.tokenizer||new Ps(this.defaults);for(let i in e.tokenizer){if(!(i in t))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let s=i,o=e.tokenizer[s],n=t[s];t[s]=(...e)=>{let i=o.apply(t,e);return!1===i&&(i=n.apply(t,e)),i}}i.tokenizer=t}if(e.hooks){let t=this.defaults.hooks||new Bs;for(let i in e.hooks){if(!(i in t))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let s=i,o=e.hooks[s],n=t[s];Bs.passThroughHooks.has(i)?t[s]=e=>{if(this.defaults.async&&Bs.passThroughHooksRespectAsync.has(i))return(async()=>{let i=await o.call(t,e);return n.call(t,i)})();let s=o.call(t,e);return n.call(t,s)}:t[s]=(...e)=>{if(this.defaults.async)return(async()=>{let i=await o.apply(t,e);return!1===i&&(i=await n.apply(t,e)),i})();let i=o.apply(t,e);return!1===i&&(i=n.apply(t,e)),i}}i.hooks=t}if(e.walkTokens){let t=this.defaults.walkTokens,s=e.walkTokens;i.walkTokens=function(e){let i=[];return i.push(s.call(this,e)),t&&(i=i.concat(t.call(this,e))),i}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ds.lex(e,t??this.defaults)}parser(e,t){return js.parse(e,t??this.defaults)}parseMarkdown(e){return(t,i)=>{let s={...i},o={...this.defaults,...s},n=this.onError(!!o.silent,!!o.async);if(!0===this.defaults.async&&!1===s.async)return n(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||null===t)return n(new Error("marked(): input parameter is undefined or null"));if("string"!=typeof t)return n(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,s=await(o.hooks?await o.hooks.provideLexer():e?Ds.lex:Ds.lexInline)(i,o),n=o.hooks?await o.hooks.processAllTokens(s):s;o.walkTokens&&await Promise.all(this.walkTokens(n,o.walkTokens));let r=await(o.hooks?await o.hooks.provideParser():e?js.parse:js.parseInline)(n,o);return o.hooks?await o.hooks.postprocess(r):r})().catch(n);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?Ds.lex:Ds.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let s=(o.hooks?o.hooks.provideParser():e?js.parse:js.parseInline)(i,o);return o.hooks&&(s=o.hooks.postprocess(s)),s}catch(e){return n(e)}}}onError(e,t){return i=>{if(i.message+="\nPlease report this to https://github.com/markedjs/marked.",e){let e="<p>An error occurred:</p><pre>"+Is(i.message+"",!0)+"</pre>";return t?Promise.resolve(e):e}if(t)return Promise.reject(i);throw i}}},Fs=new qs;function Ws(e,t){return Fs.parse(e,t)}Ws.options=Ws.setOptions=function(e){return Fs.setOptions(e),Ws.defaults=Fs.defaults,Li(Ws.defaults),Ws},Ws.getDefaults=Ei,Ws.defaults=Ii,Ws.use=function(...e){return Fs.use(...e),Ws.defaults=Fs.defaults,Li(Ws.defaults),Ws},Ws.walkTokens=function(e,t){return Fs.walkTokens(e,t)},Ws.parseInline=Fs.parseInline,Ws.Parser=js,Ws.parser=js.parse,Ws.Renderer=Us,Ws.TextRenderer=Hs,Ws.Lexer=Ds,Ws.lexer=Ds.lex,Ws.Tokenizer=Ps,Ws.Hooks=Bs,Ws.parse=Ws,Ws.options,Ws.setOptions,Ws.use,Ws.walkTokens,Ws.parseInline,js.parse,Ds.lex;const Gs=new qs({gfm:!0,breaks:!1});function Ys(e){const t=Gs.parse(e,{async:!1});return Ri.sanitize(t,{FORBID_TAGS:["img","picture","source","style","form","input","button","select","textarea","svg","math"]})}Gs.use({renderer:{image:({href:e,title:t,text:i})=>`<a href="${e}"${t?` title="${t}"`:""}>${i||e}</a>`}}),Ri.addHook("afterSanitizeAttributes",e=>{"A"===e.tagName&&(e.setAttribute("target","_blank"),e.setAttribute("rel","noopener noreferrer"))});let Zs=class extends re{constructor(){super(...arguments),this.ticket=null,this.seenAt="",this.me="",this.isAdmin=!1,this.narrow=!1,this.navPos=null,this.language=void 0,this.agentName="claude",this.canAsk=!1,this.labelMap=new Map,this.people=new Map,this.categoryMap=new Map,this._expanded=!1,this._showHistory=!1,this._descCollapsed=!1,this._descFull=0,this._descSettle=0,this._agentToggle=null,this._priorityTo="",this._comment="",this._expandDescription=()=>{this._descCollapsed&&(this._setDescCollapsed(!1),this.renderRoot.querySelector(".scroll")?.scrollTo({top:0}))},this._scrollTo=null,this._titleKey=e=>{const t=e.target;"Enter"===e.key?(e.preventDefault(),t.blur()):"Escape"===e.key&&(t.value=this.ticket?.title??t.value,t.blur())},this._copied=!1}willUpdate(e){if(e.has("ticket")){this.toggleAttribute("open",!!this.ticket);const t=e.get("ticket"),i=t?.events.length??0;t?.id!==this.ticket?.id?(this._scrollTo="top",this._descCollapsed=!1,this._agentToggle=null,this._priorityTo="",this._expanded=!1,this._comment=""):(this.ticket?.agent_state&&!t?.agent_state||this.ticket&&this.ticket.events.length>i)&&(this._scrollTo="bottom")}}_onScroll(e){if(Date.now()<this._descSettle||this._descFull<=56)return;const t=e.currentTarget,i=t.scrollTop,s=t.scrollHeight-t.clientHeight-(this._descFull-56);!this._descCollapsed&&i>4&&s>40?this._setDescCollapsed(!0):this._descCollapsed&&i<=0&&this._setDescCollapsed(!1)}_setDescCollapsed(e){this._descCollapsed=e,this._descSettle=Date.now()+400}_fitTitle(e){e.style.height="auto",e.style.height=`${e.scrollHeight+(e.offsetHeight-e.clientHeight)}px`}_saveTitle(e){const t=e.value.replace(/\s+/g," ").trim();t&&t!==this.ticket?.title?this._patch({title:t}):e.value=this.ticket?.title??"",this._fitTitle(e)}connectedCallback(){super.connectedCallback(),this._resizer=new ResizeObserver(()=>{const e=this.renderRoot.querySelector("textarea.title-edit");e&&this._fitTitle(e)}),this._resizer.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._resizer?.disconnect()}updated(){const e=this.renderRoot.querySelector("textarea.title-edit");if(e&&this._fitTitle(e),!this._descCollapsed){const e=this.renderRoot.querySelector(".desc-sticky .card");this._descFull=e?e.offsetHeight:0}if(this._scrollTo){const e=this.renderRoot.querySelector(".scroll"),t=this._scrollTo;this._scrollTo=null,e?.scrollTo({top:"top"===t?0:e.scrollHeight,behavior:"top"===t?"auto":"smooth"})}}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_patch(e){this._fire("patch-ticket",e)}_addLabelControl(e){return q`<button class="add-label" title="Add Label" aria-label="Add Label" aria-haspopup="listbox"
      @click=${t=>this.dispatchEvent(new CustomEvent("pick-label",{detail:{ticket:e,rect:t.currentTarget.getBoundingClientRect()},bubbles:!0,composed:!0}))}><ha-icon icon="mdi:plus"></ha-icon></button>`}_shownPriority(e){return this._priorityTo||e.priority}_togglePriority(e,t){const i=this._shownPriority(e)===t?"normal":t;this._priorityTo=i===e.priority?"":i}_priorityPills(e){const t=this._shownPriority(e),i={high:"mdi:alert-outline",urgent:"mdi:alert"};return q`<div class="assign prio-group" role="group" aria-label="Priority">
      ${["high","urgent"].map(s=>{const o=t===s;return q`<button class="prio-dot ${s} ${o?"on":""}"
          aria-pressed=${o?"true":"false"} aria-label=${xe[s]}
          title=${o?`Priority is ${xe[s]}. Click to clear.`:`Set priority to ${xe[s]}`}
          @click=${()=>this._togglePriority(e,s)}><ha-icon .icon=${i[s]}></ha-icon></button>`})}
    </div>`}_withAgent(e){return!!e.assignee&&we(e.assignee)}_agentDefault(e){if(this._withAgent(e)||"resolved"===e.status||"closed"===e.status)return!1;const t=[...e.events].reverse().find(e=>"comment"===e.kind||"note"===e.kind);return!!t&&we(t.actor)}_agentOn(e){return this._agentToggle??(this._withAgent(e)||this._agentDefault(e))}_agentApplies(e){return this._agentOn(e)!==this._withAgent(e)&&(null!==this._agentToggle||!!this._comment.trim())}_canSubmit(e){return!!this._comment.trim()||this._agentApplies(e)||!!this._priorityTo}_aiAction(e){const t=this._agentOn(e),i=this._withAgent(e),s=[{id:"queue",label:t?"Remove from AI Agent Queue":"Queue for AI Agent"}];this.canAsk&&!e.agent_state&&s.push({id:"review",label:"Review with AI"});return q`<st-dropdown class="ai-action" up plain ?active=${t!==i||t} icon="mdi:creation" label="AI Action"
      placeholder=${`AI Action${i&&!t?": Remove":t?": Queue":""}`} .options=${s} value="" @change=${e=>{"queue"===e.detail?this._agentToggle=!t:"review"===e.detail&&this._fire("ask-ai",{body:this._comment.trim(),done:()=>{this._comment="",this._agentToggle=null}})}}
      title="Queue the ticket for an AI you run yourself (nothing is sent anywhere), or have the AI chosen in Settings review it (it can't change anything and uses your AI plan)."></st-dropdown>`}_submitLabel(e){const t=this._agentApplies(e),i=this._agentOn(e)?"Queue for AI Agent":"Remove from AI Agent Queue";return this._comment.trim()?t?`Comment and ${i}`:"Comment":t&&this._priorityTo?"Update":t?i:this._priorityTo?"Set Priority":"Comment"}_commentAndReopen(){const e=this._comment.trim();e&&(this._fire("comment",{body:e,internal:!1}),this._comment="",this._patch({status:"in_progress"}))}_submitComment(){const e=this.ticket;if(!e||!this._canSubmit(e))return;const t=this._comment.trim();t&&this._fire("comment",{body:t,internal:!1});const i={};this._agentApplies(e)&&(i.assignee=this._agentOn(e)?this.agentName:null),this._priorityTo&&(i.priority=this._priorityTo),Object.keys(i).length&&this._patch(i),this._comment="",this._agentToggle=null,this._priorityTo=""}_resolve(){const e=this._comment.trim();e?(this._fire("close-ticket",{resolution:e,status:"resolved"}),this._comment=""):this._patch({status:"resolved"})}_change(e){const t=e.data??{},i=e=>Array.isArray(e)?e.map(e=>"labels"===t.field?ze(this.labelMap,String(e)).name:String(e)).join(", ")||"none":null==e||""===e?"none":String(e);switch(e.kind){case"created":return"created this ticket";case"status":return`changed status from ${fe[t.from]??i(t.from)} to ${fe[t.to]??i(t.to)}`;case"priority":return`changed priority from ${i(t.from)} to ${i(t.to)}`;case"assignee":return t.to?""+(we(String(t.to))?"queued this for an AI Agent":`assigned this to ${s=String(t.to),we(s)?"AI":$e(s)}`):"took this off the AI Agent queue";case"link":return`linked ticket #${String(t.to)}`;case"merge":return t.from?`merged ticket #${String(t.from)} into this one`:`merged this into ticket #${String(t.into)}`;case"attachment":return`added ${String(t.to)}`;case"field":return"description"===t.field?"edited the description":`changed ${String(t.field)}${"labels"===t.field||"entities"===t.field?` to ${i(t.to)}`:""}`;default:return e.kind}var s}_detail(e){const t=e.data??{},i=e=>Array.isArray(e)?e.map(e=>"labels"===t.field?ze(this.labelMap,String(e)).name:String(e)).join(", ")||"none":null==e||""===e?"none":String(e);switch(e.kind){case"created":return{field:"Ticket Opened",to:"",icon:"mdi:ticket-outline",tone:"var(--st-accent)"};case"status":return{field:"Status",from:fe[t.from]??i(t.from),to:fe[t.to]??i(t.to),icon:"mdi:progress-check",tone:"resolved"===t.to||"closed"===t.to?"var(--st-success)":"var(--st-accent)"};case"priority":return{field:"Priority",from:i(t.from),to:i(t.to),icon:"mdi:flag-outline",tone:"var(--st-warning)"};case"assignee":return{field:"Assignee",from:i(t.from),to:i(t.to),icon:"mdi:account-outline",tone:"var(--st-fg-secondary)"};case"link":return{field:"Linked",to:`ticket #${String(t.to)}`,icon:"mdi:link-variant",tone:"var(--st-fg-secondary)"};case"merge":{const t=e.data??{};return t.from?{field:"Merged",to:`ticket #${t.from} into this one`,icon:"mdi:call-merge",tone:"var(--st-fg-secondary)"}:{field:"Merged",to:`into ticket #${String(t.into)}`,icon:"mdi:call-merge",tone:"var(--st-fg-secondary)"}}case"attachment":return{field:"Added",to:String(t.to),icon:"mdi:paperclip",tone:"var(--st-fg-secondary)"};case"field":{const e=String(t.field??"field"),s=e.charAt(0).toUpperCase()+e.slice(1),o="labels"===e?"mdi:label-outline":"category"===e?"mdi:shape-outline":"mdi:pencil-outline";return"description"===e?{field:s,to:"edited",icon:o,tone:"var(--st-fg-secondary)"}:{field:s,from:i(t.from),to:i(t.to),icon:o,tone:"var(--st-fg-secondary)"}}default:return{field:e.kind,to:"",icon:"mdi:circle-small",tone:"var(--st-fg-secondary)"}}}_avatar(e){const t=we(e)?void 0:this.people.get($e(e).toLowerCase())?.picture;return t?q`<div class="avatar photo"><img src=${t} alt=${$e(e)} /></div>`:q`<div class="avatar"><ha-icon .icon=${function(e){const t=e.toLowerCase();return we(e)?"mdi:creation":"ha"===t||"home assistant"===t?"mdi:home-assistant":"import"===t?"mdi:database-import-outline":"mdi:account-circle-outline"}(e)}></ha-icon></div>`}async _copyNumber(e){const t=`#${e}`;try{await navigator.clipboard.writeText(t)}catch{const e=document.createElement("textarea");e.value=t,e.style.cssText="position:fixed;opacity:0",document.body.appendChild(e),e.select();try{document.execCommand("copy")}finally{e.remove()}}this._copied=!0,window.setTimeout(()=>this._copied=!1,1500)}_isNew(e){return!!this.seenAt&&e.created_at>this.seenAt&&e.actor!==this.me}_workingComment(e){const t=e.agent_state,i=`ai:${t.agent}`;return q`<div class="ev working" role="status">
      ${this._avatar(i)}
      <div>
        <div class="who"><b>${Ie(i)}</b> · <span class="when">now</span></div>
        <div class="bubble">
          <ha-icon icon="mdi:star-four-points"></ha-icon>
          <span class="what">working on this${t.note?q` <span class="note">· ${t.note}</span>`:W}</span>
          ${this.isAdmin&&this.client?q`<button class="plain" @click=${()=>{this.client.stopAgent(e.id)}}>Stop</button>`:W}
        </div>
      </div>
    </div>`}_actionWords(e){switch(e.action){case"close":return q`<b>${"closed"===e.status?"Close":"Resolve"} this ticket</b><div class="p-sub">Resolution: “${e.resolution}”</div>`;case"set_priority":return q`Set the priority to <b>${xe[e.priority]??e.priority}</b>`;case"add_label":return q`Add the label <b>${e.label}</b>`;case"remove_label":return q`Remove the label <b>${e.label}</b>`;case"set_category":return q`Move it to the category <b>${e.category}</b>`}}_proposal(e){const t=e.data?.proposal;if(!t||!this.ticket)return W;const i=[...this.ticket.events].reverse().find(e=>e.data?.proposal)?.id===e.id,s="pending"===t.state&&i&&this.isAdmin,o=t=>this._fire("proposal",{eventId:e.id,action:t});return q`<div class="proposal">
      <div class="p-head"><ha-icon icon="mdi:star-four-points"></ha-icon>Proposed change${t.actions.length>1?"s":""}</div>
      <ul>${t.actions.map(e=>q`<li>${this._actionWords(e)}</li>`)}</ul>
      ${s?q`<div class="p-acts"><button class="primary" @click=${()=>o("apply")}>Apply</button><button @click=${()=>o("dismiss")}>Dismiss</button></div>`:q`<div class="p-state"><ha-icon .icon=${"applied"===t.state?"mdi:check":"mdi:close"}></ha-icon>${"applied"===t.state?`Applied by ${$e(t.by??"")}`:"dismissed"===t.state?`Dismissed by ${$e(t.by??"")}`:"Replaced by a newer reply"}</div>`}
    </div>`}_eventTemplate(e){const t=this._isNew(e),i=(s=e.created_at,o=this.language,new Date(s).toLocaleString(o,{dateStyle:"medium",timeStyle:"short"}));var s,o;const n=this._showHistory?q`<span title=${_e(e.created_at,this.language)}>${i}</span>`:q`<span title=${i}>${_e(e.created_at,this.language)}</span>`;if("comment"===e.kind||"note"===e.kind)return q`
        <div class="ev ${t?"new":""}">
          ${this._avatar(e.actor)}
          <div>
            <div class="who"><b title=${e.data?.review||e.data?.hints?"A review by the AI chosen in Settings, based only on what Home Desk sent it. It has not checked your home.":""}>${e.data?.review||e.data?.hints?Ie(e.actor):Re(e.actor)}</b> · <span class="when">${n}</span>${t?q`<span class="new-tag">New</span>`:W}${"note"===e.kind?q`<span class="label dense">internal note</span>`:W}${e.data?.merged_from?q`<span class="label dense" title="Copied here when a ticket was merged">from #${e.data.merged_from}</span>`:W}</div>
            <div class="bubble md ${"note"===e.kind?"note":""}">${Qe(Ys(e.body??""))}</div>
            ${this._proposal(e)}
          </div>
        </div>`;const r=this._detail(e);return q`
      <div class="ev system ${t?"new":""}">
        <ha-icon .icon=${r.icon}></ha-icon>
        <div class="line">
          <span><b>${r.field}</b> ${r.to}${void 0!==r.from?q`<s>${r.from}</s>`:W}</span>
          <span class="stamp">${t?q`<b class="new-text">New · </b>`:W}${Re(e.actor)} · ${i}</span>
        </div>
      </div>`}render(){const e=this.ticket;if(!e)return q`<div class="empty"><ha-icon icon="mdi:ticket-outline"></ha-icon><span>Select a ticket</span></div>`;const t=e.description.length>1800,i="resolved"===e.status||"closed"===e.status;return q`
      <div class="top">
        <div class="head ${this.isAdmin?"admin":""}">
          ${this.narrow?q`<button class="icon back" title="Back" aria-label="Back" @click=${()=>this._fire("back")}><ha-icon icon="mdi:arrow-left"></ha-icon></button>`:W}
          ${this.isAdmin?q`<textarea class="title-edit" rows="1" aria-label="Title" spellcheck="false" .value=${e.title}
                @input=${e=>this._fitTitle(e.target)}
                @keydown=${this._titleKey}
                @blur=${e=>this._saveTitle(e.target)}></textarea>`:q`<h1>${e.title}</h1>`}
          ${this.isAdmin?q`<button class="icon hist prev" title="Previous ticket" aria-label="Previous ticket" ?disabled=${!this.navPos||this.navPos.index<=0}
                @click=${()=>this._fire("nav-ticket",-1)}><ha-icon icon="mdi:chevron-up"></ha-icon></button>
              <button class="icon hist next" title=${this.navPos?`Next ticket (${this.navPos.index+1} of ${this.navPos.total})`:"Next ticket"} aria-label="Next ticket"
                ?disabled=${!this.navPos||this.navPos.index>=this.navPos.total-1}
                @click=${()=>this._fire("nav-ticket",1)}><ha-icon icon="mdi:chevron-down"></ha-icon></button>
              <button class="icon hist merge" title="Merge into another ticket" aria-label="Merge into another ticket"
                @click=${e=>this._fire("pick-merge",{rect:e.currentTarget.getBoundingClientRect()})}>
                <ha-icon icon="mdi:call-merge"></ha-icon></button>`:W}
          <button class="icon hist" aria-pressed=${this._showHistory?"true":"false"}
            title=${this._showHistory?"Hide history":"Show history"} aria-label="Show history"
            @click=${()=>this._showHistory=!this._showHistory}><ha-icon icon="mdi:history"></ha-icon></button>
        </div>
        <div class="sub">
          <div class="meta-line">
            <span>Opened ${_e(e.created_at,this.language)} by <ha-icon icon=${ke(e.requester)}></ha-icon> ${$e(e.requester)}</span>
            ${e.updated_by?q`<span>Updated ${_e(e.updated_at,this.language)} by <ha-icon icon=${ke(e.updated_by)}></ha-icon> ${$e(e.updated_by)}</span>`:W}
            ${e.assignee&&we(e.assignee)?q`<span title="Assigned to an AI agent you run yourself (your own CLI or desktop app)"><ha-icon icon=${ke(e.assignee)}></ha-icon> With AI Agent</span>`:W}
            ${e.labels.includes(Oe)?q`<span class="blocked" title="Waiting on a person, a part or a fix"><ha-icon icon="mdi:timer-sand"></ha-icon> Blocked</span>`:W}
            ${e.comment_count?q`<span><ha-icon icon="mdi:comment-outline"></ha-icon> ${e.comment_count}</span>`:W}
          </div>
          <!-- Second line: the category, status and priority, then the labels (which wrap on to their own line if they don't fit). -->
          <div class="tag-line">
            <button class="num ${this._copied?"copied":""}" title=${this._copied?"Copied":"Copy the ticket number"} aria-label="Ticket ${e.id}: copy the number"
              @click=${()=>{this._copyNumber(e.id)}}>${this._copied?q`<ha-icon icon="mdi:check"></ha-icon>Copied`:q`#${e.id}`}</button>
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
                ${e.description?q`<div class="md ${t&&!this._expanded?"clamp":""}">${Qe(Ys(e.description))}</div>`:W}
                ${e.attachments?.length&&this.client?q`<st-ticket-attachments class="attached" .client=${this.client} .ticketId=${e.id} .items=${e.attachments}></st-ticket-attachments>`:W}
                ${t?q`<button class="more" @click=${()=>this._expanded=!this._expanded}>${this._expanded?"Show Less":"Show All"}</button>`:W}
                <st-ticket-things class="about" .hass=${this.hass} .client=${this.client} .ticketId=${e.id} .editable=${this.isAdmin}
                  .entities=${e.entities} .devices=${e.devices??[]} .areas=${e.areas??[]} 
                  @change=${e=>this._patch(e.detail)}></st-ticket-things>
              </div>
              <ha-icon class="pin-hint" icon="mdi:chevron-up"></ha-icon>
            </div>`:W}

        ${e.resolution?q`<div class="card resolution"><h3>Resolution</h3><div class="md">${Qe(Ys(e.resolution))}</div></div>`:W}

        ${e.related?.length?q`<div class="chips"><span class="sect">Related</span>${e.related.map(e=>q`<span class="chip link" title=${e.title} @click=${()=>this._fire("open-ticket",e.id)}>#${e.id} ${e.title.length>40?e.title.slice(0,40)+"…":e.title}</span>`)}</div>`:W}

        <div class="timeline" aria-live="polite" aria-relevant="additions">
          <h2>${this._showHistory?"Activity":"Comments"}</h2>
          ${e.events.filter(e=>this._showHistory||"comment"===e.kind||"note"===e.kind).map(e=>this._eventTemplate(e))}
          ${e.agent_state?this._workingComment(e):W}
          ${this._showHistory||e.agent_state||e.events.some(e=>"comment"===e.kind||"note"===e.kind)?W:q`<div class="none">No comments yet</div>`}
        </div>
      </div></div>

      <div class="dock">
        <div class="card composer">
          <textarea rows="2" placeholder="Add a comment" .value=${this._comment}
            @input=${e=>this._comment=e.target.value}></textarea>
          <div class="bar">
            <div class="opts">
              ${this.isAdmin?q`${this._aiAction(e)}
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
    `}};Zs.styles=[ue,r`
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
        padding-right: 176px;
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
      /* Previous and next ticket, in the order of the list, to the left of those. */
      .hist.next {
        right: 88px;
      }
      .hist.prev {
        right: 132px;
      }
      .hist[disabled] {
        opacity: 0.35;
        cursor: default;
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
      /* The ticket number: an outlined pill like the category's; click to copy it. */
      .num {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        height: 24px;
        padding: 0 10px;
        box-sizing: border-box;
        border: 1px solid var(--st-outline);
        border-radius: var(--st-r-pill);
        background: transparent;
        color: var(--st-fg-secondary);
        font-size: var(--st-fs-caption);
        font-weight: var(--ha-font-weight-medium, 500);
        font-variant-numeric: tabular-nums;
        cursor: pointer;
      }
      .num:hover,
      .num:focus-visible {
        color: var(--st-fg);
        border-color: var(--st-field-outline-hover);
      }
      .num ha-icon {
        --mdc-icon-size: 14px;
      }
      .num.copied {
        color: var(--st-success);
        border-color: var(--st-success);
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
      .about {
        margin-top: 12px;
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
      /* The AI Agent is working: a comment in the thread with what it is doing, and a Stop button. */
      .ev.working .bubble {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .ev.working .bubble > ha-icon {
        --mdc-icon-size: 18px;
        flex: none;
        color: var(--st-accent);
        animation: working 1.4s ease-in-out infinite;
      }
      .ev.working .what {
        flex: 1;
        min-width: 0;
      }
      .ev.working .what .note {
        color: var(--st-fg-secondary);
      }
      @keyframes working {
        50% {
          opacity: 0.3;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .ev.working .bubble > ha-icon {
          animation: none;
        }
      }
      /* Changes the AI Agent proposes: a flat box under its comment with what it would do, and Apply and Dismiss. */
      .proposal {
        margin-top: 8px;
        padding: 12px 16px;
        border: 1px solid var(--st-outline);
        border-radius: var(--ha-border-radius-lg, 12px);
        font-size: var(--st-fs-body);
      }
      .proposal .p-head {
        display: flex;
        align-items: center;
        gap: 6px;
        font-weight: 500;
        color: var(--st-accent);
      }
      .proposal .p-head ha-icon,
      .proposal .p-state ha-icon {
        --mdc-icon-size: 18px;
      }
      .proposal ul {
        margin: 6px 0 0;
        padding-left: 22px;
      }
      .proposal li + li {
        margin-top: 6px;
      }
      .proposal .p-sub {
        color: var(--st-fg-secondary);
      }
      .proposal .p-acts {
        display: flex;
        gap: 8px;
        margin-top: 12px;
      }
      .proposal .p-state {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-top: 8px;
        color: var(--st-fg-secondary);
      }
      .ev .new-tag {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        margin-left: 8px;
        font-size: var(--st-fs-caption);
        font-weight: 500;
        color: var(--st-accent);
      }
      .ev .new-tag::before {
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--st-accent);
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
      /* The AI Action menu: the same height as the priority pills beside it. */
      st-dropdown.ai-action {
        --st-h-bar: 32px;
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
       * The composer reacts to its own width, not the window's. Narrower than a desktop pane, the divider after the priority icons goes, so
       * everything stays on one line. On a phone the options sit on one line and the buttons stack full width
       * beneath, with their labels centred.
       */
      .dock {
        container-type: inline-size;
      }
      @container (max-width: 860px) {
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
    `],e([de({attribute:!1})],Zs.prototype,"ticket",void 0),e([de({attribute:!1})],Zs.prototype,"client",void 0),e([de()],Zs.prototype,"seenAt",void 0),e([de()],Zs.prototype,"me",void 0),e([de({type:Boolean})],Zs.prototype,"isAdmin",void 0),e([de({type:Boolean})],Zs.prototype,"narrow",void 0),e([de({attribute:!1})],Zs.prototype,"navPos",void 0),e([de()],Zs.prototype,"language",void 0),e([de()],Zs.prototype,"agentName",void 0),e([de({attribute:!1})],Zs.prototype,"hass",void 0),e([de({type:Boolean})],Zs.prototype,"canAsk",void 0),e([de({attribute:!1})],Zs.prototype,"labelMap",void 0),e([de({attribute:!1})],Zs.prototype,"people",void 0),e([de({attribute:!1})],Zs.prototype,"categoryMap",void 0),e([he()],Zs.prototype,"_expanded",void 0),e([he()],Zs.prototype,"_showHistory",void 0),e([he()],Zs.prototype,"_descCollapsed",void 0),e([he()],Zs.prototype,"_agentToggle",void 0),e([he()],Zs.prototype,"_priorityTo",void 0),e([he()],Zs.prototype,"_comment",void 0),e([he()],Zs.prototype,"_copied",void 0),Zs=e([pe("st-ticket-detail")],Zs);const Vs=[{id:"bug",name:"Bug"},{id:"enhancement",name:"Enhancement"},{id:"question",name:"Question"},{id:"task",name:"Task",admin:!0}];let Qs=class extends re{constructor(){super(...arguments),this.isAdmin=!1,this.categories=[],this._category="",this._entities=[],this._devices=[],this._areas=[],this._title="",this._description="",this._kind="bug",this._priority="normal"}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_submit(){this._title.trim()&&this._fire("create",{title:this._title.trim(),description:this._description,labels:[this._kind],priority:this._priority,...this.isAdmin&&this._category?{category:this._category}:{},...this.isAdmin&&this._entities.length?{entities:this._entities}:{},...this.isAdmin&&this._devices.length?{devices:this._devices}:{},...this.isAdmin&&this._areas.length?{areas:this._areas}:{}})}render(){return q`
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
                ${Vs.filter(e=>!e.admin||this.isAdmin).map(e=>q`<option value=${e.id} ?selected=${e.id===this._kind}>${e.name}</option>`)}
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
          ${this.isAdmin?q`<div class="field">
                <label>What is it about?</label>
                <st-ticket-things .hass=${this.hass} editable .entities=${this._entities} .devices=${this._devices} .areas=${this._areas}
                  @change=${e=>{this._entities=e.detail.entities,this._devices=e.detail.devices,this._areas=e.detail.areas}}></st-ticket-things>
              </div>`:""}
          <div class="actions">
            <button @click=${()=>this._fire("close")}>Cancel</button>
            <button class="primary" ?disabled=${!this._title.trim()} @click=${this._submit}>Create</button>
          </div>
        </div>
      </div>
    `}};Qs.styles=[ue,r`
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
    `],e([de({type:Boolean})],Qs.prototype,"isAdmin",void 0),e([de({attribute:!1})],Qs.prototype,"categories",void 0),e([de({attribute:!1})],Qs.prototype,"hass",void 0),e([he()],Qs.prototype,"_category",void 0),e([he()],Qs.prototype,"_entities",void 0),e([he()],Qs.prototype,"_devices",void 0),e([he()],Qs.prototype,"_areas",void 0),e([he()],Qs.prototype,"_title",void 0),e([he()],Qs.prototype,"_description",void 0),e([he()],Qs.prototype,"_kind",void 0),e([he()],Qs.prototype,"_priority",void 0),Qs=e([pe("st-new-ticket-dialog")],Qs);let Xs=class extends re{constructor(){super(...arguments),this.labels=[],this._q="",this._draft=null,this._orig=null,this._shake=!1,this._toRemove=null,this._colorsOpen=!1,this._colorQ="",this._error=""}_fire(e){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0}))}_message(e){return String(e&&"object"==typeof e&&"message"in e?e.message:e)}get _shown(){const e=this._q.trim().toLowerCase();return e?this.labels.filter(t=>t.name.toLowerCase().includes(e)||t.description.toLowerCase().includes(e)):this.labels}_open(e){this._error="",this._colorsOpen=!1,this._draft=e?{id:e.id,name:e.name,icon:e.icon,color:e.color,description:e.description}:{id:null,name:"",icon:"",color:"",description:""},this._orig=this._draft}async _save(){const e=this._draft;if(e&&e.name.trim())try{e.id?await this.client.updateLabel(e.id,{name:e.name.trim(),icon:e.icon.trim(),description:e.description,...e.color?{color:e.color}:{}}):await this.client.createLabel({name:e.name.trim(),icon:e.icon.trim(),description:e.description,...e.color?{color:e.color}:{}}),this._draft=null,this._fire("labels-changed")}catch(e){this._error=this._message(e)}}_tryClose(){if(!this._toRemove)return this._dirty?(this._shake=!0,void window.setTimeout(()=>this._shake=!1,400)):void(this._draft=null)}get _dirty(){const e=this._draft,t=this._orig;return!(!e||!t)&&(e.name!==t.name||e.icon!==t.icon||e.color!==t.color||e.description!==t.description)}async _remove(){const e=this._toRemove;if(e)try{await this.client.deleteLabel(e.id),this._toRemove=null,this._draft=null,this._fire("labels-changed")}catch(e){this._toRemove=null,this._error=this._message(e)}}_row(e){return q`<div class="row ${e.builtin?"locked":""}" role="row"
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
    </div>`}_dialog(e){const t=e.color?Ce(e.color):"",i=customElements.get("ha-icon-picker"),s=this._colorQ.trim().toLowerCase(),o=e.id?this._orig?.name??e.name:"New Label";return q`<div class="scrim" @click=${e=>e.target===e.currentTarget&&this._tryClose()}
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
                ${Ne.filter(e=>!s||Ce(e).toLowerCase().includes(s)).map(t=>q`<button class="opt ${t===e.color?"selected":""}" role="option"
                    @click=${()=>{this._draft={...e,color:t},this._colorsOpen=!1}}>
                    <span class="dot big" style="--c: ${Se(t)}"></span>${Ce(t)}
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
    `}};Xs.styles=[ue,r`
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
    `],e([de({attribute:!1})],Xs.prototype,"client",void 0),e([de({attribute:!1})],Xs.prototype,"labels",void 0),e([he()],Xs.prototype,"_q",void 0),e([he()],Xs.prototype,"_draft",void 0),e([he()],Xs.prototype,"_orig",void 0),e([he()],Xs.prototype,"_shake",void 0),e([he()],Xs.prototype,"_toRemove",void 0),e([he()],Xs.prototype,"_colorsOpen",void 0),e([he()],Xs.prototype,"_colorQ",void 0),e([he()],Xs.prototype,"_error",void 0),Xs=e([pe("st-label-manager")],Xs);let Ks=class extends re{constructor(){super(...arguments),this.categories=[],this._q="",this._draft=null,this._orig=null,this._shake=!1,this._toRemove=null,this._error=""}_fire(e){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0}))}_message(e){return String(e&&"object"==typeof e&&"message"in e?e.message:e)}get _shown(){const e=this._q.trim().toLowerCase();return e?this.categories.filter(t=>t.name.toLowerCase().includes(e)):this.categories}get _dirty(){const e=this._draft,t=this._orig;return!(!e||!t||e.name===t.name&&e.icon===t.icon)}_open(e){this._error="",this._draft=e?{id:e.id,name:e.name,icon:e.icon}:{id:null,name:"",icon:""},this._orig=this._draft}async _save(){const e=this._draft;if(e&&e.name.trim())try{const t={name:e.name.trim(),icon:e.icon.trim()};e.id?await this.client.updateCategory(e.id,t):await this.client.createCategory(t),this._draft=null,this._fire("categories-changed")}catch(e){this._error=this._message(e)}}_tryClose(){if(!this._toRemove)return this._dirty||this._draft&&!this._draft.id&&(this._draft.name||this._draft.icon)?(this._shake=!0,void window.setTimeout(()=>this._shake=!1,400)):void(this._draft=null)}async _remove(){const e=this._toRemove;if(e)try{await this.client.deleteCategory(e.id),this._toRemove=null,this._draft=null,this._fire("categories-changed")}catch(e){this._toRemove=null,this._error=this._message(e)}}_row(e){return q`<div class="row ${e.builtin?"locked":""}" role="row" @click=${()=>!e.builtin&&this._open(e)}>
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
    `}};Ks.styles=[ue,r`
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
    `],e([de({attribute:!1})],Ks.prototype,"client",void 0),e([de({attribute:!1})],Ks.prototype,"categories",void 0),e([he()],Ks.prototype,"_q",void 0),e([he()],Ks.prototype,"_draft",void 0),e([he()],Ks.prototype,"_orig",void 0),e([he()],Ks.prototype,"_shake",void 0),e([he()],Ks.prototype,"_toRemove",void 0),e([he()],Ks.prototype,"_error",void 0),Ks=e([pe("st-category-manager")],Ks);let Js=class extends re{constructor(){super(...arguments),this.heading="",this.body="",this.confirmLabel="Confirm",this.danger=!1}_fire(e){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0}))}firstUpdated(){this.renderRoot.querySelector("button.primary")?.focus()}render(){return q`<div class="scrim" @click=${e=>e.target===e.currentTarget&&this._fire("cancel")}
      @keydown=${e=>"Escape"===e.key&&this._fire("cancel")}>
      <div class="dialog" role="alertdialog" aria-modal="true" aria-label=${this.heading}>
        <h2>${this.heading}</h2>
        <p>${this.body}</p>
        <div class="actions">
          <button @click=${()=>this._fire("cancel")}>Cancel</button>
          <button class="primary ${this.danger?"danger":""}" @click=${()=>this._fire("confirm")}>${this.confirmLabel}</button>
        </div>
      </div>
    </div>`}};Js.styles=[ue,r`
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
    `],e([de()],Js.prototype,"heading",void 0),e([de()],Js.prototype,"body",void 0),e([de()],Js.prototype,"confirmLabel",void 0),e([de({type:Boolean})],Js.prototype,"danger",void 0),Js=e([pe("st-confirm-dialog")],Js);const eo=[{id:"immediately",label:"Straight away"},{id:"1h",label:"After 1 hour"},{id:"6h",label:"After 6 hours"},{id:"1d",label:"After 1 day"},{id:"3d",label:"After 3 days"},{id:"7d",label:"After 7 days"},{id:"14d",label:"After 14 days"},{id:"30d",label:"After 30 days"},{id:"never",label:"Never"}];let to=class extends re{constructor(){super(...arguments),this._s=null,this._error="",this._test=null,this._confirmTest=!1}async _runTest(){this._test={busy:!0};try{this._test={busy:!1,reply:(await this.client.testAgent()).reply}}catch(e){const t=String(e&&"object"==typeof e&&"message"in e?e.message:e);this._test={busy:!1,error:t}}}async connectedCallback(){super.connectedCallback(),this._s=await this.client.settings()}async _save(e){const t=this._s;if(t){this._s={...t,...e,notify:{...t.notify,...e.notify}};try{this._s=await this.client.saveSettings(e),this._error="",this.dispatchEvent(new CustomEvent("settings-changed",{detail:this._s,bubbles:!0,composed:!0}))}catch{this._error="Couldn't save that. These options need the newer Home Desk integration.",this._s=t}}}_targetName(e){if("persistent_notification"===e)return"Home Assistant notifications (the bell)";const t=e.startsWith("mobile_app_"),i=e.replace(/^mobile_app_/,"").replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase());return t?`${i} (mobile app)`:i}get _targets(){const e=Object.keys(this.hass.services?.notify??{}),t=this._s?.notify.targets??[];return[...new Set([...e,...t])].filter(e=>"notify"!==e).sort()}get _agents(){return Object.entries(this.hass.states??{}).filter(([e])=>e.startsWith("ai_task.")||e.startsWith("conversation.")).map(([e,t])=>({id:e,label:String(t.attributes.friendly_name??e)})).sort((e,t)=>e.label.localeCompare(t.label))}get _engines(){return Object.entries(this.hass.states??{}).filter(([e])=>e.startsWith("stt.")).map(([e,t])=>({id:e,label:String(t.attributes.friendly_name??e)})).sort((e,t)=>e.label.localeCompare(t.label))}_switch(e,t,i){return q`<button class="switch" role="switch" aria-checked=${e?"true":"false"} aria-label=${t}
      @click=${()=>i(!e)}></button>`}_toggleTarget(e){const t=this._s;if(!t)return;const i=t.notify.targets.includes(e);this._save({notify:{targets:i?t.notify.targets.filter(t=>t!==e):[...t.notify.targets,e]}})}render(){const e=this._s;if(!e)return q`<div class="page"><p class="help">Loading…</p></div>`;const t=[{id:"",label:"None"},...this._agents];return q`<div class="page">
      ${this._error?q`<div class="error">${this._error}</div>`:W}

      <div class="card">
        <h2>Tickets</h2>
        <div class="srow">
          <div class="text">
            <div class="name">Close resolved tickets</div>
            <div class="desc">A resolved ticket closes by itself after this long. A new comment on it can reopen it first.</div>
          </div>
          <st-dropdown plain field label="Close resolved tickets" .value=${e.auto_close} .options=${eo}
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

      <div class="card">
        <h2>Voice messages</h2>
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
          <st-dropdown plain field label="Speech-to-text" .value=${e.stt} .options=${[{id:"",label:"Assist default"},...this._engines]}
            @change=${e=>{this._save({stt:e.detail})}}></st-dropdown>
        </div>
      </div>

      <div class="card">
        <h2>AI review</h2>
        <div class="srow">
          <div class="text">
            <div class="name">AI for review</div>
            <div class="desc">Which AI set up in Home Assistant answers <b>Review with AI</b> on a ticket: what it thinks is going on and what to try. It can't change anything. <b>Queue for AI Agent</b> is separate: that only marks the ticket for an AI agent you run yourself (such as your Claude CLI or Gemini Antigravity) and sends nothing anywhere.</div>
          </div>
          <st-dropdown plain field label="AI for review" .value=${e.agent} .options=${t}
            @change=${e=>{this._save({agent:e.detail})}}></st-dropdown>
        </div>
        ${e.agent&&!e.agent.startsWith("ai_task.")?q`<div class="note">Review with AI needs an <b>AI Task</b>. A conversation agent can't be used for it.</div>`:W}
        <div class="srow">
          <div class="text">
            <div class="name">Daily limit</div>
            <div class="desc">The most reviews in a day, so a busy day can't run up your AI plan.</div>
          </div>
          <st-dropdown plain field label="Daily limit" .value=${String(e.agent_daily_cap)}
            .options=${[...new Set([10,30,100,300,e.agent_daily_cap])].sort((e,t)=>e-t).map(e=>({id:String(e),label:`${e} requests a day`}))}
            @change=${e=>{this._save({agent_daily_cap:Number(e.detail)})}}></st-dropdown>
        </div>
        <div class="srow">
          <div class="text">
            <div class="name">Test the AI</div>
            <div class="desc">Sends a harmless question, with nothing from your home, to check it answers.</div>
          </div>
          <button class="tbtn" ?disabled=${!e.agent||this._test?.busy} @click=${()=>this._confirmTest=!0}>${this._test?.busy?"Asking…":"Test"}</button>
        </div>
        ${this._test?.reply?q`<div class="test-out">${this._test.reply}</div>`:W}
        ${this._test?.error?q`<div class="test-out bad">${this._test.error}</div>`:W}
      </div>

      <div class="card">
        <h2>What the AI is sent for a review</h2>
        <p class="help">The ticket and its comments are always sent. Everything sent goes to your AI provider, with passwords, keys, coordinates and email addresses taken out first.</p>
        <div class="srow">
          <div class="text"><div class="name">Entity states</div><div class="desc">The state, attributes and last day of changes of the entities a ticket names.</div></div>
          ${this._switch(e.agent_states,"Entity states",e=>{this._save({agent_states:e})})}
        </div>
        <div class="srow">
          <div class="text"><div class="name">Automation and script configuration</div><div class="desc">The configuration of any automation or script a ticket names.</div></div>
          ${this._switch(e.agent_config,"Automation and script configuration",e=>{this._save({agent_config:e})})}
        </div>
        <div class="srow">
          <div class="text"><div class="name">Related tickets</div><div class="desc">Linked tickets and ones about the same entities, with how they were resolved.</div></div>
          ${this._switch(e.agent_related,"Related tickets",e=>{this._save({agent_related:e})})}
        </div>
      </div>

      <div class="card">
        <h2>Review instructions</h2>
        <p class="help">What Review with AI tells the AI about its job and how to write. ${e.agent_prompt?"You have changed it from the default.":"This is the default."} Home Desk adds the ticket, its comments and what you allowed above after your text, along with the part shown below, which it needs to read proposed changes and can't be edited.</p>
        <div class="prompt-edit">
          <textarea rows="18" aria-label="Review instructions" spellcheck="false" maxlength="6000"
            .value=${e.agent_prompt||e.agent_prompt_default}
            @change=${e=>{this._save({agent_prompt:e.target.value})}}></textarea>
          <div class="prompt-acts">
            <button class="tbtn" ?disabled=${!e.agent_prompt} @click=${()=>{this._save({agent_prompt:""})}}>Reset to default</button>
          </div>
        </div>
        <details class="fixed">
          <summary>Always added after your text</summary>
          <pre>${e.agent_prompt_fixed}</pre>
        </details>
      </div>

      <div class="card">
        <h2>Notifications</h2>
        <p class="help">These are your own settings. Each manager chooses where their notifications go and what they hear about.</p>
        <div class="sub">Notify me when</div>
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
      <div class="card">
        <h2>Send notifications to</h2>
        ${this._targets.length?this._targets.map(t=>q`<label class="srow pick">
                <input class="check" type="checkbox" .checked=${e.notify.targets.includes(t)} @change=${()=>this._toggleTarget(t)} />
                <div class="text"><div class="name">${this._targetName(t)}</div></div>
              </label>`):q`<div class="note">Home Assistant has no notify services yet. Install the Companion app on a phone to get one.</div>`}
      </div>
      ${this._confirmTest?q`<st-confirm-dialog heading="Use your AI plan?" confirmLabel="Yes, test it"
            body="This sends one short question, with nothing from your home, to the AI Agent. It uses a very small amount of your AI plan."
            @cancel=${()=>this._confirmTest=!1}
            @confirm=${()=>{this._confirmTest=!1,this._runTest()}}></st-confirm-dialog>`:W}
    </div>`}};to.styles=[ue,r`
      :host {
        display: block;
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        background: var(--st-bg);
      }
      .page {
        max-width: 720px;
        margin: 0 auto;
        padding: 24px 16px 48px;
      }
      /* Home Assistant's settings cards: the title is inside the card, rows have no dividers, and the box is lighter than the page. */
      .card {
        margin-bottom: 24px;
        padding: 8px 0;
        border: 1px solid var(--ha-card-border-color, var(--st-outline));
        border-radius: var(--ha-card-border-radius, var(--ha-border-radius-xl, 12px));
        background: var(--ha-card-background, var(--card-background-color, var(--st-surface)));
        overflow: hidden;
      }
      .card h2 {
        margin: 0;
        padding: 16px 16px 8px;
        font-size: var(--ha-font-size-2xl, 24px);
        font-weight: 400;
        line-height: 1.3;
      }
      .card .help {
        margin: 0;
        padding: 0 16px 8px;
        font-size: var(--st-fs-body);
        color: var(--st-fg);
      }
      .card .sub {
        padding: 16px 16px 4px;
        font-size: var(--st-fs-body);
        font-weight: 600;
      }
      .srow {
        display: flex;
        align-items: center;
        gap: 16px;
        min-height: 56px;
        padding: 8px 16px;
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
        width: 240px;
        flex: none;
      }
      /* A text button, as in Home Assistant: accent-coloured words, no box. */
      .srow button.tbtn {
        height: 40px;
        padding: 0 16px;
        border-radius: var(--st-r-pill);
        background: transparent;
        color: var(--st-accent);
        font-weight: 500;
        font-size: var(--st-fs-body);
      }
      /* HA's switch: a 52x32 pill with an outline. Off, a small grey thumb; on, a large accent-coloured thumb on a tinted track. */
      .switch {
        position: relative;
        flex: none;
        box-sizing: border-box;
        width: 52px;
        height: 32px;
        padding: 0;
        border: 2px solid color-mix(in srgb, var(--st-fg) 55%, transparent);
        border-radius: 16px;
        background: color-mix(in srgb, var(--st-fg) 8%, var(--st-surface));
        transition: background-color 150ms ease-in-out, border-color 150ms ease-in-out;
      }
      .switch::after {
        content: "";
        position: absolute;
        top: 6px;
        left: 6px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--switch-unchecked-button-color, color-mix(in srgb, var(--st-fg) 55%, var(--st-surface)));
        transition: all 150ms ease-in-out;
      }
      .switch[aria-checked="true"] {
        border-color: var(--st-accent);
        background: color-mix(in srgb, var(--st-accent) 24%, var(--st-surface));
      }
      .switch[aria-checked="true"]::after {
        top: 2px;
        left: 20px;
        width: 24px;
        height: 24px;
        background: var(--switch-checked-button-color, var(--st-accent));
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
      .prompt-edit {
        padding: 0 16px;
      }
      .prompt-edit textarea {
        width: 100%;
        box-sizing: border-box;
        font-family: var(--ha-font-family-code, ui-monospace, SFMono-Regular, Menlo, monospace);
        font-size: var(--st-fs-small);
        line-height: 1.5;
      }
      .prompt-acts {
        display: flex;
        justify-content: flex-end;
        margin-top: 4px;
      }
      .fixed {
        margin: 8px 16px 8px;
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
      }
      .fixed summary {
        cursor: pointer;
        padding: 6px 0;
      }
      .fixed pre {
        margin: 4px 0 8px;
        white-space: pre-wrap;
        font-family: var(--ha-font-family-code, ui-monospace, SFMono-Regular, Menlo, monospace);
      }
      .test-out {
        padding: 0 16px 12px;
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
        white-space: pre-wrap;
      }
      .test-out.bad {
        color: var(--st-danger);
      }
      .error {
        margin-bottom: 12px;
        padding: 12px 16px;
        border-left: 4px solid var(--st-danger);
        font-size: var(--st-fs-body);
        background: color-mix(in srgb, var(--st-danger) 12%, var(--st-surface));
      }
    `],e([de({attribute:!1})],to.prototype,"client",void 0),e([de({attribute:!1})],to.prototype,"hass",void 0),e([he()],to.prototype,"_s",void 0),e([he()],to.prototype,"_error",void 0),e([he()],to.prototype,"_test",void 0),e([he()],to.prototype,"_confirmTest",void 0),to=e([pe("st-settings")],to);const io={report:"Report",labels:"Labels",categories:"Categories",settings:"Settings"};let so=class extends re{constructor(){super(...arguments),this.page="",this.view="active",this.tickets=[],this.narrow=!1,this.admin=!1,this._menuOpen=!1}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_choose(e){this._menuOpen=!1,this._fire("page-change",e)}render(){return q`
      <div class="bar">
        <div class="side ${this.page?"wide":""}">
          ${this.page?q`<button class="icon" title="Back" aria-label="Back" @click=${()=>this._choose("")}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
                <h1 class="crumb">${io[this.page]}</h1>`:q`${this.narrow?q`<button class="icon" title="Menu" @click=${()=>this._fire("hass-toggle-menu")}><ha-icon icon="mdi:menu"></ha-icon></button>`:W}
              <h1><button class="brand" title="Home" aria-label="Home Desk home" @click=${()=>this._fire("go-home")}><svg class="mark" viewBox="0 0 74.05 74.05" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M72.35 14.77 72.79 13.97 72.97 13.55 73.25 12.67 73.41 11.77 73.45 10.86 73.37 9.95 73.17 9.05 72.86 8.19 72.66 7.78 72.19 7 71.61 6.28 71.29 5.95 70.59 5.36 69.82 4.87 68.99 4.49 68.12 4.21 67.21 4.05 66.30 4.01 65.84 4.03 64.94 4.17 64.06 4.43 63.63 4.60 62.82 5.02 62.07 5.55 61.72 5.85 61.09 6.51 51.94 18.96 62.51 28.21ZM35.60 4.81 34.89 4.47 34.15 4.21 33.38 4.06 32.60 4.01 32.21 4.02 31.43 4.13 31.05 4.21 30.31 4.47 29.60 4.81 28.95 5.25 2.65 28.25 2.09 28.80 1.84 29.10 1.41 29.76 1.22 30.10 0.92 30.83 0.72 31.59 0.61 32.37 0.60 32.76 0.61 64.43 0.72 65.21 0.92 65.97 1.22 66.69 1.61 67.37 2.09 67.99 2.64 68.55 3.27 69.03 3.95 69.42 4.67 69.72 5.05 69.83 5.82 69.99 6.60 70.04 58.99 70.03 59.77 69.92 60.53 69.72 61.25 69.42 61.93 69.03 62.56 68.55 63.11 67.99 63.59 67.37 63.98 66.69 64.28 65.97 64.40 65.59 64.55 64.82 64.60 64.04 64.59 32.37 64.48 31.59 64.40 31.21 64.28 30.83 63.98 30.10 63.79 29.76 63.36 29.10 62.84 28.51 62.51 28.21 38.24 61.28 37.96 61.64 37.65 61.99 37.31 62.31 36.96 62.61 36.59 62.89 36.20 63.14 35.79 63.37 35.37 63.57 34.94 63.73 34.50 63.88 34.05 63.99 33.59 64.07 33.13 64.12 32.67 64.14 32.21 64.13 31.74 64.09 31.29 64.01 30.83 63.91 30.39 63.78 29.95 63.62 29.53 63.43 29.12 63.21 28.73 62.97 28.35 62.70 27.99 62.41 27.65 62.09 13.65 48.09 13.05 47.40 12.78 47.03 12.32 46.23 11.97 45.39 11.84 44.95 11.66 44.05 11.60 43.14 11.66 42.22 11.84 41.33 12.13 40.46 12.54 39.64 13.05 38.88 13.65 38.19 14.34 37.58 15.10 37.08 15.92 36.67 16.79 36.38 17.69 36.20 18.60 36.14 19.51 36.20 19.97 36.27 20.85 36.51 21.28 36.67 22.10 37.08 22.86 37.58 23.55 38.19 31.78 46.42 51.94 18.96 36.55 5.50 35.93 5.02ZM24.55 23.25 25.30 22.93 26.05 22.57 26.83 22.11 27.58 21.60 28.28 21.04 28.98 20.40 29.60 19.72 30.18 19 30.69 18.25 31.12 17.51 31.50 16.74 31.81 15.99 32.03 15.33 32.10 15.19 32.21 15.08 32.34 14.99 32.48 14.94 32.64 14.93 32.79 14.96 32.93 15.03 33.02 15.10 33.12 15.23 33.39 15.99 33.70 16.74 34.08 17.51 34.53 18.27 35.04 19.02 35.60 19.72 36.22 20.40 36.92 21.04 37.64 21.61 38.39 22.12 39.13 22.56 39.90 22.93 40.65 23.25 41.30 23.47 41.44 23.54 41.56 23.64 41.65 23.77 41.70 23.92 41.71 24.08 41.68 24.23 41.63 24.34 41.53 24.46 41.41 24.56 40.65 24.83 39.90 25.14 39.13 25.52 38.37 25.96 37.62 26.48 36.92 27.03 36.24 27.66 35.60 28.36 35.02 29.08 34.51 29.83 34.08 30.57 33.70 31.34 33.39 32.09 33.17 32.74 33.10 32.88 32.99 33 32.86 33.09 32.72 33.14 32.56 33.15 32.41 33.12 32.30 33.07 32.18 32.97 32.08 32.85 31.81 32.09 31.50 31.34 31.12 30.57 30.67 29.81 30.16 29.06 29.60 28.36 28.96 27.66 28.28 27.03 27.56 26.46 26.81 25.95 26.07 25.52 25.30 25.14 24.55 24.83 23.86 24.59 23.72 24.51 23.61 24.40 23.52 24.23 23.49 24.04 23.52 23.85 23.61 23.67 23.72 23.56 23.82 23.50Z"/></svg><span>Home Desk</span></button></h1>`}
        </div>
        ${this.page||!this.admin?q`<div class="tabs"></div>`:q`<div class="tabs" role="tablist">
              ${He.map(e=>q`<button class="tab ${e.id===this.view?"active":""}" role="tab" title=${e.label} aria-label=${e.label}
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
                  <button role="menuitem" @click=${()=>this._choose("report")}><ha-icon icon="mdi:message-alert-outline"></ha-icon>Report a Problem or Idea</button>
                  <button role="menuitem" @click=${()=>{this._menuOpen=!1,this._fire("mark-all-read")}}><ha-icon icon="mdi:email-open-multiple-outline"></ha-icon>Mark All as Read</button>
                  ${this.admin?q`<button role="menuitem" @click=${()=>this._choose("labels")}><ha-icon icon="mdi:label-multiple-outline"></ha-icon>Manage Labels</button>
                        <button role="menuitem" @click=${()=>this._choose("categories")}><ha-icon icon="mdi:shape-outline"></ha-icon>Manage Categories</button>`:W}
                </div>`:W}
        </div>
      </div>
    `}};so.styles=[ue,r`
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
        margin-left: 4.7px; /* puts the roof's peak (44% across the mark) over the centre of the New Ticket button below */
        width: 26px;
        height: 26px;
        color: var(--st-brand, #03a9f4);
      }
      /* The mark and name take you Home. */
      .bar h1 .brand {
        display: flex;
        align-items: center;
        gap: 12px;
        height: auto;
        padding: 0;
        border-radius: var(--st-r-control);
        background: none;
        color: inherit;
        font: inherit;
        font-weight: inherit;
        cursor: pointer;
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
        /* On a phone only the mark shows (the name would crowd the tabs); it still takes you Home. */
        .bar h1:not(.crumb) span {
          display: none;
        }
        .bar h1:not(.crumb) {
          margin-left: 0;
        }
        .bar h1 .mark {
          margin-left: 0;
        }
        .bar .side:not(.wide) {
          flex: none;
          width: auto;
        }
        .tabs {
          flex: 1 1 0;
        }
        .tab {
          padding: 0 8px;
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
    `],e([de()],so.prototype,"page",void 0),e([de()],so.prototype,"view",void 0),e([de({attribute:!1})],so.prototype,"tickets",void 0),e([de({type:Boolean})],so.prototype,"narrow",void 0),e([de({type:Boolean})],so.prototype,"admin",void 0),e([he()],so.prototype,"_menuOpen",void 0),so=e([pe("st-app-header")],so);let oo=class extends re{constructor(){super(...arguments),this.q="",this.open=!1,this.tickets=[],this.categories=[],this.labels=[],this.selectable=!1,this.selecting=!1,this.checkedCount=0}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_change(e){return t=>this._fire("filters-change",{[e]:t.detail})}_merge(e){const t=e.currentTarget.getBoundingClientRect();this._fire("merge-selected",{rect:t})}render(){const e=this.filters,t=Fe(e);return this.checkedCount?q`<div class="toolbar selbar">
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
            ${"all"===e.view?q`<st-dropdown label="Show" .options=${Be} .value=${e.scope} @change=${this._change("scope")}></st-dropdown>`:W}
            <st-dropdown label="Category" placeholder="Category" .options=${s=this.categories,[{id:"",label:"Any Category"},{id:"none",label:"No Category"},...s.map(e=>({id:e.id,label:e.name}))]} .value=${e.category}
              @change=${this._change("category")}></st-dropdown>
            ${e.person?q`<st-dropdown label="Raised By" placeholder="Raised By" .options=${function(e,t){const i=[...new Set(e.map(e=>e.requester).filter(Boolean))].sort();return t&&!i.includes(t)&&i.push(t),[{id:"",label:"Anyone"},...i.map(e=>({id:e,label:$e(e)}))]}(this.tickets,e.person)} .value=${e.person}
                  @change=${this._change("person")}></st-dropdown>`:W}
            <st-dropdown label="Priority" placeholder="Priority" .options=${[{id:"",label:"Any Priority"},...Le.filter(e=>"low"!==e).map(e=>({id:e,label:xe[e]}))]} .value=${e.priority}
              @change=${this._change("priority")}></st-dropdown>
            <st-dropdown label="Label" placeholder="Label" .options=${i=this.labels,[{id:"",label:"Any Label"},...i.map(e=>({id:e.id,label:e.name}))]} .value=${e.label}
              @change=${this._change("label")}></st-dropdown>
          </div>`:W}
    `;var i,s}};oo.styles=[ue,r`
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
    `],e([de()],oo.prototype,"q",void 0),e([de({attribute:!1})],oo.prototype,"filters",void 0),e([de({type:Boolean})],oo.prototype,"open",void 0),e([de({attribute:!1})],oo.prototype,"tickets",void 0),e([de({attribute:!1})],oo.prototype,"categories",void 0),e([de({attribute:!1})],oo.prototype,"labels",void 0),e([de({type:Boolean})],oo.prototype,"selectable",void 0),e([de({type:Boolean})],oo.prototype,"selecting",void 0),e([de({type:Number})],oo.prototype,"checkedCount",void 0),oo=e([pe("st-list-toolbar")],oo);const no=[{id:"bug",name:"Problem",icon:"mdi:alert-circle-outline",hint:"Something isn't working"},{id:"enhancement",name:"Suggestion",icon:"mdi:lightbulb-on-outline",hint:"An idea or a request"}];let ro=class extends re{constructor(){super(...arguments),this._title="",this._details="",this._kind="bug",this._sending=!1,this._sent=!1,this._error="",this._photos=[],this._voice=null,this._recording=null,this._busy=!1,this._sentWith={photos:0,voice:!1},this._recorder=null}disconnectedCallback(){super.disconnectedCallback(),this._recorder?.cancel(),this._forget()}_forget(){this._photos.forEach(e=>URL.revokeObjectURL(e.url)),this._voice&&URL.revokeObjectURL(this._voice.url),this._photos=[],this._voice=null}async _addPhotos(e){const t=e.target,i=[...t.files??[]].slice(0,6-this._photos.length);if(t.value="",i.length){this._busy=!0;try{for(const e of i){const t=await Je(e);this._photos=[...this._photos,{blob:t,url:URL.createObjectURL(t),name:e.name}]}}finally{this._busy=!1}}}_removePhoto(e){URL.revokeObjectURL(e.url),this._photos=this._photos.filter(t=>t!==e)}_setVoice(e,t){this._voice&&URL.revokeObjectURL(this._voice.url),this._voice={blob:e,url:URL.createObjectURL(e),seconds:t}}async _record(){this._error="";try{this._recording=0,this._recorder=await async function(e,t){const i=await navigator.mediaDevices.getUserMedia({audio:{channelCount:1,echoCancellation:!0,noiseSuppression:!0}}),s=new AudioContext,o=s.createMediaStreamSource(i),n=s.createScriptProcessor(4096,1,1),r=[];let a=0,l=!1;n.onaudioprocess=i=>{if(l)return;const o=new Float32Array(i.inputBuffer.getChannelData(0));r.push(o),a+=o.length;const n=a/s.sampleRate;e(Math.floor(n)),n>=180&&t()},o.connect(n),n.connect(s.destination);const c=()=>{l=!0,n.disconnect(),o.disconnect(),i.getTracks().forEach(e=>e.stop()),s.close()};return{cancel:c,stop:async()=>{const e=s.sampleRate;c();const t=new Float32Array(a);let i=0;for(const e of r)t.set(e,i),i+=e.length;return{blob:et(t,e),seconds:Math.round(a/e)}}}}(e=>this._recording=e,()=>{this._stopRecording()})}catch{this._recording=null,this._error="The microphone isn't available. Check it is allowed for this page, or add a recording from your device."}}async _stopRecording(){const e=this._recorder;if(this._recorder=null,this._recording=null,!e)return;const{blob:t,seconds:i}=await e.stop();i>0&&this._setVoice(t,i)}async _addVoiceFile(e){const t=e.target,i=t.files?.[0];if(t.value="",i){this._busy=!0,this._error="";try{const{blob:e,seconds:t}=await async function(e){const t=new AudioContext;try{const i=await t.decodeAudioData(await e.arrayBuffer()),s=Math.ceil(i.duration*Ke),o=new OfflineAudioContext(1,s,Ke),n=o.createBufferSource();return n.buffer=i,n.connect(o.destination),n.start(),{blob:et((await o.startRendering()).getChannelData(0),Ke),seconds:Math.round(i.duration)}}finally{t.close()}}(i);this._setVoice(e,t)}catch{this._error="That recording couldn't be read. Try another, or type the message instead."}finally{this._busy=!1}}}async _send(){if(this._title.trim()&&!this._sending&&!this._busy&&null===this._recording){this._sending=!0,this._error="";try{const e=new FormData;e.append("kind",this._kind),e.append("title",this._title.trim()),e.append("details",this._details),this._photos.forEach((t,i)=>e.append("image",t.blob,`photo-${i+1}.${"image/jpeg"===t.blob.type?"jpg":"img"}`)),this._voice&&e.append("audio",this._voice.blob,"voice-message.wav");const t=await this.client.report(e);this._sentWith={photos:t.photos,voice:t.voice},this._sent=!0,this._title="",this._details="",this._kind="bug",this._forget()}catch(e){this._error=String(e&&"object"==typeof e&&"message"in e?e.message:e)}finally{this._sending=!1}}}render(){return this._sent?q`<div class="page thanks">
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
          ${no.map(e=>q`<button class="kind" role="radio" aria-checked=${this._kind===e.id?"true":"false"}
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
              <span class="time">Recording ${tt(this._recording)}</span>
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
    </div>`}};ro.styles=[ue,r`
      :host {
        display: block;
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        background: var(--st-bg);
      }
      /* The form is one Home Assistant card: lighter than the page, with its title inside. */
      .page {
        box-sizing: border-box;
        max-width: 560px;
        margin: 24px auto 48px;
        padding: 16px 16px 24px;
        border: 1px solid var(--ha-card-border-color, var(--st-outline));
        border-radius: var(--ha-card-border-radius, var(--ha-border-radius-xl, 12px));
        background: var(--ha-card-background, var(--card-background-color, var(--st-surface)));
      }
      @media (max-width: 600px) {
        .page {
          margin: 16px;
        }
      }
      h2 {
        margin: 0 0 4px;
        font-size: var(--ha-font-size-2xl, 24px);
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
    `],e([de({attribute:!1})],ro.prototype,"client",void 0),e([he()],ro.prototype,"_title",void 0),e([he()],ro.prototype,"_details",void 0),e([he()],ro.prototype,"_kind",void 0),e([he()],ro.prototype,"_sending",void 0),e([he()],ro.prototype,"_sent",void 0),e([he()],ro.prototype,"_error",void 0),e([he()],ro.prototype,"_photos",void 0),e([he()],ro.prototype,"_voice",void 0),e([he()],ro.prototype,"_recording",void 0),e([he()],ro.prototype,"_busy",void 0),e([he()],ro.prototype,"_sentWith",void 0),ro=e([pe("st-report-form")],ro);let ao=class extends re{constructor(){super(...arguments),this.name="",this.error="",this._name="",this._icon="",this._shake=!1}connectedCallback(){super.connectedCallback(),this._name=this.name}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_tryClose(){this._name.trim()||this._icon.trim()?(this._shake=!0,window.setTimeout(()=>this._shake=!1,400)):this._fire("close")}_create(){this._name.trim()&&this._fire("create",{name:this._name.trim(),icon:this._icon.trim()})}firstUpdated(){this.renderRoot.querySelector("#name")?.focus()}render(){return q`<div class="scrim" @click=${e=>e.target===e.currentTarget&&this._tryClose()}
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
    </div>`}};ao.styles=[ue,r`
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
    `],e([de()],ao.prototype,"name",void 0),e([de()],ao.prototype,"error",void 0),e([he()],ao.prototype,"_name",void 0),e([he()],ao.prototype,"_icon",void 0),e([he()],ao.prototype,"_shake",void 0),ao=e([pe("st-category-dialog")],ao);const lo=6048e5,co="history";let ho=class extends re{constructor(){super(...arguments),this.tickets=[],this.language=void 0,this.userName="",this.compact=!1}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_greeting(){const e=(new Date).getHours(),t=e<5?"Good evening":e<12?"Good morning":e<18?"Good afternoon":"Good evening";return this.userName?`${t}, ${this.userName}`:t}_tile(e,t,i,s={}){const o=void 0!==s.view;return q`<button class="tile ${o?"":"static"} ${i&&s.cls?s.cls:""}"
      @click=${()=>o&&this._fire("go-view",{view:s.view,priority:s.priority??""})}>
      <span class="top"><ha-icon .icon=${e}></ha-icon>${t}</span>
      <span class="n">${i}${s.sub?q`<span class="sub-n">${s.sub}</span>`:W}</span>
    </button>`}_row(e){const t=e.updated_by??e.requester,i=e.updated_by?"Updated":"Opened";return q`<button class="row ${e.unread?"unread":""}" @click=${()=>this._fire("open-ticket",e.id)}>
      <ha-icon class="ic" .icon=${be[e.status]} style="color: ${ve[e.status]}"></ha-icon>
      <div>
        <div class="title">${e.title}</div>
        <div class="sub">
          ${e.agent_state?q`<span class="work"><ha-icon icon="mdi:star-four-points"></ha-icon> ${Ie(`ai:${e.agent_state.agent}`)} working…</span>`:W}
          ${"urgent"===e.priority||"high"===e.priority?q`<span class="hot"><ha-icon .icon=${"urgent"===e.priority?"mdi:alert":"mdi:alert-outline"}></ha-icon> ${"urgent"===e.priority?"Urgent":"High"}</span>`:W}
          <span>${i} ${_e(e.updated_at,this.language)} by <ha-icon icon=${ke(t)}></ha-icon> ${$e(t)}</span>
        </div>
      </div>
    </button>`}_card(e,t,i){return q`<div class="card">
      <h2>${e}</h2>
      ${t.length?t.map(e=>this._row(e)):q`<div class="none">${i}</div>`}
    </div>`}render(){const e=this.tickets.filter(e=>!e.merged_into),t=t=>e.filter(He.find(e=>e.id===t).match).length,i=Date.now(),s=e.filter(He.find(e=>"active"===e.id).match).sort((e,t)=>t.created_at.localeCompare(e.created_at)),o=e.filter(e=>(e=>!("new"!==e.status&&"in_progress"!==e.status||e.merged_into||e.labels.includes(co)))(e)&&("urgent"===e.priority||"high"===e.priority)),n=e.filter(e=>e.unread),r=e.filter(e=>i-new Date(e.created_at).getTime()<lo&&!e.labels.includes(co)).length,a=e.filter(e=>("resolved"===e.status||"closed"===e.status)&&e.closed_at&&i-new Date(e.closed_at).getTime()<lo&&!e.labels.includes(co)).length;return q`<div class="page">
      <h1>${this._greeting()}</h1>
      <p class="lead">${s.length?`${s.length} new ${1===s.length?"ticket is":"tickets are"} waiting in your inbox.`:"Your inbox is empty."}</p>

      <div class="cols">
        ${this.compact?this._card("Inbox",s,"Nothing new. All clear."):W}
        <div class="card">
          <h2>Overview</h2>
          <div class="tiles">
            ${this._tile("mdi:inbox-outline","Inbox",t("active"),{view:"active",cls:"hot"})}
            ${this._tile("mdi:progress-wrench","In Progress",t("progress"),{view:"progress"})}
            ${this._tile("mdi:star-four-points-outline","Assigned to AI",t("agent"),{view:"agent"})}
            ${this._tile("mdi:alert-outline","Urgent / High",o.length,{view:"progress",cls:"warn"})}
            ${this._tile("mdi:email-open-outline","Unread",n.length,{view:"all",cls:"hot"})}
            ${this._tile("mdi:calendar-week","This week",r,{sub:`opened · ${a} resolved`})}
          </div>
        </div>
      </div>
    </div>`}};ho.styles=[ue,r`
      :host {
        display: block;
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        background: var(--st-bg);
      }
      .page {
        max-width: 1040px;
        margin: 0 auto;
        padding: 24px 16px 48px;
      }
      h1 {
        margin: 0 0 4px;
        font-size: var(--st-fs-heading);
        font-weight: var(--st-fw-heading);
      }
      .lead {
        margin: 0 0 20px;
        color: var(--st-fg-secondary);
        font-size: var(--st-fs-body);
      }
      /* Home Assistant's cards: the title inside, in large light type, on a box lighter than the page. */
      h2 {
        margin: 0;
        padding: 16px 16px 8px;
        font-size: var(--ha-font-size-2xl, 24px);
        font-weight: 400;
        line-height: 1.3;
      }
      .tiles {
        padding: 8px 16px 8px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
        gap: 12px;
      }
      .tile {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
        height: auto;
        padding: 14px 16px;
        border: none;
        border-radius: var(--ha-border-radius-lg, 12px);
        background: color-mix(in srgb, var(--st-fg) 7%, transparent);
        text-align: left;
        font-weight: 400;
      }
      .tile.static {
        cursor: default;
      }
      .tile .top {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--st-fg-secondary);
        font-size: var(--st-fs-body);
      }
      .tile .top ha-icon {
        --mdc-icon-size: 20px;
      }
      .tile .n {
        font-size: 28px;
        line-height: 1.2;
        font-weight: 500;
        color: var(--st-fg);
      }
      .tile .sub-n {
        display: block;
        font-size: var(--st-fs-caption);
        font-weight: 400;
        color: var(--st-fg-secondary);
      }
      .tile.hot .n,
      .tile.hot .top ha-icon {
        color: var(--st-accent);
      }
      .tile.warn .n,
      .tile.warn .top ha-icon {
        color: var(--st-warning);
      }
      .cols {
        display: grid;
        /* The inbox on the left (the wider side), the overview on the right; one column on a narrow screen. */
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr));
        gap: 24px;
        align-items: start;
      }
      .card {
        border: 1px solid var(--ha-card-border-color, var(--st-outline));
        border-radius: var(--ha-card-border-radius, var(--ha-border-radius-xl, 12px));
        background: var(--ha-card-background, var(--card-background-color, var(--st-surface)));
        overflow: hidden;
        padding-bottom: 8px;
      }
      .row {
        display: grid;
        grid-template-columns: 28px minmax(0, 1fr);
        gap: 12px;
        width: 100%;
        height: auto;
        padding: 10px 16px;
        border-radius: 0;
        border-bottom: 1px solid var(--st-divider);
        text-align: left;
        font-weight: 400;
        color: var(--st-fg);
        align-items: start;
      }
      .row:last-child {
        border-bottom: none;
      }
      .row:hover {
        background: var(--st-hover);
      }
      .row .ic {
        --mdc-icon-size: 22px;
        margin-top: 1px;
      }
      .row .title {
        font-size: var(--st-fs-row);
        font-weight: 500;
        overflow-wrap: anywhere;
      }
      .row.unread .title {
        font-weight: 700;
      }
      .row .sub {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0 10px;
        margin-top: 2px;
        font-size: var(--st-fs-caption);
        color: var(--st-fg-secondary);
      }
      .row .sub > span {
        display: inline-flex;
        align-items: center;
        gap: 3px;
      }
      .row .sub ha-icon {
        --mdc-icon-size: 14px;
        display: inline-flex;
        flex: none;
        align-self: center;
      }
      .row .sub .work {
        color: var(--st-accent);
        font-weight: 500;
      }
      .row .sub .work ha-icon {
        animation: pulse 1.4s ease-in-out infinite;
      }
      .row .sub .hot {
        color: var(--st-warning);
      }
      @keyframes pulse {
        50% {
          opacity: 0.3;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .row .sub .work ha-icon {
          animation: none;
        }
      }
      .none {
        padding: 16px;
        color: var(--st-fg-secondary);
        font-size: var(--st-fs-body);
      }
    `],e([de({attribute:!1})],ho.prototype,"tickets",void 0),e([de()],ho.prototype,"language",void 0),e([de()],ho.prototype,"userName",void 0),e([de({type:Boolean})],ho.prototype,"compact",void 0),ho=e([pe("st-home-page")],ho);const po="___add_new___",uo="___none___",go="(max-width: 870px)";let mo=class extends re{constructor(){super(...arguments),this.narrow=!1,this.route=void 0,this._tickets=[],this._matchIds=null,this._selected=null,this._selectedId=null,this._view="active",this._q="",this._priority="",this._label="",this._category="",this._person="",this._filtersOpen=!1,this._compact=window.matchMedia(go).matches,this._scope="",this._labelList=[],this._categoryList=[],this._settings=null,this._merging=null,this._mergeConfirm=null,this._confirmCost=null,this._checked=new Set,this._ticking=!1,this._lastChecked=null,this._seenAt="",this._pickingLabel=null,this._picking=null,this._newCategory=null,this._removing=null,this._page="home",this._creating=!1,this._error="",this._onVisible=()=>{document.hidden||this._refresh()},this._mq=window.matchMedia(go),this._onCompact=()=>{this._compact=this._mq.matches},this._pickerAdditional=e=>{const t=this._categoryList.some(t=>t.name.toLowerCase()===e.toLowerCase());return e&&!t?[{id:po+e,primary:`Add New Category '${e}'`,icon:"mdi:plus"}]:[{id:po,primary:"Add New Category…",icon:"mdi:plus"}]},this._labelPickerAdditional=e=>{const t=this._labelList.some(t=>t.name.toLowerCase()===e.toLowerCase());return e&&!t?[{id:po+e,primary:`Add New Label '${e}'`,icon:"mdi:plus"}]:[]}}get _admin(){return this.hass?.user?.is_admin??!1}recheckTheme(){const e=document.createElement("span");e.style.color="var(--card-background-color)",this.renderRoot.appendChild(e);const t=/rgba?\((\d+)[ ,]+(\d+)[ ,]+(\d+)/.exec(getComputedStyle(e).color);e.remove(),t&&this.toggleAttribute("light",(.299*+t[1]+.587*+t[2]+.114*+t[3])/255>.5)}willUpdate(e){if(e.has("hass")&&this.hass){const e=this.hass.themes;e===this._themeKey&&this.hasUpdated||(this._themeKey=e,this.updateComplete.then(()=>this.recheckTheme()))}e.has("hass")&&this.hass&&!this._client&&(this._client=new me(this.hass),this._restoreState(),this._refresh(),this._syncFromRoute(),this._subscribe()),e.has("route")&&this._client&&this._syncFromRoute()}get _prefix(){return this.route?.prefix??"/home-desk"}_navigate(e){if(location.pathname!==e)try{history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}catch{}}async _syncFromRoute(){const e=Number((this.route?.path??"").replace(/^\//,"")),t=Number.isInteger(e)&&e>0?e:null;t!==this._selectedId&&(null===t?(this._selectedId=null,this._selected=null):await this._open(t,!1))}_subscribe(){this._client&&(this._client.subscribe(()=>this._scheduleRefresh()).then(e=>{this._unsub=e}).catch(e=>{console.warn("[home-desk] live updates unavailable, polling instead:",e),this._unsub=void 0}),window.clearInterval(this._pollTimer),this._pollTimer=window.setInterval(()=>{document.hidden||this._refresh()},2e4))}connectedCallback(){super.connectedCallback(),this._mq.addEventListener("change",this._onCompact),document.addEventListener("visibilitychange",this._onVisible),this._client&&!this._unsub&&this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._mq.removeEventListener("change",this._onCompact),document.removeEventListener("visibilitychange",this._onVisible),window.clearInterval(this._pollTimer),this._unsub?.(),this._unsub=void 0,window.clearTimeout(this._searchTimer),window.clearTimeout(this._refreshTimer)}_restoreState(){try{const e=localStorage.getItem("home-desk-view");e&&He.some(t=>t.id===e)&&(this._view=e)}catch{}}_setView(e){this._view=e,"all"===e&&(this._filtersOpen=!0);try{localStorage.setItem("home-desk-view",e)}catch{}}_scheduleRefresh(){window.clearTimeout(this._refreshTimer),this._refreshTimer=window.setTimeout(()=>{this._refresh()},300)}async _refresh(){if(this._client&&this._admin)try{[this._tickets,this._labelList,this._categoryList]=await Promise.all([this._client.list(),this._client.labels(),this._client.categories()]),this._admin&&(this._settings=await this._client.settings()),this._q.trim()&&await this._runSearch(),null!==this._selectedId&&await this._loadSelected(this._selectedId),this._error=""}catch(e){this._error=`Could not load tickets: ${this._message(e)}`}}async _loadSelected(e){if(this._client)try{const t=await this._client.get(e);this._selected?.id===e&&this._seenAt||(this._seenAt=t.seen_at??""),this._selected=t,this._tickets.find(t=>t.id===e)?.unread&&this._markRead([e])}catch(e){this._selected=null,this._selectedId=null,this._navigate(this._prefix),this._error=this._message(e)}}get _canAsk(){return!!this._settings?.agent?.startsWith("ai_task.")}get _agentLabel(){const e=this._settings?.agent;return`the AI (${(e?String(this.hass.states?.[e]?.attributes.friendly_name??""):"").replace(/\s*(AI Task|conversation|agent)\s*$/i,"").trim()||"Claude"})`}_askCost(e,t){this._confirmCost={text:e,run:t}}_askNow(e){const t=this._selected;if(!t||!this._client)return;const i=this._agentLabel;this._askCost(`Review ticket #${t.id} with ${i}? The ticket${e.body?", with your comment,":""} is sent to the AI chosen in Settings through Home Assistant, which uses your AI plan and may cost money. It says what it thinks is going on and what to try, and may propose changes for you to apply. It can't change anything itself, and Assign to AI Agent is left as it is. You can stop it from the ticket while it works.`,async()=>{const i=this._client;e.body&&await i.comment(t.id,e.body,!1),e.done(),await this._act(e=>e.runAgent(t.id))})}async _markRead(e){if(this._client){this._tickets=this._tickets.map(t=>!e||e.includes(t.id)?{...t,unread:!1}:t);try{await this._client.markRead(e)}catch{}}}async _runSearch(){if(!this._client)return;const e=this._q.trim();this._matchIds=e?new Set((await this._client.list(e)).map(e=>e.id)):null}_message(e){return String(e&&"object"==typeof e&&"message"in e?e.message:e)}async _act(e){if(this._client)try{this._selected=await e(this._client),this._error="",this._refresh()}catch(e){this._error=this._message(e)}}_search(e){this._q=e,window.clearTimeout(this._searchTimer),this._searchTimer=window.setTimeout(()=>{this._runSearch()},250)}async _open(e,t=!0){this._selectedId!==e&&(this._seenAt=""),"home"===this._page&&this._setView("active"),this._page="",this._selectedId=e,t&&this._navigate(`${this._prefix}/${e}`),await this._loadSelected(e)}get _pickerItems(){const e=this._picking?.ticket.category;return[...e?[{id:uo,primary:"No Category",icon:"mdi:shape-outline"}]:[],...this._categoryList.map(e=>({id:e.id,primary:e.name,icon:e.icon||"mdi:tag-outline"}))]}get _mergeItems(){const e=this._merging?.ids;if(e)return this._tickets.filter(t=>e.includes(t.id)).sort((e,t)=>e.id-t.id).map((e,t)=>({id:String(e.id),primary:`#${e.id} ${e.title}`,secondary:`${0===t?"Oldest · ":""}${fe[e.status]} · ${$e(e.requester)}`,icon:"mdi:ticket-outline"}));const t=this._selectedId,i=e=>"resolved"!==e.status&&"closed"!==e.status;return this._tickets.filter(e=>e.id!==t&&!e.merged_into).sort((e,t)=>Number(i(t))-Number(i(e))||t.updated_at.localeCompare(e.updated_at)).map(e=>({id:String(e.id),primary:`#${e.id} ${e.title}`,secondary:`${fe[e.status]} · ${$e(e.requester)}`,icon:"mdi:ticket-outline"}))}_mergePicked(e){const t=this._merging?.ids;this._merging=null;const i=this._tickets.find(t=>t.id===Number(e)),s=t?this._tickets.filter(i=>t.includes(i.id)&&i.id!==Number(e)):this._tickets.filter(e=>e.id===this._selectedId);s.length&&i&&(this._mergeConfirm={from:s,into:i})}_toggleCheck({id:e,range:t}){const i=new Set(this._checked),s=this._filtered.map(e=>e.id);if(t&&null!==this._lastChecked&&s.includes(this._lastChecked)){const[t,o]=[s.indexOf(this._lastChecked),s.indexOf(e)].sort((e,t)=>e-t);for(const e of s.slice(t,o+1))i.add(e)}else i.has(e)?i.delete(e):i.add(e);this._lastChecked=e,this._checked=i,i.size&&(this._ticking=!0)}_clearChecked(){this._checked=new Set,this._ticking=!1,this._lastChecked=null}async _doMerge(){const e=this._mergeConfirm;if(this._mergeConfirm=null,e&&this._client)try{await this._client.merge(e.into.id,e.from.map(e=>e.id)),this._clearChecked(),this._error="",await this._refresh(),await this._open(e.into.id)}catch(e){this._error=this._message(e)}}get _labelPickerItems(){const e=new Set(this._pickingLabel?.ticket.labels??[]);return this._labelList.filter(t=>!e.has(t.id)).map(e=>({id:e.id,primary:e.name,icon:e.icon||"mdi:label-outline",...e.description?{secondary:e.description}:{}}))}async _labelPicked({id:e}){const t=this._pickingLabel;if(this._pickingLabel=null,!t||!this._client)return;const i=e.startsWith(po)?e.slice(13):e;try{await this._client.update(t.ticket.id,{labels:[...t.ticket.labels,i]}),this._error="",this._refresh()}catch(e){this._error=this._message(e)}}async _picked({id:e}){const t=this._picking;this._picking=null,t&&(e.startsWith(po)?this._newCategory={ticket:t.ticket,name:e.slice(13),error:""}:await this._setCategory(t.ticket,e===uo?null:e))}async _setCategory(e,t){if(this._client)try{await this._client.update(e.id,{category:t}),this._error="",this._refresh()}catch(e){this._error=this._message(e)}}async _createCategory(e){const t=this._newCategory;if(t&&this._client)try{const i=await this._client.createCategory(e);this._newCategory=null,await this._setCategory(t.ticket,i.id)}catch(e){this._newCategory={...t,error:this._message(e)}}}async _removeLabel(){const e=this._removing;if(this._removing=null,e&&this._client)try{await this._client.update(e.ticket.id,{labels:e.ticket.labels.filter(t=>t!==e.label.id)}),this._error="",this._refresh()}catch(e){this._error=this._message(e)}}_close(){this._selectedId=null,this._selected=null,this._navigate(this._prefix)}async _create(e){if(this._client)try{const t=await this._client.create(e);this._creating=!1,this._setView("active"),this._selected=t,this._open(t.id),this._refresh()}catch(e){this._error=this._message(e)}}_applyFilters(e){void 0!==e.scope&&(this._scope=e.scope),void 0!==e.category&&(this._category=e.category),void 0!==e.person&&(this._person=e.person),void 0!==e.priority&&(this._priority=e.priority),void 0!==e.label&&(this._label=e.label)}get _filters(){return{view:"home"===this._page?"active":this._view,scope:this._scope,category:this._category,priority:this._priority,label:this._label,person:this._person}}get _walk(){const e=this._filtered;return null===this._selectedId||e.some(e=>e.id===this._selectedId)?e:qe(this._tickets,{...this._filters,view:"all",scope:"",category:"",priority:"",label:"",person:""},null)}get _navPos(){const e=this._walk,t=e.findIndex(e=>e.id===this._selectedId);return t<0?null:{index:t,total:e.length}}_step(e){const t=this._navPos,i=t?this._walk[t.index+e]:void 0;i&&this._open(i.id)}get _filtered(){return qe(this._tickets,this._filters,this._matchIds)}get _filterCount(){return Fe(this._filters)}get _agentName(){return"ai:AI"}get _people(){const e=new Map;for(const[t,i]of Object.entries(this.hass?.states??{})){if(!t.startsWith("person."))continue;const s=String(i.attributes.friendly_name??t.slice(7)),o=i.attributes.entity_picture;e.set(s.toLowerCase(),{name:s,..."string"==typeof o&&o?{picture:o}:{}})}return e}get _labelMap(){return new Map(this._labelList.map(e=>[e.id,e]))}_homeTemplate(e){return q`<st-home-page .tickets=${this._tickets} .language=${this.hass.language} .userName=${this.hass.user?.name??""} .compact=${e}
      @open-ticket=${e=>{this._open(e.detail)}}
      @go-view=${e=>{this._page="",this._close(),this._setView(e.detail.view),this._priority=e.detail.priority}}></st-home-page>`}render(){if(!this.hass)return W;const e=this.hass.language,t=null!==this._selectedId;return q`
      <st-app-header .page=${"home"===this._page?"":this._page} .view=${"home"===this._page?"":this._view} .tickets=${this._tickets} .narrow=${this.narrow} .admin=${this._admin}
        @page-change=${e=>this._page=e.detail}
        @view-change=${e=>{this._page="",this._setView(e.detail)}}
        @go-home=${()=>{this._page="home",this._close()}}
        @refresh=${()=>{this._refresh()}}
        @mark-all-read=${()=>{this._markRead()}}></st-app-header>
      ${this._error?q`<div class="banner">${this._error}</div>`:W}
      ${!this._admin&&this._client?q`<st-report-form .client=${this._client}></st-report-form>`:"home"===this._page&&this._client&&this._compact?this._homeTemplate(!0):"report"===this._page&&this._client?q`<st-report-form .client=${this._client}></st-report-form>`:"labels"===this._page&&this._client?q`<st-label-manager .client=${this._client} .labels=${this._labelList}
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
        ${"home"===this._page?this._homeTemplate(!1):q`
        <st-ticket-detail
          .ticket=${this._selected}
          .client=${this._client}
          .isAdmin=${this._admin}
          .narrow=${this._compact}
          .language=${e}
          .navPos=${this._navPos}
          @nav-ticket=${e=>this._step(e.detail)}
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
          .hass=${this.hass}
          .canAsk=${this._canAsk}
          @proposal=${e=>this._selected&&void this._act(t=>t.proposal(this._selected.id,e.detail.eventId,e.detail.action))}
          @ask-ai=${e=>this._askNow(e.detail)}
          @patch-ticket=${e=>this._selected&&void this._act(t=>t.update(this._selected.id,e.detail))}
          @comment=${e=>this._selected&&void this._act(t=>t.comment(this._selected.id,e.detail.body,e.detail.internal))}
          @close-ticket=${e=>this._selected&&void this._act(t=>t.close(this._selected.id,e.detail.resolution,e.detail.status))}
        ></st-ticket-detail>`}
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
      ${this._confirmCost?q`<st-confirm-dialog heading="Use your AI plan?" confirmLabel="Yes, go ahead" body=${this._confirmCost.text}
            @cancel=${()=>this._confirmCost=null}
            @confirm=${()=>{const e=this._confirmCost.run;this._confirmCost=null,e()}}></st-confirm-dialog>`:W}
      ${this._removing?q`<st-confirm-dialog heading="Remove Label?" confirmLabel="Remove" danger
            body="Are you sure you want to remove label ${this._removing.label.name} from this ticket?"
            @cancel=${()=>this._removing=null}
            @confirm=${()=>{this._removeLabel()}}></st-confirm-dialog>`:W}
      ${this._creating?q`<st-new-ticket-dialog .isAdmin=${this._admin} .hass=${this.hass} .categories=${this._categoryList}
            @close=${()=>this._creating=!1}
            @create=${e=>{this._create(e.detail)}}></st-new-ticket-dialog>`:W}
    `}};mo.styles=[ue,ge],e([de({attribute:!1})],mo.prototype,"hass",void 0),e([de({type:Boolean})],mo.prototype,"narrow",void 0),e([de({attribute:!1})],mo.prototype,"route",void 0),e([he()],mo.prototype,"_tickets",void 0),e([he()],mo.prototype,"_matchIds",void 0),e([he()],mo.prototype,"_selected",void 0),e([he()],mo.prototype,"_selectedId",void 0),e([he()],mo.prototype,"_view",void 0),e([he()],mo.prototype,"_q",void 0),e([he()],mo.prototype,"_priority",void 0),e([he()],mo.prototype,"_label",void 0),e([he()],mo.prototype,"_category",void 0),e([he()],mo.prototype,"_person",void 0),e([he()],mo.prototype,"_filtersOpen",void 0),e([he()],mo.prototype,"_compact",void 0),e([he()],mo.prototype,"_scope",void 0),e([he()],mo.prototype,"_labelList",void 0),e([he()],mo.prototype,"_categoryList",void 0),e([he()],mo.prototype,"_settings",void 0),e([he()],mo.prototype,"_merging",void 0),e([he()],mo.prototype,"_mergeConfirm",void 0),e([he()],mo.prototype,"_confirmCost",void 0),e([he()],mo.prototype,"_checked",void 0),e([he()],mo.prototype,"_ticking",void 0),e([he()],mo.prototype,"_seenAt",void 0),e([he()],mo.prototype,"_pickingLabel",void 0),e([he()],mo.prototype,"_picking",void 0),e([he()],mo.prototype,"_newCategory",void 0),e([he()],mo.prototype,"_removing",void 0),e([he()],mo.prototype,"_page",void 0),e([he()],mo.prototype,"_creating",void 0),e([he()],mo.prototype,"_error",void 0),mo=e([pe("home-desk-panel")],mo)}();
