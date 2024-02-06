import { Component, OnInit, EventEmitter } from "@angular/core";
import { DDLItem, DDLItemCategory } from "../../../@core/models/model";

import {
  ToasterService,
  ToasterConfig,
  Toast,
  BodyOutputType,
} from "angular2-toaster";
import "style-loader!angular2-toaster/toaster.css";
import { ApiService } from "../../../services/api.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { LocalDataSource } from "ng2-smart-table";
import { NgxSpinnerService } from "ngx-spinner";


import { DomSanitizer } from "@angular/platform-browser";
import { parse } from "path";
@Component({
  selector: 'ngx-packages-add-edit',
  templateUrl: './packages-add-edit.component.html',
  styleUrls: ['./packages-add-edit.component.scss']
})
export class PackagesAddEditComponent implements OnInit {
  private msg: string = "";
  public dialog: any; 
  public dialog1: any; 
  public dialogp: any;
  public dialog2: any; 
  public dialogr: any;
  // setMaster : boolean = false;
  // setDetail: boolean = false;
  setAddEdit: boolean = false;

  settings = {
    mode: "external",
        pager: {
          display: true,
          perPage: 40,
        },
        actions: {
          delete: false,
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
          // id: {
          //   title: "ID",
          //   type: "string",
          //   filter: true,
          //   width: "15%",
          //   editable: false,
          // },
          bulletdesc: {
            title: "Bullet Description",
            type: "string",
            filter: true,
            width: "50%",
          },
          bulletamount: {
            title: "Bullet Amount",
            type: "string",
            filter: true,
            width: "20%",
          },
          bulletsequence: {
            title: "Bullet Sequence",
            type: "string",
            filter: true,
            width: "20%",
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

  
  settings2 = {
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
      // packagename: {
      //   title: "Package Name",
      //   type: "string",
      //   filter: true,
      //   width: "25%",
      // },
      fromcft: {
        title: "From cft",
        type: "string",
        filter: true,
        width: "10%",
      },
      tocft: {
        title: "To cft",
        type: "string",
        filter: true,
        width: "10%",
      },
      fromkm: {
        title: "From KM",
        type: "string",
        filter: true,
        width: "10%",
      },
      tokm: {
        title: "To KM",
        type: "string",
        filter: true,
        width: "10%",
      },
      packagefixed: {
        title: "Package Rate",
        type: "string",
        filter: true,
        width: "12%",
      },
      packageperkm: {
        title: "Package per KM",
        type: "string",
        filter: true,
        width: "12%",
      },
      active: {
        title: "Active",
        type: "html",
        width: "6%",
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
  source2: LocalDataSource = new LocalDataSource();

  constructor(
    private activeModal: NgbActiveModal,
    private ServiceObj: ApiService,
    private toasterService: ToasterService,

    private _sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService
  ) {
     
    this.msg = localStorage.getItem("Message");
    this.dialog1 = {} as any;
    if (this.msg.length > 0) {
      this.dialog = JSON.parse(this.msg);
      if (this.msg.length > 2) {
          this.getlist(this.dialog.id);
          this.getlist2(this.dialog.id);
        }
      //  this.setMaster  = true;
      //  this.setDetail = false;
       this.setAddEdit = false;
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
  
   
  SaveDataMaster() { 
	
    var data = {
        
        spname: "data_save",
        jdata: [{
                   packagename: this.dialog.packagename, 
 packagedesc: this.dialog.packagedesc, 
 packageamount: this.dialog.packageamount, 
 packagesequence: this.dialog.packagesequence, 
 imageurl: this.dialog.imageurl, 

				  active: this.dialog.active,
               }],
        ptabname: "tpackagemst",
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
            this.content = "Record processed successfully. Please add details in Detail Tab.";
            this.showToast(this.type, this.title, this.content);
            this.dialog.id = JSON.parse(data.results).Table[0].data_save;
          }
          //this.dialog = {} as any;
          

          // localStorage.setItem("Reload", "true");
          //this.activeModal.close();
        },
        (err) => {
          this.message = err.error.msg;
          //this.showToast('error', 'error', this.message);
        }
      );
    }
    SaveDataDetail() { 
	
      var data = {
          
          spname: "data_save",
          jdata: [{
            packageid: this.dialog.id,
            bulletdesc: this.dialog1.bulletdesc, 
            bulletamount: this.dialog1.bulletamount, 
            bulletsequence: this.dialog1.bulletsequence, 
            active: this.dialog.active,
                 }],
          ptabname: "tpackagedtl",
          pid: this.dialog1.id == null ? 0 : this.dialog1.id,
         
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
              this.getlist(this.dialog.id)
              this.title = "Result";
              this.type = "info";
              this.content = "Record processed successfully..";
              this.showToast(this.type, this.title, this.content);
             
             
              this.setAddEdit =false;
            }
            this.dialog1 = {} as any;
            
  
            // localStorage.setItem("Reload", "true");
            //this.activeModal.close();
          },
          (err) => {
            this.message = err.error.msg;
            //this.showToast('error', 'error', this.message);
          }
        );
      }
      
      SaveCFTrate() {
     
        {
          var data = {
              
              spname: "data_save",
              jdata: [{
                        id: this.dialogr.id, 
                        serv_id: 0, 
                        package_id: this.dialog.id, 
                        fromcft: this.dialogr.fromcft==''?0:this.dialogr.fromcft, 
                        tocft: this.dialogr.tocft==''?0:this.dialogr.tocft, 
                        fromkm: this.dialogr.fromkm==''?0:this.dialogr.fromkm, 
                        tokm: this.dialogr.tokm==''?0:this.dialogr.tokm, 
                        packagefixed: this.dialogr.packagefixed==''?0:this.dialogr.packagefixed, 
                        packageperkm: this.dialogr.packageperkm==''?0:this.dialogr.packageperkm, 
                        extrafixed: this.dialogr.extrafixed==''?0:this.dialogr.extrafixed, 
                        extraperkm: this.dialogr.extraperkm==''?0:this.dialogr.extraperkm, 
                        active: this.dialogr.active,
                     }],
              ptabname: "tratemst",
              pid: this.dialogr.id == null ? 0 : this.dialogr.id,
             
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
                this.dialogr = {} as any;
                
      
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
  
  private getlist(ppid) {
    this.spinner.show();
    let body = {
      spname: "packagedtl_read",
      ptype: "readall",
      pid: Number(ppid),
    };

    this.ServiceObj.apicall(body).subscribe(
      (res) => {
        this.spinner.hide();
        // debugger;
        let data: any = res;

        console.log(data.results);
        if(data.results)
        if (JSON.parse(data.results).Table.length > 0) {
          this.dialogp =  (JSON.parse(data.results).Table);
          this.source.load(this.dialogp);
          if(this.dialogp.length>0)
            this.dialog1 = this.dialogp[0];
          else
          this.dialog1 = {};
        }
       
      },
      (err) => {
        this.message = err.error.msg;
        this.spinner.hide();
      }
    );
  }
  private getlist2(ppid) {
    this.spinner.show();
    let body = {
      spname: "ratemst_read",
      ptype: "readbypackage",
      pid: Number(ppid),
    };

    this.ServiceObj.apicall(body).subscribe(
      (res) => {
        // debugger;
        let data: any = res;

        console.log(data.results);
        if (JSON.parse(data.results).Table.length > 0) {
          this.dialog2 = JSON.parse(JSON.parse(data.results).Table[0].document);
          this.source2.load(this.dialog2);
        }
        this.spinner.hide();
      },

      (err) => {
        this.message = err.error.msg;
        this.spinner.hide();
      }
    );
  }

  openCreateDialog(event): void {
    this.dialog1 = {} as any;
    this.setAddEdit = true;
  }
  editDialog(event): void {
    let i = event.data.id; 
    this.dialog1 = this.dialogp.find((h) => h.id == i );
     
       this.setAddEdit = true;
  }
  deleteDialog(event): void {
    let i = event.data.id; 
    this.dialog1 = this.dialogp.find((h) => h.id == i ); 
     
       this.setAddEdit = true;
  }
  openCreateDialog2(event): void {
    this.dialogr = {} as any;
    this.setAddEdit = true;
  }
  editDialog2(event): void {
    let i = event.data.id; 
    this.dialogr = this.dialog2.find((h) => h.id == i );
     
       this.setAddEdit = true;
  }
  deleteDialog2(event): void {
    let i = event.data.id; 
    this.dialogr = this.dialogp.find((h) => h.id == i ); 
     
       this.setAddEdit = true;
  }
  changeTab(event) {
    console.log(event.tabTitle)

    if (event.nextId == '0') {
        // Action for first tab
        this.setAddEdit = false;
    }

    else if (event.nextId == '1') {
        // Action for second tab
        this.setAddEdit = false;
    }
    else if (event.nextId == '2') {
      // Action for third tab
      this.setAddEdit = false;
  }
}
}