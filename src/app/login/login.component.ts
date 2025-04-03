import { Component, OnInit } from '@angular/core';
import { Login } from '../models/Login';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [UsuariosService]
})

export class LoginComponent implements OnInit{

  nombre : string = '';
  email : string = '';
  password : string = '';
  mensaje: string = '';
  mensaje2: string = '';

  login : boolean = false;
  registrar : boolean = false;  
  texto : boolean = true;  



  constructor(private _usuariosService: UsuariosService, private _router: Router){
  }

  ngOnInit(): void {      
  }

  reglog(tipo: string) {
    this.texto = false;
    if (tipo === 'login') {
      this.login = true;
      this.registrar = false;
    } else if (tipo === 'registrar') {
      this.registrar = true;
      this.login = false;
    }
  }

  recogerDatos(){

    if (this.registrar) {
      let nuevoUsuario = new Login(0, this.nombre, this.password, this.email);
      
      this._usuariosService.createUsuario(nuevoUsuario).subscribe({
        next: (res) => {
          this.mensaje = "Registro completado con éxito";
          this.registrar = false; 
        },
        error: (err) => {
          console.error("Error al registrar el usuario:", err);
          this.mensaje = "Error en el registro. Inténtalo de nuevo.";
        }
      });
    } else if (this.login) {
      console.log("Realizando login");
    }
  }

  validarUsuario() {

    this._usuariosService.getUsuarios().subscribe({
      next: (usuarios: Login[]) => {
        let usuarioValido = false;
        for (let usuario of usuarios) {
          if (usuario.user === this.nombre && usuario.password === this.password) {
            usuarioValido = true;
            break;
          }
        }
        if (usuarioValido) {
          this.mensaje2 = "Login exitoso, redirigiendo a inicio...";
          sessionStorage.setItem("usuarioLogueado", JSON.stringify({
            nombre: this.nombre
          }));          
          setTimeout(() => {
            this._router.navigate(['/']);
          }, 2000);
        } else {
          this.mensaje2 = "Credenciales incorrectas. Inténtalo de nuevo.";
        }
      },
      error: (err) => {
        console.error("Error al obtener los usuarios:", err);
        this.mensaje2 = "Error en la conexión. Por favor, inténtalo más tarde.";
      }
    });
  }
}