import { Injectable } from '@angular/core';
import { MessageService } from '../message-service/message.service'
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrateleiraService {
  
  private prateleirasUrl : string = 'http://localhost:8000/prateleiras/';
  private prateleiraSearch : string = 'http://localhost:8000/prateleiras/?search='
  private prateleiraOrderUrl : string ='http://localhost:8000/prateleiras/?ordering='
  private searchorderUrl : string = '&search='
  private paginateUrl : string = '?page='
  
  constructor(private http: HttpClient, private messageService: MessageService,){
  }

  paginatePrateleira(pagina: string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.prateleirasUrl}${this.paginateUrl}${pagina}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    })
  }

  searchPrateleiras(parametro : string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.prateleiraSearch}${parametro}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      catchError(this.handleError<Array<any>>('Erro ao busca prateleiras', []))
    );
  }
 
  orderPrateleiras(parametro : string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.prateleiraOrderUrl}${parametro}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      catchError(this.handleError<Array<any>>('Erro ao busca prateleiras', []))
    );
  }
  
  orderSearchPrateleiras(parametroSearch : string, parametroOrder : string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.prateleiraOrderUrl}${parametroOrder}${this.searchorderUrl}${parametroSearch}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      catchError(this.handleError<Array<any>>('Erro ao busca prateleiras', []))
    );
  }

  getPrateleiras(): Observable<any> {
    if (localStorage.getItem("username") != null){
      return this.http.get<Array<any>>(this.prateleirasUrl, {
        headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
      }).pipe(
        catchError(this.handleError<Array<any>>('getPrateleiras', []))
      );
    }
    else{
      return this.http.get<Array<any>>(this.prateleirasUrl, {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }).pipe(
        catchError(this.handleError<Array<any>>('getPrateleiras', []))
      );
    }
  }

  getPrateleira(pk: number): Observable<any> {
    return this.http.get<Array<any>>(`${this.prateleirasUrl}${pk}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      catchError(this.handleError<any>(`getPrateleira id=${pk}`))
    );
  }

  updatePrateleira(prateleira: any): Observable<any> {
    return this.http.put(`${this.prateleirasUrl}${prateleira.pk}`, prateleira, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      tap(_ => this.log(`updated prateleira id=${prateleira.pk}`)),
      catchError(this.handleError<any>('updatePrateleira'))
    );
  }

  addPrateleira(prateleira: any): Observable<any> {
    return this.http.post<Array<any>>(this.prateleirasUrl, prateleira, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      tap((newPrateleira: any) => this.log(`added prateleira w/ id=${newPrateleira.pk}`)),
      catchError(this.handleError<any>('addPrateleira'))
    );
  }

  delPrateleira(pk: number){
    return this.http.delete<any>(`${this.prateleirasUrl}${pk}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      tap(_ => this.log(`deleted prateleira id=${pk}`)),
      catchError(this.handleError<any>('delPrateleira'))
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
