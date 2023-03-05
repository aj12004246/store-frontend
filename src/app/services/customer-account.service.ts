import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from 'src/app/data/Account';
import { take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterServicesService } from './register-services.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerAccountService {
  constructor(
    private http: HttpClient,
    public snackBar: MatSnackBar,
    private userUi: RegisterServicesService
  ) {}

  public currentAccount: Account = new Account(0, '', '', '');
  public account: Account = new Account(0, '', '', '');
  public currUser: string | undefined = '';
  public newEmail: string = '';
  public newPassword: string = '';

  public fetchAccountDetails(accountEmail: string | undefined) {
    this.http
      .get<Account>(`https://localhost:7225/api/Account/${accountEmail}`)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.currentAccount = res;
        },
        error: () => console.log('err'),
      });
  }

  public deleteAccount(id: number): void {
    this.http
      .delete<Account>(`https://localhost:7225/api/Account/${id}`)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.snackBar.open('Successfully Deleted', undefined, {
            duration: 2000,
          });
          this.currentAccount = new Account(0, '', '', '');
          this.userUi.Logout();
        },
        error: (err) => {
          this.snackBar.open('Something went wrong', '', { duration: 2000 });
        },
      });
  }

  public updateAccount(id: number, editedAccount: Account): void {
    this.http
      .put(`https:localhost:7225/api/Account/${id}`, {
        ...editedAccount,
        Carts: [],
      })
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.snackBar.open('Account updated', undefined, { duration: 2000 });
          this.currUser = editedAccount.email;
          this.currentAccount = editedAccount;
        },
        error: (err) => {
          if (err.status === 409) {
            this.snackBar.open('Email Taken', '', { duration: 2000 });
          } else {
            this.snackBar.open('Something went wrong', '', { duration: 2000 });
          }
        },
      });
  }
}
