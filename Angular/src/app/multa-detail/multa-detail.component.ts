import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MultaService } from '../multa-service/multa.service'
    

@Component({
  selector: 'app-multa-detail',
  templateUrl: './multa-detail.component.html',
  styleUrls: ['./multa-detail.component.css']
})
export class MultaDetailComponent implements OnInit {

  private multa: any;
  private logado :any;
  private pk = +this.route.snapshot.paramMap.get('pk');
  
  constructor(
    private route: ActivatedRoute,
    private multaService: MultaService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.logado = {pk : localStorage.getItem("pk"), super : localStorage.getItem("super")}
    this.multa = {usuario: '', valor: '', data_pagar : '', pagar : ''}
    this.getMulta();
  }
  
  getMulta(): void {
    const pk = +this.route.snapshot.paramMap.get('pk');
    if (pk != 0){
      this.multaService.getMulta(pk)
        .subscribe(multa => this.multa = multa);
    }
  }

  updateMulta(): void {
    this.multaService.updateMulta(this.multa)
      .subscribe(() => this.getMulta());
  }

  deleteMulta(): void {
    this.multaService.delMulta(this.pk)
      .subscribe(emprestimo => this.goBack())
  }

  goBack(): void {
    this.location.back();
  }
}
