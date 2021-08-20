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
  showNewForm: boolean = false;
  // selectedHero?: Hero;

  constructor(private heroesService: HeroesService, private messageService: MessageService) { 
  }

  ngOnInit(): void {
    this.heroesService.getAllHeroData()
      .subscribe(heroes => this.heroes = heroes);
  }

  toggleFormView = () => {
    this.showNewForm = !this.showNewForm;
  }

  add = (name: string, superpower: string = "") => {
    name = name.trim();
    superpower = superpower.trim();

    this.heroesService.addHero(name, superpower)
    .subscribe(hero => {
      this.heroes.push(hero);
      this.showNewForm = false;
    });
  }

  // onSelect = (hero: Hero): void => {
  //   if(this.selectedHero && this.selectedHero.id === hero.id) {
  //     this.selectedHero = undefined;
  //     this.messageService.add(`HeroesComponent: Unselect Hero #${hero.id}`);
  //   }
  //   else {
  //     this.selectedHero = hero;
  //     this.messageService.add(`HeroesComponent: Select Hero #${hero.id}`);
  //   }
  // }

}
