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
import { Router } from "@angular/router";
import { LocalDataSource } from "ng2-smart-table";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: 'ngx-provider-request-add-edit',
  templateUrl: './provider-request-add-edit.component.html',
  styleUrls: ['./provider-request-add-edit.component.scss']
})
export class ProviderRequestAddEditComponent implements OnInit {
  private msg: string = "";
  
  public dialog: any;
    
  // Decalration for Shop
 
  source: LocalDataSource = new LocalDataSource();
 
  
  constructor(
    private activeModal: NgbActiveModal,
    private _sanitizer: DomSanitizer,
    private ServiceObj: ApiService,
    private toasterService: ToasterService,
    private router: Router
  ) {
    //this.EntityID = localStorage.getItem("Entity");
    this.msg = localStorage.getItem("Message");
   
    // this.getCityDDL();
 
    if (this.msg.length > 0) {
      this.dialog = JSON.parse(this.msg) as any;
      // this.filterChanged(this.dialog.parttype_id);
      // if (this.dialog.id) {
      //   this.getShopList();
      //   this.getServiceList();
      //   this.getRateMasterlist();
      // }
    }
  }
  profile: any;
 
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
     
  }
  
 

  closeModal() {
     
    this.activeModal.close();
  }
  objerror = {
    part_name: "",
    part_address: "",
  };
   
  SaveData() {
     
     
      let id: string = "0";
 
      var data = {
        // entityid: this.EntityID,
        spname: "partner_save",
        ptype: "save",
        pid: this.dialog.id == null ? 0 : this.dialog.id,
        ppart_name: this.dialog.part_name,
        
        ppart_email: this.dialog.part_email,
        ppart_mobile: this.dialog.part_mobile,
       
        pactive: this.dialog.active,
      };
      let body = data;
      this.ServiceObj.apicall(body).subscribe(
        (res) => {
          //debugger;
          let data: any = res;
          console.log(data);
          id = String(data.results.Table[0].partner_save);
          this.dialog.id = id;
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
          // this.dialog = {} as any;
          
          // this.router.navigateByUrl("/pages/eProviders/list");
        },
        (err) => {
          this.message = err.error.msg;
          //this.showToast('error', 'error', this.message);
        }
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
