import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublisherDetailComponent } from './publisher-detail/publisher-detail.component';

const routes: Routes = [
  { path: 'publishers/:id', component: PublisherDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
