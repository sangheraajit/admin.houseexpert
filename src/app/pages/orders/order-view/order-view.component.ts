import { Component, OnInit, EventEmitter } from "@angular/core";
import { DDLItem, DDLItemCategory } from "../../../@core/models/model";
import { DomSanitizer } from "@angular/platform-browser";
import {
  ToasterService,
  ToasterConfig,
  Toast,
  BodyOutputType,
} from "angular2-toaster";
import "style-loader!angular2-toaster/toaster.css";
import { ApiService } from "../../../services/api.service";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LocalDataSource } from "ng2-smart-table";
import { environment } from "../../../../environments/environment";
import { OrderService } from "../../../services/order.service";
import { SelectPackageComponent } from "../select-package/select-package.component";
import { SubcategoryService } from "../../../services/subcategory.service";
@Component({
  selector: "ngx-order-view",
  templateUrl: "./order-view.component.html",
  styleUrls: ["./order-view.component.scss"],
})
export class OrderViewComponent implements OnInit {
  private msg: string = "";
  public dialog: any;
  public dialogdetail: any[] = [];
  public dialogpayment: any[] = [];
  public ddlpart: any;
  public ddlcust: any;
  public ddlpackage: any;
  public showdetail = false;
  public showpayment = false;
  public packagename = "";
  public vehiclename = "";
  public custname = "";
  public strdate = "";
  public paidamount = 0;
  public gstrate = environment.gstrate;
  public insurancerate = environment.insurancerate;
  public incityflag = false;
  public partnername = "Not Assigned";
  ArticlemstlistAll: any;
  constructor(
    private activeModal: NgbActiveModal,
    private ServiceObj: ApiService,
    private _sanitizer: DomSanitizer,
    private toasterService: ToasterService,
    private orderService: OrderService,
    private modalService: NgbModal,
    public SubcategoryService: SubcategoryService
  ) {
    this.msg = localStorage.getItem("Message");
    console.log(this.msg);
    this.getProvList();
    //this.getCustList();

    if (this.msg.length > 0) {
      this.dialog = JSON.parse(this.msg);
      console.log("this.dialog", this.dialog);
      this.custname = this.dialog.cust_email;
      this.getPackList();
      this.getVehicleList();
      this.getorderdetaillist(this.dialog.id);
      this.getpaymentdetaillist(this.dialog.id);
    }
    //this.dialog.orderdate.getHours()}}":00"{{this.dialog.orderdate.getHours()>12?"PM":"AM"}}-{{ this.dialog.orderdate.getHours()+2}}":00"{{this.dialog.orderdate.getHours()>12?"PM":"AM"
    if (Number(new Date(this.dialog.orderdate).getHours()) > 12) {
      this.strdate = (
        (Number(new Date(this.dialog.orderdate).getHours()) - 12).toString() +
        ":00" +
        "PM"
      ).toString();
      this.strdate =
        this.strdate +
        "-" +
        (
          (Number(new Date(this.dialog.orderdate).getHours()) - 10).toString() +
          ":00" +
          "PM"
        ).toString();
    } else {
      this.strdate = (
        Number(new Date(this.dialog.orderdate).getHours()).toString() +
        ":00" +
        "AM"
      ).toString();
      this.strdate =
        this.strdate +
        "-" +
        (
          (Number(new Date(this.dialog.orderdate).getHours()) + 2).toString() +
          ":00" +
          "AM"
        ).toString();
    }
    this.dialog.totkm = Math.ceil(this.dialog.totkm);
    this.incityflag = this.dialog.totkm < environment.withincitykm;
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
    this.getAllarticle();
  }
  closeModal() {
    this.activeModal.close();
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
      pwhere: pwhere1,
    };

