import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

@customElement('gds-code-block')
export class GdsCodeBlock extends GdsBaseElement {
  @property({ type: String }) code = '';
  @property({ type: String }) language = '';
  @property({ type: Boolean }) showLineNumbers = false;
  @property({ type: Boolean }) showCopyButton = false;

  private _copied = false;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      .container { position: relative; background: var(--gds-color-bg-muted); border-radius: var(--gds-radius-md); overflow: hidden; }
      .header { display: flex; align-items: center; justify-content: space-between; padding: var(--gds-space-2) var(--gds-space-3); background: var(--gds-color-surface-hover); border-bottom: 1px solid var(--gds-color-border); }
      .lang-label { font-size: var(--gds-font-size-xs); color: var(--gds-color-text-muted); font-family: var(--gds-font-mono); text-transform: uppercase; }
      .copy-btn { border: 1px solid var(--gds-color-border); background: var(--gds-color-surface); color: var(--gds-color-text); padding: var(--gds-space-1) var(--gds-space-2); border-radius: var(--gds-radius-sm); font-size: var(--gds-font-size-xs); cursor: pointer; font-family: var(--gds-font-sans); transition: background var(--gds-duration-fast) var(--gds-ease-default); }
      .copy-btn:hover { background: var(--gds-color-bg-muted); }
      .copy-btn:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
      .copied { color: var(--gds-color-success); }
      .code-wrapper { display: flex; overflow-x: auto; }
      .line-numbers { display: flex; flex-direction: column; padding: var(--gds-space-3) var(--gds-space-2); background: rgba(0,0,0,0.03); border-right: 1px solid var(--gds-color-border); user-select: none; }
      .line-number { font-family: var(--gds-font-mono); font-size: var(--gds-font-size-sm); color: var(--gds-color-text-muted); line-height: 1.5; text-align: right; }
      pre { margin: 0; padding: var(--gds-space-3); flex: 1; }
      code { font-family: var(--gds-font-mono); font-size: var(--gds-font-size-sm); color: var(--gds-color-text); line-height: 1.5; }
      :host(:not([show-line-numbers])) .container { background: var(--gds-color-bg-muted); }
    `,
  ];

  protected render() {
    const lines = this.code ? this.code.split('\n') : [];
    return html`
      <div class="container">
        ${(this.language || this.showCopyButton) ? html`
          <div class="header">
            <span class="lang-label">${this.language || 'plaintext'}</span>
            ${this.showCopyButton ? html`
              <button class="copy-btn ${this._copied ? 'copied' : ''}" @click=${this._copy} aria-label="Copy code">
                ${this._copied ? 'Copied!' : 'Copy'}
              </button>
            ` : nothing}
          </div>
        ` : nothing}
        <div class="code-wrapper">
          ${this.showLineNumbers ? html`
            <div class="line-numbers" aria-hidden="true">
              ${lines.map((_, i) => html`<span class="line-number">${i + 1}</span>`)}
            </div>
          ` : nothing}
          <pre><code class="language-${this.language || 'plaintext'}">${this.code}</code></pre>
        </div>
      </div>
    `;
  }

  private _copy() {
    navigator.clipboard.writeText(this.code).then(() => {
      this._copied = true;
      this.requestUpdate();
      setTimeout(() => { this._copied = false; this.requestUpdate(); }, 2000);
      dispatchEvent(this, 'copy', { code: this.code });
    });
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-code-block': GdsCodeBlock; }
}