import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/service/rest.service';

@Component({
  selector: 'app-crear-libro',
  templateUrl: './crear-libro.component.html',
  styleUrls: ['./crear-libro.component.css']
})
export class CrearLibroComponent implements OnInit {

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
  }

  uploadImagen(event: any) {
    if (event.target.files && event.target.files[0]) {
      var file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imagen = reader.result;
      reader.readAsDataURL(file);
    }
  }

  async agregar() {
    // obtener imagen
    this.libro.imagen = this.imagen;
    // mostrar datos
    console.log(this.libro.nombre)
    console.log(this.libro.descripcion)
    console.log(this.libro.precio)

    try {
      // peticion
      // podemos utilizar await o no
      var res = await this.rest.PostRequest("createBook", this.libro).toPromise();
      console.log(res);
      // resetear datos
      this.libro.nombre = "";
      this.libro.descripcion = "";
      this.libro.precio = "";
      this.libro.imagen = null;
      this.imagen = null;
      this.messageOk = res.message;

    } catch(error: any) {
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
