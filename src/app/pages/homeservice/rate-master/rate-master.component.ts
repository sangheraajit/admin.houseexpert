import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { LocalDataSource } from "ng2-smart-table";
// import { SmartTableService } from '../../../@core/data/smart-table.service';
// import { ApiService } from '../../../@core/data/api.service';
// import {anycredsComponent} from '../anycreds/anycreds.component';
// import { ImportmappingComponent } from '../importmapping/importmapping.component';
 
// import { DataService } from "../../../@core/data/data.service";
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
// import { ProviderTypesAddEditComponent } from "../provider-types-add-edit/provider-types-add-edit.component";

@Component({
  selector: "ngx-rate-master",
  templateUrl: "./rate-master.component.html",
  styleUrls: ["./rate-master.component.scss"],
})
export class RateMasterComponent implements OnInit {
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
  source: LocalDataSource = new LocalDataSource();
  private msg: string = "";
  public detaildialog: any;
  constructor(
    private _sanitizer: DomSanitizer,
    private ServiceObj: ApiService,
    private modalService: NgbModal,
    private service: SmartTableService,
    private spinner: NgxSpinnerService,
    private activeModal: NgbActiveModal
  ) {
    // this.data.currentEntity.subscribe(msg => this.EntityID = msg)
    this.EntityID = localStorage.getItem("Entity");
    this.msg = localStorage.getItem("Message");
    console.log(this.msg);
    // this.data.currentMessage.subscribe(msg => this.msg = msg)
    if (this.msg.length > 0) {
      this.detaildialog = JSON.parse(this.msg) as any;
      // this.filterChanged(this.dialog.mid);

      //this.getImportsourceDDL(this.dialog.processtype);
    }
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
      spname: "cftratemst_read",
      ptype: "readall",
      pid: this.detaildialog.id,
    };

    this.ServiceObj.apicall(body).subscribe(
      (res) => {
        // debugger;
        let data: any = res;

        console.log(data.results);
        if (data.results.Table.length > 0) {
          this.dialog = data.results.Table as any[];
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

  closeModal() {
    localStorage.setItem("Reload", "true");
    this.activeModal.close();
  }
  showStaticModal() {
    // const activeModal = this.modalService.open(anycredsComponent, {
    //   size: 'lg',
    //   backdrop: 'static',
    //   container: 'nb-layout',
    // });
  }
  openCreateDialog(event): void {
    debugger;
    this.dialog1 = {} as any;
    localStorage.setItem("Message", JSON.stringify(this.dialog1));
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
  editDialog(event): void {
    //debugger;
    let i = event.data.id;
    this.dialog1 = this.dialog.find((h) => h.id == i);
    this.dialog1.TYPE = "U";
    // this.data.changeMessage(JSON.stringify(this.dialog1))
    localStorage.setItem("Message", JSON.stringify(this.dialog1));
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
  }

  deleteDialog(event): void {
    let i = event.data.mid;
    this.dialog1 = this.dialog.find((h) => h.mid == i);
    this.dialog1.TYPE = "DELETE";
    // this.data.changeMessage(JSON.stringify(this.dialog1))
    localStorage.setItem("Message", JSON.stringify(this.dialog1));
    // const activeModal = this.modalService.open(anycredsComponent, {
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
