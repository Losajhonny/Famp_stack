import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { AlbumComponent } from './components/album/album.component';
import { MenuuserComponent } from './components/menuuser/menuuser.component';
import { CrearLibroComponent } from './components/crear-libro/crear-libro.component';
import { EditarLibroComponent } from './components/editar-libro/editar-libro.component';
import { RestService } from './service/rest.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenubarComponent,
    HomeComponent,
    RegisterComponent,
    AlbumComponent,
    MenuuserComponent,
    CrearLibroComponent,
    EditarLibroComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    RestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
