import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

interface SelectorOption {
  label: string;
  value: string;
  icon?: string;
  description?: string;
}

@customElement('gds-selector')
export class GdsSelector extends GdsBaseElement {
  @property({ type: Array }) options: SelectorOption[] = [];
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = 'Select...';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) searchable = false;

  private _open = false;
  private _search = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; font-family: var(--gds-font-sans); }
      .container { position: relative; }
      .trigger {
        display: flex; align-items: center; justify-content: space-between; gap: var(--gds-space-2);
        padding: var(--gds-space-2) var(--gds-space-3); border: 1px solid var(--gds-color-border-strong);
        border-radius: var(--gds-radius-md); background: var(--gds-color-surface); color: var(--gds-color-text);
        cursor: pointer; transition: border-color var(--gds-duration-fast) var(--gds-ease-default), box-shadow var(--gds-duration-fast) var(--gds-ease-default);
        font-size: var(--gds-font-size-sm); min-height: 2.5rem; box-sizing: border-box;
      }
      .trigger:hover:not(.disabled) { border-color: var(--gds-color-primary); }
      .trigger:focus-visible, .trigger.open { outline: none; border-color: var(--gds-color-primary); box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
      .trigger.disabled { opacity: 0.5; cursor: not-allowed; }
      .trigger-value { display: flex; align-items: center; gap: var(--gds-space-2); flex: 1; min-width: 0; }
      .trigger-icon { display: inline-flex; flex-shrink: 0; }
      .trigger-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .placeholder { color: var(--gds-color-text-muted); }
      .arrow { color: var(--gds-color-text-muted); transition: transform var(--gds-duration-fast) var(--gds-ease-default); flex-shrink: 0; }
      .arrow.open { transform: rotate(180deg); }
      .dropdown {
        position: absolute; top: 100%; left: 0; right: 0; max-height: 16rem; overflow-y: auto;
        background: var(--gds-color-surface); border: 1px solid var(--gds-color-border);
        border-radius: var(--gds-radius-md); box-shadow: var(--gds-shadow-lg); z-index: var(--gds-z-dropdown);
        display: none; margin-top: var(--gds-space-1);
      }
      .dropdown.open { display: block; }
      .search-wrapper { padding: var(--gds-space-2); border-bottom: 1px solid var(--gds-color-border); }
      .search-input { width: 100%; border: 1px solid var(--gds-color-border); border-radius: var(--gds-radius-sm); padding: var(--gds-space-1) var(--gds-space-2); font-size: var(--gds-font-size-sm); outline: none; }
      .option { display: flex; align-items: center; gap: var(--gds-space-2); padding: var(--gds-space-2) var(--gds-space-3); cursor: pointer; font-size: var(--gds-font-size-sm); color: var(--gds-color-text); transition: background var(--gds-duration-fast) var(--gds-ease-default); }
      .option:hover { background: var(--gds-color-bg-muted); }
      .option.selected { background: rgba(37,99,235,0.08); color: var(--gds-color-primary); }
      .option-icon { display: inline-flex; flex-shrink: 0; }
      .option-content { flex: 1; min-width: 0; }
      .option-label { font-weight: var(--gds-font-weight-medium); }
      .option-desc { font-size: var(--gds-font-size-xs); color: var(--gds-color-text-muted); }
      .empty { padding: var(--gds-space-3); text-align: center; color: var(--gds-color-text-muted); font-size: var(--gds-font-size-sm); }
    `,
  ];

  protected render() {
    const selected = this.options.find(o => o.value === this.value);
    const filtered = this.searchable && this._search
      ? this.options.filter(o => o.label.toLowerCase().includes(this._search.toLowerCase()))
      : this.options;

    return html`
      <div class="container">
        <div
          class="trigger ${this._open ? 'open' : ''} ${this.disabled ? 'disabled' : ''}"
          @click=${() => !this.disabled && (this._open = !this._open)}
          role="combobox"
          aria-expanded=${this._open}
          aria-haspopup="listbox"
          tabindex=${this.disabled ? -1 : 0}
          @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && !this.disabled && (this._open = !this._open)}
        >
          <span class="trigger-value">
            ${selected?.icon ? html`<span class="trigger-icon" .innerHTML=${selected.icon}></span>` : nothing}
            <span class="trigger-label ${!selected ? 'placeholder' : ''}">${selected ? selected.label : this.placeholder}</span>
          </span>
          <span class="arrow ${this._open ? 'open' : ''}">▾</span>
        </div>
        <div class="dropdown ${this._open ? 'open' : ''}" role="listbox">
          ${this.searchable ? html`
            <div class="search-wrapper">
              <input class="search-input" placeholder="Search..." .value=${this._search} @input=${this._onSearch} @click=${(e: Event) => e.stopPropagation()} />
            </div>
          ` : nothing}
          ${filtered.length === 0
            ? html`<div class="empty">No options</div>`
            : filtered.map(opt => html`
              <div
                class="option ${opt.value === this.value ? 'selected' : ''}"
                @click=${() => this._select(opt.value)}
                role="option"
                aria-selected=${opt.value === this.value}
                tabindex="0"
                @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this._select(opt.value)}
              >
                ${opt.icon ? html`<span class="option-icon" .innerHTML=${opt.icon}></span>` : nothing}
                <span class="option-content">
                  <span class="option-label">${opt.label}</span>
                  ${opt.description ? html`<span class="option-desc">${opt.description}</span>` : nothing}
                </span>
              </div>
            `)}
        </div>
      </div>
    `;
  }

  private _onSearch(e: Event) {
    this._search = (e.target as HTMLInputElement).value;
    this.requestUpdate();
  }

  private _select(value: string) {
    this.value = value;
    this._open = false;
    this._search = '';
    dispatchEvent(this, 'change', { value });
    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._onDocClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onDocClick);
  }

  private _onDocClick = (e: Event) => {
    if (!this.contains(e.target as Node)) this._open = false;
  };
}

declare global {
  interface HTMLElementTagNameMap { 'gds-selector': GdsSelector; }
}