import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule, routedComponents} from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import { FilterdataPipe } from './filterdata.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouteReuseStrategy} from '@angular/router';
import {CustomReuseStrategy} from './services/CustomReuseRoute';
import { AlbumsComponent } from './albums/albums.component';
import { PhotosComponent } from './photos/photos.component';

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    FilterdataPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide : RouteReuseStrategy, useClass: CustomReuseStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
