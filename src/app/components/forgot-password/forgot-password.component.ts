import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
//import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/Shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm = new FormGroup({
    email: new FormControl('')
  });

  constructor(private snackBar: MatSnackBar,
    private authService:AuthService,

    public dialog: MatDialog
  ){}
    //public dialogRef: MatDialogRef<ForgotPasswordComponent>{ }

  ngOnInit(): void {
  }

  Send(){
    let email = this.forgotForm.value.email;

    this.authService.Send(email)
    .subscribe((res) => {
      //this.dialogRef.close(res.body.Message);
      //this.dialog.openDialogs(res.body.Message);

      if (res.status === 200) {
        console.log("forget pass", res);
        this.snackBar.open(res.body.Data.Status, 'Close', { duration: 3000 });
        //this.eventEmitterService.onUserDetailUpdate();
      } else if (res.status != 200) {

        // this.dialogRef.close(res.body.Message);
        this.snackBar.open(res.body.Data.Status, 'Close', { duration: 3000 });

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
}
