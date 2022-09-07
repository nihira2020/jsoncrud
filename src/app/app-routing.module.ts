import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './addproduct/addproduct.component';
import { CompanyComponent } from './company/company.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    component:CompanyComponent,path:"company"
  },
  {
    component:CompanyComponent,path:""
  },
  {
    component:ProductComponent,path:"product",children:[
      {
        component:AddproductComponent,path:"create"
      },
      {
        component:AddproductComponent,path:"edit/:id"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
