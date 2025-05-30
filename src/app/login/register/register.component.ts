import { Component, OnInit } from "@angular/core";

import {  DDLItem } from "../../@core/models/model";
// import { ApiService } from '../../@core/data/api.service';
import { Router, Route } from "@angular/router";
import {
  ToasterService,
  ToasterConfig,
  Toast,
  BodyOutputType,
} from "angular2-toaster";

import { ApiService } from "../../services/api.service";

@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  public dialog: any;
  public tc: boolean = false;
  constructor(
    private ServiceObj: ApiService,
    private toasterService: ToasterService,
    private router: Router
  ) {
    this.dialog = {
      chubspname: null,
      TYPE: null,
      entityid: null,
      FirstName: null,
      LastName: null,
      EmailID: null,
      CompanyName: null,
      Address1: null,
      Address2: null,
      PinCode: null,
      Countrycode: null,
      Statecode: null,
      City: null,
      PhoneNo: null,
      MobileNo: null,
      WebsiteUrl: null,
      Token: null,
      RecurFees: "0",
      RecurFeesFreq: "0",
      OneTimeFees: "0",
      FeesDate: null,
      SubscribeID: null,
      Active: "0",
      loginpass: null,
    };
  }
  profile: any;
  ddlCountry: DDLItem[];
  ddlState: DDLItem[];
  ddlSubscribe: DDLItem[];
  // private EntityID: string;

  private message = null;

  config: ToasterConfig;

  position = "toast-top-right";
  animationType = "flyLeft";
  title = "Result";
  content = `I'm cool toaster!`;
  timeout = 5000;
  toastsLimit = 5;
  type = "info";

  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;

  ngOnInit() {
    this.dialog.Countrycode = "0";
    this.dialog.Statecode = "0";
    this.dialog.SubscribeID = "0";
    this.getCountryDDL();
    this.getSubscriptionDDL();
  }

  private getCountryDDL() {
    let body = JSON.stringify({
      "#chub.spname#": "getDDL_SP",
      type: "DDL_COUNTRY",
      entityid: 0,
    });
    console.log(body); //
    // this.ServiceObj.apiuniversalcall(body,'tentitymst_SP').subscribe(
    this.ServiceObj.apicall(JSON.parse(body)).subscribe(
      (res) => {
        let data: any = res;
        if (data.results.Table.length > 0) {
          this.ddlCountry = data.results.Table as DDLItem[];
        }
      },
      (err) => {
        this.message = err.error.msg;
        //this.showToast(this.type, this.title, this.message);
      }
    );
  }
  private getSubscriptionDDL() {
    let body = JSON.stringify({
      "#chub.spname#": "getDDL_SP",
      type: "DDL_SUBSCRIPTION",
      entityid: 0,
    });
    console.log(body); //
    // this.ServiceObj.apiuniversalcall(body,'tentitymst_SP').subscribe(
    this.ServiceObj.apicall(JSON.parse(body)).subscribe(
      (res) => {
        let data: any = res;
        if (data.results.Table.length > 0) {
          this.ddlSubscribe = data.results.Table as DDLItem[];
        }
      },
      (err) => {
        this.message = err.error.msg;
        //this.showToast(this.type, this.title, this.message);
      }
    );
  }
  private getStateDDL(Countrycode: string) {
    let body = JSON.stringify({
      "#chub.spname#": "getDDL_SP",
      value: Countrycode,
      type: "DDL_STATE",
      entityid: 0,
    });
    console.log(body); //
    // this.ServiceObj.apiuniversalcall(body,'tentitymst_SP').subscribe(
    this.ServiceObj.apicall(JSON.parse(body)).subscribe(
      (res) => {
        let data: any = res;
        if (data.results.Table.length > 0) {
          this.ddlState = data.results.Table as DDLItem[];
        }
      },

      (err) => {
        this.message = err.error.msg;
      }
      //error => this.showError(error)
    );
  }
  onChangeCountry(countryCode) {
    this.getStateDDL(countryCode);
    if (!this.dialog.Statecode) {
      this.dialog.Statecode = "0";
    }
    // ... do other stuff here ...
  }
  SaveData() {
    debugger;
    this.dialog.chubspname = "tentitymst_SP";
    this.dialog.TYPE = "CREATE";
    let body = JSON.stringify(this.dialog);
    this.ServiceObj.apicall(JSON.parse(body)).subscribe(
      (res) => {
        debugger;
        let data: any = res;
        if (data.results.Table.length > 0) {
          if (
            data.results.Table[0].Column1 != undefined &&
            data.results.Table[0].Column1 != null &&
            data.results.Table[0].Column1 != ""
          ) {
            this.title = "Error";
            this.type = "error";
            this.content = data.results.Table[0].Column1;
            this.showToast(this.type, this.title, this.content);
          } else {
            this.title = "Result";
            this.type = "info";
            this.content = "Record processed successfully..";
            this.showToast(this.type, this.title, this.content);
            setTimeout((router: Router) => {
              this.router.navigate(["/login"]);
            }, 1000);
          }
        }
      },
      (err) => {
        this.message = err.error.msg;
        this.showToast("error", "error", this.message);
      }
      //error => this.showError(error)
    );
  }

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: this.position,
      timeout: this.timeout,
      newestOnTop: this.isNewestOnTop,
      tapToDismiss: this.isHideOnClick,
      preventDuplicates: this.isDuplicatesPrevented,
      animation: this.animationType,
      limit: this.toastsLimit,
    });
    const toast: Toast = {
      type: "info",
      title: title,
      body: body,
      timeout: this.timeout,
      showCloseButton: this.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }
}
