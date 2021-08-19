import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  metadata = {
    title: 'Heroes App',
    description: `A dummy application for hands-on on Angular, yay!`,
  };
  
}
