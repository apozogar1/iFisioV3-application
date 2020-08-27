import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Authority } from 'app/shared/constants/authority.constants';
import { ITratamiento, Tratamiento } from 'app/shared/model/tratamiento.model';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { TratamientoUpdateComponent } from './tratamiento-update.component';
import { TratamientoService } from './tratamiento.service';


@Injectable({ providedIn: 'root' })
export class TratamientoResolve implements Resolve<ITratamiento> {
  constructor(private service: TratamientoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITratamiento> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tratamiento: HttpResponse<Tratamiento>) => {
          if (tratamiento.body) {
            return of(tratamiento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Tratamiento());
  }
}

export const tratamientoRoute: Routes = [
  {
    path: 'clientes/cliente/:idCliente/tratamiento/new',
    component: TratamientoUpdateComponent,
    resolve: {
      tratamiento: TratamientoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iFisioApp.tratamiento.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'clientes/cliente/:idCliente/tratamiento/:id/edit',
    component: TratamientoUpdateComponent,
    resolve: {
      tratamiento: TratamientoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iFisioApp.tratamiento.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
