import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('gds-markdown')
export class GdsMarkdown extends GdsBaseElement {
  @property({ type: String }) content = '';
  @property({ type: String }) mode: 'inline' | 'block' = 'block';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; font-family: var(--gds-font-sans); color: var(--gds-color-text); line-height: 1.6; }
      .markdown h1 { font-size: var(--gds-font-size-2xl); font-weight: var(--gds-font-weight-bold); margin: 0 0 var(--gds-space-4); }
      .markdown h2 { font-size: var(--gds-font-size-xl); font-weight: var(--gds-font-weight-bold); margin: var(--gds-space-4) 0 var(--gds-space-2); }
      .markdown h3 { font-size: var(--gds-font-size-lg); font-weight: var(--gds-font-weight-semibold); margin: var(--gds-space-3) 0 var(--gds-space-2); }
      .markdown p { margin: 0 0 var(--gds-space-3); }
      .markdown ul, .markdown ol { margin: 0 0 var(--gds-space-3); padding-left: var(--gds-space-6); }
      .markdown li { margin-bottom: var(--gds-space-1); }
      .markdown a { color: var(--gds-color-primary); text-decoration: underline; }
      .markdown code { font-family: var(--gds-font-mono); background: var(--gds-color-bg-muted); padding: 0.125em 0.375em; border-radius: var(--gds-radius-sm); font-size: 0.875em; }
      .markdown pre { background: var(--gds-color-bg-muted); padding: var(--gds-space-3); border-radius: var(--gds-radius-md); overflow-x: auto; margin: 0 0 var(--gds-space-3); }
      .markdown pre code { background: none; padding: 0; }
      .markdown blockquote { border-left: 3px solid var(--gds-color-border); padding-left: var(--gds-space-4); margin: 0 0 var(--gds-space-3); color: var(--gds-color-text-muted); }
      .markdown strong { font-weight: var(--gds-font-weight-bold); }
      .markdown em { font-style: italic; }
      .markdown hr { border: none; border-top: 1px solid var(--gds-color-border); margin: var(--gds-space-4) 0; }
      .markdown img { max-width: 100%; border-radius: var(--gds-radius-md); }
      .markdown table { border-collapse: collapse; width: 100%; margin: 0 0 var(--gds-space-3); }
      .markdown th, .markdown td { border: 1px solid var(--gds-color-border); padding: var(--gds-space-2) var(--gds-space-3); text-align: left; }
      .markdown th { background: var(--gds-color-bg-muted); font-weight: var(--gds-font-weight-semibold); }
      .inline { display: inline; }
      .inline p { display: inline; margin: 0; }
    `,
  ];

  protected render() {
    const html_content = this._parse(this.content);
    return html`<div class="markdown ${this.mode === 'inline' ? 'inline' : ''}">${unsafeHTML(html_content)}</div>`;
  }

  private _escape(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  private _parse(md: string): string {
    if (!md) return '';
    let result = this._escape(md);

    // Code blocks (```lang\ncode\n```)
    result = result.replace(/```(\w*)\n([\s\S]*?)```/g, (_m, lang, code) => {
      return `<pre><code class="language-${lang}">${code.trim()}</code></pre>`;
    });

    // Headings
    result = result.replace(/^###### (.+)$/gm, '<h6>$1</h6>');
    result = result.replace(/^##### (.+)$/gm, '<h5>$1</h5>');
    result = result.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
    result = result.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    result = result.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    result = result.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    // Horizontal rules
    result = result.replace(/^---$/gm, '<hr/>');

    // Blockquotes
    result = result.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>');

    // Unordered lists
    result = result.replace(/^[\-\*] (.+)$/gm, '<li>$1</li>');
    result = result.replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`);

    // Ordered lists
    result = result.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

    // Bold and italic
    result = result.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    result = result.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Inline code
    result = result.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Links [text](url)
    result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Images ![alt](src)
    result = result.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1"/>');

    // Paragraphs (lines not already wrapped)
    if (this.mode === 'block') {
      result = result.split('\n\n').map(block => {
        block = block.trim();
        if (!block) return '';
        if (block.match(/^<(h[1-6]|ul|ol|pre|blockquote|hr|table|img)/)) return block;
        return `<p>${block.replace(/\n/g, '<br/>')}</p>`;
      }).join('\n');
    }

    return result;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-markdown': GdsMarkdown; }
}