import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

@customElement('gds-typeahead-item')
export class GdsTypeaheadItem extends GdsBaseElement {
  @property({ type: String }) label = '';
  @property({ type: String }) value = '';
  @property({ type: String }) icon = '';
  @property({ type: String }) description = '';
  @property({ type: Boolean }) highlighted = false;
  @property({ type: Boolean }) selected = false;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; font-family: var(--gds-font-sans); }
      .item {
        display: flex; align-items: center; gap: var(--gds-space-2);
        padding: var(--gds-space-2) var(--gds-space-3); cursor: pointer;
        font-size: var(--gds-font-size-sm); color: var(--gds-color-text);
        border-radius: var(--gds-radius-sm); transition: background var(--gds-duration-fast) var(--gds-ease-default);
      }
      .item:hover, .item.highlighted { background: var(--gds-color-bg-muted); }
      .item.selected { background: rgba(37,99,235,0.08); color: var(--gds-color-primary); }
      .item:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
      .item-icon { display: inline-flex; flex-shrink: 0; }
      .item-content { flex: 1; min-width: 0; }
      .item-label { font-weight: var(--gds-font-weight-medium); }
      .item-desc { font-size: var(--gds-font-size-xs); color: var(--gds-color-text-muted); margin-top: var(--gds-space-1); }
      .check { color: var(--gds-color-primary); flex-shrink: 0; }
    `,
  ];

  protected render() {
    return html`
      <div
        class="item ${this.highlighted ? 'highlighted' : ''} ${this.selected ? 'selected' : ''}"
        @click=${this._onClick}
        @keydown=${this._onKeyDown}
        role="option"
        aria-selected=${this.selected}
        tabindex="0"
      >
        ${this.icon ? html`<span class="item-icon" .innerHTML=${this.icon}></span>` : nothing}
        <span class="item-content">
          <span class="item-label">${this.label}</span>
          ${this.description ? html`<span class="item-desc">${this.description}</span>` : nothing}
        </span>
        ${this.selected ? html`<span class="check" aria-hidden="true">✓</span>` : nothing}
      </div>
    `;
  }

  private _onClick() {
    dispatchEvent(this, 'select', { value: this.value, label: this.label });
  }

  private _onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._onClick();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-typeahead-item': GdsTypeaheadItem; }
}