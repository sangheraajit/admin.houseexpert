import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { httpService } from './http.service';


@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
 
  activeIndex: number = 0;
  //Citylist: any;
  Options!: any[];
  private Step3CompleteSubject = new Subject<any>();

  Step3Complete = this.Step3CompleteSubject.asObservable();
  private CitylistSubject = new Subject<any>();
  Citylist = this.CitylistSubject.asObservable();

  private ArticlemstlistSubject = new Subject<any>();
  Articlemstlist = this.ArticlemstlistSubject.asObservable();

  bookingInformation = {

      spname:"order_save",
      jcustomer:[
         {
            cust_name:"",
            cust_email:"",
            cust_mobile:""
         }]
      ,
      jheader:
         [{
            orderdate:"",
            orderno:0,
            fromaddress:"",
            fromcity:"",
            fromlat:"",
            fromlong:"",
            toaddress:"",
            tocity:"",
            tolat:"",
            tolong:"",
            totkm:0,
            incity:true,
            total:0,
            tax:0,
            discount:0,
            grandtotal:0,
            part_id:0,
            orderstatus:'Quotation',
            fromfloor:'',
            tofloor:'',
            packageid:0,
            Extracharges:0,
            Addoncharges:0,
            fromlift:false,
            tolift:false,
            tokenamount:0,
			      totalcft:0,
            vehiclename:''
         }]
      ,
      jdetail:[
        /*  {
            serv_id:0,
            article_id:0,
            quantity:0,
            admin_rate:0,
            partner_rate:0,
            discount:0,
            tax:0,
            line_total:0,
            linestatus:'new'
         } */
      ],
      pid:0,
      movetype: '',
      housetype:null,
      type:'',
      selectedpackage:null,
      categoryname:''
  };

  constructor(private apiservice: httpService, private router: Router) {
   
  }

  getAllCities() {
    let spname = 'city_read';
     return this.apiservice.GetAll(spname);
  }
  getAllarticle(type:string,type2:string) {
    let spname = 'articlemst_read';
    return this.apiservice.GetAll(spname);
  }
  getAllarticleByCat(cat_id:string) {
    let Spname = 'articlemst_read';
    //return this.apiservice.GetAll(spname);

    let body = {
      spname: Spname,
      ptype: 'readbycatid',
      pid: Number(cat_id)
    };
    return this.apiservice.apicall(body)
  }
  getAllPackage() {
    let spname = 'package_read';
     return this.apiservice.GetAll(spname);
  }
  getAllPackage2(pserv_id:number,ptotcft:number,pkm:number,pfromfloor:number, ptofloor:number) {
    let spname = "package_read2"

    let body = {
      spname: spname,
      pserv_id: pserv_id,
      ptotcft: ptotcft,
      pkm: pkm,
      pfromfloor: pfromfloor,
      ptofloor: ptofloor
    };
    return this.apiservice.apicall(body)
  }
  getcalculateamount(pserv_id:number,ppackage_id:number, ptotcft:number,pkm:number,pfromfloor:number, ptofloor:number) {
    let spname = "getcalculateamount"

    let body = {
      spname: spname,
      pserv_id: pserv_id,
      ppackage_id: ppackage_id,
      ptotcft: ptotcft,
      pkm: pkm,
      pfromfloor: pfromfloor,
      ptofloor: ptofloor
    };
    return this.apiservice.apicall(body)
  }
  getChildCategories(cat_id:number) {
    let spname = "get_childcategory_read"
    let ptype = "readall"
    let pid = Number(cat_id)
    return this.apiservice.apiPost(spname, ptype, pid)
  }
  getCategoryServices(cat_id:number) {
    let spname = "service_read"
    let ptype = "readbycat"
    let pid = Number(cat_id)
    return this.apiservice.apiPost(spname, ptype, pid)
  }
  getBookingInformation() {
    return this.bookingInformation;
  }
  setBookingInformation(bookingInformation: any) {
    this.bookingInformation = bookingInformation;
  }
  removeBookingInformation() {
    this.bookingInformation = {

      spname:"order_save",
      jcustomer:[
         {
            cust_name:"",
            cust_email:"",
            cust_mobile:""
         }]
      ,
      jheader:
         [{
            orderdate:"",
            orderno:0,
            fromaddress:"",
            fromcity:"",
            fromlat:"",
            fromlong:"",
            toaddress:"",
            tocity:"",
            tolat:"",
            tolong:"",
            totkm:0,
            incity:true,
            total:0,
            tax:0,
            discount:0,
            grandtotal:0,
            part_id:0,
            orderstatus:'Quotation',
            fromfloor:'',
            tofloor:'',
            packageid:0,
            Extracharges:0,
            Addoncharges:0,
            fromlift:false,
            tolift:false,
            tokenamount:0,
			      totalcft:0,
            vehiclename:''
         }]
      ,
      jdetail:[
        /*  {
            serv_id:0,
            article_id:0,
            quantity:0,
            admin_rate:0,
            partner_rate:0,
            discount:0,
            tax:0,
            line_total:0,
            linestatus:'new'
         } */
      ],
      pid:0,
      movetype: '',
      housetype:null,
      type:'',
      selectedpackage:null,
      categoryname:''
  };
  }
  getOrdersServices(custid:number) {
    let spname = "order_read2"
    let ptype = "readall"
    let pid = 0;
    let pwhere = " and customerid =  " + custid;
    return this.apiservice.apiPostWhere(spname, ptype, pid,pwhere)
  }

  complete() {
    this.Step3CompleteSubject.next(this.bookingInformation);
  }
}
