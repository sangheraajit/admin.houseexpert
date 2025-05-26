import { Component, OnInit } from "@angular/core";
import { DDLItem } from "../../../@core/models/model";
// import { ApiService } from '../../../@core/data/api.service';
import {
  ToasterService,
  ToasterConfig,
  Toast,
  BodyOutputType,
} from "angular2-toaster";

import { ApiService } from "../../../services/api.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
// import { DataService } from "../../../@core/data/data.service";
// import { debug } from 'util';
@Component({
  selector: "ngx-user-add-edit",
  templateUrl: "./user-add-edit.component.html",
  styleUrls: ["./user-add-edit.component.scss"],
})
export class UserAddEditComponent implements OnInit {
  private msg: string = "";
  public ddlPartnertype: DDLItem[];
  public ddl: DDLItem[];
  public dialog: any = {
    username: "",
    userpass: "",
    usertype: "",
  };
  public isfreelancer: boolean = false;
  constructor(
    private activeModal: NgbActiveModal,
    private ServiceObj: ApiService,
    private toasterService: ToasterService
  ) {
    // this.data.currentEntity.subscribe(msg => this.EntityID = msg)
    // this.EntityID = localStorage.getItem("Entity");
    this.msg = localStorage.getItem("Message");
    // this.getPartnertypeDDL();
    // this.getCityDDL();
    // this.data.currentMessage.subscribe(msg => this.msg = msg)
    console.log(this.msg);
    if (this.msg.length > 0) {
      this.dialog = JSON.parse(this.msg) as any;
      // this.filterChanged(this.dialog.mid);

      //this.getImportsourceDDL(this.dialog.processtype);
    }
    this.getDDL();
  }
  profile: any;
  ddlCountry: DDLItem[];
  ddlState: DDLItem[];
  private EntityID: string;

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
    // this.getProcesstypeDDL( );
  }
  private getDDL() {
    let body = {
      spname: "getdropdown",
      pdrptype: "DDL_ROLE",
    };
    this.ServiceObj.apicall(body).subscribe(
      (res) => {
        let data: any = res;
        if (JSON.parse(data.results).Table.length > 0) {
          this.ddl = JSON.parse(data.results).Table as DDLItem[];
        }
      },
      (err) => {
        this.message = err.error.msg;
      }
    );
  }
  closeModal() {
    //localStorage.setItem('Reload','true')
    this.activeModal.close();
  }
  objerror = {
    pusername: "",
    puserpass: "",
    pusertype: "",
  };
  validate() {
    var result = true;
    if (
      this.dialog.username == "" ||
      this.dialog.username == null ||
      this.dialog.username == undefined
    ) {
      this.objerror.pusername = "User Name is required";
      //this.showToast("error", "Error", this.objerror.mdesc);
      result = false;
    } else this.objerror.pusername = "";

    if (
      this.dialog.userpass == "" ||
      this.dialog.userpass == null ||
      this.dialog.userpass == undefined
    ) {
      this.objerror.puserpass = "Password is required";
      // this.showToast("error", "Error", this.objerror.muser);
      result = false;
    } else this.objerror.puserpass = "";

    if (
      this.dialog.usertype == "" ||
      this.dialog.usertype == null ||
      this.dialog.usertype == undefined
    ) {
      this.objerror.pusertype = "User Type is required";
      result = false;
    } else this.objerror.pusertype = "";

    return result;
  }
  SaveData() {
    if (this.validate()) {
      // this.dialog.chubspname = 'tmarketcreds_SP';
      // if (this.dialog.settingid != null && this.dialog.settingid != undefined && this.dialog.settingid > 0)
      //   this.dialog.TYPE = 'UPDATE';
      //   else
      //   this.dialog.TYPE = 'CREATE';
      var data = {
        ptype: "save",
        spname: "user_save",
        pid: this.dialog.id == null ? 0 : this.dialog.id,
        pusername: this.dialog.username,
        pusertype: this.dialog.usertype,
        puserpass: this.dialog.userpass,
        pactive: this.dialog.active?true:false,
      };
      let body = data;
      this.ServiceObj.apicall(body).subscribe(
        (res) => {
          //debugger;
          let data: any = res;
          if (data.results == null) {
            this.title = "Error";
            this.type = "error";
            this.content = "Fail to Add/Update !";
            this.showToast(this.type, this.title, this.content);
          } else {
            this.title = "Result";
            this.type = "info";
            this.content = "Record processed successfully..";
            this.showToast(this.type, this.title, this.content);
          }
          this.dialog = {} as any;
          // localStorage.setItem('Reload','true')
          this.activeModal.close();
        },
        (err) => {
          this.message = err.error.msg;
          this.showToast("error", "error", this.message);
        }
      );
    }
  }
  filterChanged(selectedValue: number) {
    this.isfreelancer = false;
    if (this.dialog.parttype_id == 2) {
      this.isfreelancer = true;
    } else {
      this.isfreelancer = false;
    }
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
