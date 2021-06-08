import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/_models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject!: BehaviorSubject<User>;
  public currentUser!: Observable<User>;
  private API_ENDPOINT = environment.API_URL;
  loggedIn!: boolean;

  constructor(private httpClient: HttpClient) { 
    const user_data: any = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(user_data));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


  login(payload: any) {
    let headersOptions: HttpHeaders = new HttpHeaders();
    headersOptions = headersOptions.append('Accept', 'application/json');
    headersOptions = headersOptions.append('Content-Type', 'application/json')
    return this.httpClient.post<any>(this.API_ENDPOINT + "https://userlocker.azurewebsites.net/auth/login/", payload,{ headers: headersOptions,observe:"response" }
    )
      .pipe(map(res => {
        if (res.status == 200) {
          let user = res.body.Data;
          user['LoginMethod'] = 'creds';
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return res;
        } else {
          return res;
        }
        console.warn(res)
      })
      );
  }
  logout() {
    localStorage.removeItem('currentUser');
    let nullUser : any = null;
    this.currentUserSubject.next(nullUser);
    
  }

  register(user: User){
    //return this.httpClient.post(`${environment.API_URL}`, user);
   let headersOptions: HttpHeaders = new HttpHeaders();
    headersOptions = headersOptions.append('Accept', 'application/json');
    headersOptions = headersOptions.append('Content-Type', 'application/json')
    return this.httpClient.post<any>(this.API_ENDPOINT + "https://userlocker.azurewebsites.net/auth/register/", user,{ headers: headersOptions,observe:"response" }
    )
      
  }

  refreshToken() {
    let currentUser = this.currentUserValue;
    let isLoggedIn = currentUser && currentUser.Token
    //let isLoggedIn = currentUser 
    if(isLoggedIn){
      //let loginMethod = currentUser.LoginMethod
      return this.httpClient.post<any>(this.API_ENDPOINT + 'path', {}, { observe: 'response'})
      .pipe(map(res => {
        // console.log('asdf')
        if (res.status == 200) {
          // console.log('asdfasdf')
          let user = res.body.Data;
          //user['LoginMethod'] = loginMethod;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return res;
        } else {
          return res;
        }
      }));
    }else{
      return of({})
    }
  }

  change(payload: any) {
    let headersOptions: HttpHeaders = new HttpHeaders();
    headersOptions = headersOptions.append('Accept', 'application/json');
    headersOptions = headersOptions.append('Content-Type', 'application/json');

    return this.httpClient.post<any>(
      this.API_ENDPOINT + 'https://userlocker.azurewebsites.net/auth/password-reset-complete/',
      payload,
      {
        headers: headersOptions,
        observe: 'response',
      }
    );
  }

  Send(email: string) {
   
    let headersOptions: HttpHeaders = new HttpHeaders();
    headersOptions = headersOptions.append('Accept', 'application/json');
    headersOptions = headersOptions.append('Content-Type', 'application/json');

    return this.httpClient.post<any>(
      this.API_ENDPOINT + 'https://userlocker.azurewebsites.net/auth/request-forget-password/',
      {
        EmailAddress: email,
      },
      {
        headers: headersOptions,
        observe: 'response',
      }
    );
  }
  
}
