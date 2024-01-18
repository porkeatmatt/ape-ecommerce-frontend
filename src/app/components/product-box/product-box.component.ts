import { Component, Input } from '@angular/core';
import { MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule} from '@angular/material/icon';
import { Product } from '../../common/product';
import { MatButtonModule} from '@angular/material/button';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-product-box',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule,MatButtonModule],
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.css'
})
export class ProductBoxComponent {

  @Input() fullWidthMode = true;
  @Input() product!: Product;

  constructor(private cartService: CartService){
}

  addToCart (cartProduct : Product) {
  
  console.log(`Adding product to cart: Name: ${cartProduct.name}, Price: ${cartProduct.unitPrice}, ID: ${cartProduct.id}`);
  const theCartItem = new CartItem(cartProduct);

  this.cartService.addToCart(theCartItem)

  }

}
