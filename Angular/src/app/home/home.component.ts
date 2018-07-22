import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from '../../../node_modules/angular-webstorage-service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  parsedBenifits = [];


  constructor(private _activatedRoute: ActivatedRoute, private router: Router, @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
  }
  listClick(): void {
    this.router.navigate(['/list']);
  }
  addClick(): void {
    this.storage.set("myemployee", null);
    
    this.router.navigate(['/addemployee']);
  }
  ngOnInit() {
    
    
  }


}
