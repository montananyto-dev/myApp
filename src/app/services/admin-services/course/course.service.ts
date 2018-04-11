import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CourseService {

  public courses;
  public moduleApi = 'http://slim.kingstonse.org/view/course';

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<any> {
    return this.http.get(this.moduleApi);
  }

  setCourses(course) {
    this.courses = course;

  }
  getCourses() {
    return this.courses;
  }
}
