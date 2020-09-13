import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'app/entities/cliente/cliente.service';
import { TratamientoService } from 'app/entities/tratamiento/tratamiento.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ITratamientoCliente, TratamientoCliente } from 'app/shared/model/tratamiento-cliente.model';
import { ITratamiento } from 'app/shared/model/tratamiento.model';
import { Observable } from 'rxjs';
import { TratamientoClienteService } from './tratamiento-cliente.service';

type SelectableEntity = ITratamiento | ICliente;

@Component({
  selector: 'jhi-tratamiento-cliente-update',
  templateUrl: './tratamiento-cliente-update.component.html'
})
export class TratamientoClienteUpdateComponent implements OnInit {
  isSaving = false;
  tratamientos: ITratamiento[] = [];
  clientes: ICliente[] = [];
  cliente: ICliente = {};

  editForm = this.fb.group({
    id: [],
    numSesiones: [],
    diagnostico: [],
    precioSesion: [],
    expediente: [],
    tratamiento: [],
    cliente: []
  });

  constructor(
    protected tratamientoClienteService: TratamientoClienteService,
    protected tratamientoService: TratamientoService,
    protected clienteService: ClienteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tratamientoCliente }) => {
      this.tratamientoService.query().subscribe((res: HttpResponse<ITratamiento[]>) => (this.tratamientos = res.body || []));

      this.clienteService.query().subscribe((res: HttpResponse<ICliente[]>) => {
        this.clientes = res.body || [];
        this.updateForm(tratamientoCliente);
      });
    });
  }

  updateForm(tratamientoCliente: ITratamientoCliente): void {
    const clienteSel = this.clientes.find(p => {
      return p.id + '' === tratamientoCliente?.cliente?.id + '';
    });
    if (clienteSel != null) {
      this.cliente = clienteSel;
    }
    this.editForm.patchValue({
      id: tratamientoCliente.id,
      numSesiones: tratamientoCliente.numSesiones,
      diagnostico: tratamientoCliente.diagnostico,
      precioSesion: tratamientoCliente.precioSesion,
      expediente: tratamientoCliente.expediente,
      tratamiento: tratamientoCliente.tratamiento,
      cliente: clienteSel
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tratamientoCliente = this.createFromForm();
    if (tratamientoCliente.id !== undefined) {
      this.subscribeToSaveResponse(this.tratamientoClienteService.update(tratamientoCliente));
    } else {
      this.subscribeToSaveResponse(this.tratamientoClienteService.create(tratamientoCliente));
    }
  }

  private createFromForm(): ITratamientoCliente {
    return {
      ...new TratamientoCliente(),
      id: this.editForm.get(['id'])!.value,
      numSesiones: this.editForm.get(['numSesiones'])!.value,
      diagnostico: this.editForm.get(['diagnostico'])!.value,
      precioSesion: this.editForm.get(['precioSesion'])!.value,
      expediente: this.editForm.get(['expediente'])!.value,
      tratamiento: this.editForm.get(['tratamiento'])!.value,
      cliente: this.editForm.get(['cliente'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITratamientoCliente>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  public trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  public changeTratamiento(): void {
    const value = this.editForm.get(['tratamiento'])!.value;
    if (value != null) {
      this.tratamientoService.find(value.id).subscribe((data: any) => {
        const trat = new TratamientoCliente();
        trat.tratamiento = this.editForm.get(['tratamiento'])!.value;
        trat.numSesiones = data.body.numSesiones;
        trat.diagnostico = data.body.nombre;
        trat.expediente = this.editForm.get(['expediente'])!.value;
        trat.precioSesion = this.editForm.get(['precioSesion'])!.value;
        trat.cliente = this.cliente;

        this.updateForm(trat);
      });
    } else {
      const trat = new TratamientoCliente();
      this.updateForm(trat);
    }
  }
}
