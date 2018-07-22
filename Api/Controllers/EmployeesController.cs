using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using BandIprojects.Models;

namespace BandIprojects.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class EmployeesController : ApiController
    {
        private ManagerEmployeeEntities db = new ManagerEmployeeEntities();

        // GET: api/Employees
        public List<Employee>  GetEmployees()
        {
            List < Employee > a= db.Employees.ToList();
            db.EmployeeBenefits.ToList();
            return a;
        }


      

        // GET: api/Employees/5
        [ResponseType(typeof(Employee))]
        public IHttpActionResult GetEmployee(int id)
        {
            Employee employee = db.Employees.Find(id);
            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        // PUT: api/Employees/5

        [ResponseType(typeof(void))]
        public IHttpActionResult PutEmployee(int id, Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != employee.EmployeeId)
            {
                return BadRequest();
            }
            //var listOfBenefitId = employee.EmployeeBenefits.Select(r => r.BenefitId);
            //var benefits = db.Benefits.Where(e => listOfBenefitId.Contains(e.BenefitId)).ToList();
            
            var employeBenenifts = new List<EmployeeBenefit>();
            foreach (var employeeBenefit in employee.EmployeeBenefits)
            {
                employeBenenifts.Add(new EmployeeBenefit
                {
                    BenefitId = employeeBenefit.BenefitId,
                    EmployeeId = employee.EmployeeId
                });
            }
            DeleteEmployee(id);
            employee.EmployeeBenefits = employeBenenifts;
            db.Employees.Add(employee);
            
           // db.Entry(employee).State = EntityState.Unchanged;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Employees
        
        [ResponseType(typeof(Employee))]
        public IHttpActionResult PostEmployee(Employee employee)
        {
           

            db.Employees.Add(employee);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = employee.EmployeeId }, employee);
        }

        // DELETE: api/Employees/5
        [ResponseType(typeof(Employee))]
        public IHttpActionResult DeleteEmployee(int id)
        {
            Employee employee = db.Employees.Find(id);
            if (employee == null)
            {
                return NotFound();
            }
            var benefits= db.EmployeeBenefits.Where(e => e.EmployeeId == employee.EmployeeId);
            if (benefits.Count() > 0)
            {
                db.EmployeeBenefits.RemoveRange(benefits);
                db.SaveChanges();
            }



            db.Employees.Remove(employee);
            
                db.SaveChanges();
            

            return Ok(employee);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EmployeeExists(int id)
        {
            return db.Employees.Count(e => e.EmployeeId == id) > 0;
        }
    }
}