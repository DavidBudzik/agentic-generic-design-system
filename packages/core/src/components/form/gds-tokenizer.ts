import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

interface TokenItem {
  label: string;
  value: string;
}

@customElement('gds-tokenizer')
export class GdsTokenizer extends GdsBaseElement {
  @property({ type: Array }) tokens: TokenItem[] = [];
  @property({ type: String }) placeholder = 'Add token...';
  @property({ type: String }) delimiter = ',';
  @property({ type: Boolean }) disabled = false;

  private _inputValue = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; font-family: var(--gds-font-sans); }
      .container {
        display: flex; flex-wrap: wrap; gap: var(--gds-space-1); align-items: center;
        min-height: 2.5rem; padding: var(--gds-space-2); border: 1px solid var(--gds-color-border-strong);
        border-radius: var(--gds-radius-md); background: var(--gds-color-surface);
        transition: border-color var(--gds-duration-fast) var(--gds-ease-default), box-shadow var(--gds-duration-fast) var(--gds-ease-default);
      }
      .container:focus-within { border-color: var(--gds-color-primary); box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
      .container.disabled { opacity: 0.5; cursor: not-allowed; }
      .token {
        display: inline-flex; align-items: center; gap: var(--gds-space-1);
        padding: var(--gds-space-1) var(--gds-space-2); background: var(--gds-color-bg-muted);
        border-radius: var(--gds-radius-full); font-size: var(--gds-font-size-xs); color: var(--gds-color-text);
      }
      .token button { border: none; background: transparent; cursor: pointer; color: var(--gds-color-text-muted); padding: 0; display: inline-flex; }
      .token button:hover { color: var(--gds-color-danger); }
      .input { border: none; outline: none; background: transparent; font-size: var(--gds-font-size-sm); flex: 1; min-width: 6rem; color: var(--gds-color-text); }
    `,
  ];

  protected render() {
    return html`
      <div class="container ${this.disabled ? 'disabled' : ''}" @click=${this._focusInput}>
        ${this.tokens.map((token, i) => html`
          <span class="token" role="listitem">
            ${token.label}
            <button @click=${(e: Event) => this._removeToken(e, i)} aria-label="Remove ${token.label}">✕</button>
          </span>
        `)}
        <input
          class="input"
          .value=${this._inputValue}
          placeholder=${this.tokens.length === 0 ? this.placeholder : ''}
          ?disabled=${this.disabled}
          @input=${this._onInput}
          @keydown=${this._onKeyDown}
          aria-label=${this.placeholder}
        />
      </div>
    `;
  }

  private _focusInput() {
    const input = this.renderRoot.querySelector('.input') as HTMLInputElement;
    input?.focus();
  }

  private _onInput(e: Event) {
    this._inputValue = (e.target as HTMLInputElement).value;
  }

  private _onKeyDown(e: KeyboardEvent) {
    const input = e.target as HTMLInputElement;
    if (e.key === 'Enter' || e.key === this.delimiter) {
      e.preventDefault();
      this._addToken(input.value.trim());
    } else if (e.key === 'Backspace' && input.value === '' && this.tokens.length > 0) {
      this._removeLastToken();
    }
  }

  private _addToken(value: string) {
    if (!value) return;
    const token: TokenItem = { label: value, value };
    this.tokens = [...this.tokens, token];
    this._inputValue = '';
    const input = this.renderRoot.querySelector('.input') as HTMLInputElement;
    if (input) input.value = '';
    dispatchEvent(this, 'change', { tokens: this.tokens });
    this.requestUpdate();
  }

  private _removeToken(e: Event, index: number) {
    e.stopPropagation();
    this.tokens = this.tokens.filter((_, i) => i !== index);
    dispatchEvent(this, 'change', { tokens: this.tokens });
    this.requestUpdate();
  }

  private _removeLastToken() {
    this.tokens = this.tokens.slice(0, -1);
    dispatchEvent(this, 'change', { tokens: this.tokens });
    this.requestUpdate();
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-tokenizer': GdsTokenizer; }
}