import { Injectable } from '@angular/core';
import { Hero } from './models/serviceResponse.model';
import mockHeroData from '../../assets/mock-heroes.json';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private allHeroes: Hero[] = [];
  private heroesUrl = `api/heroes`;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient, private messageService: MessageService) { 
    this.fetchData().subscribe(x => {
      this.allHeroes = x;
      this.log("Received all heroes");
  });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  log = (message: string) => {
    this.messageService.add(`HeroesService: ${message}`);
  }

  fetchData = () => {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log("Requested all heroes")),
      catchError(this.handleError<Hero[]>('fetchData', []))
    );
  }

  getAllHeroData = (): Observable<Hero[]> => {
    if(this.allHeroes && this.allHeroes.length) return of(this.allHeroes);
    return this.fetchData();
  };

  getHero = (id: Number): (Observable<Hero | false>) => {
    const hero = this.allHeroes.find(x => x.id === id);
    if(hero) {
      this.log(`Succesfully loaded hero ${id} locally!`);
      return of(hero);
    }

    return this.http.get<Hero>(`${this.heroesUrl}/${id}`).pipe(
      tap(x => this.log(`Requested hero ${id} from remote`)),
      catchError(this.handleError<Hero | false>('getHero', false))
    );
  };

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`Updated hero id=${hero.id} on remote`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  getPopularHeroes = (): Observable<Hero[]> => {
    if(this.allHeroes.length){
      return of(this.allHeroes.slice(1, 5));
    } 

    return this.http.get<Hero[]>(`${this.heroesUrl}`).pipe(
      map(x => x.slice(1, 5)),
      catchError(this.handleError<Hero[]>('getPopularHeroes', []))
    );
    
  };

}
