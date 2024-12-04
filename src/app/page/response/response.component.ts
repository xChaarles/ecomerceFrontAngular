import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EpaycoService } from '../../service/epayco.service';
import { OrdenService } from '../../service/orden.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-response',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './response.component.html',
  styleUrl: './response.component.scss'
})
export default class ResponseComponent implements OnInit {

  ref_payco: string | null = '';
  mensaje: any;
  status: any;
  amount: string = '';
  descripcion: string = '';
  transactionDate: string = '';
  respuesta:string;
  numeroOrden:string;
  statusCode:number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ordenService: OrdenService) {}

  ngOnInit(): void {
    this.ref_payco = this.route.snapshot.queryParamMap.get('ref_payco');
      if (this.ref_payco) {
        const token: any = localStorage.getItem('token');

        this.ordenService.validarTransaccion(this.ref_payco, token).subscribe(
          (respuesta) => {
            this.status = respuesta.title_response;
            this.mensaje = respuesta.message || 'Transacción procesada con éxito.';
            console.log('Respuesta del backend:', respuesta);
            this.respuesta = respuesta.data.x_response
            this.transactionDate = respuesta.data.x_fecha_transaccion
            this.numeroOrden = respuesta.data.x_id_invoice;
            this.amount = respuesta.data.x_amount
            this.descripcion = respuesta.data.x_description
            console.log(this.respuesta)

            if (this.status === "Correcto") {
              // Espera 5 segundos antes de confirmar la compra
              setTimeout(() => {
                this.confirmarCompra(); // Llama al método para confirmar la compra
              }, 5000); // 5000 ms = 5 segundos
            }
          },
          (error) => {
            console.error('Error al validar la transacción:', error);
            this.mensaje = 'Error al validar la transacción.';
          }
        );
      } else {
        console.error('No se recibió el parámetro ref_payco.');
        this.mensaje = 'Faltan parámetros para validar la transacción.';
      }
    }

    confirmarCompra(){
      const userId: any = localStorage.getItem('userId');
      const token: any = localStorage.getItem('token');

      if (userId && this.ref_payco) {
        this.ordenService.confirmarCompra(userId, this.ref_payco, token).subscribe(
          (respuesta) => {
            this.statusCode = respuesta.statusCode
            // Redirigir al usuario o mostrar una notificación
          },
          (error) => {
            console.error('Error al confirmar la compra:', error);
            this.mensaje = 'Error al confirmar la compra.';
          }
        );
      } else {
        console.error('Faltan parámetros para confirmar la compra.');
        this.mensaje = 'No se pudo confirmar la compra.';
      }
    }
}
