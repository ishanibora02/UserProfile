import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/Shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { 
  if (this.authService.currentUserValue) {
    this.router.navigate(['/']);
  }
}
  ngOnInit(): void {
  }
  
  Save(){
    let payload = {
      Email: this.loginForm.value['email'],
      Password: this.loginForm.value['password'],
    };
    this.authService
      .login(payload)
      .pipe(first())
      .subscribe(
        (res) => {
          if (res.status === 200) {
            console.log('Sorry', res);
          }
          if (res.status != 200) {
            this.snackBar.open(res.body.Message, 'Close', { duration: 1500 });
          }
        },
        (error) => {
          if (error === 'Unknown Error') {
            this.snackBar.open(
              'Backend is not running , Please contact to admin',
              'Close',
              { duration: 5000 }
            );
          } else {
            this.snackBar.open(error, 'Close', { duration: 5000 });
          }
        }
      );
  }
}
