import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent {

  checkoutFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder){}
  
  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        streetAndHouseNumber: [''],
        postalCode: [''],
        city: ['']

      })
    });
  }

  onSubmit() {
    console.log("Handling the submit button");
    console.log("Customer Details:", this.checkoutFormGroup.get('customer')?.value);
    console.log("Shipping Address:", this.checkoutFormGroup.get('shippingAddress')?.value);
  }
  
}
