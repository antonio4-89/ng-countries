import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  
  private debouncer: Subject<string> = new Subject<string>();
  private debounceSuscription?: Subscription;
  
  @Input() initialValue: string = ''

  @Input()
  public placeholder: string = '';
  
  @Output()
  public onValue = new EventEmitter<string>();
  
  @Output()
  public onDebounce = new EventEmitter<string>();
  
  ngOnInit(): void {
  this.debouncer
  .pipe( debounceTime(300) )
  .subscribe( value => {
    this.onDebounce.emit( value );
    console.log('debouncer value', value)
  } );
    // throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.debounceSuscription?.unsubscribe();
  }

  emitValue( value: string ):void {
    this.onValue.emit( value );
  }
  
  onKeyPress( value: string ){
    this.debouncer.next( value );
  }
  
}
