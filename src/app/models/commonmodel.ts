export interface LoginRequestModel{
    Email:string,
    Password:string,
}

// export interface LoginResult{
//     success:boolean,
//     message:string,
//     token:string
// }


export interface LoginResult {
    success: boolean;
    message: string;
    token: string | null;
  }

export interface Status{
    statusCode:number,
    message:string
}


export interface Country {
    id: number;
    name: string;
    iso2: string;
    iso3: string;
    totCities: number;
  }


  export interface CountryResponse {
    data: Country[]; 
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  }





  export interface City {
    id: number;
    name: string;
    lat: number;
    lon: number;
    countryId: number;
    countryName: string;
  }
  

  export interface CityResponse {
    data: City[]; 
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  }
