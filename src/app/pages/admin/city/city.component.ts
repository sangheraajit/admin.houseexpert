import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LocalDataSource } from "ng2-smart-table";
// import { SmartTableService } from '../../../@core/data/smart-table.service';
// import { ApiService } from '../../../@core/data/api.service';
// import {TmarketcredsComponent} from '../tmarketcreds/tmarketcreds.component';
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
// import { ProviderAddEditComponent } from "../../providers/provider-add-edit/provider-add-edit.component";
// import { CategoriesAddEditComponent } from "../categories-add-edit/categories-add-edit.component";
import { CityAddEditComponent } from "../city-add-edit/city-add-edit.component";
// import { ProviderAddEditComponent } from "../provider-add-edit/provider-add-edit.component";

@Component({
  selector: "ngx-city",
  templateUrl: "./city.component.html",
  styleUrls: ["./city.component.scss"],
})
export class CityComponent implements OnInit {
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
      city_name: {
        title: "City Name",
        type: "string",

        filter: true,
        width: "80%",
      },
      city_state: {
        title: "State",
        type: "string",

        filter: true,
        width: "80%",
      },
      city_country: {
        title: "Country",
        type: "string",

        filter: true,
        width: "80%",
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

    this.getCitylist();
    localStorage.setItem("Reload", "false");
  }
  private getCitylist() {
    this.spinner.show();
    let body = {
      spname: "city_read",
      ptype: "readall",
      pid: 0,
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

  showStaticModal() {
    // const activeModal = this.modalService.open(TmarketcredsComponent, {
    //   size: 'lg',
    //   backdrop: 'static',
    //   container: 'nb-layout',
    // });
  }
  openCreateDialog(event): void {
    debugger;
    this.dialog1 = {} as any;
    localStorage.setItem("Message", JSON.stringify(this.dialog1));
    const activeModal = this.modalService.open(CityAddEditComponent, {
      size: "lg",
      backdrop: "static",
      container: "nb-layout",
    });
    activeModal.result.then(
      (data) => {
        this.getCitylist();
      },
      (reason) => {
        this.getCitylist();
      }
    );
    activeModal.componentInstance.modalHeader = "Add Import Setting";
  }
  editDialog(event): void {
    //debugger;
    let i = event.data.mid;
    let s = event.data.settingid;
    this.dialog1 = this.dialog.find((h) => h.mid == i && h.settingid == s);
    this.dialog1.TYPE = "U";
    // this.data.changeMessage(JSON.stringify(this.dialog1))
    localStorage.setItem("Message", JSON.stringify(this.dialog1));
    const activeModal = this.modalService.open(CityAddEditComponent, {
      size: "lg",
      backdrop: "static",
      container: "nb-layout",
    });
    activeModal.result.then(
      (data) => {
        this.getCitylist();
      },
      (reason) => {
        this.getCitylist();
      }
    );
  }

  deleteDialog(event): void {
    let i = event.data.mid;
    this.dialog1 = this.dialog.find((h) => h.mid == i);
    this.dialog1.TYPE = "DELETE";
    // this.data.changeMessage(JSON.stringify(this.dialog1))
    localStorage.setItem("Message", JSON.stringify(this.dialog1));
    // const activeModal = this.modalService.open(CategoriesAddEditComponent, {
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
