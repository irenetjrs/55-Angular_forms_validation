import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'home-work';
  form!: FormGroup;
  ngOnInit(){
    this.form = new FormGroup({
      login: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z]+$')
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email],
        [this.checkEmail.bind(this)]
        ),
      password: new FormControl('', [
        Validators.required, 
        Validators.minLength(7), 
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
      ]),
  });
}

submit(){    
  if(this.form.valid){
    console.log(this.form.value);
    } else {
    this.form.markAllAsTouched()
    }    
}
  async checkEmail(control: any): Promise<any> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    const users = await response.json();
    
    const emails = users.map((user: any) => user.email);
    
    if(emails.includes(control.value)){
      control.markAllAsTouched();
      return {uniqueEmail: true};}
  }catch (error) {
    console.error(error);
    return false;
  }
}
}
