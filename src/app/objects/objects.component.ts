import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CarService } from '../api/car.service';
import { Car } from '../model/data.model';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.scss']
})
export class ObjectsComponent implements OnInit {
  dataCars = new MatTableDataSource<Car>();
  displayedColumns = ['id', 'brand', 'model', 'year', 'actions'];

  constructor(
    private carSvc: CarService,
    private feedback: FeedbackService
  ) {
    this.feedback.loading.next(true);
    this.loadData();
  }

  loadData() {
    this.carSvc.getCars().subscribe({
      next: (data) => {
        this.dataCars.data =data;
        this.feedback.loading.next(false);
      },
      error: () => {
        this.feedback.loading.next(false);
        this.feedback.showMessage(
          'Lo sentimos, ocurrió un error al obtener los datos'
        );
      }
    });
  }

  deleteItem(item: Car) {
    if (item.id) {
      this.feedback.loading.next(true);
      this.carSvc.deleteCar(item.id).subscribe({
        next: () => {
          this.feedback.loading.next(false);
          this.loadData();
        },
        error: () => {
          this.feedback.loading.next(false);
          this.feedback.showMessage('Lo sentimos, no se pudo eliminar el elemento');
        },
      });
    }
  }

  ngOnInit(): void { }
}
