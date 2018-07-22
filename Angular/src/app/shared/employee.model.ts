import { DatePipe, CurrencyPipe } from '../../../node_modules/@angular/common';
import { Benefit } from './benefit.model';
export class Employee {
  EmployeeId: number;
  Name: String;
  DOB:DatePipe;
  Salary:number;
  EmployeeBenefits?: Array<Benefit>;
}
