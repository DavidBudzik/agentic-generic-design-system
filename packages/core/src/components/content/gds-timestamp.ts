import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';

@customElement('gds-timestamp')
export class GdsTimestamp extends GdsBaseElement {
  @property({ type: String }) value = '';
  @property({ type: String }) format: 'relative' | 'date' | 'time' | 'datetime' = 'datetime';
  @property({ type: String }) locale = 'en-US';

  private _updateInterval: ReturnType<typeof setInterval> | null = null;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline; font-family: var(--gds-font-sans); }
      time { font-size: var(--gds-font-size-sm); color: var(--gds-color-text-muted); }
    `,
  ];

  protected render() {
    const date = new Date(this.value);
    if (isNaN(date.getTime())) {
      return html`<time>${this.value}</time>`;
    }
    const formatted = this._format(date);
    const isoStr = date.toISOString();
    return html`<time datetime=${isoStr} title=${date.toLocaleString(this.locale)}>${formatted}</time>`;
  }

  private _format(date: Date): string {
    switch (this.format) {
      case 'relative':
        return this._relativeFormat(date);
      case 'date':
        return date.toLocaleDateString(this.locale, { year: 'numeric', month: 'short', day: 'numeric' });
      case 'time':
        return date.toLocaleTimeString(this.locale, { hour: '2-digit', minute: '2-digit' });
      case 'datetime':
      default:
        return date.toLocaleString(this.locale, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
  }

  private _relativeFormat(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    const diffWeek = Math.floor(diffDay / 7);
    const diffMonth = Math.floor(diffDay / 30);
    const diffYear = Math.floor(diffDay / 365);

    if (diffSec < 0) {
      const absSec = Math.abs(diffSec);
      const absMin = Math.abs(diffMin);
      const absHour = Math.abs(diffHour);
      const absDay = Math.abs(diffDay);
      if (absSec < 60) return 'in a few seconds';
      if (absMin < 60) return `in ${absMin} minute${absMin > 1 ? 's' : ''}`;
      if (absHour < 24) return `in ${absHour} hour${absHour > 1 ? 's' : ''}`;
      if (absDay < 7) return `in ${absDay} day${absDay > 1 ? 's' : ''}`;
      return date.toLocaleDateString(this.locale);
    }

    if (diffSec < 60) return 'just now';
    if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    if (diffDay === 1) return 'yesterday';
    if (diffDay < 7) return `${diffDay} days ago`;
    if (diffWeek < 4) return `${diffWeek} week${diffWeek > 1 ? 's' : ''} ago`;
    if (diffMonth < 12) return `${diffMonth} month${diffMonth > 1 ? 's' : ''} ago`;
    return `${diffYear} year${diffYear > 1 ? 's' : ''} ago`;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.format === 'relative') {
      this._updateInterval = setInterval(() => this.requestUpdate(), 60000);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._updateInterval) {
      clearInterval(this._updateInterval);
      this._updateInterval = null;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-timestamp': GdsTimestamp; }
}