import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';

@customElement('gds-status-dot')
export class GdsStatusDot extends GdsBaseElement {
  @property({ type: String }) variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral' = 'neutral';
  @property({ type: String }) size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @property({ type: Boolean }) pulse = false;
  @property({ type: String }) label = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline-flex; align-items: center; gap: var(--gds-space-2); }
      .dot { border-radius: var(--gds-radius-full); flex-shrink: 0; }
      .dot.size-sm { width: 0.5rem; height: 0.5rem; }
      .dot.size-md { width: 0.625rem; height: 0.625rem; }
      .dot.size-lg { width: 0.875rem; height: 0.875rem; }
      .dot.size-xl { width: 1.25rem; height: 1.25rem; }
      .dot.variant-info { background: var(--gds-color-info); }
      .dot.variant-success { background: var(--gds-color-success); }
      .dot.variant-warning { background: var(--gds-color-warning); }
      .dot.variant-danger { background: var(--gds-color-danger); }
      .dot.variant-neutral { background: var(--gds-color-text-muted); }
      .dot.pulse { animation: gds-dot-pulse 1.5s ease-in-out infinite; }
      @keyframes gds-dot-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.2); } }
      .label { font-size: var(--gds-font-size-sm); color: var(--gds-color-text); }
    `,
  ];

  protected render() {
    return html`
      <span class="dot size-${this.size} variant-${this.variant} ${this.pulse ? 'pulse' : ''}" role="status" aria-label=${this.label || this.variant}></span>
      ${this.label ? html`<span class="label">${this.label}</span>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-status-dot': GdsStatusDot; }
}