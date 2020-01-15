import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EstanteService } from '../estante-service/estante.service';

@Component({
  selector: 'app-estante-detail',
  templateUrl: './estante-detail.component.html',
  styleUrls: ['./estante-detail.component.css']
})
export class EstanteDetailComponent implements OnInit {
  estante : any;
  
  constructor(
    private route: ActivatedRoute,
    private estanteService: EstanteService,
    private location: Location
  ) {};

  ngOnInit(): void {
    this.estante = {
      genero: ''
    }
    this.getEstante();
  };
  
  getEstante(): void {
    const pk = +this.route.snapshot.paramMap.get('pk');
    if (pk != 0){
      this.estanteService.getEstante(pk)
        .subscribe(estante => this.estante = estante);
    }
  };

  updateEstante(): void {
    this.estanteService.updateEstante(this.estante)
      .subscribe(() => this.getEstante());
  };

  deleteEstante(): void {
    const pk = +this.route.snapshot.paramMap.get('pk')
    this.estanteService.delEstante(pk)
      .subscribe(estante => this.goBack());
  };

  goBack(): void {
    this.location.back();
  };
}
