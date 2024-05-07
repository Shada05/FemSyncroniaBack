import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: any = {}
  constructor(private route: ActivatedRoute,private _productService: ProductService, private router: Router){
    
  }
  ngOnInit(){
    const id: string | null = this.route.snapshot.paramMap.get('id');

    const idproduct = parseInt(id!=null?id:"");
    console.log(id);
    this._productService.product(idproduct).subscribe({next:(res)=>{
      console.log(res)
      this.product= res.product;
    },error:(err)=>{
      console.log(err)
      alert(err.error.message)
    }});
    // this.get_product();
  }
  goBack(): void {
    this.router.navigate(['/products']);
}
  

  
}
