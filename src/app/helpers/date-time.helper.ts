export class DateTimeHelper {

  public static getTime(time?: string): number {
    if (time === undefined) {
      return new Date().getTime();
    }
    return new Date(time).getTime();
  }

  public static getTimeBefore24Hours(): number {
    const milisecondsOf24Hours = 86400000;
    return new Date().getTime() - milisecondsOf24Hours;
  }

  public static getTimeBefore7Days(): number {
    const milisecondsOf7Days = 86400000 * 7;
    return new Date().getTime() - milisecondsOf7Days;
  }

}
