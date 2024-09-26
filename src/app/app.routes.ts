import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { authGuard } from './auth-guard/auth.guard';
import { SettingsComponent } from './components/settings/settings.component';
import { InitiativesComponent } from './components/initiatives/initiatives.component';

export const routes: Routes = [
    // { path:'', component:HeaderComponent},
    // { path:'admin-dashboard', component:DashboardComponent,canActivate: [authGuard],children: [
    //     { path:'settings', component:SettingsComponent},
    //     { path:'initiatives', component:InitiativesComponent },

    // ]}  
    { path:'', component:HeaderComponent},
    { path:'admin-dashboard', component:DashboardComponent,canActivate: [authGuard],
        children: [
            { path: '',component:InitiativesComponent},
            { path:'settings', component:SettingsComponent},
            { path:'initiatives', component:InitiativesComponent },
    ]} 


  
];
