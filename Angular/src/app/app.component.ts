import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title : string = 'Bem Vindo a Biblioteca';
  private logado :any;

  ngOnInit() {
    this.logado = {nome : localStorage.getItem("nome"), super : localStorage.getItem("super"),pk : localStorage.getItem("pk"),
    token : localStorage.getItem("token"), username :  localStorage.getItem("username")}
  }

  deslogar() : void{
    localStorage.removeItem("nome")
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("super")
    localStorage.removeItem("pk")
    window.location.replace("")
  }
}
