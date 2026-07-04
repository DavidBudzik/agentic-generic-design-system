import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';

@customElement('gds-form-layout')
export class GdsFormLayout extends GdsBaseElement {
  @property({ type: Number }) columns = 1;
  @property({ type: String }) gap = 'md';
  @property({ type: Number }) maxColumns = 1;
  @property({ type: String }) labelPosition: 'top' | 'left' = 'top';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      .form-layout {
        display: grid;
        grid-template-columns: repeat(var(--form-columns, 1), 1fr);
        gap: var(--form-gap, var(--gds-space-4));
      }
      @media (max-width: 768px) {
        .form-layout { grid-template-columns: 1fr; }
      }
      ::slotted([label-position='left']) { display: flex; align-items: center; }
    `,
  ];

  protected render() {
    const gapMap: Record<string, string> = {
      xs: 'var(--gds-space-1)',
      sm: 'var(--gds-space-2)',
      md: 'var(--gds-space-4)',
      lg: 'var(--gds-space-6)',
      xl: 'var(--gds-space-8)',
    };
    const cols = Math.min(this.columns, this.maxColumns || this.columns);
    return html`
      <div
        class="form-layout"
        style="--form-columns: ${cols}; --form-gap: ${gapMap[this.gap] || gapMap.md};"
        role="group"
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-form-layout': GdsFormLayout; }
}