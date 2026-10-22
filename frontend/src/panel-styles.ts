import { css } from "lit";

/** The panel's own styles: the header and its tabs and menu, the list pane and its toolbar and filters, and the page layout. */
export const panelStyles = css`
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
        grid-template-rows: auto minmax(0, 1fr);
        min-height: 0;
        overflow: hidden;
      }
      /* The New Ticket and search bar runs across both columns, over the list and the open ticket. */
      st-top-bar {
        grid-column: 1 / -1;
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
      /* The full width view: the ticket gets the whole page under the New Ticket and search bar; the list is hidden. */
      main.wide {
        grid-template-columns: minmax(0, 1fr);
      }
      main.wide .list-pane {
        display: none;
      }
      /* Narrow: one pane at a time. */
      @media (max-width: 870px) {
        main {
          grid-template-columns: minmax(0, 1fr);
        }
        /* With a ticket open the list and the top bar are hidden, so the ticket is the only row and must fill it (otherwise it is
           sized to its content: a short ticket ends mid-screen and a long one pushes the comment bar off the bottom). */
        main.has-selection {
          grid-template-rows: minmax(0, 1fr);
        }
        main.has-selection .list-pane,
        main.has-selection st-top-bar,
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
`;
