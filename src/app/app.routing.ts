import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Route } from "@angular/router";

import { ReseniasComponent } from "./resenias/resenias.component";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";

const appRoutes : Routes = [
    {path: '', component: HomeComponent},
    {path: 'reseñas', component: ReseniasComponent},
    {path:'login', component: LoginComponent},
    {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[]=[];
export const routing : ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);