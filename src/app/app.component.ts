import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FooterConfig } from './route.config';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, RouterModule, ToolbarModule, ButtonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  showBottomNav: boolean = false;
  constructor(private router: Router) {
    router.events.subscribe(event => {
      // only interested in the NavigationEnd type of event
      if (event instanceof NavigationEnd) this.showBottomNav = FooterConfig[event.url]
    });
  }

  ngOnInit(): void {
  }
}
