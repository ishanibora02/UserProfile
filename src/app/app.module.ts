import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
//import { DemoMaterialModule } from './module/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { JwtInterceptor} from 'src/app/jwt/jwt.interceptor';
import { ErrorInterceptor} from 'src/app/error/error.interceptor';
import { appInitializer} from 'src/app/app.initializer';
import { from } from 'rxjs';
import { AuthService } from 'src/app/Shared/services/auth.service';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialogModule} from '@angular/material/dialog';
//import { MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    //DemoMaterialModule,
   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    //MatDialogRef,
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true, deps: [AuthService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
