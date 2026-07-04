import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';

@customElement('gds-section')
export class GdsSection extends GdsBaseElement {
  @property({ type: String }) padding = 'md';
  @property({ type: String }) maxWidth = 'full';
  @property({ type: String }) background = 'default';
  @property({ type: Boolean }) bordered = false;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      .section {
        width: 100%; margin: 0 auto;
        padding-top: var(--section-py, var(--gds-space-6));
        padding-bottom: var(--section-py, var(--gds-space-6));
        padding-left: var(--section-px, var(--gds-space-4));
        padding-right: var(--section-px, var(--gds-space-4));
        max-width: var(--section-max-width, 100%);
        background: var(--section-bg, transparent);
        box-sizing: border-box;
      }
      .section.bordered { border-top: 1px solid var(--gds-color-border); border-bottom: 1px solid var(--gds-color-border); }
    `,
  ];

  protected render() {
    const paddingMap: Record<string, string> = {
      none: '0',
      xs: 'var(--gds-space-1)',
      sm: 'var(--gds-space-2)',
      md: 'var(--gds-space-4)',
      lg: 'var(--gds-space-6)',
      xl: 'var(--gds-space-8)',
      '2xl': 'var(--gds-space-12)',
    };
    const maxWidthMap: Record<string, string> = {
      sm: '40rem',
      md: '48rem',
      lg: '64rem',
      xl: '80rem',
      full: '100%',
    };
    const bgMap: Record<string, string> = {
      default: 'transparent',
      muted: 'var(--gds-color-bg-muted)',
      surface: 'var(--gds-color-surface)',
    };

    return html`
      <div
        class="section ${this.bordered ? 'bordered' : ''}"
        style="
          --section-py: ${paddingMap[this.padding] || paddingMap.md};
          --section-px: ${paddingMap[this.padding] || paddingMap.md};
          --section-max-width: ${maxWidthMap[this.maxWidth] || maxWidthMap.full};
          --section-bg: ${bgMap[this.background] || bgMap.default};
        "
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-section': GdsSection; }
}