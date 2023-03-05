import { Component } from '@angular/core';
import { RegisterServicesService } from 'src/app/services/register-services.service';
import {FormControl, Validators} from '@angular/forms';
import { ShopService } from 'src/app/services/shop.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  public email=''
  public password=''
  public accounttype=''

  constructor(public ui : RegisterServicesService)
  {
  }
 
}
