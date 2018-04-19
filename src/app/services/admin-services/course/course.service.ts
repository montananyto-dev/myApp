import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CourseService {

  public courses;
  public courseApi = 'http://slim.kingstonse.org/view/course';
  public courseByOrganisationIdApi = 'http://slim.kingstonse.org/view/courseByOrganisationId/';

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<any> {
    return this.http.get(this.courseApi);
  }

  getCoursesByOrganisationId(organisationId): Observable<any> {
    return this.http.get(this.courseByOrganisationIdApi + organisationId );
  }
}
