import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "link",
})
export class LinkPipe implements PipeTransform {
  transform(value: string) {
    if (!value) {
      return "";
    }
    const arr = value.split("//");
    if (arr.length === 2) {
      return arr[1];
    }
    return "";
  }
}
