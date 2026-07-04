import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';
import type { Orientation } from '../../utils/types.js';

interface RadioOption {
  label: string;
  value: string;
  description?: string;
}

@customElement('gds-radio-list')
export class GdsRadioList extends GdsBaseElement {
  @property({ type: Array }) options: RadioOption[] = [];
  @property({ type: String }) value = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) name = '';
  @property({ type: String }) orientation: Orientation = 'vertical';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; font-family: var(--gds-font-sans); }
      .radio-list { display: flex; gap: var(--gds-space-2); }
      .radio-list.vertical { flex-direction: column; }
      .radio-list.horizontal { flex-direction: row; flex-wrap: wrap; }
      .radio-item {
        display: flex; align-items: flex-start; gap: var(--gds-space-2);
        padding: var(--gds-space-2) var(--gds-space-3); border: 1px solid var(--gds-color-border);
        border-radius: var(--gds-radius-md); cursor: pointer; transition: all var(--gds-duration-fast) var(--gds-ease-default);
        flex: 1;
      }
      .radio-item:hover:not(.disabled) { border-color: var(--gds-color-primary); background: var(--gds-color-surface-hover); }
      .radio-item.checked { border-color: var(--gds-color-primary); background: rgba(37,99,235,0.05); }
      .radio-item.disabled { opacity: 0.5; cursor: not-allowed; }
      .radio-circle {
        width: 1.25rem; height: 1.25rem; border: 2px solid var(--gds-color-border-strong);
        border-radius: var(--gds-radius-full); display: inline-flex; align-items: center; justify-content: center;
        flex-shrink: 0; margin-top: 2px; background: var(--gds-color-surface);
        transition: all var(--gds-duration-fast) var(--gds-ease-default);
      }
      .radio-item.checked .radio-circle { border-color: var(--gds-color-primary); }
      .radio-item.checked .radio-circle::after { content: ''; width: 0.5rem; height: 0.5rem; border-radius: var(--gds-radius-full); background: var(--gds-color-primary); }
      .radio-content { flex: 1; }
      .radio-label { font-size: var(--gds-font-size-sm); color: var(--gds-color-text); font-weight: var(--gds-font-weight-medium); }
      .radio-description { font-size: var(--gds-font-size-xs); color: var(--gds-color-text-muted); margin-top: var(--gds-space-1); }
      input { position: absolute; opacity: 0; width: 0; height: 0; }
      input:focus-visible + .radio-item { box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
    `,
  ];

  protected render() {
    return html`
      <div class="radio-list ${this.orientation}" role="radiogroup" aria-label=${this.name || 'radio group'}>
        ${this.options.map((opt, i) => {
          const isChecked = opt.value === this.value;
          const isDisabled = this.disabled;
          return html`
            <input
              type="radio"
              name=${this.name || 'radio-list'}
              value=${opt.value}
              .checked=${isChecked}
              ?disabled=${isDisabled}
              @change=${() => this._select(opt.value)}
              aria-label=${opt.label}
            />
            <label
              class="radio-item ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}"
              @click=${() => !isDisabled && this._select(opt.value)}
              tabindex="0"
              @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); !isDisabled && this._select(opt.value); } }}
              role="radio"
              aria-checked=${isChecked}
              aria-posinset=${i + 1}
              aria-setsize=${this.options.length}
            >
              <span class="radio-circle"></span>
              <span class="radio-content">
                <span class="radio-label">${opt.label}</span>
                ${opt.description ? html`<span class="radio-description">${opt.description}</span>` : nothing}
              </span>
            </label>
          `;
        })}
      </div>
    `;
  }

  private _select(value: string) {
    if (this.disabled) return;
    this.value = value;
    dispatchEvent(this, 'change', { value });
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-radio-list': GdsRadioList; }
}