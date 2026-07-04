import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';
import type { Orientation } from '../../utils/types.js';

interface TabItem {
  label: string;
  value: string;
  disabled?: boolean;
}

@customElement('gds-tab-list')
export class GdsTabList extends GdsBaseElement {
  @property({ type: Array }) tabs: TabItem[] = [];
  @property({ type: String }) value = '';
  @property({ type: String }) orientation: Orientation = 'horizontal';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; font-family: var(--gds-font-sans); }
      .tab-container { display: flex; flex-direction: column; }
      :host([orientation='vertical']) .tab-container { flex-direction: row; }
      .tab-list {
        display: flex; gap: var(--gds-space-1); padding: var(--gds-space-1);
        border-bottom: 1px solid var(--gds-color-border);
      }
      :host([orientation='vertical']) .tab-list { flex-direction: column; border-bottom: none; border-right: 1px solid var(--gds-color-border); }
      .tab-trigger {
        padding: var(--gds-space-2) var(--gds-space-4); cursor: pointer;
        font-size: var(--gds-font-size-sm); color: var(--gds-color-text-muted);
        border: none; background: transparent; border-radius: var(--gds-radius-md);
        transition: all var(--gds-duration-fast) var(--gds-ease-default);
        font-weight: var(--gds-font-weight-medium); font-family: var(--gds-font-sans);
      }
      .tab-trigger:hover:not(.disabled) { color: var(--gds-color-text); background: var(--gds-color-bg-muted); }
      .tab-trigger.active { color: var(--gds-color-primary); background: rgba(37,99,235,0.08); }
      .tab-trigger.disabled { opacity: 0.5; cursor: not-allowed; }
      .tab-trigger:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
      .tab-panels { flex: 1; }
      .tab-panel { display: none; padding: var(--gds-space-4); }
      .tab-panel.active { display: block; }
    `,
  ];

  protected render() {
    const activeIndex = this.tabs.findIndex(t => t.value === this.value);
    const activeValue = activeIndex >= 0 ? this.value : (this.tabs[0]?.value || '');

    return html`
      <div class="tab-container">
        <div class="tab-list" role="tablist" aria-orientation=${this.orientation}>
          ${this.tabs.map((tab, i) => {
            const isActive = tab.value === activeValue;
            return html`<button
              class="tab-trigger ${isActive ? 'active' : ''} ${tab.disabled ? 'disabled' : ''}"
              role="tab"
              aria-selected=${isActive}
              aria-disabled=${tab.disabled || false}
              tabindex=${isActive ? 0 : -1}
              ?disabled=${tab.disabled}
              @click=${() => !tab.disabled && this._select(tab.value)}
              @keydown=${(e: KeyboardEvent) => this._onKeyDown(e, i)}
            >${tab.label}</button>`;
          })}
        </div>
        <div class="tab-panels">
          ${this.tabs.map((tab) => {
            const isActive = tab.value === activeValue;
            return html`<div class="tab-panel ${isActive ? 'active' : ''}" role="tabpanel" aria-labelledby=${`tab-${tab.value}`}>
              <slot name=${`panel-${tab.value}`}></slot>
            </div>`;
          })}
        </div>
      </div>
    `;
  }

  private _select(value: string) {
    this.value = value;
    dispatchEvent(this, 'change', { value });
  }

  private _onKeyDown(e: KeyboardEvent, index: number) {
    const tabs = this.tabs.filter(t => !t.disabled);
    const currentTab = this.tabs[index];
    const enabledIndex = tabs.indexOf(currentTab);
    if (enabledIndex < 0) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = tabs[(enabledIndex + 1) % tabs.length];
      if (next) this._select(next.value);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = tabs[(enabledIndex - 1 + tabs.length) % tabs.length];
      if (prev) this._select(prev.value);
    } else if (e.key === 'Home') {
      e.preventDefault();
      if (tabs[0]) this._select(tabs[0].value);
    } else if (e.key === 'End') {
      e.preventDefault();
      if (tabs[tabs.length - 1]) this._select(tabs[tabs.length - 1].value);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-tab-list': GdsTabList; }
}