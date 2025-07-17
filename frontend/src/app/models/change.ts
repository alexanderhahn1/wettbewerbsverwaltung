export interface Change {
  competitionId: number,
  attribute: string,
  old_value: string,
  new_value: string,
  changed_by: string,
  date: Date
}
