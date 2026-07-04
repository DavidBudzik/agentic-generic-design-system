import { html, css, nothing, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';

@customElement('gds-progress-bar')
export class GdsProgressBar extends GdsBaseElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 100;
  @property({ type: String }) variant: 'linear' | 'circular' = 'linear';
  @property({ type: String }) size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @property({ type: Boolean }) showValue = false;
  @property({ type: String }) trackColor = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline-flex; align-items: center; gap: var(--gds-space-2); }
      .linear {
        width: 100%; height: 0.5rem; background: var(--progress-track, var(--gds-color-bg-muted));
        border-radius: var(--gds-radius-full); overflow: hidden;
      }
      .linear .bar {
        height: 100%; background: var(--gds-color-primary); border-radius: var(--gds-radius-full);
        transition: width var(--gds-duration-normal) var(--gds-ease-default);
      }
      .value-text {
        font-size: var(--gds-font-size-sm); color: var(--gds-color-text);
        font-weight: var(--gds-font-weight-semibold); min-width: 2.5rem; text-align: right;
      }
    `,
  ];

  protected render() {
    const pct = Math.min(100, Math.max(0, (this.value / this.max) * 100));
    const trackStyle = this.trackColor ? `--progress-track: ${this.trackColor};` : '';

    if (this.variant === 'circular') {
      const sizeMap: Record<string, number> = { sm: 32, md: 48, lg: 64, xl: 96 };
      const s = sizeMap[this.size] || 48;
      const stroke = 4;
      const r = (s - stroke * 2) / 2;
      const circ = 2 * Math.PI * r;
      const offset = circ - (pct / 100) * circ;
      return html`
        <svg width=${s} height=${s} viewBox="0 0 ${s} ${s}" role="progressbar" aria-valuenow=${this.value} aria-valuemin="0" aria-valuemax=${this.max}>
          <circle cx=${s / 2} cy=${s / 2} r=${r} fill="none" stroke=${this.trackColor || 'var(--gds-color-bg-muted)'} stroke-width=${stroke} />
          ${svg`<circle cx=${s / 2} cy=${s / 2} r=${r} fill="none" stroke="var(--gds-color-primary)" stroke-width=${stroke} stroke-linecap="round" stroke-dasharray=${circ} stroke-dashoffset=${offset} transform="rotate(-90 ${s / 2} ${s / 2})" style="transition: stroke-dashoffset var(--gds-duration-normal) var(--gds-ease-default);" />`}
        </svg>
        ${this.showValue ? html`<span class="value-text">${Math.round(pct)}%</span>` : nothing}
      `;
    }

    return html`
      <div class="linear" style=${trackStyle} role="progressbar" aria-valuenow=${this.value} aria-valuemin="0" aria-valuemax=${this.max}>
        <div class="bar" style="width: ${pct}%"></div>
      </div>
      ${this.showValue ? html`<span class="value-text">${Math.round(pct)}%</span>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-progress-bar': GdsProgressBar; }
}