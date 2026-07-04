import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

interface LightboxImage {
  src: string;
  alt?: string;
}

@customElement('gds-lightbox')
export class GdsLightbox extends GdsBaseElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) src = '';
  @property({ type: String }) alt = '';
  @property({ type: Array }) images: LightboxImage[] = [];
  @property({ type: Boolean }) showThumbnails = false;
  @property({ type: Boolean }) loop = false;

  private _currentIndex = 0;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: contents; }
      .overlay {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0, 0, 0, 0.9); z-index: var(--gds-z-modal, 9999);
        display: none; align-items: center; justify-content: center;
      }
      :host([open]) .overlay { display: flex; }
      .content { max-width: 90%; max-height: 90%; position: relative; }
      .image { max-width: 90vw; max-height: 80vh; object-fit: contain; }
      .close-btn {
        position: absolute; top: var(--gds-space-4); right: var(--gds-space-4);
        background: rgba(255,255,255,0.2); border: none; color: white; cursor: pointer;
        width: 2.5rem; height: 2.5rem; border-radius: var(--gds-radius-full);
        display: flex; align-items: center; justify-content: center; font-size: 1.5rem;
        transition: background var(--gds-duration-fast) var(--gds-ease-default);
      }
      .close-btn:hover { background: rgba(255,255,255,0.3); }
      .nav-btn {
        position: absolute; top: 50%; transform: translateY(-50%);
        background: rgba(255,255,255,0.2); border: none; color: white; cursor: pointer;
        width: 3rem; height: 3rem; border-radius: var(--gds-radius-full);
        display: flex; align-items: center; justify-content: center; font-size: 1.5rem;
        transition: background var(--gds-duration-fast) var(--gds-ease-default);
      }
      .nav-btn:hover { background: rgba(255,255,255,0.3); }
      .nav-btn.prev { left: var(--gds-space-4); }
      .nav-btn.next { right: var(--gds-space-4); }
      .thumbnails { display: flex; gap: var(--gds-space-2); justify-content: center; margin-top: var(--gds-space-3); }
      .thumb { width: 3rem; height: 3rem; object-fit: cover; border-radius: var(--gds-radius-sm); cursor: pointer; opacity: 0.6; transition: opacity var(--gds-duration-fast) var(--gds-ease-default); border: 2px solid transparent; }
      .thumb:hover { opacity: 1; }
      .thumb.active { opacity: 1; border-color: white; }
    `,
  ];

  protected render() {
    const hasMultiple = this.images.length > 1;
    const currentSrc = this.images.length > 0 ? (this.images[this._currentIndex]?.src || this.src) : this.src;
    const currentAlt = this.images.length > 0 ? (this.images[this._currentIndex]?.alt || this.alt) : this.alt;

    return html`
      <div class="overlay" @click=${this._onOverlayClick} role="dialog" aria-modal="true" aria-label="Image lightbox">
        <button class="close-btn" @click=${this.close} aria-label="Close lightbox">✕</button>
        ${hasMultiple ? html`<button class="nav-btn prev" @click=${(e: Event) => this._prev(e)} aria-label="Previous image">‹</button>` : nothing}
        <div class="content">
          <img class="image" src=${currentSrc} alt=${currentAlt} @click=${(e: Event) => e.stopPropagation()} />
          ${this.showThumbnails && this.images.length > 1 ? html`
            <div class="thumbnails">
              ${this.images.map((img, i) => html`<img class="thumb ${i === this._currentIndex ? 'active' : ''}" src=${img.src} alt=${img.alt || ''} @click=${(e: Event) => this._selectThumb(e, i)} />`)}
            </div>
          ` : nothing}
        </div>
        ${hasMultiple ? html`<button class="nav-btn next" @click=${(e: Event) => this._next(e)} aria-label="Next image">›</button>` : nothing}
      </div>
    `;
  }

  private _onOverlayClick(e: Event) {
    if (e.target === e.currentTarget) this.close();
  }

  private _prev(e: Event) {
    e.stopPropagation();
    let idx = this._currentIndex - 1;
    if (idx < 0) idx = this.loop ? this.images.length - 1 : 0;
    this._currentIndex = idx;
    this.requestUpdate();
    dispatchEvent(this, 'change', { index: this._currentIndex });
  }

  private _next(e: Event) {
    e.stopPropagation();
    let idx = this._currentIndex + 1;
    if (idx >= this.images.length) idx = this.loop ? 0 : this.images.length - 1;
    this._currentIndex = idx;
    this.requestUpdate();
    dispatchEvent(this, 'change', { index: this._currentIndex });
  }

  private _selectThumb(e: Event, idx: number) {
    e.stopPropagation();
    this._currentIndex = idx;
    this.requestUpdate();
    dispatchEvent(this, 'change', { index: this._currentIndex });
  }

  close() {
    this.open = false;
    dispatchEvent(this, 'close', {});
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
    if (!this.open) return;
    if (e.key === 'Escape') this.close();
    else if (e.key === 'ArrowLeft' && this.images.length > 1) this._prev(new Event('click'));
    else if (e.key === 'ArrowRight' && this.images.length > 1) this._next(new Event('click'));
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-lightbox': GdsLightbox; }
}