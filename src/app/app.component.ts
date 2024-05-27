import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FooterConfig } from './route.config';
import { NgIf } from '@angular/common';
import { AuthService } from './authentication/auth.service';
import { environment } from '../environments/environment.development';
import { CommonService } from './common.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, ToastModule, RippleModule, RouterModule, ToolbarModule, ButtonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [AuthService, CommonService, MessageService]
})
export class AppComponent implements OnInit {
  showBottomNav: boolean = false;
  constructor(router: Router) {
    console.log(environment.from);

    router.events.subscribe(event => {
      // only interested in the NavigationEnd type of event
      if (event instanceof NavigationEnd) this.showBottomNav = FooterConfig[event.url]
    });
  }

  ngOnInit(): void {
  }
}
