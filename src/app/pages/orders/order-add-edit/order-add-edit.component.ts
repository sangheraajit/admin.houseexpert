import { Component, OnInit, EventEmitter } from "@angular/core";
import { DDLItem, DDLItemCategory } from "../../../@core/models/model";
import { DomSanitizer } from "@angular/platform-browser";
import {
  ToasterService,
  ToasterConfig,
  Toast,
  BodyOutputType,
} from "angular2-toaster";
import { ApiService } from "../../../services/api.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { LocalDataSource } from "ng2-smart-table";
@Component({
  selector: 'ngx-order-add-edit',
  templateUrl: './order-add-edit.component.html',
  styleUrls: ['./order-add-edit.component.scss']
})
export class OrderAddEditComponent implements OnInit {
  private msg: string = "";
  public dialog: any; 
  public ddlpart: any; 
  public ddlcust: any; 
  public ddlpackage: any; 
  public showdetail = false;
  public showpayment = false;
  settingsdtl = {
    mode: "external",
    pager: {
      display: false,
      perPage: 10,
    },
    actions: {
      delete: false,
      add: false,
      edit: false,
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
       
      article_id: {
        title: "Article #",
        type: "string",
        filter: false,
        width: "5%",
      },
      item_name: {
        title: "Item Name",
        type: "string",
        filter: false,
        width: "15%",
      },
      quantity: {
        title: "Qty",
        type: "string",
        filter: false,
        width: "5%",
      },
      admin_rate: {
        title: "Admin Rate",
        type: "string",
        filter: false,
        width: "5%",
      },
      partner_rate: {
        title: "Partner Rate",
        type: "string",
        filter: false,
        width: "5%",
      },
      tax: {
        title: "Tax",
        type: "string",
        filter: false,
        width: "5%",
      },
      line_total: {
        title: "Line Total",
        type: "string",
        filter: false,
        width: "5%",
      },
      linestatus: {
        title: "Line Status",
        type: "string",
        filter: false,
        width: "15%",
      },
      active: {
        title: "Active",
        type: "html",
        width: "5%",
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
  settingspay = {
    mode: "external",
    pager: {
      display: false,
      perPage: 10,
    },
    actions: {
      delete: false,
      add: false,
      edit: false,
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
       
      paymenttype: {
        title: "Payment Type",
        type: "string",
        filter: false,
        width: "15%",
      },
      paymentid: {
        title: "Payment ID",
        type: "string",
        filter: false,
        width: "15%",
      },
      currency: {
        title: "Currency",
        type: "string",
        filter: false,
        width: "15%",
      },
      credit: {
        title: "Credit",
        type: "string",
        filter: false,
        width: "20%",
      },
      debit: {
        title: "Debit",
        type: "string",
        filter: false,
        width: "15%",
      },
      
    },
  };
  sourcedatadtl: LocalDataSource = new LocalDataSource();
  sourcedatapay: LocalDataSource = new LocalDataSource();

  constructor(
    private activeModal: NgbActiveModal,
    private ServiceObj: ApiService,
    private _sanitizer: DomSanitizer,
    private toasterService: ToasterService
  ) {
     
    this.msg = localStorage.getItem("Message");
     this.getProvList();
     this.getCustList();
     this.getPackList();
    if (this.msg.length > 0) {
      this.dialog = JSON.parse(this.msg);
      this.getorderdetaillist(this.dialog.id);
      this.getpaymentdetaillist(this.dialog.id);
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
  noedit = true;
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
    var data = {
    spname: "data_save",
        jdata: [{
//  orderdate: this.dialog.orderdate, 
//  orderno: this.dialog.orderno, 
//  customerid: this.dialog.customerid, 
//  fromaddress: this.dialog.fromaddress, 
//  fromcity: this.dialog.fromcity, 
//  fromlat: this.dialog.fromlat, 
//  fromlong: this.dialog.fromlong, 
//  toaddress: this.dialog.toaddress, 
//  tocity: this.dialog.tocity, 
//  tolat: this.dialog.tolat, 
//  tolong: this.dialog.tolong, 
//  totkm: this.dialog.totkm, 
//  incity: this.dialog.incity, 
//  total: this.dialog.total, 
//  tax: this.dialog.tax, 
//  discount: this.dialog.discount, 
//  grandtotal: this.dialog.grandtotal, 
 part_id: this.dialog.part_id, 
 gstamount: this.dialog.gstamount,
 insuranceamount: this.dialog.insuranceamount,
 forinsurance: (this.dialog.insuranceamount=="0"?0:this.dialog.forinsurance),
//  orderstatus: this.dialog.orderstatus, 
//  fromfloor: this.dialog.fromfloor, 
//  tofloor: this.dialog.tofloor, 
//  packageid: this.dialog.packageid, 
//  extracharges: this.dialog.extracharges, 
//  addoncharges: this.dialog.addoncharges, 
//  fromlift: this.dialog.fromlift, 
//  tolift: this.dialog.tolift, 

// 				  active: this.dialog.active,
               }],
        ptabname: "torder",
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
  
  private getorderdetaillist(oid) {
    let pwhere1 = " orderid ='" + oid + "'";
      let body = {
        spname: "data_get",
        ptype: "readwhere",
        ptabname: "torderdtl",
        pid: 0,
        pwhere: pwhere1
      };
  
      this.ServiceObj.apicall(body).subscribe(
        (res) => {
          // debugger;
          let data: any = res;
  
          console.log(data.results);
          if (JSON.parse(data.results).Table.length > 0) {
             
            this.sourcedatadtl.load(JSON.parse(JSON.parse(data.results).Table[0].document));
          }
          
        },
  
        (err) => {
          this.message = err.error.msg;
          
        }
      );
  }
  private getpaymentdetaillist(oid) {
    let pwhere1 = " orderid ='" + oid + "'";
      let body = {
        spname: "data_get",
        ptype: "readwhere",
        ptabname: "tpayment",
        pid: 0,
        pwhere: pwhere1
      };
  
      this.ServiceObj.apicall(body).subscribe(
        (res) => {
          // debugger;
          let data: any = res;
  
          console.log(data.results);
          if (JSON.parse(data.results).Table.length > 0) {
             
            this.sourcedatapay.load(JSON.parse(JSON.parse(data.results).Table[0].document));
          }
          
        },
  
        (err) => {
          this.message = err.error.msg;
          
        }
      );
  }
  private getCustList() {
    // this.spinner.show();
    let body = {
      spname: "getdropdown",
      pdrptype: "DDL_CUST" 
    };

    this.ServiceObj.apicall(body).subscribe(
      (res) => {
        let data: any = res;
        if (JSON.parse(data.results).Table.length > 0) {
          this.ddlcust = JSON.parse(data.results).Table as DDLItem[];
      }
    },
      (err) => {
        this.message = err.error.msg;
        // this.spinner.hide();
      }
    );
  }
  private getPackList() {
    // this.spinner.show();
    let body = {
      spname: "getdropdown",
      pdrptype: "DDL_PACKAGE" 
    };

    this.ServiceObj.apicall(body).subscribe(
      (res) => {
        let data: any = res;
        if (JSON.parse(data.results).Table.length > 0) {
          this.ddlpackage = JSON.parse(data.results).Table as DDLItem[];
      }
    },
      (err) => {
        this.message = err.error.msg;
        // this.spinner.hide();
      }
    );
  }
  private getProvList() {
    // this.spinner.show();
    let body = {
      spname: "getdropdown",
      pdrptype: "DDL_PARTNER" 
    };

    this.ServiceObj.apicall(body).subscribe(
      (res) => {
        let data: any = res;
        if (JSON.parse(data.results).Table.length > 0) {
          this.ddlpart = JSON.parse(data.results).Table as DDLItem[];
      }
    },
      (err) => {
        this.message = err.error.msg;
        // this.spinner.hide();
      }
    );
  }
}