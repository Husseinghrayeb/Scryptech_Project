import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Benefit } from './benefit.model';
import { Employee } from './employee.model';

import { environment } from '../../environments/environment';


@Injectable()
export abstract class ApiBaseService {

  apiUrl: string;
  constructor(protected httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  protected get<T>(url: string, options?: any, mapFxn = null): Observable<any> {
    if (options) {
      return this.httpClient.get<T>(url, options)
        .map(mapFxn || this.extractData)
        .catch(err => this.handleError(err));
    }
    return this.httpClient.get<T>(url)
      .map(mapFxn || this.extractData)
      .catch(err => this.handleError(err));
  }

  protected post<T>(url: string, data: any, options?: any): Observable<any> {
    if (options) {
      return this.httpClient.post<T>(url, data, options)
        .map(this.extractData)
        .catch(err => this.handleError(err));
    }
    return this.httpClient.post<T>(url, data)
      .map(this.extractData)
      .catch(err => this.handleError(err));
  }

  protected put<T>(url: string, data: any, options?: any): Observable<any> {
    if (options) {
      return this.httpClient.put<T>(url, data, options)
        .map(this.extractData)
        .catch(err => this.handleError(err));
    }
    return this.httpClient.put<T>(url, data)
      .map(this.extractData)
      .catch(err => this.handleError(err));
  }



  protected extractData<T>(res: HttpResponse<T> | {}) {
    return res || {};
  }

  private handleError(err: HttpErrorResponse | any) {
    console.error('http error', err);
    return Observable.throw(err);
  }
}



@Injectable()
export class EmployeeService extends ApiBaseService {
  title: any;
  selectedEmployee: Employee;
  employeeList: Employee[];
  MyBenefitList: Benefit[];

  constructor(protected _http: HttpClient) {
    super(_http);
    
  }

  postEmployee(emp: Employee) {
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    return this.post(this.apiUrl + 'Employees', emp)
  }

  putEmployee(id, emp) {
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    return this.put(this.apiUrl + 'Employees/' + id, emp)
  }

  getEmployeeList() {
    this.get<Array<Employee>>(this.apiUrl + 'Employees').subscribe(
      employeeList => {
        console.log(employeeList);
        this.employeeList = employeeList;
      },
      err => {
        console.error(err);
      }
    )
  }

  RestForm(form?: NgForm) {
    if (form != null) {
     form.reset();
      this.selectedEmployee = {
        EmployeeId: null,
        Name: '',
        DOB: null,
        Salary: null
      
      }
    }
  }

  getBeniftList() {
    this.get<Array<Benefit>>(this.apiUrl + 'Benefits').subscribe(
      benefits => {
        console.log("Iam here");
        console.log(benefits);
        this.MyBenefitList = benefits;
      },
      err => {
        console.error(err);
      }
    )
  }


  getBeniftListSubscription() {
    return this.get<Array<Benefit>>(this.apiUrl + 'Benefits');
  }

  
  deleteEmployee(id: number) {
    return this._http.delete('http://localhost:60594/api/Employees/' + id).map(res => res);
  }
}
