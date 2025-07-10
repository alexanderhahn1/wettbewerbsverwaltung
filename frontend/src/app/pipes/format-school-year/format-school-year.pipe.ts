import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
  name: 'formatSchoolYear'
})
export class FormatSchoolYearPipe implements PipeTransform {
  transform(value: unknown): SafeHtml {
    if (!value) {
      return '';
    }

    const schoolYear = String(value)

    const firstYear = schoolYear.substring(0, schoolYear.length - 2);
    const secondYear = schoolYear.substring(schoolYear.length-2, schoolYear.length);
    return `20${firstYear}/${secondYear}`;
  }

}
