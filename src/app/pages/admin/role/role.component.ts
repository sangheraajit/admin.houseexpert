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

import { DomSanitizer } from "@angular/platform-browser";
import { interval } from "rxjs/observable/interval";
import { ApiService } from "../../../services/api.service";
import { SmartTableService } from "../../../@core/mock/smart-table.service";
import {    RoleAddEditComponent } from "../role-add-edit/role-add-edit.component";

@Component({
  selector: 'ngx-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent  implements OnInit {
  subscribe$;
  private EntityID: string;
  private ProcessType: string;
  private message = null;
  dialog: any[];
  dialog1: any[];
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
      role_name: {
        title: "Role Name",
        type: "string",
        filter: true,
        width: "70%",
      },
      active: {
        title: "Active",
        type: "html",
        width: "6%",
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
   
  }
  ngOnInit() {
    this.getlist();
  }
  private getlist() {
    this.spinner.show();
    let body = {
      spname: "data_get",
      ptype: "readall",
      ptabname: "trolemst",
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
    
  }
  openCreateDialog(event): void {
    //debugger;
   // this.dialog1 = {} as any;
    localStorage.setItem("Message", JSON.stringify(this.dialog1));
    const activeModal = this.modalService.open(RoleAddEditComponent, {
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
    //debugger;
    let i = event.data.id; 
    this.dialog1 = this.dialog.find((h) => h.id == i );
    
    // this.data.changeMessage(JSON.stringify(this.dialog1))
    localStorage.setItem("Message", JSON.stringify(this.dialog1));
    const activeModal = this.modalService.open(RoleAddEditComponent, {
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
    let i = event.data.id; 
    this.dialog1 = this.dialog.find((h) => h.id == i );
     
  }
  ngOnDestroy() {
    if (this.subscribe$) {
      this.subscribe$.unsubscribe();
    }
  }
}
