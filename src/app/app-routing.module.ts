import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublisherDetailComponent } from './publisher-detail/publisher-detail.component';
import { PublisherCreateComponent } from './publisher-create/publisher-create.component';
const routes: Routes = [
  { path: 'publishers/:id', component: PublisherDetailComponent },
  { path: 'create-publisher', component: PublisherCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
