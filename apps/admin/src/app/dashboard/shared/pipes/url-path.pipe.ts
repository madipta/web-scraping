import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlPath'
})
export class UrlPathPipe implements PipeTransform {

  transform(value: string): unknown {
    if (!value || value.indexOf('://') === -1) {
      return '';
    }
    const fullpath = value.split("://")[1];
    const index = fullpath.indexOf('/');
    return fullpath.substr(index);
  }

}
