import { Routes } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guard';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages-originals/register/register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login', canActivate: [LoginGuard], component: LoginComponent },
    { path: 'register', canActivate: [LoginGuard], component: RegisterComponent }
];
