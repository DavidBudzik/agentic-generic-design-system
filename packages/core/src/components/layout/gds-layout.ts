import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import type { Alignment, JustifyContent } from '../../utils/types.js';

@customElement('gds-layout')
export class GdsLayout extends GdsBaseElement {
  @property({ type: String }) direction: 'row' | 'column' = 'column';
  @property({ type: String }) gap = '';
  @property({ type: String }) align: Alignment = 'stretch';
  @property({ type: String }) justify: JustifyContent = 'start';
  @property({ type: Boolean }) wrap = false;
  @property({ type: String }) basis = '';
  @property({ type: Number }) grow = -1;
  @property({ type: Number }) shrink = -1;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: flex; }
      .layout { display: flex; width: 100%; }
    `,
  ];

  protected render() {
    const alignMap: Record<string, string> = { start: 'flex-start', center: 'center', end: 'flex-end', stretch: 'stretch' };
    const justifyMap: Record<string, string> = { start: 'flex-start', center: 'center', end: 'flex-end', between: 'space-between', around: 'space-around', evenly: 'space-evenly' };
    const style = [
      `flex-direction: ${this.direction === 'row' ? 'row' : 'column'}`,
      this.gap ? `gap: var(--gds-space-${this.gap})` : '',
      `align-items: ${alignMap[this.align] || 'stretch'}`,
      `justify-content: ${justifyMap[this.justify] || 'flex-start'}`,
      this.wrap ? 'flex-wrap: wrap' : '',
      this.basis ? `flex-basis: ${this.basis}` : '',
      this.grow >= 0 ? `flex-grow: ${this.grow}` : '',
      this.shrink >= 0 ? `flex-shrink: ${this.shrink}` : '',
    ].filter(Boolean).join('; ');
    return html`<div class="layout" style=${style}><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-layout': GdsLayout; }
}