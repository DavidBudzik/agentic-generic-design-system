import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

interface TopNavItem {
  label: string;
  href: string;
  icon?: string;
}

@customElement('gds-top-nav')
export class GdsTopNav extends GdsBaseElement {
  @property({ type: Array }) items: TopNavItem[] = [];
  @property({ type: String }) logo = '';
  @property({ type: Boolean }) sticky = false;
  @property({ type: Boolean }) transparent = false;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; font-family: var(--gds-font-sans); }
      .nav-bar {
        display: flex; align-items: center; gap: var(--gds-space-4);
        padding: var(--gds-space-3) var(--gds-space-6);
        background: var(--gds-color-surface); border-bottom: 1px solid var(--gds-color-border);
        width: 100%; box-sizing: border-box; z-index: var(--gds-z-sticky, 100);
      }
      :host([sticky]) .nav-bar { position: sticky; top: 0; }
      :host([transparent]) .nav-bar { background: transparent; border-bottom: none; }
      .logo { font-size: var(--gds-font-size-lg); font-weight: var(--gds-font-weight-bold); color: var(--gds-color-text); flex-shrink: 0; }
      .nav-items { display: flex; align-items: center; gap: var(--gds-space-1); flex: 1; }
      .nav-item {
        display: inline-flex; align-items: center; gap: var(--gds-space-1);
        padding: var(--gds-space-2) var(--gds-space-3); font-size: var(--gds-font-size-sm);
        color: var(--gds-color-text-muted); text-decoration: none; border-radius: var(--gds-radius-sm);
        cursor: pointer; transition: all var(--gds-duration-fast) var(--gds-ease-default);
      }
      .nav-item:hover { color: var(--gds-color-text); background: var(--gds-color-bg-muted); }
      .nav-item:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
      .nav-icon { display: inline-flex; flex-shrink: 0; }
      .nav-right { display: flex; align-items: center; gap: var(--gds-space-2); flex-shrink: 0; }
    `,
  ];

  protected render() {
    return html`
      <nav class="nav-bar" role="navigation" aria-label="Top navigation">
        ${this.logo ? html`<div class="logo">${this.logo}</div>` : html`<slot name="logo"></slot>`}
        <div class="nav-items" role="menubar">
          ${this.items.map(item => html`
            <a
              class="nav-item"
              href=${item.href}
              role="menuitem"
              @click=${(e: Event) => this._onClick(e, item)}
            >
              ${item.icon ? html`<span class="nav-icon" .innerHTML=${item.icon}></span>` : nothing}
              ${item.label}
            </a>
          `)}
          <slot name="items"></slot>
        </div>
        <div class="nav-right">
          <slot name="right"></slot>
        </div>
      </nav>
    `;
  }

  private _onClick(e: Event, item: TopNavItem) {
    e.preventDefault();
    dispatchEvent(this, 'navigate', { item });
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-top-nav': GdsTopNav; }
}