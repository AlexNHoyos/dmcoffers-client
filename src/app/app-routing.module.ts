import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublisherListComponent } from './publisher-list/publisher-list.component';
import { PublisherDetailComponent } from './publisher-detail/publisher-detail.component';
import { PublisherCreateComponent } from './publisher-create/publisher-create.component';
const routes: Routes = [
  //{ path: '', redirectTo: '/publishers', pathMatch: 'full' },
  //{ path: 'publishers', component: PublisherListComponent },
  { path: 'publishers/:id', component: PublisherDetailComponent },
  { path: 'create-publisher', component: PublisherCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
