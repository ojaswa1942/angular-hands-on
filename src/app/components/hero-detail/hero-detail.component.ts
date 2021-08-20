import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from 'src/app/services/heroes.service';
import { Hero } from 'src/app/services/models/serviceResponse.model';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  // @Input() hero?: Hero;
  hero?: Hero;

  constructor(private heroesService: HeroesService, private route: ActivatedRoute, private location: Location, private router: Router) { 
  }

  ngOnInit(): void {
    const heroId = Number(this.route.snapshot.paramMap.get('id'));
    this.heroesService.getHero(heroId).subscribe(x => {
      if (!x) {
        this.router.navigate(["/"]);
        return;
      }
      this.hero = x;
    });
  }

  onBack = () => {
    this.location.back();
  }

  save = () => {
    if(this.hero) {
      this.heroesService.updateHero(this.hero)
      .subscribe(() => this.onBack());
    }
  }

  delete = () => {
    if(this.hero) {
      this.heroesService.deleteHero(this.hero)
      .subscribe(() => this.onBack());
    }
  }
}
