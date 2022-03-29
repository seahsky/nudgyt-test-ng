import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  //   {
  //     path: 'forgot-password',
  //     component: ForgotPasswordComponent,
  //     canActivate: [MaintenanceGuard],
  //   },
  //   {
  //     path: 'user/verify/:id/:token',
  //     component: VerifyComponent,
  //   },
  //   {
  //     path: 'user/security/verify/:id/:token',
  //     component: UpdateSecurityVerifyComponent,
  //   },
  //   {
  //     path: 'user/recovery/verify/:id/:token',
  //     component: RecoveryEmailVerifyComponent,
  //   },
  //   {
  //     path: 'password/recovery',
  //     component: PasswordRecoveryComponent,
  //   },
  //   {
  //     path: 'password/reset/:email/:token',
  //     component: ResetPasswordComponent,
  //   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
