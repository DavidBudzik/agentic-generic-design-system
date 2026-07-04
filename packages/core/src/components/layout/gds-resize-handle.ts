import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

@customElement('gds-resize-handle')
export class GdsResizeHandle extends GdsBaseElement {
  @property({ type: String }) orientation: 'horizontal' | 'vertical' = 'horizontal';
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = Infinity;

  private _dragging = false;
  private _startPos = 0;
  private _delta = 0;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      .handle-horizontal {
        cursor: col-resize; width: 4px; height: 100%; background: var(--gds-color-border);
        transition: background var(--gds-duration-fast) var(--gds-ease-default);
        position: relative;
      }
      .handle-horizontal:hover, .handle-horizontal.dragging { background: var(--gds-color-primary); }
      .handle-vertical {
        cursor: row-resize; width: 100%; height: 4px; background: var(--gds-color-border);
        transition: background var(--gds-duration-fast) var(--gds-ease-default);
        position: relative;
      }
      .handle-vertical:hover, .handle-vertical.dragging { background: var(--gds-color-primary); }
    `,
  ];

  protected render() {
    const cls = this.orientation === 'horizontal' ? 'handle-horizontal' : 'handle-vertical';
    return html`
      <div
        class="${cls} ${this._dragging ? 'dragging' : ''}"
        @mousedown=${this._onMouseDown}
        @touchstart=${this._onTouchStart}
        role="separator"
        aria-orientation=${this.orientation}
        aria-valuenow=${this._delta}
        aria-valuemin=${this.min}
        aria-valuemax=${this.max}
        tabindex="0"
        @keydown=${this._onKeyDown}
      ></div>
    `;
  }

  private _onMouseDown(e: MouseEvent) {
    this._startDrag(e.clientX, e.clientY);
    const moveHandler = (ev: MouseEvent) => this._onMouseMove(ev);
    const upHandler = () => {
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', upHandler);
      this._stopDrag();
    };
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
    e.preventDefault();
  }

  private _onTouchStart(e: TouchEvent) {
    const touch = e.touches[0];
    this._startDrag(touch.clientX, touch.clientY);
    const moveHandler = (ev: TouchEvent) => this._onTouchMove(ev);
    const upHandler = () => {
      document.removeEventListener('touchmove', moveHandler);
      document.removeEventListener('touchend', upHandler);
      this._stopDrag();
    };
    document.addEventListener('touchmove', moveHandler);
    document.addEventListener('touchend', upHandler);
    e.preventDefault();
  }

  private _startDrag(x: number, y: number) {
    this._dragging = true;
    this._startPos = this.orientation === 'horizontal' ? x : y;
    this._delta = 0;
    this.requestUpdate();
  }

  private _onMouseMove(e: MouseEvent) {
    this._updateDelta(this.orientation === 'horizontal' ? e.clientX : e.clientY);
  }

  private _onTouchMove(e: TouchEvent) {
    const touch = e.touches[0];
    this._updateDelta(this.orientation === 'horizontal' ? touch.clientX : touch.clientY);
  }

  private _updateDelta(pos: number) {
    let delta = pos - this._startPos;
    delta = Math.max(this.min, Math.min(this.max, delta));
    this._delta = delta;
    dispatchEvent(this, 'resize', { delta: this._delta });
    this.requestUpdate();
  }

  private _stopDrag() {
    this._dragging = false;
    this.requestUpdate();
  }

  private _onKeyDown(e: KeyboardEvent) {
    let delta = 0;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') delta = -10;
    else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') delta = 10;
    if (delta !== 0) {
      e.preventDefault();
      this._delta = Math.max(this.min, Math.min(this.max, this._delta + delta));
      dispatchEvent(this, 'resize', { delta: this._delta });
      this.requestUpdate();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-resize-handle': GdsResizeHandle; }
}