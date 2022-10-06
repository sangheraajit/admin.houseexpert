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
  selector: "ngx-provider-add-edit",
  templateUrl: "./provider-add-edit.component.html",
  styleUrls: ["./provider-add-edit.component.scss"],
}) //ProviderAddEditComponent
export class ProviderAddEditComponent implements OnInit {
  private msg: string = "";
  public ddlPartnertype: DDLItem[];
  public ddlCity: DDLItem[];
  public dialogp: any;
  public shopAdd: any = {
    shop_name: "",
    shop_desc: "",
    shop_rating: "",
    shop_mobile: "",
    shop_email: "",
    shop_lat: "",
    shop_long: "",
    city_id: "",
    shop_street: "",
    active: true,
  };
  public dialogService: any;
  public dialogs: any;
  public dialogv: any;
  public dialogr: any;
  public servaction = "list";
  public rateaction = "list";
  public shopaction = "list";
  public isfreelancer: boolean = false;
  ddlcategory: any[] = [];
  ddlShop: any[] = [];
  // Decalration for Shop

  settingshop = {
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
      // imageurl: {
      //   title: "Image",
      //   type: "html",
      //   width: "6%",
      //   filter: false,
      //   valuePrepareFunction: (imageurl: string) => {
      //     return `<img src="./assets/images/${imageurl}" height="50px" width="50px" class="imgs" id="imgs" style="border-radius:50%"/>`;
      //     // return `<img src="${pimages}" height="50px" width="50px" class="imgs" id="imgs" style="border-radius:50%"/>`;
      //   },
      // },
      shop_name: {
        title: "Name",
        type: "string",

        filter: true,
        width: "30%",
      },
      shop_desc: {
        title: "Description",
        type: "string",
        filter: true,
        width: "10%",
      },
      shop_rating: {
        title: "Rating",
        type: "string",
        filter: true,
        width: "20%",
      },
      shop_email: {
        title: "Email",
        type: "string",
        filter: true,
        width: "20%",
      },
      shop_mobile: {
        title: "Mobile",
        type: "string",
        filter: true,
        width: "10%",
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
  source: LocalDataSource = new LocalDataSource();

  // Decalration for Service

  settingsService = {
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
    //cat_name,part_name
    columns: {
      imageurl: {
        title: "Image",
        type: "html",
        width: "6%",
        filter: false,
        valuePrepareFunction: (imageurl: string) => {
          return `<img src="./assets/images/${imageurl}" height="50px" width="50px" class="imgs" id="imgs" style="border-radius:50%"/>`;
          // return `<img src="${pimages}" height="50px" width="50px" class="imgs" id="imgs" style="border-radius:50%"/>`;
        },
      },
      serv_desc: {
        title: "Service Description",
        type: "string",

        filter: true,
        width: "20%",
      },
      part_name: {
        title: "Provider Name",
        type: "string",

        filter: true,
        width: "20%",
      },
      cat_name: {
        title: "Category Name",
        type: "string",
        filter: true,
        width: "20%",
      },
      serv_cost: {
        title: "Cost",
        type: "string",
        filter: true,
        width: "20%",
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
  sourceService: LocalDataSource = new LocalDataSource();

  // Declaration for Rate

  settingsRate = {
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
      cft: {
        title: "cft",
        type: "string",

        filter: false,
        width: "8%",
      },
      cft_rate: {
        title: "cft rate",
        type: "string",
      },
      extrafixed: {
        title: "Fixed",
        type: "string",
        width: "6%",
      },
      extraperkm: {
        title: "Per KM",
        type: "string",
        width: "6%",
      },
      fromkm: {
        title: "From Km",
        type: "string",
        width: "6%",
      },
      tokm: {
        title: "To Km",
        type: "string",
        width: "6%",
      },
    },
  };
  sourceRate: LocalDataSource = new LocalDataSource();
  constructor(
    private activeModal: NgbActiveModal,
    private _sanitizer: DomSanitizer,
    private ServiceObj: ApiService,
    private toasterService: ToasterService,
    private router: Router
  ) {
    //this.EntityID = localStorage.getItem("Entity");
    this.msg = localStorage.getItem("Message");
    this.getPartnertypeDDL();
    this.getCityDDL();
    this.getCategoryeDDL();
    if (this.msg.length > 0) {
      this.dialogp = JSON.parse(this.msg) as any;
      this.filterChanged(this.dialogp.parttype_id);
      if (this.dialogp.id) {
        this.getShopList();
        this.getServiceList();
        this.getRateMasterlist();
      }
    }
  }
  profile: any;
  ddlCountry: DDLItem[];
  ddlState: DDLItem[];
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
  public uploader1: FileUploader = new FileUploader({
    isHTML5: true,
  });
  isUploaded1 = false;
  openCreateDialogshop(event): void {
    this.dialogs = {} as any;
    this.shopaction = "add";
    // localStorage.setItem("Message", JSON.stringify(this.dialog1));
    // const activeModal = this.modalService.open(ProviderTypesAddEditComponent, {
    //   size: "lg",
    //   backdrop: "static",
    //   container: "nb-layout",
    // });
    // activeModal.result.then(
    //   (data) => {
    //     this.getPartnerTypelist();
    //   },
    //   (reason) => {
    //     this.getPartnerTypelist();
    //   }
    // );
    // activeModal.componentInstance.modalHeader = "Add Import Setting";
  }
  editDialogshop(event): void {
    console.log("event", event);
    this.shopAdd = event.data;
    this.shopaction = "add";
    console.log("shopadd", this.shopAdd);
  }
  ngOnInit() {
    // this.getProcesstypeDDL( );
    // if(this.dialogp.part_id)
    // {
    //   this.getShopList();
    //   this.getServiceList();
    //   this.getRateMasterlist();
    // }
  }
  private getRateMasterlist() {
    // this.spinner.show();
    let body = {
      spname: "cftratemst_read",
      ptype: "readall",
      pid: 0,
    };

    this.ServiceObj.apicall(body).subscribe(
      (res) => {
        // debugger;
        let data: any = res;

        //console.log(data.results);
        if (data != null) 
        {
          this.dialogr = data as any[];
          this.sourceRate.load(this.dialogr);
        }
        // this.spinner.hide();
      },

      (err) => {
        this.message = err.error.msg;
        // this.spinner.hide();
      }
    );
  }
  private getServiceList() {
    // this.spinner.show();
    let body = {
      spname: "service_read",
      ptype: "readall",
      pid: 0,
    };

    this.ServiceObj.apicall(body).subscribe(
      (res) => {
        // debugger;
        let data: any = res;

        console.log(data.results);
        if (data.results.Table.length > 0) {
          this.dialogv = JSON.parse(data.results.Table[0].document);
          this.sourceService.load(this.dialogv);
        }
        // this.spinner.hide();
      },

      (err) => {
        this.message = err.error.msg;
        // this.spinner.hide();
      }
    );
  }
  private getShopList() {
    // this.spinner.show();
    let body = {
      spname: "shop_read",
      ptype: "readall",
      pid: this.dialogp.id,
    };

    this.ServiceObj.apicall(body).subscribe(
      (res) => {
        // debugger;
        let data: any = res;

        console.log(data.results);
        if (data.results.Table.length > 0) {
          this.dialogs = JSON.parse(data.results.Table[0].document);
          this.ddlShop = JSON.parse(data.results.Table[0].document);
          console.log(this.ddlShop);
          this.source.load(this.dialogs);
        }
        // this.spinner.hide();
      },

      (err) => {
        this.message = err.error.msg;
        // this.spinner.hide();
      }
    );
  }
  private getShop() {
    // this.spinner.show();
    let body = {
      spname: "shop_read",
      ptype: "read",
      pid: this.dialogp.id,
    };

    this.ServiceObj.apicall(body).subscribe(
      (res) => {
        // debugger;
        let data: any = res;

        console.log(data.results);
        if (data.results.Table.length > 0) {
          this.dialogs = JSON.parse(data.results.Table[0].document);
          this.ddlShop = JSON.parse(data.results.Table[0].document);
          console.log(this.ddlShop);
          this.source.load(this.dialogs);
        }
        // this.spinner.hide();
      },

      (err) => {
        this.message = err.error.msg;
        // this.spinner.hide();
      }
    );
  }
  private getPartnertypeDDL() {
    let body = {
      spname: "getdropdown",
      pdrptype: "DDL_PARTNERTYPE",
    };
    this.ServiceObj.apicall(body).subscribe(
      (res) => {
        let data: any = res;
        if (data.results.Table.length > 0) {
          this.ddlPartnertype = data.results.Table as DDLItem[];
        }
      },
      (err) => {
        this.message = err.error.msg;
      }
    );
  }
  private getCityDDL() {
    let body = {
      spname: "getdropdown",
      pdrptype: "DDL_CITY",
    };

    this.ServiceObj.apicall(body).subscribe(
      //this.ServiceObj.apicall(body,'getDDL_SP').subscribe(
      (res) => {
        let data: any = res;
        if (data.results.Table.length > 0) {
          this.ddlCity = data.results.Table as DDLItem[];
        }
        //   this.ddlImportsource= data.recordset as DDLItem[];
        // }
      },
      (err) => {
        this.message = err.error.msg;
        //this.showToast(this.type, this.title, this.message);
      }
    );
  }

  onChangeImportsource(processtype) {
    // ... do other stuff here ...
  }

  closeModal() {
    // localStorage.setItem("Reload", "true");
    this.activeModal.close();
  }
  objerror = {
    part_name: "",
    part_address: "",
  };
  // validate() {
  //   var result = true;
  //   if (this.dialog.mdesc == '' || this.dialog.mdesc == null || this.dialog.mdesc == undefined) {
  //     this.objerror.mdesc = "Description is required";
  //     //this.showToast("error", "Error", this.objerror.mdesc);
  //     result = false;
  //   }
  //   else
  //     this.objerror.mdesc = "";

  //   if (this.dialog.muser == '' || this.dialog.muser == null || this.dialog.muser == undefined) {
  //     this.objerror.muser = "User is required";
  //    // this.showToast("error", "Error", this.objerror.muser);
  //     result = false;
  //   }
  //   else
  //     this.objerror.muser = '';

  //   if (this.dialog.mpass == '' || this.dialog.mpass == null || this.dialog.mpass == undefined)
  //   {
  //     this.objerror.mpass = "Pass is required";
  //     result = false;
  //   }
  //   else
  //     this.objerror.mpass = "";

  //   return result;
  // }
  public onFileSelected1(event: EventEmitter<File[]>) {
    this.isUploaded1 = false;
  }
  SaveData() {
    //if (this.validate())
    {
      let id: string = "0";
      // this.dialog.chubspname = 'tmarketcreds_SP';
      // if (this.dialog.settingid != null && this.dialog.settingid != undefined && this.dialog.settingid > 0)
      //   this.dialog.TYPE = 'UPDATE';
      //   else
      //   this.dialog.TYPE = 'CREATE';
      var data = {
        // entityid: this.EntityID,
        spname: "partner_save",
        ptype: "save",
        pid: this.dialogp.id == null ? 0 : this.dialogp.id,
        ppart_name: this.dialogp.part_name,
        ppart_gender:
          this.dialogp.part_gender == null ? "" : this.dialogp.part_gender,
        ppart_email: this.dialogp.part_email,
        ppart_mobile: this.dialogp.part_mobile,
        ppart_address: this.dialogp.part_address,
        ppart_city: this.dialogp.part_city,
        pparttype_id: parseInt(this.dialogp.parttype_id),
        pactive: this.dialogp.active,
      };
      let body = data;
      this.ServiceObj.apicall(body).subscribe(
        (res) => {
          //debugger;
          let data: any = res;
          console.log(data);
          id = String(data.results.Table[0].partner_save);
          this.dialogp.id = id;
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
          // this.dialogp = {} as any;
          this.uploadSubmit(id);
          // this.router.navigateByUrl("/pages/eProviders/list");
        },
        (err) => {
          this.message = err.error.msg;
          //this.showToast('error', 'error', this.message);
        }
      );
    }
  }
  uploadSubmit(nicourseid: string) {
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
    this.processupload(nicourseid);
  }
  processupload(nicourseid: string) {
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
    let foldername = "provider";

    for (let j = 0; j < this.uploader1.queue.length; j++) {
      let fileItem = this.uploader1.queue[j]._file as any;
      data.append("file", fileItem);
    }

    data.append("foldername", foldername);
    data.append("spname", "partner_updateimage");
    data.append("pid", nicourseid);
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

    // this._matSnackBar.open('Processing Started Successfully!!!', 'OK', {
    //   verticalPosition: 'top',
    //   duration: 2000,
    // });
  }
  filterChanged(selectedValue: number) {
    this.isfreelancer = false;
    if (selectedValue == 2) {
      this.isfreelancer = true;
    } else {
      this.isfreelancer = false;
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

  // shop tab Code
  SaveShopData() {
    var data = {
      spname: "shop_save",
      ptype: "save",
      pid: this.shopAdd.id == null ? 0 : this.shopAdd.id,
      ppart_id: this.dialogp.id == null ? 0 : this.dialogp.id,
      pshop_name: this.shopAdd.shop_name,
      pshop_desc: this.shopAdd.shop_desc,
      pshop_rating: this.shopAdd.shop_rating,
      pshop_email: this.shopAdd.shop_email,
      pshop_mobile: this.shopAdd.shop_mobile,
      pshop_street: this.shopAdd.shop_street,
      pshop_lat: this.shopAdd.shop_lat,
      pshop_long: this.shopAdd.shop_long,
      pcity_id: this.shopAdd.city_id,
      pactive: this.shopAdd.active ? this.shopAdd.active : true,
    };
    let body = data;
    this.ServiceObj.apicall(body).subscribe(
      (res) => {
        //debugger;
        let data: any = res;
        console.log(data);

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
        this.shopAdd = {} as any;
        this.shopaction = "list";
        this.getShopList();
        // this.uploadSubmit(id);
        // localStorage.setItem('Reload','true')
        // this.activeModal.close();
        // this.router.navigateByUrl("/pages/eProviders/list");
      },
      (err) => {
        this.message = err.error.msg;
        //this.showToast('error', 'error', this.message);
      }
    );
  }
  BackShopData() {
    if (this.shopaction == "list") {
      this.shopaction = "add";
    } else {
      this.shopaction = "list";
      this.getShopList();
    }
  }

  // service tab code
  openCreateDialogService(event): void {
    this.dialogService = {} as any;
    this.servaction = "add";
    console.log(this.servaction);
    // localStorage.setItem("Message", JSON.stringify(this.dialog1));
    // const activeModal = this.modalService.open(ProviderTypesAddEditComponent, {
    //   size: "lg",
    //   backdrop: "static",
    //   container: "nb-layout",
    // });
    // activeModal.result.then(
    //   (data) => {
    //     this.getPartnerTypelist();
    //   },
    //   (reason) => {
    //     this.getPartnerTypelist();
    //   }
    // );
    // activeModal.componentInstance.modalHeader = "Add Import Setting";
  }
  BackServiceData() {
    if (this.servaction == "list") {
      this.servaction = "add";
    } else {
      this.servaction = "list";
      this.getServiceList();
    }
  }
  editServiceDialog(event): void {
    console.log("event", event);
    this.dialogService = event.data;
    this.servaction = "add";
    console.log(this.servaction);
  }
  SaveServiceData() {
    let id: string = "0";
    var data = {
      // entityid: this.EntityID,
      spname: "service_save",
      ptype: "save",
      pid: this.dialogService.id == null ? 0 : this.dialogService.id,
      ppart_id:
        this.dialogp.id,
      pcat_id:
        this.dialogService.cat_id == null ? "" : this.dialogService.cat_id,
      pshop_id: this.dialogService.shop_id,
      // pserv_name: this.dialogService.serv_name,
      pserv_desc: this.dialogService.serv_desc,
      pserv_rating: this.dialogService.serv_rating,
      // pserv_email: this.dialogService.serv_email,
      // pserv_mobile: this.dialogService.serv_mobile,
      pserv_cost: this.dialogService.serv_cost,
      pserv_commission_percent: this.dialogService.serv_commission_percent,
      pserv_commission_fixed: this.dialogService.serv_commission_fixed,
      // pserv_street: this.dialogService.serv_street,
      // pcity_id: this.dialogService.city_id,
      pactive: this.dialogService.active,
    };
    let body = data;
    this.ServiceObj.apicall(body).subscribe(
      (res) => {
        //debugger;
        let data: any = res;
        console.log(data);
        id = String(data.results.Table[0].service_save);

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
        this.dialogService = {} as any;
        this.uploadSubmit(id);
        // localStorage.setItem('Reload','true')
        // this.activeModal.close();
      },
      (err) => {
        this.message = err.error.msg;
        //this.showToast('error', 'error', this.message);
      }
    );
    this.servaction = "list";
    this.getServiceList();
  }
  private getCategoryeDDL() {
    let body = {
      spname: "category_read",
      ptype: "readall",
      pid: 0,
    };
    this.ServiceObj.apicall(body).subscribe(
      (res) => {
        let data: any = res;
        if (data.results.Table.length > 0) {
          // this.ddlPartnertype = data.results.Table as DDLItem[];
          this.ddlcategory = data.results.Table;
        }
      },
      (err) => {
        this.message = err.error.msg;
      }
    );
  }

  // rate tab Data
  openCreateRateDialog(event) {
    this.rateaction = "add";
  }
  editRateDialog(event) {
    this.rateaction = "add";
  }
  SaveRateData() {
    this.rateaction = "list";
  }
  BackRateData() {
    this.rateaction = "list";
  }
}
