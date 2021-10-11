import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/service/rest.service';

@Component({
  selector: 'app-editar-libro',
  templateUrl: './editar-libro.component.html',
  styleUrls: ['./editar-libro.component.css']
})
export class EditarLibroComponent implements OnInit {

  no_disponible = "https://dynamicmediainstitute.org/wp-content/themes/dynamic-media-institute/imagery/default-book.png";
  imagen: any = null;

  libro = {
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: null
  };

  messageOk = null;
  messageErr = null;

  constructor(private rest: RestService, private route: Router) { }

  ngOnInit(): void {
    this.cargarLibro();
  }

  async cargarLibro() {
    var id = sessionStorage.getItem('id');
    var res = await this.rest.GetRequest('listOfBooks/' + id).toPromise();
    res = res.data;
    this.libro.nombre = res.nombre;
    this.libro.descripcion = res.descripcion;
    this.libro.precio = res.precio;
    this.libro.imagen = res.imagen;
    this.imagen = res.imagen;
  }

  uploadImagen(event: any) {
    if (event.target.files && event.target.files[0]) {
      var file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imagen = reader.result;
      reader.readAsDataURL(file);
    }
  }

  async actualizar() {
    // obtener imagen
    this.libro.imagen = this.imagen;

    var id = sessionStorage.getItem('id');

    try {
      var res = await this.rest.PutRequest('updateBook/' + id, this.libro).toPromise();
      this.messageOk = res.message;
    } catch (error: any) {
      this.messageErr = error.error.message
    }
  }

  cancelar() {
    this.route.navigate(["libros"])
  }

  cerrarAlert1() {
    this.messageOk = null;
  }

  cerrarAlert2() {
    this.messageErr = null;
  }

}
