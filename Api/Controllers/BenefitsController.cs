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
    public class BenefitsController : ApiController
    {
        private ManagerEmployeeEntities db = new ManagerEmployeeEntities();

        // GET: api/Benefits
        public List<Benefit> GetBenefits()
        {
            List<Benefit> a = db.Benefits.ToList();


            return db.Benefits.ToList();
        }

      

        // PUT: api/Benefits/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBenefit(int id, Benefit benefit)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != benefit.BenefitId)
            {
                return BadRequest();
            }

            db.Entry(benefit).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BenefitExists(id))
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

        // POST: api/Benefits
        [ResponseType(typeof(Benefit))]
        public IHttpActionResult PostBenefit(Benefit benefit)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Benefits.Add(benefit);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = benefit.BenefitId }, benefit);
        }

        // DELETE: api/Benefits/5
        [ResponseType(typeof(Benefit))]
        public IHttpActionResult DeleteBenefit(int id)
        {
            Benefit benefit = db.Benefits.Find(id);
            if (benefit == null)
            {
                return NotFound();
            }

            db.Benefits.Remove(benefit);
            db.SaveChanges();

            return Ok(benefit);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BenefitExists(int id)
        {
            return db.Benefits.Count(e => e.BenefitId == id) > 0;
        }
    }
}