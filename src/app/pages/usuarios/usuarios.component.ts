import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegsitros: number = 0;
  cargando: boolean = true;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuario();

    this._modalUploadService.notificacion
      .subscribe(resp => this.cargarUsuario());
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuario() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.desde)
      .subscribe((resp: any) => {
        // console.log(resp);
        this.totalRegsitros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      });
  }

  cambiarDesde(valor: number) {

    let desde = this.desde + valor;
    console.log(desde);

    if (desde >= this.totalRegsitros) {
      return;
    }

    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuario();
  }

  buscarUsuario(termino: string) {

    if ( termino.length <= 0 ){
     this.cargarUsuario();
     return;
    }

    this._usuarioService.buscarUsuario(termino)

      .subscribe( (usuarios: Usuario[]) => {

        this.usuarios = usuarios;
        this.cargando = false;

      });
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      swal('Error al borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Estás seguro?',
      text: 'Está a punto de borra el usuario ' + usuario.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {

      if (borrar) {

        this._usuarioService.borrarUsuario(usuario._id)
          .subscribe( (borrado: boolean) => {
            this.cargarUsuario();
          });
      } 
    });
  }


  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario( usuario )
      .subscribe();
  }

}
