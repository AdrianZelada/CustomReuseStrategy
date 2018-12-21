import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListUsersComponent} from './list-users/list-users.component';
import {PhotosComponent} from './photos/photos.component';

const routes: Routes = [
  {path: '', redirectTo: 'users', pathMatch: 'full'},
  {path: 'users', component: ListUsersComponent},
  {path: 'users/:idUser/photos', component: PhotosComponent},
  {path: '**', redirectTo: 'users'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

export const routedComponents = [ListUsersComponent, PhotosComponent];
