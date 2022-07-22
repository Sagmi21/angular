import { Component, OnInit } from '@angular/core';
import { Computer } from '../model/data.model';
import { ComputerService } from '../api/computer.service';
import { MatTableDataSource } from '@angular/material/table';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataComputers = new MatTableDataSource<Computer>();
  displayedColumns = ['id', 'brand', 'model', 'year', 'actions'];

  constructor(
    private computerSvc: ComputerService,
    private feedback: FeedbackService
    ) {
      this.feedback.loading.next(true);
      this.loadData();
    }

    loadData() {
      this.computerSvc.getComputers().subscribe({
        next: (data) => {
          this.dataComputers.data = data;
          this.feedback.loading.next(false);
        },
        error: () => {
          this.feedback.loading.next(false);
          this.feedback.showMessage(
            'Lo sentimos, ocurrió un error al obtener los datos'
          );
        },
      });
    }

    deleteItem(item: Computer) {
      if (item.id) {
        this.feedback.loading.next(true);
        this.computerSvc.deleteComputer(item.id).subscribe({
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

  ngOnInit(): void {}
}
