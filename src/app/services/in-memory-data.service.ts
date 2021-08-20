import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { HeroesService } from './heroes.service';
import heroes from "../../assets/mock-heroes.json";

import { Hero } from './models/serviceResponse.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  genId = (heroes: Hero[]): number => {
    return HeroesService.length > 0? Math.max(...heroes.map(hero => (hero.id + 1))) : 11;
  };


  createDb() {
    return { heroes };
  };
  
}
