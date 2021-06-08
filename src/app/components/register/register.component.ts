import { Component, OnInit } from '@angular/core';
//import { FormGroup, FormControl } from '@angular/forms';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Shared/services/auth.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  //registerForm: any;



  constructor(

    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
    //private route: ActivatedRoute,
    //private router: Router,
    // private accountService: AccountService,
    //private alertService: AlertService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    let user = {
      email: this.registerForm.value['email'],
      first_name: this.registerForm.value['first_name'],
      last_name: this.registerForm.value['last_name'],
      password: this.registerForm.value['password'],
      password2: this.registerForm.value['password2'],

    };
    console.log("?>>>>>>", user);
    let stringify_user = JSON.stringify(user)
    localStorage.setItem("user", stringify_user)
    this.authService.register(user).subscribe((res: any) => {
      console.log("register response", res);
      this.router.navigate(['login']);

    })
    // this.authService
    //   .register(user)
    //   .pipe(first())
    //   .subscribe(
    //     (res) => {
    //       if (res.status === 200) {
    //         console.log('sorry', res);
    //       }
    //       if (res.status != 200) {
    //         this.snackBar.open(res.body.Message, 'Close', { duration: 1500 });
    //       }
    //     },
    //     (error) => {
    //       if (error === 'Unknown Error') {
    //         this.snackBar.open(
    //           'Backend is not running , Please contact to admin',
    //           'Close',
    //           { duration: 5000 }
    //         );
    //       } else {
    //         this.snackBar.open(error, 'Close', { duration: 5000 });
    //       }

    //     }
    //   )

    // this.authService.register(this.registerForm.value)
    //   .pipe(first())
    //   .subscribe({
    //     next: () => {
    //       // localStorage.setItem('user',this.registerForm.value);
    //       console.info('Registration successful');
    //       this.router.navigate(['../login'], { relativeTo: this.route });
    //     },
    //     error: error => {
    //       console.warn("Not registered");
    //       //this.loading = false;
    //     }
    //  });

  }

  // convenience getter for easy access to form fields
}