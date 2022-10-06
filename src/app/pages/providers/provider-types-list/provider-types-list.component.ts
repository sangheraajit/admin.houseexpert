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
import { ProviderTypesAddEditComponent } from "../provider-types-add-edit/provider-types-add-edit.component";

@Component({
  selector: "ngx-provider-types-list",
  templateUrl: "./provider-types-list.component.html",
  styleUrls: ["./provider-types-list.component.scss"],
})
export class ProviderTypesListComponent implements OnInit {
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
      parttype_name: {
        title: "Name",
        type: "string",

        filter: false,
        width: "8%",
      },
      parttype_comm_fixed: {
        title: "Fixed",
        type: "string",
      },
      parttype_comm_percent: {
        title: "Percent",
        type: "string",
        width: "6%",
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();

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

    this.getPartnerTypelist();
    localStorage.setItem("Reload", "false");
  }
  private getPartnerTypelist() {
    this.spinner.show();
    let body = {
      spname: "partnertype_read",
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
    // const activeModal = this.modalService.open(TmarketcredsComponent, {
    //   size: 'lg',
    //   backdrop: 'static',
    //   container: 'nb-layout',
    // });
  }
  openCreateDialog(event): void {
    
    this.dialog1 = {} as any;
    localStorage.setItem("Message", JSON.stringify(this.dialog1));
    const activeModal = this.modalService.open(ProviderTypesAddEditComponent, {
      size: "lg",
      backdrop: "static",
      container: "nb-layout",
    });
    activeModal.result.then(
      (data) => {
        this.getPartnerTypelist();
      },
      (reason) => {
        this.getPartnerTypelist();
      }
    );
    activeModal.componentInstance.modalHeader = "Add Import Setting";
  }
  editDialog(event): void {
    //debugger;
    let i = event.data.id;
    this.dialog1 = this.dialog.find((h) => h.id == i);
    this.dialog1.TYPE = "U";
    // this.data.changeMessage(JSON.stringify(this.dialog1))
    localStorage.setItem("Message", JSON.stringify(this.dialog1));
    const activeModal = this.modalService.open(ProviderTypesAddEditComponent, {
      size: "lg",
      backdrop: "static",
      container: "nb-layout",
    });
    activeModal.result.then(
      (data) => {
        this.getPartnerTypelist();
      },
      (reason) => {
        this.getPartnerTypelist();
      }
    );
  }

  deleteDialog(event): void {
    let i = event.data.mid;
    this.dialog1 = this.dialog.find((h) => h.mid == i);
    this.dialog1.TYPE = "DELETE";
    // this.data.changeMessage(JSON.stringify(this.dialog1))
    localStorage.setItem("Message", JSON.stringify(this.dialog1));
    // const activeModal = this.modalService.open(TmarketcredsComponent, {
    //   size: 'lg',
    //   backdrop: 'static',
    //   container: 'nb-layout',
    // });
    // activeModal.result.then((data) => {
    //   this.getPartnerTypelist();
    // }, (reason) => {
    //   this.getPartnerTypelist();
    // });
    // activeModal.componentInstance.modalHeader = 'Delete Import Setting';
  }
  ngOnDestroy() {
    if (this.subscribe$) {
      this.subscribe$.unsubscribe();
    }
  }
}
