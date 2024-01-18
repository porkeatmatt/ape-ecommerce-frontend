import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsHeaderComponent } from '../../components/products-header/products-header.component';
import { ProductBoxComponent } from '../../components/product-box/product-box.component';

import { MatGridListModule} from '@angular/material/grid-list';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';



//declaring and populating objects that binds height to number of rows
const ROWS_HEIGHT: { [id:number]: number } = {1:300, 3: 350, 4:380 };

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsHeaderComponent,MatGridListModule, ProductBoxComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  products: Product[] = [];
  
  cols = 1;
  rowHeight = ROWS_HEIGHT[this.cols];

  constructor(private productService: ProductService, private cartService: CartService){}

  logProductsToConsole(): void {
    this.products.forEach(product => {
      console.log(product.imageUrl);
    });
  }

  onSortUpdated(sortOption: string){
    if (sortOption === 'Price low -> high'){
      this.productService.sortProductsByUnitPriceAscending();
      this.productService.getFilteredProductList().subscribe(
        data => {
          this.products = data;
        }
      );
    }else if (sortOption === 'Price high-> low'){
      this.productService.sortProductsByUnitPriceDescending();
      this.productService.getFilteredProductList().subscribe(
        data => {
          this.products = data;
        }
      );
    }
  }
  
  onColumnsCountChange(colsNum: number) : void{
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  //reageert op checkbox en past array aan
  onCheckboxValuesChange(checkboxValues: { uglyLions: boolean, uglyApes: boolean }): void {
    this.productService.updateFilter(checkboxValues.uglyLions, checkboxValues.uglyApes);
    this.productService.getFilteredProductList().subscribe(
      data => {
        this.products = data;
      }
    )
  }

  ngOnInit(): void{
    this.listProducts();
    this.listProductsAndShuffle();
  }
  
  listProducts() {
    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    )
  }

  listProductsAndShuffle() {
    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
        this.shuffleProducts(this.products);
      }
    );
  }

  shuffleProducts(products: Product[]): Product[] {
    for (let i = products.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [products[i], products[j]] = [products[j], products[i]];
    }
    return products;
  }
  
  logCart(){
    this.cartService.logCartData;
  }

}
