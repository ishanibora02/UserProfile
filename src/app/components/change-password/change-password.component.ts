import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/Shared/services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changeForm = new FormGroup({
    npassword: new FormControl(''),
    cpassword: new FormControl('')
  });
  constructor(private snackBar: MatSnackBar,
    private authService:AuthService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  change(npassword:any,cpassword:any){

      if (npassword === cpassword) {
        let payload = {
          Password: btoa(this.changeForm.value.cpassword),
        }
        this.authService.change(payload).subscribe((res) => {
          if (res.status === 200) {
            console.log(res);
            this.dialogRef.close(res.body.Message);
            this.snackBar.open("Password is Updated", 'Close', { duration: 10000 });
            //this.eventEmitterService.onUserDetailUpdate();
          } else if (res.status != 200) {
            this.dialogRef.close(res.body.Message);
            this.snackBar.open(res.body.Message, 'Close', { duration: 10000 });
          }
        }, (error) => {
          if (error === 'Unknown Error') {
            this.snackBar.open(
              'Backend is not running , Please contact to admin',
              'Close',
              { duration: 5000 }
            );
          } else {
            this.snackBar.open(error, 'Close', { duration: 5000 });
          }
        })
      }
      else {
        this.snackBar.open("Password Doesn't Match !", "Close", { duration: 5000 })
      }
    }
  
}
