import { Component, Input } from '@angular/core';
import { Account } from 'src/app/data/Account';
import { RegisterServicesService } from 'src/app/services/register-services.service';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  @Input() account: Account = new Account(0, '', '', '')
  public editAccount: boolean = false

  constructor(private service: AdminService, private userService: RegisterServicesService){
    
  }

  public delete(): void {
    this.service.deleteAccount(this.account.id)
  }

  public close(editAccount: boolean){
    this.editAccount = editAccount
  }

  public getCurrentUser(): string {
    return this.userService.getEmail()
  }
}
