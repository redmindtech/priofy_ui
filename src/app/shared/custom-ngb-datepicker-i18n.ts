import { formatDate, FormStyle, getLocaleDayNames, getLocaleMonthNames, TranslationWidth } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  NgbDatepickerI18n, NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';


@Injectable()
export class CustomNgbDatepickerI18n extends NgbDatepickerI18n {

  private _locale = 'th';
  private _weekdaysShort: readonly string[];
  private _monthsShort: readonly string[];
  private _monthsFull: readonly string[];

  constructor() {
    super();
    const weekdaysStartingOnSunday = getLocaleDayNames(this._locale, FormStyle.Standalone, TranslationWidth.Short);
    this._weekdaysShort = weekdaysStartingOnSunday.map((day, index) => weekdaysStartingOnSunday[(index + 1) % 7]);

    this._monthsShort = getLocaleMonthNames(this._locale, FormStyle.Standalone, TranslationWidth.Abbreviated);
    this._monthsFull = getLocaleMonthNames(this._locale, FormStyle.Standalone, TranslationWidth.Wide);
  }

  getMonthShortName(month: number): string { return this._monthsShort[month - 1] || ''; }

  getMonthFullName(month: number): string { return this._monthsFull[month - 1] || ''; }

  getWeekdayLabel(weekday: number) {
    return this._weekdaysShort[weekday - 1] || '';
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    return formatDate(jsDate, 'fullDate', this._locale);
  }

  override getYearNumerals(year: number): string { return String(year); }
}