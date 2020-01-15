import { Component, OnInit } from '@angular/core';
import { PrateleiraService } from '../prateleira-service/prateleira.service'

@Component({
  selector: 'app-prateleiras',
  templateUrl: './prateleiras.component.html',
  styleUrls: ['./prateleiras.component.css']
})
export class PrateleirasComponent implements OnInit {
  private prateleiras : Array<any>;
  private prateleira : any;
  private logado :any;
  private atualPage : number = 1;
  private previosPage: any;
  private nextPage : any;
  private search : any;
  private order : string = "null";

  constructor(private prateleirasService : PrateleiraService) { }

  ngOnInit() {
    this.logado = {nome : localStorage.getItem("nome"), super : localStorage.getItem("super"), pk : localStorage.getItem("pk"),
    token : localStorage.getItem("token"), username :  localStorage.getItem("username")}
    this.prateleira = {posicao: '', estante: ''}
    this.getPrateleiras();
  }

  getPrateleiras(): void {
    if (this.atualPage == 1){
      this.prateleirasService.getPrateleiras()
        .subscribe(prateleiras => {this.prateleiras = prateleiras.results, this.nextPage = prateleiras.next,
          this.previosPage = prateleiras.previous} );
    }
    else{
      this.prateleirasService.paginatePrateleira(`${this.atualPage}`)
        .subscribe(prateleiras => {this.prateleiras = prateleiras.results,
        this.nextPage = prateleiras.next, this.previosPage = prateleiras.previous} );
    }
  }

  addPrateleira(): void {
    if (this.prateleira.estante != ''){
      this.prateleirasService.addPrateleira(this.prateleira)
      .subscribe(generos => this.getPrateleiras());
     }
     else{
       this.prateleirasService.log('Campo(s) Vazio(s) não permitido')
     }
  }

  filtrarPrateleiras(){
    if (this.order == "null" && this.search != null){
      this.prateleirasService.log("so pesquisa")
      this.prateleirasService.searchPrateleiras(this.search).subscribe(prateleiras => this.prateleiras = prateleiras.results);
    }
    else if(this.order != "null" && this.search == null){
      if(this.atualPage)
      this.prateleirasService.log("so ordena")
      this.prateleirasService.orderPrateleiras(this.order).subscribe(prateleiras => this.prateleiras = prateleiras.results);
    }
    else if(this.order != "null" && this.search != null){
      this.prateleirasService.log("pesquisa e ordena")
      this.prateleirasService.orderSearchPrateleiras(this.search, this.order).subscribe(prateleiras => this.prateleiras = prateleiras.results);
    }
    else{
      this.getPrateleiras()
    }
  }

  next():void{
    this.atualPage += 1;
    this.getPrateleiras()
  }
  
  previous():void{
    this.atualPage -= 1;
    this.getPrateleiras()
  }

  decrescente() : void{
    if (this.order != "null"){
      this.order = `-${this.order}`;
      this.order = this.order.replace("--","-");
    }
  }
  
  crescente() : void{
    this.order = this.order.replace("-","");
  }

}
