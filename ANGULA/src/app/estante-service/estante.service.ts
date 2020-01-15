import { Injectable } from '@angular/core';
import { MessageService } from '../message-service/message.service';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstanteService {
  
  private estantesUrl : string = 'http://localhost:8000/estantes/';
  private estanteSearch : string = 'http://localhost:8000/estantes/?search=';
  private estanteOrderUrl : string ='http://localhost:8000/estantes/?ordering=';
  private searchorderUrl : string = '&search=';
  private paginateUrl : string = '?page=';
  
  constructor(private http: HttpClient, private messageService: MessageService,){
  }

  paginatePrateleira(pagina: string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.estantesUrl}${this.paginateUrl}${pagina}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    })
  }

  searchPrateleiras(parametro : string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.estanteSearch}${parametro}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      catchError(this.handleError<Array<any>>('Erro ao busca estantes', []))
    );
  }
 
  orderPrateleiras(parametro : string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.estanteOrderUrl}${parametro}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      catchError(this.handleError<Array<any>>('Erro ao busca estantes', []))
    );
  }
  
  orderSearchPrateleiras(parametroSearch : string, parametroOrder : string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.estanteOrderUrl}${parametroOrder}${this.searchorderUrl}${parametroSearch}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      catchError(this.handleError<Array<any>>('Erro ao busca estantes', []))
    );
  }

  getEstantes(): Observable<any> {
    if (localStorage.getItem("username") != null){
      return this.http.get<Array<any>>(this.estantesUrl, {
        headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
      }).pipe(
        tap(_ => this.log('fetched estantes')),
        catchError(this.handleError<Array<any>>('getEstantes', []))
      );
    }
    else{
      return this.http.get<Array<any>>(this.estantesUrl, {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }).pipe(
        tap(_ => this.log('fetched estantes')),
        catchError(this.handleError<Array<any>>('getEstantes', []))
      );
    }
  }

  getEstante(pk: number): Observable<any> {
    return this.http.get<Array<any>>(`${this.estantesUrl}${pk}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      tap(_ => this.log(`fetched estante id=${pk}`)),
      catchError(this.handleError<any>(`getEstante id=${pk}`))
    );
  }

  updateEstante(estante: any): Observable<any> {
    return this.http.put(`${this.estantesUrl}${estante.pk}`, estante, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      tap(_ => this.log(`updated estante id=${estante.pk}`)),
      catchError(this.handleError<any>('updateEstante'))
    );
  }

  addEstante(estante: any): Observable<any> {
    return this.http.post<Array<any>>(this.estantesUrl, estante, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      tap((newGenero: any) => this.log(`added estante w/ id=${newGenero.pk}`)),
      catchError(this.handleError<any>('addEstante'))
    );
  }

  delEstante(pk: number){
    return this.http.delete<any>(`${this.estantesUrl}${pk}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      tap(_ => this.log(`deleted estante id=${pk}`)),
      catchError(this.handleError<any>('deleteGenero'))
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
