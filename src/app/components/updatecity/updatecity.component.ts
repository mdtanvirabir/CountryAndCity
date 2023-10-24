import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { City, Country, CountryResponse } from 'src/app/models/commonmodel';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-updatecity',
  templateUrl: './updatecity.component.html',
  styleUrls: ['./updatecity.component.css']
})
export class UpdatecityComponent implements OnInit {
  
  countries: Country[] = [];
  cityId!: number; // Add the '!' symbol to indicate that this property will be definitely assigned later
  city: City = { id: 0, name: '', lat: 0, lon: 0, countryId: 0, countryName: '' };

  constructor(private route: ActivatedRoute, private service: CommonService, private router:Router) {}

  ngOnInit(): void {
    this.cityId = +this.route.snapshot.paramMap.get('id')!; // Use the '!' symbol to tell TypeScript that it's safe to assume this won't be null
    this.fetchCity();
    this.fetchCountries();
  }

  fetchCity(): void {
    this.service.getCityById(this.cityId).subscribe(
      (city: City) => {
        this.city = city;
      },
      error => {
        console.error(error);
      }
    );
  }
  fetchCountries(): void {
    this.service.getCountries().subscribe(
      (response: CountryResponse) => {
        this.countries = response.data;
      },
      error => {
        console.error(error);
      }
    );
  }

  updateCity(): void {
    this.service.putCity(this.city).subscribe(
      () => {
        console.log('City updated successfully.');
        this.router.navigate(['/displaycity']);
      },
      error => {
        console.error(error);
      }
    );
  }
}
