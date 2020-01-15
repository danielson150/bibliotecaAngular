import { Injectable } from '@angular/core';
import { MessageService } from '../message-service/message.service'
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  
  private generoUrl : string = 'http://localhost:8000/generos/';
  private generoSearchUrl : string = 'http://localhost:8000/generos/?search=';
  private generoOrderUrl : string = 'http://localhost:8000/generos/?ordering=';
  private searchorderUrl : string = '&search='
  private paginateUrl : string = '?page='
  
  constructor(private http: HttpClient, private messageService: MessageService,){
  }

  paginateGenero(pagina: string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.generoUrl}${this.paginateUrl}${pagina}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    })
  }

  searchGeneros(parametro : string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.generoSearchUrl}${parametro}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      tap(_ => this.log('fetched generos')),
      catchError(this.handleError<Array<any>>('getGeneros', []))
    );
  }
 
  orderGeneros(parametro : string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.generoOrderUrl}${parametro}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      catchError(this.handleError<Array<any>>('Erro ao busca livros', []))
    );
  }
  
  orderSearchGeneros(parametroSearch : string, parametroOrder : string) : Observable<any> {
    return this.http.get<Array<any>>(`${this.generoOrderUrl}${parametroOrder}${this.searchorderUrl}${parametroSearch}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      catchError(this.handleError<Array<any>>('Erro ao busca esta livros', []))
    );
  }

  getGeneros(): Observable<any> {
    if (localStorage.getItem("username") != null){
      return this.http.get<Array<any>>(this.generoUrl, {
        headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
      }).pipe(
        catchError(this.handleError<Array<any>>('getGeneros', []))
      );
    }
    else{
      return this.http.get<Array<any>>(this.generoUrl, {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }).pipe(
        catchError(this.handleError<Array<any>>('getGeneros', []))
      );
    }
  }

  getGenero(pk: number): Observable<any> {
    return this.http.get<any>(`${this.generoUrl}${pk}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      catchError(this.handleError<any>(`getGenero id=${pk}`))
    );
  }

  updateGenero(genero: any): Observable<any> {
    return this.http.put( `${this.generoUrl}${genero.pk}`, genero, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      tap(_ => this.log(`updated genero id=${genero.pk}`)),
      catchError(this.handleError<any>('updateGenero'))
    );
  }

  addGenero(genero: any): Observable<any> {
    return this.http.post<Array<any>>(this.generoUrl, genero, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      tap((newGenero: any) => this.log(`added genero w/ id=${newGenero.pk}`)),
      catchError(this.handleError<any>('addGenero'))
    );
  }

  delGenero(pk: number){
    return this.http.delete<any>(`${this.generoUrl}${pk}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`})
    }).pipe(
      tap(_ => this.log(`deleted genero id=${pk}`)),
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
