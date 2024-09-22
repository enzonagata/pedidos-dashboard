import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CompaniesService } from '../companies/companies.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data
  constructor(private afa: AngularFireAuth) {
    this.afa.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', null!);
        localStorage.setItem('_cpnj', null!);
      }
    })
  }

  async login(user: any) {
    return await this.afa.signInWithEmailAndPassword(user.email, user.password);
  }
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("_cpnj");
    return this.afa.signOut();
  }
  getAuth() {
    return this.afa
  }
  getUserLoggedIn() {
    return localStorage.getItem("user");
  }
  userToken() {
    let token = JSON.parse(this.getUserLoggedIn()!);
    return token?.uid;
  }
}
