import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from 'src/app/models/commonmodel';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-updatecountry',
  templateUrl: './updatecountry.component.html',
  styleUrls: ['./updatecountry.component.css']
})
export class UpdatecountryComponent implements OnInit {
  countryId: number = -1; 
  country: Country = {} as Country;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countryService: CommonService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.countryId = +idParam;
      this.getCountry();
    }
  }

  getCountry() {
    this.countryService.getCountryById(this.countryId).subscribe(
      (result: Country) => {
        this.country = result;
      },
      (error: any) => {
        console.error('Error getting country:', error);
      }
    );
  }

  updateCountry() {
    this.countryService.updateCountry(this.countryId, this.country).subscribe(
      (result: any) => {
        console.log('Country updated successfully:', result);
        this.router.navigate(['/display']);
      },
      (error: any) => {
        console.error('Error updating country:', error);
      }
    );
  }
}
