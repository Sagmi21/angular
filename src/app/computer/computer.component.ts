import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComputerService } from '../api/computer.service';
import { Computer } from '../model/data.model';
import { FeedbackService } from '../services/feedback.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-computer',
  templateUrl: './computer.component.html',
  styleUrls: ['./computer.component.scss']
})
export class ComputerComponent implements OnInit {
  title = 'Crear elemento';
  id?: number;
  formComputer: FormGroup | undefined;

  constructor(
    private fb: FormBuilder,
    private computerSvc: ComputerService,
    private feedback: FeedbackService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    ) {
    this.formComputer = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
    });

    this.activeRoute.params.subscribe({
      next: (p) => {
        if (p['id']) {
          this.title = 'Editar elemento';
          this.id = p['id'];
          this.getData();
        }
      },
    });
  }

  ngOnInit(): void {}

  getData() {
    this.feedback.loading.next(true);
    this.computerSvc.getComputer(this.id!).subscribe({
      next: (item) => {
        this.feedback.loading.next(false);
        this.formComputer?.patchValue(item);
      },
      error: () => {
        this.feedback.loading.next(false);
        this.feedback.showMessage('Lo sentimos, no se pudo cargar el elemento');
      },
    });
  }

  save() {
    const dataForm = this.formComputer?.value as Computer;

    this.feedback.loading.next(true);
    this.computerSvc.saveComputer(dataForm, this.id).subscribe({
      next: () => {
        this.feedback.loading.next(false);
        this.router.navigate(['home']);
      },
      error: () => {
        this.feedback.loading.next(false);
        this.feedback.showMessage('Lo sentimos, no se pudo guardar el elemento');
      },
    });

  }

}
