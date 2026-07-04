import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

@customElement('gds-token')
export class GdsToken extends GdsBaseElement {
  @property({ type: String }) label = '';
  @property({ type: String }) value = '';
  @property({ type: Boolean }) removable = false;
  @property({ type: String }) variant: 'default' | 'primary' | 'success' | 'warning' | 'danger' = 'default';
  @property({ type: Boolean }) selected = false;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline-flex; }
      .token {
        display: inline-flex; align-items: center; gap: var(--gds-space-1);
        padding: var(--gds-space-1) var(--gds-space-2); border-radius: var(--gds-radius-full);
        font-size: var(--gds-font-size-xs); font-family: var(--gds-font-sans);
        background: var(--gds-color-bg-muted); color: var(--gds-color-text);
        border: 1px solid transparent; transition: all var(--gds-duration-fast) var(--gds-ease-default);
        cursor: default; user-select: none;
      }
      .token.variant-primary { background: rgba(37,99,235,0.1); color: var(--gds-color-primary); }
      .token.variant-success { background: rgba(34,197,94,0.1); color: var(--gds-color-success); }
      .token.variant-warning { background: rgba(245,158,11,0.1); color: var(--gds-color-warning); }
      .token.variant-danger { background: rgba(220,38,38,0.1); color: var(--gds-color-danger); }
      .token.selected { border-color: var(--gds-color-primary); }
      .remove-btn { border: none; background: transparent; cursor: pointer; padding: 0; display: inline-flex; color: inherit; opacity: 0.6; transition: opacity var(--gds-duration-fast) var(--gds-ease-default); }
      .remove-btn:hover { opacity: 1; }
    `,
  ];

  protected render() {
    return html`
      <span
        class="token variant-${this.variant} ${this.selected ? 'selected' : ''}"
        role="listitem"
        aria-selected=${this.selected}
      >
        ${this.label || this.value}
        ${this.removable ? html`<button class="remove-btn" @click=${this._remove} aria-label="Remove ${this.label}">✕</button>` : nothing}
      </span>
    `;
  }

  private _remove() {
    dispatchEvent(this, 'remove', { value: this.value, label: this.label });
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-token': GdsToken; }
}