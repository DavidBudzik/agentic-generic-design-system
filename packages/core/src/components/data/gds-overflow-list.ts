import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

@customElement('gds-overflow-list')
export class GdsOverflowList extends GdsBaseElement {
  @property({ type: Array }) items: unknown[] = [];
  @property({ type: Number }) height = 300;
  @property({ type: Number }) itemHeight = 40;
  @property({ type: String }) renderItem = '';

  private _scrollTop = 0;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      .scroll-container {
        overflow-y: auto; border: 1px solid var(--gds-color-border); border-radius: var(--gds-radius-md);
        background: var(--gds-color-surface);
      }
      .spacer { position: relative; width: 100%; }
      .item {
        position: absolute; left: 0; right: 0; display: flex; align-items: center;
        padding: 0 var(--gds-space-3); box-sizing: border-box;
        border-bottom: 1px solid var(--gds-color-border);
        font-size: var(--gds-font-size-sm); color: var(--gds-color-text);
        font-family: var(--gds-font-sans);
      }
      .item:hover { background: var(--gds-color-bg-muted); }
      .empty { padding: var(--gds-space-4); text-align: center; color: var(--gds-color-text-muted); }
    `,
  ];

  protected render() {
    const visibleStart = Math.max(0, Math.floor(this._scrollTop / this.itemHeight) - 2);
    const visibleCount = Math.ceil(this.height / this.itemHeight) + 4;
    const visibleEnd = Math.min(this.items.length, visibleStart + visibleCount);
    const visibleItems = this.items.slice(visibleStart, visibleEnd);
    const totalHeight = this.items.length * this.itemHeight;

    return html`
      <div
        class="scroll-container"
        style="height: ${this.height}px;"
        @scroll=${this._onScroll}
        role="list"
        aria-setsize=${this.items.length}
      >
        <div class="spacer" style="height: ${totalHeight}px;">
          ${this.items.length === 0
            ? html`<div class="empty">No items</div>`
            : visibleItems.map((item, i) => {
                const index = visibleStart + i;
                return html`<div class="item" style="top: ${index * this.itemHeight}px; height: ${this.itemHeight}px;" role="listitem" aria-posinset=${index + 1}>
                  ${this._renderItemContent(item)}
                </div>`;
              })
          }
        </div>
      </div>
    `;
  }

  private _renderItemContent(item: unknown): unknown {
    if (typeof item === 'string' || typeof item === 'number') return item;
    if (item && typeof item === 'object' && 'label' in item) {
      return (item as { label: string }).label;
    }
    return JSON.stringify(item);
  }

  private _onScroll(e: Event) {
    this._scrollTop = (e.target as HTMLElement).scrollTop;
    this.requestUpdate();
  }

  scrollToIndex(index: number) {
    const container = this.renderRoot.querySelector('.scroll-container') as HTMLElement;
    if (container) {
      container.scrollTop = index * this.itemHeight;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._onKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._onKeyDown);
  }

  private _onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Home') { this.scrollToIndex(0); dispatchEvent(this, 'scroll', { index: 0 }); }
    else if (e.key === 'End') { this.scrollToIndex(this.items.length - 1); dispatchEvent(this, 'scroll', { index: this.items.length - 1 }); }
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-overflow-list': GdsOverflowList; }
}