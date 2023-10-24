import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Country, CountryResponse } from 'src/app/models/commonmodel';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-displaycountry',
  templateUrl: './displaycountry.component.html',
  styleUrls: ['./displaycountry.component.css']
})
export class DisplaycountryComponent implements OnInit {

  countries: Country[] = [];
  newCountry: Country = { id: 0, name: '', iso2: '', iso3: '', totCities: 0 };

  constructor(private service: CommonService, private router :Router) {}

  ngOnInit(): void {
    this.fetchCountries();
  }

  fetchCountries(): void {
    this.service.getCountries().subscribe(
      (response: CountryResponse) => {
        this.countries = response.data;
        this.countries.sort((a, b) => b.id - a.id); 
      },
      error => {
        console.error(error); 
      }
    );
  }
  

  
  postCountry(): void {
    this.service.postCountry(this.newCountry).subscribe(response => {
      console.log('New country added:', response);
      this.newCountry = { id: 0, name: '', iso2: '', iso3: '', totCities: 0 };
      this.fetchCountries();
    });
  }
  deleteCountry(countryId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this country?');
    if (confirmDelete) {
      this.service.deleteCountry(countryId).subscribe(
        () => {
          console.log('Country deleted successfully.');
          this.fetchCountries(); 
        },
        error => {
          console.error('Error deleting country:', error);
        }
      );
    }
  }
  
  editCountry(country: Country) {    
    this.router.navigate(['/update-country', country.id]);
  }
}
