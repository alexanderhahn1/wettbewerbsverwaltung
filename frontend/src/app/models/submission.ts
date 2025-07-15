import {Project} from './project';

export interface Submission {
  name: string,
  school_year: string,
  last_update: Date,
  projects: Project[]
}
