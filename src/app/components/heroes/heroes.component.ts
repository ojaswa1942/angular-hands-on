import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { MessageService } from 'src/app/services/message.service';
import { Hero } from 'src/app/services/models/serviceResponse.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  selectedHero?: Hero;

  constructor(private heroesService: HeroesService, private messageService: MessageService) { 
  }

  ngOnInit(): void {
    this.heroesService.getHeroData()
      .subscribe(heroes => this.heroes = heroes);
  }

  onSelect = (hero: Hero): void => {
    if(this.selectedHero && this.selectedHero.id === hero.id) {
      this.selectedHero = undefined;
      this.messageService.add(`HeroesComponent: Unselect Hero #${hero.id}`);
    }
    else {
      this.selectedHero = hero;
      this.messageService.add(`HeroesComponent: Select Hero #${hero.id}`);
    }
  }

}
