import { Component, OnInit } from "@angular/core";
import {  DDLItem } from "../../../@core/models/model";
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
  selector: "ngx-provider-types-add-edit",
  templateUrl: "./provider-types-add-edit.component.html",
  styleUrls: ["./provider-types-add-edit.component.scss"],
})
export class ProviderTypesAddEditComponent implements OnInit {
  private msg: string = "";
  public ddlProcesstype: DDLItem[];
  public ddlImportsource: DDLItem[];
  public dialog: any = {
    id: 0,
    parttype_name: "",
    parttype_comm_fixed: "",
    parttype_comm_percent: "",
    active: true,
  };
  // public lblmuser = "Username";
  // public lblmpass = "Password";
  // public lbltoken = "Token";
  // public lblmkey1 = "Key1";
  // public lblmkey2 = "Key2";
  // public lblmkey3 = "Key3";
  public iscse: boolean = false;
  public isFBA: boolean = false;
  public hide: boolean = true;
  constructor(
    private activeModal: NgbActiveModal,
    private ServiceObj: ApiService,
    private toasterService: ToasterService
  ) {
    // this.data.currentEntity.subscribe(msg => this.EntityID = msg)
    // this.EntityID=localStorage.getItem('Entity')
    this.msg = localStorage.getItem("Message");
    // this.getProcesstypeDDL();
    // this.data.currentMessage.subscribe(msg => this.msg = msg)
    if (this.msg.length > 0) {
      this.dialog = JSON.parse(this.msg);
      //   this.filterChanged( this.dialog.mid)
      //   if(this.dialog.mid==1 ||this.dialog.mid==2)
      //   {
      //     this.isFBA = true;
      //   }
      //   else
      //   {
      //     this.isFBA = false;
      //   }
      //   //this.getImportsourceDDL(this.dialog.processtype);
    }
  }
  // profile: any;
  // ddlCountry: DDLItem[];
  // ddlState: DDLItem[];
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
    // this.getProcesstypeDDL( );
  }
  // private getProcesstypeDDL() {
  //   let body =
  //     {
  //       '#chub.spname#': 'getDDL_SP',
  //       'type': 'DDL_ALLMARKETPLACE',
  //       'entityid': this.EntityID
  //     }
  //   this.ServiceObj.apicall(body).subscribe(
  //     res => {
  //       let data: any = res;
  //       if (data.results.Table.length > 0) {
  //         this.ddlProcesstype = data.results.Table as DDLItem[];
  //       }

  //     },
  //     (err) => {
  //       this.message = err.error.msg;
  //     }
  //   );
  // }
  // private getImportsourceDDL(processtype: String) {
  //   let body =
  //     {
  //       '#chub.spname#': 'getDDL_SP',
  //       'type': 'DDL_IMPORTSOURCE',
  //       'value': processtype,
  //       'entityid': this.EntityID
  //     }

  //   this.ServiceObj.apicall(body).subscribe(
  //     //this.ServiceObj.apicall(body,'getDDL_SP').subscribe(
  //     res => {
  //       let data: any = res;
  //       if (data.results.Table.length > 0) {
  //         this.ddlImportsource = data.results.Table as DDLItem[];
  //       }
  //       //   this.ddlImportsource= data.recordset as DDLItem[];
  //       // }

  //     },
  //     (err) => {
  //       this.message = err.error.msg;
  //       //this.showToast(this.type, this.title, this.message);
  //     }
  //   );
  // }

  // onChangeImportsource(processtype) {

  //   // ... do other stuff here ...
  // }
  closeModal() {
    // localStorage.setItem("Reload", "true");
    this.activeModal.close();
  }
  objerror = {
    parttype_name: "",
    parttype_comm_fixed: "",
    parttype_comm_percent: "",
  };
  validate() {
    var result = true;
    if (
      this.dialog.parttype_name == "" ||
      this.dialog.parttype_name == null ||
      this.dialog.parttype_name == undefined
    ) {
      this.objerror.parttype_name = "Product Type is required";
      //this.showToast("error", "Error", this.objerror.mdesc);
      result = false;
    } else this.objerror.parttype_name = "";

    if (
      this.dialog.parttype_comm_fixed == "" ||
      this.dialog.parttype_comm_fixed == null ||
      this.dialog.parttype_comm_fixed == undefined
    ) {
      this.objerror.parttype_comm_fixed = "Common fixed is required";
      // this.showToast("error", "Error", this.objerror.muser);
      result = false;
    } else this.objerror.parttype_comm_fixed = "";

    if (
      this.dialog.parttype_comm_percent == "" ||
      this.dialog.parttype_comm_percent == null ||
      this.dialog.parttype_comm_percent == undefined
    ) {
      this.objerror.parttype_comm_percent = "Common Percent is required";
      result = false;
    } else this.objerror.parttype_comm_percent = "";

    return result;
  }
  SaveData() {
    if (this.validate()) {
      // this.dialog.chubspname = "tmarketcreds_SP";
      // if (
      //   this.dialog.settingid != null &&
      //   this.dialog.settingid != undefined &&
      //   this.dialog.settingid > 0
      // )
      //   this.dialog.TYPE = "UPDATE";
      // else this.dialog.TYPE = "CREATE";
      var data = {
        // entityid: this.EntityID,
        spname: "partnertype_save",
        ptype: "save",
        pid: this.dialog.id == null ? 0 : this.dialog.id,
        pparttype_name: this.dialog.parttype_name,
        pparttype_comm_fixed: this.dialog.parttype_comm_fixed,
        pparttype_comm_percent: this.dialog.parttype_comm_percent,
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
          // localStorage.setItem("Reload", "true");
          this.activeModal.close();
        },
        (err) => {
          this.message = err.error.msg;
          //this.showToast('error', 'error', this.message);
        }
      );
    }
  }
  // filterChanged(selectedValue:number){
  //   this.iscse=false;
  //   if(this.dialog.mid==1 ||this.dialog.mid==2)
  //     {
  //       this.isFBA = true;
  //     }
  //     else
  //     {
  //       this.isFBA = false;
  //     }
  //        if(selectedValue==1||selectedValue==2||selectedValue==11||selectedValue==19)
  //   {
  //       this.lblmuser = "AccesskeyID";
  //       this.lblmpass = "SecretAccesskeyID";
  //       this.lbltoken = "Token";
  //       this.lblmkey1 = "SellerID";
  //       this.lblmkey2 = "Key2";
  //   }
  //   else  if(selectedValue==3||selectedValue==14||selectedValue==17||selectedValue==34||selectedValue==35)
  //     {
  //         this.lblmuser = "Username";
  //         this.lblmpass = "Password";
  //         this.lbltoken = "Token";
  //         this.lblmkey1 = "Key1";
  //         this.lblmkey2 = "Key2";
  //     }
  //     else    if(selectedValue==4)
  //     {
  //         this.lblmuser = "Username";
  //         this.lblmpass = "SellerID";
  //         this.lbltoken = "Secretkey";
  //         this.lblmkey1 = "LocationID";
  //         this.lblmkey2 = "Key2";
  //     }
  //     else    if(selectedValue==10)
  //     {
  //         this.lblmuser = "Store ID";
  //         this.lblmpass = "CLIENT ID";
  //         this.lbltoken = "ACCESS TOKEN";
  //         this.lblmkey1 = "CLIENT SECRET";
  //         //this.lblmkey2 = "Key2";
  //     }
  //     else    if(selectedValue==6)
  //     {
  //         this.lblmuser = "Access Token";
  //         this.lblmpass = "Access Token Secret";
  //         this.lbltoken = "Shop Name";
  //         // this.lblmkey1 = "LocationID";
  //         // this.lblmkey2 = "Key2";
  //     }
  //     else    if(selectedValue==7||selectedValue==8)
  //     {
  //         this.lblmuser = "Username";
  //         this.lblmpass = "Password";
  //         this.lbltoken = "Product Feed Filename";
  //         this.lblmkey1 = "Inventory Feed Filename";
  //         this.lblmkey2 = "Key2";
  //     }
  //     else    if(selectedValue==9||selectedValue==15)
  //     {
  //       this.iscse=true;
  //         this.lblmuser = "Username";
  //         this.lblmpass = "Password";
  //         this.lbltoken = "FTP/HTTP Url";
  //         this.lblmkey1 = "Feed Filename";
  //         this.lblmkey2 = "File Format";
  //         this.lblmkey3 = "Delimiter";
  //     }
  //     else    if(selectedValue==24)
  //     {
  //       this.iscse=false;
  //         this.lblmuser = "Username";
  //         this.lblmpass = "Password";
  //         this.lbltoken = "OAuth Token";
  //         this.lblmkey1 = "OAuth Token Secret";
  //         // this.lblmkey2 = "File Format";
  //         // this.lblmkey3 = "Delimiter";
  //     }
  //   }
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
  // callChannelProcess(Processtype: string)
  // {
  //   let isPostStarted=1;
  //   var data =
  //   {
  //     action: Processtype,
  //     entityid: this.EntityID,
  //     settingid: this.dialog.settingid,
  //     mid: this.dialog.mid,
  //     headerRow:0 }
  //   let body =data;
  //   this.ServiceObj.apicall(body).subscribe(
  //     res => {
  //       let Result:any =res;
  //             if(Processtype=="gettoken")
  //             {

  //                 //if()
  //                 {

  //                   window.location.href = Result.StatusMessage;
  //                 }
  //             }
  //             console.log(Result);
  //           },
  //     (err) => {
  //       isPostStarted=0;
  //       this.message = err.error.msg;
  //       this.showToast('error', 'error', this.message);
  //       console.log(err);
  //     }
  //   );
  //   if(isPostStarted==1)
  //   {
  //     this.title = 'Result';
  //     this.type = 'info';
  //     this.content = 'Process initiated successfully! Please check the upload result after sometime.';
  //     this.showToast(this.type, this.title, this.content);
  //   }
  // }
  // OrderImport()
  // {
  //   let Processtype = 'orderimport';
  //   this.callChannelProcess(Processtype);
  // }
  // ShippingUpload()
  // {
  //   let Processtype = 'shippingupload';
  //   this.callChannelProcess(Processtype);
  // }
  // GetToken()
  // {
  //   let Processtype = 'gettoken';
  //   this.callChannelProcess(Processtype);
  // }
  // GetListing()
  // {
  //   let Processtype = 'getlisting';
  //   this.callChannelProcess(Processtype);
  // }
}
