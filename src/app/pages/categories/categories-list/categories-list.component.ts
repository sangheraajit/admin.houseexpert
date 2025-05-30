import { Component, OnInit, OnDestroy, Input } from "@angular/core";
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
import { ProviderAddEditComponent } from "../../providers/provider-add-edit/provider-add-edit.component";
import { CategoriesAddEditComponent } from "../categories-add-edit/categories-add-edit.component";
// import { ProviderAddEditComponent } from "../provider-add-edit/provider-add-edit.component";
import { environment } from '../../../../environments/environment';
import { NbGetters, NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface Category {
  id: number;
  cat_name: string;
  cat_type: number;
  children?: Category[];
  expanded?: boolean;
  imageurl: string;
  Createdby: string | null;
  ispublish: boolean;
  parent_id: number;
  Createddate: string | null;
  mobile_banner: string | null;
  website_banner: string | null;
  
}
interface FSEntry {
  name: string;
  cat_name?: string;
  size: string;
  kind: string;
  items?: number;
  childEntries?: FSEntry[];
  children?: FSEntry[];
  expanded?: boolean;
}
@Component({
  selector: "ngx-categories-list",
  templateUrl: "./categories-list.component.html",
  styleUrls: ["./categories-list.component.scss"],
})
export class CategoriesListComponent implements OnInit {
  subscribe$;
  private EntityID: string;
  private ProcessType: string;
  private message = null;
  dialog: any[];
  dialog1: any;
  config: ToasterConfig;

  /* settings = {
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
      imageurl: {
        title: "Image",
        type: "html",
        width: "6%",
        filter: false,
        valuePrepareFunction: (imageurl: string) => {
          return `<img src="${environment.AdminServer}/assets/UploadFile/category/${imageurl}" height="50px" width="50px" class="imgs" id="imgs" style="border-radius:50%"/>`;
          // return `<img src="${pimages}" height="50px" width="50px" class="imgs" id="imgs" style="border-radius:50%"/>`;
        },
      },
      cat_name: {
        title: "Name",
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
      ispublish: {
        title: "Published",
        type: "html",
        width: "5%",
        valuePrepareFunction: (ispublish: boolean) => {
          if (ispublish == true)
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
  }; */
  settings = {
    actions: {
      add: false,
      edit: true,
      delete: false,
    },
    columns: {
      name: {
        title: 'Category Name',
        type: 'string',
      },
    },
  };
  
  


  //source: LocalDataSource = new LocalDataSource();
  
  /* customColumn = 'imageurl';
  defaultColumns = [ 'cat_name','ispublish'];
  allColumns = [ this.customColumn, ...this.defaultColumns ]; */

  nameColumn = 'imageurl';
  ispublishColumn = 'ispublish';
  activeColumn = 'active';
defaultColumns = [ 'cat_name'];
allColumns = [ this.nameColumn, ...this.defaultColumns,this.activeColumn,this.ispublishColumn, "actions" ];
headers = ["Image",'Name','Active', 'Published',"actions"];
  dataSource: NbTreeGridDataSource<Category>;
  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
    getters: NbGetters<Category, Category> = {
    dataGetter: (node: Category) => node,
    //childrenGetter: (node: Category) => node.children || undefined,
   // expandedGetter: (node: Category) => !!node.expanded,
  }; 
  img_serverPath=environment.AdminServer+"/assets/UploadFile/category/";
  constructor(
    private _sanitizer: DomSanitizer,
    private ServiceObj: ApiService,
    private modalService: NgbModal,
    private service: SmartTableService,
    private spinner: NgxSpinnerService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Category>) 
   {
    // this.data.currentEntity.subscribe(msg => this.EntityID = msg)
    this.EntityID = localStorage.getItem("Entity");
   
    //this.dataSource = dataSourceBuilder.create(this.data);
    
   // this.source = dataSourceBuilder.create(this.data1, getters);
    
  }
  private data1: Category[] = [
    {
       id: 1, cat_name: 'Car Service', cat_type: 2, children: [], expanded: false, imageurl: 'car.png', Createdby: null, ispublish: false, parent_id: 0, Createddate: null, mobile_banner: null, website_banner: null ,
    },
    {
     id: 2, cat_name: 'Yoga Classes', cat_type: 2, children: [], expanded: false, imageurl: '6yogaclass.jpeg', Createdby: null, ispublish: false, parent_id: 0, Createddate: null, mobile_banner: null, website_banner: null ,
    },
    // Add more categories here as needed
  ];
  private data: FSEntry[] = [
    {
      name: 'Projects', size: '1.8 MB', items: 5, kind: 'dir', expanded: true,
      childEntries: [
        { name: 'project-1.doc', kind: 'doc', size: '240 KB' },
        { name: 'project-2.doc', kind: 'doc', size: '290 KB' },
        {
          name: 'project-3', kind: 'dir', size: '466 KB', items: 3,
          childEntries: [
            { name: 'project-3A.doc', kind: 'doc', size: '200 KB' },
            { name: 'project-3B.doc', kind: 'doc', size: '266 KB' },
            { name: 'project-3C.doc', kind: 'doc', size: '0' },
          ],
        },
        { name: 'project-4.docx', kind: 'docx', size: '900 KB' },
      ],
    },
    {
      name: 'Reports', kind: 'dir', size: '400 KB', items: 2,
      childEntries: [
        {
          name: 'Report 1', kind: 'dir', size: '100 KB', items: 1,
          childEntries: [
            { name: 'report-1.doc', kind: 'doc', size: '100 KB' },
          ],
        },
        {
          name: 'Report 2', kind: 'dir', size: '300 KB', items: 2,
          childEntries: [
            { name: 'report-2.doc', kind: 'doc', size: '290 KB' },
            { name: 'report-2-note.txt', kind: 'txt', size: '10 KB' },
          ],
        },
      ],
    },
    {
      name: 'Other', kind: 'dir', size: '109 MB', items: 2,
      childEntries: [
        { name: 'backup.bkp', kind: 'bkp', size: '107 MB' },
        { name: 'secret-note.txt', kind: 'txt', size: '2 MB' },
      ],
    },
  ];

  ngOnInit() {
    // this.data.changeForm('importsettinglist');
    localStorage.setItem("Form", "marketcreds");
    // this.data.currentEntity.subscribe(msg => this.EntityID = msg)
    this.EntityID = localStorage.getItem("Entity");

    this.getCategorylist();
    localStorage.setItem("Reload", "false");
  }
  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }
  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
  private getCategorylist() {
    this.spinner.show();
    let body = {
      spname: "category_readV1",
      ptype: "readall",
      pid: 0,
    };
  
    this.ServiceObj.apicall(body).subscribe(
      (res) => {
        let data: any = res;
       /// console.log(data.results);
        
        if (JSON.parse(data.results).Table.length > 0) {
          // Parse the category data
          const categories =  JSON.parse(JSON.parse(data.results).Table[0].category_readv1);
          console.log("categories",JSON.stringify(categories))
  this.dialog=categories;
 this.dataSource = this.dataSourceBuilder.create(categories,this.getters);
  //this.dataSource = this.dataSourceBuilder.create(categories);
          // Transform the category data to flat structure with parent-child relationships
          /* const flatData = [];
          categories.forEach(item => {
            flatData.push({
              id: item.id,
              parent_id: item.parent_id,
              cat_name: item.cat_name,
              imageurl: item.imageurl,
              active: item.active,
              ispublish: item.ispublish,
              children: item.children || [] // Ensure children property exists
            });
          }); */
  
          // Pass the flat data to the ng2-smart-table source
          console.log("flatData",categories)
         // this.source.load(categories);
  
          // Pass the category data to the TreeViewComponent
          //this.treeViewData = categories;
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
  openCreateDialog(): void {
     
    this.dialog1 = {} as any;
    localStorage.setItem("Message", JSON.stringify(this.dialog1));
    const activeModal = this.modalService.open(CategoriesAddEditComponent, {
      size: "lg",
      backdrop: "static",
      container: "nb-layout",
    });
    activeModal.result.then(
      (data) => {
        this.getCategorylist();
      },
      (reason) => {
        this.getCategorylist();
      }
    );
    activeModal.componentInstance.modalHeader = "Add Import Setting";
  }
  editDialog(event): void {
    console.log("event",event);
    let i = event.data.id;
    this.dialog1 = this.dialog.find((h) => h.id == i );
    this.dialog1.TYPE = "U";
    
    localStorage.setItem("Message", JSON.stringify(this.dialog1));
    const activeModal = this.modalService.open(CategoriesAddEditComponent, {
      size: "lg",
      backdrop: "static",
      container: "nb-layout",
    });
    activeModal.result.then(
      (data) => {
        this.getCategorylist();
      },
      (reason) => {
        this.getCategorylist();
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
  getIndentation(row: any): number {
    return row.level * 20; // Adjust '20' for more or less indentation per level
  }
}

