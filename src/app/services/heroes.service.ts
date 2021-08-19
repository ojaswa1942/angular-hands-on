import { Injectable } from '@angular/core';
import { Hero } from './models/serviceResponse.model';
import mockHeroData from '../../assets/mock-heroes.json';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private allHeroes: Hero[] = [];
  
  constructor() { 
    this.allHeroes = mockHeroData;
  }

  getHeroData = (): Hero[] => {
    return this.allHeroes;
  }
}
