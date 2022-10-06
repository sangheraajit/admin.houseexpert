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
 
import { OrderAddEditComponent } from "../order-add-edit/order-add-edit.component";
// import { ProviderAddEditComponent } from "../provider-add-edit/provider-add-edit.component";
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'ngx-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  subscribe$;
  private EntityID: string;
  private ProcessType: string;
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
      delete: false,
      add: false,
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
       
      orderno: {
        title: "Order#",
        type: "string",
        filter: true,
        width: "15%",
      },
      orderdate: {
        title: "Order Date",
        type: "string",
        filter: true,
        width: "15%",
      },
      grandtotal: {
        title: "Grand Total",
        type: "string",
        filter: true,
        width: "15%",
      },
      fromcity: {
        title: "Order City",
        type: "string",
        filter: true,
        width: "20%",
      },
      orderstatus: {
        title: "Order Status",
        type: "string",
        filter: true,
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
  sourcedata: LocalDataSource = new LocalDataSource();

  constructor(
    private _sanitizer: DomSanitizer,
    private ServiceObj: ApiService,
    private modalService: NgbModal,
    private service: SmartTableService,
    private spinner: NgxSpinnerService
  ) {
    // this.data.currentEntity.subscribe(msg => this.EntityID = msg)
    this.EntityID = localStorage.getItem("Entity");
  }
  ngOnInit() {
    // this.data.changeForm('importsettinglist');
    localStorage.setItem("Form", "marketcreds");
    // this.data.currentEntity.subscribe(msg => this.EntityID = msg)
    this.EntityID = localStorage.getItem("Entity");

    this.getlist();
    localStorage.setItem("Reload", "false");
  }
  private getlist() {
    this.spinner.show();
    let body = {
      spname: "order_read",
      ptype: "readall",
      pid: 0,
    };

    this.ServiceObj.apicall(body).subscribe(
      (res) => {
        // debugger;
        let data: any = res;

        console.log(data.results);
        if (data.results.table.length > 0) {
          this.dialog = data.results.table as any[];
          this.sourcedata.load(this.dialog);
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
    this.dialog1 = this.dialog.find((h) => h.id == i );
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

  deleteDialog(event): void {
    let i = event.data.mid;
    this.dialog1 = this.dialog.find((h) => h.mid == i);
    this.dialog1.TYPE = "DELETE";
    // this.data.changeMessage(JSON.stringify(this.dialog1))
    localStorage.setItem("Message", JSON.stringify(this.dialog1));
  }
  ngOnDestroy() {
    if (this.subscribe$) {
      this.subscribe$.unsubscribe();
    }
  }
}
