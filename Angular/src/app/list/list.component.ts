import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { NgForm } from '../../../node_modules/@angular/forms';
import { Benefit } from '../shared/benefit.model';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [EmployeeService]

})
export class ListComponent implements OnInit {
  data: any = []
  benefitArray: Benefit[];
  constructor(private _activatedRoute: ActivatedRoute, private router: Router, private employeeService: EmployeeService, private toastr: ToastrService, @Inject(LOCAL_STORAGE) private storage: WebStorageService) {

  }


  saveInLocal(key, val): void {
    this.storage.set(key, val);
    this.data[key] = this.storage.get(key);
  }
  homeClick(): void {
    this.router.navigate(['/home']);
  }
  addEmployeeClick(): void {
    this.router.navigate(['/addemployee']);
    this.storage.remove("myemployee");
    this.employeeService.RestForm();
  }

  showForEdit(emp: Employee) {

    this.saveInLocal("myemployee", emp);
    this.router.navigate(['/addemployee']);

  }
  onDelete(id: number) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(id)
        .subscribe(x => {
          this.employeeService.getEmployeeList();
          this.toastr.warning("Deleted Successfully", "Employee Register")
        });
    }
  }

  ngOnInit() {
    this.employeeService.getEmployeeList();

    

  }
}
