import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublisherListComponent } from './publisher-crud/publisher-list/publisher-list.component';
import { PublisherDetailComponent } from './publisher-crud/publisher-detail/publisher-detail.component';
import { PublisherCreateComponent } from './publisher-crud/publisher-create/publisher-create.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/publishers', pathMatch: 'full' },
  //{ path: 'publishers', component: PublisherListComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: DashboardComponent },
  { path: 'iniciar-sesion', component: LoginComponent },
  { path: 'publishers/:id', component: PublisherDetailComponent },
  { path: 'create-publisher', component: PublisherCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
