import { Routes } from '@angular/router';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {AuthGuard} from './guard/auth.guard';
import {CompetitionsListComponent} from './components/competitions-list/competitions-list.component';
import {SubmissionsComponent} from './components/submissions/submissions.component';
import {CurrentCompetitionsComponent} from './components/current-competitions/current-competitions.component';
import {AddCompetitionComponent} from './components/add-competition/add-competition.component';
import {AddProjectComponent} from './components/add-project/add-project.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'Wettbewerbsverwaltung',
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    redirectTo: '',
  },
  {
    path: 'competitions',
    component: CompetitionsListComponent,
    title: 'Wettbewerbe',
    canActivate: [AuthGuard]
  },
  {
    path: 'current-competitions',
    component: CurrentCompetitionsComponent,
    title: 'Aktuelle Wettbewerbe',
    canActivate: [AuthGuard]
  },
  {
    path: 'submissions',
    component: SubmissionsComponent,
    title: 'Einreichungen',
    canActivate: [AuthGuard]
  },

  {
    path: 'add-competition',
    component: AddCompetitionComponent,
    title: 'Wettbewerb hinzufügen',
    canActivate: [AuthGuard]
  },
  {
    path: 'add-project',
    component: AddProjectComponent,
    title: 'Projekt hinzufügen',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not Found',
    canActivate: [AuthGuard]
  }
];
