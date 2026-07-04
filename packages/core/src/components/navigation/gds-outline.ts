import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

interface OutlineItem {
  label: string;
  href?: string;
  children?: OutlineItem[];
}

@customElement('gds-outline')
export class GdsOutline extends GdsBaseElement {
  @property({ type: Array }) items: OutlineItem[] = [];
  @property({ type: String }) activeItem = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; font-family: var(--gds-font-sans); }
      .outline { list-style: none; padding: 0; margin: 0; }
      .outline-item { margin-bottom: var(--gds-space-1); }
      .item-link {
        display: flex; align-items: center; gap: var(--gds-space-1);
        padding: var(--gds-space-1) var(--gds-space-2); font-size: var(--gds-font-size-sm);
        color: var(--gds-color-text-muted); text-decoration: none; border-radius: var(--gds-radius-sm);
        cursor: pointer; transition: all var(--gds-duration-fast) var(--gds-ease-default);
      }
      .item-link:hover { color: var(--gds-color-text); background: var(--gds-color-bg-muted); }
      .item-link.active { color: var(--gds-color-primary); font-weight: var(--gds-font-weight-medium); }
      .toggle-btn { border: none; background: transparent; cursor: pointer; padding: 0; display: inline-flex; color: var(--gds-color-text-muted); transition: transform var(--gds-duration-fast) var(--gds-ease-default); }
      .toggle-btn.expanded { transform: rotate(90deg); }
      .children { list-style: none; padding-left: var(--gds-space-4); margin: var(--gds-space-1) 0 0; display: none; }
      .children.expanded { display: block; }
    `,
  ];

  protected render() {
    return html`<ul class="outline" role="tree">${this._renderItems(this.items)}</ul>`;
  }

  private _renderItems(items: OutlineItem[], level = 0): unknown {
    return items.map(item => {
      const hasChildren = item.children && item.children.length > 0;
      const isActive = item.href === this.activeItem || item.label === this.activeItem;
      const id = `outline-${level}-${item.label.replace(/\s/g, '-')}`;
      return html`
        <li class="outline-item" role="treeitem" aria-expanded=${hasChildren ? 'true' : nothing}>
          <a
            class="item-link ${isActive ? 'active' : ''}"
            href=${item.href || '#'}
            @click=${(e: Event) => { if (item.href) { e.preventDefault(); this._select(item); } }}
            aria-current=${isActive ? 'page' : nothing}
          >
            ${hasChildren ? html`<button class="toggle-btn" @click=${(e: Event) => this._toggle(e, id)} aria-label="Toggle">▶</button>` : nothing}
            ${item.label}
          </a>
          ${hasChildren ? html`<ul class="children expanded" id=${id} role="group">${this._renderItems(item.children!, level + 1)}</ul>` : nothing}
        </li>
      `;
    });
  }

  private _toggle(e: Event, id: string) {
    e.preventDefault();
    e.stopPropagation();
    const el = this.renderRoot.querySelector(`#${CSS.escape(id)}`);
    if (el) {
      el.classList.toggle('expanded');
    }
  }

  private _select(item: OutlineItem) {
    this.activeItem = item.href || item.label;
    dispatchEvent(this, 'change', { activeItem: this.activeItem });
    this.requestUpdate();
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-outline': GdsOutline; }
}