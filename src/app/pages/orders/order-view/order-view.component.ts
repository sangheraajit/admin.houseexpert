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
import { GoogleAddressService } from "../../../services/google-address.service";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { OrderAddProductsComponent } from "../../../@theme/components";
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
  public Customerform: FormGroup = new FormGroup({
    fromaddress: new FormControl("", [Validators.required]),
    toaddress: new FormControl("", [Validators.required]),
    fromfloor: new FormControl("", [Validators.required]),
    tofloor: new FormControl("", [Validators.required]),
    cust_name: new FormControl("", [Validators.required]),
    cust_mobile: new FormControl("", [Validators.required]),
    cust_email: new FormControl("", [Validators.required]),
    fromlift: new FormControl("", [Validators.required]),
    tolift: new FormControl("", [Validators.required]),
  });
   settings = {
      mode: "external",
      
      pager: {
        display: true,
        perPage: 10,
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
        deleteButtonContent: '<i class="nb-paper-plane"></i>',
      },
  
      columns: {
        item_name: {
          title: "Item#",
          type: "string",
          filter: false,
          width: "80%",
        },
        quantity: {
          title: "Quantity",
          type: "string",
          filter: false,
          width: "10%",
          editable: true,
         
        },
      
      },
    };
    sourcedata: LocalDataSource = new LocalDataSource();
    // Data source for the table
  source: LocalDataSource = new LocalDataSource();

  // Table settings
  settings1 = {
    actions: { add: false, delete: false, position: 'right' },
    edit: {
      editButtonContent: '✎',
      saveButtonContent: '💾',
      cancelButtonContent: '✗',
      confirmSave: true, // Ensures you can capture the event
    },
    columns: {
      id: { title: 'ID', editable: false },
      name: { title: 'Name' },
      age: { title: 'Age', type: 'number' },
    },
  };

  // Sample table data
  data = [
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
  ];
  constructor(
    private activeModal: NgbActiveModal,
    private ServiceObj: ApiService,
    private _sanitizer: DomSanitizer,
    private toasterService: ToasterService,
    private orderService: OrderService,
    private modalService: NgbModal,
    public SubcategoryService: SubcategoryService,
    private googleAddressService: GoogleAddressService,
  ) {
    this.msg = localStorage.getItem("Message");
    console.log(this.msg);
    this.getProvList();
    //this.getCustList();
    this.source.load(this.data);
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

       // console.log(data.results);
        if (JSON.parse(data.results).Table.length > 0) {
          //this.sourcedatadtl.load(JSON.parse(JSON.parse(data.results).Table[0].document));
          this.dialogdetail = JSON.parse(
            JSON.parse(data.results).Table[0].document
          );
          this.sourcedata.load(this.dialogdetail);
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

     //console.log(data.results);
      if (JSON.parse(data.results).Table.length > 0) {
        //this.sourcedatadtl.load(JSON.parse(JSON.parse(data.results).Table[0].document));
        this.ArticlemstlistAll = JSON.parse(
          JSON.parse(data.results).Table[0].document
        );
      }
    });
  }
  calculateFinalTotal() {
    const { subtotal, discount, insuranceamount, gstamount } = this.dialog;
    this.dialog.finaltotal = subtotal - discount + insuranceamount + gstamount;
  }
  getAddress(place: any, type: string) {
    // this.phone = this.getPhone(place);

    this.setaddress(place, type);
    
  }
  setaddress(place: any, type: string) {
    if (type == "from") {
     this.dialog.fromaddress =
        this.googleAddressService.getFormattedAddress(place);
     this.dialog.fromlat = this.googleAddressService.getlat(place);
     this.dialog.fromlong = this.googleAddressService.getlng(place);
     this.dialog.fromcity = this.googleAddressService.getDistrict(place);
    }
    if (type == "to") {
     this.dialog.toaddress =
        this.googleAddressService.getFormattedAddress(place);
     this.dialog.tolat = this.googleAddressService.getlat(place);
     this.dialog.tolong = this.googleAddressService.getlng(place);
     this.dialog.tocity = this.googleAddressService.getDistrict(place);
    }
      // Obtain the distance in meters by the computeDistanceBetween method
      // From the Google Maps extension using plain coordinates
      var distanceInMeters =
        google.maps.geometry.spherical.computeDistanceBetween(
          new google.maps.LatLng({
            lat:this.dialog.fromlat,
            lng:this.dialog.fromlong,
          }),
          new google.maps.LatLng({
            lat:this.dialog.tolat,
            lng:this.dialog.tolong,
          })
        );

      // Outputs: Distance in Meters:  286562.7470149898
      console.log("Distance in Meters: ", distanceInMeters);

     /*  // Outputs: Distance in Kilometers:  286.5627470149898
      this.DistanceKM = (distanceInMeters * 0.001).toFixed(2);
      console.log("Distance in Kilometers: ", this.DistanceKM);
     this.dialog.totkm = this.DistanceKM;
      if (this.jheader.totkm < 150) {
       this.dialog.incity = true;
      } else {
       this.dialog.incity = false;
      }
      this.bookingInformation.jheader[0] =this.dialog; */
  }

  get f(): { [key: string]: AbstractControl } {
    return this.Customerform.controls;
  }
  onCreateConfirm(event) {
    console.log("Create Event In Console")
    console.log(event);
    event.confirm.resolve();
  }
  editDialog(event: any): void {
    let dialogData;
  
    if (event.isNew) {
      // For adding a new record
      dialogData = { TYPE: "C", data: {} }; // TYPE "C" for Create, empty data for new record
    } else if (event.data && event.data.id) {
      // For editing an existing record
      let id = event.data.id;
      // Assuming `this.dialog` contains a list of records to find by ID
      dialogData = this.dialog.find((h) => h.id === id);
      if (dialogData) {
        dialogData.TYPE = "U"; // TYPE "U" for Update
      } else {
        console.error("No dialog found for ID:", id);
        return; // Prevent opening the modal if no dialog data is found
      }
    }
  
    // Save dialogData to local storage for use in the modal component
    localStorage.setItem("Message", JSON.stringify(dialogData));
  
    // Open the modal
    const activeModal = this.modalService.open(OrderAddProductsComponent, {
      size: "lg",
      backdrop: "static",
      container: "nb-layout",
    });
    activeModal.componentInstance.OrderDetails = this.dialogdetail;
    // Handle modal close events
    activeModal.result.then(
      (data) => {
        console.log("Modal closed with data:", data);
        // Refresh the list or perform necessary updates
        //this.getlist();
      },
      (reason) => {
        console.log("Modal dismissed with reason:", reason);
        // Handle dismiss logic or refresh the list if needed
       // this.getlist();
      }
    );
  }
  
  
     // Capture inline edit save confirmation
  onSaveConfirm(event: any): void {
    if (window.confirm('Are you sure you want to save changes?')) {
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  // Open external dialog for new row addition
  openAddDialog(): void {
    this.editDialog({ isNew: true });
  }
}
