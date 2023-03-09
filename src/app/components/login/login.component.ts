import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  styles: [
    `
    .example-pizza-party {
      color: hotpink;
    }
  `,
  ]
})
export class LoginComponent implements OnInit {
  usuario: any;
  formulario: FormGroup;
  durationInSeconds = 5;

  valLoading:boolean= false;
  
  constructor(private loginServices: UsuariosService,
    private fb: FormBuilder, private rout: Router,
    private _snackBar: MatSnackBar) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      contrasena: ['', Validators.required]
    });

  }

  ngOnInit(): void {
  }

  usuarioIngresando() {
    console.log(this.formulario.value);
    this.loginServices.autentificacionUsuario(this.formulario.value).subscribe(resp => {
      console.log(resp);
      if (resp === true) {
        this.loading();
      } else {
        this.error();
        this.rout.navigate(['']);
        this.formulario.reset();
      }
    })
  }

  loading() {
    this.valLoading = true;
    setTimeout(() => {
      this.rout.navigate(['dashboard']);
    }, 1500)
  }
 
  error() {
    this._snackBar.open("Usuario o Contraseña incorrectos!!!", '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: ['redNoMatch']
    })
  }

}
