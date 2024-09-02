import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  handleError(error: HttpErrorResponse) {
    let errorMsg = 'Error desconocido!';

    if (error.status === 400) {
      // Errores de cliente, como formato de ID inválido
      errorMsg = 'Formato inválido.';
    } else if (error.status === 404) {
      // El ID no existe en la base de datos
      errorMsg = 'Publisher no encontrado.';
    } else if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMsg = `Ha ocurrido un error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMsg = `Error de servidor: ${error.message}`;
    }
    return throwError(() => new Error(errorMsg));
  }
}