    this.ServiceObj.apicall(body).subscribe(
      (res) => {
        // debugger;
        let data: any = res;

        console.log(data.results);
        if (JSON.parse(data.results).Table.length > 0) {
          //this.sourcedatadtl.load(JSON.parse(JSON.parse(data.results).Table[0].document));
          this.dialogdetail = JSON.parse(
            JSON.parse(data.results).Table[0].document
          );
        }
      },

      (err) => {
        this.message = err.error.msg;
      }
    );
  }
  insuranceamountchange() {
    this.dialog.insuranceamount =
      (this.dialog.forinsurance * this.insurancerate) / 100;
  }
  totalamountchange() {}
  discountamountchange() {}

  private getpaymentdetaillist(oid) {
    let pwhere1 = " orderid ='" + oid + "'";
    let body = {
      spname: "data_get",
      ptype: "readwhere",
      ptabname: "tpayment",
      pid: 0,
      pwhere: pwhere1,
    };

    this.ServiceObj.apicall(body).subscribe(
      (res) => {
        // debugger;
        let data: any = res;
        /* if (!this.dialog.forinsurance && this.dialog.forinsurance != 0)
          this.dialog.forinsurance = 100000; */
        if (!this.dialog.gstamount && this.dialog.gstamount != 0)
          this.dialog.gstamount = Math.round(
            (this.dialog.grandtotal * this.gstrate) / 100
          );
        /* if (!this.dialog.insuranceamount && this.dialog.insuranceamount != 0)
          this.dialog.insuranceamount = Math.round(
            (this.dialog.forinsurance * this.insurancerate) / 100
          ); */
        console.log(data.results);
        if (JSON.parse(data.results).Table.length > 0) {
          this.paidamount = 0;
          //this.sourcedatapay.load(JSON.parse(JSON.parse(data.results).Table[0].document));
          this.dialogpayment = JSON.parse(
            JSON.parse(data.results).Table[0].document
          );
          this.dialogpayment &&
            this.dialogpayment.forEach((itm) => {
              if (itm.credit) {
                this.paidamount += Number(itm.credit);
              }
              if (itm.debit) {
                this.paidamount -= Number(itm.debit);
              }
            });
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
      pdrptype: "DDL_CUST",
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
      pdrptype: "DDL_PACKAGE",
    };

    this.ServiceObj.apicall(body).subscribe(
      (res) => {
        let data: any = res;
        if (JSON.parse(data.results).Table.length > 0) {
          this.ddlpackage = JSON.parse(data.results).Table as DDLItem[];
          var packagefind = this.ddlpackage.find(
            (x) => x.idval == this.dialog.packageid
          );
          if (packagefind) {
            this.packagename = packagefind.textval;
          }
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
      pdrptype: "DDL_PARTNER",
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
  private getVehicleList() {
    // this.spinner.show();
    let body = {
      spname: "data_get",
      ptype: "read",
      ptabname: "tvehiclemst",
      pid: this.dialog.vehicleid,
    };

    this.ServiceObj.apicall(body).subscribe(
      (res) => {
        let data: any = res;
        if (JSON.parse(data.results).Table.length > 0) {
          this.vehiclename = JSON.parse(
            JSON.parse(data.results).Table[0].document
          )[0].vehiclename;
        }
      },
      (err) => {
        this.message = err.error.msg;
        // this.spinner.hide();
      }
    );
  }
  CancelOrder() {
    if (
      this.dialog.cancelreason == "" ||
      this.dialog.cancelreason == undefined
    ) {
      this.title = "Error";
      this.type = "error";
      this.content = " Order Cancel Reason Can Not Be Blank !";
      this.showToast(this.type, this.title, this.content);
      return;
    } else {
      this.dialog.orderstatus = "cancel";
    }
    var data = {
      spname: "data_save",
      jdata: [
        {
          orderstatus: this.dialog.orderstatus,
          cancelreason: this.dialog.cancelreason,
        },
      ],
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
          this.content = "Order cancelled successfully..";
          this.showToast(this.type, this.title, this.content);
          if (this.custname == this.dialog.cust_email) {
            this.dialog = {} as any;
            this.activeModal.close();
          }
        }
      },
      (err) => {
        this.message = err.error.msg;
        //this.showToast('error', 'error', this.message);
      }
    );
  }
  SaveData_Old() {
    {
      if (this.dialog.orderstatus == "token") {
        this.dialog.orderstatus = "adminapproved";
      }
      var data = {
        spname: "data_save",
        jdata: [
          {
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

            discount: this.dialog.discount,
            grandtotal: this.dialog.grandtotal,
            part_id: this.dialog.part_id,
            gstamount: this.dialog.gstamount,
            insuranceamount: this.dialog.insuranceamount,
            forinsurance:
              this.dialog.insuranceamount == "0" ? 0 : this.dialog.forinsurance,
            orderstatus: this.dialog.orderstatus,
            //  fromfloor: this.dialog.fromfloor,
            //  tofloor: this.dialog.tofloor,
            //  packageid: this.dialog.packageid,
            //  extracharges: this.dialog.extracharges,
            //  addoncharges: this.dialog.addoncharges,
            //  fromlift: this.dialog.fromlift,
            //  tolift: this.dialog.tolift,

            // 				  active: this.dialog.active,
          },
        ],
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
            this.orderService
              .SendEmailAdminOrderQuote(this.dialog.id)
              .subscribe((res) => {
                console.log("SendEmailAdminOrderQuote", res);
              });
            this.title = "Result";
            this.type = "info";
            this.content = "Record processed successfully..";
            this.showToast(this.type, this.title, this.content);
            if (this.custname == this.dialog.cust_email) {
              this.dialog = {} as any;
              this.activeModal.close();
            }
          }
        },
        (err) => {
          this.message = err.error.msg;
          //this.showToast('error', 'error', this.message);
        }
      );
      if (this.custname != this.dialog.cust_email) {
        var data1 = {
          spname: "data_save",
          jdata: [
            {
              cust_email: this.dialog.cust_email,
            },
          ],
          ptabname: "tcustomer",
          pid: this.dialog.customerid,
        };

        this.ServiceObj.apicall(data1).subscribe((res1) => {
          let data2: any = res1;
          if (data2.results == null) {
            this.title = "Error";
            this.type = "error";
            this.content = "Fail to Add/Update Email!";
            this.showToast(this.type, this.title, this.content);
          } else {
            this.title = "Result";
            this.type = "info";
            this.content = "Customer Email updated successfully..";
            this.showToast(this.type, this.title, this.content);
            this.dialog = {} as any;
            this.activeModal.close();
          }
        });
      }
    }
  }

  SaveData(closeModal = false) {
    {
      if (this.dialog.orderstatus == "token") {
        this.dialog.orderstatus = "adminapproved";
      }
      var data = {
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

        Discount: this.dialog.discount,
        Total: this.dialog.total,
        Grandtotal:
          this.dialog.total +
          this.dialog.gstamount +
          this.dialog.insuranceamount -
          this.dialog.discount, //this.dialog.grandtotal,
        PartId: this.dialog.part_id,
        Tax: this.dialog.gstamount,
        gstamount: this.dialog.gstamount,
        insuranceamount: this.dialog.insuranceamount,
        forinsurance:
          this.dialog.insuranceamount == "0" ? 0 : this.dialog.forinsurance,
        Orderstatus: this.dialog.orderstatus,
        //  fromfloor: this.dialog.fromfloor,
        //  tofloor: this.dialog.tofloor,
        //  packageid: this.dialog.packageid,
        //  extracharges: this.dialog.extracharges,
        //  addoncharges: this.dialog.addoncharges,
        //  fromlift: this.dialog.fromlift,
        //  tolift: this.dialog.tolift,

        // 				  active: this.dialog.active,
        Orderid: this.dialog.id == null ? 0 : this.dialog.id,
      };
      let body = data;
      console.log("body", body);
      this.orderService.AdminOrderUpdate(body).subscribe(
        (res) => {
          //debugger;
          let data: any = res;

          if (data.results == null) {
            this.title = "Error";
            this.type = "error";
            this.content = "Fail to Add/Update !";
            this.showToast(this.type, this.title, this.content);
          } else {
            /*  this.orderService.SendEmailAdminOrderQuote(this.dialog.id).subscribe(
                  (res) => {
                    console.log("SendEmailAdminOrderQuote",res)
                  }); */
            this.title = "Result";
            this.type = "info";
            this.content = "Record processed successfully..";
            this.showToast(this.type, this.title, this.content);
            if (this.custname == this.dialog.cust_email) {
              if (closeModal) {
                this.dialog = {} as any;
                this.activeModal.close();
              }
            }
          }
        },
        (err) => {
          this.message = err.error.msg;
          //this.showToast('error', 'error', this.message);
        }
      );
      if (this.custname != this.dialog.cust_email) {
        var data1 = {
          spname: "data_save",
          jdata: [
            {
              cust_email: this.dialog.cust_email,
            },
          ],
          ptabname: "tcustomer",
          pid: this.dialog.customerid,
        };

        this.ServiceObj.apicall(data1).subscribe((res1) => {
          let data2: any = res1;
          if (data2.results == null) {
            this.title = "Error";
            this.type = "error";
            this.content = "Fail to Add/Update Email!";
            this.showToast(this.type, this.title, this.content);
          } else {
            this.title = "Result";
            this.type = "info";
            this.content = "Customer Email updated successfully..";
            this.showToast(this.type, this.title, this.content);
            if (closeModal) {
              this.dialog = {} as any;
              this.activeModal.close();
            }
          }
        });
      }
    }
  }
  onChange(value: any) {
    console.log("onChange", value.target.value);
    this.dialog.part_id = value.target.value;
  }
  getSeverity(status: string) {
    switch (status) {
      case "Completed":
      case "ready":
        return "success";
      case "Token":
      case "adminapproved":
        return "warning";
      case "Quotation":
      case "new":
        return "danger";
      default:
        return "danger";
    }
  }
  viewPackageRate(event): void {
    const modalRef = this.modalService.open(SelectPackageComponent, {
      size: "lg",
      backdrop: "static",
      container: "nb-layout",
    });
    this.dialog.orderDetails = this.dialogdetail;
    modalRef.componentInstance.orderHeader = this.dialog;
    modalRef.componentInstance.ArticlemstlistAll = this.ArticlemstlistAll;

    modalRef.result.then((result) => {
      if (result) {
        console.log("passdata", result);

        localStorage.setItem("Message", result);
        this.SaveData();
        var packagefind = this.ddlpackage.find(
          (x) => x.idval == result.packageid
        );
        if (packagefind) {
          this.packagename = packagefind.textval;
        }
      }
    });
  }
  getAllarticle() {
    this.SubcategoryService.getAllarticle("", "").subscribe((res: any) => {
      let data: any = res;

      console.log(data.results);
      if (JSON.parse(data.results).Table.length > 0) {
        //this.sourcedatadtl.load(JSON.parse(JSON.parse(data.results).Table[0].document));
        this.ArticlemstlistAll = JSON.parse(
          JSON.parse(data.results).Table[0].document
        );
      }
    });
  }
}
