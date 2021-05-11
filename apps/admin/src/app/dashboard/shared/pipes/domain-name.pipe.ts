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
    const length = lastIndex === -1 ? name.length : lastIndex;
    return name.substr(0, length);
  }
}
