import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Account } from 'src/app/data/Account';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  newAccount: Account = new Account(0, '', '','')
  @Output() showCreate = new EventEmitter<boolean>()
  validate = true

  constructor(private service: AdminService){

  }

  public submit(validEmail: boolean | null, validPassword: boolean | null): void{
    if (validEmail && validPassword && this.newAccount.role){
      this.service.createAccount(this.newAccount)
      this.reset()
    }
    else if (!this.newAccount.role)
    this.service.snackBar.open("Please select a role", '', {duration: 2000})
    else
      this.service.snackBar.open("Invalid email or password", '', {duration: 2000})
  }

  public reset(): void{
    this.showCreate.emit(false)
  }
}
