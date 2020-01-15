import { Component, OnInit } from '@angular/core';
import { EstanteService} from '../estante-service/estante.service'

@Component({
  selector: 'app-estantes',
  templateUrl: './estantes.component.html',
  styleUrls: ['./estantes.component.css']
})
export class EstantesComponent implements OnInit {
  estantes : Array<any>;
  estante : any;
  private logado :any;
  private atualPage : number = 1;
  private previosPage: any;
  private nextPage : any;
  private search : any;
  private order : string = "null";

  constructor(private estanteService : EstanteService) { }

  ngOnInit() {
    this.logado = {nome : localStorage.getItem("nome"), super : localStorage.getItem("super"), pk : localStorage.getItem("pk"),
    token : localStorage.getItem("token"), username :  localStorage.getItem("username")}
    this.estante = {espaco_sobrando: '', genero:''};
    this.getEstantes();
  }

  getEstantes(): void {
    if (this.atualPage == 1){
      this.estanteService.getEstantes()
        .subscribe(estantes => {this.estantes = estantes.results, this.nextPage = estantes.next,
        this.previosPage = estantes.previous});
    }
    else{
      this.estanteService.paginatePrateleira(`${this.atualPage}`)
        .subscribe(estantes => {this.estantes = estantes.results,
        this.nextPage = estantes.next, this.previosPage = estantes.previous} );
    }
  }

  addEstante(): void {
    if (this.estante.nome != ''){
      if (this.estante.descricao != ''){
        this.estanteService.addEstante(this.estante)
        .subscribe(generos => this.getEstantes());
      }
      else{
        this.estanteService.log('Campo(s) Vazio(s) não permitido')
      }
    }
    else{
      this.estanteService.log('Campo(s) Vazio(s) não permitido')
    }
  }

  filtrarEstantes(){
    if (this.order == "null" && this.search != null){
      this.estanteService.log("so pesquisa")
      this.estanteService.searchPrateleiras(this.search).subscribe(estantes => this.estantes = estantes.results);
    }
    else if(this.order != "null" && this.search == null){
      if(this.atualPage)
      this.estanteService.log("so ordena")
      this.estanteService.orderPrateleiras(this.order).subscribe(estantes => this.estantes = estantes.results);
    }
    else if(this.order != "null" && this.search != null){
      this.estanteService.log("pesquisa e ordena")
      this.estanteService.orderSearchPrateleiras(this.search, this.order).subscribe(estantes => this.estantes = estantes.results);
    }
    else{
      this.getEstantes()
    }
  }

  next():void{
    this.atualPage += 1;
    this.getEstantes()
  }
  
  previous():void{
    this.atualPage -= 1;
    this.getEstantes()
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
