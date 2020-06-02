import { FormControl, Validators } from '@angular/forms';

export const validateRequire = (val) => {
  return (new FormControl((val || ''), [
    Validators.required
  ]))
}

export const validateField = (val, min, max) => {
  return (new FormControl((val || ''), [
    Validators.required,
    Validators.minLength(min),
    Validators.maxLength(max),
    Validators.pattern("[a-zA-Z, ]*")
  ]));
}

export const validateAddress = (val, min, max) => {
  return (new FormControl((val || ''), [
    Validators.required,
    Validators.minLength(min),
    Validators.maxLength(max),
    Validators.pattern("([a-zA-Z ]*[0-9]*)([0-9]*[a-zA-Z ]*)")
  ]));
}

export const validateNumbers = (val, min, max) => {
  return (new FormControl((val || ''), [
    Validators.required,
    Validators.minLength(min),
    Validators.maxLength(max),
    Validators.pattern(new RegExp('^[0-9]+$'))
  ]));
}
