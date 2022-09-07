import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../shared/product.service';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  constructor(private builder: FormBuilder, private router: Router, private service: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.GetCategory().subscribe(item => {
      this.categorydata = item;
    });

    this.service.GetColor().subscribe(item => {
      this.colordata = item;
    });

    this.service.GetSize().subscribe(item => {
      this.sizedata = item;
    });

    this.editproductcode = this.route.snapshot.paramMap.get('id');
    if (this.editproductcode != null) {
      this.service.GetProductbycode(this.editproductcode).subscribe(item => {
        this.editdata = item;
        if (this.editdata.variants != null) {
          for (let i = 0; i < this.editdata.variants.length; i++) {
            this.AddVariants();
          }
        }
        this.productform.setValue({
          code: this.editdata.code,
          name: this.editdata.name,
          price: this.editdata.price,
          remarks: this.editdata.remarks,
          category: this.editdata.category,
          variants: this.editdata.variants
        })
      });
    }
  }

  formvariant !: FormArray<any>;
  colordata: any;
  sizedata: any;
  categorydata: any
  saveresponse: any;
  editdata: any;
  editproductcode: any;

  productform = this.builder.group({
    code: this.builder.control('', Validators.required),
    name: this.builder.control('', Validators.required),
    price: this.builder.control('', Validators.required),
    remarks: this.builder.control(''),
    category: this.builder.control(''),
    variants: this.builder.array([])
  });

  redirecttolist() {
    this.router.navigate(['product']);
  }

  AddVariants() {
    this.formvariant = this.productform.get("variants") as FormArray;
    this.formvariant.push(this.Generaterow());
  }

  Generaterow() {
    return this.builder.group({
      id: this.builder.control({ value: 0, disabled: true }),
      productCode: this.builder.control(this.productform.value.code),
      price: this.builder.control(this.productform.value.price),
      isactive: this.builder.control(true),
      colorId: this.builder.control(''),
      sizeId: this.builder.control(''),
      remarks: this.builder.control('')
    });
  }

  get variants() {
    return this.productform.get("variants") as FormArray;
  }
  Removevariant(index: any) {
    if (confirm('do you want to remove this variant?')) {
      this.formvariant = this.productform.get("variants") as FormArray;
      this.formvariant.removeAt(index)
    }
  }

  SaveProduct() {
    //console.log(this.productform.value);
    if (this.productform.valid) {
      this.service.SaveProduct(this.productform.getRawValue()).subscribe(item => {
        this.saveresponse = item;
        if (this.saveresponse.result == 'pass') {
          this.productform.reset();
          this.redirecttolist();
          alertify.success("Saved Successfully");
        } else {
          alertify.error("Save failed")
        }
      });
    } else {
      alert("please enter valid data");
    }
  }
}
