import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { CustomerHome } from '../data/product-model';

@Injectable({
  providedIn: 'root'
})
export class CustomerHomeService {
  private data: CustomerHome | undefined;
  private apiUrl = environment.apiUrl + '/public';

  constructor(private http: HttpClient) {}

  getHomeData(): Observable<CustomerHome> {
    return this.http.get<CustomerHome>(`${this.apiUrl}/all`).pipe(
      tap((data: CustomerHome) => {
        this.data = data;
      })
    );
  }

    // New method to get product image as Blob.
  getProductImage(productId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${productId}/image`, { responseType: 'blob' });
  }
}