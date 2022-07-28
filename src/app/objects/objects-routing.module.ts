import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from '../car/car.component';
import { ObjectsComponent } from './objects.component';

const routes: Routes = [
  {
    path: '',
    component: ObjectsComponent,
  },
  {
    path: 'car',
    component: CarComponent,
  },
  {
    path: 'car/:id',
    component: CarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjectsRoutingModule { }
