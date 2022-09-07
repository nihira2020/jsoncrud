import { Component, OnInit,DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../shared/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit,DoCheck {

  constructor(private services:ProductService,private router:Router) { }
  ngDoCheck(): void {
    let currenturl=this.router.url;
    if(currenturl=='/product'){
      this.islisting=true;
    }else{
      this.islisting=false;
    }
  }

  productdata:any;
  islisting=true;

  ngOnInit(): void {
    this.LoadProduct();
    this.services.Refreshrequired.subscribe(item=>{
      this.LoadProduct();
    });
  }

  displayColums:string[]=["code","name","price","remarks","action"];

  EditProduct(code:any){
     this.router.navigate(['product/edit/'+code])
  }

  LoadProduct(){
    this.services.GetAllProducts().subscribe(resp=>{
      this.productdata=resp;
    })
  }

}
