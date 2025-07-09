import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {AuthGuard} from './guard/auth.guard';
import {CompetitionsListComponent} from './components/competitions-list/competitions-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Wettbewerbsverwaltung',
    canActivate: [AuthGuard],
  },
  {
    path: 'competitions',
    component: CompetitionsListComponent,
    title: 'Wettbewerbe',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not Found',
    canActivate: [AuthGuard]
  }
];
