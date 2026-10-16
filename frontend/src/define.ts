/** Drop-in for Lit's `@customElement` that skips a tag already defined.
 *
 * When HA restarts with a new build, an open tab imports the panel module
 * again into a page that already defined every tag, and Lit's decorator
 * would throw on the first duplicate. Custom elements can't be redefined,
 * so the tab keeps running the old code until reloaded — this just makes
 * that quiet.
 */
export const safeCustomElement =
  (tagName: string) =>
  (
    classOrTarget: CustomElementConstructor,
    context?: ClassDecoratorContext,
  ) => {
    const define = () => {
      if (customElements.get(tagName)) {
        console.info(
          `home-desk: <${tagName}> already defined — reload the page to pick up the updated panel.`,
        );
        return;
      }
      customElements.define(tagName, classOrTarget);
    };
    if (context !== undefined) context.addInitializer(define);
    else define();
  };
