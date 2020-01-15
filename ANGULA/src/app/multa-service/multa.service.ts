import { Injectable } from '@angular/core';
import { MessageService } from '../message-service/message.service'
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MultaService {

  private multasUrl : string = 'http://localhost:8000/multas/'
  private multasSearch : string = 'http://localhost:8000/emprestimos/?search='
  private multasOrderUrl : string ='http://localhost:8000/emprestimos/?ordering='
  private searchorderUrl : string = '&search='
  private paginateUrl : string = '?page='
  
  constructor(private http: HttpClient, private messageService: MessageService,){
  }

  paginateMultas(pagina: string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.multasUrl}${this.paginateUrl}${pagina}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    })
  }

  searchMultas(parametro : string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.multasSearch}${parametro}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      catchError(this.handleError<Array<any>>('Erro ao bucar as Multas', []))
    );
  }
 
  orderMultas(parametro : string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.multasOrderUrl}${parametro}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      catchError(this.handleError<Array<any>>('Erro ao bucar as Multas', []))
    );
  }
  
  orderSearchMultas(parametroSearch : string, parametroOrder : string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.multasOrderUrl}${parametroOrder}${this.searchorderUrl}${parametroSearch}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      catchError(this.handleError<Array<any>>('Erro ao bucar as Multas', []))
    );
  }

  getMultas(): Observable<any> {
    return this.http.get<Array<any>>(this.multasUrl, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      tap(_ => this.log('fetched emprestimos')),
      catchError(this.handleError<Array<any>>('Erro ao bucar as Multas', []))
    );
  }

  getMulta(pk: number): Observable<any> {
    return this.http.get<any>(`${this.multasUrl}${pk}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      tap(_ => this.log(`fetched emprestimo id=${pk}`)),
      catchError(this.handleError<any>(`Erro ao buscar a multa`))
    );
  }

  updateMulta(emprestimo: any): Observable<any> { 
    return this.http.put(`${this.multasUrl}${emprestimo.pk}`, emprestimo, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      tap(_ => this.log(`updated emprestimo id=${emprestimo.pk}`)),
      catchError(this.handleError<any>('Erro ao tenta pagar a multa'))
    );
  }

  delMulta (pk: number){
    return this.http.delete<any>(`${this.multasUrl}${pk}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      tap(_ => this.log(`Multa Deletada`)),
      catchError(this.handleError<any>('Erro ao deletar a Multa'))
    );
  }
  
  log(message: string) {
    this.messageService.add(`LivroService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.log(error);
      
      this.log(`${operation}`);

      return of(result as T);
    };
  }

}
