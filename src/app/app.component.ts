import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import * as moment from 'moment'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  couponForm: FormGroup
  startMinDate = new Date()
  minDate = new Date()
  maxDate

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {

    this.couponForm = this.fb.group({
      coupon_code: ["", [Validators.required]],
      coupon_type: ["", [Validators.required]],
      valid_from: ["", [Validators.required]],
      valid_to: ["", [Validators.required]],
      is_active: ["", [Validators.required]],
      coupon_count: ["", [Validators.required]],
      is_unlimited: ["", [Validators.required]],
      tnc: ["", [Validators.required]],
      rules: this.fb.array([this.fb.group({
        min_amount: ["", [Validators.required]],
        max_amount: [""],
        discount_type: ["", [Validators.required]],
        discount: ["", [Validators.required]],
        max_discount: [""]
      })])
    })

    this.isUnlimited.valueChanges.subscribe(value => {
      value == 'limited' ? this.couponCount.enable() : this.couponCount.disable()
    })
  }

  get isUnlimited() {
    return this.couponForm.get('is_unlimited') as FormControl
  }
  get couponCount() {
    return this.couponForm.get('coupon_count') as FormControl
  }


  get allRules() {
    return this.couponForm.get('rules') as FormArray
  }

  addRule = () => {
    this.allRules.push(this.fb.group({
      min_amount: ["", [Validators.required]],
      max_amount: [""],
      discount_type: ["", [Validators.required]],
      discount: ["", [Validators.required]],
      max_discount: [""]
    }))
  }

  deleteRule = (index) => {
    this.allRules.removeAt(index)
  }

  get f() {
    return this.couponForm.controls
  }

  saveCoupon = () => {
    if (this.couponForm.valid) {


      let couponData = {}
      couponData["coupon_code"] = this.f.coupon_code.value
      couponData["coupon_type"] = this.f.coupon_type.value
      couponData["valid_from"] = moment(new Date(this.f.valid_from.value)).format('YYYY-MM-DD')
      couponData["valid_to"] = moment(new Date(this.f.valid_to.value)).format('YYYY-MM-DD')
      couponData["is_active"] = this.f.is_active.value
      couponData["is_unlimited"] = this.f.is_unlimited.value == 'limited' ? false : true
      this.f.is_unlimited.value == 'limited' ? couponData["coupon_count"] == this.f.is_unlimited.value : true
      couponData["tnc"] = this.f.tnc.value
      couponData["rules"] = this.f.rules.value

      console.log(couponData)
      alert(JSON.stringify(couponData))
    }

  }
  setMinDate = (date) => {
    this.minDate = new Date(date)
  }
  setMaxDate = (date) => {
    this.maxDate = new Date(date)
  }



}
