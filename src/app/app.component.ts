import { Component } from '@angular/core';
import {User} from './_models/user.model'
import { environment } from 'src/environments/environment';
import { AuthService } from './Shared/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UserProfile';
  currentUser!: User;
  

  constructor(private router: Router, private authService: AuthService) {
    environment.production && (console.log = function () { })();
    this.authService.currentUser.subscribe((x) => {
      this.currentUser = x;
    });
  }

  ngOnInit(): void {
      console.log('Redirect Success: ');
    
  }
}
