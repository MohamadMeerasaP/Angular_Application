import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  productId: number | undefined;
  categoryName: string = '';
  productName: string = '';
  pageNumber: number = 1;
  pageSize: number = 5;
  sortBy: string = "productName";
  sortOrder: string = "asc";

  productList: any[] = [];
  totalRecords: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.onSearch();
    this.getTotal();
  }

  getTotal() {
    this.http.get<number>("https://projectapi.gerasim.in/api/Products/getTotalProduct").subscribe((res: any) => {
      this.totalRecords = res;
    });
  }

  getValue(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  onPageChange(pageNo: number) {
    this.pageNumber = pageNo;
    this.onSearch();
  }

  getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.totalRecords / this.pageSize);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  onSort(fieldName: string) {
    this.sortBy = fieldName;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.onSearch();
  }

  onSearch() {
    let params = new HttpParams()
      .set('pageNumber', this.pageNumber.toString())
      .set('pageSize', this.pageSize.toString())
      .set('sortBy', this.sortBy)
      .set('sortOrder', this.sortOrder);

    if (this.categoryName) {
      params = params.set('category', this.categoryName);
    }
    if (this.productId !== undefined) {
      params = params.set('productId', this.productId.toString());
    }
    if (this.productName) {
      params = params.set('shortName', this.productName);
    }

    this.http.get("https://projectapi.gerasim.in/api/Products", { params }).subscribe((res: any) => {
      this.productList = res.items || res; // Adjust if API has different structure
      this.totalRecords = res.totalRecords || this.totalRecords; // Adjust if `totalRecords` comes with this response
    });
  }
}
