import { Component, OnInit } from '@angular/core';
import { LivroService } from '../livro-service/livro.service'

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent implements OnInit {
  private livros : Array<any>;
  private livro : any;
  private logado :any;
  private atualPage : number = 1
  private previosPage: any;
  private nextPage : any;
  private search : any;
  private order : string = "null";

  constructor(private livroService : LivroService) { }

  ngOnInit() {
    this.logado = {nome : localStorage.getItem("nome"), super : localStorage.getItem("super"), pk : localStorage.getItem("pk"),
    token : localStorage.getItem("token"), username :  localStorage.getItem("username")}
    this.livro = {titulo: '', genero: '', autor: '', editora: '', ano_lancamento: '', quantidade: ''};
    this.getLivros();
  }

  getLivros(): void {
    if (this.atualPage == 1){
      this.livroService.getLivros()
        .subscribe(livros => {this.livros = livros.results, this.nextPage = livros.next,
        this.previosPage = livros.previous});
    }
    else{
      this.livroService.paginateLivro(`${this.atualPage}`)
        .subscribe(livros => {this.livros = livros.results,
        this.nextPage = livros.next, this.previosPage = livros.previous} );
    }
  }

  addLivro(): void {
    if (this.livro.titulo != ''){
      if (this.livro.genero != ''){
        this.livroService.addLivro(this.livro)
        .subscribe(generos => this.getLivros());
      }
      else{
        this.livroService.log('Campo(s) Vazio(s) não permitido')
      }
    }
    else{
      this.livroService.log('Campo(s) Vazio(s) não permitido')
    }
  }

  filtrarLivros(){
    if (this.order == "null" && this.search != null){
      this.livroService.log("so pesquisa")
      this.livroService.searchLivros(this.search).subscribe(livros => this.livros = livros.results);
    }
    else if(this.order != "null" && this.search == null){
      if(this.atualPage)
      this.livroService.log("so ordena")
      this.livroService.orderLivros(this.order).subscribe(livros => this.livros = livros.results);
    }
    else if(this.order != "null" && this.search != null){
      this.livroService.log("pesquisa e ordena")
      this.livroService.orderSearchLivros(this.search, this.order).subscribe(livros => this.livros = livros.results);
    }
    else{
      this.getLivros()
    }
  }

  next():void{
    this.atualPage += 1;
    this.getLivros()
  }
  
  previous():void{
    this.atualPage -= 1;
    this.getLivros()
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
