import {CompetitionImage} from './competition-image';

export interface Competition {
  id: number,
  name: string,
  link: string,
  deadline: string,
  prize: string,
  information_material: string,
  submission_forms: string,
  contact: string,
  is_active: boolean,
  date_created: Date,
  last_update: Date,
  school_year: string,
  created_by: string
}
