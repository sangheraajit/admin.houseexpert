import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LocalDataSource } from "ng2-smart-table";
// import { SmartTableService } from '../../../@core/data/smart-table.service';
// import { ApiService } from '../../../@core/data/api.service';
import { ProviderAddEditComponent } from "../../providers/provider-add-edit/provider-add-edit.component";
import {  ProviderRequestAddEditComponent } from "../../providers/provider-request-add-edit/provider-request-add-edit.component";
// import { ImportmappingComponent } from '../importmapping/importmapping.component';
//import { Tmarket } from "../../../@core/models/model";
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
// import { interval } from "rxjs/observable/interval";
import { ApiService } from "../../../services/api.service";
import { SmartTableService } from "../../../@core/mock/smart-table.service";
import { Router } from "@angular/router";

@Component({
  selector: 'ngx-provider-request-list',
  templateUrl: './provider-request-list.component.html',
  styleUrls: ['./provider-request-list.component.scss']
})
export class ProviderRequestListComponent implements OnInit, OnDestroy {
  subscribe$;
  private EntityID: string;
  private ProcessType: string;
  private message = null;
  dialog: any[];
  dialog1: any;
  config: ToasterConfig;

  ngOnDestroy() {
    if (this.subscribe$) {
      this.subscribe$.unsubscribe();
    }
  }
  ngOnInit() {
    // this.data.changeForm('importsettinglist');
    // localStorage.setItem("Form", "marketcreds");
    // this.data.currentEntity.subscribe(msg => this.EntityID = msg)
    // this.EntityID = localStorage.getItem("Entity");

    this.getProviderList();
    // localStorage.setItem("Reload", "false");
  }
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
      editButtonContent: 'Approve/Reject',
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
      part_name: {
        title: "Name",
        type: "string",

        filter: true,
        width: "60%",
      },
      part_email: {
        title: "Email",
        type: "string",
        filter: true,
        width: "10%",
      },
      part_mobile: {
        title: "Mobile",
        type: "string",
        filter: true,
        width: "10%",
      },
      accepted: {
        title: "Accepted",
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
    private router: Router
  ) {
    // this.data.currentEntity.subscribe(msg => this.EntityID = msg)
    this.EntityID = localStorage.getItem("Entity");
  }
  private getProviderList() {
    this.spinner.show();
    let body = {
      spname: "partner_request_read",
      ptype: "readall",
      pid: 0,
    };

    this.ServiceObj.apicall(body).subscribe(
      (res) => {
        // debugger;
        let data: any = res;

        console.log(data.results);
        if (JSON.parse(data.results).Table.length > 0) {
          this.dialog = JSON.parse(JSON.parse(data.results).Table[0].document);
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
    //debugger;
    this.dialog1 = {} as any;
    localStorage.setItem("Message", JSON.stringify(this.dialog1));
    
    const activeModal = this.modalService.open(ProviderRequestAddEditComponent, {
      size: "lg",
      backdrop: "static",
      container: "nb-layout",
    });
    activeModal.result.then(
      (data) => {
        this.getProviderList();
      },
      (reason) => {
        this.getProviderList();
      }
    );
  }
  editDialog(event): void {
    //debugger;
    let i = event.data.id;
    this.dialog1 = this.dialog.find((h) => h.id == i);
    //this.dialog1.TYPE = "U";
    // this.data.changeMessage(JSON.stringify(this.dialog1))
    localStorage.setItem("Message", JSON.stringify(this.dialog1));
    const activeModal = this.modalService.open(ProviderRequestAddEditComponent, {
      size: "lg",
      backdrop: "static",
      container: "nb-layout",
    });
    activeModal.result.then(
      (data) => {
        this.getProviderList();
      },
      (reason) => {
        this.getProviderList();
      }
    );
  }

  deleteDialog(event): void {
    let i = event.data.id;
    this.dialog1 = this.dialog.find((h) => h.id == i);
    this.dialog1.TYPE = "DELETE";
    // this.data.changeMessage(JSON.stringify(this.dialog1))
    localStorage.setItem("Message", JSON.stringify(this.dialog1));
    // const activeModal = this.modalService.open(TmarketcredsComponent, {
    //   size: 'lg',
    //   backdrop: 'static',
    //   container: 'nb-layout',
    // });
    // activeModal.result.then((data) => {
    //   this.getProviderList();
    // }, (reason) => {
    //   this.getProviderList();
    // });
    // activeModal.componentInstance.modalHeader = 'Delete Import Setting';
  }
}
