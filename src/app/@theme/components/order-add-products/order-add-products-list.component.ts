import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
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
//import { ArticlemstAddEditComponent } from "../articlemst-add-edit/articlemst-add-edit.component";
import { environment } from "../../../../environments/environment";
import { SubcategoryService } from "../../../services/subcategory.service";
@Component({
  selector: "order-add-products",
  templateUrl: "./order-add-products-list.component.html",
  styleUrls: ["./order-add-products-list.component.scss"],
})
export class OrderAddProductsComponent implements OnInit {
  subscribe$;
  private EntityID: string;
  private ProcessType: string;
  private message = null;
  dialog: any[];
  dialog1: any[];
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
      imageurl: {
        title: "Image",
        type: "html",
        width: "6%",
        filter: false,
        valuePrepareFunction: (imageurl: string) => {
          return `<img src="${environment.AdminServer}/assets/UploadFile/article/${imageurl}" height="50px" width="50px" class="imgs" id="imgs" style="border-radius:50%"/>`;
          // return `<img src="${pimages}" height="50px" width="50px" class="imgs" id="imgs" style="border-radius:50%"/>`;
        },
      },
      itemname: {
        title: "Item Name",
        type: "string",
        filter: true,
        width: "30%",
      },
      itemgroup: {
        title: "Group Name",
        type: "string",
        filter: true,
        width: "30%",
      },
      itemgroup1: {
        title: "Group Name1",
        type: "string",
        filter: true,
        width: "30%",
      },
      active: {
        title: "Active",
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
  ArticlemstlistAll: any;
  Articlemstlist!: any;
  @Input() public OrderDetails;
  @Input() public OrderID: number=0;
  constructor(
    private _sanitizer: DomSanitizer,
    private ServiceObj: ApiService,
    private modalService: NgbModal,
    private service: SmartTableService,
    private spinner: NgxSpinnerService,
    private toasterService: ToasterService,
    private activeModal: NgbActiveModal,
    private SubcategoryService :SubcategoryService
  ) {}
  ngOnInit() {
    this.getlist();
    console.log("OrderDetails", this.OrderDetails);
  }
  private getlist() {
    this.spinner.show();
    let body = {
      spname: "data_get",
      ptype: "readallactive",
      ptabname: "tarticlemst",
      pid: 0,
    };

    
    this.SubcategoryService.getAllarticle("", "").subscribe((res: any) => {
      console.log("getAllarticle", res);
        // debugger;JSON.parse(data.results
        let data: any = res;

        if (
          data &&
          data.results &&
          JSON.parse(data.results).Table &&
          JSON.parse(data.results).Table.length > 0
        ) {
          this.dialog = JSON.parse(JSON.parse(data.results).Table[0].document);
          if (this.dialog != null) this.source.load(this.dialog);
          this.ArticlemstlistAll = this.dialog.map((article: any) => {
            // Find the matching order detail by ID
            const matchingOrder = this.OrderDetails?.find(
              (order: any) => order.article_id === article.id
            );
            if (matchingOrder) {
              matchingOrder.cft = article.cft; // Update cft field in OrderDetails
            }
            return {
              cat_id: article.cat_id,
              cft: article.cft,
              id: article.id,
              imageurl: article.imageurl,
              itemgroup: article.itemgroup,
              itemgroup1: article.itemgroup1,
              itemname: article.itemname,
              cft_rate:article.cft_rate,
              price:  matchingOrder ? parseInt(matchingOrder.quantity) * article.cft_rate:0,
              qty: matchingOrder ? parseInt(matchingOrder.quantity) : 0, // Set qty from OrderDetails or default to 0
              active: true,
            };
          });

          this.Articlemstlist = this.ArticlemstlistAll;
        }
        this.spinner.hide();
      },

      (err) => {
        this.message = err.error.msg;
        this.spinner.hide();
      }
    );
  }

  showStaticModal() {}

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
  deleteDialog(event): void {
    if (window.confirm("Are sure you want to delete this item ?")) {
      var data = {
        spname: "data_save",
        jdata: [
          {
            active: false,
          },
        ],
        ptabname: "tarticlemst",
        pid: event.data.id,
      };
      let body = data;
      this.ServiceObj.apicall(body).subscribe(
        (res) => {
          //debugger;
          let data: any = res;

          if (data.results == null) {
            this.title = "Error";
            this.type = "error";
            this.content = "Fail to Add/Update !";
            this.showToast(this.type, this.title, this.content);
          } else {
            this.getlist();
            this.title = "Result";
            this.type = "info";
            this.content = "Record deleted successfully..";
            this.showToast(this.type, this.title, this.content);
          }
          this.dialog = {} as any;
        },
        (err) => {
          this.message = err.error.msg;
          this.showToast("error", "error", this.message);
        }
      );
    }
  }
  searchData(searchValue: any) {
    this.Articlemstlist = this.ArticlemstlistAll.filter((item: any) => {
      return item.itemname.toLowerCase().includes(searchValue.toLowerCase());
    });
  }
  ngOnDestroy() {
    if (this.subscribe$) {
      this.subscribe$.unsubscribe();
    }
  }
  changeQty(product: any, change: any, replace: string) {
    if (product.qty + change >= 0) {
      product.qty += parseInt(change);
    }
  
    if (change !== "") {
      change = parseInt(change) || 1;
    }
  
    // Update the corresponding orderdetails object in the parent component
    const matchingOrder = this.OrderDetails?.find((order: any) => order.article_id === product.id);
    if (matchingOrder) {
      matchingOrder.quantity = product.qty;  // Update the quantity in the parent orderdetails object
    } else {
      // If the product is not in the orderdetails array, you can add it
      this.OrderDetails.push({
        active: true,
        quantity: product.qty,
        admin_rate: 0,
        discount: 0,
        id: 0,
        linestatus: 'new',
        orderid:  this.OrderID,
        partner_rate: 0,
        serv_id: 0,
        tax: 0,
        item_name:product.itemname,
        cft:product.cft,
        cft_rate:product.cft_rate,
        line_total: product.qty * product.price,
      });
    }
  }
  
  closeModal() {
    this.activeModal.close();
  }
  saveChanges() {
    const updatedData = { ...this.OrderDetails }; // Prepare the updated product data
    this.activeModal.close(updatedData); // Return updated data to the parent component
  }
}
