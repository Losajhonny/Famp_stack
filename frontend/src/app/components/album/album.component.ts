import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/service/rest.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  messageOk = null;
  messageErr = null;

  no_disponible = "https://dynamicmediainstitute.org/wp-content/themes/dynamic-media-institute/imagery/default-book.png";

  libros = [
    { nombre: "nombre", descripcion: "descripcion", precio: 20.95, imagen: "https://yarkozzz.files.wordpress.com/2015/03/random_tech_266.jpg" },
    { nombre: "nombre", descripcion: "descripcion", precio: 20.95, imagen: "https://yarkozzz.files.wordpress.com/2015/03/random_tech_266.jpg" },
    { nombre: "nombre", descripcion: "descripcion", precio: 20.95, imagen: "https://yarkozzz.files.wordpress.com/2015/03/random_tech_266.jpg" },
    { nombre: "nombre", descripcion: "descripcion", precio: 20.95, imagen: "https://yarkozzz.files.wordpress.com/2015/03/random_tech_266.jpg" },
    { nombre: "nombre", descripcion: "descripcion", precio: 20.95, imagen: "https://yarkozzz.files.wordpress.com/2015/03/random_tech_266.jpg" },
    { nombre: "nombre", descripcion: "descripcion", precio: 20.95, imagen: "https://yarkozzz.files.wordpress.com/2015/03/random_tech_266.jpg" },
    { nombre: "nombre", descripcion: "descripcion", precio: 20.95, imagen: "https://yarkozzz.files.wordpress.com/2015/03/random_tech_266.jpg" },
    { nombre: "nombre", descripcion: "descripcion", precio: 20.95, imagen: "https://yarkozzz.files.wordpress.com/2015/03/random_tech_266.jpg" },
  ];

  constructor(private rest: RestService, private route: Router) { }

  ngOnInit(): void {
    this.getLibros();
  }

  async getLibros() {
    var res = await this.rest.GetRequest('listOfBooks').toPromise();
    this.libros = res.data;
  }

  async eliminar(i: any) {
    var libro: any = this.libros[i];
    try {
      var res = await this.rest.DeleteRequest('deleteBook/' + libro._id.$oid).toPromise();
      this.messageOk = res.message;
      this.getLibros();
    } catch (error: any) {
      this.messageErr = error.error.message;
    }
  }

  editar(i: any) {
    var libro: any = this.libros[i];
    sessionStorage.setItem('id', libro._id.$oid);
    this.route.navigate(["libroEdit"]);
  }

  cerrarAlert1() {
    this.messageOk = null;
  }

  cerrarAlert2() {
    this.messageErr = null;
  }
}
