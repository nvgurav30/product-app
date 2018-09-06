import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit, OnChanges {
  @Input() rating: number;
  @Output() ratingClick: EventEmitter<string> = new EventEmitter<string>();
  starWidth: number;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.starWidth = this.rating * 70 / 5;
  }

  onRatingClick() {
    this.ratingClick.emit(`The rating ${this.rating} was clicked.`);
  }
}
