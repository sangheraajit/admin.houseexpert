import { Component, OnInit, EventEmitter } from "@angular/core";
import { DDLItem, DDLItemCategory } from "../../../@core/models/model";

import {
  ToasterService,
  ToasterConfig,
  Toast,
  BodyOutputType,
} from "angular2-toaster";

import { ApiService } from "../../../services/api.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'ngx-floorratemst-add-edit',
  templateUrl: './floorratemst-add-edit.component.html',
  styleUrls: ['./floorratemst-add-edit.component.scss']
})
export class FloorratemstAddEditComponent implements OnInit {
  private msg: string = "";
  public dialog: any; 
  public ddlcat: DDLItem[];
  constructor(
    private activeModal: NgbActiveModal,
    private ServiceObj: ApiService,
    private toasterService: ToasterService
  ) {
    //this.getDDL();
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
  // private getDDL() {
  //   let body = {
  //     spname: "getdropdown",
  //     pdrptype: "DDL_CAT",
  //   };
  //   this.ServiceObj.apicall(body).subscribe(
  //     (res) => {
  //       let data: any = res;
  //       if (data.results.table.length > 0) {
  //         this.ddlcat = data.results.table as DDLItem[];
  //       }
  //     },
  //     (err) => {
  //       this.message = err.error.msg;
  //     }
  //   );
  // }
   
  SaveData() {
     
	{
    var data = {
        
        spname: "data_save",
        jdata: [{
                   id: this.dialog.id, 
                  floorno: this.dialog.floorno?this.dialog.floorno:0, 
                  floorrate: this.dialog.floorrate?this.dialog.floorrate:0, 				  
                  active: this.dialog.active,
               }],
        ptabname: "tfloorratemst",
        pid: this.dialog.id == null ? 0 : this.dialog.id,
       
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