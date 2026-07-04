import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

interface TopNavMenuItem {
  label: string;
  href?: string;
  icon?: string;
  divider?: boolean;
}

@customElement('gds-top-nav-menu')
export class GdsTopNavMenu extends GdsBaseElement {
  @property({ type: String }) label = '';
  @property({ type: Array }) items: TopNavMenuItem[] = [];
  @property({ type: String }) trigger: 'click' | 'hover' = 'click';

  private _open = false;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline-block; position: relative; font-family: var(--gds-font-sans); }
      .trigger {
        display: inline-flex; align-items: center; gap: var(--gds-space-1);
        padding: var(--gds-space-2) var(--gds-space-3); font-size: var(--gds-font-size-sm);
        color: var(--gds-color-text-muted); text-decoration: none; border-radius: var(--gds-radius-sm);
        cursor: pointer; transition: all var(--gds-duration-fast) var(--gds-ease-default); background: transparent; border: none;
      }
      .trigger:hover { color: var(--gds-color-text); background: var(--gds-color-bg-muted); }
      .trigger.open { color: var(--gds-color-text); background: var(--gds-color-bg-muted); }
      .arrow { font-size: 0.625rem; transition: transform var(--gds-duration-fast) var(--gds-ease-default); }
      .arrow.open { transform: rotate(180deg); }
      .dropdown {
        position: absolute; top: 100%; left: 0; min-width: 12rem;
        background: var(--gds-color-surface); border: 1px solid var(--gds-color-border);
        border-radius: var(--gds-radius-md); box-shadow: var(--gds-shadow-lg); z-index: var(--gds-z-dropdown);
        display: none; margin-top: var(--gds-space-1); padding: var(--gds-space-1);
      }
      .dropdown.open { display: block; }
      .menu-item {
        display: flex; align-items: center; gap: var(--gds-space-2);
        padding: var(--gds-space-2) var(--gds-space-3); font-size: var(--gds-font-size-sm);
        color: var(--gds-color-text); text-decoration: none; border-radius: var(--gds-radius-sm);
        cursor: pointer; transition: background var(--gds-duration-fast) var(--gds-ease-default);
      }
      .menu-item:hover { background: var(--gds-color-bg-muted); }
      .menu-item:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
      .menu-divider { height: 1px; background: var(--gds-color-border); margin: var(--gds-space-1) 0; }
    `,
  ];

  protected render() {
    return html`
      <div
        @click=${this._onTriggerClick}
        @mouseenter=${this.trigger === 'hover' ? () => this._open = true : nothing}
        @mouseleave=${this.trigger === 'hover' ? () => this._open = false : nothing}
      >
        <button class="trigger ${this._open ? 'open' : ''}" aria-haspopup="true" aria-expanded=${this._open}>
          ${this.label}
          <span class="arrow ${this._open ? 'open' : ''}">▾</span>
        </button>
        <div class="dropdown ${this._open ? 'open' : ''}" role="menu" @mouseenter=${this.trigger === 'hover' ? () => this._open = true : nothing}>
          ${this.items.map(item => item.divider
            ? html`<div class="menu-divider" role="separator"></div>`
            : html`<a class="menu-item" href=${item.href || '#'} @click=${(e: Event) => this._onItemClick(e, item)} role="menuitem" tabindex="0">
                ${item.icon ? html`<span .innerHTML=${item.icon}></span>` : nothing}
                ${item.label}
              </a>`
          )}
        </div>
      </div>
    `;
  }

  private _onTriggerClick() {
    if (this.trigger === 'click') this._open = !this._open;
  }

  private _onItemClick(e: Event, item: TopNavMenuItem) {
    e.preventDefault();
    this._open = false;
    dispatchEvent(this, 'select', { item });
    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._onDocClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onDocClick);
  }

  private _onDocClick = (e: Event) => {
    if (!this.contains(e.target as Node)) this._open = false;
  };
}

declare global {
  interface HTMLElementTagNameMap { 'gds-top-nav-menu': GdsTopNavMenu; }
}