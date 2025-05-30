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
import {   CftratemstAddEditComponent } from "../cftratemst-add-edit/cftratemst-add-edit.component";

@Component({
  selector: 'ngx-cftratemst-list',
  templateUrl: './cftratemst-list.component.html',
  styleUrls: ['./cftratemst-list.component.scss']
})
export class CftratemstListComponent implements OnInit {
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
      packagename: {
        title: "Package Name",
        type: "string",
        filter: true,
        width: "25%",
      },
      fromcft: {
        title: "From cft",
        type: "string",
        filter: true,
        width: "10%",
      },
      tocft: {
        title: "To cft",
        type: "string",
        filter: true,
        width: "10%",
      },
      fromkm: {
        title: "From KM",
        type: "string",
        filter: true,
        width: "10%",
      },
      tokm: {
        title: "To KM",
        type: "string",
        filter: true,
        width: "10%",
      },
      packagefixed: {
        title: "Package Rate",
        type: "string",
        filter: true,
        width: "12%",
      },
      packageperkm: {
        title: "Package per KM",
        type: "string",
        filter: true,
        width: "12%",
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
      spname: "ratemst_read",
      ptype: "readall",
      pid: 0,
    };

    this.ServiceObj.apicall(body).subscribe(
      (res) => {
        // debugger;
        let data: any = res;

        console.log(data.results);
        if (data.results.table.length > 0) {
          this.dialog = JSON.parse(data.results.table[0].document);
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
    this.dialog1 = {} as any;
    localStorage.setItem("Message", JSON.stringify(this.dialog1));
    const activeModal = this.modalService.open(CftratemstAddEditComponent, {
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
    const activeModal = this.modalService.open(CftratemstAddEditComponent, {
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
