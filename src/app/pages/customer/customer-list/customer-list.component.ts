  import { Component, OnInit, OnDestroy } from "@angular/core";
  import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
  import { LocalDataSource } from "ng2-smart-table";
  import { NgxSpinnerService } from "ngx-spinner";
  import {
    ToasterService,
    ToasterConfig,
    Toast,
    BodyOutputType,
  } from "angular2-toaster";
 
  import { DomSanitizer } from "@angular/platform-browser";
  import { interval } from "rxjs/observable/interval";
  import { ApiService } from "../../../services/api.service";
  import { SmartTableService } from "../../../@core/mock/smart-table.service";
  
  import { environment } from '../../../../environments/environment';
import { CustomerAddEditComponent } from "../customer-add-edit/customer-add-edit.component";
import { DatePipe } from "@angular/common";
  @Component({
    selector: 'ngx-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss']
  })
  export class CustomerListComponent implements OnInit {
    subscribe$;
    private EntityID: string;
    private ProcessType: string;
    private message = null;
    dialog: any[];
    dialog1: any[];
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

    settings = {
      mode: "external",
      pager: {
        display: true,
        perPage: 40,
      },
      actions: {
        delete: true,
        add: true,
        edit: true,
        columnTitle: "Actions",
      },
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
      },
  
      columns: {
        
        cust_name: {
          title: "Customer Name",
          type: "string",
          filter: true,
          width: "30%",
        },
        cust_email: {
          title: "Email",
          type: "string",
          filter: true,
          width: "30%",
        },
        cust_mobile: {
          title: "Mobile",
          type: "string",
          filter: true,
          width: "30%",
        },
        cdate: {
          title: "Created Date",
          type: "date",
          filter: true,
          width: "10%",
           valuePrepareFunction: (date) => {
                    var raw = new Date(date);
                    var formatted = new DatePipe("en-EN").transform(raw, "dd-MMM-yyyy hh:mm");
                    return formatted;
                  },
        },
        
        active: {
          title: "Active",
          type: "html",
          width: "10%",
          valuePrepareFunction: (active: boolean) => {
            if (active == true)
              return this._sanitizer.bypassSecurityTrustHtml(
                `<i class="fa fa-toggle-on" style="font-size:30px;"></i>`
              );
            else
              return this._sanitizer.bypassSecurityTrustHtml(
                `<i  class="fa fa-toggle-off" style="font-size:30px;"></i>`
              );
          },
          filter: false,
        },
      },
    };
    source: LocalDataSource = new LocalDataSource();
  
    constructor(
      private _sanitizer: DomSanitizer,
      private ServiceObj: ApiService,
      private modalService: NgbModal,
      private service: SmartTableService,
      private spinner: NgxSpinnerService,
      private toasterService: ToasterService
    ) {
     
    }
    ngOnInit() {
     // console.log("customer")
      this.getlist();
    }
    private getlist() {
      this.spinner.show();
      let body = {
        spname: "data_get2",
        ptype: "readall",
        ptabname: "tcustomer",
        pid: 0,
      };
  
      this.ServiceObj.apicall(body).subscribe(
        (res) => {
          // debugger;JSON.parse(data.results
          let data: any = res;
  
           
          if (data && data.results && JSON.parse(data.results).Table && JSON.parse(data.results).Table.length > 0) {
            this.dialog = JSON.parse(JSON.parse(data.results).Table[0].document);
            if(this.dialog != null)
            this.source.load(this.dialog);
          }
          this.spinner.hide();
        },
  
        (err) => {
          this.message = err.error.msg;
          this.spinner.hide();
        }
      );
    }
  
    showStaticModal() {
      
    }
    openCreateDialog(event): void {
      //debugger;
      this.dialog1 = {} as any;
      localStorage.setItem("Message", JSON.stringify(this.dialog1));
      const activeModal = this.modalService.open(CustomerAddEditComponent, {
        size: "lg",
        backdrop: "static",
        container: "nb-layout",
      });
      activeModal.result.then(
        (data) => {
          this.getlist();
        },
        (reason) => {
          this.getlist();
        }
      );
      activeModal.componentInstance.modalHeader = "Add Import Setting";
    }
    editDialog(event): void {
      //debugger;
      let i = event.data.id; 
      this.dialog1 = this.dialog.find((h) => h.id == i );
      
      // this.data.changeMessage(JSON.stringify(this.dialog1))
      localStorage.setItem("Message", JSON.stringify(this.dialog1));
      const activeModal = this.modalService.open(CustomerAddEditComponent, {
        size: "lg",
        backdrop: "static",
        container: "nb-layout",
      });
      activeModal.result.then(
        (data) => {
          this.getlist();
        },
        (reason) => {
          this.getlist();
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
    deleteDialog(event): void {
      
      if(window.confirm('Are sure you want to delete this item ?')){

        var data = {
        
          spname: "data_save",
          jdata: [{
                     active: false,
                 }],
          ptabname: "tarticlemst",
          pid: event.data.id,
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
              this.getlist();
              this.title = "Result";
              this.type = "info";
              this.content = "Record deleted successfully..";
              this.showToast(this.type, this.title, this.content);
            }
            this.dialog = {} as any;
            
          },
          (err) => {
            this.message = err.error.msg;
            this.showToast('error', 'error', this.message);
          }
        );
       
      }
    }
    ngOnDestroy() {
      if (this.subscribe$) {
        this.subscribe$.unsubscribe();
      }
    }
  }