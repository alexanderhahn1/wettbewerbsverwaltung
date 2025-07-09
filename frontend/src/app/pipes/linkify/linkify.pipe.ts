import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
  name: 'linkify'
})
export class LinkifyPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: string): SafeHtml {
    if (!value) {
      return '';
    }

    const combinedRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9.\-]+?\.(com|org|net|gov|edu|io|co|uk|ca|de|fr|au|jp|in|ru|br|cn|es|it|nl|se|no|ch|nz|mx|za|ar|be|dk|fi|gr|hk|ie|il|kr|my|ph|pl|pt|sg|th|tr|tw|ua|vn|za)\/[^\s]*)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

    const transformedText = value.replace(combinedRegex, (match) => {
      // Check if the matched string looks like an email address
      if (match.includes('@') && match.includes('.')) {
        // Simple check for email format
        return `<a href="mailto:${match}" class="text-blue-500 hover:underline rounded-md px-1 py-0.5 transition-colors duration-200">${match}</a>`;
      } else {
        // Otherwise, treat it as a URL
        let fullUrl = match;
        // Prepend 'http://' if the URL doesn't start with http(s)://
        if (!match.match(/^(https?:\/\/)/i)) {
          fullUrl = `http://${match}`;
        }
        // Use the 'match' variable (the original matched text) as the display text for the link.
        return `<a href="${fullUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline rounded-md px-1 py-0.5 transition-colors duration-200">${match}</a>`;
      }
    });

    return this.sanitizer.bypassSecurityTrustHtml(transformedText);
  }
}
