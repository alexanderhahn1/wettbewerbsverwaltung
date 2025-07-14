import {Project} from './project';

export interface Submission {
  name: string,
  schoolYear: string,
  last_update: Date,
  projects: Project[]
}
