import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatSchoolYear'
})
export class FormatSchoolYearPipe implements PipeTransform {
  transform(value: unknown): string {
    if (!value) {
      return '';
    }

    const schoolYear = String(value);

    if (!/^\d{4}$/.test(schoolYear)) {
      return schoolYear;
    }

    const firstYear = schoolYear.substring(0, 2);
    const secondYear = schoolYear.substring(2);

    return `20${firstYear}/${secondYear}`;
  }

}
