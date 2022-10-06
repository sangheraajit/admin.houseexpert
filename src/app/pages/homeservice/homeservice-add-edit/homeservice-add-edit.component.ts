import { Component, OnInit, EventEmitter } from "@angular/core";
import { DDLItem } from "../../../@core/models/model";
// import { ApiService } from '../../../@core/data/api.service';
import {
  ToasterService,
  ToasterConfig,
  Toast,
  BodyOutputType,
} from "angular2-toaster";
import "style-loader!angular2-toaster/toaster.css";
import { ApiService } from "../../../services/api.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
// import { DataService } from "../../../@core/data/data.service";
// import { debug } from 'util';
import { FileUploader } from "ng2-file-upload";
@Component({
  selector: "ngx-homeservice-add-edit",
  templateUrl: "./homeservice-add-edit.component.html",
  styleUrls: ["./homeservice-add-edit.component.scss"],
})
export class HomeserviceAddEditComponent implements OnInit {
  private msg: string = "";
  public ddlPartnertype: DDLItem[];
  public ddlCity: DDLItem[];
  public dialog: any;
  public isfreelancer: boolean = false;
  constructor(
    private activeModal: NgbActiveModal,
    private ServiceObj: ApiService,
    private toasterService: ToasterService
  ) {
    // this.data.currentEntity.subscribe(msg => this.EntityID = msg)
    this.EntityID = localStorage.getItem("Entity");
    this.msg = localStorage.getItem("Message");
    this.getPartnertypeDDL();
    this.getCategoryeDDL();
    this.getCityDDL();
    // this.data.currentMessage.subscribe(msg => this.msg = msg)
    if (this.msg.length > 0) {
      this.dialog = JSON.parse(this.msg) as any;
      this.filterChanged(this.dialog.mid);

      //this.getImportsourceDDL(this.dialog.processtype);
    }
  }
  profile: any;
  ddlCountry: DDLItem[];
  ddlState: DDLItem[];
  ddlcategory: any[] = [];
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
  public uploader1: FileUploader = new FileUploader({
    isHTML5: true,
  });
  isUploaded1 = false;
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
        if (data.results.Table.length > 0) {
          this.ddlPartnertype = data.results.Table as DDLItem[];
        }
      },
      (err) => {
        this.message = err.error.msg;
      }
    );
  }
  private getCategoryeDDL() {
    let body = {
      spname: "category_read",
      ptype: "readall",
      pid: 0,
    };
    this.ServiceObj.apicall(body).subscribe(
      (res) => {
        let data: any = res;
        if (data.results.Table.length > 0) {
          // this.ddlPartnertype = data.results.Table as DDLItem[];
          this.ddlcategory = data.results.Table;
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
        if (data.results.Table.length > 0) {
          this.ddlCity = data.results.Table as DDLItem[];
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
    part_name: "",
    part_address: "",
  };
  // validate() {
  //   var result = true;
  //   if (this.dialog.mdesc == '' || this.dialog.mdesc == null || this.dialog.mdesc == undefined) {
  //     this.objerror.mdesc = "Description is required";
  //     //this.showToast("error", "Error", this.objerror.mdesc);
  //     result = false;
  //   }
  //   else
  //     this.objerror.mdesc = "";

  //   if (this.dialog.muser == '' || this.dialog.muser == null || this.dialog.muser == undefined) {
  //     this.objerror.muser = "User is required";
  //    // this.showToast("error", "Error", this.objerror.muser);
  //     result = false;
  //   }
  //   else
  //     this.objerror.muser = '';

  //   if (this.dialog.mpass == '' || this.dialog.mpass == null || this.dialog.mpass == undefined)
  //   {
  //     this.objerror.mpass = "Pass is required";
  //     result = false;
  //   }
  //   else
  //     this.objerror.mpass = "";

  //   return result;
  // }
  public onFileSelected1(event: EventEmitter<File[]>) {
    this.isUploaded1 = false;
  }
  SaveData() {
    //if (this.validate())
    {
      let id: string = "0";
      // this.dialog.chubspname = 'tmarketcreds_SP';
      // if (this.dialog.settingid != null && this.dialog.settingid != undefined && this.dialog.settingid > 0)
      //   this.dialog.TYPE = 'UPDATE';
      //   else
      //   this.dialog.TYPE = 'CREATE';
      var data = {
        // entityid: this.EntityID,
        spname: "service_save",
        ptype: "save",
        pid: this.dialog.id == null ? 0 : this.dialog.id,
        ppart_id: this.dialog.part_id == null ? "" : this.dialog.part_id,
        pcat_id: this.dialog.cat_id == null ? "" : this.dialog.cat_id,
        pserv_name: this.dialog.serv_name,
        pserv_desc: this.dialog.serv_desc,
        pserv_rating: this.dialog.serv_rating,
        pserv_email: this.dialog.serv_email,
        pserv_mobile: this.dialog.serv_mobile,
        pserv_cost: this.dialog.serv_mobile,
        pserv_commission_percent: this.dialog.serv_commission_percent,
        pserv_commission_fixed: this.dialog.serv_commission_fixed,
        pserv_street: this.dialog.serv_street,
        pcity_id: this.dialog.city_id,
        pactive: this.dialog.active,
      };
      let body = data;
      this.ServiceObj.apicall(body).subscribe(
        (res) => {
          //debugger;
          let data: any = res;
          console.log(data);
          id = String(data.results.Table[0].service_save);

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
          this.uploadSubmit(id);
          // localStorage.setItem('Reload','true')
          this.activeModal.close();
        },
        (err) => {
          this.message = err.error.msg;
          //this.showToast('error', 'error', this.message);
        }
      );
    }
  }
  uploadSubmit(nicourseid: string) {
    if (this.isUploaded1 == true) {
      return;
    }

    this.isUploaded1 = true;
    if (this.uploader1.queue.length <= 0) {
      return;
    }

    let allFiles = this.uploader1.queue;
    for (let i = 0; i < this.uploader1.queue.length; i++) {
      let fileItem = this.uploader1.queue[i]._file;
      // if (fileItem.size > 10000000) {
      //     alert("Each File should be less than 10 MB of size.");
      //     return;
      // }
    }
    this.processupload(nicourseid);
  }
  processupload(nicourseid: string) {
    if (this.uploader1.queue.length <= 0) {
      this.showToast(
        "error",
        "Error",
        "You have not selected any video files."
      );
      // this._matSnackBar.open('You have not selected any video files.', 'OK', {
      //   verticalPosition: 'top',
      //   duration: 20000,
      // });
      return;
    }

    let result: boolean = true;
    if (this.uploader1.queue.length == 0) {
      return;
    }

    let data = new FormData();
    let foldername = "service";

    for (let j = 0; j < this.uploader1.queue.length; j++) {
      let fileItem = this.uploader1.queue[j]._file as any;
      data.append("file", fileItem);
    }

    data.append("foldername", foldername);
    data.append("spname", "service_updateimage");
    data.append("pid", nicourseid);
    this.ServiceObj.apifileupload(data).subscribe(
      (res) => {
        console.log(res);
        let d: any = res;
        console.log(d);
        if (d == "done") {
          this.isUploaded1 = true;
          this.showToast("info", "Success", "File Uploaded Successfully!!!");

          // this._matSnackBar.open('File Uploaded Successfully!!!', 'OK', {
          //   verticalPosition: 'top',
          //   duration: 2000,
          // });
          result = false;
          this.uploader1.clearQueue();
          //this.loadResult(foldername);
          //this.loadResult('');
          // this.ro.navigate(['batch-master']);
        } else if (d == "exists") {
          this.showToast("info", "Success", "Sheet Already uploaded.");

          // this._matSnackBar.open('Sheet Already uploaded.', 'OK', {
          //   verticalPosition: 'top',
          //   duration: 5000,
          // });
          //this.loadResult('');
        } else {
          this.showToast("info", "Ok", "Contact To Admin!!!" + d);

          // this._matSnackBar.open('Contact To Admin!!!' + d, 'OK', {
          //   verticalPosition: 'top',
          //   duration: 30000,
          // });
        }
      },
      (err) => {
        this.showToast(
          "error",
          "Error",
          "Error Occurred. Contact To Admin!!!" + err
        );

        // this._matSnackBar.open(
        //   'Error Occurred. Contact To Admin!!!' + err,
        //   'OK',
        //   {
        //     verticalPosition: 'top',
        //     duration: 30000,
        //   }
        // );
      }
    );
    this.showToast("info", "Ok", "Processing Started Successfully!!!");

    // this._matSnackBar.open('Processing Started Successfully!!!', 'OK', {
    //   verticalPosition: 'top',
    //   duration: 2000,
    // });
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
