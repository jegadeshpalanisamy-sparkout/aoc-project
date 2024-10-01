import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() totalItems: number = 0;
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 5;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

    /**
   * Changes the page and emits an event to the parent component.
   * @param page - The page number to navigate to.
   */
    changePage(page: number): void {
      if (page >= 1 && page <= this.totalPages) {
        this.pageChange.emit(page);
      }
    }
}
