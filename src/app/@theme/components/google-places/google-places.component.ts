import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, ControlContainer, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-google-places',
  templateUrl: './google-places.component.html',
  styleUrls: ['./google-places.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: GooglePlacesComponent,
    }
  ],
})
export class GooglePlacesComponent implements ControlValueAccessor, OnInit {
  @Input() adressType: string = '';
  @Input() autocompleteInput: string = '';
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @Output() readonly inputChangedValue = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;
  @Input() formControlName: string = "";
  @Input() isRequired: boolean = false;
  queryWait: boolean = true;

  touched = false;
  disabled = false;


  control: any;

  @Input()
  placeholder:string = '';

  @Input()
  type:string = 'text';
  onChange: any = () => { };
  onTouched: any = () => { };
  value: string = "";
  constructor() {
   
    this.markAsTouched()
  }

  ngOnInit() {}
  ngAfterViewInit() {
   
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.addresstext.nativeElement,
      {
        componentRestrictions: { country: 'IN' },
        types: [this.adressType], // 'establishment' / 'address' / 'geocode'
      }
    );
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
    });
  }
  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  onChangeTextInputValue() {
    this.markAsTouched();
    if (!this.disabled) {
      this.onChange(this.autocompleteInput);
      console.info("textInputValue IN", this.autocompleteInput);
    }
    console.info("textInputValue OUT", this.autocompleteInput);
    this.inputChangedValue.emit(this.autocompleteInput);
  }
  validate(control: AbstractControl): ValidationErrors | any {
    // const textInputValue = control.value;
    // if (textInputValue.length <= 3) {
    //   return {
    //     mustBePositive: {
    //       textInputValue: textInputValue
    //     }
    //   };
    // }
  }
  invokeEvent(place: Object) {
    console.log("invokeEvent",place)
    this.markAsTouched();
    this.setAddress.emit(place);
  }
}
