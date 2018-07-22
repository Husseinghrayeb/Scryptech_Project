import { Component, OnInit, Inject } from '@angular/core';
import { Employee } from '../shared/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../shared/employee.service';
import { ToastrService } from '../../../node_modules/ngx-toastr';
import { LOCAL_STORAGE, WebStorageService } from '../../../node_modules/angular-webstorage-service';
import { Benefit } from '../shared/benefit.model';
import { NgForm } from '@angular/forms';
import { StaticInjector } from '../../../node_modules/@angular/core/src/di/injector';


@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css'],
  providers: [EmployeeService]
})
export class AddemployeeComponent implements OnInit {

  title: any;

  parsedBenifits = [];
  mybenifits: Benefit[];
  selectedBenifits = [];
  isEdit = false;


  constructor(private _activatedRoute: ActivatedRoute, private router: Router, private employeeService: EmployeeService, private toastr: ToastrService, @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    this.employeeService.selectedEmployee = new Employee;
    // this.count = 
  }

  ngOnInit() {
    //this.storage.set("turn",null );

    if (this.storage.get("turn") != null) {
      this.parsedBenifits = this.storage.get('mybenifits');
      // console.log(this.parsedBenifits);

    }
    else {
      // console.log("Iam entered this seesion");
      this.employeeService.getBeniftListSubscription().subscribe(
        benefits => {
          this.storage.set("mybenifits", benefits);
          this.storage.set("turn", null);
          this.parsedBenifits = benefits;
          // console.log(this.parsedBenifits);
        }
      )

    }


    if (this.storage.get("myemployee") != null) {
      this.title = "Edit Employee";
      this.employeeService.selectedEmployee = this.storage.get("myemployee");
      this.isEdit = true;

    } else {
      this.title = "Add Employee";
    }



    if (this.isEdit) {

      for (const benefit of this.parsedBenifits) {
        //console.log(benefit.BenefitId);
        for (const empBenifit of this.employeeService.selectedEmployee.EmployeeBenefits) {
          //console.log(empBenifit.BenefitId);
          if (benefit.BenefitId === empBenifit.BenefitId) {
            //  console.log("I checked between them");
            benefit.isChecked = true;
            this.selectedBenifits.push(benefit.BenefitId);
          }
        }
      }
    }



  }

  Rest() {
    for (const benefit of this.parsedBenifits) {

      benefit.isChecked = false;


    }
  }
  homeClick(): void {
    this.router.navigate(['/home']);
  }

  checkBenefit(event, benefit) {
    if (event.target.checked) {
      //console.log("I added");
      this.selectedBenifits.push(benefit.BenefitId);
    } else {
      this.selectedBenifits.splice(this.selectedBenifits.indexOf(benefit.BenefitId), 1);
    }
  }

  onSubmit(form?: NgForm) {
    this.storage.set("turn", 0);
    const emp = form.value;
    const bens = [];
    for (const ben of this.selectedBenifits) {
      bens.push({
        BenefitId: ben
      });
    }
    emp.EmployeeBenefits = bens;
    if (emp.EmployeeId == null) {
      this.employeeService.postEmployee(emp)
        .subscribe(data => {
          this.employeeService.RestForm(form);
          this.Rest();
          //this.employeeService.getEmployeeList();
          this.toastr.success('New Record Added Succcessfully', 'Employee Register');
        })
    }
    else {
      this.employeeService.putEmployee(emp.EmployeeId, emp)
        .subscribe(data => {
          this.employeeService.RestForm(form);
          this.Rest();
          //this.employeeService.getEmployeeList();
          this.toastr.info('Record Updated Successfully!', 'Employee Register');
        });
    }
  }
}
