import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  private productListSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  productList$: Observable<Product[]> = this.productListSubject.asObservable();

  private filteredProductsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  filteredProducts$: Observable<Product[]> = this.filteredProductsSubject.asObservable();


  constructor(private httpClient: HttpClient) {
    this.loadProductList();
  }



  //deze methode doet een get request en zet de JSON om naar een products array met map ()
  //GetResponse is een hulp interface 
  private loadProductList(): void {
    this.httpClient
      .get<GetResponse>(this.baseUrl)
      .pipe(map((response) => response._embedded.products))
      .subscribe((products) => {
        this.productListSubject.next(products);
        this.updateFilter(true, true);
      });
  }

  //returnt observable waar je ergens naar kan luisteren
  getProductList(): Observable<Product[]> {
    return this.productList$;
  }

  getFilteredProductList(): Observable<Product[]> {
    return this.filteredProducts$;
  }

  updateFilter(uglyLionsChecked: boolean, uglyApesChecked: boolean): void {
    const productList = this.productListSubject.value;
    if (uglyLionsChecked && uglyApesChecked) {
      this.filteredProductsSubject.next(productList);
    } else {
      const filteredProducts = productList.filter((product) => {
        if (uglyLionsChecked && !uglyApesChecked) {
          return product.categoryName === 'LION';
        } else if (!uglyLionsChecked && uglyApesChecked) {
          return product.categoryName === 'APE';
        }
        return false;
      });

      this.filteredProductsSubject.next(filteredProducts);
    }
  }

  sortProductsByUnitPriceDescending(): void {
    const productList = this.filteredProductsSubject.value;
    const sortedProducts = [...productList].sort((a, b) => b.unitPrice - a.unitPrice);
    this.filteredProductsSubject.next(sortedProducts);
  }

  
  sortProductsByUnitPriceAscending(): void {
    const productList = this.filteredProductsSubject.value;
    const sortedProducts = [...productList].sort((a, b) => a.unitPrice - b.unitPrice);
    this.filteredProductsSubject.next(sortedProducts);
  }
  
}

//help interface die JSON gegevens van spring data omzet
//in een array van typescript object type Product
interface GetResponse {
  _embedded: {
    products: Product[];
  }
}
