import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../api/car.service';
import { Car } from '../model/data.model';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {
  title = 'Crear elemento';
  id?: number;
  formCar : FormGroup | undefined;

  constructor(
    private fb: FormBuilder,
    private carSvc: CarService,
    private feedback: FeedbackService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.formCar = this.fb.group({
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

  ngOnInit(): void { }

  getData() {
    this.feedback.loading.next(true);
    this.carSvc.getCar(this.id!).subscribe({
      next: (item) => {
        this.feedback.loading.next(false);
        this.formCar?.patchValue(item);
      },
      error: () => {
        this.feedback.loading.next(false);
        this.feedback.showMessage('Lo sentimos, no se pudo guardar el elemento');
      },
    });
  }

  save() {
    const dataForm = this.formCar?.value as Car;

    this.feedback.loading.next(true);
    this.carSvc.saveCar(dataForm, this.id).subscribe({
      next: () => {
        this.feedback.loading.next(false);
        this.router.navigate(['objects']);
      },
      error: () => {
        this.feedback.loading.next(false);
        this.feedback.showMessage('Lo sentimos, no se pudo guardar el elemento');
      },
    });
  }
}
