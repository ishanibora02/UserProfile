import { Routes } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { RegisterComponent} from 'src/app/components/register/register.component';
import { ForgotPasswordComponent} from 'src/app/components/forgot-password/forgot-password.component';
import { ChangePasswordComponent} from 'src/app/components/change-password/change-password.component';


//import { Role } from 'src/app/_models/role.model';
//import { AuthGuard } from '../guards/auth.guard';
//import { from } from 'rxjs';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
   // canActivate: [AuthGuard],
  },
  
  { path: '', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
  {path:'forgot',component:ForgotPasswordComponent},
  {path:'change',component:ChangePasswordComponent},
  

  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];