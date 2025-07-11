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
  schoolYear: string,
  created_by: string
}
