import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

@customElement('gds-date-time-input')
export class GdsDateTimeInput extends GdsBaseElement {
  @property({ type: String }) value = '';
  @property({ type: String }) min = '';
  @property({ type: String }) max = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) error = '';
  @property({ type: String }) label = '';

  private _datePart = '';
  private _timePart = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; width: 100%; }
      .label { display: block; font-size: var(--gds-font-size-sm); font-weight: var(--gds-font-weight-medium); margin-bottom: var(--gds-space-2); color: var(--gds-color-text); }
      .dt-wrapper { display: flex; align-items: center; gap: var(--gds-space-2); }
      .dt-input {
        flex: 1; width: 100%; padding: var(--gds-space-2) var(--gds-space-3); border: 1px solid var(--gds-color-border-strong);
        border-radius: var(--gds-radius-md); background: var(--gds-color-surface); color: var(--gds-color-text);
        font-size: var(--gds-font-size-sm); font-family: var(--gds-font-sans); box-sizing: border-box;
        transition: border-color var(--gds-duration-fast) var(--gds-ease-default), box-shadow var(--gds-duration-fast) var(--gds-ease-default);
      }
      .dt-input:focus { outline: none; border-color: var(--gds-color-primary); box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
      .dt-input:disabled { opacity: 0.5; cursor: not-allowed; }
      .dt-input.error { border-color: var(--gds-color-danger); }
      .error-msg { display: block; font-size: var(--gds-font-size-xs); color: var(--gds-color-danger); margin-top: var(--gds-space-1); }
    `,
  ];

  protected render() {
    return html`
      ${this.label ? html`<label class="label">${this.label}</label>` : nothing}
      <div class="dt-wrapper">
        <input
          type="date"
          class="dt-input ${this.error ? 'error' : ''}"
          .value=${this._datePart}
          min=${this.min}
          max=${this.max}
          ?disabled=${this.disabled}
          aria-label="Date"
          aria-invalid=${!!this.error}
          @input=${this._onDateInput}
          @change=${this._onChange}
        />
        <input
          type="time"
          class="dt-input ${this.error ? 'error' : ''}"
          .value=${this._timePart}
          ?disabled=${this.disabled}
          aria-label="Time"
          aria-invalid=${!!this.error}
          @input=${this._onTimeInput}
          @change=${this._onChange}
        />
      </div>
      ${this.error ? html`<span class="error-msg">${this.error}</span>` : nothing}
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._parseValue();
  }

  updated(changedProps: Map<string, unknown>) {
    super.updated(changedProps);
    if (changedProps.has('value')) {
      this._parseValue();
    }
  }

  private _parseValue() {
    if (!this.value) {
      this._datePart = '';
      this._timePart = '';
      return;
    }
    const dt = new Date(this.value);
    if (!isNaN(dt.getTime())) {
      this._datePart = dt.toISOString().split('T')[0];
      this._timePart = dt.toTimeString().split(' ')[0].substring(0, 5);
    }
  }

  private _updateValue() {
    if (this._datePart && this._timePart) {
      this.value = `${this._datePart}T${this._timePart}`;
    } else if (this._datePart) {
      this.value = this._datePart;
    } else {
      this.value = '';
    }
  }

  private _onDateInput(e: Event) {
    this._datePart = (e.target as HTMLInputElement).value;
    this._updateValue();
    dispatchEvent(this, 'input', { value: this.value });
  }

  private _onTimeInput(e: Event) {
    this._timePart = (e.target as HTMLInputElement).value;
    this._updateValue();
    dispatchEvent(this, 'input', { value: this.value });
  }

  private _onChange() {
    dispatchEvent(this, 'change', { value: this.value });
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-date-time-input': GdsDateTimeInput; }
}