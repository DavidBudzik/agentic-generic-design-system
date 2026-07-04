import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

interface CalendarDay {
  date: number;
  month: number;
  year: number;
  inMonth: boolean;
  dateObj: Date;
}

@customElement('gds-calendar')
export class GdsCalendar extends GdsBaseElement {
  @property({ type: String }) value = '';
  @property({ type: String }) min = '';
  @property({ type: String }) max = '';
  @property({ type: String }) selectedDate = '';
  @property({ type: Number }) firstDayOfWeek = 0;
  @property({ type: String }) locale = 'en-US';

  private _viewDate: Date = new Date();

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; font-family: var(--gds-font-sans); }
      .calendar { background: var(--gds-color-surface); border: 1px solid var(--gds-color-border); border-radius: var(--gds-radius-md); padding: var(--gds-space-3); width: 18rem; }
      .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--gds-space-3); }
      .month-label { font-size: var(--gds-font-size-sm); font-weight: var(--gds-font-weight-semibold); color: var(--gds-color-text); }
      .nav-btn { border: none; background: transparent; cursor: pointer; padding: var(--gds-space-1); border-radius: var(--gds-radius-sm); color: var(--gds-color-text-muted); display: inline-flex; }
      .nav-btn:hover { background: var(--gds-color-bg-muted); color: var(--gds-color-text); }
      .weekdays { display: grid; grid-template-columns: repeat(7, 1fr); gap: var(--gds-space-1); margin-bottom: var(--gds-space-1); }
      .weekday { text-align: center; font-size: var(--gds-font-size-xs); font-weight: var(--gds-font-weight-medium); color: var(--gds-color-text-muted); padding: var(--gds-space-1); }
      .days { display: grid; grid-template-columns: repeat(7, 1fr); gap: var(--gds-space-1); }
      .day { text-align: center; padding: var(--gds-space-2) 0; font-size: var(--gds-font-size-sm); border: none; background: transparent; cursor: pointer; border-radius: var(--gds-radius-sm); color: var(--gds-color-text); transition: background var(--gds-duration-fast) var(--gds-ease-default); }
      .day:hover:not(.disabled):not(.out) { background: var(--gds-color-bg-muted); }
      .day.out { color: var(--gds-color-text-muted); opacity: 0.5; }
      .day.disabled { color: var(--gds-color-text-muted); cursor: not-allowed; opacity: 0.4; }
      .day.today { font-weight: var(--gds-font-weight-bold); color: var(--gds-color-primary); }
      .day.selected { background: var(--gds-color-primary); color: var(--gds-color-on-primary); }
      .day.selected:hover { background: var(--gds-color-primary-hover); }
      .day:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
    `,
  ];

  protected render() {
    const days = this._getDays();
    const weekdayNames = this._getWeekdayNames();
    const monthLabel = this._viewDate.toLocaleDateString(this.locale, { month: 'long', year: 'numeric' });
    const today = new Date();
    const todayStr = this._dateToStr(today);
    const minDate = this.min ? new Date(this.min) : null;
    const maxDate = this.max ? new Date(this.max) : null;

    return html`
      <div class="calendar" role="grid" aria-label="Calendar">
        <div class="header">
          <button class="nav-btn" @click=${() => this._prevMonth()} aria-label="Previous month">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <span class="month-label">${monthLabel}</span>
          <button class="nav-btn" @click=${() => this._nextMonth()} aria-label="Next month">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
        <div class="weekdays" role="row">
          ${weekdayNames.map(wd => html`<div class="weekday" role="columnheader">${wd}</div>`)}
        </div>
        <div class="days" role="rowgroup">
          ${days.map(day => {
            const dayStr = this._dateToStr(day.dateObj);
            const isDisabled = !!(minDate && day.dateObj < minDate) || !!(maxDate && day.dateObj > maxDate);
            const isSelected = dayStr === this.selectedDate;
            const isToday = dayStr === todayStr;
            return html`<button
              class="day ${day.inMonth ? '' : 'out'} ${isDisabled ? 'disabled' : ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}"
              @click=${() => this._selectDay(day, isDisabled)}
              ?disabled=${isDisabled}
              aria-label=${day.dateObj.toLocaleDateString(this.locale)}
              role="gridcell"
              aria-selected=${isSelected}
            >${day.date}</button>`;
          })}
        </div>
      </div>
    `;
  }

  private _getDays(): CalendarDay[] {
    const year = this._viewDate.getFullYear();
    const month = this._viewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startOffset = (firstDay.getDay() - this.firstDayOfWeek + 7) % 7;
    const days: CalendarDay[] = [];
    for (let i = startOffset; i > 0; i--) {
      const d = new Date(year, month, 1 - i);
      days.push({ date: d.getDate(), month: d.getMonth(), year: d.getFullYear(), inMonth: false, dateObj: d });
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const d = new Date(year, month, i);
      days.push({ date: i, month, year, inMonth: true, dateObj: d });
    }
    const remaining = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month + 1, i);
      days.push({ date: i, month: d.getMonth(), year: d.getFullYear(), inMonth: false, dateObj: d });
    }
    return days;
  }

  private _getWeekdayNames(): string[] {
    const names: string[] = [];
    const baseDate = new Date(2024, 0, 7);
    for (let i = 0; i < 7; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + ((this.firstDayOfWeek + i) % 7));
      names.push(d.toLocaleDateString(this.locale, { weekday: 'narrow' }));
    }
    return names;
  }

  private _prevMonth() {
    this._viewDate = new Date(this._viewDate.getFullYear(), this._viewDate.getMonth() - 1, 1);
    this.requestUpdate();
  }

  private _nextMonth() {
    this._viewDate = new Date(this._viewDate.getFullYear(), this._viewDate.getMonth() + 1, 1);
    this.requestUpdate();
  }

  private _selectDay(day: CalendarDay, disabled: boolean) {
    if (disabled) return;
    const dayStr = this._dateToStr(day.dateObj);
    this.selectedDate = dayStr;
    this.value = dayStr;
    this._viewDate = new Date(day.dateObj);
    dispatchEvent(this, 'change', { value: dayStr, date: day.dateObj });
    this.requestUpdate();
  }

  private _dateToStr(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.value) {
      this._viewDate = new Date(this.value);
    } else if (this.selectedDate) {
      this._viewDate = new Date(this.selectedDate);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-calendar': GdsCalendar; }
}