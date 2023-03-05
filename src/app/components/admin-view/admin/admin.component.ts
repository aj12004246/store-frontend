import { Component, OnDestroy } from '@angular/core';
import { Account } from 'src/app/data/Account';
import { Subscription } from 'rxjs';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnDestroy {

  public accounts: Account[] = []
  public accSub: Subscription
  public createAccount: boolean = false

  constructor(private service: AdminService){
    this.accSub = this.service.$accounts
    .subscribe(
      accounts => this.accounts = accounts
    )
  }

  public closeCreate(onOff: boolean){
    this.createAccount = onOff
  }

  ngOnDestroy(){
    this.accSub.unsubscribe()
  }
}
