import { Injectable } from '@angular/core';
import { Hero } from './models/serviceResponse.model';
import mockHeroData from '../../assets/mock-heroes.json';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private allHeroes: Hero[] = [];
  
  constructor(private messageService: MessageService) { 
    this.allHeroes = mockHeroData;
  }

  getAllHeroData = (): Observable<Hero[]> => {
    const heroes = of(this.allHeroes);
    this.messageService.add("HeroesService: Succesfully loaded all heroes");
    return heroes;
  };

  getHero = (id: Number): (Observable<Hero | false>) => {
    if(!this.allHeroes) return of(false);
    const hero = this.allHeroes.find(x => x.id === id);
    if(hero) {
      this.messageService.add(`HeroesService: Succesfully loaded hero ${id}!`);
      return of(hero);
    }
    return of(false);
  };

  getPopularHeroes = (): Observable<Hero[]> => {
    const heroes = of(this.allHeroes.slice(1, 5));
    return heroes;
  };

}
