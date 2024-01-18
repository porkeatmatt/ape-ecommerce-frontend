import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox'; 


@Component({
  selector: 'app-products-header',
  standalone: true,
  imports: [MatCardModule,MatMenuModule,MatButtonModule,MatIconModule,MatCheckboxModule,FormsModule],
  templateUrl: './products-header.component.html',
  styleUrl: './products-header.component.css'
})
export class ProductsHeaderComponent {

  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() checkboxValuesChange = new EventEmitter<{ uglyLions: boolean, uglyApes: boolean }>();
  @Output() sortChange = new EventEmitter<string>();

  sort = '';

  uglyLionsChecked = true;
  uglyApesChecked = true;

  onSortUpdated(newSort: string): void{
    this.sort = newSort;
    this.sortChange.emit(this.sort);
  }


  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }

  onUglyLionsCheckboxChange(checked: boolean): void {
    this.uglyLionsChecked = checked;
    this.onCheckboxValueChange();
  }
  
  onUglyApesCheckboxChange(checked: boolean): void {
    this.uglyApesChecked = checked;
    this.onCheckboxValueChange();

  }

  onCheckboxValueChange(): void {
    this.checkboxValuesChange.emit({
      uglyLions: this.uglyLionsChecked,
      uglyApes: this.uglyApesChecked
    })
  }
}
