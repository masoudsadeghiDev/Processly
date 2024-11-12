import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ProcessStatus } from "../model/ProcessStatus";
import { PersianDatePipe } from "../pipe/persian-date.pipe";
import { ApplicationService } from "./application.service";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class ProcessService {
  PROCESS_KEY = "process";
  _process: BehaviorSubject<any[]>;
  _wizardProcess: BehaviorSubject<any[]>;
  _currentProcess: any = null;
  constructor(private base: BaseService, private pipe: PersianDatePipe) {
    this._process = new BehaviorSubject([]);
    this._wizardProcess = new BehaviorSubject([]);
    const json = localStorage.getItem(this.PROCESS_KEY);
    if (json) {
      this._currentProcess = JSON.parse(json);
    }
  }

  set currentProcess(service) {
    this._currentProcess = service;
    localStorage.setItem(this.PROCESS_KEY, JSON.stringify(service));
  }

  get currentProcess() {
    return this._currentProcess;
  }
  process(): Observable<any[]> {
    return this._process.asObservable();
  }

  get wizard(): Observable<any[]> {
    return this._wizardProcess.asObservable();
  }

  getProcess(
    appId,
    status: ProcessStatus,
    justOneStatus: ProcessStatus = null
  ) {
    this.base
      .get("process", { appId, status, justOneStatus })
      .subscribe((process) => {
        process = (process as any[]).map((item) => {
          return { ...item, submitDate: this.pipe.transform(item.submitDate) };
        });
        this._process.next(process);
      });
  }

  getWizardProcess() {
    const appId = globalThis.app.value;
    this.base.get("process/wizard/" + appId).subscribe((process) => {
      this._wizardProcess.next(process);
    });
  }

  clearCurrent() {
    this._currentProcess = null;
    localStorage.removeItem(this.PROCESS_KEY);
  }
}
