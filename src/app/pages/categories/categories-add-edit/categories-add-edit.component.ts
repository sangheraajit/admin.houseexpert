import { Component, OnInit, EventEmitter } from "@angular/core";
import {  DDLItem, DDLItemCategory } from "../../../@core/models/model";
// import { ApiService } from '../../../@core/data/api.service';
import { FileUploader } from "ng2-file-upload";
import {
  ToasterService,
  ToasterConfig,
  Toast,
  BodyOutputType,
} from "angular2-toaster";
import "style-loader!angular2-toaster/toaster.css";
import { ApiService } from "../../../services/api.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { DataService } from "../../../@core/data/data.service";
// import { debug } from 'util';
@Component({
  selector: "ngx-categories-add-edit",
  templateUrl: "./categories-add-edit.component.html",
  styleUrls: ["./categories-add-edit.component.scss"],
})
export class CategoriesAddEditComponent implements OnInit {
  private msg: string = "";
  public ddlcategoryList: DDLItemCategory[];
  public ddlImportsource: DDLItem[];
  public dialog: any = {
    categroyName: "",
    categroyListId: "",
    active: true,
  };
  public uploader1: FileUploader = new FileUploader({
    isHTML5: true,
  });
  isUploaded1 = false;
 
  constructor(
    private activeModal: NgbActiveModal,
    private ServiceObj: ApiService,
    private toasterService: ToasterService
  ) {
    this.getProcesstypeDDL();
    this.msg = localStorage.getItem("Message");
    
    if (this.msg.length > 0) {
      this.dialog = JSON.parse(this.msg);
      
    }
  }
 
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
    // this.getProcesstypeDDL();
  }
  public onFileSelected1(event: EventEmitter<File[]>) {
    this.isUploaded1 = false;
  }

  private getProcesstypeDDL() {
    let body = {
      spname: "category_read",
      ptype: "readall",
      pid: 0,
    };
    this.ServiceObj.apicall(body).subscribe(
      (res) => {
        let data: any = res;
        if (data.results.table.length > 0) {
          this.ddlcategoryList = [{id: "0",cat_name: "No Category"}];
          let obj = data.results.table as DDLItemCategory[];
          //this.ddlcategoryList.push({id: "0",cat_name: "No Category"})
          for(var i = 0; i < obj.length ; i++){
            this.ddlcategoryList.push(obj[i]);
        }
        }
      },
      (err) => {
        this.message = err.error.msg;
      }
    );
  }
  
  closeModal() {
     
    this.activeModal.close();
  }
  objerror = {
    categroyName: "",
    categroyListId: "",
    // percent: "",
  };
  validate() {
    var result = true;
    if (
      this.dialog.cat_name == "" ||
      this.dialog.cat_name == null ||
      this.dialog.cat_name == undefined
    ) {
      this.objerror.categroyName = "Category Name is required";
      //this.showToast("error", "Error", this.objerror.mdesc);
      result = false;
    } else this.objerror.categroyName = "";

     

    return result;
  }
  SaveData() {
    if (this.validate()) {
      let id: string = "0";
       
      var data = {
        // entityid: this.EntityID,
        spname: "category_save",
        ptype: "save",
        pid: this.dialog.id == null ? 0 : this.dialog.id,
        pcat_name: this.dialog.cat_name,
        pparent_id: this.dialog.parent_id == null ? "" : this.dialog.parent_id,
        pactive: (this.dialog.active==true?true:false),
        pispublish: (this.dialog.ispublish==true?true:false),
      };
      let body = data;
      this.ServiceObj.apicall(body).subscribe(
        (res) => {
          //debugger;
          let data: any = res;
          id = String(data.results.table[0].category_save);

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
  
  uploadSubmit(pid: string) {
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
    this.processupload(pid);
  }
  processupload(pid: string) {
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
    let foldername = "category";

    for (let j = 0; j < this.uploader1.queue.length; j++) {
      let fileItem = this.uploader1.queue[j]._file as any;
      data.append("file", fileItem);
    }

    data.append("foldername", foldername);
    data.append("spname", "category_updateimage");
    data.append("id", pid);
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
