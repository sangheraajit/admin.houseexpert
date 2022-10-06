import { Component, OnInit } from "@angular/core";
// import { ApiService } from '../../@core/data/api.service';
// import { DataService } from "../../@core/data/data.service";
import { Router, Route } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { NbThemeService, NbPopoverDirective } from "@nebular/theme";
import { AnalyticsService } from "../../@core/utils/analytics.service";
import { MENU_ITEMS } from "../../pages/pages-menu";
import { ApiService } from "../../services/api.service";
@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public dialog: any = {};
  public EntityID;
  public user: any;
  public rememberMe;
  public username;
  public password;
  public forgotpassword;
  public btnlabel;
  public firstname;
  constructor(
    private ServiceObj: ApiService,
    // private data: DataService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private themeService: NbThemeService,
    private analyticsService: AnalyticsService
  ) {
    this.dialog.username = "";
    this.dialog.password = "";
    this.dialog.rememberMe = "";
    this.btnlabel = "Sign In";
    this.forgotpassword = false;
    localStorage.setItem("Entity", null);
    localStorage.setItem("User", null);
    localStorage.setItem("Company", null);
    localStorage.setItem("LoginID", null);
  }

  ngOnInit() {
    console.log("login");
    this.dialog.username = "";
    this.dialog.password = "";
    this.dialog.rememberMe = "";
    this.spinner.hide();

    // debugger;
    //this.user = JSON.parse(localStorage.getItem("User"));
    // if (this.user != null)
    //   this.router.navigate(['/pages/dashboard']);
  }
  checkValue(event: any) {
    //console.log(event.returnValue)
    this.forgotpassword = !this.forgotpassword;
    if (this.forgotpassword) {
      this.btnlabel = "Reset Password";
    } else {
      this.btnlabel = "Sign In";
    }
  }

  submitForm() {
    if (this.forgotpassword) {
      this.spinner.show();
      if (
        this.username.toString().includes("@") == false ||
        this.username.toString().includes(".") == false
      ) {
        alert("Incorrect Emailid!!");
        return;
      }
      if (this.username == "") {
        alert("Incorrect Emailid!!");
        return;
      }
      if (this.firstname == "") {
        alert("Incorrect firstname!!");
        return;
      }

      var data2 = {
        toemail: this.username,
        firstname: this.firstname,
        chubspname: "resetpassword",
      };
      let body = JSON.stringify(data2);
      this.ServiceObj.apicall(data2).subscribe((res) => {
        let data1: any = res;

        //console.log(data.results);
        if (data1.results != null) {
          if (data1.results.Table.length > 0) {
            if (data1.results.Table[0].updatestatus == "done") {
              alert("New password generated and Emailed to " + this.username);
            } else {
              alert("Invalid Email ID/ Firstname!!!");
            }
          }
        }
      });
      this.spinner.hide();
      return;
    }
    // debugger;
    this.spinner.show();
    var data = {
      spname: "getPasswordCheck_SP",
      pname: this.username,
      ppass: this.password,
    };
    let body = JSON.stringify(data);
    this.ServiceObj.apicall(data).subscribe(
      (res) => {
        let data: any = res;

        //console.log(data.results);
        if (data.results != null) {
          if (data.results.table.length > 0) {
            // this.data.changeEntity(data.results.Table[0].id)
            // this.data.changeUser(data.results.Table[0])
            let data1 = JSON.parse(data.results.table[0].document)
            this.EntityID = data1.id;
            localStorage.setItem("Userid", data1.id);
            localStorage.setItem("Username", data1.Username);
            localStorage.setItem("Usertype", data1.Usertype); 
            if (data1.Usertype == "OPERATOR") {
              MENU_ITEMS.forEach((element) => {
                if (
                  element.title == "Reports" ||
                  element.title == "Order Management"
                ) {
                  element.hidden = true;
                } else {
                  element.hidden = false;
                }
              });
            }

            if (
              data1.themeid != null &&
              data1.themeid != ""
            ) {
              let themename = "cosmic";
              if (data1.themeid == "1") {
                themename = "default";
              } else if (data1.themeid == "3") {
                themename = "corporate";
              }
              this.themeService.changeTheme(themename);
              this.analyticsService.trackEvent("switchTheme");
            }
            this.router.navigate(["/pages/dashboard"]);

            // let body = JSON.stringify({
            //   "#chub.spname#": "getDDL_SP",
            //   type: "DDL_ORDERDASHBOARD",
            //   entityid: this.EntityID,
            // });

            // this.ServiceObj.apicall(JSON.parse(body)).subscribe(
            //   (res) => {
            //     // debugger;
            //     let data: any = res;

            //     //  console.log(data.results);
            //     if (data.results.Table.length > 0) {
            //       localStorage.setItem(
            //         "Totalorder",
            //         data.results.Table[0].Total
            //       );
            //       localStorage.setItem(
            //         "shippedorder",
            //         data.results.Table[0].Shipped
            //       );
            //       localStorage.setItem(
            //         "unshippedorder",
            //         data.results.Table[0].UnShipped
            //       );
            //       localStorage.setItem(
            //         "canceledorder",
            //         data.results.Table[0].Canceled
            //       );
            //       localStorage.setItem(
            //         "ShippedAmt",
            //         data.results.Table[0].ShippedAmt
            //       );
            //       localStorage.setItem(
            //         "Totalproduct",
            //         data.results.Table1[0].Total.toString()
            //       );
            //       localStorage.setItem(
            //         "activeproduct",
            //         data.results.Table1[0].Active.toString()
            //       );
            //       localStorage.setItem(
            //         "inactiveproduct",
            //         data.results.Table1[0].InActive.toString()
            //       );
            //       localStorage.setItem(
            //         "archiveproduct",
            //         data.results.Table1[0].Archive.toString()
            //       );
            //       localStorage.setItem(
            //         "noqtyproduct",
            //         data.results.Table1[0].noqty.toString()
            //       );
            //       localStorage.setItem(
            //         "QtySold",
            //         data.results.Table2[0].QtySold.toString()
            //       );
            //       localStorage.setItem(
            //         "LowStock",
            //         data.results.Table3[0].LowStock.toString()
            //       );

            //       localStorage.setItem(
            //         "RecordTop5",
            //         JSON.stringify(data.results.Table4)
            //       );
            //       localStorage.setItem(
            //         "LowStock5",
            //         JSON.stringify(data.results.Table5)
            //       );

            //       localStorage.setItem(
            //         "Channelwise",
            //         JSON.stringify(data.results.Table6)
            //       );
            //       localStorage.setItem(
            //         "Monthwise",
            //         JSON.stringify(data.results.Table7)
            //       );

            //       localStorage.setItem("isErp", data.results.Table[0].isErp);

                  
            //     }
            //   },

            //   (err) => {}
            // );
          }
        } else {
          alert("User name or password is in incorrect!");
          this.spinner.hide();
        }
      },
      (err) => {
        alert("User name or password is in incorrect!");
          this.spinner.hide();
      }
    );
  }
}
