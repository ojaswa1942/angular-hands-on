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

  getHeroData = (): Observable<Hero[]> => {
    const heroes = of(this.allHeroes);
    this.messageService.add("HeroesService: Succesfully loaded heroes!");
    return heroes;
  }
}
