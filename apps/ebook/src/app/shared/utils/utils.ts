export class Utils {
  public isBlank(str: string) {
    return !str || /^\s*$/.test(str);
  }
}
