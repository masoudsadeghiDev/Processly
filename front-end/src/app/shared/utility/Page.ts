import { OnDestroy, Injectable } from "@angular/core";

import { ParamsHandler } from "./ParamsHandler";
import { ISubscription } from "rxjs/Subscription";

@Injectable()
export class Page implements OnDestroy, IPage {
  name: string;
  private _subscriptionList: { [id: string]: ISubscription } = {};
  private _viewState: any = null;
  public loading: number[] = [];

  constructor(
    public pageRoute: string,
    public messageOnNotify: (
      error: any,
      action?: any,
      className?: string,
    ) => void,
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  public init(viewState: any) {
    this.name = this.constructor.name;
    this._viewState = viewState;
  }

  public refreshUrl(title: string = null) {
    let url = this.pageRoute;
    if (url[url.length - 1] != "/") {
      url = url + "/";
    }
    window.history.pushState(
      "",
      title,
      url + ParamsHandler.eup(this._viewState),
    );
  }

  public parseResponse(
    response: any,
    ignoreNotification: boolean = false,
  ): any {
    if (response == null) {
      if (this.messageOnNotify && ignoreNotification == false)
        this.messageOnNotify("exception occurred.", "close", "red-snackbar");
      return null;
    } else {
      if (response.Success) return response.Data;
      else if (ignoreNotification == false) {
        this.messageOnNotify(response.Message, "close", "red-snackbar");
      }
      return null;
    }
  }

  public updateViewState(params: any): string {
    if (params != null) {
      for (let p in params) {
        this._viewState[p] = params[p];
      }
    }
    this.refreshUrl();
    return;
  }

  public resetViewState(params: any): string {
    if (this._viewState != null) {
      for (let p in this._viewState) {
        this._viewState[p] = null;
      }
    }

    if (params != null) {
      for (let p in params) {
        this._viewState[p] = params[p];
      }
    }
    return;
  }

  private deleteSubscription(methodName: string) {
    if (this._subscriptionList[methodName] !== undefined) {
      this._subscriptionList[methodName].unsubscribe();
      delete this._subscriptionList[methodName];
    }
  }

  public unsubscribe(methodName: string = null) {
    if (methodName === null) {
      for (var i in this._subscriptionList) {
        if (this._subscriptionList[i] != null) {
          this.deleteSubscription(i);
        }
      }
    } else {
      if (this._subscriptionList[methodName] != null)
        this.deleteSubscription(methodName);
      this._subscriptionList[methodName] = null;
      delete this._subscriptionList[methodName];
    }
  }

  public addSubscription(methodName: string, subscription: ISubscription) {
    this.deleteSubscription(methodName);
    this._subscriptionList[methodName] = subscription;
  }

  public loadingFinish(index: number, delay: number = 0): void {
    setTimeout(() => {
      this.loading[index] =
        this.loading[index] <= 0 ? 0 : this.loading[index] - 1;
    }, delay);
  }

  public loadingStart(index: number): void {
    if (this.loading[index]) {
      this.loading[index]++;
    } else {
      this.loading[index] = 1;
    }
  }
}

export interface IPage {
  name: string;
  messageOnNotify: (error: any, action?: any, className?: string) => void;
  parseResponse(response: any, ignoreNotification?: boolean): any;
  unsubscribe(methodName: string);
  addSubscription(methodName: string, subscription: ISubscription);
}