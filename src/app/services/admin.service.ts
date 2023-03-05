import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from 'src/app/data/Account';
import { BehaviorSubject, take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public $accounts = new BehaviorSubject<Account[]>([])

  constructor(private http: HttpClient, public snackBar: MatSnackBar) {
    this.refreshAccounts();
  }

  public refreshAccounts(): void {
    this.http.get<Account[]>("https://localhost:7225/api/Account")
      .pipe(take(1))
      .subscribe({
        next: accounts => this.$accounts.next(accounts),
        error: () => console.log("err")
      })
  }

  public deleteAccount(id: number): void {
    this.http.delete<Account>(`https://localhost:7225/api/Account/${id}`)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.snackBar.open("Successfully Deleted", undefined, {duration: 2000})
          this.refreshAccounts()
        },
        error: () => console.log("err")
      })
  }

  public updateAccount(id: number, editedAccount: Account): void {
    this.http.put(`https:localhost:7225/api/Account/${id}`, {
      ...editedAccount,
      Carts: []
    })
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.snackBar.open("Account updated", undefined, {duration: 2000})
          this.refreshAccounts()
        },
        error: (err) => {
          if (err.status === 409){
            this.snackBar.open("Email Taken", '', {duration: 2000})
          }
        }
      })
  }

  public createAccount(newAccount: Account) {
    this.http.post('https:localhost:7225/api/Account', {
      ...newAccount,
      Carts: []
    })
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.snackBar.open("Account created", undefined, {duration: 2000})
          this.refreshAccounts()
        },
        error: (err) => {
          if (err.status === 409){
            this.snackBar.open("Email Taken", '', {duration: 2000})
          }
        }
      })
  }


}
