import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PrateleiraService} from '../prateleira-service/prateleira.service'

@Component({
  selector: 'app-prateleira-detail',
  templateUrl: './prateleira-detail.component.html',
  styleUrls: ['./prateleira-detail.component.css']
})
export class PrateleiraDetailComponent implements OnInit {
 prateleira : any;
  
  constructor(
    private route: ActivatedRoute,
    private prateleiraService: PrateleiraService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.prateleira = {
      posicao: '',
      estante: ''
    };
    this.getPrateleira();
  }
  
  getPrateleira(): void {
    const pk = +this.route.snapshot.paramMap.get('pk');
    if (pk != 0){
      this.prateleiraService.getPrateleira(pk)
        .subscribe(prateleira => this.prateleira = prateleira);
    }
  }

  updatePrateleira(): void {
    this.prateleiraService.updatePrateleira(this.prateleira)
      .subscribe(() => this.getPrateleira());
  }

  deletePrateleira(): void {
    const pk = +this.route.snapshot.paramMap.get('pk')
    this.prateleiraService.delPrateleira(pk)
      .subscribe(prateleira => this.goBack())
  }

  goBack(): void {
    this.location.back();
  }
}
