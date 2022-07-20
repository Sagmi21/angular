import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../api/login.service';
import { LoginRequest, LoginResponse } from '../model/login.model';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  formLogin: FormGroup | undefined;

  constructor(private fb: FormBuilder, private loginSvc: LoginService, private feedbackSvc: FeedbackService) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
   }

   loginClick() {
    const formValue = this.formLogin?.value as LoginRequest;

    this.feedbackSvc.loading.next(true);
    this.isLoading = true;

    this.loginSvc.login(formValue).subscribe({
      next: (response: LoginResponse) => {
        console.log(response);
        this.feedbackSvc.loading.next(false);
        this.isLoading = false;
      },
      error: (errorHttp) => {
        console.log(errorHttp.error.error);
        this.feedbackSvc.loading.next(false);
        this.isLoading = false;
        this.feedbackSvc.showMessage(errorHttp.error.error);
      }
    });
   }

  ngOnInit(): void {
  }

}
