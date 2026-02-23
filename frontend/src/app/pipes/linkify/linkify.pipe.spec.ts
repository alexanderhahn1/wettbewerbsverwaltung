import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { LinkifyPipe } from './linkify.pipe';

describe('LinkifyPipe', () => {
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it('create an instance', () => {
    const pipe = new LinkifyPipe(sanitizer);
    expect(pipe).toBeTruthy();
  });
});
