import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

@customElement('gds-app-shell')
export class GdsAppShell extends GdsBaseElement {
  @property({ type: Boolean, reflect: true }) sidebarOpen = true;
  @property({ type: String }) sidebarWidth = '16rem';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; height: 100vh; }
      .shell { display: grid; grid-template-areas: "header header" "sidebar main"; grid-template-rows: auto 1fr; grid-template-columns: var(--gds-shell-sidebar-w, 16rem) 1fr; height: 100%; transition: grid-template-columns var(--gds-duration-normal) var(--gds-ease-default); }
      :host(:not([sidebar-open])) .shell { grid-template-columns: 0 1fr; }
      .header { grid-area: header; border-bottom: 1px solid var(--gds-color-border); background: var(--gds-color-surface); padding: var(--gds-space-3) var(--gds-space-4); display: flex; align-items: center; gap: var(--gds-space-3); }
      .sidebar { grid-area: sidebar; border-right: 1px solid var(--gds-color-border); background: var(--gds-color-surface); overflow: hidden; overflow-y: auto; transition: opacity var(--gds-duration-normal) var(--gds-ease-default); }
      :host(:not([sidebar-open])) .sidebar { opacity: 0; }
      .main { grid-area: main; overflow-y: auto; padding: var(--gds-space-6); background: var(--gds-color-bg); }
      .toggle-btn { border: none; background: transparent; cursor: pointer; padding: var(--gds-space-2); border-radius: var(--gds-radius-sm); display: inline-flex; }
      .toggle-btn:hover { background: var(--gds-color-bg-muted); }
    `,
  ];

  protected render() {
    return html`
      <div class="shell" style="--gds-shell-sidebar-w: ${this.sidebarWidth};">
        <header class="header">
          <button class="toggle-btn" @click=${this._toggleSidebar} aria-label="Toggle sidebar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          </button>
          <slot name="header"></slot>
        </header>
        <aside class="sidebar"><slot name="sidebar"></slot></aside>
        <main class="main"><slot></slot></main>
      </div>
    `;
  }

  private _toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    dispatchEvent(this, 'sidebar-toggle', { open: this.sidebarOpen });
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-app-shell': GdsAppShell; }
}