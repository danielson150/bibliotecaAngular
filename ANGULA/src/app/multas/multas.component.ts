import { Component, OnInit } from '@angular/core';
import { MultaService } from '../multa-service/multa.service';

@Component({
  selector: 'app-multas',
  templateUrl: './multas.component.html',
  styleUrls: ['./multas.component.css']
})
export class MultasComponent implements OnInit {
  private multas : any;
  private logado : any;
  private atualPage : number = 1;
  private previosPage: any;
  private nextPage : any;
  private search : any;
  private order : string = "null";

  constructor(private emprestimoService : MultaService) { }

  ngOnInit() {
    this.logado = {nome : localStorage.getItem("nome"), super : localStorage.getItem("super"), pk : localStorage.getItem("pk"),
    token : localStorage.getItem("token"), username :  localStorage.getItem("username")}
    this.getMultas();
  }

  getMultas(): void {
    if (this.atualPage == 1){
      this.emprestimoService.getMultas()
        .subscribe(emprestimos => {this.multas = emprestimos.results, this.nextPage = emprestimos.next,
        this.previosPage = emprestimos.previous});
    }
    else{
      this.emprestimoService.paginateMultas(`${this.atualPage}`)
        .subscribe(emprestimos => {this.multas = emprestimos.results,
        this.nextPage = emprestimos.next, this.previosPage = emprestimos.previous} );
    }
  }

  filtrarMultas(){
    if (this.order == "null" && this.search != null){
      this.emprestimoService.log("so pesquisa")
      this.emprestimoService.searchMultas(this.search).subscribe(emprestimos => this.multas = emprestimos.results);
    }
    else if(this.order != "null" && this.search == null){
      if(this.atualPage)
      this.emprestimoService.log("so ordena")
      this.emprestimoService.orderMultas(this.order).subscribe(emprestimos => this.multas = emprestimos.results);
    }
    else if(this.order != "null" && this.search != null){
      this.emprestimoService.log("pesquisa e ordena")
      this.emprestimoService.orderSearchMultas(this.search, this.order).subscribe(emprestimos => this.multas = emprestimos.results);
    }
    else{
      this.getMultas()
    }
  }

  next():void{
    this.atualPage += 1;
    this.getMultas()
  }
  
  previous():void{
    this.atualPage -= 1;
    this.getMultas()
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