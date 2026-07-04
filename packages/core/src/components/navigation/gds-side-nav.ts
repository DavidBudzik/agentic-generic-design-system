import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

interface SideNavItem {
  label: string;
  href?: string;
  icon?: string;
  children?: SideNavItem[];
}

@customElement('gds-side-nav')
export class GdsSideNav extends GdsBaseElement {
  @property({ type: Array }) items: SideNavItem[] = [];
  @property({ type: String }) active = '';
  @property({ type: Boolean }) collapsible = true;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; font-family: var(--gds-font-sans); }
      .nav { list-style: none; padding: 0; margin: 0; }
      .nav-item { margin-bottom: var(--gds-space-1); }
      .nav-link {
        display: flex; align-items: center; gap: var(--gds-space-2);
        padding: var(--gds-space-2) var(--gds-space-3); font-size: var(--gds-font-size-sm);
        color: var(--gds-color-text-muted); text-decoration: none; border-radius: var(--gds-radius-sm);
        cursor: pointer; transition: all var(--gds-duration-fast) var(--gds-ease-default);
      }
      .nav-link:hover { color: var(--gds-color-text); background: var(--gds-color-bg-muted); }
      .nav-link.active { color: var(--gds-color-primary); background: rgba(37,99,235,0.08); font-weight: var(--gds-font-weight-medium); }
      .nav-icon { display: inline-flex; flex-shrink: 0; }
      .nav-label { flex: 1; }
      .toggle-btn { border: none; background: transparent; cursor: pointer; padding: 0; color: var(--gds-color-text-muted); display: inline-flex; transition: transform var(--gds-duration-fast) var(--gds-ease-default); }
      .toggle-btn.expanded { transform: rotate(90deg); }
      .children { list-style: none; padding-left: var(--gds-space-4); margin: var(--gds-space-1) 0 0; display: none; }
      .children.expanded { display: block; }
    `,
  ];

  protected render() {
    return html`<ul class="nav" role="menu">${this._renderItems(this.items)}</ul>`;
  }

  private _renderItems(items: SideNavItem[]): unknown {
    return items.map(item => {
      const hasChildren = item.children && item.children.length > 0;
      const isActive = item.href === this.active || item.label === this.active;
      const id = `sidenav-${item.label.replace(/\s/g, '-')}`;
      return html`
        <li class="nav-item" role="none">
          <a
            class="nav-link ${isActive ? 'active' : ''}"
            href=${item.href || '#'}
            @click=${(e: Event) => { if (item.href) { e.preventDefault(); this._select(item); } }}
            role="menuitem"
            aria-current=${isActive ? 'page' : nothing}
            aria-expanded=${hasChildren ? 'true' : nothing}
          >
            ${item.icon ? html`<span class="nav-icon" .innerHTML=${item.icon}></span>` : nothing}
            <span class="nav-label">${item.label}</span>
            ${hasChildren && this.collapsible ? html`<button class="toggle-btn expanded" @click=${(e: Event) => this._toggle(e, id)} aria-label="Toggle submenu">▶</button>` : nothing}
          </a>
          ${hasChildren ? html`<ul class="children expanded" id=${id} role="menu">${this._renderItems(item.children!)}</ul>` : nothing}
        </li>
      `;
    });
  }

  private _toggle(e: Event, id: string) {
    e.preventDefault();
    e.stopPropagation();
    const el = this.renderRoot.querySelector(`#${CSS.escape(id)}`);
    if (el) el.classList.toggle('expanded');
    const btn = e.target as HTMLElement;
    btn.classList.toggle('expanded');
  }

  private _select(item: SideNavItem) {
    this.active = item.href || item.label;
    dispatchEvent(this, 'change', { active: this.active });
    this.requestUpdate();
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-side-nav': GdsSideNav; }
}