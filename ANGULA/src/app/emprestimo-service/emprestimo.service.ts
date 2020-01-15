import { Injectable } from '@angular/core';
import { MessageService } from '../message-service/message.service';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {

  private emprestimoUrl : string = 'http://localhost:8000/emprestimos/';
  private emprestimoCreateUrl : string = 'http://localhost:8000/emprestimos-create/';
  private emprestimosSearch : string = 'http://localhost:8000/emprestimos/?search=';
  private emprestimosOrderUrl : string ='http://localhost:8000/emprestimos/?ordering=';
  private searchorderUrl : string = '&search=';
  private paginateUrl : string = '?page=';
  
  constructor(private http: HttpClient, private messageService: MessageService,){
  };

  paginateEmprestimo(pagina: string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.emprestimoUrl}${this.paginateUrl}${pagina}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    });
  };

  searchEmprestimos(parametro : string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.emprestimosSearch}${parametro}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      catchError(this.handleError<Array<any>>('Erro ao busca emprestimos', []))
    );
  };
 
  orderEmprestimos(parametro : string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.emprestimosOrderUrl}${parametro}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      catchError(this.handleError<Array<any>>('Erro ao busca emprestimos', []))
    );
  };
  
  orderSearchEmprestimos(parametroSearch : string, parametroOrder : string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.emprestimosOrderUrl}${parametroOrder}${this.searchorderUrl}${parametroSearch}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      catchError(this.handleError<Array<any>>('Erro ao busca esta emprestimos', []))
    );
  };

  getEmprestimos(): Observable<any> {
    return this.http.get<Array<any>>(this.emprestimoUrl, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      catchError(this.handleError<Array<any>>('Erro ao buscar Emprestimos', []))
    );
  };

  getEmprestimo(pk: number): Observable<any> {
    return this.http.get<any>(`${this.emprestimoUrl}${pk}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      catchError(this.handleError<any>('Erro ao buscar Emprestimo'))
    );
  };

  updateEmprestimo(emprestimo: any): Observable<any> { 
    return this.http.put(`${this.emprestimoUrl}${emprestimo.pk}`, emprestimo, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      tap((newEmprestimo: any) => this.log('Emprestimo Atualizado')),
      catchError(this.handleError<any>('Erro ao atualizar Emprestimo'))
    );
  };

  addEmprestimo (emprestimo: any): Observable<any> {
    return this.http.post<Array<any>>(this.emprestimoCreateUrl, emprestimo, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      tap((newEmprestimo: any) => this.log('Emprestimo Adicionado')),
      catchError(this.handleError<any>('Erro ao adicionar Emprestimo'))
    );
  };

  delEmprestimo (pk: number){
    return this.http.delete<any>(`${this.emprestimoUrl}${pk}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      tap(_ => this.log('Emprestimo Deletado')),
      catchError(this.handleError<any>('Erro ao deletar Emprestimo'))
    );
  };
  
  log(message: string) {
    this.messageService.add(`LivroService: ${message}`);
  };

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.log(error);
      
      this.log(`${operation}`);

      return of(result as T);
    };
  };

};
