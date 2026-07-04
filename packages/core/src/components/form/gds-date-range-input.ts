import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

@customElement('gds-date-range-input')
export class GdsDateRangeInput extends GdsBaseElement {
  @property({ type: String }) startDate = '';
  @property({ type: String }) endDate = '';
  @property({ type: String }) min = '';
  @property({ type: String }) max = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) error = '';
  @property({ type: String }) label = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; width: 100%; }
      .label { display: block; font-size: var(--gds-font-size-sm); font-weight: var(--gds-font-weight-medium); margin-bottom: var(--gds-space-2); color: var(--gds-color-text); }
      .range-wrapper { display: flex; align-items: center; gap: var(--gds-space-2); }
      .date-input {
        flex: 1; width: 100%; padding: var(--gds-space-2) var(--gds-space-3); border: 1px solid var(--gds-color-border-strong);
        border-radius: var(--gds-radius-md); background: var(--gds-color-surface); color: var(--gds-color-text);
        font-size: var(--gds-font-size-sm); font-family: var(--gds-font-sans); box-sizing: border-box;
        transition: border-color var(--gds-duration-fast) var(--gds-ease-default), box-shadow var(--gds-duration-fast) var(--gds-ease-default);
      }
      .date-input:focus { outline: none; border-color: var(--gds-color-primary); box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
      .date-input:disabled { opacity: 0.5; cursor: not-allowed; }
      .date-input.error { border-color: var(--gds-color-danger); }
      .connector { color: var(--gds-color-text-muted); font-size: var(--gds-font-size-sm); flex-shrink: 0; }
      .error-msg { display: block; font-size: var(--gds-font-size-xs); color: var(--gds-color-danger); margin-top: var(--gds-space-1); }
    `,
  ];

  protected render() {
    return html`
      ${this.label ? html`<label class="label">${this.label}</label>` : nothing}
      <div class="range-wrapper">
        <input
          type="date"
          class="date-input ${this.error ? 'error' : ''}"
          .value=${this.startDate}
          min=${this.min}
          max=${this.endDate || this.max}
          ?disabled=${this.disabled}
          aria-label="Start date"
          aria-invalid=${!!this.error}
          @input=${this._onStartInput}
          @change=${this._onChange}
        />
        <span class="connector">→</span>
        <input
          type="date"
          class="date-input ${this.error ? 'error' : ''}"
          .value=${this.endDate}
          min=${this.startDate || this.min}
          max=${this.max}
          ?disabled=${this.disabled}
          aria-label="End date"
          aria-invalid=${!!this.error}
          @input=${this._onEndInput}
          @change=${this._onChange}
        />
      </div>
      ${this.error ? html`<span class="error-msg">${this.error}</span>` : nothing}
    `;
  }

  private _onStartInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.startDate = input.value;
    dispatchEvent(this, 'input', { startDate: this.startDate, endDate: this.endDate });
  }

  private _onEndInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.endDate = input.value;
    dispatchEvent(this, 'input', { startDate: this.startDate, endDate: this.endDate });
  }

  private _onChange() {
    dispatchEvent(this, 'change', { startDate: this.startDate, endDate: this.endDate });
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-date-range-input': GdsDateRangeInput; }
}