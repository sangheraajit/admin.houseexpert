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
  selector: "ngx-city-add-edit",
  templateUrl: "./city-add-edit.component.html",
  styleUrls: ["./city-add-edit.component.scss"],
})
export class CityAddEditComponent implements OnInit {
  private msg: string = "";
  public ddlPartnertype: DDLItem[];
  public ddlCity: DDLItem[];
  public dialog: any = {
    city_name: "",
    city_state: "",
    city_country: "",
    active: true,
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
    console.log("msg", this.msg);
    // this.getPartnertypeDDL();
    // this.getCityDDL();
    // this.data.currentMessage.subscribe(msg => this.msg = msg)
    if (this.msg.length > 0) {
      this.dialog = JSON.parse(this.msg) as any;
      // this.filterChanged(this.dialog.mid);

      //this.getImportsourceDDL(this.dialog.processtype);
    }
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
  private getPartnertypeDDL() {
    let body = {
      spname: "getdropdown",
      pdrptype: "DDL_PARTNERTYPE",
    };
    this.ServiceObj.apicall(body).subscribe(
      (res) => {
        let data: any = res;
        if (JSON.parse(data.results).Table.length > 0) {
          this.ddlPartnertype = JSON.parse(data.results).Table as DDLItem[];
        }
      },
      (err) => {
        this.message = err.error.msg;
      }
    );
  }
  private getCityDDL() {
    let body = {
      spname: "getdropdown",
      pdrptype: "DDL_CITY",
    };

    this.ServiceObj.apicall(body).subscribe(
      //this.ServiceObj.apicall(body,'getDDL_SP').subscribe(
      (res) => {
        let data: any = res;
        if (JSON.parse(data.results).Table.length > 0) {
          this.ddlCity = JSON.parse(data.results).Table as DDLItem[];
        }
        //   this.ddlImportsource= data.recordset as DDLItem[];
        // }
      },
      (err) => {
        this.message = err.error.msg;
        //this.showToast(this.type, this.title, this.message);
      }
    );
  }

  onChangeImportsource(processtype) {
    // ... do other stuff here ...
  }
  closeModal() {
    //localStorage.setItem('Reload','true')
    this.activeModal.close();
  }
  objerror = {
    pcity_name: "",
    pcity_state: "",
    pcity_country: "",
  };
  validate() {
    var result = true;
    if (
      this.dialog.city_name == "" ||
      this.dialog.city_name == null ||
      this.dialog.city_name == undefined
    ) {
      this.objerror.pcity_name = "City Name is required";
      //this.showToast("error", "Error", this.objerror.mdesc);
      result = false;
    } else this.objerror.pcity_name = "";

    if (
      this.dialog.city_state == "" ||
      this.dialog.city_state == null ||
      this.dialog.city_state == undefined
    ) {
      this.objerror.pcity_state = "City is required";
      // this.showToast("error", "Error", this.objerror.muser);
      result = false;
    } else this.objerror.pcity_state = "";

    if (
      this.dialog.city_country == "" ||
      this.dialog.city_country == null ||
      this.dialog.city_country == undefined
    ) {
      this.objerror.pcity_country = "Country is required";
      result = false;
    } else this.objerror.pcity_country = "";

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
        spname: "city_save",
        pid: this.dialog.id == null ? 0 : this.dialog.id,
        pcity_name: this.dialog.city_name,
        pcity_state: this.dialog.city_state,
        pcity_country: this.dialog.city_country,
        pactive: this.dialog.active,
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
