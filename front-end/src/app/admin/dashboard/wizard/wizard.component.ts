import { Component, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { ProcessService } from "app/shared/services/process.service";
import { EventEmitter } from "@angular/core";
import { BehaviorSubject, interval, Subscription } from "rxjs";
import { WizardService } from "./wizard.service";

@Component({
  selector: "ngx-wizard",
  templateUrl: "./wizard.component.html",
  styleUrls: ["./wizard.component.scss"],
})
export class WizardComponent implements OnInit {
  process = [];
  currentImage: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public wizardItems: any[] = [
    {
      description: "با استفاده از Bpms جریان فرآیند را تعریف کنید.",
      title: "مدل سازی فرایند",
      image: "../../../../assets/images/BPMS.png",
    },
    {
      title: "مدل سازی داده",
      description:
        "مدل داده ای را طراحی کنید که اطلاعات پرونده ها را که در فعالیت های مختلف فرآیند مورد استفاده قرار می گیرد ، سازمان دهد.",
      image: "../../../../assets/images/Process.png",
    },
    {
      title: "تعریف فرم",
      description:
        "رابط کاربری و اطلاعاتی که در فعالیت های فرآیند نمایش داده می شود را طراحی کنید.",
      image: "../../../../assets/images/Data.png",
    },
    {
      title: "قوانین فرایند",
      description:
        "جریان ها و اصطلاحات شرطی را برای مدل سازی رفتارهای فرایند را تعریف کنید.",
      image: "../../../../assets/images/Form.png",
    },
    {
      title: "مجری فرایند",
      description:
        "اختصاص کاربران به فعالیت‌هایی که در فرآیندها انجام می دهند.",
      image: "../../../../assets/images/BussinessRule.png",
    },
    {
      title: "اجرا",
      description: "پروژه خود را در محیط Test یا Production مستقر کنید.",
      image: "../../../../assets/images/Execution.png",
    },
  ];
  redirectUrl = "/admin/dashboard/wizard";
  public imageId: number = 1;

  constructor(
    private router: Router,
    public processService: ProcessService,
    private wizardService: WizardService
  ) {}

  ngOnInit() {
    this.processService.getWizardProcess();
    this.wizardService.currentImageId.subscribe((imageId) => {
      if (imageId == 1) {
        this.imageId = 1;
      }
      if (imageId == 2) {
        this.imageId = 2;
      }
      if (imageId == 3) {
        this.imageId = 3;
      }
      if (imageId == 4) {
        this.imageId = 4;
      }
      if (imageId == 5) {
        this.imageId = 5;
      }
      if (imageId == 6) {
        this.imageId = 6;
      }
    });
    this.processService.wizard.subscribe((process) => {   
      this.process = process;
    });
  }

  prevImage(): void {
    this.wizardService.currentImage.next(
      this.wizardService.currentImage.getValue() - 1
    );
  }

  nextImage(): void {
    this.wizardService.currentImage.next(
      this.wizardService.currentImage.getValue() + 1
    );
  }
  selectProcess(value) {
    this.processService.currentProcess = this.process.filter(
      (process) => (process.id == value)
    )[0];
  }
  gotoProcess() {
    this.router.navigate(["/admin/process-modeler/list"], {
      queryParams: { redirectUrl: this.redirectUrl },
    });
  }
  gotoProcessForImport() {
    this.router.navigate(["/admin/process-modeler/designer"], {
      queryParams: { imp: true, redirectUrl: this.redirectUrl },
    });
  }
  gotoProcessForEdit(event) {
    this.router.navigate(["/admin/process-modeler/designer"], {
      queryParams: this.getQueryParams(),
    });
  }
  gotoDataModelForEdit(event) {
    this.router.navigate(["/admin/data-modeler/designer"], {
      queryParams: this.getQueryParams(),
    });
  }

  gotoFormModelerEdit(event) {
    this.router.navigate(["/admin/form-modeler/designer"], {
      queryParams: this.getQueryParams(),
    });
  }
  gotoBusinessRule(event) {
    this.router.navigate(["/admin/business-rule/designer"], {
      queryParams: this.getQueryParams(),
    });
  }
  gotoActivityRuleDesigner(event) {
    this.router.navigate(["/admin/business-rule/activity-rule-designer"], {
      queryParams: this.getQueryParams(),
    });
  }
  gotoPerformers(event) {
    this.router.navigate(["/admin/performers/designer"], {
      queryParams: this.getQueryParams(),
    });
  }
  gotoExecution(event) {
    this.router.navigate(["/admin/execution/execute"], {
      queryParams: this.getQueryParams(),
    });
  }

  getQueryParams(): any {
    return {
      ...this.processService.currentProcess,
      redirectUrl: this.redirectUrl,
    };
  }
}

@Component({
  selector: "ngx-controle-item",
  styleUrls: ["./wizard.component.scss"],
  template: `
    <div style="display:flex;flex-direction: row;">
      <div style="flex:3">
        <div class="controle-title">{{ title }}</div>
        <p class="controle-desc">{{ description }}</p>
      </div>
      <button
        nbButton
        status="info"
        ghost
        (click)="onClickButton($event)"
        style="display:flex;flex:1;align-items: center;justify-content: center;"
      >
        <img height="30" width="30" [src]="img" />
      </button>
    </div>
  `,
})
export class ControleItem implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() img: string;
  @Output() clickButton: EventEmitter<any> = new EventEmitter();
  constructor(private processService: ProcessService) {}

  ngOnInit(): void {}

  onClickButton(event) {
    // if (this.processService.currentProcess != null) {
    this.clickButton.emit(null);
    // }
  }
}
