import { Injectable } from '@angular/core';
import { MessageService } from '../message-service/message.service'
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { catchError, map, tap, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loginUrl : string = 'http://localhost:8000/login/'
  private logadoUrl : string = 'http://localhost:8000/usuario-logado/'
  private usersUrl : string = 'http://localhost:8000/usuarios/';
  private userSearch : string = 'http://localhost:8000/usuarios/?search='
  private userOrderUrl : string ='http://localhost:8000/usuarios/?ordering='
  private searchorderUrl : string = '&search='
  private paginateUrl : string = '?page='
  
  constructor(private http: HttpClient, private messageService: MessageService,){
  }

  paginateUser(pagina: string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.usersUrl}${this.paginateUrl}${pagina}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      catchError(this.handleError<Array<any>>('Erro ao busca usúarios', []))
    );
  }

  searchUsuarios(parametro : string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.userSearch}${parametro}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      catchError(this.handleError<Array<any>>('Erro ao busca usúarios', []))
    );
  }
 
  orderUsuarios(parametro : string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.userOrderUrl}${parametro}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      catchError(this.handleError<Array<any>>('Erro ao busca usúarios', []))
    );
  }
  
  orderSearchUsuarios(parametroSearch : string, parametroOrder : string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.userOrderUrl}${parametroOrder}${this.searchorderUrl}${parametroSearch}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      catchError(this.handleError<Array<any>>('Erro ao busca usúarios', []))
    );
  }

  loginUser(nome : string, senha : string): Observable<any> {
    return this.http.post<Array<any>>(this.loginUrl, {username : nome, password : senha}, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    })
      .pipe(
        tap(_ => this.log('Logado com Sucesso')),
        catchError(this.handleError<any>('Campos incorretos'))
      );
  }
  
  logadoUser(): Observable<any> {
    return this.http.get<Array<any>>(this.logadoUrl, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    })
  }
  
  getUsers(): Observable<any> {
    return this.http.get<Array<any>>(this.usersUrl, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
      }).pipe(
      catchError(this.handleError<Array<any>>('Erro ao busca usúarios', []))
    );
  }

  getUser(pk: number): Observable<any> {
    return this.http.get<any>(`${this.usersUrl}${pk}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      catchError(this.handleError<any>('Erro ao buscar usuário'))
    );
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.usersUrl}${user.pk}`, user, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      tap(_ => this.log('Usuário atualizado')),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  addUser(user: any): Observable<any> {
    return this.http.post<Array<any>>(this.usersUrl, user, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }).pipe(
      tap((newUser: any) => this.log('Usúario Criado com sucesso')),
      catchError(this.handleError<any>('addUser'))
    );
  }

  delUser(pk: number){
    return this.http.delete<any>(`${this.usersUrl}${pk}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      tap(_ => this.log('Usuário Deletado')),
      catchError(this.handleError<any>('delUser'))
    );
  }
  
  log(message: string) {
    this.messageService.add(`${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.log(error);
      
      this.log(`${operation}`);

      return of(result as T);
    };
  }

}
