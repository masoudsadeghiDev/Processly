import { IPage } from './Page';
// import { convertDate } from './classes';

export class ParamsHandler {
  private params: object;

  constructor(public parent: IPage = null) {
    this.params = {};
  }

  public addParam(key: any, value: any) {
    if (value != undefined) {
      if (value instanceof Date) {
        // this.params[key] = convertDate(value);
      } else {
        this.params[key] = value;
      }
    }
  }

  public getParam(name: string) {
    return this.params[name];
  }

  public deleteParam(name: string) {
    delete this.params[name];
  }

  public getParams(): object {
    return this.params;
  }

  public count() {
    var objPropName = Object.getOwnPropertyNames(this.params);
    return objPropName.length;
  }

  public getJson(): object {
    return this.params;
  }

  public getUrlPrp(): string {
    var objPropName = Object.getOwnPropertyNames(this.params);
    var objStr = "";
    for (let item of objPropName) {
      if (this.params[item] !== "")
        objStr += item + "=" + this.params[item] + "&";
    }
    return objStr.substring(0, objStr.length - 1);
  }

  /**
   * encodeUrlParameters
   * @param object
   */
  public static eup(object: any): string {
    let url: string = "";
    url = JSON.stringify(object, (key, value) => {
      if (value !== null) return value;
    });
    //return url;
    return btoa(unescape(encodeURIComponent(url)));
  }

  /**
   * decodeUrlParameters
   * @param url
   */
  public static dup<T>(url: string): T {
    //return JSON.parse(url);
    return JSON.parse(decodeURIComponent(escape(atob(url))));
  }
}