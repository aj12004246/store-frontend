import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Account } from 'src/app/data/Account';
import { RegisterServicesService } from 'src/app/services/register-services.service';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit{
  @Input() account: Account = new Account(0, '', '', '')
  @Input() currUser: string = ''
  @Output() showEdit = new EventEmitter<boolean>()
  public newEmail: string = ''
  public newRole: string = ''
  public newPassword: string = ''
  public edit: boolean[] = [false, false, false, true]
  public roleDisabled: boolean = false
  validate: boolean = true
  validEmail: boolean | null = true 
  validPassword: boolean | null = true 
  
  constructor(private service: AdminService, private ui: RegisterServicesService){
  }

  ngOnInit(): void {
    this.roleDisabled = this.disableRole()
  }

  public disableRole(): boolean {
    return this.currUser === this.account.email
  }

  public reset(): void{
    this.showEdit.emit(false)
  }

  public submit(): void{
    if (this.validEmail && this.validPassword){
      if(this.newEmail === '' && this.edit[0]){
        this.service.snackBar.open("email field required", '', {duration: 2000})
        return
      }
      if(this.newPassword === '' && this.edit[1]){
        this.service.snackBar.open("password field required", '', {duration: 2000})
        return
      }
      if (this.roleDisabled && this.newEmail){
        this.ui.setEmail(this.newEmail)
      }
      this.account.email = this.newEmail ? this.newEmail : this.account.email
      this.account.password = this.newPassword ? this.newPassword : this.account.password
      this.account.role = this.newRole ? this.newRole : this.account.role
      this.service.updateAccount(this.account.id, this.account)
      this.reset()
    }
    else
      this.service.snackBar.open("Invalid email or password", '', {duration: 2000})
  }

  public toggleAndReset(index: number): void {
    this.edit[index] = this.edit[index] ? false : true
    if (index === 0){
      this.validEmail = true
      this.newEmail = ''
    }
    else if(index === 1){
      this.validPassword = true
      this.newPassword = ''
    }
    else{
      this.newRole = ''
    }
  }

  public buttonControl(): boolean{
    if(this.newEmail || this.newRole || this.newPassword){
      return false
    }
    return true
  }
}
