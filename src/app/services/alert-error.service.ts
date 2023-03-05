import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertErrorService {

  constructor(private snackBar: MatSnackBar) { }


  /* 
  
  Universal SnackBar Error Alert for Front End Components/Services

  Example:

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  */

  public showError(message:string) :void{
    this.snackBar.open(message, undefined)
  }

}
