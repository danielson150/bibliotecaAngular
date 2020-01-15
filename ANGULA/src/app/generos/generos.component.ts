import { GeneroService } from '../genero-service/genero.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generos',
  templateUrl: './generos.component.html',
  styleUrls: ['./generos.component.css']
})
export class GenerosComponent implements OnInit {
  private generos : Array<any>;
  private genero : any;
  private logado :any;
  private atualPage : number = 1;
  private previosPage: any;
  private nextPage : any;
  private search : any;
  private order : string = "null";

  constructor(private generoService : GeneroService) { }

  ngOnInit() {
    this.logado = {nome : localStorage.getItem("nome"), super : localStorage.getItem("super"), pk : localStorage.getItem("pk"),
    token : localStorage.getItem("token"), username :  localStorage.getItem("username")}
    this.genero = {nome: '', descricao: ''};
    this.getGeneros();
  }

  getGeneros(): void {
    if (this.atualPage == 1){
      this.generoService.getGeneros()
        .subscribe(generos => {this.generos = generos.results, this.nextPage = generos.next,
        this.previosPage = generos.previous});
    }
    else{
      this.generoService.paginateGenero(`${this.atualPage}`)
        .subscribe(generos => {this.generos = generos.results,
        this.nextPage = generos.next, this.previosPage = generos.previous} );
    }
  }

  addGenero(): void {
    if (this.genero.nome != ''){
      if (this.genero.descricao != ''){
        this.generoService.addGenero(this.genero)
        .subscribe(generos => this.getGeneros());
      }
      else{
        this.generoService.log('Campo(s) Vazio(s) não permitido')
      }
    }
    else{
      this.generoService.log('Campo(s) Vazio(s) não permitido')
    }
  }

  filtrarGeneros() : void{
    if (this.order == "null" && this.search != null){
      this.generoService.log("so pesquisa")
      this.generoService.searchGeneros(this.search).subscribe(generos => this.generos = generos.results);
    }
    else if(this.order != "null" && this.search == null){
      if(this.atualPage)
      this.generoService.log("so ordena")
      this.generoService.orderGeneros(this.order).subscribe(generos => this.generos = generos.results);
    }
    else if(this.order != "null" && this.search != null){
      this.generoService.log("pesquisa e ordena")
      this.generoService.orderSearchGeneros(this.search, this.order).subscribe(generos => this.generos = generos.results);
    }
    else{
      this.getGeneros()
    }
  }

  next():void{
    this.atualPage += 1;
    this.getGeneros()
  }
  
  previous():void{
    this.atualPage -= 1;
    this.getGeneros()
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
