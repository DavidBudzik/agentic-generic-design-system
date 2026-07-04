import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';
import type { Position } from '../../utils/types.js';

@customElement('gds-overlay')
export class GdsOverlay extends GdsBaseElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) placement: Position = 'bottom';
  @property({ type: String }) trigger: 'click' | 'hover' = 'click';
  @property({ type: Boolean }) dismissible = true;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline-block; position: relative; }
      .trigger { display: inline-block; cursor: pointer; }
      .panel {
        position: absolute; z-index: var(--gds-z-dropdown);
        background: var(--gds-color-surface); border: 1px solid var(--gds-color-border);
        border-radius: var(--gds-radius-md); box-shadow: var(--gds-shadow-lg);
        padding: var(--gds-space-3); min-width: 12rem; display: none;
      }
      :host([open]) .panel { display: block; }
      .panel.placement-top { bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: var(--gds-space-2); }
      .panel.placement-bottom { top: 100%; left: 50%; transform: translateX(-50%); margin-top: var(--gds-space-2); }
      .panel.placement-left { right: 100%; top: 50%; transform: translateY(-50%); margin-right: var(--gds-space-2); }
      .panel.placement-right { left: 100%; top: 50%; transform: translateY(-50%); margin-left: var(--gds-space-2); }
      .backdrop { position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: calc(var(--gds-z-dropdown) - 1); display: none; }
      :host([open]) .backdrop { display: block; }
    `,
  ];

  protected render() {
    return html`
      <span class="trigger" @click=${this._onTriggerClick} @mouseenter=${this._onTriggerEnter} @mouseleave=${this._onTriggerLeave}>
        <slot name="trigger"></slot>
      </span>
      ${this.dismissible ? html`<div class="backdrop" @click=${this._dismiss}></div>` : nothing}
      <div class="panel placement-${this.placement}" @mouseenter=${this._onPanelEnter} @mouseleave=${this._onPanelLeave} role="dialog" aria-modal=${this.dismissible ? 'false' : 'true'}>
        <slot></slot>
      </div>
    `;
  }

  private _onTriggerClick() {
    if (this.trigger === 'click') {
      this.open = !this.open;
      dispatchEvent(this, 'toggle', { open: this.open });
    }
  }

  private _onTriggerEnter() {
    if (this.trigger === 'hover') {
      this.open = true;
      dispatchEvent(this, 'toggle', { open: this.open });
    }
  }

  private _onTriggerLeave() {
    if (this.trigger === 'hover' && this.dismissible) {
      this.open = false;
      dispatchEvent(this, 'toggle', { open: this.open });
    }
  }

  private _onPanelEnter() {
    if (this.trigger === 'hover') {
      this.open = true;
    }
  }

  private _onPanelLeave() {
    if (this.trigger === 'hover' && this.dismissible) {
      this.open = false;
      dispatchEvent(this, 'toggle', { open: this.open });
    }
  }

  private _dismiss() {
    if (this.dismissible) {
      this.open = false;
      dispatchEvent(this, 'dismiss', {});
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._onKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._onKeyDown);
  }

  private _onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.open && this.dismissible) {
      this._dismiss();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-overlay': GdsOverlay; }
}