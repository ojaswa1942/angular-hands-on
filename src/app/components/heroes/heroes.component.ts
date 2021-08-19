import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { Hero } from 'src/app/services/models/serviceResponse.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  selectedHero?: Hero;

  constructor(private heroesService: HeroesService) { 
  }

  ngOnInit(): void {
    this.heroes = this.heroesService.getHeroData();
  }

  onSelect = (hero: Hero): void => {
    if(this.selectedHero && this.selectedHero.id === hero.id) {
      // unselect
      this.selectedHero = undefined;
    }
    else this.selectedHero = hero;
  }

}
