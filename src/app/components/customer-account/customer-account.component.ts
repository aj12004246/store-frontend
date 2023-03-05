import { Component, OnDestroy, OnInit } from '@angular/core';
import { Account } from 'src/app/data/Account';
import { RegisterServicesService } from 'src/app/services/register-services.service';
import { CustomerAccountService } from 'src/app/services/customer-account.service';

@Component({
  selector: 'app-customer-account',
  templateUrl: './customer-account.component.html',
  styleUrls: ['./customer-account.component.css'],
})
export class CustomerAccountComponent implements OnInit {
  public account: Account = new Account(0, '', '', '');
  public currUser: string | undefined = '';
  public newEmail: string = '';
  public newPassword: string = '';
  public viewEditAccount = false;
  public viewToggleEmail = false;
  public viewTogglePassword = false;
  public viewDelete = false;
  public updateEmail = false;
  public updatePassword = false;
  validEmail: boolean | null = true;
  validate: boolean = true;

  constructor(
    public customerui: CustomerAccountService,
    private userService: RegisterServicesService
  ) {}

  ngOnInit() {
    this.customerui.currUser = this.userService.getEmail();
    this.customerui.fetchAccountDetails(this.customerui.currUser);
  }

  public validateEmail(checkEmail: string) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(checkEmail);
  }

  public toggleEmail() {
    if (this.viewToggleEmail === true) {
      this.viewToggleEmail = false;
      this.updateEmail = false;
      this.newEmail = '';
      return;
    }
    this.viewToggleEmail = true;
    this.updateEmail = true;
  }

  public togglePassword() {
    if (this.viewTogglePassword === true) {
      this.viewTogglePassword = false;
      this.updatePassword = false;
      this.newPassword = '';
      return;
    }
    this.viewTogglePassword = true;
    this.updatePassword = true;
  }

  public editAccount() {
    this.viewEditAccount = true;
  }

  public deleteAccountToggle() {
    if (this.viewDelete === true) {
      this.viewDelete = false;
      return;
    }
    this.viewDelete = true;
  }

  public toggleEditAccount() {
    this.viewEditAccount = false;
  }

  public resetFields() {
    this.viewToggleEmail = false;
    this.viewTogglePassword = false;
    this.viewEditAccount = false;
    this.updateEmail = false;
    this.updatePassword = false;
    this.newEmail = '';
    this.newPassword = '';
  }

  //using to log which account is coming through
  public fetchAccountDetails() {
    this.account.email = this.customerui.currentAccount.email;
    this.account.password = this.customerui.currentAccount.password;
    this.account.id = this.customerui.currentAccount.id;
    this.account.role = this.customerui.currentAccount.role;
  }

  public submitChanges() {
    //update email only

    if (this.updateEmail === true && this.updatePassword === false) {
      if (this.validateEmail(this.newEmail) === false) {
        this.customerui.snackBar.open('Not a valid email format!', '', {
          duration: 2000,
        });
        return;
      }
      if (this.newEmail === this.account.email) {
        this.customerui.snackBar.open('No changes made to current Email.', '', {
          duration: 2000,
        });
        return;
      } else if (this.newEmail === '' || this.newEmail === null) {
        this.customerui.snackBar.open('Email field is blank or null.', '', {
          duration: 2000,
        });
        return;
      } else if (this.validEmail === false) {
        this.customerui.snackBar.open('Email field is blank or null.', '', {
          duration: 2000,
        });
      } else {
        this.account.email = this.newEmail;
        this.customerui.updateAccount(this.account.id, this.account);
        return;
      }
    }
    //Updates password only
    if (this.updatePassword === true && this.updateEmail === false) {
      if (this.newPassword === this.account.password) {
        this.customerui.snackBar.open(
          'No changes made to current password.',
          '',
          { duration: 2000 }
        );
        return;
      } else if (this.newPassword === '' || this.newPassword === null) {
        this.customerui.snackBar.open('Password field is blank or null.', '', {
          duration: 2000,
        });
        return;
      } else {
        this.account.password = this.newPassword;
        this.customerui.updateAccount(
          this.customerui.currentAccount.id,
          this.account
        );
        return;
      }
    }
    //Updates both fields
    if (this.updatePassword === true && this.updateEmail === true) {
      if (this.validateEmail(this.newEmail) === false) {
        this.customerui.snackBar.open('Not a valid email format!', '', {
          duration: 2000,
        });
        return;
      }
      if (this.newPassword === this.account.password) {
        this.customerui.snackBar.open(
          'No changes made to current password.',
          '',
          { duration: 2000 }
        );
        return;
      } else if (this.newPassword === '' || this.newPassword === null) {
          this.customerui.snackBar.open('Password field is blank or null.', '', {
            duration: 2000,
          });
        return;
      } else if (this.newEmail === this.account.email) {
          this.customerui.snackBar.open('No changes made to current email.', '', {
            duration: 2000,
          });
          return;
      } else if (this.newEmail === '' || this.newEmail === null) {
          this.customerui.snackBar.open('Email field is blank or null.', '', {
            duration: 2000,
          });
        return;
      } else {
          this.account.email = this.newEmail;
          this.account.password = this.newPassword;
          this.customerui.updateAccount(this.account.id, this.account);
          return;
      }
    }
  }
}
