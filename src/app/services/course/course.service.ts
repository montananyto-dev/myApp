import { Injectable } from '@angular/core';

@Injectable()
export class CourseService {

  public courses;

  constructor() { }

  setCourses(organisation) {
    this.courses = organisation;

  }
  getCourses() {
    return this.courses;
  }
}
