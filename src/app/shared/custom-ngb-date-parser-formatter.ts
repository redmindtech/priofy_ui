import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const DELIMITER_SLASH = '/';

@Injectable()
export class CustomNgbDateParserFormatter extends NgbDateParserFormatter {

  parse(value: string): NgbDateStruct | null {
    let result = null;
    if (value) {
      const date = value.split(DELIMITER_SLASH);
      result = {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return result;
  }

  format(date: NgbDateStruct | null): string {
    const result = date ? padStartZero(date.day) + DELIMITER_SLASH + padStartZero(date.month) + DELIMITER_SLASH + date.year : '';
    return result;
  }
}

function padStartZero(n: number): string {
  return (n + '').padStart(2, '0')
}
