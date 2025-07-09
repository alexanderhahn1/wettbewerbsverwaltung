import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {ListComponent} from './components/list/list.component';
import {AuthGuard} from './guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Wettbewerbsverwaltung',
    canActivate: [AuthGuard],
  },
  {
    path: 'list',
    component: ListComponent,
    title: 'List',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not Found',
    canActivate: [AuthGuard]
  }
];
