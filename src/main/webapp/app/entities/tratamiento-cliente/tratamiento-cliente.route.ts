import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Authority } from 'app/shared/constants/authority.constants';
import { ITratamientoCliente, TratamientoCliente } from 'app/shared/model/tratamiento-cliente.model';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { TratamientoClienteUpdateComponent } from './tratamiento-cliente-update.component';
import { TratamientoClienteService } from './tratamiento-cliente.service';


@Injectable({ providedIn: 'root' })
export class TratamientoClienteResolve implements Resolve<ITratamientoCliente> {
  constructor(private service: TratamientoClienteService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITratamientoCliente> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tratamientoCliente: HttpResponse<TratamientoCliente>) => {
          if (tratamientoCliente.body) {
            return of(tratamientoCliente.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TratamientoCliente());
  }
}

export const tratamientoClienteRoute: Routes = [
  {
    path: 'clientes/cliente/:idCliente/tratamientoCliente/new',
    component: TratamientoClienteUpdateComponent,
    resolve: {
      tratamientoCliente: TratamientoClienteResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iFisioApp.tratamientoCliente.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'clientes/cliente/:idCliente/tratamientoCliente/:id/edit',
    component: TratamientoClienteUpdateComponent,
    resolve: {
      tratamientoCliente: TratamientoClienteResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iFisioApp.tratamientoCliente.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
