import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

interface MultiSelectorOption {
  label: string;
  value: string;
}

@customElement('gds-multi-selector')
export class GdsMultiSelector extends GdsBaseElement {
  @property({ type: Array }) options: MultiSelectorOption[] = [];
  @property({ type: Array }) selected: string[] = [];
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
      .pills-area {
        display: flex; flex-wrap: wrap; gap: var(--gds-space-1); align-items: center;
        min-height: 2.5rem; padding: var(--gds-space-2); border: 1px solid var(--gds-color-border-strong);
        border-radius: var(--gds-radius-md); background: var(--gds-color-surface); cursor: pointer;
        transition: border-color var(--gds-duration-fast) var(--gds-ease-default);
      }
      .pills-area:focus-within { border-color: var(--gds-color-primary); box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
      .pill {
        display: inline-flex; align-items: center; gap: var(--gds-space-1);
        padding: var(--gds-space-1) var(--gds-space-2); background: var(--gds-color-bg-muted);
        border-radius: var(--gds-radius-full); font-size: var(--gds-font-size-xs); color: var(--gds-color-text);
      }
      .pill button { border: none; background: transparent; cursor: pointer; color: var(--gds-color-text-muted); padding: 0; display: inline-flex; }
      .pill button:hover { color: var(--gds-color-danger); }
      .placeholder { color: var(--gds-color-text-muted); font-size: var(--gds-font-size-sm); }
      .search-input { border: none; outline: none; background: transparent; font-size: var(--gds-font-size-sm); flex: 1; min-width: 4rem; color: var(--gds-color-text); }
      .dropdown {
        position: absolute; top: 100%; left: 0; right: 0; max-height: 12rem; overflow-y: auto;
        background: var(--gds-color-surface); border: 1px solid var(--gds-color-border);
        border-radius: var(--gds-radius-md); box-shadow: var(--gds-shadow-md); z-index: var(--gds-z-dropdown);
        display: none; margin-top: var(--gds-space-1);
      }
      .dropdown.open { display: block; }
      .option { padding: var(--gds-space-2) var(--gds-space-3); cursor: pointer; font-size: var(--gds-font-size-sm); color: var(--gds-color-text); transition: background var(--gds-duration-fast) var(--gds-ease-default); }
      .option:hover { background: var(--gds-color-bg-muted); }
      .option.selected { background: var(--gds-color-primary); color: var(--gds-color-on-primary); }
      .empty { padding: var(--gds-space-3); color: var(--gds-color-text-muted); font-size: var(--gds-font-size-sm); text-align: center; }
    `,
  ];

  protected render() {
    const selectedOptions = this.options.filter(o => this.selected.includes(o.value));
    const availableOptions = this.searchable
      ? this.options.filter(o => !this.selected.includes(o.value) && (this._search === '' || o.label.toLowerCase().includes(this._search.toLowerCase())))
      : this.options.filter(o => !this.selected.includes(o.value));

    return html`
      <div class="container">
        <div class="pills-area" @click=${() => !this.disabled && (this._open = !this._open)}>
          ${selectedOptions.map(opt => html`
            <span class="pill">
              ${opt.label}
              <button @click=${(e: Event) => this._remove(e, opt.value)} aria-label="Remove ${opt.label}">✕</button>
            </span>
          `)}
          ${this.searchable
            ? html`<input class="search-input" placeholder=${selectedOptions.length === 0 ? this.placeholder : ''} .value=${this._search} @click=${(e: Event) => e.stopPropagation()} @input=${this._onSearch} ?disabled=${this.disabled} />`
            : selectedOptions.length === 0
              ? html`<span class="placeholder">${this.placeholder}</span>`
              : nothing
          }
        </div>
        <div class="dropdown ${this._open ? 'open' : ''}">
          ${availableOptions.length === 0
            ? html`<div class="empty">No options available</div>`
            : availableOptions.map(opt => html`
              <div class="option" @click=${() => this._add(opt.value)} role="option" tabindex="0" @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this._add(opt.value)}>
                ${opt.label}
              </div>
            `)}
        </div>
      </div>
    `;
  }

  private _onSearch(e: Event) {
    this._search = (e.target as HTMLInputElement).value;
    this._open = true;
    this.requestUpdate();
  }

  private _add(value: string) {
    this.selected = [...this.selected, value];
    this._search = '';
    dispatchEvent(this, 'change', { selected: this.selected });
    this.requestUpdate();
  }

  private _remove(e: Event, value: string) {
    e.stopPropagation();
    this.selected = this.selected.filter(v => v !== value);
    dispatchEvent(this, 'change', { selected: this.selected });
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
  interface HTMLElementTagNameMap { 'gds-multi-selector': GdsMultiSelector; }
}