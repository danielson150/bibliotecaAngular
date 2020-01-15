import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service/user.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private usuarios : Array<any>;
  private user : any;
  private criar : boolean = false;
  private logado :any;
  private atualPage : number = 1;
  private previosPage: any;
  private nextPage : any;
  private search : any;
  private order : string = "null";


  constructor(private userService : UserService) { }

  ngOnInit() {
    this.logado = {nome : localStorage.getItem("nome"), super : localStorage.getItem("super"), pk : localStorage.getItem("pk"),
    token : localStorage.getItem("token"), username :  localStorage.getItem("username")}
    this.user = {email : '', username: '', first_name: '', password : ''};
    if (localStorage.getItem("super")=="true"){
      this.getUsers()}
  }

  loginUser() : void{
    this.userService.loginUser(this.user.username, this.user.password)
      .subscribe(login => {localStorage.setItem("token", login.access), this.getDadosUser()});
  }

  getDadosUser(): void{
    var token : any;
    this.userService.logadoUser().subscribe(logado => {localStorage.setItem("username", logado.results[0].username),
      localStorage.setItem("super", logado.results[0].is_superuser), localStorage.setItem("nome",logado.results[0].first_name),
      localStorage.setItem("pk",logado.results[0].pk), localStorage.setItem("ativo",logado.results[0].is_active), window.location.reload()}, erro => localStorage.removeItem("token"))
  }

  getUsers(): void {
    if (this.atualPage == 1){
      this.userService.getUsers()
        .subscribe(usuarios => {this.usuarios = usuarios.results, this.nextPage = usuarios.next,
          this.previosPage = usuarios.previous} );
    }
    else{
      this.userService.paginateUser(`${this.atualPage}`).subscribe(usuarios =>  {this.usuarios = usuarios.results,
      this.nextPage = usuarios.next, this.previosPage = usuarios.previous} );
    }
  }

  addUser(): void {
    if (this.user.username != ''){
      if (this.user.password != ''){
        if (this.user.first_name != ''){
          this.userService.addUser(this.user)
            .subscribe(generos => this.getUsers());
        }
        else{
          this.userService.log('Campo(s) Vazio(s) não permitido')
        }
      }
      else{
        this.userService.log('Campo(s) Vazio(s) não permitido')
      }
    }
    else{
      this.userService.log('Campo(s) Vazio(s) não permitido')
    }
    window.location.reload()
  }

  filtrarUsers(){
    if (this.order == "null" && this.search != null){
      this.userService.log("so pesquisa")
      this.userService.searchUsuarios(this.search).subscribe(usuarios => this.usuarios = usuarios.results);
    }
    else if(this.order != "null" && this.search == null){
      if(this.atualPage)
      this.userService.log("so ordena")
      this.userService.orderUsuarios(this.order).subscribe(usuarios => this.usuarios = usuarios.results);
    }
    else if(this.order != "null" && this.search != null){
      this.userService.log("pesquisa e ordena")
      this.userService.orderSearchUsuarios(this.search, this.order).subscribe(usuarios => this.usuarios = usuarios.results);
    }
    else{
      this.getUsers()
    }
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

  criarUser() : void{
    this.criar = true
  }

  logarUser() : void{
    this.criar = false
  }

  next():void{
    this.atualPage += 1;
    this.getUsers()
  }
  
  previous():void{
    this.atualPage -= 1;
    this.getUsers()
  }

}
