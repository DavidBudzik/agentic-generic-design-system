import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

@customElement('gds-checkbox-input')
export class GdsCheckboxInput extends GdsBaseElement {
  @property({ type: String }) label = '';
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) indeterminate = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) hint = '';
  @property({ type: String }) error = '';
  @property({ type: Boolean }) required = false;
  @property({ type: String }) value = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      .wrapper { display: flex; align-items: flex-start; gap: var(--gds-space-2); }
      :host([disabled]) .wrapper { cursor: not-allowed; opacity: 0.5; }
      .box {
        width: 1.25rem; height: 1.25rem; border: 2px solid var(--gds-color-border-strong);
        border-radius: var(--gds-radius-sm); display: inline-flex; align-items: center; justify-content: center;
        background: var(--gds-color-surface); transition: all var(--gds-duration-fast) var(--gds-ease-default);
        flex-shrink: 0; cursor: pointer; margin-top: 2px;
      }
      :host([checked]) .box { background: var(--gds-color-primary); border-color: var(--gds-color-primary); }
      :host([checked]) .box svg { display: block; }
      .box svg { display: none; color: var(--gds-color-on-primary); }
      :host([indeterminate]) .box { background: var(--gds-color-primary); border-color: var(--gds-color-primary); }
      :host([indeterminate]) .box .indeterminate { display: block; }
      .indeterminate { display: none; width: 0.6rem; height: 2px; background: var(--gds-color-on-primary); border-radius: 1px; }
      .content { flex: 1; }
      .label-text { font-size: var(--gds-font-size-sm); color: var(--gds-color-text); user-select: none; cursor: pointer; }
      .label-text.required::after { content: ' *'; color: var(--gds-color-danger); }
      .hint-text { display: block; font-size: var(--gds-font-size-xs); color: var(--gds-color-text-muted); margin-top: var(--gds-space-1); }
      .error-msg { display: block; font-size: var(--gds-font-size-xs); color: var(--gds-color-danger); margin-top: var(--gds-space-1); }
      input { position: absolute; opacity: 0; width: 0; height: 0; }
      input:focus-visible + .box { box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
    `,
  ];

  protected render() {
    return html`
      <div class="wrapper">
        <input
          type="checkbox"
          .checked=${this.checked}
          .indeterminate=${this.indeterminate}
          ?disabled=${this.disabled}
          ?required=${this.required}
          @change=${this._toggle}
          aria-label=${this.label || 'checkbox'}
          aria-invalid=${!!this.error}
          aria-describedby=${this.hint ? 'hint' : ''}
        />
        <span class="box" @click=${this._toggle}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
          <span class="indeterminate"></span>
        </span>
        <div class="content" @click=${this._toggle}>
          ${this.label ? html`<span class="label-text ${this.required ? 'required' : ''}">${this.label}</span>` : html`<slot></slot>`}
          ${this.hint ? html`<span class="hint-text" id="hint">${this.hint}</span>` : nothing}
          ${this.error ? html`<span class="error-msg">${this.error}</span>` : nothing}
        </div>
      </div>
    `;
  }

  private _toggle() {
    if (this.disabled) return;
    this.indeterminate = false;
    this.checked = !this.checked;
    dispatchEvent(this, 'change', { checked: this.checked, value: this.value });
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-checkbox-input': GdsCheckboxInput; }
}