import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'app/shared/model/cliente.model';
import { SharedService } from 'app/shared/shared.service';

@Component({
  selector: 'jhi-edicion-cliente',
  templateUrl: './edicion-cliente.component.html'
})
export class EdicionClienteComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  public tabActive = 0;
  constructor(protected activatedRoute: ActivatedRoute, protected sharedService: SharedService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cliente }) => {
      if (cliente != null && cliente.id != null) {
        this.cliente = cliente;
      }
    });
    this.tabActive = this.sharedService.tabActive;
  }

  changeTab(): void {
    this.sharedService.tabActive = this.tabActive;
  }
}
