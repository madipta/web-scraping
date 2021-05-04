import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "domainName",
})
export class DomainNamePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return "";
    }
    if (value.indexOf("://") === -1) {
      return value;
    }
    const name = value.split("://")[1];
    const lastIndex = name.indexOf('/');
    return name.substr(0, lastIndex || name.length - 1);
  }
}
