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
// import { debug } from 'util';
import { DomSanitizer } from "@angular/platform-browser";
import { interval } from "rxjs/observable/interval";
import { ApiService } from "../../../services/api.service";
import { SmartTableService } from "../../../@core/mock/smart-table.service";
import { DatePipe } from "@angular/common";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { DDLItem } from "../../../@core/models/model";

import { OrderAddEditComponent } from "../order-add-edit/order-add-edit.component";
// import { ProviderAddEditComponent } from "../provider-add-edit/provider-add-edit.component";
import { environment } from "../../../../environments/environment";
import { OrderViewComponent } from "../order-view/order-view.component";
import { takeWhile } from "rxjs/operators/takeWhile";
import { NbThemeService, NbColorHelper } from "@nebular/theme";
interface CardSettings {
  title: string;
  iconClass: string;
  total: string;
  type: string;
}

@Component({
  selector: "ngx-order-list",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.scss"],
})
export class OrderListComponent implements OnInit {
  subscribe$;
  globalsearch = "";
  part_id = "0";
  ddlpart = [];
  private alive = true;
  quotationcntr: CardSettings = {
    title: "Total Pending",
    iconClass: "success",
    total: localStorage.getItem("quotationcntr"),
    type: "danger",
  };
  tokencntr: CardSettings = {
    title: "Total Confirmed",
    iconClass: "success",
    total: localStorage.getItem("tokencntr"),
    type: "danger",
  };
  preapprovedcntr: CardSettings = {
    title: "Total Ongoing",
    iconClass: "success",
    total: localStorage.getItem("preapprovedcntr"),
    type: "danger",
  };
  approvedcntr: CardSettings = {
    title: "Total Completed",
    iconClass: "success",
    total: localStorage.getItem("approvedcntr"),
    type: "danger",
  };
  statusCards: string;
  commonStatusCardsSet: CardSettings[] = [
    this.quotationcntr,
    this.tokencntr,
    this.preapprovedcntr,
    this.approvedcntr,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.quotationcntr,
        type: "primary",
      },
      {
        ...this.tokencntr,
        type: "primary",
      },
      {
        ...this.preapprovedcntr,
        type: "primary",
      },
      {
        ...this.approvedcntr,
        type: "primary",
      },
    ],
  };

  private message = null;
  dialog: any[];
  dialog1: any;
  config: ToasterConfig;

  settings = {
    mode: "external",
    pager: {
      display: true,
      perPage: 10,
    },
    actions: {
      delete: true,
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
      deleteButtonContent: '<i class="nb-paper-plane"></i>',
    },

    columns: {
      orderno: {
        title: "Order#",
        type: "string",
        filter: false,
        width: "15%",
      },
      orderdate: {
        title: "Order Date",
        type: "string",
        filter: false,
        width: "10%",
        valuePrepareFunction: (date) => {
          var raw = new Date(date);
          var formatted = new DatePipe("en-EN").transform(raw, "dd-MMM-yyyy");
          return formatted;
        },
      },
      fromcity: {
        title: "From City",
        type: "string",
        filter: false,
        width: "30%",
      },
      tocity: {
        title: "To City",
        type: "string",
        filter: false,
        width: "30%",
      },
      orderstatus: {
        title: "Order Status",
        type: "string",
        filter: false,
        width: "20%",
      },
      // cust_email: {
      //   title: "Email",
      //   type: "string",
      //   filter: false,
      //   width: "10%",
      // },
      // cust_mobile: {
      //   title: "Mobile#",
      //   type: "string",
      //   filter: false,
      //   width: "10%",
      // },
    },
  };
  sourcedata: LocalDataSource = new LocalDataSource();
  filterorders(statusCard: CardSettings) {
    this.commonStatusCardsSet.forEach((element) => {
      element.iconClass = "success";
      element.type = "danger";
    });
    statusCard.iconClass = "warning";
    statusCard.type = "info";

    this.getlist(statusCard.title);
  }
  dropdownList = [];
  dropdownSettings: IDropdownSettings = {};
  selectedItems = [];

  ngOnInit() {
    this.getlist();
    this.getProvList();
    this.dropdownList = [
      { item_id: 1, item_text: "Today's Orders" },
      { item_id: 2, item_text: "Tomorrow's Orders" },
      { item_id: 3, item_text: "Ongoing Orders" },
      { item_id: 4, item_text: "Completed Orders" },
      { item_id: 5, item_text: "Today Created Orders" },
    ];
    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  constructor(
    private themeService: NbThemeService,
    private _sanitizer: DomSanitizer,
    private ServiceObj: ApiService,
    private modalService: NgbModal,
    private service: SmartTableService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  ) {
    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe((theme) => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });
  }

  filterorders2() {
    this.getlist();
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
  private getlist(title = "") {
    let pwhere = "";
    let i = 0;
    let newDate = new Date();

    if (title == "Total Pending") {
      pwhere = " and orderstatus  = 'Quotation' ";
    } else if (title == "Total Confirmed") {
      pwhere = " and orderstatus  = 'Token'  or orderstatus='new'";
    } else if (title == "Total Ongoing") {
      //this.dialog = this.dialog.filter(x=> x.orderstatus.toLowerCase() == "preapproved")
      pwhere = " and orderstatus  = 'Preapproved' ";
    } else if (title == "Total Completed") {
      //this.dialog = this.dialog.filter(x=> x.orderstatus.toLowerCase() == "approved")
      pwhere = " and orderstatus  = 'Approved' ";
    }
    if (this.selectedItems.length > 0) {
      pwhere = pwhere + " and ( ";
      this.selectedItems.forEach((x) => {
        if (i > 0) pwhere = pwhere + " or ";
        if (x.item_id == 1) {
          pwhere =
            pwhere +
            "   orderdate::date = '" +
            (newDate.getFullYear() +
              "-" +
              (newDate.getMonth() + 1) +
              "-" +
              newDate.getDate()) +
            "'::date  ";
          i++;
        } else if (x.item_id == 2) {
          //date.setDate(date.getDate() + 1);
          pwhere =
            pwhere +
            "   orderdate::date = '" +
            (newDate.getFullYear() +
              "-" +
              (newDate.getMonth() + 1) +
              "-" +
              (newDate.getDate() + 1)) +
            "'::date  ";
          i++;
        } else if (x.item_id == 3) {
          pwhere = pwhere + " orderstatus  != 'Completed' ";
          i++;
        } else if (x.item_id == 4) {
          pwhere = pwhere + " orderstatus = 'Completed' ";
          i++;
        } else if (x.item_id == 5) {
          //date.setDate(date.getDate() + 1);
          pwhere =
            pwhere +
            "   cdate::date = '" +
            (newDate.getFullYear() +
              "-" +
              (newDate.getMonth() + 1) +
              "-" +
              (newDate.getDate() + 1)) +
            "'::date  ";
          i++;
        }
      });

      pwhere = pwhere + " ) ";
    }
    if (this.globalsearch.length > 0) {
      pwhere =
        pwhere +
        " and (  cust_name like '%" +
        this.globalsearch +
        "%' OR  cust_mobile like '%" +
        this.globalsearch +
        "%' OR  orderno like '%" +
        this.globalsearch +
        "%' )";
    }
    if (this.part_id.length > 0 && this.part_id != "0") {
      pwhere = pwhere + " and (  part_id = " + this.part_id + " )";
    }
    this.spinner.show();
    let body = {
      spname: "order_read2",
      ptype: "readall",
      pid: 0,
      pwhere: pwhere,
    };

    this.ServiceObj.apicall(body).subscribe(
      (res) => {
        let data: any = res;

       // console.log("order_read2",data.results);
        if (JSON.parse(data.results).Table.length > 0) {
          this.dialog = JSON.parse(data.results).Table as any[];
          // console.log("order_read2  this.dialog", this.dialog);
        } else {
          this.dialog = [];
        }

        this.sourcedata.load(this.dialog);

        this.spinner.hide();
      },
      (err) => {
        this.message = err.error.msg;
        this.spinner.hide();
      }
    );
  }

  showStaticModal() {}
  openCreateDialog(event): void {
    debugger;
    this.dialog1 = {} as any;
    localStorage.setItem("Message", JSON.stringify(this.dialog1));
    const activeModal = this.modalService.open(OrderAddEditComponent, {
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
    let i = event.data.id;
    this.dialog1 = this.dialog.find((h) => h.id == i);
    this.dialog1.TYPE = "U";

    localStorage.setItem("Message", JSON.stringify(this.dialog1));
    const activeModal = this.modalService.open(OrderAddEditComponent, {
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

  viewDialog(event): void {
    let i = event.data.id;
    this.dialog1 = this.dialog.find((h) => h.id == i);
    this.dialog1.TYPE = "V";

    localStorage.setItem("Message", JSON.stringify(this.dialog1));
    const activeModal = this.modalService.open(OrderViewComponent, {
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
  
  
  ngOnDestroy() {
    this.alive = false;
    if (this.subscribe$) {
      this.subscribe$.unsubscribe();
    }
  }
}

/*if(title == "Total Quotations")
    {
      this.dialog = this.dialog.filter(x=> x.orderstatus.toLowerCase() == "quotation")
    }
    else if(title == "Total Tokens")
    {
      this.dialog = this.dialog.filter(x=> x.orderstatus.toLowerCase() == "token")
    }
    else if(title == "Total Pre-Approved")
    {
      this.dialog = this.dialog.filter(x=> x.orderstatus.toLowerCase() == "preapproved")
    }
    else if(title == "Total Approved")
    {
      this.dialog = this.dialog.filter(x=> x.orderstatus.toLowerCase() == "approved")
    }*/
