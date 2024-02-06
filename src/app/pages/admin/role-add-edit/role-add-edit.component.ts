import { Component, OnInit, EventEmitter } from "@angular/core";
import { DDLItem, DDLItemCategory } from "../../../@core/models/model";
 
import {
  ToasterService,
  ToasterConfig,
  Toast,
  BodyOutputType,
} from "angular2-toaster";
import { NgxSpinnerService } from "ngx-spinner";
import "style-loader!angular2-toaster/toaster.css";
import { ApiService } from "../../../services/api.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: 'ngx-role-add-edit',
  templateUrl: './role-add-edit.component.html',
  styleUrls: ['./role-add-edit.component.scss']
})
export class RoleAddEditComponent implements OnInit {
  private msg: string = "";
  public dialog: any; 
  public dialog1: any; 
  public ddlcat: DDLItem[];
 

  constructor(
    private _sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,
    private activeModal: NgbActiveModal,
    private ServiceObj: ApiService,
    private toasterService: ToasterService
  ) {
    //this.getDDL();
    this.msg = localStorage.getItem("Message");
    
    if (this.msg.length > 0) {
      this.dialog1 = JSON.parse(this.msg);
    }
    this.getlist();
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
  private toggleactive(pid)
  {
      this.dialog.find(x=>x.id==pid).active = !this.dialog.find(x=>x.id==pid).active;
  }
  private getlist() {
    this.spinner.show();
    let body = {
      spname: "rolepage_read",
      ptype: "read",
      pid: this.dialog1.id?this.dialog1.id:0,
    };
    this.ServiceObj.apicall(body).subscribe(
      (res) => { 
        let data: any = res;

        console.log(data.results);
        if (JSON.parse(data.results).Table.length > 0) {
          this.dialog = JSON.parse(JSON.parse(data.results).Table[0].document);
           
        }
        this.spinner.hide();
      },
      (err) => {
        this.message = err.error.msg;
        this.spinner.hide();
      }
    );
  }
   
  SaveData() {
	{
    if(this.dialog1.role_name==undefined||this.dialog1.role_name=="")
    {
      this.title = "Error";
      this.type = "error";
      this.content = "Role name can't be blank!";
      this.showToast(this.type, this.title, this.content);
      return;
    }
    var data =  {       
                  spname: "rolepage_save",
                  ptype: "save",
                  pid: this.dialog1.id == null ? 0 : this.dialog1.id,
                  prole_name: this.dialog1.role_name,
                  pactive : this.dialog1.active?true:false,
                  vdata: JSON.stringify(this.dialog),
                  
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