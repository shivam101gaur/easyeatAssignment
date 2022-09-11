import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showOp=false

  flatDiscountError='Mimimum flat discount can  be 0 and max can be Rs. 500'
  percentageDiscountError='Minimum percenage discount can be 5% and maximum can be 70% '

  discount_types = [{ label: 'flat discount', value: 0 }, { label: '% discount', value: 1 }]

  constructor(private fb: FormBuilder) { }

  discountForm = this.fb.group({
    discount_type: [this.discount_types[0].value, Validators.required],
    product: ['',[Validators.required,Validators.min(0),Validators.max(500)]],
    premium: [false],
    level: [''],
    active: [false]
  })

  ngOnInit() {
    // whenever the discount type value changes
    this.discountFormControl.valueChanges.subscribe(val=>{
      this.showOp=false
      this.productFormControl.reset()

      if(val==0){
        this.productFormControl.setValidators([Validators.required,Validators.min(0),Validators.max(500)])
      }
      if(val==1){
        this.productFormControl.setValidators([Validators.required,Validators.min(5),Validators.max(70)])
      }
    })
  }


  /** returns discount type form control from the form group discountForm */
  get discountFormControl() : FormControl {
    return this.discountForm.get('discount_type') as FormControl
  }
  
  /** returns discount type form control from the form group discountForm */
  get productFormControl() : FormControl {
    return this.discountForm.get('product') as FormControl
  }
  
 
  

  /**
   * validates form and submits form
   */
  saveForm() {    
    if(this.discountForm.valid){
      alert(' A valid form was submitted !');
      this.showOp=true
    }
  }

}
