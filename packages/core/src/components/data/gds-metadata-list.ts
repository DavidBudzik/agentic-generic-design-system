import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';

interface MetadataItem {
  key: string;
  value: string;
}

@customElement('gds-metadata-list')
export class GdsMetadataList extends GdsBaseElement {
  @property({ type: Array }) items: MetadataItem[] = [];
  @property({ type: Number }) columns = 1;
  @property({ type: Boolean }) divided = false;
  @property({ type: String }) title = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; font-family: var(--gds-font-sans); }
      .title { font-size: var(--gds-font-size-sm); font-weight: var(--gds-font-weight-semibold); color: var(--gds-color-text); margin-bottom: var(--gds-space-3); }
      .list { display: grid; grid-template-columns: repeat(var(--meta-columns, 1), 1fr); gap: var(--gds-space-2); }
      .item { display: flex; flex-direction: column; padding: var(--gds-space-2) 0; }
      .item.divided { border-bottom: 1px solid var(--gds-color-border); }
      .key { font-size: var(--gds-font-size-xs); color: var(--gds-color-text-muted); font-weight: var(--gds-font-weight-medium); text-transform: uppercase; letter-spacing: 0.025em; }
      .value { font-size: var(--gds-font-size-sm); color: var(--gds-color-text); margin-top: var(--gds-space-1); }
    `,
  ];

  protected render() {
    return html`
      ${this.title ? html`<div class="title">${this.title}</div>` : nothing}
      <div class="list" style="--meta-columns: ${this.columns};">
        ${this.items.map((item) => html`
          <div class="item ${this.divided ? 'divided' : ''}">
            <span class="key">${item.key}</span>
            <span class="value">${item.value}</span>
          </div>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-metadata-list': GdsMetadataList; }
}