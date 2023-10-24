// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { City, CityResponse, CountryResponse } from 'src/app/models/commonmodel';
// import { CommonService } from 'src/app/services/common.service';

// @Component({
//   selector: 'app-displaycity',
//   templateUrl: './displaycity.component.html',
//   styleUrls: ['./displaycity.component.css']
// })
// export class DisplaycityComponent  implements OnInit {
//   cities: City[] = [];
 

//   constructor(private service: CommonService, private router :Router) {}

//   ngOnInit(): void {
//     this.fetchCities();
//   }

//   fetchCities(): void {
//     this.service.getCities().subscribe(
//       (response: CityResponse) => {
//         this.cities = response.data;
//         this.cities.sort((a, b) => b.id - a.id); 
//       },
//       error => {
//         console.error(error); 
//       }
//     );
//   }
  

// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City, CityResponse, Country, CountryResponse } from 'src/app/models/commonmodel';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-displaycity',
  templateUrl: './displaycity.component.html',
  styleUrls: ['./displaycity.component.css']
})
export class DisplaycityComponent  implements OnInit {
  cities: City[] = [];
  countries: Country[] = [];
  newCity: City = { id: 0, name: '', lat: 0, lon: 0, countryId: 0, countryName: '' };

  constructor(private service: CommonService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCities();
    this.fetchCountries();
  }

  fetchCities(): void {
    this.service.getCities().subscribe(
      (response: CityResponse) => {
        this.cities = response.data;
        this.cities.sort((a, b) => b.id - a.id);
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

  addCity(): void {
    this.service.postCity(this.newCity).subscribe(
      (response: City) => {
        console.log('City added:', response);
        this.fetchCities();
        // Reset form fields
        this.newCity = { id: 0, name: '', lat: 0, lon: 0, countryId: 0, countryName: '' };
      },
      error => {
        console.error(error);
      }
    );
  }

  editCity(cityId: number): void {
    this.router.navigate(['/update-city', cityId]);
  }

  deleteCity(cityId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this City?');
    if (confirmDelete) {
      this.service.deleteCity(cityId).subscribe(
        () => {
          console.log('City deleted successfully.');
          this.fetchCities(); 
        },
        error => {
          console.error('Error deleting City:', error);
        }
      );
    }
  }
}