import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { SignInComponent } from './components/pages/sign-in/sign-in.component';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';
import { UsuariosComponent } from './components/pages/usuarios/usuarios.component';
import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { AdminGuard } from './guard/admin.guard';
import { AuthGuard } from './guard/auth.guard';
import { UserGuard } from './guard/user.guard';

const routes: Routes = [
  {path:'welcome', component:WelcomeComponent},
  {path:'signin', component:SignInComponent},
  {path:'signup', component:SignUpComponent},
  {path:'home', component:HomeComponent, canActivate:[AuthGuard, UserGuard]},
  {path:'usuarios', component:UsuariosComponent, canActivate:[AuthGuard, AdminGuard]},
  {path:'**', redirectTo: 'home'},
  {path:'', pathMatch: 'full', redirectTo:'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
