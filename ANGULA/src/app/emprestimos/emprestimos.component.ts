import { Component, OnInit } from '@angular/core';
import { EmprestimoService } from '../emprestimo-service/emprestimo.service';

@Component({
  selector: 'app-emprestimos',
  templateUrl: './emprestimos.component.html',
  styleUrls: ['./emprestimos.component.css']
})
export class EmprestimosComponent implements OnInit {

  private emprestimos : Array<any>;
  private emprestimo : any;
  private logado :any;
  private atualPage : number = 1;
  private previosPage: any;
  private nextPage : any;
  private search : any;
  private order : string = "null";

  constructor(private emprestimoService : EmprestimoService) { };

  ngOnInit() {
    this.logado = {nome : localStorage.getItem("nome"), super : localStorage.getItem("super"), pk : localStorage.getItem("pk"),
    token : localStorage.getItem("token"), username :  localStorage.getItem("username")}
    this.emprestimo = {usuario: '', livro: ''}
    this.getEmprestimos();
  };

  getEmprestimos(): void {
    if (this.atualPage == 1){
      this.emprestimoService.getEmprestimos()
        .subscribe(emprestimos => {this.emprestimos = emprestimos.results, this.nextPage = emprestimos.next,
        this.previosPage = emprestimos.previous});
    }
    else{
      this.emprestimoService.paginateEmprestimo(`${this.atualPage}`)
        .subscribe(emprestimos => {this.emprestimos = emprestimos.results,
        this.nextPage = emprestimos.next, this.previosPage = emprestimos.previous} );
    }
  };

  addEmprestimo(): void {
    if (this.emprestimo.usuario != ''){
      if (this.emprestimo.livro != ''){
        this.emprestimoService.addEmprestimo(this.emprestimo)
        .subscribe(generos => this.getEmprestimos());
      }
      else{
        this.emprestimoService.log('Campo(s) Vazio(s) não permitido');
      }
    }
    else{
      this.emprestimoService.log('Campo(s) Vazio(s) não permitido');
    }
  };

  filtrarEmprestimos(){
    if (this.order == "null" && this.search != null){
      this.emprestimoService.searchEmprestimos(this.search).subscribe(emprestimos => this.emprestimos = emprestimos.results);
    }
    else if(this.order != "null" && this.search == null){
      if(this.atualPage)
      this.emprestimoService.orderEmprestimos(this.order).subscribe(emprestimos => this.emprestimos = emprestimos.results);
    }
    else if(this.order != "null" && this.search != null){
      this.emprestimoService.orderSearchEmprestimos(this.search, this.order).subscribe(emprestimos => this.emprestimos = emprestimos.results);
    }
    else{
      this.getEmprestimos();
    }
  };

  next():void{
    this.atualPage += 1;
    this.getEmprestimos();
  };
  
  previous():void{
    this.atualPage -= 1;
    this.getEmprestimos();
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
