/*! home-desk-panel v0.1.0 | MIT */
!function(){"use strict";function t(t,e,i,s){var o,n=arguments.length,a=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,s)},r=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,m=g.trustedTypes,f=m?m.emptyScript:"",b=g.reactiveElementPolyfillSupport,v=(t,e)=>t,x={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!l(t,e),_={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=_){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);o?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??_}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:x).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:x;this._$Em=s;const n=o.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const n=this.constructor;if(!1===s&&(o=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??y)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[v("elementProperties")]=new Map,k[v("finalized")]=new Map,b?.({ReactiveElement:k}),(g.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,$=t=>t,A=w.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+T,E=`<${z}>`,R=document,I=()=>R.createComment(""),L=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,P="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,D=/>/g,U=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,j=/"/g,B=/^(?:script|style|textarea|title)$/i,q=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),F=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),G=new WeakMap,Y=R.createTreeWalker(R,129);function Z(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}let V=class t{constructor({strings:e,_$litType$:i},s){let o;this.parts=[];let n=0,a=0;const r=e.length-1,l=this.parts,[c,d]=((t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":3===e?"<math>":"",a=M;for(let e=0;e<i;e++){const i=t[e];let r,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===M?"!--"===l[1]?a=O:void 0!==l[1]?a=D:void 0!==l[2]?(B.test(l[2])&&(o=RegExp("</"+l[2],"g")),a=U):void 0!==l[3]&&(a=U):a===U?">"===l[0]?(a=o??M,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?U:'"'===l[3]?j:H):a===j||a===H?a=U:a===O||a===D?a=M:(a=U,o=void 0);const h=a===U&&t[e+1].startsWith("/>")?" ":"";n+=a===M?i+E:c>=0?(s.push(r),i.slice(0,c)+C+i.slice(c)+T+h):i+T+(-2===c?e:h)}return[Z(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]})(e,i);if(this.el=t.createElement(c,s),Y.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=Y.nextNode())&&l.length<r;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(C)){const e=d[a++],i=o.getAttribute(t).split(T),s=/([.?@])?(.*)/.exec(e);l.push({type:1,index:n,name:s[2],strings:i,ctor:"."===s[1]?tt:"?"===s[1]?et:"@"===s[1]?it:J}),o.removeAttribute(t)}else t.startsWith(T)&&(l.push({type:6,index:n}),o.removeAttribute(t));if(B.test(o.tagName)){const t=o.textContent.split(T),e=t.length-1;if(e>0){o.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],I()),Y.nextNode(),l.push({type:2,index:++n});o.append(t[e],I())}}}else if(8===o.nodeType)if(o.data===z)l.push({type:2,index:n});else{let t=-1;for(;-1!==(t=o.data.indexOf(T,t+1));)l.push({type:7,index:n}),t+=T.length-1}n++}}static createElement(t,e){const i=R.createElement("template");return i.innerHTML=t,i}};function X(t,e,i=t,s){if(e===F)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=L(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=X(t,o._$AS(t,e.values),o,s)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??R).importNode(e,!0);Y.currentNode=s;let o=Y.nextNode(),n=0,a=0,r=i[0];for(;void 0!==r;){if(n===r.index){let e;2===r.type?e=new Q(o,o.nextSibling,this,t):1===r.type?e=new r.ctor(o,r.name,r.strings,this,t):6===r.type&&(e=new st(o,this,t)),this._$AV.push(e),r=i[++a]}n!==r?.index&&(o=Y.nextNode(),n++)}return Y.currentNode=R,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}let Q=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),L(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&L(this._$AH)?this._$AA.nextSibling.data=t:this.T(R.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=V.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new K(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new V(t)),e}k(e){N(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,o=0;for(const n of e)o===i.length?i.push(s=new t(this.O(I()),this.O(I()),this,this.options)):s=i[o],s._$AI(n),o++;o<i.length&&(this._$AR(s&&s._$AB.nextSibling,o),i.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=$(t).nextSibling;$(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}};class J{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=X(this,t,e,0),n=!L(t)||t!==this._$AH&&t!==F,n&&(this._$AH=t);else{const s=t;let a,r;for(t=o[0],a=0;a<o.length-1;a++)r=X(this,s[i+a],e,a),r===F&&(r=this._$AH[a]),n||=!L(r)||r!==this._$AH[a],r===W?t=W:t!==W&&(t+=(r??"")+o[a+1]),this._$AH[a]=r}n&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}let tt=class extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}},et=class extends J{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}},it=class extends J{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??W)===F)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}};class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const ot=w.litHtmlPolyfillSupport;ot?.(V,Q),(w.litHtmlVersions??=[]).push("3.3.3");const nt=globalThis;let at=class extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new Q(e.insertBefore(I(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}};at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const rt=nt.litElementPolyfillSupport;rt?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");const lt={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:y},ct=(t=lt,e,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function dt(t){return(e,i)=>"object"==typeof i?ct(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ht(t){return dt({...t,state:!0,attribute:!1})}const pt=t=>(e,i)=>{const s=()=>{customElements.get(t)?console.info(`home-desk: <${t}> already defined — reload the page to pick up the updated panel.`):customElements.define(t,e)};void 0!==i?i.addInitializer(s):s()},ut=a`
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
`,gt=a`
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
`;class mt{constructor(t){this.hass=t}send(t,e={}){return this.hass.connection.sendMessagePromise({type:`home_desk/${t}`,...e})}async list(t){return(await this.send("list",{status:"all",...t?{q:t}:{}})).tickets}async categories(){try{return(await this.send("categories")).categories}catch{return[]}}createCategory(t){return this.send("category_create",t)}updateCategory(t,e){return this.send("category_update",{category_id:t,...e})}deleteCategory(t){return this.send("category_delete",{category_id:t})}async settings(){try{return await this.send("settings")}catch{return{auto_close:"7d",agent:"",repairs:!0,stt:"",transcribe:!0,agent_states:!0,agent_config:!0,agent_related:!0,agent_daily_cap:30,agent_prompt:"",agent_prompt_default:"",agent_prompt_fixed:"",notify:{targets:[],new_ticket:!0,comment:!0,resolved:!1}}}}saveSettings(t){return this.send("settings_save",t)}async labels(){return(await this.send("labels")).labels}createLabel(t){return this.send("label_create",t)}updateLabel(t,e){return this.send("label_update",{label_id:t,...e})}deleteLabel(t){return this.send("label_delete",{label_id:t})}get(t){return this.send("get",{ticket_id:t})}create(t){return this.send("create",{...t})}update(t,e){return this.send("update",{ticket_id:t,...e})}runAgent(t){return this.send("agent_run",{ticket_id:t})}async suggest(t,e=!1){return(await this.send("suggest",{ticket_id:t,...e?{ai:!0}:{}})).suggestions}proposal(t,e,i){return this.send("proposal",{ticket_id:t,event_id:e,do:i})}stopAgent(t){return this.send("agent_stop",{ticket_id:t})}testAgent(){return this.send("agent_test")}markRead(t){return this.send("mark_read",t?{ticket_ids:t}:{})}merge(t,e){return this.send("merge",{ticket_id:t,merge_ids:e})}comment(t,e,i){return this.send("comment",{ticket_id:t,body:e,internal:i})}close(t,e,i){return this.send("close",{ticket_id:t,resolution:e,status:i})}async report(t){if(!this.hass.fetchWithAuth)throw new Error("This page can't send files");const e=await this.hass.fetchWithAuth("/api/home_desk/report",{method:"POST",body:t}),i=await e.json().catch(()=>({}));if(!e.ok)throw new Error(i.message||`The report couldn't be sent (${e.status})`);return i}async attachmentUrl(t,e){const i=`/api/home_desk/attachment/${t}/${e}`;if(!this.hass.callWS)return i;const{path:s}=await this.hass.callWS({type:"auth/sign_path",path:i,expires:3600});return s}subscribe(t){return this.hass.connection.subscribeEvents(t,"home_desk_event")}}const ft={new:"New",open:"In Progress",in_progress:"In Progress",resolved:"Resolved",closed:"Closed"},bt={new:"mdi:circle-outline",open:"mdi:circle-slice-4",in_progress:"mdi:circle-slice-4",resolved:"mdi:check-circle-outline",closed:"mdi:close-circle-outline"},vt={new:"var(--success-color, #43a047)",open:"var(--primary-color)",in_progress:"var(--primary-color)",resolved:"var(--purple-color, #926bc7)",closed:"var(--secondary-text-color)"},xt={low:"Low",normal:"Normal",high:"High",urgent:"Urgent"},yt=[["year",31536e3],["month",2592e3],["day",86400],["hour",3600],["minute",60]];function _t(t,e){const i=(new Date(t).getTime()-Date.now())/1e3,s=new Intl.RelativeTimeFormat(e,{numeric:"auto"});for(const[t,e]of yt)if(Math.abs(i)>=e)return s.format(Math.round(i/e),t);return s.format(0,"second")}function kt(t){const e=t.toLowerCase();return e.startsWith("ai:")||e.includes("claude")}function wt(t){if(kt(t))return"mdi:star-four-points-outline";const e=t.toLowerCase();return"ha"===e||"home assistant"===e?"mdi:home-assistant":"mdi:account-outline"}function $t(t){const e=t.replace(/^ai:/i,"");return e===e.toLowerCase()?e.charAt(0).toUpperCase()+e.slice(1):e}const At={primary:"#03a9f4",accent:"#ff9800",red:"#f44336",pink:"#e91e63",purple:"#926bc7","deep-purple":"#6e41ab",indigo:"#3f51b5",blue:"#2196f3","light-blue":"#03a9f4",cyan:"#00bcd4",teal:"#009688",green:"#4caf50","light-green":"#8bc34a",lime:"#cddc39",yellow:"#ffeb3b",amber:"#ffc107",orange:"#ff9800","deep-orange":"#ff6f22",brown:"#795548","light-grey":"#bdbdbd",grey:"#9e9e9e","dark-grey":"#606060","blue-grey":"#607d8b",black:"#000000",white:"#ffffff"};function St(t){return"primary"===t?"var(--primary-color, #03a9f4)":"accent"===t?"var(--accent-color, #ff9800)":`var(--${t}-color, ${At[t]??"#9e9e9e"})`}function Ct(t){const e=t.trim();let i=/^#([0-9a-f]{3})$/i.exec(e);return i?[...i[1]].map(t=>parseInt(t+t,16)):(i=/^#([0-9a-f]{6})/i.exec(e),i?[0,2,4].map(t=>parseInt(i[1].slice(t,t+2),16)):(i=/^rgba?\(\s*(\d+)[ ,]+(\d+)[ ,]+(\d+)/i.exec(e),i?[Number(i[1]),Number(i[2]),Number(i[3])]:null))}function Tt(t){const e=t.replace(/-/g," ");return e.charAt(0).toUpperCase()+e.slice(1)}function zt(t,e){return t.get(e)??{id:e,name:e,color:"grey",description:"",icon:"",builtin:!1,count:0}}function Et(t){return $t(t)}const Rt={created:"opened this",comment:"commented",note:"added a note",status:"changed the status",priority:"changed the priority",assignee:"changed the assignee",field:"edited it",link:"linked a ticket",merge:"merged a ticket",attachment:"added a file"},It=t=>`AI Review (${$t(t)})`,Lt=["low","normal","high","urgent"],Nt=["primary","accent","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","light-grey","grey","dark-grey","blue-grey","black","white"],Pt=["new","open","in_progress"],Mt="blocked",Ot=t=>t.labels.includes("history"),Dt=t=>Pt.includes(t.status)&&!Ot(t),Ut=t=>t.labels.includes("enhancement"),Ht=[{id:"active",icon:"mdi:inbox-outline",label:"Inbox",count:!0,match:t=>"new"===t.status&&!Ot(t)&&!Ut(t)},{id:"progress",icon:"mdi:progress-wrench",label:"In Progress",count:!0,match:t=>("in_progress"===t.status||"open"===t.status)&&!Ot(t)},{id:"agent",icon:"mdi:star-four-points-outline",label:"Assigned to AI",count:!0,match:t=>Dt(t)&&kt(t.assignee??"")},{id:"enhancements",icon:"mdi:lightbulb-outline",label:"Enhancements",count:!0,match:t=>Dt(t)&&Ut(t)},{id:"all",icon:"mdi:format-list-bulleted",label:"All",match:()=>!0}],jt=[{id:"",label:"Everything",match:t=>!Ot(t)},{id:"active",label:"Open",match:Dt},{id:"closed",label:"Closed",match:t=>("resolved"===t.status||"closed"===t.status)&&!Ot(t)},{id:"history",label:"History",match:Ot}],Bt=jt.map(({id:t,label:e})=>({id:t,label:e}));function qt(t,e,i){const s=Ht.find(t=>t.id===e.view)??Ht[0];return t.filter(t=>s.match(t)&&("all"!==s.id||!e.scope||jt.find(t=>t.id===e.scope).match(t))&&(!i||i.has(t.id))&&(!e.priority||t.priority===e.priority)&&(!e.label||t.labels.includes(e.label))&&(!e.person||t.requester===e.person)&&(!e.category||("none"===e.category?!t.category:t.category===e.category)))}function Ft(t){return[t.category,t.priority,t.label,t.person,"all"===t.view?t.scope:""].filter(Boolean).length}let Wt=class extends at{constructor(){super(...arguments),this.categoryMap=new Map,this.labelMap=new Map,this.isAdmin=!1,this.maxBadges=4,this.coloured=!1,this.expanded=!1,this.show="all"}_pickCategory(t,e){t.stopPropagation(),t.preventDefault(),this.dispatchEvent(new CustomEvent("pick-category",{detail:{ticket:e,rect:t.currentTarget.getBoundingClientRect()},bubbles:!0,composed:!0}))}_category(t){const e=t.category?this.categoryMap.get(t.category):void 0,i=e=>this._pickCategory(e,t),s=e=>("Enter"===e.key||" "===e.key)&&this._pickCategory(e,t);if(!e&&!this.isAdmin)return W;const o=e?q`<ha-icon .icon=${e.icon||"mdi:tag-outline"}></ha-icon>${e.name}`:q`<ha-icon icon="mdi:plus"></ha-icon>Add Category`;return this.isAdmin?q`<span class="category clickable ${e?"":"none"}" role="button" tabindex="0" aria-haspopup="listbox"
          aria-label=${e?`Category: ${e.name}. Change`:"Add Category"} @click=${i} @keydown=${s}>${o}</span>`:q`<span class="category">${o}</span>`}_askRemove(t,e,i){t.stopPropagation(),t.preventDefault(),this.dispatchEvent(new CustomEvent("remove-label",{detail:{ticket:e,label:i},bubbles:!0,composed:!0}))}_badges(t){const e=t.labels.filter(t=>"home-assistant"!==t).map(t=>zt(this.labelMap,t));return q`${e.slice(0,this.maxBadges).map(e=>q`<span class="badge" role=${this.isAdmin?"group":"img"} aria-label=${e.name}
        style="--label-color: ${St(e.color)}; --label-fg: ${function(t){let e=null;try{const i="primary"===t?"--primary-color":"accent"===t?"--accent-color":`--${t}-color`;e=Ct(getComputedStyle(document.documentElement).getPropertyValue(i))}catch{}e??(e=Ct(At[t]??"#9e9e9e")??[158,158,158]);const i=(([t,e,i])=>{const[s,o,n]=[t,e,i].map(t=>{const e=t/255;return e<=.03928?e/12.92:((e+.055)/1.055)**2.4});return.2126*s+.7152*o+.0722*n})(e);return(i+.05)/.05>=1.05/(i+.05)?"#000000":"#ffffff"}(e.color)}"><ha-icon .icon=${e.icon||"mdi:label-outline"}></ha-icon><span class="name">${e.name}</span>${this.isAdmin?q`<span class="x" role="button" tabindex="0" aria-label="Remove ${e.name} from this ticket"
              @click=${i=>this._askRemove(i,t,e)}
              @keydown=${i=>("Enter"===i.key||" "===i.key)&&this._askRemove(i,t,e)}><ha-icon icon="mdi:close"></ha-icon></span>`:W}</span>`)}${e.length>this.maxBadges?q`<span class="more-labels">+${e.length-this.maxBadges}</span>`:W}`}render(){const t=this.ticket;return q`${"labels"!==this.show?this._category(t):W}${"category"!==this.show?q`${this._badges(t)}<slot></slot>`:W}`}};Wt.styles=[ut,a`
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
    `],t([dt({attribute:!1})],Wt.prototype,"ticket",void 0),t([dt({attribute:!1})],Wt.prototype,"categoryMap",void 0),t([dt({attribute:!1})],Wt.prototype,"labelMap",void 0),t([dt({type:Boolean})],Wt.prototype,"isAdmin",void 0),t([dt({type:Number})],Wt.prototype,"maxBadges",void 0),t([dt({type:Boolean,reflect:!0})],Wt.prototype,"coloured",void 0),t([dt({type:Boolean,reflect:!0})],Wt.prototype,"expanded",void 0),t([dt()],Wt.prototype,"show",void 0),Wt=t([pt("st-ticket-tags")],Wt);let Gt=class extends at{constructor(){super(...arguments),this.tickets=[],this.selectedId=null,this.language=void 0,this.isAdmin=!1,this.categoryMap=new Map,this.labelMap=new Map,this.checked=new Set,this.ticking=!1,this._pressed=!1}_toggle(t,e=!1){this.dispatchEvent(new CustomEvent("toggle-check",{detail:{id:t,range:e},bubbles:!0,composed:!0}))}_pressStart(t){this.isAdmin&&(this._pressed=!1,window.clearTimeout(this._pressTimer),this._pressTimer=window.setTimeout(()=>{this._pressed=!0,this._toggle(t)},500))}_pressEnd(){window.clearTimeout(this._pressTimer)}_rowClick(t,e){this._pressed?this._pressed=!1:this.isAdmin&&(this.ticking||e.shiftKey||e.ctrlKey||e.metaKey)?this._toggle(t,e.shiftKey):this._select(t)}updated(t){t.has("selectedId")&&this.renderRoot.querySelector(".row.selected")?.scrollIntoView({block:"nearest"})}_select(t){this.dispatchEvent(new CustomEvent("select-ticket",{detail:t,bubbles:!0,composed:!0}))}_filterPerson(t,e){t.stopPropagation(),t.preventDefault(),this.dispatchEvent(new CustomEvent("filter-person",{detail:e,bubbles:!0,composed:!0}))}render(){return this.tickets.length?q`${this.tickets.map(t=>{const e="resolved"===t.status||"closed"===t.status;return q`
        <button
          class="row s-${t.status} ${e?"done":""} ${t.id===this.selectedId?"selected":""} ${this.checked.has(t.id)?"checked":""} ${this.ticking?"ticking":""} ${t.unread?"unread":""}"
          @click=${e=>this._rowClick(t.id,e)}
          @pointerdown=${e=>"touch"===e.pointerType&&this._pressStart(t.id)}
          @pointerup=${()=>this._pressEnd()}
          @pointercancel=${()=>this._pressEnd()}
          @pointermove=${()=>this._pressEnd()}
        >
          ${this.isAdmin?q`<span class="lead ${this.checked.has(t.id)?"on":""}" role="checkbox" aria-checked=${this.checked.has(t.id)} aria-label="Select #${t.id}"
                @click=${e=>{e.stopPropagation(),this._toggle(t.id,e.shiftKey)}}>
                <ha-icon class="state" .icon=${bt[t.status]} aria-label=${ft[t.status]}></ha-icon>
                <ha-icon class="box" .icon=${this.checked.has(t.id)?"mdi:checkbox-marked":"mdi:checkbox-blank-outline"}></ha-icon>
              </span>`:q`<ha-icon class="state" .icon=${bt[t.status]} role="img" aria-label=${ft[t.status]}></ha-icon>`}
          <div class="body">
            <div class="title">${t.title}</div>
            <div class="meta">
              <span class="ref">Opened ${_t(t.created_at,this.language)} by <span class="who" role="button" tabindex="0" aria-label="Show tickets from ${$t(t.requester)}"
                @click=${e=>this._filterPerson(e,t.requester)}
                @keydown=${e=>("Enter"===e.key||" "===e.key)&&this._filterPerson(e,t.requester)}><ha-icon icon=${wt(t.requester)}></ha-icon> ${$t(t.requester)}</span></span>
              ${t.agent_state?q`<span class="working"><ha-icon icon="mdi:star-four-points"></ha-icon> ${It(`ai:${t.agent_state.agent}`)} working…</span>`:W}
              ${t.unread&&t.activity&&"created"!==t.activity.kind?q`<span class="activity"><ha-icon icon=${wt(t.activity.actor)}></ha-icon> ${$t(t.activity.actor)} ${i=t.activity.kind,Rt[i]??"updated it"} ${_t(t.activity.at,this.language)}</span>`:t.updated_by?q`<span>Updated ${_t(t.updated_at,this.language)} by <ha-icon icon=${wt(t.updated_by)}></ha-icon> ${$t(t.updated_by)}</span>`:W}
              ${t.assignee&&kt(t.assignee)?q`<span><ha-icon icon=${wt(t.assignee)}></ha-icon> With AI Agent</span>`:W}
              ${t.labels.includes(Mt)?q`<span class="blocked" title="Waiting on a person, a part or a fix"><ha-icon icon="mdi:timer-sand"></ha-icon> Blocked</span>`:W}
              ${t.comment_count?q`<span><ha-icon icon="mdi:comment-outline"></ha-icon> ${t.comment_count}</span>`:W}
              ${t.attachment_count?q`<span title="Photos and voice messages"><ha-icon icon="mdi:paperclip"></ha-icon> ${t.attachment_count}</span>`:W}
            </div>
            <div class="meta2"><st-ticket-tags .ticket=${t} .categoryMap=${this.categoryMap} .labelMap=${this.labelMap} .isAdmin=${this.isAdmin}></st-ticket-tags></div>
          </div>
          ${"urgent"===t.priority||"high"===t.priority?q`<ha-icon class="prio ${t.priority}" .icon=${"urgent"===t.priority?"mdi:alert":"mdi:alert-outline"}
                role="img" aria-label="${xt[t.priority]} priority"></ha-icon>`:q`<span></span>`}
        </button>
      `;var i})}`:q`<div class="empty">No tickets here.</div>`}};Gt.styles=[ut,a`
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
    `],t([dt({attribute:!1})],Gt.prototype,"tickets",void 0),t([dt({type:Number})],Gt.prototype,"selectedId",void 0),t([dt()],Gt.prototype,"language",void 0),t([dt({type:Boolean})],Gt.prototype,"isAdmin",void 0),t([dt({attribute:!1})],Gt.prototype,"categoryMap",void 0),t([dt({attribute:!1})],Gt.prototype,"labelMap",void 0),t([dt({attribute:!1})],Gt.prototype,"checked",void 0),t([dt({type:Boolean})],Gt.prototype,"ticking",void 0),Gt=t([pt("st-ticket-list")],Gt);const Yt=2;class Zt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}class Vt extends Zt{constructor(t){if(super(t),this.it=W,t.type!==Yt)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===W||null==t)return this._t=void 0,this.it=t;if(t===F)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}Vt.directiveName="unsafeHTML",Vt.resultType=1;const Xt=(t=>(...e)=>({_$litDirective$:t,values:e}))(Vt);let Kt=class extends at{constructor(){super(...arguments),this.options=[],this.value="",this.label="",this.placeholder="",this.plain=!1,this.field=!1,this.up=!1,this._open=!1,this._at=""}_toggle(t){if(this._open)return void(this._open=!1);const e=t.currentTarget.getBoundingClientRect(),i=window.innerHeight-e.bottom,s=this.up||i<260&&e.top>i,o=Math.max(120,(s?e.top:i)-12);this._at=`left:${e.left}px;min-width:${e.width}px;max-height:${Math.min(o,.6*window.innerHeight)}px;${s?`bottom:${window.innerHeight-e.top+4}px`:`top:${e.bottom+4}px`}`,this._open=!0}_pick(t){this._open=!1,t!==this.value&&this.dispatchEvent(new CustomEvent("change",{detail:t,bubbles:!0,composed:!0}))}render(){const t=this.options.find(t=>t.id===this.value)??this.options[0];return q`
      <button class="dd ${this.value&&!this.plain?"active":""}" aria-haspopup="listbox" aria-expanded=${this._open}
        aria-label=${this.label} @click=${t=>this._toggle(t)}
        @keydown=${t=>"Escape"===t.key&&(this._open=!1)}>
        <span>${!this.value&&this.placeholder?this.placeholder:t?.label??""}</span><ha-icon icon="mdi:menu-down"></ha-icon>
      </button>
      ${this._open?q`<button class="backdrop" tabindex="-1" aria-label="Close" @click=${()=>this._open=!1}></button>
            <div class="menu" role="listbox" style=${this._at} @keydown=${t=>"Escape"===t.key&&(this._open=!1)}>
              ${this.options.map(t=>q`<button role="option" aria-selected=${t.id===this.value}
                class=${t.id===this.value?"selected":""} @click=${()=>this._pick(t.id)}>${t.label}</button>`)}
            </div>`:W}
    `}};Kt.styles=[ut,a`
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
    `],t([dt({attribute:!1})],Kt.prototype,"options",void 0),t([dt()],Kt.prototype,"value",void 0),t([dt()],Kt.prototype,"label",void 0),t([dt()],Kt.prototype,"placeholder",void 0),t([dt({type:Boolean})],Kt.prototype,"plain",void 0),t([dt({type:Boolean,reflect:!0})],Kt.prototype,"field",void 0),t([dt({type:Boolean,reflect:!0})],Kt.prototype,"up",void 0),t([ht()],Kt.prototype,"_open",void 0),t([ht()],Kt.prototype,"_at",void 0),Kt=t([pt("st-dropdown")],Kt);const Qt=16e3;async function Jt(t){try{const e=await createImageBitmap(t,{imageOrientation:"from-image"}),i=Math.min(1,1600/Math.max(e.width,e.height)),s=document.createElement("canvas");s.width=Math.max(1,Math.round(e.width*i)),s.height=Math.max(1,Math.round(e.height*i));const o=s.getContext("2d");if(!o)return t;o.drawImage(e,0,0,s.width,s.height),e.close();const n=await new Promise(t=>s.toBlob(t,"image/jpeg",.85));return n&&n.size<t.size||i<1&&n?n:t}catch{return t}}function te(t,e){const i=e===Qt?t:function(t,e,i){const s=e/i,o=new Float32Array(Math.floor(t.length/s));for(let e=0;e<o.length;e++){const i=Math.floor(e*s),n=Math.min(t.length,Math.max(i+1,Math.floor((e+1)*s)));let a=0;for(let e=i;e<n;e++)a+=t[e];o[e]=a/(n-i)}return o}(t,e,Qt),s=new ArrayBuffer(44+2*i.length),o=new DataView(s),n=(t,e)=>[...e].forEach((e,i)=>o.setUint8(t+i,e.charCodeAt(0)));return n(0,"RIFF"),o.setUint32(4,36+2*i.length,!0),n(8,"WAVE"),n(12,"fmt "),o.setUint32(16,16,!0),o.setUint16(20,1,!0),o.setUint16(22,1,!0),o.setUint32(24,Qt,!0),o.setUint32(28,32e3,!0),o.setUint16(32,2,!0),o.setUint16(34,16,!0),n(36,"data"),o.setUint32(40,2*i.length,!0),i.forEach((t,e)=>o.setInt16(44+2*e,32767*Math.max(-1,Math.min(1,t)),!0)),new Blob([s],{type:"audio/wav"})}const ee=t=>`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`;let ie=class extends at{constructor(){super(...arguments),this.ticketId=0,this.items=[],this._urls={},this._open="",this._signedFor=""}willUpdate(){const t=`${this.ticketId}:${this.items.map(t=>t.id).join(",")}`;if(t===this._signedFor||!this.client)return;this._signedFor=t,this._urls={};const e=this.ticketId;for(const t of this.items)this.client.attachmentUrl(e,t.id).then(i=>{e===this.ticketId&&(this._urls={...this._urls,[t.id]:i})}).catch(()=>{})}render(){const t=this.items.filter(t=>"image"===t.kind),e=this.items.filter(t=>"audio"===t.kind);return t.length||e.length?q`
      ${t.length?q`<div class="photos">
            ${t.map(t=>this._urls[t.id]?q`<button title=${t.name} aria-label=${`Open ${t.name}`} @click=${()=>this._open=t.id}>
                    <img src=${this._urls[t.id]} alt=${t.name} loading="lazy" />
                  </button>`:W)}
          </div>`:W}
      ${e.map(t=>q`<div class="voice">
          <ha-icon icon="mdi:microphone-outline"></ha-icon>
          ${this._urls[t.id]?q`<audio controls preload="none" src=${this._urls[t.id]}></audio>`:W}
          ${t.seconds?q`<span class="length">${ee(t.seconds)}</span>`:W}
        </div>`)}
      ${this._open&&this._urls[this._open]?q`<div class="lightbox" @click=${()=>this._open=""}>
            <img src=${this._urls[this._open]} alt="" />
            <button class="icon" aria-label="Close" @click=${()=>this._open=""}><ha-icon icon="mdi:close"></ha-icon></button>
          </div>`:W}
    `:W}};ie.styles=[ut,a`
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
    `],t([dt({attribute:!1})],ie.prototype,"client",void 0),t([dt({type:Number})],ie.prototype,"ticketId",void 0),t([dt({attribute:!1})],ie.prototype,"items",void 0),t([ht()],ie.prototype,"_urls",void 0),t([ht()],ie.prototype,"_open",void 0),ie=t([pt("st-ticket-attachments")],ie);let se=class extends at{constructor(){super(...arguments),this.rect=null,this.items=[],this.additional=()=>[],this.value="",this.emptyLabel="Nothing here",this.limit=0,this._q="",this._active=0}get _rows(){const t=this._q.trim().toLowerCase(),e=t?this.items.filter(e=>`${e.primary} ${e.secondary??""}`.toLowerCase().includes(t)):this.items;return[...this.limit?e.slice(0,this.limit):e,...this.additional(this._q.trim())]}_fire(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}_onKey(t){const e=this._rows;"Escape"===t.key?this._fire("close"):"ArrowDown"===t.key?(this._active=Math.min(this._active+1,e.length-1),t.preventDefault()):"ArrowUp"===t.key?(this._active=Math.max(this._active-1,0),t.preventDefault()):"Enter"===t.key&&e[this._active]&&this._fire("pick",{id:e[this._active].id,search:this._q.trim()})}firstUpdated(){this.renderRoot.querySelector("input")?.focus()}get _position(){const t=this.rect;if(!t)return"";const e=Math.max(8,Math.min(t.left,window.innerWidth-348)),i=window.innerHeight-t.bottom;return i>=300||i>=t.top?`left:${e}px;top:${t.bottom+4}px;max-height:${Math.max(160,Math.min(380,i-12))}px`:`left:${e}px;bottom:${window.innerHeight-t.top+4}px;max-height:${Math.max(160,Math.min(380,t.top-12))}px`}render(){const t=this._rows;return q`
      <button class="backdrop" tabindex="-1" aria-label="Close" @click=${()=>this._fire("close")}></button>
      <div class="popup" style=${this._position} role="listbox" @keydown=${this._onKey}>
        <div class="search">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input type="search" placeholder="Search" aria-label="Search" .value=${this._q}
            @input=${t=>{this._q=t.target.value,this._active=0}} />
        </div>
        <div class="list">
          ${this.limit&&this.items.length>this.limit&&!this._q.trim()?q`<div class="empty">Type to search ${this.items.length} items</div>`:W}
          ${t.length?W:q`<div class="empty">${this.emptyLabel}</div>`}
          ${t.map((t,e)=>q`<button class="item ${e===this._active?"active":""} ${t.id===this.value?"current":""}"
            role="option" aria-selected=${t.id===this.value}
            @mouseenter=${()=>this._active=e}
            @click=${()=>this._fire("pick",{id:t.id,search:this._q.trim()})}>
            <ha-icon .icon=${t.icon??"mdi:tag-outline"}></ha-icon>
            <span class="text"><span>${t.primary}</span>${t.secondary?q`<span class="secondary">${t.secondary}</span>`:W}</span>
          </button>`)}
        </div>
      </div>`}};se.styles=[ut,a`
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
    `],t([dt({attribute:!1})],se.prototype,"rect",void 0),t([dt({attribute:!1})],se.prototype,"items",void 0),t([dt({attribute:!1})],se.prototype,"additional",void 0),t([dt()],se.prototype,"value",void 0),t([dt()],se.prototype,"emptyLabel",void 0),t([dt({type:Number})],se.prototype,"limit",void 0),t([ht()],se.prototype,"_q",void 0),t([ht()],se.prototype,"_active",void 0),se=t([pt("st-picker-popup")],se);const oe={light:"mdi:lightbulb",switch:"mdi:toggle-switch",sensor:"mdi:eye",binary_sensor:"mdi:radiobox-marked",climate:"mdi:thermostat",lock:"mdi:lock",cover:"mdi:window-shutter",camera:"mdi:video",media_player:"mdi:play-circle",automation:"mdi:robot",script:"mdi:script-text",person:"mdi:account",fan:"mdi:fan",vacuum:"mdi:robot-vacuum",device_tracker:"mdi:account",alarm_control_panel:"mdi:shield-home",update:"mdi:package-up",input_boolean:"mdi:toggle-switch",scene:"mdi:palette"};let ne=class extends at{constructor(){super(...arguments),this.entities=[],this.devices=[],this.areas=[],this.editable=!1,this.ticketId=null,this.canAsk=!1,this.askName="AI",this.agentLabel="the AI",this.addLabel="Add device, entity or area",this._rect=null,this._guesses=[],this._error="",this._asking=!1,this._guessedFor=""}get _reg(){return this.hass}get _empty(){return!this.entities.length&&!this.devices.length&&!this.areas.length}willUpdate(t){const e=`${this.ticketId}|${this.entities.length}|${this.devices.length}|${this.areas.length}`;(t.has("ticketId")||t.has("entities")||t.has("devices")||t.has("areas"))&&e!==this._guessedFor&&(this._guessedFor=e,this._guesses=[],this._error="",null!==this.ticketId&&this.client&&this.editable&&this._empty&&this._loadGuesses(this.ticketId))}async _loadGuesses(t){try{const e=await this.client.suggest(t);t===this.ticketId&&this._empty&&(this._guesses=e)}catch{}}_areaName(t){return t&&this._reg.areas?.[t]?.name||""}_describe(t,e){if("area"===t){const t=this._reg.areas?.[e];return{name:t?.name??e,icon:t?.icon||"mdi:texture-box",detail:"",bad:!1,gone:!!this._reg.areas&&!t,area:""}}if("device"===t){const t=this._reg.devices?.[e];return{name:t?.name_by_user||t?.name||e,icon:"mdi:devices",detail:this._areaName(t?.area_id),bad:!1,gone:!!this._reg.devices&&!t,area:this._areaName(t?.area_id)}}const i=this.hass?.states?.[e],s=String(i?.attributes.friendly_name??e),o=i?.attributes.unit_of_measurement,n=i?`${i.state}${o?` ${String(o)}`:""}`:"";return{name:s,icon:String(i?.attributes.icon??oe[e.split(".")[0]??""]??"mdi:shape-outline"),detail:n,bad:"unavailable"===i?.state||"unknown"===i?.state,gone:!i,area:""}}_icon(t,e,i){return"entity"===t&&this.hass?.states?.[e]&&customElements.get("ha-state-icon")?q`<ha-state-icon .hass=${this.hass} .stateObj=${this.hass.states[e]}></ha-state-icon>`:q`<ha-icon .icon=${i}></ha-icon>`}_open(t,e){if("entity"===t)return void this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}));const i="device"===t?`/config/devices/device/${e}`:`/config/areas/area/${e}`;try{history.pushState(null,"",i),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}catch{}}_current(){return{entities:[...this.entities],devices:[...this.devices],areas:[...this.areas]}}_changed(t){this.dispatchEvent(new CustomEvent("change",{detail:t,bubbles:!0,composed:!0}))}_add(t,e){const i=this._current(),s="entity"===t?i.entities:"device"===t?i.devices:i.areas;s.includes(e)||s.push(e),this._guesses=this._guesses.filter(i=>!(i.kind===t&&i.id===e)),this._changed(i)}_remove(t,e){const i=this._current(),s="entity"===t?"entities":"device"===t?"devices":"areas";i[s]=i[s].filter(t=>t!==e),this._changed(i)}get _items(){const t=new Set([...this.entities.map(t=>`entity:${t}`),...this.devices.map(t=>`device:${t}`),...this.areas.map(t=>`area:${t}`)]),e=[];for(const i of Object.values(this._reg.areas??{}))t.has(`area:${i.area_id}`)||e.push({id:`area:${i.area_id}`,primary:i.name,secondary:"Area",icon:i.icon||"mdi:texture-box"});for(const i of Object.values(this._reg.devices??{})){const s=i.name_by_user||i.name;if(s&&!t.has(`device:${i.id}`)){const t=this._areaName(i.area_id);e.push({id:`device:${i.id}`,primary:s,secondary:t?`Device · ${t}`:"Device",icon:"mdi:devices"})}}for(const[i,s]of Object.entries(this.hass?.states??{}))t.has(`entity:${i}`)||e.push({id:`entity:${i}`,primary:String(s.attributes.friendly_name??i),secondary:i,icon:oe[i.split(".")[0]??""]??"mdi:shape-outline"});return e}_picked(t){this._rect=null;const[e,...i]=t.split(":");this._add(e,i.join(":"))}_askAi(){if(null===this.ticketId||!this.client)return;const t=this.ticketId,e=this.agentLabel;this.dispatchEvent(new CustomEvent("confirm-cost",{bubbles:!0,composed:!0,detail:{text:`Ask ${e} which devices, entities and areas ticket #${t} is about? The ticket, and the names (not the states) of the things in your home, are sent to ${e} through Home Assistant, which uses your AI plan and may cost money.`,run:async()=>{this._asking=!0,this._error="";try{const i=await this.client.suggest(t,!0);t===this.ticketId&&(this._guesses=i,i.length||(this._error=`${e} didn't find anything that fits.`))}catch(t){this._error=String(t&&"object"==typeof t&&"message"in t?t.message:t)}finally{this._asking=!1}}}}))}_chip(t,e){const i=this._describe(t,e);return q`<span class="chip ${i.gone?"gone":""}">
      <button class="open" title=${"entity"===t?`${e}: open in Home Assistant`:`Open this ${t} in Home Assistant`} @click=${()=>this._open(t,e)}>
        ${this._icon(t,e,i.icon)}<span class="name">${i.name}</span>
        ${i.gone?q`<span class="detail">not found</span>`:i.detail?q`<span class="detail ${i.bad?"bad":""}">${"device"===t?i.detail:`· ${i.detail}`}</span>`:W}
      </button>
      ${this.editable?q`<button class="rm" title="Remove" aria-label="Remove ${i.name}" @click=${()=>this._remove(t,e)}><ha-icon icon="mdi:close"></ha-icon></button>`:W}
    </span>`}_guess(t){const e=this._describe(t.kind,t.id);return q`<span class="chip guess">
      <button class="open" title="Add this to the ticket" @click=${()=>this._add(t.kind,t.id)}>
        ${this._icon(t.kind,t.id,e.icon)}<span class="name">${t.name}</span>
        ${t.area&&"area"!==t.kind?q`<span class="detail">${t.area}</span>`:W}
        <ha-icon class="plus" icon="mdi:plus"></ha-icon>
      </button>
    </span>`}render(){const t=!this._empty;return t||this.editable?q`<div class="row">
      ${t?q`<span class="sect">About</span>`:W}
      ${this.devices.map(t=>this._chip("device",t))}
      ${this.entities.map(t=>this._chip("entity",t))}
      ${this.areas.map(t=>this._chip("area",t))}
      ${this.editable?q`<button class="add ${t?"":"wide"}" title=${this.addLabel} aria-label=${this.addLabel}
            @click=${t=>this._rect=t.currentTarget.getBoundingClientRect()}>
            <ha-icon icon="mdi:plus"></ha-icon>${t?W:this.addLabel}</button>`:W}
    </div>
    ${this.editable&&this._empty&&(this._guesses.length||this.canAsk&&null!==this.ticketId)?q`<div class="row" style="margin-top: 8px">
          ${this._guesses.length?q`<span class="sect">${this._guesses.some(t=>t.ai)?`${this.askName} suggests`:"Related?"}</span>`:W}
          ${this._guesses.map(t=>this._guess(t))}
          ${this.canAsk&&null!==this.ticketId?q`<button class="askai" ?disabled=${this._asking} @click=${this._askAi}><ha-icon icon="mdi:star-four-points"></ha-icon>${this._asking?"Asking…":`Ask ${this.askName}`}</button>`:W}
        </div>`:W}
    ${this._error?q`<div class="err">${this._error}</div>`:W}
    ${this._rect?q`<st-picker-popup .rect=${this._rect} .items=${this._items} emptyLabel="Nothing matches" .limit=${100}
          @close=${()=>this._rect=null} @pick=${t=>this._picked(t.detail.id)}></st-picker-popup>`:W}`:W}};
/*! @license DOMPurify 3.4.17 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.17/LICENSE */
function ae(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,s=Array(e);i<e;i++)s[i]=t[i];return s}
/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
function re(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var i=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=i){var s,o,n,a,r=[],l=!0,c=!1;try{if(n=(i=i.call(t)).next,0===e);else for(;!(l=(s=n.call(i)).done)&&(r.push(s.value),r.length!==e);l=!0);}catch(t){c=!0,o=t}finally{try{if(!l&&null!=i.return&&(a=i.return(),Object(a)!==a))return}finally{if(c)throw o}}return r}}(t,e)||function(t,e){if(t){if("string"==typeof t)return ae(t,e);var i={}.toString.call(t).slice(8,-1);return"Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?ae(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}ne.styles=[ut,a`
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
      .askai {
        height: 28px;
        padding: 0 10px;
        border-radius: var(--st-r-pill);
        background: transparent;
        color: var(--st-accent);
        font-size: var(--st-fs-caption);
        font-weight: 500;
      }
      .askai ha-icon {
        --mdc-icon-size: 16px;
      }
      .err {
        font-size: var(--st-fs-caption);
        color: var(--st-danger);
      }
    `],t([dt({attribute:!1})],ne.prototype,"hass",void 0),t([dt({attribute:!1})],ne.prototype,"entities",void 0),t([dt({attribute:!1})],ne.prototype,"devices",void 0),t([dt({attribute:!1})],ne.prototype,"areas",void 0),t([dt({type:Boolean})],ne.prototype,"editable",void 0),t([dt({type:Number})],ne.prototype,"ticketId",void 0),t([dt({attribute:!1})],ne.prototype,"client",void 0),t([dt({type:Boolean})],ne.prototype,"canAsk",void 0),t([dt()],ne.prototype,"askName",void 0),t([dt()],ne.prototype,"agentLabel",void 0),t([dt()],ne.prototype,"addLabel",void 0),t([ht()],ne.prototype,"_rect",void 0),t([ht()],ne.prototype,"_guesses",void 0),t([ht()],ne.prototype,"_error",void 0),t([ht()],ne.prototype,"_asking",void 0),ne=t([pt("st-ticket-things")],ne);const le=Object.entries,ce=Object.setPrototypeOf,de=Object.isFrozen,he=Object.getPrototypeOf,pe=Object.getOwnPropertyDescriptor;let ue=Object.freeze,ge=Object.seal,me=Object.create,fe="undefined"!=typeof Reflect&&Reflect,be=fe.apply,ve=fe.construct;ue||(ue=function(t){return t}),ge||(ge=function(t){return t}),be||(be=function(t,e){for(var i=arguments.length,s=new Array(i>2?i-2:0),o=2;o<i;o++)s[o-2]=arguments[o];return t.apply(e,s)}),ve||(ve=function(t){for(var e=arguments.length,i=new Array(e>1?e-1:0),s=1;s<e;s++)i[s-1]=arguments[s];return new t(...i)});const xe=qe(Array.prototype.forEach),ye=qe(Array.prototype.lastIndexOf),_e=qe(Array.prototype.pop),ke=qe(Array.prototype.push),we=qe(Array.prototype.slice),$e=qe(Array.prototype.splice),Ae=Array.isArray,Se=Fe(Set),Ce=qe(Set.prototype.add),Te=qe(Set.prototype.has),ze=qe(String.prototype.toLowerCase),Ee=qe(String.prototype.toString),Re=qe(String.prototype.match),Ie=qe(String.prototype.replace),Le=qe(String.prototype.indexOf),Ne=qe(String.prototype.trim),Pe=qe(Number.prototype.toString),Me=qe(Boolean.prototype.toString),Oe="undefined"==typeof BigInt?null:qe(BigInt.prototype.toString),De="undefined"==typeof Symbol?null:qe(Symbol.prototype.toString),Ue=qe(Object.prototype.hasOwnProperty),He=qe(Object.prototype.toString),je=qe(RegExp.prototype.test),Be=Fe(TypeError);function qe(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var i=arguments.length,s=new Array(i>1?i-1:0),o=1;o<i;o++)s[o-1]=arguments[o];return be(t,e,s)}}function Fe(t){return function(){for(var e=arguments.length,i=new Array(e),s=0;s<e;s++)i[s]=arguments[s];return ve(t,i)}}function We(t,e){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:ze;if(ce&&ce(t,null),!Ae(e))return t;let s=e.length;for(;s--;){let o=e[s];if("string"==typeof o){const t=i(o);t!==o&&(de(e)||(e[s]=t),o=t)}t[o]=!0}return t}function Ge(t){for(let e=0;e<t.length;e++)Ue(t,e)||(t[e]=null);return t}function Ye(t){const e=me(null);for(const s of le(t)){var i=re(s,2);const o=i[0],n=i[1];Ue(t,o)&&(Ae(n)?e[o]=Ge(n):n&&"object"==typeof n&&n.constructor===Object?e[o]=Ye(n):e[o]=n)}return e}function Ze(t,e){for(;null!==t;){const i=pe(t,e);if(i){if(i.get)return qe(i.get);if("function"==typeof i.value)return qe(i.value)}t=he(t)}return function(){return null}}const Ve=ue(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Xe=ue(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ke=ue(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Qe=ue(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Je=ue(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),ti=ue(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ei=ue(["#text"]),ii=ue(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),si=ue(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),oi=ue(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ni=ue(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),ai=ge(/{{[\w\W]*|^[\w\W]*}}/g),ri=ge(/<%[\w\W]*|^[\w\W]*%>/g),li=ge(/\${[\w\W]*/g),ci=ge(/^data-[\-\w.\u00B7-\uFFFF]+$/),di=ge(/^aria-[\-\w]+$/),hi=ge(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),pi=ge(/^(?:\w+script|data):/i),ui=ge(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),gi=ge(/^html$/i),mi=ge(/^[a-z][.\w]*(-[.\w]+)+$/i),fi=ge(/<[/\w!]/g),bi=ge(/<[/\w]/g),vi=ge(/<\/no(script|embed|frames)/i),xi=ge(/\/>/i),yi=1,_i=3,ki=7,wi=8,$i=9,Ai=11,Si=ue(We({},["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"])),Ci=function(){return"undefined"==typeof window?null:window},Ti=function(t,e,i,s){return Ue(t,e)&&Ae(t[e])?We(s.base?Ye(s.base):{},t[e],s.transform):i},zi=function(t,e,i){const s=Ue(t,e)?t[e]:void 0;return s&&"object"==typeof s?Ye(s):i()};var Ei=function t(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ci();const i=e=>t(e);if(i.version="3.4.17",i.removed=[],!e||!e.document||e.document.nodeType!==$i||!e.Element)return i.isSupported=!1,i;let s=e.document;const o=s,n=o.currentScript;e.DocumentFragment;const a=e.HTMLTemplateElement,r=e.Node,l=e.Element,c=e.NodeFilter;void 0===e.NamedNodeMap&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;const d=e.DOMParser,h=e.trustedTypes,p=l.prototype,u=Ze(p,"cloneNode"),g=Ze(p,"remove"),m=Ze(p,"removeAttributeNode"),f=Ze(p,"nextSibling"),b=Ze(p,"childNodes"),v=Ze(p,"parentNode"),x=Ze(p,"shadowRoot"),y=Ze(p,"attributes"),_=r&&r.prototype?Ze(r.prototype,"nodeType"):null,k=r&&r.prototype?Ze(r.prototype,"nodeName"):null,w=r&&r.prototype?Ze(r.prototype,"ownerDocument"):null,$=function(t){return _?_(t):t.nodeType},A=function(t){return k?k(t):t.nodeName},S=function(t,e){for(;null!==t;){const i=pe(t,e);if(i)return i.get?qe(i.get):null;t=he(t)}return null}(p,"namespaceURI"),C=function(t){return S?S(t):t.namespaceURI};if("function"==typeof a){const t=s.createElement("template");t.content&&t.content.ownerDocument&&(s=t.content.ownerDocument)}let T,z,E="",R=!1,I=0;const L=function(){if(I>0)throw Be('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},N=function(t){L(),I++;try{return T.createHTML(t)}finally{I--}},P=function(){return R||(z=function(t,e){if("object"!=typeof t||"function"!=typeof t.createPolicy)return null;let i=null;const s="data-tt-policy-suffix";e&&e.hasAttribute(s)&&(i=e.getAttribute(s));const o="dompurify"+(i?"#"+i:"");try{return t.createPolicy(o,{createHTML:t=>t,createScriptURL:t=>t})}catch(t){return console.warn("TrustedTypes policy "+o+" could not be created."),null}}(h,n),R=!0),z},M=s,O=M.implementation,D=M.createNodeIterator,U=M.createDocumentFragment,H=M.getElementsByTagName,j=o.importNode;let B={afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]};i.isSupported="function"==typeof le&&"function"==typeof v&&O&&void 0!==O.createHTMLDocument;const q=ai,F=ri,W=li,G=ci,Y=di,Z=pi,V=ui,X=mi;let K=hi,Q=null;const J=We({},[...Ve,...Xe,...Ke,...Je,...ei]);let tt=null;const et=We({},[...ii,...si,...oi,...ni]);let it=Object.seal(me(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),st=null,ot=null;const nt=Object.seal(me(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let at=!0,rt=!0,lt=!1,ct=!0,dt=!1,ht=!0,pt=!1,ut=!1,gt=null,mt=null,ft=!1,bt=!1,vt=!1,xt=!1,yt=!0,_t=!1;const kt="user-content-";let wt=!0,$t=!1,At=null,St={},Ct=null;const Tt=We({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let zt=null;const Et=We({},["audio","video","img","source","image","track"]);let Rt=null;const It=We({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Lt="http://www.w3.org/1998/Math/MathML",Nt="http://www.w3.org/2000/svg",Pt="http://www.w3.org/1999/xhtml";let Mt=Pt,Ot=!1,Dt=null;const Ut=We({},[Lt,Nt,Pt],Ee),Ht=ue(["mi","mo","mn","ms","mtext"]);let jt=We({},Ht);const Bt=ue(["annotation-xml"]);let qt=We({},Bt);const Ft=We({},["title","style","font","a","script"]);let Wt=null;const Gt=["application/xhtml+xml","text/html"];let Yt=null,Zt=null;const Vt=s.createElement("form"),Xt=function(t){return t instanceof RegExp||t instanceof Function},Kt=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(Zt&&Zt===t)return;t&&"object"==typeof t||(t={}),t=Ye(t),Wt=-1===Gt.indexOf(t.PARSER_MEDIA_TYPE)?"text/html":t.PARSER_MEDIA_TYPE,Yt="application/xhtml+xml"===Wt?Ee:ze,Q=Ti(t,"ALLOWED_TAGS",J,{transform:Yt}),tt=Ti(t,"ALLOWED_ATTR",et,{transform:Yt}),Dt=Ti(t,"ALLOWED_NAMESPACES",Ut,{transform:Ee}),Rt=Ti(t,"ADD_URI_SAFE_ATTR",It,{transform:Yt,base:It}),zt=Ti(t,"ADD_DATA_URI_TAGS",Et,{transform:Yt,base:Et}),Ct=Ti(t,"FORBID_CONTENTS",Tt,{transform:Yt}),st=Ti(t,"FORBID_TAGS",Ye({}),{transform:Yt}),ot=Ti(t,"FORBID_ATTR",Ye({}),{transform:Yt}),St=!!Ue(t,"USE_PROFILES")&&(t.USE_PROFILES&&"object"==typeof t.USE_PROFILES?Ye(t.USE_PROFILES):t.USE_PROFILES),at=!1!==t.ALLOW_ARIA_ATTR,rt=!1!==t.ALLOW_DATA_ATTR,lt=t.ALLOW_UNKNOWN_PROTOCOLS||!1,ct=!1!==t.ALLOW_SELF_CLOSE_IN_ATTR,dt=t.SAFE_FOR_TEMPLATES||!1,ht=!1!==t.SAFE_FOR_XML,pt=t.WHOLE_DOCUMENT||!1,bt=t.RETURN_DOM||!1,vt=t.RETURN_DOM_FRAGMENT||!1,xt=t.RETURN_TRUSTED_TYPE||!1,ft=t.FORCE_BODY||!1,yt=!1!==t.SANITIZE_DOM,_t=t.SANITIZE_NAMED_PROPS||!1,wt=!1!==t.KEEP_CONTENT,$t=t.IN_PLACE||!1,K=function(t){try{return je(t,""),!0}catch(t){return!1}}(t.ALLOWED_URI_REGEXP)?t.ALLOWED_URI_REGEXP:hi,Mt="string"==typeof t.NAMESPACE?t.NAMESPACE:Pt,jt=zi(t,"MATHML_TEXT_INTEGRATION_POINTS",()=>We({},Ht)),qt=zi(t,"HTML_INTEGRATION_POINTS",()=>We({},Bt));const e=zi(t,"CUSTOM_ELEMENT_HANDLING",()=>me(null));if(it=me(null),Ue(e,"tagNameCheck")&&Xt(e.tagNameCheck)&&(it.tagNameCheck=e.tagNameCheck),Ue(e,"attributeNameCheck")&&Xt(e.attributeNameCheck)&&(it.attributeNameCheck=e.attributeNameCheck),Ue(e,"allowCustomizedBuiltInElements")&&"boolean"==typeof e.allowCustomizedBuiltInElements&&(it.allowCustomizedBuiltInElements=e.allowCustomizedBuiltInElements),ge(it),dt&&(rt=!1),vt&&(bt=!0),St&&(Q=We({},ei),tt=me(null),!0===St.html&&(We(Q,Ve),We(tt,ii)),!0===St.svg&&(We(Q,Xe),We(tt,si),We(tt,ni)),!0===St.svgFilters&&(We(Q,Ke),We(tt,si),We(tt,ni)),!0===St.mathMl&&(We(Q,Je),We(tt,oi),We(tt,ni))),nt.tagCheck=null,nt.attributeCheck=null,Ue(t,"ADD_TAGS")&&("function"==typeof t.ADD_TAGS?nt.tagCheck=t.ADD_TAGS:Ae(t.ADD_TAGS)&&(Q===J&&(Q=Ye(Q)),We(Q,t.ADD_TAGS,Yt))),Ue(t,"ADD_ATTR")&&("function"==typeof t.ADD_ATTR?nt.attributeCheck=t.ADD_ATTR:Ae(t.ADD_ATTR)&&(tt===et&&(tt=Ye(tt)),We(tt,t.ADD_ATTR,Yt))),Ue(t,"ADD_FORBID_CONTENTS")&&Ae(t.ADD_FORBID_CONTENTS)&&(Ct===Tt&&(Ct=Ye(Ct)),We(Ct,t.ADD_FORBID_CONTENTS,Yt)),wt&&(Q["#text"]=!0),pt&&We(Q,["html","head","body"]),Q.table&&(We(Q,["tbody"]),delete st.tbody),t.TRUSTED_TYPES_POLICY){if("function"!=typeof t.TRUSTED_TYPES_POLICY.createHTML)throw Be('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if("function"!=typeof t.TRUSTED_TYPES_POLICY.createScriptURL)throw Be('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const e=T;T=t.TRUSTED_TYPES_POLICY;try{E=N("")}catch(t){throw T=e,t}}else null===t.TRUSTED_TYPES_POLICY?(T=void 0,E=""):(void 0===T&&(T=P()),T&&"string"==typeof E&&(E=N("")));ue&&ue(t),Zt=t},Qt=We({},[...Xe,...Ke,...Qe]),Jt=We({},[...Je,...ti]),te=function(t){const e=C(t),i=ze(A(t)),s=v(t);let o,n;return s&&$(s)===yi?(o={namespaceURI:C(s)},n=ze(A(s))):(o={namespaceURI:Mt},n="template"),!!Dt[e]&&(e===Nt?function(t,e,i){return e.namespaceURI===Pt?"svg"===t:e.namespaceURI===Lt?"svg"===t&&("annotation-xml"===i||jt[i]):Boolean(Qt[t])}(i,o,n):e===Lt?function(t,e,i){return e.namespaceURI===Pt?"math"===t:e.namespaceURI===Nt?"math"===t&&qt[i]:Boolean(Jt[t])}(i,o,n):e===Pt?function(t,e,i){return!(e.namespaceURI===Nt&&!qt[i])&&!(e.namespaceURI===Lt&&!jt[i])&&!Jt[t]&&(Ft[t]||!Qt[t])}(i,o,n):!("application/xhtml+xml"!==Wt||!Dt[e]))},ee=function(t){ke(i.removed,{element:t});try{v(t).removeChild(t)}catch(e){if(g(t),!v(t))throw Be("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},ie=function(t,e,i){try{m(t,e)}catch(e){try{t.removeAttribute(i)}catch(t){}}},se=function(t){re(t);const e=b(t);e&&xe(we(e),t=>{try{g(t)}catch(t){}});const i=$(t)===yi?y(t):null;if(i)for(let e=i.length-1;e>=0;--e){const s=i[e],o=s&&s.name;"string"==typeof o&&ie(t,s,o)}},oe=function(t,e,s){if(!s)try{s=e.getAttributeNode(t)}catch(t){s=null}ke(i.removed,{attribute:s||null,from:e});try{s?m(e,s):e.removeAttribute(t)}catch(i){try{e.removeAttribute(t)}catch(t){}}if("is"===t)if(bt||vt)try{ee(e)}catch(t){}else try{e.setAttribute(t,"")}catch(t){}},ne=function(t){const e=y(t);if(e)for(let i=e.length-1;i>=0;--i){const s=e[i],o=s&&s.name;"string"!=typeof o||tt[Yt(o)]||ie(t,s,o)}},ae=function(t,e){let i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];const s=[t];for(;s.length>0;){const t=s.pop();if(!1===e(t))continue;if(i&&$(t)===yi){const e=x(t);Li(e)&&s.push(e)}const o=b(t);if(o)for(let t=o.length-1;t>=0;--t)s.push(o[t])}},re=function(t){ae(t,t=>{$(t)===yi&&ne(t)})},ce=function(t){const e=[];return ae(t,t=>{e.push(t)},!0),e},de=function(t,e){let s=!1;return xe(i.removed,e=>{e.element&&(s=s||e.element===t,re(e.element))}),function(t,e){const i=Se();xe(ce(t),t=>{$(t)===yi&&Ce(i,t)}),xe(e,t=>{$(t)!==yi||Te(i,t)||ne(t)})}(t,e),s},fe=function(t,e,i,s){const o=Fe(t);let n;for(;n=o.nextNode();)Te(s,n)&&!Te(At,n)&&(e&&Pi(B.uponSanitizeShadowNode,n,null),Ui(n,i),Gi(n,i),Li(n.content)&&Yi(n.content))},be=function(t,e){return!!ht&&("patchsrc"===t||"for"===t&&"label"!==e&&"output"!==e)},ve=function(t){let e=null,i=null;if(ft)t="<remove></remove>"+t;else{const e=Re(t,/^[\r\n\t ]+/);i=e&&e[0]}"application/xhtml+xml"===Wt&&Mt===Pt&&(t='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+t+"</body></html>");const o=T?N(t):t;if(Mt===Pt)try{e=(new d).parseFromString(o,Wt)}catch(t){}if(!e||!e.documentElement){e=O.createDocument(Mt,"template",null);try{e.documentElement.innerHTML=Ot?E:o}catch(t){}}const n=e.body||e.documentElement;return t&&i&&n.insertBefore(s.createTextNode(i),n.childNodes[0]||null),Mt===Pt?H.call(e,pt?"html":"body")[0]:pt?e.documentElement:n},Fe=function(t){const e=w?w(t):t.ownerDocument;return D.call(e||t,t,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Ge=function(t){return t=Ie(t,q," "),t=Ie(t,F," "),t=Ie(t,W," ")},Ei=function(t){var e;Ri(t);const i=null===(e=t.querySelectorAll)||void 0===e?void 0:e.call(t,"template");i&&xe(i,t=>{Li(t.content)&&Ei(t.content)})},Ri=function(t){t.normalize();const e=w?w(t):t.ownerDocument,i=D.call(e||t,t,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null);let s=i.nextNode();for(;s;)s.data=Ge(s.data),s=i.nextNode()},Ii=function(t){const e=k?k(t):null;return"string"==typeof e&&("form"===Yt(e)&&("string"!=typeof t.nodeName||"string"!=typeof t.textContent||"function"!=typeof t.removeChild||t.attributes!==y(t)||"function"!=typeof t.removeAttribute||"function"!=typeof t.removeAttributeNode||"function"!=typeof t.getAttributeNode||"function"!=typeof t.setAttribute||"string"!=typeof t.namespaceURI||"function"!=typeof t.insertBefore||"function"!=typeof t.hasChildNodes||t.nodeType!==_(t)||t.childNodes!==b(t)))},Li=function(t){if(!_||"object"!=typeof t||null===t)return!1;try{return _(t)===Ai}catch(t){return!1}},Ni=function(t){if(!_||"object"!=typeof t||null===t)return!1;try{return"number"==typeof _(t)}catch(t){return!1}};function Pi(t,e,s){0!==t.length&&xe(t,t=>{t.call(i,e,s,Zt)})}const Mi=function(t,e){if(t instanceof RegExp)return je(t,e);if(t instanceof Function){for(var i=arguments.length,s=new Array(i>2?i-2:0),o=2;o<i;o++)s[o-2]=arguments[o];return Boolean(t(e,...s))}return!1},Oi=function(t,e,i,s){return 0===t.length?e:e===i||e===s?Ye(e):e},Di=function(t,e){return t!==e&&null===v(t)&&($t&&re(t),!0)},Ui=function(t,e){var s;if(s=t,At&&Ce(At,s),Pi(B.beforeSanitizeElements,t,null),Di(t,e))return!0;if(Ii(t))return ee(t),!0;const o=Yt(A(t));if(Q=Oi(B.uponSanitizeElement,Q,J,gt),Pi(B.uponSanitizeElement,t,{tagName:o,allowedTags:Q}),Di(t,e))return!0;if(function(t,e){return!!(ht&&t.hasChildNodes()&&!Ni(t.firstElementChild)&&je(fi,t.textContent)&&je(fi,t.innerHTML))||!!(ht&&Si[e]&&$(t)===yi&&C(t)===Pt&&(Ni(t.firstElementChild)||"string"==typeof t.textContent&&je(fi,t.textContent)))||t.nodeType===ki||!(!ht||t.nodeType!==wi||!je(bi,t.data))}(t,o))return ee(t),!0;if(st[o]||!(nt.tagCheck instanceof Function&&nt.tagCheck(o))&&!Q[o]){const i=function(t,e,i){if(!st[e]&&Bi(e)&&Mi(it.tagNameCheck,e))return!1;if(wt&&!Ct[e]&&!Ct[ze(e)]){const e=v(t),s=b(t);if(s&&e)for(let o=s.length-1;o>=0;--o){const n=t===i?u(s[o],!0):s[o];e.insertBefore(n,f(t))}}return ee(t),!0}(t,o,e);return!(!1!==i||(Pi(B.afterSanitizeElements,t,null),!Di(t,e)))||i}if($(t)===yi&&!te(t))return ee(t),!0;if(("noscript"===o||"noembed"===o||"noframes"===o)&&je(vi,t.innerHTML))return ee(t),!0;if(dt&&t.nodeType===_i){const e=Ge(t.textContent);t.textContent!==e&&(ke(i.removed,{element:t.cloneNode()}),t.textContent=e)}return Pi(B.afterSanitizeElements,t,null),Di(t,e)},Hi=function(t,e,i){if(ot[e])return!1;if(be(e,t))return!1;if(yt&&("id"===e||"name"===e)&&(i in s||i in Vt))return!1;const o=tt[e]||nt.attributeCheck instanceof Function&&nt.attributeCheck(e,t);return!(!rt||!je(G,e))||(!(!at||!je(Y,e))||(o?!!Rt[e]||(!!je(K,Ie(i,V,""))||(!("src"!==e&&"xlink:href"!==e&&"href"!==e||"script"===t||0!==Le(i,"data:")||!zt[t])||(!(!lt||je(Z,Ie(i,V,"")))||!i))):Bi(t)&&Mi(it.tagNameCheck,t)&&Mi(it.attributeNameCheck,e,t)||"is"===e&&it.allowCustomizedBuiltInElements&&Mi(it.tagNameCheck,i)))},ji=We({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),Bi=function(t){return!ji[ze(t)]&&je(X,t)},qi=function(t,e,i,s){if(T&&"object"==typeof h&&"function"==typeof h.getAttributeType&&!i)switch(h.getAttributeType(t,e)){case"TrustedHTML":return N(s);case"TrustedScriptURL":return function(t){L(),I++;try{return T.createScriptURL(t)}finally{I--}}(s)}return s},Fi=function(t,e,i,s){try{return i?t.setAttributeNS(i,e,s):t.setAttribute(e,s),!Ii(t)||(ee(t),!1)}catch(i){return oe(e,t),!1}},Wi=function(t,e){return!(!ht||!je(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,e))||"attributename"===ze(t)&&null!==Re(e,"href")},Gi=function(t,e){if(Pi(B.beforeSanitizeAttributes,t,null),Di(t,e))return;const s=t.attributes;if(!s||Ii(t))return;tt=Oi(B.uponSanitizeAttribute,tt,et,mt);const o={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:tt,forceKeepAttr:void 0};let n=s.length;const a=Yt(t.nodeName);for(;n--;){const e=s[n],r=e.name,l=e.namespaceURI,c=e.value,d=Yt(r),h=c;let p="value"===r?h:Ne(h),u=!1;o.attrName=d,o.attrValue=p,o.keepAttr=!0,o.forceKeepAttr=void 0,Pi(B.uponSanitizeAttribute,t,o),p=o.attrValue,!_t||"id"!==d&&"name"!==d||0===Le(p,kt)||(oe(r,t,e),p=kt+p,u=!0),Wi(r,p)?oe(r,t,e):o.forceKeepAttr||(o.keepAttr&&(ct||!je(xi,p))?(dt&&(p=Ge(p)),Hi(a,d,p)?(p=qi(a,d,l,p),p!==h&&Fi(t,r,l,p)&&u&&_e(i.removed)):oe(r,t,e)):oe(r,t,e))}Pi(B.afterSanitizeAttributes,t,null),Di(t,e)},Yi=function(t){let e=null;const i=Fe(t);for(Pi(B.beforeSanitizeShadowDOM,t,null);e=i.nextNode();)if(Pi(B.uponSanitizeShadowNode,e,null),Ui(e,t),Gi(e,t),Li(e.content)&&Yi(e.content),$(e)===yi){const t=x(e);Li(t)&&(Zi(t),Yi(t))}dt&&Ri(t),Pi(B.afterSanitizeShadowDOM,t,null)},Zi=function(t){const e=[{node:t,shadow:null}];for(;e.length>0;){const t=e.pop();if(t.shadow){Yi(t.shadow);continue}const i=t.node,s=$(i)===yi,o=b(i);if(o)for(let t=o.length-1;t>=0;--t)e.push({node:o[t],shadow:null});if(s){const t=k?k(i):null;if("string"==typeof t&&"template"===Yt(t)){const t=i.content;Li(t)&&e.push({node:t,shadow:null})}}if(s){const t=x(i);Li(t)&&e.push({node:null,shadow:t},{node:t,shadow:null})}}};return i.sanitize=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},s=null,n=null,a=null,r=null;if(Ot=!t,Ot&&(t="\x3c!--\x3e"),"string"!=typeof t&&!Ni(t)&&"string"!=typeof(t=function(t){switch(typeof t){case"string":return t;case"number":return Pe(t);case"boolean":return Me(t);case"bigint":return Oe?Oe(t):"0";case"symbol":return De?De(t):"Symbol()";case"undefined":default:return He(t);case"function":case"object":{if(null===t)return He(t);const e=t,i=Ze(e,"toString");if("function"==typeof i){const t=i(e);return"string"==typeof t?t:He(t)}return He(t)}}}(t)))throw Be("dirty is not a string, aborting");if(!i.isSupported)return t;ut?(Q=gt,tt=mt):Kt(e),(B.uponSanitizeElement.length>0||B.uponSanitizeAttribute.length>0)&&(Q=Ye(Q)),B.uponSanitizeAttribute.length>0&&(tt=Ye(tt)),i.removed=[];const l=$t&&"string"!=typeof t&&Ni(t);let c=[];const d=At;if(l){h=t,ht&&ae(h,t=>{const e=$(t);if(e===ki||e===wi&&je(bi,t.data)){try{g(t)}catch(t){}return!1}if(e===yi){const e=t,i=Yt(A(t));try{e.hasAttribute&&e.hasAttribute("patchsrc")&&e.removeAttribute("patchsrc"),e.hasAttribute&&e.hasAttribute("for")&&be("for",i)&&e.removeAttribute("for")}catch(t){}}return!0});const e=A(t);if("string"==typeof e){const i=Yt(e);if(!Q[i]||st[i])throw se(t),Be("root node is forbidden and cannot be sanitized in-place")}if(Ii(t))throw se(t),Be("root node is clobbered and cannot be sanitized in-place");c=ce(t),At=Se()}else if(Ni(t))s=ve("\x3c!----\x3e"),n=s.ownerDocument.importNode(t,!0),n.nodeType===yi&&"BODY"===n.nodeName||"HTML"===n.nodeName?s=n:s.appendChild(n),Zi(s);else{if(!bt&&!dt&&!pt&&-1===t.indexOf("<"))return T&&xt?N(t):t;if(s=ve(t),!s)return bt?null:xt?E:""}var h;s&&ft&&ee(s.firstChild);const p=l?t:s;try{l&&Zi(t);const e=Fe(p);for(;a=e.nextNode();)Ui(a,p),Gi(a,p),Li(a.content)&&Yi(a.content);l&&function(t,e){const i=At;let s=null;const o=()=>(s||(s=Se(),xe(e,t=>{Ce(s,t)})),s);for(let e=0;;e++){const s=ce(t),n=[t];let a=!1;if(xe(s,t=>{$(t)===Ai?ke(n,t):a||Te(i,t)||(a=Te(o(),t))}),!a)return;if(e>=8)throw Be("the tree kept changing during in-place sanitization; refusing to return it");xe(n,(e,i)=>{fe(e,i>0,t,o())})}}(t,c)}catch(e){throw l&&(se(t),de(t,c)),e}finally{At=d}if(l){if(de(t,c))throw Be("a node selected for removal could not be safely returned; refusing to sanitize in place");return dt&&Ei(t),t}if(bt){if(dt&&Ei(s),vt)for(r=U.call(s.ownerDocument);s.firstChild;)r.appendChild(s.firstChild);else r=s;return(tt.shadowroot||tt.shadowrootmode)&&(r=j.call(o,r,!0)),r}let u=pt?s.outerHTML:s.innerHTML;return pt&&Q["!doctype"]&&s.ownerDocument&&s.ownerDocument.doctype&&s.ownerDocument.doctype.name&&je(gi,s.ownerDocument.doctype.name)&&(u="<!DOCTYPE "+s.ownerDocument.doctype.name+">\n"+u),dt&&(u=Ge(u)),T&&xt?N(u):u},i.setConfig=function(){Kt(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}),ut=!0,gt=Q,mt=tt},i.clearConfig=function(){Zt=null,ut=!1,gt=null,mt=null,T=z,E=""},i.isValidAttribute=function(t,e,i){Zt||Kt({});const s=Yt(t),o=Yt(e);return("string"!=typeof i||!(Wi(e,i)||!ct&&je(xi,i)))&&Hi(s,o,i)},i.addHook=function(t,e){"function"==typeof e&&Ue(B,t)&&ke(B[t],e)},i.removeHook=function(t,e){if(Ue(B,t)){if(void 0!==e){const i=ye(B[t],e);return-1===i?void 0:$e(B[t],i,1)[0]}return _e(B[t])}},i.removeHooks=function(t){Ue(B,t)&&(B[t]=[])},i.removeAllHooks=function(){B={afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},i}();function Ri(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ii={async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null};function Li(t){Ii=t}var Ni={exec:()=>null};function Pi(t,e=""){let i="string"==typeof t?t:t.source,s={replace:(t,e)=>{let o="string"==typeof e?e:e.source;return o=o.replace(Oi.caret,"$1"),i=i.replace(t,o),s},getRegex:()=>new RegExp(i,e)};return s}var Mi=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Oi={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[\t ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},Di=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ui=/(?:[*+-]|\d{1,9}[.)])/,Hi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ji=Pi(Hi).replace(/bull/g,Ui).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Bi=Pi(Hi).replace(/bull/g,Ui).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),qi=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Fi=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Wi=Pi(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Fi).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Gi=Pi(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ui).getRegex(),Yi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Zi=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Vi=Pi("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$))","i").replace("comment",Zi).replace("tag",Yi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Xi=Pi(qi).replace("hr",Di).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Yi).getRegex(),Ki={blockquote:Pi(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Xi).getRegex(),code:/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,def:Wi,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,hr:Di,html:Vi,lheading:ji,list:Gi,newline:/^(?:[ \t]*(?:\n|$))+/,paragraph:Xi,table:Ni,text:/^[^\n]+/},Qi=Pi("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Di).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}\t)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Yi).getRegex(),Ji={...Ki,lheading:Bi,table:Qi,paragraph:Pi(qi).replace("hr",Di).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Qi).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Yi).getRegex()},ts={...Ki,html:Pi("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",Zi).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Ni,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Pi(qi).replace("hr",Di).replace("heading"," *#{1,6} *[^\n]").replace("lheading",ji).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},es=/^( {2,}|\\)\n(?!\s*$)/,is=/[\p{P}\p{S}]/u,ss=/[\s\p{P}\p{S}]/u,os=/[^\s\p{P}\p{S}]/u,ns=Pi(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ss).getRegex(),as=/(?!~)[\p{P}\p{S}]/u,rs=Pi(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Mi?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ls=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,cs=Pi(ls,"u").replace(/punct/g,is).getRegex(),ds=Pi(ls,"u").replace(/punct/g,as).getRegex(),hs="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",ps=Pi(hs,"gu").replace(/notPunctSpace/g,os).replace(/punctSpace/g,ss).replace(/punct/g,is).getRegex(),us=Pi(hs,"gu").replace(/notPunctSpace/g,/(?:[^\s\p{P}\p{S}]|~)/u).replace(/punctSpace/g,/(?!~)[\s\p{P}\p{S}]/u).replace(/punct/g,as).getRegex(),gs=Pi("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,os).replace(/punctSpace/g,ss).replace(/punct/g,is).getRegex(),ms=Pi(/\\(punct)/,"gu").replace(/punct/g,is).getRegex(),fs=Pi(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),bs=Pi(Zi).replace("(?:--\x3e|$)","--\x3e").getRegex(),vs=Pi("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",bs).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),xs=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,ys=Pi(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",xs).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),_s=Pi(/^!?\[(label)\]\[(ref)\]/).replace("label",xs).replace("ref",Fi).getRegex(),ks=Pi(/^!?\[(ref)\](?:\[\])?/).replace("ref",Fi).getRegex(),ws=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,$s={_backpedal:Ni,anyPunctuation:ms,autolink:fs,blockSkip:rs,br:es,code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,del:Ni,emStrongLDelim:cs,emStrongRDelimAst:ps,emStrongRDelimUnd:gs,escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,link:ys,nolink:ks,punctuation:ns,reflink:_s,reflinkSearch:Pi("reflink|nolink(?!\\()","g").replace("reflink",_s).replace("nolink",ks).getRegex(),tag:vs,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,url:Ni},As={...$s,link:Pi(/^!?\[(label)\]\((.*?)\)/).replace("label",xs).getRegex(),reflink:Pi(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",xs).getRegex()},Ss={...$s,emStrongRDelimAst:us,emStrongLDelim:ds,url:Pi(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ws).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Pi(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ws).getRegex()},Cs={...Ss,br:Pi(es).replace("{2,}","*").getRegex(),text:Pi(Ss.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ts={normal:Ki,gfm:Ji,pedantic:ts},zs={normal:$s,gfm:Ss,breaks:Cs,pedantic:As},Es={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Rs=t=>Es[t];function Is(t,e){if(e){if(Oi.escapeTest.test(t))return t.replace(Oi.escapeReplace,Rs)}else if(Oi.escapeTestNoEncode.test(t))return t.replace(Oi.escapeReplaceNoEncode,Rs);return t}function Ls(t){try{t=encodeURI(t).replace(Oi.percentDecode,"%")}catch{return null}return t}function Ns(t,e){let i=t.replace(Oi.findPipe,(t,e,i)=>{let s=!1,o=e;for(;--o>=0&&"\\"===i[o];)s=!s;return s?"|":" |"}),s=i.split(Oi.splitPipe),o=0;if(s[0].trim()||s.shift(),s.length>0&&!s.at(-1)?.trim()&&s.pop(),e)if(s.length>e)s.splice(e);else for(;s.length<e;)s.push("");for(;o<s.length;o++)s[o]=s[o].trim().replace(Oi.slashPipe,"|");return s}function Ps(t,e,i){let s=t.length;if(0===s)return"";let o=0;for(;o<s;){if(t.charAt(s-o-1)!==e)break;o++}return t.slice(0,s-o)}function Ms(t,e,i,s,o){let n=e.href,a=e.title||null,r=t[1].replace(o.other.outputLinkReplace,"$1");s.state.inLink=!0;let l={type:"!"===t[0].charAt(0)?"image":"link",raw:i,href:n,title:a,text:r,tokens:s.inlineTokens(r)};return s.state.inLink=!1,l}var Os=class{options;rules;lexer;constructor(t){this.options=t||Ii}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let t=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?t:Ps(t,"\n")}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let t=e[0],i=function(t,e,i){let s=t.match(i.other.indentCodeCompensation);if(null===s)return e;let o=s[1];return e.split("\n").map(t=>{let e=t.match(i.other.beginningSpace);if(null===e)return t;let[s]=e;return s.length>=o.length?t.slice(o.length):t}).join("\n")}(t,e[3]||"",this.rules);return{type:"code",raw:t,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:i}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let t=e[2].trim();if(this.rules.other.endingHash.test(t)){let e=Ps(t,"#");(this.options.pedantic||!e||this.rules.other.endingSpaceChar.test(e))&&(t=e.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:t,tokens:this.lexer.inline(t)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:Ps(e[0],"\n")}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let t=Ps(e[0],"\n").split("\n"),i="",s="",o=[];for(;t.length>0;){let e,n=!1,a=[];for(e=0;e<t.length;e++)if(this.rules.other.blockquoteStart.test(t[e]))a.push(t[e]),n=!0;else{if(n)break;a.push(t[e])}t=t.slice(e);let r=a.join("\n"),l=r.replace(this.rules.other.blockquoteSetextReplace,"\n    $1").replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}\n${r}`:r,s=s?`${s}\n${l}`:l;let c=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(l,o,!0),this.lexer.state.top=c,0===t.length)break;let d=o.at(-1);if("code"===d?.type)break;if("blockquote"===d?.type){let e=d,n=e.raw+"\n"+t.join("\n"),a=this.blockquote(n);o[o.length-1]=a,i=i.substring(0,i.length-e.raw.length)+a.raw,s=s.substring(0,s.length-e.text.length)+a.text;break}if("list"===d?.type){let e=d,n=e.raw+"\n"+t.join("\n"),a=this.list(n);o[o.length-1]=a,i=i.substring(0,i.length-d.raw.length)+a.raw,s=s.substring(0,s.length-e.raw.length)+a.raw,t=n.substring(o.at(-1).raw.length).split("\n");continue}}return{type:"blockquote",raw:i,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let i=e[1].trim(),s=i.length>1,o={type:"list",raw:"",ordered:s,start:s?+i.slice(0,-1):"",loose:!1,items:[]};i=s?`\\d{1,9}\\${i.slice(-1)}`:`\\${i}`,this.options.pedantic&&(i=s?i:"[*+-]");let n=this.rules.other.listItemRegex(i),a=!1;for(;t;){let i=!1,s="",r="";if(!(e=n.exec(t))||this.rules.block.hr.test(t))break;s=e[0],t=t.substring(s.length);let l=e[2].split("\n",1)[0].replace(this.rules.other.listReplaceTabs,t=>" ".repeat(3*t.length)),c=t.split("\n",1)[0],d=!l.trim(),h=0;if(this.options.pedantic?(h=2,r=l.trimStart()):d?h=e[1].length+1:(h=e[2].search(this.rules.other.nonSpaceChar),h=h>4?1:h,r=l.slice(h),h+=e[1].length),d&&this.rules.other.blankLine.test(c)&&(s+=c+"\n",t=t.substring(c.length+1),i=!0),!i){let e=this.rules.other.nextBulletRegex(h),i=this.rules.other.hrRegex(h),o=this.rules.other.fencesBeginRegex(h),n=this.rules.other.headingBeginRegex(h),a=this.rules.other.htmlBeginRegex(h);for(;t;){let p,u=t.split("\n",1)[0];if(c=u,this.options.pedantic?(c=c.replace(this.rules.other.listReplaceNesting,"  "),p=c):p=c.replace(this.rules.other.tabCharGlobal,"    "),o.test(c)||n.test(c)||a.test(c)||e.test(c)||i.test(c))break;if(p.search(this.rules.other.nonSpaceChar)>=h||!c.trim())r+="\n"+p.slice(h);else{if(d||l.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||o.test(l)||n.test(l)||i.test(l))break;r+="\n"+c}!d&&!c.trim()&&(d=!0),s+=u+"\n",t=t.substring(u.length+1),l=p.slice(h)}}o.loose||(a?o.loose=!0:this.rules.other.doubleBlankLine.test(s)&&(a=!0));let p,u=null;this.options.gfm&&(u=this.rules.other.listIsTask.exec(r),u&&(p="[ ] "!==u[0],r=r.replace(this.rules.other.listReplaceTask,""))),o.items.push({type:"list_item",raw:s,task:!!u,checked:p,loose:!1,text:r,tokens:[]}),o.raw+=s}let r=o.items.at(-1);if(!r)return;r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd(),o.raw=o.raw.trimEnd();for(let t=0;t<o.items.length;t++)if(this.lexer.state.top=!1,o.items[t].tokens=this.lexer.blockTokens(o.items[t].text,[]),!o.loose){let e=o.items[t].tokens.filter(t=>"space"===t.type),i=e.length>0&&e.some(t=>this.rules.other.anyLine.test(t.raw));o.loose=i}if(o.loose)for(let t=0;t<o.items.length;t++)o.items[t].loose=!0;return o}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:"pre"===e[1]||"script"===e[1]||"style"===e[1],text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let t=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:t,raw:e[0],href:i,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let i=Ns(e[1]),s=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split("\n"):[],n={type:"table",raw:e[0],header:[],align:[],rows:[]};if(i.length===s.length){for(let t of s)this.rules.other.tableAlignRight.test(t)?n.align.push("right"):this.rules.other.tableAlignCenter.test(t)?n.align.push("center"):this.rules.other.tableAlignLeft.test(t)?n.align.push("left"):n.align.push(null);for(let t=0;t<i.length;t++)n.header.push({text:i[t],tokens:this.lexer.inline(i[t]),header:!0,align:n.align[t]});for(let t of o)n.rows.push(Ns(t,n.header.length).map((t,e)=>({text:t,tokens:this.lexer.inline(t),header:!1,align:n.align[e]})));return n}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:"="===e[2].charAt(0)?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let t="\n"===e[1].charAt(e[1].length-1)?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:t,tokens:this.lexer.inline(t)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let t=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(t)){if(!this.rules.other.endAngleBracket.test(t))return;let e=Ps(t.slice(0,-1),"\\");if((t.length-e.length)%2==0)return}else{let t=function(t,e){if(-1===t.indexOf(e[1]))return-1;let i=0;for(let s=0;s<t.length;s++)if("\\"===t[s])s++;else if(t[s]===e[0])i++;else if(t[s]===e[1]&&(i--,i<0))return s;return i>0?-2:-1}(e[2],"()");if(-2===t)return;if(t>-1){let i=(0===e[0].indexOf("!")?5:4)+e[1].length+t;e[2]=e[2].substring(0,t),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let i=e[2],s="";if(this.options.pedantic){let t=this.rules.other.pedanticHrefTitle.exec(i);t&&(i=t[1],s=t[3])}else s=e[3]?e[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(i=this.options.pedantic&&!this.rules.other.endAngleBracket.test(t)?i.slice(1):i.slice(1,-1)),Ms(e,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let i;if((i=this.rules.inline.reflink.exec(t))||(i=this.rules.inline.nolink.exec(t))){let t=e[(i[2]||i[1]).replace(this.rules.other.multipleSpaceGlobal," ").toLowerCase()];if(!t){let t=i[0].charAt(0);return{type:"text",raw:t,text:t}}return Ms(i,t,i[0],this.lexer,this.rules)}}emStrong(t,e,i=""){let s=this.rules.inline.emStrongLDelim.exec(t);if(!(!s||s[3]&&i.match(this.rules.other.unicodeAlphaNumeric))&&(!s[1]&&!s[2]||!i||this.rules.inline.punctuation.exec(i))){let i,o,n=[...s[0]].length-1,a=n,r=0,l="*"===s[0][0]?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(l.lastIndex=0,e=e.slice(-1*t.length+n);null!=(s=l.exec(e));){if(i=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!i)continue;if(o=[...i].length,s[3]||s[4]){a+=o;continue}if((s[5]||s[6])&&n%3&&!((n+o)%3)){r+=o;continue}if(a-=o,a>0)continue;o=Math.min(o,o+a+r);let e=[...s[0]][0].length,l=t.slice(0,n+s.index+e+o);if(Math.min(n,o)%2){let t=l.slice(1,-1);return{type:"em",raw:l,text:t,tokens:this.lexer.inlineTokens(t)}}let c=l.slice(2,-2);return{type:"strong",raw:l,text:c,tokens:this.lexer.inlineTokens(c)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let t=e[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(t),s=this.rules.other.startingSpaceChar.test(t)&&this.rules.other.endingSpaceChar.test(t);return i&&s&&(t=t.substring(1,t.length-1)),{type:"codespan",raw:e[0],text:t}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let t,i;return"@"===e[2]?(t=e[1],i="mailto:"+t):(t=e[1],i=t),{type:"link",raw:e[0],text:t,href:i,tokens:[{type:"text",raw:t,text:t}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let t,i;if("@"===e[2])t=e[0],i="mailto:"+t;else{let s;do{s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??""}while(s!==e[0]);t=e[0],i="www."===e[1]?"http://"+e[0]:e[0]}return{type:"link",raw:e[0],text:t,href:i,tokens:[{type:"text",raw:t,text:t}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let t=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:t}}}},Ds=class t{tokens;options;state;tokenizer;inlineQueue;constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Ii,this.options.tokenizer=this.options.tokenizer||new Os,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let e={other:Oi,block:Ts.normal,inline:zs.normal};this.options.pedantic?(e.block=Ts.pedantic,e.inline=zs.pedantic):this.options.gfm&&(e.block=Ts.gfm,this.options.breaks?e.inline=zs.breaks:e.inline=zs.gfm),this.tokenizer.rules=e}static get rules(){return{block:Ts,inline:zs}}static lex(e,i){return new t(i).lex(e)}static lexInline(e,i){return new t(i).inlineTokens(e)}lex(t){t=t.replace(Oi.carriageReturn,"\n"),this.blockTokens(t,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){let e=this.inlineQueue[t];this.inlineTokens(e.src,e.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,e=[],i=!1){for(this.options.pedantic&&(t=t.replace(Oi.tabCharGlobal,"    ").replace(Oi.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(i=>!!(s=i.call({lexer:this},t,e))&&(t=t.substring(s.raw.length),e.push(s),!0)))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let i=e.at(-1);1===s.raw.length&&void 0!==i?i.raw+="\n":e.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let i=e.at(-1);"paragraph"===i?.type||"text"===i?.type?(i.raw+=(i.raw.endsWith("\n")?"":"\n")+s.raw,i.text+="\n"+s.text,this.inlineQueue.at(-1).src=i.text):e.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),e.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),e.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),e.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),e.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),e.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),e.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let i=e.at(-1);"paragraph"===i?.type||"text"===i?.type?(i.raw+=(i.raw.endsWith("\n")?"":"\n")+s.raw,i.text+="\n"+s.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},e.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),e.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),e.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let e,i=1/0,s=t.slice(1);this.options.extensions.startBlock.forEach(t=>{e=t.call({lexer:this},s),"number"==typeof e&&e>=0&&(i=Math.min(i,e))}),i<1/0&&i>=0&&(o=t.substring(0,i+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let n=e.at(-1);i&&"paragraph"===n?.type?(n.raw+=(n.raw.endsWith("\n")?"":"\n")+s.raw,n.text+="\n"+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=n.text):e.push(s),i=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let i=e.at(-1);"text"===i?.type?(i.raw+=(i.raw.endsWith("\n")?"":"\n")+s.raw,i.text+="\n"+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):e.push(s);continue}if(t){let e="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(e);break}throw new Error(e)}}return this.state.top=!0,e}inline(t,e=[]){return this.inlineQueue.push({src:t,tokens:e}),e}inlineTokens(t,e=[]){let i,s=t,o=null;if(this.tokens.links){let t=Object.keys(this.tokens.links);if(t.length>0)for(;null!=(o=this.tokenizer.rules.inline.reflinkSearch.exec(s));)t.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!=(o=this.tokenizer.rules.inline.anyPunctuation.exec(s));)s=s.slice(0,o.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;null!=(o=this.tokenizer.rules.inline.blockSkip.exec(s));)i=o[2]?o[2].length:0,s=s.slice(0,o.index+i)+"["+"a".repeat(o[0].length-i-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);s=this.options.hooks?.emStrongMask?.call({lexer:this},s)??s;let n=!1,a="";for(;t;){let i;if(n||(a=""),n=!1,this.options.extensions?.inline?.some(s=>!!(i=s.call({lexer:this},t,e))&&(t=t.substring(i.raw.length),e.push(i),!0)))continue;if(i=this.tokenizer.escape(t)){t=t.substring(i.raw.length),e.push(i);continue}if(i=this.tokenizer.tag(t)){t=t.substring(i.raw.length),e.push(i);continue}if(i=this.tokenizer.link(t)){t=t.substring(i.raw.length),e.push(i);continue}if(i=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(i.raw.length);let s=e.at(-1);"text"===i.type&&"text"===s?.type?(s.raw+=i.raw,s.text+=i.text):e.push(i);continue}if(i=this.tokenizer.emStrong(t,s,a)){t=t.substring(i.raw.length),e.push(i);continue}if(i=this.tokenizer.codespan(t)){t=t.substring(i.raw.length),e.push(i);continue}if(i=this.tokenizer.br(t)){t=t.substring(i.raw.length),e.push(i);continue}if(i=this.tokenizer.del(t)){t=t.substring(i.raw.length),e.push(i);continue}if(i=this.tokenizer.autolink(t)){t=t.substring(i.raw.length),e.push(i);continue}if(!this.state.inLink&&(i=this.tokenizer.url(t))){t=t.substring(i.raw.length),e.push(i);continue}let o=t;if(this.options.extensions?.startInline){let e,i=1/0,s=t.slice(1);this.options.extensions.startInline.forEach(t=>{e=t.call({lexer:this},s),"number"==typeof e&&e>=0&&(i=Math.min(i,e))}),i<1/0&&i>=0&&(o=t.substring(0,i+1))}if(i=this.tokenizer.inlineText(o)){t=t.substring(i.raw.length),"_"!==i.raw.slice(-1)&&(a=i.raw.slice(-1)),n=!0;let s=e.at(-1);"text"===s?.type?(s.raw+=i.raw,s.text+=i.text):e.push(i);continue}if(t){let e="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(e);break}throw new Error(e)}}return e}},Us=class{options;parser;constructor(t){this.options=t||Ii}space(t){return""}code({text:t,lang:e,escaped:i}){let s=(e||"").match(Oi.notSpaceStart)?.[0],o=t.replace(Oi.endingNewline,"")+"\n";return s?'<pre><code class="language-'+Is(s)+'">'+(i?o:Is(o,!0))+"</code></pre>\n":"<pre><code>"+(i?o:Is(o,!0))+"</code></pre>\n"}blockquote({tokens:t}){return`<blockquote>\n${this.parser.parse(t)}</blockquote>\n`}html({text:t}){return t}def(t){return""}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>\n`}hr(t){return"<hr>\n"}list(t){let e=t.ordered,i=t.start,s="";for(let e=0;e<t.items.length;e++){let i=t.items[e];s+=this.listitem(i)}let o=e?"ol":"ul";return"<"+o+(e&&1!==i?' start="'+i+'"':"")+">\n"+s+"</"+o+">\n"}listitem(t){let e="";if(t.task){let i=this.checkbox({checked:!!t.checked});t.loose?"paragraph"===t.tokens[0]?.type?(t.tokens[0].text=i+" "+t.tokens[0].text,t.tokens[0].tokens&&t.tokens[0].tokens.length>0&&"text"===t.tokens[0].tokens[0].type&&(t.tokens[0].tokens[0].text=i+" "+Is(t.tokens[0].tokens[0].text),t.tokens[0].tokens[0].escaped=!0)):t.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):e+=i+" "}return e+=this.parser.parse(t.tokens,!!t.loose),`<li>${e}</li>\n`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>\n`}table(t){let e="",i="";for(let e=0;e<t.header.length;e++)i+=this.tablecell(t.header[e]);e+=this.tablerow({text:i});let s="";for(let e=0;e<t.rows.length;e++){let o=t.rows[e];i="";for(let t=0;t<o.length;t++)i+=this.tablecell(o[t]);s+=this.tablerow({text:i})}return s&&(s=`<tbody>${s}</tbody>`),"<table>\n<thead>\n"+e+"</thead>\n"+s+"</table>\n"}tablerow({text:t}){return`<tr>\n${t}</tr>\n`}tablecell(t){let e=this.parser.parseInline(t.tokens),i=t.header?"th":"td";return(t.align?`<${i} align="${t.align}">`:`<${i}>`)+e+`</${i}>\n`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${Is(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:i}){let s=this.parser.parseInline(i),o=Ls(t);if(null===o)return s;let n='<a href="'+(t=o)+'"';return e&&(n+=' title="'+Is(e)+'"'),n+=">"+s+"</a>",n}image({href:t,title:e,text:i,tokens:s}){s&&(i=this.parser.parseInline(s,this.parser.textRenderer));let o=Ls(t);if(null===o)return Is(i);let n=`<img src="${t=o}" alt="${i}"`;return e&&(n+=` title="${Is(e)}"`),n+=">",n}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:Is(t.text)}},Hs=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}},js=class t{options;renderer;textRenderer;constructor(t){this.options=t||Ii,this.options.renderer=this.options.renderer||new Us,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Hs}static parse(e,i){return new t(i).parse(e)}static parseInline(e,i){return new t(i).parseInline(e)}parse(t,e=!0){let i="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let t=o,e=this.options.extensions.renderers[t.type].call({parser:this},t);if(!1!==e||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(t.type)){i+=e||"";continue}}let n=o;switch(n.type){case"space":i+=this.renderer.space(n);continue;case"hr":i+=this.renderer.hr(n);continue;case"heading":i+=this.renderer.heading(n);continue;case"code":i+=this.renderer.code(n);continue;case"table":i+=this.renderer.table(n);continue;case"blockquote":i+=this.renderer.blockquote(n);continue;case"list":i+=this.renderer.list(n);continue;case"html":i+=this.renderer.html(n);continue;case"def":i+=this.renderer.def(n);continue;case"paragraph":i+=this.renderer.paragraph(n);continue;case"text":{let o=n,a=this.renderer.text(o);for(;s+1<t.length&&"text"===t[s+1].type;)o=t[++s],a+="\n"+this.renderer.text(o);i+=e?this.renderer.paragraph({type:"paragraph",raw:a,text:a,tokens:[{type:"text",raw:a,text:a,escaped:!0}]}):a;continue}default:{let t='Token with "'+n.type+'" type was not found.';if(this.options.silent)return console.error(t),"";throw new Error(t)}}}return i}parseInline(t,e=this.renderer){let i="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let t=this.options.extensions.renderers[o.type].call({parser:this},o);if(!1!==t||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){i+=t||"";continue}}let n=o;switch(n.type){case"escape":case"text":i+=e.text(n);break;case"html":i+=e.html(n);break;case"link":i+=e.link(n);break;case"image":i+=e.image(n);break;case"strong":i+=e.strong(n);break;case"em":i+=e.em(n);break;case"codespan":i+=e.codespan(n);break;case"br":i+=e.br(n);break;case"del":i+=e.del(n);break;default:{let t='Token with "'+n.type+'" type was not found.';if(this.options.silent)return console.error(t),"";throw new Error(t)}}}return i}},Bs=class{options;block;constructor(t){this.options=t||Ii}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?Ds.lex:Ds.lexInline}provideParser(){return this.block?js.parse:js.parseInline}},qs=class{defaults={async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null};options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=js;Renderer=Us;TextRenderer=Hs;Lexer=Ds;Tokenizer=Os;Hooks=Bs;constructor(...t){this.use(...t)}walkTokens(t,e){let i=[];for(let s of t)switch(i=i.concat(e.call(this,s)),s.type){case"table":{let t=s;for(let s of t.header)i=i.concat(this.walkTokens(s.tokens,e));for(let s of t.rows)for(let t of s)i=i.concat(this.walkTokens(t.tokens,e));break}case"list":{let t=s;i=i.concat(this.walkTokens(t.items,e));break}default:{let t=s;this.defaults.extensions?.childTokens?.[t.type]?this.defaults.extensions.childTokens[t.type].forEach(s=>{let o=t[s].flat(1/0);i=i.concat(this.walkTokens(o,e))}):t.tokens&&(i=i.concat(this.walkTokens(t.tokens,e)))}}return i}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(t=>{let i={...t};if(i.async=this.defaults.async||i.async||!1,t.extensions&&(t.extensions.forEach(t=>{if(!t.name)throw new Error("extension name required");if("renderer"in t){let i=e.renderers[t.name];e.renderers[t.name]=i?function(...e){let s=t.renderer.apply(this,e);return!1===s&&(s=i.apply(this,e)),s}:t.renderer}if("tokenizer"in t){if(!t.level||"block"!==t.level&&"inline"!==t.level)throw new Error("extension level must be 'block' or 'inline'");let i=e[t.level];i?i.unshift(t.tokenizer):e[t.level]=[t.tokenizer],t.start&&("block"===t.level?e.startBlock?e.startBlock.push(t.start):e.startBlock=[t.start]:"inline"===t.level&&(e.startInline?e.startInline.push(t.start):e.startInline=[t.start]))}"childTokens"in t&&t.childTokens&&(e.childTokens[t.name]=t.childTokens)}),i.extensions=e),t.renderer){let e=this.defaults.renderer||new Us(this.defaults);for(let i in t.renderer){if(!(i in e))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let s=i,o=t.renderer[s],n=e[s];e[s]=(...t)=>{let i=o.apply(e,t);return!1===i&&(i=n.apply(e,t)),i||""}}i.renderer=e}if(t.tokenizer){let e=this.defaults.tokenizer||new Os(this.defaults);for(let i in t.tokenizer){if(!(i in e))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let s=i,o=t.tokenizer[s],n=e[s];e[s]=(...t)=>{let i=o.apply(e,t);return!1===i&&(i=n.apply(e,t)),i}}i.tokenizer=e}if(t.hooks){let e=this.defaults.hooks||new Bs;for(let i in t.hooks){if(!(i in e))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let s=i,o=t.hooks[s],n=e[s];Bs.passThroughHooks.has(i)?e[s]=t=>{if(this.defaults.async&&Bs.passThroughHooksRespectAsync.has(i))return(async()=>{let i=await o.call(e,t);return n.call(e,i)})();let s=o.call(e,t);return n.call(e,s)}:e[s]=(...t)=>{if(this.defaults.async)return(async()=>{let i=await o.apply(e,t);return!1===i&&(i=await n.apply(e,t)),i})();let i=o.apply(e,t);return!1===i&&(i=n.apply(e,t)),i}}i.hooks=e}if(t.walkTokens){let e=this.defaults.walkTokens,s=t.walkTokens;i.walkTokens=function(t){let i=[];return i.push(s.call(this,t)),e&&(i=i.concat(e.call(this,t))),i}}this.defaults={...this.defaults,...i}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return Ds.lex(t,e??this.defaults)}parser(t,e){return js.parse(t,e??this.defaults)}parseMarkdown(t){return(e,i)=>{let s={...i},o={...this.defaults,...s},n=this.onError(!!o.silent,!!o.async);if(!0===this.defaults.async&&!1===s.async)return n(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||null===e)return n(new Error("marked(): input parameter is undefined or null"));if("string"!=typeof e)return n(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=t),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(e):e,s=await(o.hooks?await o.hooks.provideLexer():t?Ds.lex:Ds.lexInline)(i,o),n=o.hooks?await o.hooks.processAllTokens(s):s;o.walkTokens&&await Promise.all(this.walkTokens(n,o.walkTokens));let a=await(o.hooks?await o.hooks.provideParser():t?js.parse:js.parseInline)(n,o);return o.hooks?await o.hooks.postprocess(a):a})().catch(n);try{o.hooks&&(e=o.hooks.preprocess(e));let i=(o.hooks?o.hooks.provideLexer():t?Ds.lex:Ds.lexInline)(e,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let s=(o.hooks?o.hooks.provideParser():t?js.parse:js.parseInline)(i,o);return o.hooks&&(s=o.hooks.postprocess(s)),s}catch(t){return n(t)}}}onError(t,e){return i=>{if(i.message+="\nPlease report this to https://github.com/markedjs/marked.",t){let t="<p>An error occurred:</p><pre>"+Is(i.message+"",!0)+"</pre>";return e?Promise.resolve(t):t}if(e)return Promise.reject(i);throw i}}},Fs=new qs;function Ws(t,e){return Fs.parse(t,e)}Ws.options=Ws.setOptions=function(t){return Fs.setOptions(t),Ws.defaults=Fs.defaults,Li(Ws.defaults),Ws},Ws.getDefaults=Ri,Ws.defaults=Ii,Ws.use=function(...t){return Fs.use(...t),Ws.defaults=Fs.defaults,Li(Ws.defaults),Ws},Ws.walkTokens=function(t,e){return Fs.walkTokens(t,e)},Ws.parseInline=Fs.parseInline,Ws.Parser=js,Ws.parser=js.parse,Ws.Renderer=Us,Ws.TextRenderer=Hs,Ws.Lexer=Ds,Ws.lexer=Ds.lex,Ws.Tokenizer=Os,Ws.Hooks=Bs,Ws.parse=Ws,Ws.options,Ws.setOptions,Ws.use,Ws.walkTokens,Ws.parseInline,js.parse,Ds.lex;const Gs=new qs({gfm:!0,breaks:!1});function Ys(t){const e=Gs.parse(t,{async:!1});return Ei.sanitize(e,{FORBID_TAGS:["img","picture","source","style","form","input","button","select","textarea","svg","math"]})}Gs.use({renderer:{image:({href:t,title:e,text:i})=>`<a href="${t}"${e?` title="${e}"`:""}>${i||t}</a>`}}),Ei.addHook("afterSanitizeAttributes",t=>{"A"===t.tagName&&(t.setAttribute("target","_blank"),t.setAttribute("rel","noopener noreferrer"))});let Zs=class extends at{constructor(){super(...arguments),this.ticket=null,this.seenAt="",this.me="",this.isAdmin=!1,this.narrow=!1,this.navPos=null,this.language=void 0,this.agentName="claude",this.canAsk=!1,this.askName="AI",this.agentLabel="the AI",this.labelMap=new Map,this.people=new Map,this.categoryMap=new Map,this._expanded=!1,this._showHistory=!1,this._descCollapsed=!1,this._descFull=0,this._descSettle=0,this._agentToggle=null,this._priorityTo="",this._comment="",this._expandDescription=()=>{this._descCollapsed&&(this._setDescCollapsed(!1),this.renderRoot.querySelector(".scroll")?.scrollTo({top:0}))},this._scrollTo=null,this._titleKey=t=>{const e=t.target;"Enter"===t.key?(t.preventDefault(),e.blur()):"Escape"===t.key&&(e.value=this.ticket?.title??e.value,e.blur())},this._copied=!1}willUpdate(t){if(t.has("ticket")){this.toggleAttribute("open",!!this.ticket);const e=t.get("ticket"),i=e?.events.length??0;e?.id!==this.ticket?.id?(this._scrollTo="top",this._descCollapsed=!1,this._agentToggle=null,this._priorityTo="",this._expanded=!1,this._comment=""):(this.ticket?.agent_state&&!e?.agent_state||this.ticket&&this.ticket.events.length>i)&&(this._scrollTo="bottom")}}_onScroll(t){if(Date.now()<this._descSettle||this._descFull<=56)return;const e=t.currentTarget,i=e.scrollTop,s=e.scrollHeight-e.clientHeight-(this._descFull-56);!this._descCollapsed&&i>4&&s>40?this._setDescCollapsed(!0):this._descCollapsed&&i<=0&&this._setDescCollapsed(!1)}_setDescCollapsed(t){this._descCollapsed=t,this._descSettle=Date.now()+400}_fitTitle(t){t.style.height="auto",t.style.height=`${t.scrollHeight+(t.offsetHeight-t.clientHeight)}px`}_saveTitle(t){const e=t.value.replace(/\s+/g," ").trim();e&&e!==this.ticket?.title?this._patch({title:e}):t.value=this.ticket?.title??"",this._fitTitle(t)}connectedCallback(){super.connectedCallback(),this._resizer=new ResizeObserver(()=>{const t=this.renderRoot.querySelector("textarea.title-edit");t&&this._fitTitle(t)}),this._resizer.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._resizer?.disconnect()}updated(){const t=this.renderRoot.querySelector("textarea.title-edit");if(t&&this._fitTitle(t),!this._descCollapsed){const t=this.renderRoot.querySelector(".desc-sticky .card");this._descFull=t?t.offsetHeight:0}if(this._scrollTo){const t=this.renderRoot.querySelector(".scroll"),e=this._scrollTo;this._scrollTo=null,t?.scrollTo({top:"top"===e?0:t.scrollHeight,behavior:"top"===e?"auto":"smooth"})}}_fire(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}_patch(t){this._fire("patch-ticket",t)}_addLabelControl(t){return q`<button class="add-label" title="Add Label" aria-label="Add Label" aria-haspopup="listbox"
      @click=${e=>this.dispatchEvent(new CustomEvent("pick-label",{detail:{ticket:t,rect:e.currentTarget.getBoundingClientRect()},bubbles:!0,composed:!0}))}><ha-icon icon="mdi:plus"></ha-icon></button>`}_shownPriority(t){return this._priorityTo||t.priority}_togglePriority(t,e){const i=this._shownPriority(t)===e?"normal":e;this._priorityTo=i===t.priority?"":i}_priorityPills(t){const e=this._shownPriority(t),i={high:"mdi:alert-outline",urgent:"mdi:alert"};return q`<div class="assign prio-group" role="group" aria-label="Priority">
      ${["high","urgent"].map(s=>{const o=e===s;return q`<button class="prio-dot ${s} ${o?"on":""}"
          aria-pressed=${o?"true":"false"} aria-label=${xt[s]}
          title=${o?`Priority is ${xt[s]}. Click to clear.`:`Set priority to ${xt[s]}`}
          @click=${()=>this._togglePriority(t,s)}><ha-icon .icon=${i[s]}></ha-icon></button>`})}
    </div>`}_withAgent(t){return!!t.assignee&&kt(t.assignee)}_agentDefault(t){if(this._withAgent(t)||"resolved"===t.status||"closed"===t.status)return!1;const e=[...t.events].reverse().find(t=>"comment"===t.kind||"note"===t.kind);return!!e&&kt(e.actor)}_agentOn(t){return this._agentToggle??(this._withAgent(t)||this._agentDefault(t))}_agentApplies(t){return this._agentOn(t)!==this._withAgent(t)&&(null!==this._agentToggle||!!this._comment.trim())}_canSubmit(t){return!!this._comment.trim()||this._agentApplies(t)||!!this._priorityTo}_askChip(t){if(!this.canAsk||t.agent_state)return W;return q`<button class="assign-chip ask-chip" aria-label="Review with AI" title=${"Have the AI chosen in Settings review this ticket: what it thinks is going on and what to try. It can't change anything, it leaves Assign to AI Agent as it is, and it uses your AI plan."}
      @click=${()=>this._fire("ask-ai",{body:this._comment.trim(),done:()=>{this._comment="",this._agentToggle=null}})}>
      <ha-icon icon="mdi:star-four-points"></ha-icon><span>Review<span class="verb"> with AI</span></span></button>`}_agentChip(t){const e=this._agentOn(t),i=this._withAgent(t);return q`<button class="assign-chip ${i&&e?"current":""} ${e&&!i?"picked":""} ${i&&!e?"dropping":""}"
      aria-pressed=${e?"true":"false"} aria-label="Assign to AI Agent" title=${i?e?"Assigned to an AI agent. Click to take it off.":"It will be taken off the AI agent. Click to keep it.":e?"Will be assigned to an AI agent. Click to switch off.":"Assign this ticket to an AI agent you run yourself (your Claude CLI, Gemini Antigravity or anything else). Nothing is sent anywhere."}
      @click=${()=>this._agentToggle=!e}><ha-icon icon="mdi:creation"></ha-icon><span><span class="verb">Assign to </span>AI Agent</span></button>`}_submitLabel(t){const e=this._agentApplies(t),i=this._agentOn(t)?"Assign to AI Agent":"Unassign from AI Agent";return this._comment.trim()?e?`Comment and ${i}`:"Comment":e&&this._priorityTo?"Update":e?i:this._priorityTo?"Set Priority":"Comment"}_commentAndReopen(){const t=this._comment.trim();t&&(this._fire("comment",{body:t,internal:!1}),this._comment="",this._patch({status:"in_progress"}))}_submitComment(){const t=this.ticket;if(!t||!this._canSubmit(t))return;const e=this._comment.trim();e&&this._fire("comment",{body:e,internal:!1});const i={};this._agentApplies(t)&&(i.assignee=this._agentOn(t)?this.agentName:null),this._priorityTo&&(i.priority=this._priorityTo),Object.keys(i).length&&this._patch(i),this._comment="",this._agentToggle=null,this._priorityTo=""}_resolve(){const t=this._comment.trim();t?(this._fire("close-ticket",{resolution:t,status:"resolved"}),this._comment=""):this._patch({status:"resolved"})}_change(t){const e=t.data??{},i=t=>Array.isArray(t)?t.map(t=>"labels"===e.field?zt(this.labelMap,String(t)).name:String(t)).join(", ")||"none":null==t||""===t?"none":String(t);switch(t.kind){case"created":return"created this ticket";case"status":return`changed status from ${ft[e.from]??i(e.from)} to ${ft[e.to]??i(e.to)}`;case"priority":return`changed priority from ${i(e.from)} to ${i(e.to)}`;case"assignee":return e.to?`assigned this to ${kt(String(e.to))?"an AI Agent":(s=String(e.to),kt(s)?"AI":$t(s))}`:"took the AI Agent off this";case"link":return`linked ticket #${String(e.to)}`;case"merge":return e.from?`merged ticket #${String(e.from)} into this one`:`merged this into ticket #${String(e.into)}`;case"attachment":return`added ${String(e.to)}`;case"field":return"description"===e.field?"edited the description":`changed ${String(e.field)}${"labels"===e.field||"entities"===e.field?` to ${i(e.to)}`:""}`;default:return t.kind}var s}_detail(t){const e=t.data??{},i=t=>Array.isArray(t)?t.map(t=>"labels"===e.field?zt(this.labelMap,String(t)).name:String(t)).join(", ")||"none":null==t||""===t?"none":String(t);switch(t.kind){case"created":return{field:"Ticket Opened",to:"",icon:"mdi:ticket-outline",tone:"var(--st-accent)"};case"status":return{field:"Status",from:ft[e.from]??i(e.from),to:ft[e.to]??i(e.to),icon:"mdi:progress-check",tone:"resolved"===e.to||"closed"===e.to?"var(--st-success)":"var(--st-accent)"};case"priority":return{field:"Priority",from:i(e.from),to:i(e.to),icon:"mdi:flag-outline",tone:"var(--st-warning)"};case"assignee":return{field:"Assignee",from:i(e.from),to:i(e.to),icon:"mdi:account-outline",tone:"var(--st-fg-secondary)"};case"link":return{field:"Linked",to:`ticket #${String(e.to)}`,icon:"mdi:link-variant",tone:"var(--st-fg-secondary)"};case"merge":{const e=t.data??{};return e.from?{field:"Merged",to:`ticket #${e.from} into this one`,icon:"mdi:call-merge",tone:"var(--st-fg-secondary)"}:{field:"Merged",to:`into ticket #${String(e.into)}`,icon:"mdi:call-merge",tone:"var(--st-fg-secondary)"}}case"attachment":return{field:"Added",to:String(e.to),icon:"mdi:paperclip",tone:"var(--st-fg-secondary)"};case"field":{const t=String(e.field??"field"),s=t.charAt(0).toUpperCase()+t.slice(1),o="labels"===t?"mdi:label-outline":"category"===t?"mdi:shape-outline":"mdi:pencil-outline";return"description"===t?{field:s,to:"edited",icon:o,tone:"var(--st-fg-secondary)"}:{field:s,from:i(e.from),to:i(e.to),icon:o,tone:"var(--st-fg-secondary)"}}default:return{field:t.kind,to:"",icon:"mdi:circle-small",tone:"var(--st-fg-secondary)"}}}_avatar(t){const e=kt(t)?void 0:this.people.get($t(t).toLowerCase())?.picture;return e?q`<div class="avatar photo"><img src=${e} alt=${$t(t)} /></div>`:q`<div class="avatar"><ha-icon .icon=${function(t){const e=t.toLowerCase();return kt(t)?"mdi:creation":"ha"===e||"home assistant"===e?"mdi:home-assistant":"import"===e?"mdi:database-import-outline":"mdi:account-circle-outline"}(t)}></ha-icon></div>`}async _copyNumber(t){const e=`#${t}`;try{await navigator.clipboard.writeText(e)}catch{const t=document.createElement("textarea");t.value=e,t.style.cssText="position:fixed;opacity:0",document.body.appendChild(t),t.select();try{document.execCommand("copy")}finally{t.remove()}}this._copied=!0,window.setTimeout(()=>this._copied=!1,1500)}_isNew(t){return!!this.seenAt&&t.created_at>this.seenAt&&t.actor!==this.me}_workingComment(t){const e=t.agent_state,i=`ai:${e.agent}`;return q`<div class="ev working" role="status">
      ${this._avatar(i)}
      <div>
        <div class="who"><b>${It(i)}</b> · <span class="when">now</span></div>
        <div class="bubble">
          <ha-icon icon="mdi:star-four-points"></ha-icon>
          <span class="what">working on this${e.note?q` <span class="note">· ${e.note}</span>`:W}</span>
          ${this.isAdmin&&this.client?q`<button class="plain" @click=${()=>{this.client.stopAgent(t.id)}}>Stop</button>`:W}
        </div>
      </div>
    </div>`}_actionWords(t){switch(t.action){case"close":return q`<b>${"closed"===t.status?"Close":"Resolve"} this ticket</b><div class="p-sub">Resolution: “${t.resolution}”</div>`;case"set_priority":return q`Set the priority to <b>${xt[t.priority]??t.priority}</b>`;case"add_label":return q`Add the label <b>${t.label}</b>`;case"remove_label":return q`Remove the label <b>${t.label}</b>`;case"set_category":return q`Move it to the category <b>${t.category}</b>`}}_proposal(t){const e=t.data?.proposal;if(!e||!this.ticket)return W;const i=[...this.ticket.events].reverse().find(t=>t.data?.proposal)?.id===t.id,s="pending"===e.state&&i&&this.isAdmin,o=e=>this._fire("proposal",{eventId:t.id,action:e});return q`<div class="proposal">
      <div class="p-head"><ha-icon icon="mdi:star-four-points"></ha-icon>Proposed change${e.actions.length>1?"s":""}</div>
      <ul>${e.actions.map(t=>q`<li>${this._actionWords(t)}</li>`)}</ul>
      ${s?q`<div class="p-acts"><button class="primary" @click=${()=>o("apply")}>Apply</button><button @click=${()=>o("dismiss")}>Dismiss</button></div>`:q`<div class="p-state"><ha-icon .icon=${"applied"===e.state?"mdi:check":"mdi:close"}></ha-icon>${"applied"===e.state?`Applied by ${$t(e.by??"")}`:"dismissed"===e.state?`Dismissed by ${$t(e.by??"")}`:"Replaced by a newer reply"}</div>`}
    </div>`}_eventTemplate(t){const e=this._isNew(t),i=(s=t.created_at,o=this.language,new Date(s).toLocaleString(o,{dateStyle:"medium",timeStyle:"short"}));var s,o;const n=this._showHistory?q`<span title=${_t(t.created_at,this.language)}>${i}</span>`:q`<span title=${i}>${_t(t.created_at,this.language)}</span>`;if("comment"===t.kind||"note"===t.kind)return q`
        <div class="ev ${e?"new":""}">
          ${this._avatar(t.actor)}
          <div>
            <div class="who"><b title=${t.data?.review||t.data?.hints?"A review by the AI chosen in Settings, based only on what Home Desk sent it. It has not checked your home.":""}>${t.data?.review||t.data?.hints?It(t.actor):Et(t.actor)}</b> · <span class="when">${n}</span>${e?q`<span class="new-tag">New</span>`:W}${"note"===t.kind?q`<span class="label dense">internal note</span>`:W}${t.data?.merged_from?q`<span class="label dense" title="Copied here when a ticket was merged">from #${t.data.merged_from}</span>`:W}</div>
            <div class="bubble md ${"note"===t.kind?"note":""}">${Xt(Ys(t.body??""))}</div>
            ${this._proposal(t)}
          </div>
        </div>`;const a=this._detail(t);return q`
      <div class="ev system ${e?"new":""}">
        <ha-icon .icon=${a.icon}></ha-icon>
        <div class="line">
          <span><b>${a.field}</b> ${a.to}${void 0!==a.from?q`<s>${a.from}</s>`:W}</span>
          <span class="stamp">${e?q`<b class="new-text">New · </b>`:W}${Et(t.actor)} · ${i}</span>
        </div>
      </div>`}render(){const t=this.ticket;if(!t)return q`<div class="empty"><ha-icon icon="mdi:ticket-outline"></ha-icon><span>Select a ticket</span></div>`;const e=t.description.length>1800,i="resolved"===t.status||"closed"===t.status;return q`
      <div class="top">
        <div class="head ${this.isAdmin?"admin":""}">
          ${this.narrow?q`<button class="icon back" title="Back" aria-label="Back" @click=${()=>this._fire("back")}><ha-icon icon="mdi:arrow-left"></ha-icon></button>`:W}
          ${this.isAdmin?q`<textarea class="title-edit" rows="1" aria-label="Title" spellcheck="false" .value=${t.title}
                @input=${t=>this._fitTitle(t.target)}
                @keydown=${this._titleKey}
                @blur=${t=>this._saveTitle(t.target)}></textarea>`:q`<h1>${t.title}</h1>`}
          ${this.isAdmin?q`<button class="icon hist prev" title="Previous ticket" aria-label="Previous ticket" ?disabled=${!this.navPos||this.navPos.index<=0}
                @click=${()=>this._fire("nav-ticket",-1)}><ha-icon icon="mdi:chevron-up"></ha-icon></button>
              <button class="icon hist next" title=${this.navPos?`Next ticket (${this.navPos.index+1} of ${this.navPos.total})`:"Next ticket"} aria-label="Next ticket"
                ?disabled=${!this.navPos||this.navPos.index>=this.navPos.total-1}
                @click=${()=>this._fire("nav-ticket",1)}><ha-icon icon="mdi:chevron-down"></ha-icon></button>
              <button class="icon hist merge" title="Merge into another ticket" aria-label="Merge into another ticket"
                @click=${t=>this._fire("pick-merge",{rect:t.currentTarget.getBoundingClientRect()})}>
                <ha-icon icon="mdi:call-merge"></ha-icon></button>`:W}
          <button class="icon hist" aria-pressed=${this._showHistory?"true":"false"}
            title=${this._showHistory?"Hide history":"Show history"} aria-label="Show history"
            @click=${()=>this._showHistory=!this._showHistory}><ha-icon icon="mdi:history"></ha-icon></button>
        </div>
        <div class="sub">
          <div class="meta-line">
            <span>Opened ${_t(t.created_at,this.language)} by <ha-icon icon=${wt(t.requester)}></ha-icon> ${$t(t.requester)}</span>
            ${t.updated_by?q`<span>Updated ${_t(t.updated_at,this.language)} by <ha-icon icon=${wt(t.updated_by)}></ha-icon> ${$t(t.updated_by)}</span>`:W}
            ${t.assignee&&kt(t.assignee)?q`<span title="Assigned to an AI agent you run yourself (your own CLI or desktop app)"><ha-icon icon=${wt(t.assignee)}></ha-icon> With AI Agent</span>`:W}
            ${t.labels.includes(Mt)?q`<span class="blocked" title="Waiting on a person, a part or a fix"><ha-icon icon="mdi:timer-sand"></ha-icon> Blocked</span>`:W}
            ${t.comment_count?q`<span><ha-icon icon="mdi:comment-outline"></ha-icon> ${t.comment_count}</span>`:W}
          </div>
          <!-- Second line: the category, status and priority, then the labels (which wrap on to their own line if they don't fit). -->
          <div class="tag-line">
            <button class="num ${this._copied?"copied":""}" title=${this._copied?"Copied":"Copy the ticket number"} aria-label="Ticket ${t.id}: copy the number"
              @click=${()=>{this._copyNumber(t.id)}}>${this._copied?q`<ha-icon icon="mdi:check"></ha-icon>Copied`:q`#${t.id}`}</button>
            <st-ticket-tags show="category" .ticket=${t} .categoryMap=${this.categoryMap} .labelMap=${this.labelMap} .isAdmin=${this.isAdmin}></st-ticket-tags>
            <span class="status" style="--state: ${vt[t.status]}"><ha-icon .icon=${bt[t.status]}></ha-icon>${ft[t.status]}</span>
            ${"urgent"===t.priority||"high"===t.priority?q`<span class="prio ${t.priority}"><ha-icon .icon=${"urgent"===t.priority?"mdi:alert":"mdi:alert-outline"}></ha-icon>${xt[t.priority]}</span>`:W}
            <!-- The labels are one block: when they don't fit beside the category they drop to a line of their own. -->
            <st-ticket-tags show="labels" .ticket=${t} .categoryMap=${this.categoryMap} .labelMap=${this.labelMap} .isAdmin=${this.isAdmin} .maxBadges=${12} coloured expanded>
              ${this.isAdmin?this._addLabelControl(t):W}
            </st-ticket-tags>
          </div>
        </div>
      </div>
      <div class="scroll" @scroll=${this._onScroll}>
        <div class="wrap">
        ${t.description||t.attachments?.length?q`<div class="desc-sticky ${this._descCollapsed?"one":""}"
              role=${this._descCollapsed?"button":W} tabindex=${this._descCollapsed?0:W}
              aria-label=${this._descCollapsed?"Show the full description":W}
              @click=${this._expandDescription}
              @keydown=${t=>("Enter"===t.key||" "===t.key)&&this._descCollapsed&&(t.preventDefault(),this._expandDescription())}>
              <div class="card desc">
                ${t.description?q`<div class="md ${e&&!this._expanded?"clamp":""}">${Xt(Ys(t.description))}</div>`:W}
                ${t.attachments?.length&&this.client?q`<st-ticket-attachments class="attached" .client=${this.client} .ticketId=${t.id} .items=${t.attachments}></st-ticket-attachments>`:W}
                ${e?q`<button class="more" @click=${()=>this._expanded=!this._expanded}>${this._expanded?"Show Less":"Show All"}</button>`:W}
                <st-ticket-things class="about" .hass=${this.hass} .client=${this.client} .ticketId=${t.id} .editable=${this.isAdmin}
                  .entities=${t.entities} .devices=${t.devices??[]} .areas=${t.areas??[]} .canAsk=${this.canAsk} .askName=${this.askName} .agentLabel=${this.agentLabel}
                  @change=${t=>this._patch(t.detail)}></st-ticket-things>
              </div>
              <ha-icon class="pin-hint" icon="mdi:chevron-up"></ha-icon>
            </div>`:W}

        ${t.resolution?q`<div class="card resolution"><h3>Resolution</h3><div class="md">${Xt(Ys(t.resolution))}</div></div>`:W}

        ${t.related?.length?q`<div class="chips"><span class="sect">Related</span>${t.related.map(t=>q`<span class="chip link" title=${t.title} @click=${()=>this._fire("open-ticket",t.id)}>#${t.id} ${t.title.length>40?t.title.slice(0,40)+"…":t.title}</span>`)}</div>`:W}

        <div class="timeline" aria-live="polite" aria-relevant="additions">
          <h2>${this._showHistory?"Activity":"Comments"}</h2>
          ${t.events.filter(t=>this._showHistory||"comment"===t.kind||"note"===t.kind).map(t=>this._eventTemplate(t))}
          ${t.agent_state?this._workingComment(t):W}
          ${this._showHistory||t.agent_state||t.events.some(t=>"comment"===t.kind||"note"===t.kind)?W:q`<div class="none">No comments yet</div>`}
        </div>
      </div></div>

      <div class="dock">
        <div class="card composer">
          <textarea rows="2" placeholder="Add a comment" .value=${this._comment}
            @input=${t=>this._comment=t.target.value}></textarea>
          <div class="bar">
            <div class="opts">
              ${this.isAdmin?q`${this._agentChip(t)}${this._askChip(t)}
                    ${this._priorityPills(t)}`:W}
            </div>
            <div class="acts">
            ${this.isAdmin&&!i?q`<button title="Mark as resolved. Anything typed above is saved as the resolution." @click=${()=>this._resolve()}><ha-icon icon="mdi:check-circle-outline"></ha-icon>Resolve</button>`:W}
            ${this.isAdmin&&i?q`<button title="Move this ticket back to In Progress. Anything typed above is posted as a comment first." @click=${()=>this._comment.trim()?this._commentAndReopen():this._patch({status:"in_progress"})}><ha-icon icon="mdi:restore"></ha-icon>Reopen</button>`:W}
            <button class="primary" ?disabled=${!this._canSubmit(t)} @click=${this._submitComment}>${this._agentApplies(t)&&this._agentOn(t)?q`<ha-icon icon="mdi:creation"></ha-icon>`:W}${this._submitLabel(t)}</button>
            </div>
          </div>
        </div>
      </div>
    `}};Zs.styles=[ut,a`
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
      /* "Ask now" runs the AI straight away, which costs; "Assign to" only hands the ticket over for later. */
      .ask-chip {
        color: var(--st-accent);
        border-color: color-mix(in srgb, var(--st-accent) 50%, transparent);
      }
      .ask-chip:hover {
        color: var(--st-accent);
        background: color-mix(in srgb, var(--st-accent) 10%, transparent);
        border-color: var(--st-accent);
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
    `],t([dt({attribute:!1})],Zs.prototype,"ticket",void 0),t([dt({attribute:!1})],Zs.prototype,"client",void 0),t([dt()],Zs.prototype,"seenAt",void 0),t([dt()],Zs.prototype,"me",void 0),t([dt({type:Boolean})],Zs.prototype,"isAdmin",void 0),t([dt({type:Boolean})],Zs.prototype,"narrow",void 0),t([dt({attribute:!1})],Zs.prototype,"navPos",void 0),t([dt()],Zs.prototype,"language",void 0),t([dt()],Zs.prototype,"agentName",void 0),t([dt({attribute:!1})],Zs.prototype,"hass",void 0),t([dt({type:Boolean})],Zs.prototype,"canAsk",void 0),t([dt()],Zs.prototype,"askName",void 0),t([dt()],Zs.prototype,"agentLabel",void 0),t([dt({attribute:!1})],Zs.prototype,"labelMap",void 0),t([dt({attribute:!1})],Zs.prototype,"people",void 0),t([dt({attribute:!1})],Zs.prototype,"categoryMap",void 0),t([ht()],Zs.prototype,"_expanded",void 0),t([ht()],Zs.prototype,"_showHistory",void 0),t([ht()],Zs.prototype,"_descCollapsed",void 0),t([ht()],Zs.prototype,"_agentToggle",void 0),t([ht()],Zs.prototype,"_priorityTo",void 0),t([ht()],Zs.prototype,"_comment",void 0),t([ht()],Zs.prototype,"_copied",void 0),Zs=t([pt("st-ticket-detail")],Zs);const Vs=[{id:"bug",name:"Bug"},{id:"enhancement",name:"Enhancement"},{id:"question",name:"Question"},{id:"task",name:"Task",admin:!0}];let Xs=class extends at{constructor(){super(...arguments),this.isAdmin=!1,this.categories=[],this._category="",this._entities=[],this._devices=[],this._areas=[],this._title="",this._description="",this._kind="bug",this._priority="normal"}_fire(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}_submit(){this._title.trim()&&this._fire("create",{title:this._title.trim(),description:this._description,labels:[this._kind],priority:this._priority,...this.isAdmin&&this._category?{category:this._category}:{},...this.isAdmin&&this._entities.length?{entities:this._entities}:{},...this.isAdmin&&this._devices.length?{devices:this._devices}:{},...this.isAdmin&&this._areas.length?{areas:this._areas}:{}})}render(){return q`
      <div class="scrim" @click=${t=>t.target===t.currentTarget&&this._fire("close")}
        @keydown=${t=>"Escape"===t.key&&this._fire("close")}>
        <div class="dialog" role="dialog" aria-modal="true" aria-label="New Ticket">
          <h2>New Ticket</h2>
          <div class="field">
            <label for="title">Title</label>
            <input id="title" type="text" autofocus .value=${this._title}
              @input=${t=>this._title=t.target.value}
              @keydown=${t=>"Enter"===t.key&&this._submit()} />
          </div>
          <div class="field">
            <label for="desc">Description</label>
            <textarea id="desc" rows="6" .value=${this._description}
              @input=${t=>this._description=t.target.value}></textarea>
          </div>
          <div class="pair field">
            <div>
              <label for="kind">Kind</label>
              <select id="kind" .value=${this._kind}
                @change=${t=>this._kind=t.target.value}>
                ${Vs.filter(t=>!t.admin||this.isAdmin).map(t=>q`<option value=${t.id} ?selected=${t.id===this._kind}>${t.name}</option>`)}
              </select>
            </div>
            ${this.isAdmin?q`<div>
                  <label for="prio">Priority</label>
                  <select id="prio" .value=${this._priority}
                    @change=${t=>this._priority=t.target.value}>
                    ${Lt.filter(t=>"low"!==t).map(t=>q`<option value=${t} ?selected=${t===this._priority}>${xt[t]}</option>`)}
                  </select>
                </div>`:""}
          </div>
          ${this.isAdmin?q`<div class="field">
                <label for="cat">Category</label>
                <select id="cat" .value=${this._category}
                  @change=${t=>this._category=t.target.value}>
                  <option value="" ?selected=${!this._category}>No Category</option>
                  ${this.categories.map(t=>q`<option value=${t.id} ?selected=${t.id===this._category}>${t.name}</option>`)}
                </select>
              </div>`:""}
          ${this.isAdmin?q`<div class="field">
                <label>What is it about?</label>
                <st-ticket-things .hass=${this.hass} editable .entities=${this._entities} .devices=${this._devices} .areas=${this._areas}
                  @change=${t=>{this._entities=t.detail.entities,this._devices=t.detail.devices,this._areas=t.detail.areas}}></st-ticket-things>
              </div>`:""}
          <div class="actions">
            <button @click=${()=>this._fire("close")}>Cancel</button>
            <button class="primary" ?disabled=${!this._title.trim()} @click=${this._submit}>Create</button>
          </div>
        </div>
      </div>
    `}};Xs.styles=[ut,a`
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
    `],t([dt({type:Boolean})],Xs.prototype,"isAdmin",void 0),t([dt({attribute:!1})],Xs.prototype,"categories",void 0),t([dt({attribute:!1})],Xs.prototype,"hass",void 0),t([ht()],Xs.prototype,"_category",void 0),t([ht()],Xs.prototype,"_entities",void 0),t([ht()],Xs.prototype,"_devices",void 0),t([ht()],Xs.prototype,"_areas",void 0),t([ht()],Xs.prototype,"_title",void 0),t([ht()],Xs.prototype,"_description",void 0),t([ht()],Xs.prototype,"_kind",void 0),t([ht()],Xs.prototype,"_priority",void 0),Xs=t([pt("st-new-ticket-dialog")],Xs);let Ks=class extends at{constructor(){super(...arguments),this.labels=[],this._q="",this._draft=null,this._orig=null,this._shake=!1,this._toRemove=null,this._colorsOpen=!1,this._colorQ="",this._error=""}_fire(t){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0}))}_message(t){return String(t&&"object"==typeof t&&"message"in t?t.message:t)}get _shown(){const t=this._q.trim().toLowerCase();return t?this.labels.filter(e=>e.name.toLowerCase().includes(t)||e.description.toLowerCase().includes(t)):this.labels}_open(t){this._error="",this._colorsOpen=!1,this._draft=t?{id:t.id,name:t.name,icon:t.icon,color:t.color,description:t.description}:{id:null,name:"",icon:"",color:"",description:""},this._orig=this._draft}async _save(){const t=this._draft;if(t&&t.name.trim())try{t.id?await this.client.updateLabel(t.id,{name:t.name.trim(),icon:t.icon.trim(),description:t.description,...t.color?{color:t.color}:{}}):await this.client.createLabel({name:t.name.trim(),icon:t.icon.trim(),description:t.description,...t.color?{color:t.color}:{}}),this._draft=null,this._fire("labels-changed")}catch(t){this._error=this._message(t)}}_tryClose(){if(!this._toRemove)return this._dirty?(this._shake=!0,void window.setTimeout(()=>this._shake=!1,400)):void(this._draft=null)}get _dirty(){const t=this._draft,e=this._orig;return!(!t||!e)&&(t.name!==e.name||t.icon!==e.icon||t.color!==e.color||t.description!==e.description)}async _remove(){const t=this._toRemove;if(t)try{await this.client.deleteLabel(t.id),this._toRemove=null,this._draft=null,this._fire("labels-changed")}catch(t){this._toRemove=null,this._error=this._message(t)}}_row(t){return q`<div class="row ${t.builtin?"locked":""}" role="row"
      @click=${()=>!t.builtin&&this._open(t)}>
      <span class="ico"><ha-icon .icon=${t.icon||"mdi:label-outline"}></ha-icon></span>
      <span class="swatch" style="--c: ${St(t.color)}"></span>
      <div class="text">
        <div class="name">${t.name}</div>
        ${t.description?q`<div class="desc" title=${t.description}>${t.description}</div>`:W}
      </div>
      <span class="count">${t.count} ticket${1===t.count?"":"s"}</span>
      <span class="end" @click=${t=>t.stopPropagation()}>
        ${t.builtin?q`<ha-icon icon="mdi:lock-outline" title="Built in: can't be changed or deleted"></ha-icon>`:q`<button class="icon" title="Delete Label" aria-label="Delete ${t.name}" @click=${()=>this._toRemove=t}><ha-icon icon="mdi:delete-outline"></ha-icon></button>`}
      </span>
    </div>`}_dialog(t){const e=t.color?Tt(t.color):"",i=customElements.get("ha-icon-picker"),s=this._colorQ.trim().toLowerCase(),o=t.id?this._orig?.name??t.name:"New Label";return q`<div class="scrim" @click=${t=>t.target===t.currentTarget&&this._tryClose()}
      @keydown=${t=>"Escape"===t.key&&this._tryClose()}>
      <div class="dialog ${this._shake?"shake":""}" role="dialog" aria-modal="true" aria-label=${o}>
        <div class="dhead">
          <button class="icon" title="Close" @click=${()=>this._draft=null}><ha-icon icon="mdi:close"></ha-icon></button>
          <h2>${o}</h2>
        </div>
        <div class="field">
          <label for="ln">Name*</label>
          <input id="ln" type="text" autofocus .value=${t.name}
            @input=${e=>this._draft={...t,name:e.target.value}}
            @keydown=${t=>"Enter"===t.key&&void this._save()} />
        </div>
        ${i?q`<div class="field plain"><ha-icon-picker .label=${"Icon"} .value=${t.icon}
              @value-changed=${e=>this._draft={...t,icon:e.detail.value??""}}></ha-icon-picker></div>`:q`<div class="field lead">
              ${t.icon?q`<ha-icon class="lead-ico" .icon=${t.icon}></ha-icon>`:q`<span class="lead-ico"></span>`}
              <div class="body">
                <label for="li">Icon</label>
                <input id="li" type="text" .value=${t.icon}
                  @input=${e=>this._draft={...t,icon:e.target.value}} />
              </div>
              ${t.icon?q`<button class="icon clear" title="Clear" @click=${()=>this._draft={...t,icon:""}}><ha-icon icon="mdi:close"></ha-icon></button>`:W}
              <ha-icon class="caret" icon="mdi:menu-down"></ha-icon>
            </div>`}
        <div class="field lead">
          ${t.color?q`<span class="lead-ico"><span class="dot" style="--c: ${St(t.color)}"></span></span>`:q`<span class="lead-ico"></span>`}
          <button class="body pick" aria-haspopup="listbox" @click=${()=>{this._colorsOpen=!this._colorsOpen,this._colorQ=""}}>
            <label>Colour</label>
            <span class="val">${e}</span>
          </button>
          ${t.color&&!t.id?q`<button class="icon clear" title="Clear" @click=${()=>this._draft={...t,color:""}}><ha-icon icon="mdi:close"></ha-icon></button>`:W}
          <ha-icon class="caret" icon="mdi:menu-down"></ha-icon>
          ${this._colorsOpen?q`<div class="colors" role="listbox">
                <div class="csearch"><ha-icon icon="mdi:magnify"></ha-icon>
                  <input type="search" placeholder="Search" autofocus .value=${this._colorQ}
                    @input=${t=>this._colorQ=t.target.value} /></div>
                ${Nt.filter(t=>!s||Tt(t).toLowerCase().includes(s)).map(e=>q`<button class="opt ${e===t.color?"selected":""}" role="option"
                    @click=${()=>{this._draft={...t,color:e},this._colorsOpen=!1}}>
                    <span class="dot big" style="--c: ${St(e)}"></span>${Tt(e)}
                  </button>`)}
              </div>`:W}
        </div>
        <div class="field">
          <label for="ld">Description</label>
          <textarea id="ld" rows="3" .value=${t.description}
            @input=${e=>this._draft={...t,description:e.target.value}}></textarea>
        </div>
        ${this._error?q`<div class="error">${this._error}</div>`:W}
        <div class="dactions">
          ${t.id?q`<button class="textbtn danger" @click=${()=>this._toRemove=this.labels.find(e=>e.id===t.id)??null}>Delete</button>`:W}
          <span class="grow"></span>
          <button class="pill primary" ?disabled=${!t.name.trim()||null!==t.id&&!this._dirty} @click=${()=>{this._save()}}>${t.id?"Update":"Create"}</button>
        </div>
      </div>
    </div>`}_confirm(t){return q`<div class="scrim top" @click=${t=>t.target===t.currentTarget&&(this._toRemove=null)}
      @keydown=${t=>"Escape"===t.key&&(this._toRemove=null)}>
      <div class="dialog confirm" role="alertdialog" aria-modal="true" aria-label="Remove Label?">
        <h2>Remove Label?</h2>
        <p>Are you sure you want to remove label ${t.name}? ${t.count?`It will be removed from ${t.count} ticket${1===t.count?"":"s"}.`:"No tickets use it."}</p>
        <div class="dactions">
          <span class="grow"></span>
          <button class="textbtn" @click=${()=>this._toRemove=null}>Cancel</button>
          <button class="pill remove" @click=${()=>{this._remove()}}>Remove</button>
        </div>
      </div>
    </div>`}render(){const t=this._shown;return q`
      <div class="toolbar">
        <div class="search">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input type="search" placeholder="Search" aria-label="Search labels" .value=${this._q}
            @input=${t=>this._q=t.target.value} />
        </div>
      </div>
      <div class="list">
        <div class="head"><span></span><span></span><span>Name</span><span></span><span></span></div>
        ${t.length?t.map(t=>this._row(t)):q`<div class="empty">No labels match.</div>`}
        ${this._error&&!this._draft?q`<div class="error">${this._error}</div>`:W}
      </div>
      <button class="fab" @click=${()=>this._open(null)}><ha-icon icon="mdi:plus"></ha-icon>Create Label</button>
      ${this._draft?this._dialog(this._draft):W}
      ${this._toRemove?this._confirm(this._toRemove):W}
    `}};Ks.styles=[ut,a`
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
    `],t([dt({attribute:!1})],Ks.prototype,"client",void 0),t([dt({attribute:!1})],Ks.prototype,"labels",void 0),t([ht()],Ks.prototype,"_q",void 0),t([ht()],Ks.prototype,"_draft",void 0),t([ht()],Ks.prototype,"_orig",void 0),t([ht()],Ks.prototype,"_shake",void 0),t([ht()],Ks.prototype,"_toRemove",void 0),t([ht()],Ks.prototype,"_colorsOpen",void 0),t([ht()],Ks.prototype,"_colorQ",void 0),t([ht()],Ks.prototype,"_error",void 0),Ks=t([pt("st-label-manager")],Ks);let Qs=class extends at{constructor(){super(...arguments),this.categories=[],this._q="",this._draft=null,this._orig=null,this._shake=!1,this._toRemove=null,this._error=""}_fire(t){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0}))}_message(t){return String(t&&"object"==typeof t&&"message"in t?t.message:t)}get _shown(){const t=this._q.trim().toLowerCase();return t?this.categories.filter(e=>e.name.toLowerCase().includes(t)):this.categories}get _dirty(){const t=this._draft,e=this._orig;return!(!t||!e||t.name===e.name&&t.icon===e.icon)}_open(t){this._error="",this._draft=t?{id:t.id,name:t.name,icon:t.icon}:{id:null,name:"",icon:""},this._orig=this._draft}async _save(){const t=this._draft;if(t&&t.name.trim())try{const e={name:t.name.trim(),icon:t.icon.trim()};t.id?await this.client.updateCategory(t.id,e):await this.client.createCategory(e),this._draft=null,this._fire("categories-changed")}catch(t){this._error=this._message(t)}}_tryClose(){if(!this._toRemove)return this._dirty||this._draft&&!this._draft.id&&(this._draft.name||this._draft.icon)?(this._shake=!0,void window.setTimeout(()=>this._shake=!1,400)):void(this._draft=null)}async _remove(){const t=this._toRemove;if(t)try{await this.client.deleteCategory(t.id),this._toRemove=null,this._draft=null,this._fire("categories-changed")}catch(t){this._toRemove=null,this._error=this._message(t)}}_row(t){return q`<div class="row ${t.builtin?"locked":""}" role="row" @click=${()=>!t.builtin&&this._open(t)}>
      <span class="ico"><ha-icon .icon=${t.icon||"mdi:shape-outline"}></ha-icon></span>
      <div class="text"><div class="name">${t.name}</div></div>
      <span class="count">${t.count} ticket${1===t.count?"":"s"}</span>
      <span class="end" @click=${t=>t.stopPropagation()}>
        ${t.builtin?q`<ha-icon icon="mdi:lock-outline" title="Built in: can't be changed or deleted"></ha-icon>`:q`<button class="icon" title="Delete Category" aria-label="Delete ${t.name}" @click=${()=>this._toRemove=t}><ha-icon icon="mdi:delete-outline"></ha-icon></button>`}
      </span>
    </div>`}_dialog(t){const e=customElements.get("ha-icon-picker"),i=t.id?this._orig?.name??t.name:"New Category";return q`<div class="scrim" @click=${t=>t.target===t.currentTarget&&this._tryClose()}
      @keydown=${t=>"Escape"===t.key&&this._tryClose()}>
      <div class="dialog ${this._shake?"shake":""}" role="dialog" aria-modal="true" aria-label=${i}>
        <div class="dhead">
          <button class="icon" title="Close" @click=${()=>this._draft=null}><ha-icon icon="mdi:close"></ha-icon></button>
          <h2>${i}</h2>
        </div>
        <div class="field">
          <label for="cn">Name*</label>
          <input id="cn" type="text" autofocus .value=${t.name}
            @input=${e=>this._draft={...t,name:e.target.value}}
            @keydown=${t=>"Enter"===t.key&&void this._save()} />
        </div>
        ${e?q`<div class="field plain"><ha-icon-picker .label=${"Icon"} .value=${t.icon}
              @value-changed=${e=>this._draft={...t,icon:e.detail.value??""}}></ha-icon-picker></div>`:q`<div class="field lead">
              ${t.icon?q`<ha-icon class="lead-ico" .icon=${t.icon}></ha-icon>`:q`<span class="lead-ico"></span>`}
              <div class="body">
                <label for="ci">Icon</label>
                <input id="ci" type="text" placeholder="mdi:lan" .value=${t.icon}
                  @input=${e=>this._draft={...t,icon:e.target.value}} />
              </div>
              ${t.icon?q`<button class="icon clear" title="Clear" @click=${()=>this._draft={...t,icon:""}}><ha-icon icon="mdi:close"></ha-icon></button>`:W}
              <ha-icon class="caret" icon="mdi:menu-down"></ha-icon>
            </div>`}
        ${this._error?q`<div class="error">${this._error}</div>`:W}
        <div class="dactions">
          ${t.id?q`<button class="textbtn danger" @click=${()=>this._toRemove=this.categories.find(e=>e.id===t.id)??null}>Delete</button>`:W}
          <span class="grow"></span>
          <button class="pill primary" ?disabled=${!t.name.trim()||null!==t.id&&!this._dirty} @click=${()=>{this._save()}}>${t.id?"Update":"Create"}</button>
        </div>
      </div>
    </div>`}_confirm(t){return q`<div class="scrim top" @click=${t=>t.target===t.currentTarget&&(this._toRemove=null)}
      @keydown=${t=>"Escape"===t.key&&(this._toRemove=null)}>
      <div class="dialog confirm" role="alertdialog" aria-modal="true" aria-label="Remove Category?">
        <h2>Remove Category?</h2>
        <p>Are you sure you want to remove category ${t.name}? ${t.count?`${t.count} ticket${1===t.count?"":"s"} will have no category.`:"No tickets use it."}</p>
        <div class="dactions">
          <span class="grow"></span>
          <button class="textbtn" @click=${()=>this._toRemove=null}>Cancel</button>
          <button class="pill remove" @click=${()=>{this._remove()}}>Remove</button>
        </div>
      </div>
    </div>`}render(){const t=this._shown;return q`
      <div class="toolbar">
        <div class="search">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input type="search" placeholder="Search" aria-label="Search categories" .value=${this._q}
            @input=${t=>this._q=t.target.value} />
        </div>
      </div>
      <div class="list">
        <div class="head"><span></span><span>Name</span><span></span><span></span></div>
        ${t.length?t.map(t=>this._row(t)):q`<div class="empty">No categories match.</div>`}
        ${this._error&&!this._draft?q`<div class="error">${this._error}</div>`:W}
      </div>
      <button class="fab" @click=${()=>this._open(null)}><ha-icon icon="mdi:plus"></ha-icon>Create Category</button>
      ${this._draft?this._dialog(this._draft):W}
      ${this._toRemove?this._confirm(this._toRemove):W}
    `}};Qs.styles=[ut,a`
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
    `],t([dt({attribute:!1})],Qs.prototype,"client",void 0),t([dt({attribute:!1})],Qs.prototype,"categories",void 0),t([ht()],Qs.prototype,"_q",void 0),t([ht()],Qs.prototype,"_draft",void 0),t([ht()],Qs.prototype,"_orig",void 0),t([ht()],Qs.prototype,"_shake",void 0),t([ht()],Qs.prototype,"_toRemove",void 0),t([ht()],Qs.prototype,"_error",void 0),Qs=t([pt("st-category-manager")],Qs);let Js=class extends at{constructor(){super(...arguments),this.heading="",this.body="",this.confirmLabel="Confirm",this.danger=!1}_fire(t){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0}))}firstUpdated(){this.renderRoot.querySelector("button.primary")?.focus()}render(){return q`<div class="scrim" @click=${t=>t.target===t.currentTarget&&this._fire("cancel")}
      @keydown=${t=>"Escape"===t.key&&this._fire("cancel")}>
      <div class="dialog" role="alertdialog" aria-modal="true" aria-label=${this.heading}>
        <h2>${this.heading}</h2>
        <p>${this.body}</p>
        <div class="actions">
          <button @click=${()=>this._fire("cancel")}>Cancel</button>
          <button class="primary ${this.danger?"danger":""}" @click=${()=>this._fire("confirm")}>${this.confirmLabel}</button>
        </div>
      </div>
    </div>`}};Js.styles=[ut,a`
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
    `],t([dt()],Js.prototype,"heading",void 0),t([dt()],Js.prototype,"body",void 0),t([dt()],Js.prototype,"confirmLabel",void 0),t([dt({type:Boolean})],Js.prototype,"danger",void 0),Js=t([pt("st-confirm-dialog")],Js);const to=[{id:"immediately",label:"Straight away"},{id:"1h",label:"After 1 hour"},{id:"6h",label:"After 6 hours"},{id:"1d",label:"After 1 day"},{id:"3d",label:"After 3 days"},{id:"7d",label:"After 7 days"},{id:"14d",label:"After 14 days"},{id:"30d",label:"After 30 days"},{id:"never",label:"Never"}];let eo=class extends at{constructor(){super(...arguments),this._s=null,this._error="",this._test=null,this._confirmTest=!1}async _runTest(){this._test={busy:!0};try{this._test={busy:!1,reply:(await this.client.testAgent()).reply}}catch(t){const e=String(t&&"object"==typeof t&&"message"in t?t.message:t);this._test={busy:!1,error:e}}}async connectedCallback(){super.connectedCallback(),this._s=await this.client.settings()}async _save(t){const e=this._s;if(e){this._s={...e,...t,notify:{...e.notify,...t.notify}};try{this._s=await this.client.saveSettings(t),this._error="",this.dispatchEvent(new CustomEvent("settings-changed",{detail:this._s,bubbles:!0,composed:!0}))}catch{this._error="Couldn't save that. These options need the newer Home Desk integration.",this._s=e}}}_targetName(t){if("persistent_notification"===t)return"Home Assistant notifications (the bell)";const e=t.startsWith("mobile_app_"),i=t.replace(/^mobile_app_/,"").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase());return e?`${i} (mobile app)`:i}get _targets(){const t=Object.keys(this.hass.services?.notify??{}),e=this._s?.notify.targets??[];return[...new Set([...t,...e])].filter(t=>"notify"!==t).sort()}get _agents(){return Object.entries(this.hass.states??{}).filter(([t])=>t.startsWith("ai_task.")||t.startsWith("conversation.")).map(([t,e])=>({id:t,label:String(e.attributes.friendly_name??t)})).sort((t,e)=>t.label.localeCompare(e.label))}get _engines(){return Object.entries(this.hass.states??{}).filter(([t])=>t.startsWith("stt.")).map(([t,e])=>({id:t,label:String(e.attributes.friendly_name??t)})).sort((t,e)=>t.label.localeCompare(e.label))}_switch(t,e,i){return q`<button class="switch" role="switch" aria-checked=${t?"true":"false"} aria-label=${e}
      @click=${()=>i(!t)}></button>`}_toggleTarget(t){const e=this._s;if(!e)return;const i=e.notify.targets.includes(t);this._save({notify:{targets:i?e.notify.targets.filter(e=>e!==t):[...e.notify.targets,t]}})}render(){const t=this._s;if(!t)return q`<div class="page"><p class="help">Loading…</p></div>`;const e=[{id:"",label:"None"},...this._agents];return q`<div class="page">
      ${this._error?q`<div class="error">${this._error}</div>`:W}

      <div class="card">
        <h2>Tickets</h2>
        <div class="srow">
          <div class="text">
            <div class="name">Close resolved tickets</div>
            <div class="desc">A resolved ticket closes by itself after this long. A new comment on it can reopen it first.</div>
          </div>
          <st-dropdown plain field label="Close resolved tickets" .value=${t.auto_close} .options=${to}
            @change=${t=>{this._save({auto_close:t.detail})}}></st-dropdown>
        </div>
        <div class="srow">
          <div class="text">
            <div class="name">Tickets from Repairs</div>
            <div class="desc">Raise a ticket for each Home Assistant repair, and resolve it when the repair clears.</div>
          </div>
          ${this._switch(t.repairs,"Tickets from Repairs",t=>{this._save({repairs:t})})}
        </div>
      </div>

      <div class="card">
        <h2>Voice messages</h2>
        <div class="srow">
          <div class="text">
            <div class="name">Write out voice messages</div>
            <div class="desc">A voice message sent with a report is turned into text on the ticket, using Home Assistant's speech-to-text. The recording is kept either way.</div>
          </div>
          ${this._switch(t.transcribe,"Write out voice messages",t=>{this._save({transcribe:t})})}
        </div>
        <div class="srow">
          <div class="text">
            <div class="name">Speech-to-text</div>
            <div class="desc">Which engine listens. The default is the one your Assist setup uses.</div>
          </div>
          <st-dropdown plain field label="Speech-to-text" .value=${t.stt} .options=${[{id:"",label:"Assist default"},...this._engines]}
            @change=${t=>{this._save({stt:t.detail})}}></st-dropdown>
        </div>
      </div>

      <div class="card">
        <h2>AI review</h2>
        <div class="srow">
          <div class="text">
            <div class="name">AI for review</div>
            <div class="desc">Which AI set up in Home Assistant answers <b>Review with AI</b> on a ticket: what it thinks is going on and what to try. It can't change anything. <b>Assign to AI Agent</b> is separate: that only assigns the ticket to an AI agent you run yourself (such as your Claude CLI or Gemini Antigravity) and sends nothing anywhere.</div>
          </div>
          <st-dropdown plain field label="AI for review" .value=${t.agent} .options=${e}
            @change=${t=>{this._save({agent:t.detail})}}></st-dropdown>
        </div>
        ${t.agent&&!t.agent.startsWith("ai_task.")?q`<div class="note">Review with AI needs an <b>AI Task</b>. A conversation agent can't be used for it.</div>`:W}
        <div class="srow">
          <div class="text">
            <div class="name">Daily limit</div>
            <div class="desc">The most reviews in a day, so a busy day can't run up your AI plan.</div>
          </div>
          <st-dropdown plain field label="Daily limit" .value=${String(t.agent_daily_cap)}
            .options=${[...new Set([10,30,100,300,t.agent_daily_cap])].sort((t,e)=>t-e).map(t=>({id:String(t),label:`${t} requests a day`}))}
            @change=${t=>{this._save({agent_daily_cap:Number(t.detail)})}}></st-dropdown>
        </div>
        <div class="srow">
          <div class="text">
            <div class="name">Test the AI</div>
            <div class="desc">Sends a harmless question, with nothing from your home, to check it answers.</div>
          </div>
          <button class="tbtn" ?disabled=${!t.agent||this._test?.busy} @click=${()=>this._confirmTest=!0}>${this._test?.busy?"Asking…":"Test"}</button>
        </div>
        ${this._test?.reply?q`<div class="test-out">${this._test.reply}</div>`:W}
        ${this._test?.error?q`<div class="test-out bad">${this._test.error}</div>`:W}
      </div>

      <div class="card">
        <h2>What the AI is sent for a review</h2>
        <p class="help">The ticket and its comments are always sent. Everything sent goes to your AI provider, with passwords, keys, coordinates and email addresses taken out first.</p>
        <div class="srow">
          <div class="text"><div class="name">Entity states</div><div class="desc">The state, attributes and last day of changes of the entities a ticket names.</div></div>
          ${this._switch(t.agent_states,"Entity states",t=>{this._save({agent_states:t})})}
        </div>
        <div class="srow">
          <div class="text"><div class="name">Automation and script configuration</div><div class="desc">The configuration of any automation or script a ticket names.</div></div>
          ${this._switch(t.agent_config,"Automation and script configuration",t=>{this._save({agent_config:t})})}
        </div>
        <div class="srow">
          <div class="text"><div class="name">Related tickets</div><div class="desc">Linked tickets and ones about the same entities, with how they were resolved.</div></div>
          ${this._switch(t.agent_related,"Related tickets",t=>{this._save({agent_related:t})})}
        </div>
      </div>

      <div class="card">
        <h2>Review instructions</h2>
        <p class="help">What Review with AI tells the AI about its job and how to write. ${t.agent_prompt?"You have changed it from the default.":"This is the default."} Home Desk adds the ticket, its comments and what you allowed above after your text, along with the part shown below, which it needs to read proposed changes and can't be edited.</p>
        <div class="prompt-edit">
          <textarea rows="18" aria-label="Review instructions" spellcheck="false" maxlength="6000"
            .value=${t.agent_prompt||t.agent_prompt_default}
            @change=${t=>{this._save({agent_prompt:t.target.value})}}></textarea>
          <div class="prompt-acts">
            <button class="tbtn" ?disabled=${!t.agent_prompt} @click=${()=>{this._save({agent_prompt:""})}}>Reset to default</button>
          </div>
        </div>
        <details class="fixed">
          <summary>Always added after your text</summary>
          <pre>${t.agent_prompt_fixed}</pre>
        </details>
      </div>

      <div class="card">
        <h2>Notifications</h2>
        <p class="help">These are your own settings. Each manager chooses where their notifications go and what they hear about.</p>
        <div class="sub">Notify me when</div>
        <div class="srow">
          <div class="text"><div class="name">A new ticket is raised</div><div class="desc">From a household member, an AI agent or a repair.</div></div>
          ${this._switch(t.notify.new_ticket,"New ticket raised",t=>{this._save({notify:{new_ticket:t}})})}
        </div>
        <div class="srow">
          <div class="text"><div class="name">Someone else comments</div><div class="desc">Including the AI Agent replying to a ticket.</div></div>
          ${this._switch(t.notify.comment,"Someone else comments",t=>{this._save({notify:{comment:t}})})}
        </div>
        <div class="srow">
          <div class="text"><div class="name">A ticket is resolved</div></div>
          ${this._switch(t.notify.resolved,"A ticket is resolved",t=>{this._save({notify:{resolved:t}})})}
        </div>
      </div>
      <div class="card">
        <h2>Send notifications to</h2>
        ${this._targets.length?this._targets.map(e=>q`<label class="srow pick">
                <input class="check" type="checkbox" .checked=${t.notify.targets.includes(e)} @change=${()=>this._toggleTarget(e)} />
                <div class="text"><div class="name">${this._targetName(e)}</div></div>
              </label>`):q`<div class="note">Home Assistant has no notify services yet. Install the Companion app on a phone to get one.</div>`}
      </div>
      ${this._confirmTest?q`<st-confirm-dialog heading="Use your AI plan?" confirmLabel="Yes, test it"
            body="This sends one short question, with nothing from your home, to the AI Agent. It uses a very small amount of your AI plan."
            @cancel=${()=>this._confirmTest=!1}
            @confirm=${()=>{this._confirmTest=!1,this._runTest()}}></st-confirm-dialog>`:W}
    </div>`}};eo.styles=[ut,a`
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
    `],t([dt({attribute:!1})],eo.prototype,"client",void 0),t([dt({attribute:!1})],eo.prototype,"hass",void 0),t([ht()],eo.prototype,"_s",void 0),t([ht()],eo.prototype,"_error",void 0),t([ht()],eo.prototype,"_test",void 0),t([ht()],eo.prototype,"_confirmTest",void 0),eo=t([pt("st-settings")],eo);const io={report:"Report",labels:"Labels",categories:"Categories",settings:"Settings"};let so=class extends at{constructor(){super(...arguments),this.page="",this.view="active",this.tickets=[],this.narrow=!1,this.admin=!1,this._menuOpen=!1}_fire(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}_choose(t){this._menuOpen=!1,this._fire("page-change",t)}render(){return q`
      <div class="bar">
        <div class="side ${this.page?"wide":""}">
          ${this.page?q`<button class="icon" title="Back" aria-label="Back" @click=${()=>this._choose("")}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
                <h1 class="crumb">${io[this.page]}</h1>`:q`${this.narrow?q`<button class="icon" title="Menu" @click=${()=>this._fire("hass-toggle-menu")}><ha-icon icon="mdi:menu"></ha-icon></button>`:W}
              <h1><button class="brand" title="Home" aria-label="Home Desk home" @click=${()=>this._fire("go-home")}><svg class="mark" viewBox="0 0 74.05 74.05" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M72.35 14.77 72.79 13.97 72.97 13.55 73.25 12.67 73.41 11.77 73.45 10.86 73.37 9.95 73.17 9.05 72.86 8.19 72.66 7.78 72.19 7 71.61 6.28 71.29 5.95 70.59 5.36 69.82 4.87 68.99 4.49 68.12 4.21 67.21 4.05 66.30 4.01 65.84 4.03 64.94 4.17 64.06 4.43 63.63 4.60 62.82 5.02 62.07 5.55 61.72 5.85 61.09 6.51 51.94 18.96 62.51 28.21ZM35.60 4.81 34.89 4.47 34.15 4.21 33.38 4.06 32.60 4.01 32.21 4.02 31.43 4.13 31.05 4.21 30.31 4.47 29.60 4.81 28.95 5.25 2.65 28.25 2.09 28.80 1.84 29.10 1.41 29.76 1.22 30.10 0.92 30.83 0.72 31.59 0.61 32.37 0.60 32.76 0.61 64.43 0.72 65.21 0.92 65.97 1.22 66.69 1.61 67.37 2.09 67.99 2.64 68.55 3.27 69.03 3.95 69.42 4.67 69.72 5.05 69.83 5.82 69.99 6.60 70.04 58.99 70.03 59.77 69.92 60.53 69.72 61.25 69.42 61.93 69.03 62.56 68.55 63.11 67.99 63.59 67.37 63.98 66.69 64.28 65.97 64.40 65.59 64.55 64.82 64.60 64.04 64.59 32.37 64.48 31.59 64.40 31.21 64.28 30.83 63.98 30.10 63.79 29.76 63.36 29.10 62.84 28.51 62.51 28.21 38.24 61.28 37.96 61.64 37.65 61.99 37.31 62.31 36.96 62.61 36.59 62.89 36.20 63.14 35.79 63.37 35.37 63.57 34.94 63.73 34.50 63.88 34.05 63.99 33.59 64.07 33.13 64.12 32.67 64.14 32.21 64.13 31.74 64.09 31.29 64.01 30.83 63.91 30.39 63.78 29.95 63.62 29.53 63.43 29.12 63.21 28.73 62.97 28.35 62.70 27.99 62.41 27.65 62.09 13.65 48.09 13.05 47.40 12.78 47.03 12.32 46.23 11.97 45.39 11.84 44.95 11.66 44.05 11.60 43.14 11.66 42.22 11.84 41.33 12.13 40.46 12.54 39.64 13.05 38.88 13.65 38.19 14.34 37.58 15.10 37.08 15.92 36.67 16.79 36.38 17.69 36.20 18.60 36.14 19.51 36.20 19.97 36.27 20.85 36.51 21.28 36.67 22.10 37.08 22.86 37.58 23.55 38.19 31.78 46.42 51.94 18.96 36.55 5.50 35.93 5.02ZM24.55 23.25 25.30 22.93 26.05 22.57 26.83 22.11 27.58 21.60 28.28 21.04 28.98 20.40 29.60 19.72 30.18 19 30.69 18.25 31.12 17.51 31.50 16.74 31.81 15.99 32.03 15.33 32.10 15.19 32.21 15.08 32.34 14.99 32.48 14.94 32.64 14.93 32.79 14.96 32.93 15.03 33.02 15.10 33.12 15.23 33.39 15.99 33.70 16.74 34.08 17.51 34.53 18.27 35.04 19.02 35.60 19.72 36.22 20.40 36.92 21.04 37.64 21.61 38.39 22.12 39.13 22.56 39.90 22.93 40.65 23.25 41.30 23.47 41.44 23.54 41.56 23.64 41.65 23.77 41.70 23.92 41.71 24.08 41.68 24.23 41.63 24.34 41.53 24.46 41.41 24.56 40.65 24.83 39.90 25.14 39.13 25.52 38.37 25.96 37.62 26.48 36.92 27.03 36.24 27.66 35.60 28.36 35.02 29.08 34.51 29.83 34.08 30.57 33.70 31.34 33.39 32.09 33.17 32.74 33.10 32.88 32.99 33 32.86 33.09 32.72 33.14 32.56 33.15 32.41 33.12 32.30 33.07 32.18 32.97 32.08 32.85 31.81 32.09 31.50 31.34 31.12 30.57 30.67 29.81 30.16 29.06 29.60 28.36 28.96 27.66 28.28 27.03 27.56 26.46 26.81 25.95 26.07 25.52 25.30 25.14 24.55 24.83 23.86 24.59 23.72 24.51 23.61 24.40 23.52 24.23 23.49 24.04 23.52 23.85 23.61 23.67 23.72 23.56 23.82 23.50Z"/></svg><span>Home Desk</span></button></h1>`}
        </div>
        ${this.page||!this.admin?q`<div class="tabs"></div>`:q`<div class="tabs" role="tablist">
              ${Ht.map(t=>q`<button class="tab ${t.id===this.view?"active":""}" role="tab" title=${t.label} aria-label=${t.label}
                  aria-selected=${t.id===this.view} @click=${()=>this._fire("view-change",t.id)}>
                  <ha-icon .icon=${t.icon}></ha-icon><span class="tab-text">${t.label}</span>${t.count?q`<span class="count ${this.tickets.some(e=>e.unread&&t.match(e))?"unread":""}" title=${this.tickets.some(e=>e.unread&&t.match(e))?"Has updates you haven't seen":""}>${this.tickets.filter(t.match).length}</span>`:W}
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
    `}};so.styles=[ut,a`
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
    `],t([dt()],so.prototype,"page",void 0),t([dt()],so.prototype,"view",void 0),t([dt({attribute:!1})],so.prototype,"tickets",void 0),t([dt({type:Boolean})],so.prototype,"narrow",void 0),t([dt({type:Boolean})],so.prototype,"admin",void 0),t([ht()],so.prototype,"_menuOpen",void 0),so=t([pt("st-app-header")],so);let oo=class extends at{constructor(){super(...arguments),this.q="",this.open=!1,this.tickets=[],this.categories=[],this.labels=[],this.selectable=!1,this.selecting=!1,this.checkedCount=0}_fire(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}_change(t){return e=>this._fire("filters-change",{[t]:e.detail})}_merge(t){const e=t.currentTarget.getBoundingClientRect();this._fire("merge-selected",{rect:e})}render(){const t=this.filters,e=Ft(t);return this.checkedCount?q`<div class="toolbar selbar">
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
          @click=${t=>this.checkedCount>=2&&this._merge(t)}>
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
            @input=${t=>this._fire("search",t.target.value)} />
        </div>
        ${this.selectable?q`<button class="icon filter-btn ${this.selecting?"on":""}" title="Select Tickets" aria-label="Select Tickets" aria-pressed=${this.selecting}
              @click=${()=>this._fire("toggle-select")}>
              <ha-icon icon="mdi:checkbox-multiple-marked-outline"></ha-icon>
            </button>`:W}
        <button class="icon filter-btn ${e?"on":""}" title="Filters" aria-label="Filters" aria-expanded=${this.open}
          @click=${()=>this._fire("toggle-filters")}>
          <ha-icon icon="mdi:filter-variant"></ha-icon>${e?q`<span class="dot"></span>`:W}
        </button>
      </div>
      ${this.open?q`<div class="filters">
            ${"all"===t.view?q`<st-dropdown label="Show" .options=${Bt} .value=${t.scope} @change=${this._change("scope")}></st-dropdown>`:W}
            <st-dropdown label="Category" placeholder="Category" .options=${s=this.categories,[{id:"",label:"Any Category"},{id:"none",label:"No Category"},...s.map(t=>({id:t.id,label:t.name}))]} .value=${t.category}
              @change=${this._change("category")}></st-dropdown>
            ${t.person?q`<st-dropdown label="Raised By" placeholder="Raised By" .options=${function(t,e){const i=[...new Set(t.map(t=>t.requester).filter(Boolean))].sort();return e&&!i.includes(e)&&i.push(e),[{id:"",label:"Anyone"},...i.map(t=>({id:t,label:$t(t)}))]}(this.tickets,t.person)} .value=${t.person}
                  @change=${this._change("person")}></st-dropdown>`:W}
            <st-dropdown label="Priority" placeholder="Priority" .options=${[{id:"",label:"Any Priority"},...Lt.filter(t=>"low"!==t).map(t=>({id:t,label:xt[t]}))]} .value=${t.priority}
              @change=${this._change("priority")}></st-dropdown>
            <st-dropdown label="Label" placeholder="Label" .options=${i=this.labels,[{id:"",label:"Any Label"},...i.map(t=>({id:t.id,label:t.name}))]} .value=${t.label}
              @change=${this._change("label")}></st-dropdown>
          </div>`:W}
    `;var i,s}};oo.styles=[ut,a`
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
    `],t([dt()],oo.prototype,"q",void 0),t([dt({attribute:!1})],oo.prototype,"filters",void 0),t([dt({type:Boolean})],oo.prototype,"open",void 0),t([dt({attribute:!1})],oo.prototype,"tickets",void 0),t([dt({attribute:!1})],oo.prototype,"categories",void 0),t([dt({attribute:!1})],oo.prototype,"labels",void 0),t([dt({type:Boolean})],oo.prototype,"selectable",void 0),t([dt({type:Boolean})],oo.prototype,"selecting",void 0),t([dt({type:Number})],oo.prototype,"checkedCount",void 0),oo=t([pt("st-list-toolbar")],oo);const no=[{id:"bug",name:"Problem",icon:"mdi:alert-circle-outline",hint:"Something isn't working"},{id:"enhancement",name:"Suggestion",icon:"mdi:lightbulb-on-outline",hint:"An idea or a request"}];let ao=class extends at{constructor(){super(...arguments),this._title="",this._details="",this._kind="bug",this._sending=!1,this._sent=!1,this._error="",this._photos=[],this._voice=null,this._recording=null,this._busy=!1,this._sentWith={photos:0,voice:!1},this._recorder=null}disconnectedCallback(){super.disconnectedCallback(),this._recorder?.cancel(),this._forget()}_forget(){this._photos.forEach(t=>URL.revokeObjectURL(t.url)),this._voice&&URL.revokeObjectURL(this._voice.url),this._photos=[],this._voice=null}async _addPhotos(t){const e=t.target,i=[...e.files??[]].slice(0,6-this._photos.length);if(e.value="",i.length){this._busy=!0;try{for(const t of i){const e=await Jt(t);this._photos=[...this._photos,{blob:e,url:URL.createObjectURL(e),name:t.name}]}}finally{this._busy=!1}}}_removePhoto(t){URL.revokeObjectURL(t.url),this._photos=this._photos.filter(e=>e!==t)}_setVoice(t,e){this._voice&&URL.revokeObjectURL(this._voice.url),this._voice={blob:t,url:URL.createObjectURL(t),seconds:e}}async _record(){this._error="";try{this._recording=0,this._recorder=await async function(t,e){const i=await navigator.mediaDevices.getUserMedia({audio:{channelCount:1,echoCancellation:!0,noiseSuppression:!0}}),s=new AudioContext,o=s.createMediaStreamSource(i),n=s.createScriptProcessor(4096,1,1),a=[];let r=0,l=!1;n.onaudioprocess=i=>{if(l)return;const o=new Float32Array(i.inputBuffer.getChannelData(0));a.push(o),r+=o.length;const n=r/s.sampleRate;t(Math.floor(n)),n>=180&&e()},o.connect(n),n.connect(s.destination);const c=()=>{l=!0,n.disconnect(),o.disconnect(),i.getTracks().forEach(t=>t.stop()),s.close()};return{cancel:c,stop:async()=>{const t=s.sampleRate;c();const e=new Float32Array(r);let i=0;for(const t of a)e.set(t,i),i+=t.length;return{blob:te(e,t),seconds:Math.round(r/t)}}}}(t=>this._recording=t,()=>{this._stopRecording()})}catch{this._recording=null,this._error="The microphone isn't available. Check it is allowed for this page, or add a recording from your device."}}async _stopRecording(){const t=this._recorder;if(this._recorder=null,this._recording=null,!t)return;const{blob:e,seconds:i}=await t.stop();i>0&&this._setVoice(e,i)}async _addVoiceFile(t){const e=t.target,i=e.files?.[0];if(e.value="",i){this._busy=!0,this._error="";try{const{blob:t,seconds:e}=await async function(t){const e=new AudioContext;try{const i=await e.decodeAudioData(await t.arrayBuffer()),s=Math.ceil(i.duration*Qt),o=new OfflineAudioContext(1,s,Qt),n=o.createBufferSource();return n.buffer=i,n.connect(o.destination),n.start(),{blob:te((await o.startRendering()).getChannelData(0),Qt),seconds:Math.round(i.duration)}}finally{e.close()}}(i);this._setVoice(t,e)}catch{this._error="That recording couldn't be read. Try another, or type the message instead."}finally{this._busy=!1}}}async _send(){if(this._title.trim()&&!this._sending&&!this._busy&&null===this._recording){this._sending=!0,this._error="";try{const t=new FormData;t.append("kind",this._kind),t.append("title",this._title.trim()),t.append("details",this._details),this._photos.forEach((e,i)=>t.append("image",e.blob,`photo-${i+1}.${"image/jpeg"===e.blob.type?"jpg":"img"}`)),this._voice&&t.append("audio",this._voice.blob,"voice-message.wav");const e=await this.client.report(t);this._sentWith={photos:e.photos,voice:e.voice},this._sent=!0,this._title="",this._details="",this._kind="bug",this._forget()}catch(t){this._error=String(t&&"object"==typeof t&&"message"in t?t.message:t)}finally{this._sending=!1}}}render(){return this._sent?q`<div class="page thanks">
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
          ${no.map(t=>q`<button class="kind" role="radio" aria-checked=${this._kind===t.id?"true":"false"}
              @click=${()=>this._kind=t.id}>
              <ha-icon .icon=${t.icon}></ha-icon>
              <span><div class="name">${t.name}</div><div class="hint">${t.hint}</div></span>
            </button>`)}
        </div>
      </div>

      <div class="field">
        <label class="caption" for="title">${"bug"===this._kind?"What went wrong?":"What would you like?"}</label>
        <input id="title" type="text" autofocus maxlength="300" .value=${this._title}
          placeholder=${"bug"===this._kind?"The lounge light didn't turn on":"A bedtime scene for the kids' rooms"}
          @input=${t=>this._title=t.target.value}
          @keydown=${t=>"Enter"===t.key&&void this._send()} />
      </div>

      <div class="field">
        <label class="caption" for="details">More detail (optional)</label>
        <textarea id="details" rows="6" .value=${this._details}
          placeholder="When did it happen? Does it always happen? Anything else that might help."
          @input=${t=>this._details=t.target.value}></textarea>
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
              ${this._photos.map(t=>q`<div class="photo">
                  <img src=${t.url} alt=${t.name} />
                  <button class="remove" title="Remove" aria-label="Remove photo" @click=${()=>this._removePhoto(t)}>
                    <ha-icon icon="mdi:close"></ha-icon>
                  </button>
                </div>`)}
            </div>`:W}
        ${null!==this._recording?q`<div class="voice">
              <span class="rec-dot"></span>
              <span class="time">Recording ${ee(this._recording)}</span>
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
    </div>`}};ao.styles=[ut,a`
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
    `],t([dt({attribute:!1})],ao.prototype,"client",void 0),t([ht()],ao.prototype,"_title",void 0),t([ht()],ao.prototype,"_details",void 0),t([ht()],ao.prototype,"_kind",void 0),t([ht()],ao.prototype,"_sending",void 0),t([ht()],ao.prototype,"_sent",void 0),t([ht()],ao.prototype,"_error",void 0),t([ht()],ao.prototype,"_photos",void 0),t([ht()],ao.prototype,"_voice",void 0),t([ht()],ao.prototype,"_recording",void 0),t([ht()],ao.prototype,"_busy",void 0),t([ht()],ao.prototype,"_sentWith",void 0),ao=t([pt("st-report-form")],ao);let ro=class extends at{constructor(){super(...arguments),this.name="",this.error="",this._name="",this._icon="",this._shake=!1}connectedCallback(){super.connectedCallback(),this._name=this.name}_fire(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}_tryClose(){this._name.trim()||this._icon.trim()?(this._shake=!0,window.setTimeout(()=>this._shake=!1,400)):this._fire("close")}_create(){this._name.trim()&&this._fire("create",{name:this._name.trim(),icon:this._icon.trim()})}firstUpdated(){this.renderRoot.querySelector("#name")?.focus()}render(){return q`<div class="scrim" @click=${t=>t.target===t.currentTarget&&this._tryClose()}
      @keydown=${t=>"Escape"===t.key&&this._tryClose()}>
      <div class="dialog ${this._shake?"shake":""}" role="dialog" aria-modal="true" aria-label="New Category">
        <div class="head">
          <button class="icon" title="Close" @click=${()=>this._fire("close")}><ha-icon icon="mdi:close"></ha-icon></button>
          <h2>New Category</h2>
        </div>
        <div class="field">
          <label for="name">Name*</label>
          <input id="name" type="text" .value=${this._name}
            @input=${t=>this._name=t.target.value}
            @keydown=${t=>"Enter"===t.key&&this._create()} />
        </div>
        <div class="field icon">
          ${this._icon?q`<ha-icon .icon=${this._icon}></ha-icon>`:q`<ha-icon icon="mdi:tag-outline"></ha-icon>`}
          <div class="body">
            <label for="icon">Icon</label>
            <input id="icon" type="text" placeholder="mdi:lan" .value=${this._icon}
              @input=${t=>this._icon=t.target.value} />
          </div>
        </div>
        ${this.error?q`<div class="error">${this.error}</div>`:W}
        <div class="actions">
          <button class="pill primary" ?disabled=${!this._name.trim()} @click=${this._create}>Create</button>
        </div>
      </div>
    </div>`}};ro.styles=[ut,a`
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
    `],t([dt()],ro.prototype,"name",void 0),t([dt()],ro.prototype,"error",void 0),t([ht()],ro.prototype,"_name",void 0),t([ht()],ro.prototype,"_icon",void 0),t([ht()],ro.prototype,"_shake",void 0),ro=t([pt("st-category-dialog")],ro);const lo=6048e5,co="history";let ho=class extends at{constructor(){super(...arguments),this.tickets=[],this.language=void 0,this.userName="",this.compact=!1}_fire(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}_greeting(){const t=(new Date).getHours(),e=t<5?"Good evening":t<12?"Good morning":t<18?"Good afternoon":"Good evening";return this.userName?`${e}, ${this.userName}`:e}_tile(t,e,i,s={}){const o=void 0!==s.view;return q`<button class="tile ${o?"":"static"} ${i&&s.cls?s.cls:""}"
      @click=${()=>o&&this._fire("go-view",{view:s.view,priority:s.priority??""})}>
      <span class="top"><ha-icon .icon=${t}></ha-icon>${e}</span>
      <span class="n">${i}${s.sub?q`<span class="sub-n">${s.sub}</span>`:W}</span>
    </button>`}_row(t){const e=t.updated_by??t.requester,i=t.updated_by?"Updated":"Opened";return q`<button class="row ${t.unread?"unread":""}" @click=${()=>this._fire("open-ticket",t.id)}>
      <ha-icon class="ic" .icon=${bt[t.status]} style="color: ${vt[t.status]}"></ha-icon>
      <div>
        <div class="title">${t.title}</div>
        <div class="sub">
          ${t.agent_state?q`<span class="work"><ha-icon icon="mdi:star-four-points"></ha-icon> ${It(`ai:${t.agent_state.agent}`)} working…</span>`:W}
          ${"urgent"===t.priority||"high"===t.priority?q`<span class="hot"><ha-icon .icon=${"urgent"===t.priority?"mdi:alert":"mdi:alert-outline"}></ha-icon> ${"urgent"===t.priority?"Urgent":"High"}</span>`:W}
          <span>${i} ${_t(t.updated_at,this.language)} by <ha-icon icon=${wt(e)}></ha-icon> ${$t(e)}</span>
        </div>
      </div>
    </button>`}_card(t,e,i){return q`<div class="card">
      <h2>${t}</h2>
      ${e.length?e.map(t=>this._row(t)):q`<div class="none">${i}</div>`}
    </div>`}render(){const t=this.tickets.filter(t=>!t.merged_into),e=e=>t.filter(Ht.find(t=>t.id===e).match).length,i=Date.now(),s=t.filter(Ht.find(t=>"active"===t.id).match).sort((t,e)=>e.created_at.localeCompare(t.created_at)),o=t.filter(t=>(t=>!("new"!==t.status&&"in_progress"!==t.status||t.merged_into||t.labels.includes(co)))(t)&&("urgent"===t.priority||"high"===t.priority)),n=t.filter(t=>t.unread),a=t.filter(t=>i-new Date(t.created_at).getTime()<lo&&!t.labels.includes(co)).length,r=t.filter(t=>("resolved"===t.status||"closed"===t.status)&&t.closed_at&&i-new Date(t.closed_at).getTime()<lo&&!t.labels.includes(co)).length;return q`<div class="page">
      <h1>${this._greeting()}</h1>
      <p class="lead">${s.length?`${s.length} new ${1===s.length?"ticket is":"tickets are"} waiting in your inbox.`:"Your inbox is empty."}</p>

      <div class="cols">
        ${this.compact?this._card("Inbox",s,"Nothing new. All clear."):W}
        <div class="card">
          <h2>Overview</h2>
          <div class="tiles">
            ${this._tile("mdi:inbox-outline","Inbox",e("active"),{view:"active",cls:"hot"})}
            ${this._tile("mdi:progress-wrench","In Progress",e("progress"),{view:"progress"})}
            ${this._tile("mdi:star-four-points-outline","Assigned to AI",e("agent"),{view:"agent"})}
            ${this._tile("mdi:alert-outline","Urgent / High",o.length,{view:"progress",cls:"warn"})}
            ${this._tile("mdi:email-open-outline","Unread",n.length,{view:"all",cls:"hot"})}
            ${this._tile("mdi:calendar-week","This week",a,{sub:`opened · ${r} resolved`})}
          </div>
        </div>
      </div>
    </div>`}};ho.styles=[ut,a`
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
    `],t([dt({attribute:!1})],ho.prototype,"tickets",void 0),t([dt()],ho.prototype,"language",void 0),t([dt()],ho.prototype,"userName",void 0),t([dt({type:Boolean})],ho.prototype,"compact",void 0),ho=t([pt("st-home-page")],ho);const po="___add_new___",uo="___none___",go="(max-width: 870px)";let mo=class extends at{constructor(){super(...arguments),this.narrow=!1,this.route=void 0,this._tickets=[],this._matchIds=null,this._selected=null,this._selectedId=null,this._view="active",this._q="",this._priority="",this._label="",this._category="",this._person="",this._filtersOpen=!1,this._compact=window.matchMedia(go).matches,this._scope="",this._labelList=[],this._categoryList=[],this._settings=null,this._merging=null,this._mergeConfirm=null,this._confirmCost=null,this._checked=new Set,this._ticking=!1,this._lastChecked=null,this._seenAt="",this._pickingLabel=null,this._picking=null,this._newCategory=null,this._removing=null,this._page="home",this._creating=!1,this._error="",this._onVisible=()=>{document.hidden||this._refresh()},this._mq=window.matchMedia(go),this._onCompact=()=>{this._compact=this._mq.matches},this._pickerAdditional=t=>{const e=this._categoryList.some(e=>e.name.toLowerCase()===t.toLowerCase());return t&&!e?[{id:po+t,primary:`Add New Category '${t}'`,icon:"mdi:plus"}]:[{id:po,primary:"Add New Category…",icon:"mdi:plus"}]},this._labelPickerAdditional=t=>{const e=this._labelList.some(e=>e.name.toLowerCase()===t.toLowerCase());return t&&!e?[{id:po+t,primary:`Add New Label '${t}'`,icon:"mdi:plus"}]:[]}}get _admin(){return this.hass?.user?.is_admin??!1}recheckTheme(){const t=document.createElement("span");t.style.color="var(--card-background-color)",this.renderRoot.appendChild(t);const e=/rgba?\((\d+)[ ,]+(\d+)[ ,]+(\d+)/.exec(getComputedStyle(t).color);t.remove(),e&&this.toggleAttribute("light",(.299*+e[1]+.587*+e[2]+.114*+e[3])/255>.5)}willUpdate(t){if(t.has("hass")&&this.hass){const t=this.hass.themes;t===this._themeKey&&this.hasUpdated||(this._themeKey=t,this.updateComplete.then(()=>this.recheckTheme()))}t.has("hass")&&this.hass&&!this._client&&(this._client=new mt(this.hass),this._restoreState(),this._refresh(),this._syncFromRoute(),this._subscribe()),t.has("route")&&this._client&&this._syncFromRoute()}get _prefix(){return this.route?.prefix??"/home-desk"}_navigate(t){if(location.pathname!==t)try{history.pushState(null,"",t),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}catch{}}async _syncFromRoute(){const t=Number((this.route?.path??"").replace(/^\//,"")),e=Number.isInteger(t)&&t>0?t:null;e!==this._selectedId&&(null===e?(this._selectedId=null,this._selected=null):await this._open(e,!1))}_subscribe(){this._client&&(this._client.subscribe(()=>this._scheduleRefresh()).then(t=>{this._unsub=t}).catch(t=>{console.warn("[home-desk] live updates unavailable, polling instead:",t),this._unsub=void 0}),window.clearInterval(this._pollTimer),this._pollTimer=window.setInterval(()=>{document.hidden||this._refresh()},2e4))}connectedCallback(){super.connectedCallback(),this._mq.addEventListener("change",this._onCompact),document.addEventListener("visibilitychange",this._onVisible),this._client&&!this._unsub&&this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._mq.removeEventListener("change",this._onCompact),document.removeEventListener("visibilitychange",this._onVisible),window.clearInterval(this._pollTimer),this._unsub?.(),this._unsub=void 0,window.clearTimeout(this._searchTimer),window.clearTimeout(this._refreshTimer)}_restoreState(){try{const t=localStorage.getItem("home-desk-view");t&&Ht.some(e=>e.id===t)&&(this._view=t)}catch{}}_setView(t){this._view=t,"all"===t&&(this._filtersOpen=!0);try{localStorage.setItem("home-desk-view",t)}catch{}}_scheduleRefresh(){window.clearTimeout(this._refreshTimer),this._refreshTimer=window.setTimeout(()=>{this._refresh()},300)}async _refresh(){if(this._client&&this._admin)try{[this._tickets,this._labelList,this._categoryList]=await Promise.all([this._client.list(),this._client.labels(),this._client.categories()]),this._admin&&(this._settings=await this._client.settings()),this._q.trim()&&await this._runSearch(),null!==this._selectedId&&await this._loadSelected(this._selectedId),this._error=""}catch(t){this._error=`Could not load tickets: ${this._message(t)}`}}async _loadSelected(t){if(this._client)try{const e=await this._client.get(t);this._selected?.id===t&&this._seenAt||(this._seenAt=e.seen_at??""),this._selected=e,this._tickets.find(e=>e.id===t)?.unread&&this._markRead([t])}catch(t){this._selected=null,this._selectedId=null,this._navigate(this._prefix),this._error=this._message(t)}}get _canAsk(){return!!this._settings?.agent?.startsWith("ai_task.")}get _askName(){return"AI"}get _agentLabel(){const t=this._settings?.agent;return`the AI (${(t?String(this.hass.states?.[t]?.attributes.friendly_name??""):"").replace(/\s*(AI Task|conversation|agent)\s*$/i,"").trim()||"Claude"})`}_askCost(t,e){this._confirmCost={text:t,run:e}}_askNow(t){const e=this._selected;if(!e||!this._client)return;const i=this._agentLabel;this._askCost(`Review ticket #${e.id} with ${i}? The ticket${t.body?", with your comment,":""} is sent to the AI chosen in Settings through Home Assistant, which uses your AI plan and may cost money. It says what it thinks is going on and what to try, and may propose changes for you to apply. It can't change anything itself, and Assign to AI Agent is left as it is. You can stop it from the ticket while it works.`,async()=>{const i=this._client;t.body&&await i.comment(e.id,t.body,!1),t.done(),await this._act(t=>t.runAgent(e.id))})}async _markRead(t){if(this._client){this._tickets=this._tickets.map(e=>!t||t.includes(e.id)?{...e,unread:!1}:e);try{await this._client.markRead(t)}catch{}}}async _runSearch(){if(!this._client)return;const t=this._q.trim();this._matchIds=t?new Set((await this._client.list(t)).map(t=>t.id)):null}_message(t){return String(t&&"object"==typeof t&&"message"in t?t.message:t)}async _act(t){if(this._client)try{this._selected=await t(this._client),this._error="",this._refresh()}catch(t){this._error=this._message(t)}}_search(t){this._q=t,window.clearTimeout(this._searchTimer),this._searchTimer=window.setTimeout(()=>{this._runSearch()},250)}async _open(t,e=!0){this._selectedId!==t&&(this._seenAt=""),"home"===this._page&&this._setView("active"),this._page="",this._selectedId=t,e&&this._navigate(`${this._prefix}/${t}`),await this._loadSelected(t)}get _pickerItems(){const t=this._picking?.ticket.category;return[...t?[{id:uo,primary:"No Category",icon:"mdi:shape-outline"}]:[],...this._categoryList.map(t=>({id:t.id,primary:t.name,icon:t.icon||"mdi:tag-outline"}))]}get _mergeItems(){const t=this._merging?.ids;if(t)return this._tickets.filter(e=>t.includes(e.id)).sort((t,e)=>t.id-e.id).map((t,e)=>({id:String(t.id),primary:`#${t.id} ${t.title}`,secondary:`${0===e?"Oldest · ":""}${ft[t.status]} · ${$t(t.requester)}`,icon:"mdi:ticket-outline"}));const e=this._selectedId,i=t=>"resolved"!==t.status&&"closed"!==t.status;return this._tickets.filter(t=>t.id!==e&&!t.merged_into).sort((t,e)=>Number(i(e))-Number(i(t))||e.updated_at.localeCompare(t.updated_at)).map(t=>({id:String(t.id),primary:`#${t.id} ${t.title}`,secondary:`${ft[t.status]} · ${$t(t.requester)}`,icon:"mdi:ticket-outline"}))}_mergePicked(t){const e=this._merging?.ids;this._merging=null;const i=this._tickets.find(e=>e.id===Number(t)),s=e?this._tickets.filter(i=>e.includes(i.id)&&i.id!==Number(t)):this._tickets.filter(t=>t.id===this._selectedId);s.length&&i&&(this._mergeConfirm={from:s,into:i})}_toggleCheck({id:t,range:e}){const i=new Set(this._checked),s=this._filtered.map(t=>t.id);if(e&&null!==this._lastChecked&&s.includes(this._lastChecked)){const[e,o]=[s.indexOf(this._lastChecked),s.indexOf(t)].sort((t,e)=>t-e);for(const t of s.slice(e,o+1))i.add(t)}else i.has(t)?i.delete(t):i.add(t);this._lastChecked=t,this._checked=i,i.size&&(this._ticking=!0)}_clearChecked(){this._checked=new Set,this._ticking=!1,this._lastChecked=null}async _doMerge(){const t=this._mergeConfirm;if(this._mergeConfirm=null,t&&this._client)try{await this._client.merge(t.into.id,t.from.map(t=>t.id)),this._clearChecked(),this._error="",await this._refresh(),await this._open(t.into.id)}catch(t){this._error=this._message(t)}}get _labelPickerItems(){const t=new Set(this._pickingLabel?.ticket.labels??[]);return this._labelList.filter(e=>!t.has(e.id)).map(t=>({id:t.id,primary:t.name,icon:t.icon||"mdi:label-outline",...t.description?{secondary:t.description}:{}}))}async _labelPicked({id:t}){const e=this._pickingLabel;if(this._pickingLabel=null,!e||!this._client)return;const i=t.startsWith(po)?t.slice(13):t;try{await this._client.update(e.ticket.id,{labels:[...e.ticket.labels,i]}),this._error="",this._refresh()}catch(t){this._error=this._message(t)}}async _picked({id:t}){const e=this._picking;this._picking=null,e&&(t.startsWith(po)?this._newCategory={ticket:e.ticket,name:t.slice(13),error:""}:await this._setCategory(e.ticket,t===uo?null:t))}async _setCategory(t,e){if(this._client)try{await this._client.update(t.id,{category:e}),this._error="",this._refresh()}catch(t){this._error=this._message(t)}}async _createCategory(t){const e=this._newCategory;if(e&&this._client)try{const i=await this._client.createCategory(t);this._newCategory=null,await this._setCategory(e.ticket,i.id)}catch(t){this._newCategory={...e,error:this._message(t)}}}async _removeLabel(){const t=this._removing;if(this._removing=null,t&&this._client)try{await this._client.update(t.ticket.id,{labels:t.ticket.labels.filter(e=>e!==t.label.id)}),this._error="",this._refresh()}catch(t){this._error=this._message(t)}}_close(){this._selectedId=null,this._selected=null,this._navigate(this._prefix)}async _create(t){if(this._client)try{const e=await this._client.create(t);this._creating=!1,this._setView("active"),this._selected=e,this._open(e.id),this._refresh()}catch(t){this._error=this._message(t)}}_applyFilters(t){void 0!==t.scope&&(this._scope=t.scope),void 0!==t.category&&(this._category=t.category),void 0!==t.person&&(this._person=t.person),void 0!==t.priority&&(this._priority=t.priority),void 0!==t.label&&(this._label=t.label)}get _filters(){return{view:"home"===this._page?"active":this._view,scope:this._scope,category:this._category,priority:this._priority,label:this._label,person:this._person}}get _walk(){const t=this._filtered;return null===this._selectedId||t.some(t=>t.id===this._selectedId)?t:qt(this._tickets,{...this._filters,view:"all",scope:"",category:"",priority:"",label:"",person:""},null)}get _navPos(){const t=this._walk,e=t.findIndex(t=>t.id===this._selectedId);return e<0?null:{index:e,total:t.length}}_step(t){const e=this._navPos,i=e?this._walk[e.index+t]:void 0;i&&this._open(i.id)}get _filtered(){return qt(this._tickets,this._filters,this._matchIds)}get _filterCount(){return Ft(this._filters)}get _agentName(){return"ai:AI"}get _people(){const t=new Map;for(const[e,i]of Object.entries(this.hass?.states??{})){if(!e.startsWith("person."))continue;const s=String(i.attributes.friendly_name??e.slice(7)),o=i.attributes.entity_picture;t.set(s.toLowerCase(),{name:s,..."string"==typeof o&&o?{picture:o}:{}})}return t}get _labelMap(){return new Map(this._labelList.map(t=>[t.id,t]))}_homeTemplate(t){return q`<st-home-page .tickets=${this._tickets} .language=${this.hass.language} .userName=${this.hass.user?.name??""} .compact=${t}
      @open-ticket=${t=>{this._open(t.detail)}}
      @go-view=${t=>{this._page="",this._close(),this._setView(t.detail.view),this._priority=t.detail.priority}}></st-home-page>`}render(){if(!this.hass)return W;const t=this.hass.language,e=null!==this._selectedId;return q`
      <st-app-header .page=${"home"===this._page?"":this._page} .view=${"home"===this._page?"":this._view} .tickets=${this._tickets} .narrow=${this.narrow} .admin=${this._admin}
        @page-change=${t=>this._page=t.detail}
        @view-change=${t=>{this._page="",this._setView(t.detail)}}
        @go-home=${()=>{this._page="home",this._close()}}
        @refresh=${()=>{this._refresh()}}
        @mark-all-read=${()=>{this._markRead()}}></st-app-header>
      ${this._error?q`<div class="banner">${this._error}</div>`:W}
      ${!this._admin&&this._client?q`<st-report-form .client=${this._client}></st-report-form>`:"home"===this._page&&this._client&&this._compact?this._homeTemplate(!0):"report"===this._page&&this._client?q`<st-report-form .client=${this._client}></st-report-form>`:"labels"===this._page&&this._client?q`<st-label-manager .client=${this._client} .labels=${this._labelList}
            @labels-changed=${()=>{this._refresh()}}></st-label-manager>`:"categories"===this._page&&this._client?q`<st-category-manager .client=${this._client} .categories=${this._categoryList}
              @categories-changed=${()=>{this._refresh()}}></st-category-manager>`:"settings"===this._page&&this._client?q`<st-settings .client=${this._client} .hass=${this.hass}
                @settings-changed=${t=>this._settings=t.detail}></st-settings>`:q`<main class=${e?"has-selection":""}>
        <div class="list-pane">
          <st-list-toolbar .q=${this._q} .filters=${this._filters} .open=${this._filtersOpen} .tickets=${this._tickets}
            .categories=${this._categoryList} .labels=${this._labelList}
            .selectable=${this._admin} .selecting=${this._ticking} .checkedCount=${this._checked.size}
            @toggle-select=${()=>this._ticking?this._clearChecked():this._ticking=!0}
            @clear-selection=${()=>this._clearChecked()}
            @mark-read-selected=${()=>{this._markRead([...this._checked]).then(()=>this._clearChecked())}}
            @select-all=${()=>this._checked=new Set(this._filtered.map(t=>t.id))}
            @merge-selected=${t=>this._merging={rect:t.detail.rect,ids:this._tickets.filter(t=>this._checked.has(t.id)&&!t.merged_into).map(t=>t.id)}}
            @search=${t=>this._search(t.detail)}
            @toggle-filters=${()=>this._filtersOpen=!this._filtersOpen}
            @filters-change=${t=>this._applyFilters(t.detail)}
            @new-ticket=${()=>this._creating=!0}></st-list-toolbar>
          <st-ticket-list
            .tickets=${this._filtered}
            .selectedId=${this._selectedId}
            .language=${t}
            .isAdmin=${this._admin}
            .labelMap=${this._labelMap}
            .checked=${this._checked}
            .ticking=${this._ticking}
            .categoryMap=${new Map(this._categoryList.map(t=>[t.id,t]))}
            @toggle-check=${t=>this._toggleCheck(t.detail)}
            @select-ticket=${t=>{this._open(t.detail)}}
            @filter-person=${t=>{this._person=t.detail,this._filtersOpen=!0}}
            @pick-category=${t=>this._picking=t.detail}
            @remove-label=${t=>this._removing=t.detail}
          ></st-ticket-list>
        </div>
        ${"home"===this._page?this._homeTemplate(!1):q`
        <st-ticket-detail
          .ticket=${this._selected}
          .client=${this._client}
          .isAdmin=${this._admin}
          .narrow=${this._compact}
          .language=${t}
          .navPos=${this._navPos}
          @nav-ticket=${t=>this._step(t.detail)}
          .seenAt=${this._seenAt}
          .me=${this.hass.user?.name??""}
          .agentName=${this._agentName}
          .labelMap=${this._labelMap}
          .people=${this._people}
          .categoryMap=${new Map(this._categoryList.map(t=>[t.id,t]))}
          @pick-category=${t=>this._picking=t.detail}
          @remove-label=${t=>this._removing=t.detail}
          @pick-label=${t=>this._pickingLabel=t.detail}
          @pick-merge=${t=>this._merging=t.detail}
          @back=${()=>this._close()}
          @open-ticket=${t=>{this._open(t.detail)}}
          .hass=${this.hass}
          .canAsk=${this._canAsk}
          .askName=${this._askName}
          .agentLabel=${this._agentLabel}
          @proposal=${t=>this._selected&&void this._act(e=>e.proposal(this._selected.id,t.detail.eventId,t.detail.action))}
          @confirm-cost=${t=>this._askCost(t.detail.text,t.detail.run)}
          @ask-ai=${t=>this._askNow(t.detail)}
          @patch-ticket=${t=>this._selected&&void this._act(e=>e.update(this._selected.id,t.detail))}
          @comment=${t=>this._selected&&void this._act(e=>e.comment(this._selected.id,t.detail.body,t.detail.internal))}
          @close-ticket=${t=>this._selected&&void this._act(e=>e.close(this._selected.id,t.detail.resolution,t.detail.status))}
        ></st-ticket-detail>`}
      </main>`}
      ${this._pickingLabel?q`<st-picker-popup .rect=${this._pickingLabel.rect} .items=${this._labelPickerItems} .additional=${this._labelPickerAdditional}
            emptyLabel="No more labels to add"
            @close=${()=>this._pickingLabel=null}
            @pick=${t=>{this._labelPicked(t.detail)}}></st-picker-popup>`:W}
      ${this._picking?q`<st-picker-popup .rect=${this._picking.rect} .items=${this._pickerItems} .additional=${this._pickerAdditional}
            .value=${this._picking.ticket.category??""} emptyLabel="No categories available"
            @close=${()=>this._picking=null}
            @pick=${t=>{this._picked(t.detail)}}></st-picker-popup>`:W}
      ${this._newCategory?q`<st-category-dialog .name=${this._newCategory.name} .error=${this._newCategory.error}
            @close=${()=>this._newCategory=null}
            @create=${t=>{this._createCategory(t.detail)}}></st-category-dialog>`:W}
      ${this._merging?q`<st-picker-popup .rect=${this._merging.rect} .items=${this._mergeItems} emptyLabel="No other tickets"
            @close=${()=>this._merging=null}
            @pick=${t=>this._mergePicked(t.detail.id)}></st-picker-popup>`:W}
      ${this._mergeConfirm?q`<st-confirm-dialog heading="Merge Tickets?" confirmLabel="Merge" danger
            body="Merge ${this._mergeConfirm.from.map(t=>"#"+t.id).join(", ")} into #${this._mergeConfirm.into.id} (${this._mergeConfirm.into.title})? The comments, labels and files of ${this._mergeConfirm.from.length>1?"the others":"#"+this._mergeConfirm.from[0].id} move to #${this._mergeConfirm.into.id}, and ${this._mergeConfirm.from.length>1?"they are":"it is"} closed. This can't be undone."
            @cancel=${()=>this._mergeConfirm=null}
            @confirm=${()=>{this._doMerge()}}></st-confirm-dialog>`:W}
      ${this._confirmCost?q`<st-confirm-dialog heading="Use your AI plan?" confirmLabel="Yes, go ahead" body=${this._confirmCost.text}
            @cancel=${()=>this._confirmCost=null}
            @confirm=${()=>{const t=this._confirmCost.run;this._confirmCost=null,t()}}></st-confirm-dialog>`:W}
      ${this._removing?q`<st-confirm-dialog heading="Remove Label?" confirmLabel="Remove" danger
            body="Are you sure you want to remove label ${this._removing.label.name} from this ticket?"
            @cancel=${()=>this._removing=null}
            @confirm=${()=>{this._removeLabel()}}></st-confirm-dialog>`:W}
      ${this._creating?q`<st-new-ticket-dialog .isAdmin=${this._admin} .hass=${this.hass} .categories=${this._categoryList}
            @close=${()=>this._creating=!1}
            @create=${t=>{this._create(t.detail)}}></st-new-ticket-dialog>`:W}
    `}};mo.styles=[ut,gt],t([dt({attribute:!1})],mo.prototype,"hass",void 0),t([dt({type:Boolean})],mo.prototype,"narrow",void 0),t([dt({attribute:!1})],mo.prototype,"route",void 0),t([ht()],mo.prototype,"_tickets",void 0),t([ht()],mo.prototype,"_matchIds",void 0),t([ht()],mo.prototype,"_selected",void 0),t([ht()],mo.prototype,"_selectedId",void 0),t([ht()],mo.prototype,"_view",void 0),t([ht()],mo.prototype,"_q",void 0),t([ht()],mo.prototype,"_priority",void 0),t([ht()],mo.prototype,"_label",void 0),t([ht()],mo.prototype,"_category",void 0),t([ht()],mo.prototype,"_person",void 0),t([ht()],mo.prototype,"_filtersOpen",void 0),t([ht()],mo.prototype,"_compact",void 0),t([ht()],mo.prototype,"_scope",void 0),t([ht()],mo.prototype,"_labelList",void 0),t([ht()],mo.prototype,"_categoryList",void 0),t([ht()],mo.prototype,"_settings",void 0),t([ht()],mo.prototype,"_merging",void 0),t([ht()],mo.prototype,"_mergeConfirm",void 0),t([ht()],mo.prototype,"_confirmCost",void 0),t([ht()],mo.prototype,"_checked",void 0),t([ht()],mo.prototype,"_ticking",void 0),t([ht()],mo.prototype,"_seenAt",void 0),t([ht()],mo.prototype,"_pickingLabel",void 0),t([ht()],mo.prototype,"_picking",void 0),t([ht()],mo.prototype,"_newCategory",void 0),t([ht()],mo.prototype,"_removing",void 0),t([ht()],mo.prototype,"_page",void 0),t([ht()],mo.prototype,"_creating",void 0),t([ht()],mo.prototype,"_error",void 0),mo=t([pt("home-desk-panel")],mo)}();
