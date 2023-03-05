import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RegisterServicesService } from 'src/app/services/register-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  public email=''
  public password=''
 

  constructor(public ui : RegisterServicesService)
  {
  }

}
