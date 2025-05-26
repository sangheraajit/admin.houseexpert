import { Component, OnInit, EventEmitter } from "@angular/core";
import { DDLItem, DDLItemCategory } from "../../../@core/models/model";
import { FileUploader } from "ng2-file-upload";
import {
  ToasterService,
  ToasterConfig,
  Toast,
  BodyOutputType,
} from "angular2-toaster";

import { ApiService } from "../../../services/api.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'ngx-customer-add-edit',
  templateUrl: './customer-add-edit.component.html',
  styleUrls: ['./customer-add-edit.component.scss']
})
export class CustomerAddEditComponent implements OnInit {
  private msg: string = "";
  public dialog: any; 

  public uploader1: FileUploader = new FileUploader({
    isHTML5: true,
     url: this.ServiceObj+ "fileupload",
  });
  isUploaded1 = false;
 
  public onFileSelected1(event: EventEmitter<File[]>) {
    this.isUploaded1 = false;
  }

  constructor(
    private activeModal: NgbActiveModal,
    private ServiceObj: ApiService,
    private toasterService: ToasterService
  ) {
     
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
    
  }
   

   
  
  closeModal() {
     this.activeModal.close();
  }
  
   
  SaveData() {
     
	{
    let id: string = "0";
    var data = {
        
        spname: "data_save",
        jdata: [{
          cust_name: this.dialog.cust_name?this.dialog.cust_name:"", 
          cust_email: this.dialog.itemgroup?this.dialog.cust_email:"", 
          cust_mobile: this.dialog.itemgroup?this.dialog.cust_mobile:"", 
          
                    // itemgroup1: this.dialog.itemgroup1?this.dialog.itemgroup1:"", 
                    cft: this.dialog.cft?this.dialog.cft:"0", 

				  active: this.dialog.active,
               }],
        ptabname: "tcustomer",
        pid: this.dialog.id == null ? 0 : this.dialog.id,
       
      };
      let body = data;
      this.ServiceObj.apicall(body).subscribe(
        (res) => {
          //debugger;
          let data: any = res;
          id = String(data.results.table[0].data_save);

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
          this.activeModal.close();
        },
        (err) => {
          this.message = err.error.msg;
          this.showToast('error', 'error', this.message);
        }
      );
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
    let foldername = "article";

    for (let j = 0; j < this.uploader1.queue.length; j++) {
      let fileItem = this.uploader1.queue[j]._file as any;
      data.append("file", fileItem);
    }

    data.append("foldername", foldername);
    data.append("spname", "article_updateimage");
    data.append("id", pid);
    this.ServiceObj.apifileupload(data).subscribe(
      (res) => {
        console.log(res);
        let d: any = res;
        console.log(d);
        if (d == "done") {
          this.isUploaded1 = true;
          this.showToast("info", "Success", "File Uploaded Successfully!!!");
 
          result = false;
          this.uploader1.clearQueue();
          
        } else if (d == "exists") {
          this.showToast("info", "Success", "Sheet Already uploaded.");
 
        } else {
          this.showToast("info", "Ok", "Contact To Admin!!!" + d);
 
        }
      },
      (err) => {
        this.showToast(
          "error",
          "Error",
          "Error Occurred. Contact To Admin!!!" + err
        );
 
      }
    );
    this.showToast("info", "Ok", "Processing Started Successfully!!!");
 
  }
}