import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from './services/feedback.service';
import { LocalService } from './services/local.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';
  isLoading = false;
  isLogged = false;

  constructor(
    private feedbackSvc: FeedbackService,
    private localSvc: LocalService,
    private router: Router
    ) {
    this.feedbackSvc.loading.subscribe({
      next: (isLoading) => {
        this.isLoading = isLoading;
      },
    });

    this.isLogged = this.localSvc.hasValidToken();
    this.localSvc.userAuthenticated.subscribe({
      next: (userAuth) => {
        this.isLogged = userAuth;
      },
    });
  }
  logout() {
    this.isLogged = false;
    this.localSvc.removeToken();
    this.router.navigate(['login']);
  }
}


