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
    return name.substr(0, name.length - 1);
  }
}
