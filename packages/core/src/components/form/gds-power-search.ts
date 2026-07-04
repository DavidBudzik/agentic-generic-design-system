import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

interface PowerSearchFilter {
  label: string;
  options: string[];
}

@customElement('gds-power-search')
export class GdsPowerSearch extends GdsBaseElement {
  @property({ type: String }) value = '';
  @property({ type: Array }) filters: PowerSearchFilter[] = [];
  @property({ type: Array }) suggestions: string[] = [];
  @property({ type: String }) placeholder = 'Search...';

  private _open = false;
  private _activeFilter: PowerSearchFilter | null = null;
  private _focusedSuggestion = -1;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; font-family: var(--gds-font-sans); }
      .container { position: relative; }
      .search-bar {
        display: flex; align-items: center; gap: var(--gds-space-2); flex-wrap: wrap;
        padding: var(--gds-space-2); border: 1px solid var(--gds-color-border-strong);
        border-radius: var(--gds-radius-md); background: var(--gds-color-surface);
        transition: border-color var(--gds-duration-fast) var(--gds-ease-default), box-shadow var(--gds-duration-fast) var(--gds-ease-default);
      }
      .search-bar:focus-within { border-color: var(--gds-color-primary); box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
      .filter-chip {
        display: inline-flex; align-items: center; gap: var(--gds-space-1);
        padding: var(--gds-space-1) var(--gds-space-2); background: var(--gds-color-bg-muted);
        border-radius: var(--gds-radius-sm); font-size: var(--gds-font-size-xs); color: var(--gds-color-text);
        cursor: pointer; white-space: nowrap;
      }
      .filter-chip:hover { background: var(--gds-color-surface-hover); }
      .filter-chip.active { background: var(--gds-color-primary); color: var(--gds-color-on-primary); }
      .search-input { flex: 1; border: none; outline: none; background: transparent; font-size: var(--gds-font-size-sm); color: var(--gds-color-text); min-width: 8rem; }
      .dropdown {
        position: absolute; top: 100%; left: 0; right: 0; max-height: 16rem; overflow-y: auto;
        background: var(--gds-color-surface); border: 1px solid var(--gds-color-border);
        border-radius: var(--gds-radius-md); box-shadow: var(--gds-shadow-lg); z-index: var(--gds-z-dropdown);
        display: none; margin-top: var(--gds-space-1);
      }
      .dropdown.open { display: block; }
      .dropdown-header { padding: var(--gds-space-2) var(--gds-space-3); font-size: var(--gds-font-size-xs); color: var(--gds-color-text-muted); font-weight: var(--gds-font-weight-medium); text-transform: uppercase; }
      .dropdown-item { padding: var(--gds-space-2) var(--gds-space-3); cursor: pointer; font-size: var(--gds-font-size-sm); color: var(--gds-color-text); transition: background var(--gds-duration-fast) var(--gds-ease-default); }
      .dropdown-item:hover, .dropdown-item.focused { background: var(--gds-color-bg-muted); }
      .dropdown-divider { height: 1px; background: var(--gds-color-border); margin: var(--gds-space-1) 0; }
    `,
  ];

  protected render() {
    const filteredSuggestions = this.suggestions.filter(s => s.toLowerCase().includes(this.value.toLowerCase()));

    return html`
      <div class="container">
        <div class="search-bar">
          ${this.filters.map(f => html`
            <span class="filter-chip ${this._activeFilter === f ? 'active' : ''}" @click=${() => this._toggleFilter(f)}>
              ${f.label} ▾
            </span>
          `)}
          <input
            class="search-input"
            .value=${this.value}
            placeholder=${this.placeholder}
            @input=${this._onInput}
            @focus=${() => this._open = true}
            @keydown=${this._onKeyDown}
            role="searchbox"
            aria-label="Search"
          />
        </div>
        <div class="dropdown ${this._open ? 'open' : ''}" role="listbox">
          ${this._activeFilter ? html`
            <div class="dropdown-header">${this._activeFilter.label}</div>
            ${this._activeFilter.options.map(opt => html`
              <div class="dropdown-item" @click=${() => this._selectFilterOption(opt)} role="option">${opt}</div>
            `)}
            <div class="dropdown-divider"></div>
          ` : nothing}
          ${filteredSuggestions.length > 0 ? html`
            <div class="dropdown-header">Suggestions</div>
            ${filteredSuggestions.map((s, i) => html`
              <div class="dropdown-item ${i === this._focusedSuggestion ? 'focused' : ''}" @click=${() => this._selectSuggestion(s)} role="option" tabindex="0">${s}</div>
            `)}
          ` : nothing}
        </div>
      </div>
    `;
  }

  private _onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this._open = true;
    dispatchEvent(this, 'input', { value: this.value });
  }

  private _toggleFilter(f: PowerSearchFilter) {
    this._activeFilter = this._activeFilter === f ? null : f;
    this._open = true;
    this.requestUpdate();
  }

  private _selectFilterOption(opt: string) {
    this.value = `${this._activeFilter!.label}:${opt} ${this.value}`;
    this._activeFilter = null;
    dispatchEvent(this, 'filter', { filter: opt, value: this.value });
    this.requestUpdate();
  }

  private _selectSuggestion(s: string) {
    this.value = s;
    this._open = false;
    dispatchEvent(this, 'change', { value: s });
    this.requestUpdate();
  }

  private _onKeyDown(e: KeyboardEvent) {
    const suggestions = this.suggestions.filter(s => s.toLowerCase().includes(this.value.toLowerCase()));
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this._focusedSuggestion = Math.min(suggestions.length - 1, this._focusedSuggestion + 1);
      this.requestUpdate();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this._focusedSuggestion = Math.max(0, this._focusedSuggestion - 1);
      this.requestUpdate();
    } else if (e.key === 'Enter' && this._focusedSuggestion >= 0 && suggestions[this._focusedSuggestion]) {
      this._selectSuggestion(suggestions[this._focusedSuggestion]);
    } else if (e.key === 'Escape') {
      this._open = false;
      this.requestUpdate();
    }
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
  interface HTMLElementTagNameMap { 'gds-power-search': GdsPowerSearch; }
}