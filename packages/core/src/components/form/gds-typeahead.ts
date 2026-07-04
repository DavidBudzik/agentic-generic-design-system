import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

@customElement('gds-typeahead')
export class GdsTypeahead extends GdsBaseElement {
  @property({ type: String }) value = '';
  @property({ type: Array }) suggestions: string[] = [];
  @property({ type: String }) placeholder = 'Search...';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Number }) minChars = 1;
  @property({ type: Boolean }) loading = false;

  private _open = false;
  private _focusedIndex = -1;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; font-family: var(--gds-font-sans); }
      .container { position: relative; }
      .input-wrapper {
        display: flex; align-items: center; gap: var(--gds-space-2);
        padding: var(--gds-space-2) var(--gds-space-3); border: 1px solid var(--gds-color-border-strong);
        border-radius: var(--gds-radius-md); background: var(--gds-color-surface);
        transition: border-color var(--gds-duration-fast) var(--gds-ease-default), box-shadow var(--gds-duration-fast) var(--gds-ease-default);
      }
      .input-wrapper:focus-within { border-color: var(--gds-color-primary); box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
      .input { flex: 1; border: none; outline: none; background: transparent; font-size: var(--gds-font-size-sm); color: var(--gds-color-text); }
      .spinner { width: 1rem; height: 1rem; border: 2px solid var(--gds-color-border); border-top-color: var(--gds-color-primary); border-radius: var(--gds-radius-full); animation: spin 0.6s linear infinite; flex-shrink: 0; }
      @keyframes spin { to { transform: rotate(360deg); } }
      .dropdown {
        position: absolute; top: 100%; left: 0; right: 0; max-height: 16rem; overflow-y: auto;
        background: var(--gds-color-surface); border: 1px solid var(--gds-color-border);
        border-radius: var(--gds-radius-md); box-shadow: var(--gds-shadow-lg); z-index: var(--gds-z-dropdown);
        display: none; margin-top: var(--gds-space-1);
      }
      .dropdown.open { display: block; }
      .suggestion {
        padding: var(--gds-space-2) var(--gds-space-3); cursor: pointer; font-size: var(--gds-font-size-sm);
        color: var(--gds-color-text); transition: background var(--gds-duration-fast) var(--gds-ease-default);
      }
      .suggestion:hover, .suggestion.focused { background: var(--gds-color-bg-muted); }
      .empty { padding: var(--gds-space-3); text-align: center; color: var(--gds-color-text-muted); font-size: var(--gds-font-size-sm); }
    `,
  ];

  protected render() {
    const filtered = this._getFiltered();

    return html`
      <div class="container">
        <div class="input-wrapper">
          <input
            class="input"
            .value=${this.value}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            @input=${this._onInput}
            @focus=${() => this._open = true}
            @keydown=${this._onKeyDown}
            role="combobox"
            aria-expanded=${this._open}
            aria-autocomplete="list"
            aria-controls="typeahead-list"
          />
          ${this.loading ? html`<span class="spinner" aria-label="Loading"></span>` : nothing}
        </div>
        <div class="dropdown ${this._open ? 'open' : ''}" id="typeahead-list" role="listbox">
          ${filtered.length === 0
            ? html`<div class="empty">No suggestions</div>`
            : filtered.map((s, i) => html`<div class="suggestion ${i === this._focusedIndex ? 'focused' : ''}" @click=${() => this._select(s)} @mouseenter=${() => this._focusedIndex = i} role="option" aria-selected=${i === this._focusedIndex} tabindex="0">${s}</div>`)
          }
        </div>
      </div>
    `;
  }

  private _getFiltered(): string[] {
    if (this.value.length < this.minChars) return [];
    return this.suggestions.filter(s => s.toLowerCase().includes(this.value.toLowerCase()));
  }

  private _onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this._open = this.value.length >= this.minChars;
    this._focusedIndex = -1;
    dispatchEvent(this, 'input', { value: this.value });
  }

  private _onKeyDown(e: KeyboardEvent) {
    const filtered = this._getFiltered();
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this._focusedIndex = Math.min(filtered.length - 1, this._focusedIndex + 1);
      this._open = true;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this._focusedIndex = Math.max(0, this._focusedIndex - 1);
    } else if (e.key === 'Enter' && this._focusedIndex >= 0 && filtered[this._focusedIndex]) {
      e.preventDefault();
      this._select(filtered[this._focusedIndex]);
    } else if (e.key === 'Escape') {
      this._open = false;
    }
  }

  private _select(value: string) {
    this.value = value;
    this._open = false;
    this._focusedIndex = -1;
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
  interface HTMLElementTagNameMap { 'gds-typeahead': GdsTypeahead; }
}