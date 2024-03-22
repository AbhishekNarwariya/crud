import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  myForm:FormGroup;
  fetchedData:any[]=[]

  constructor(private _fb:FormBuilder, private dataservice:DataService){
    this.myForm = this._fb.group({
      fullname:['',Validators.required]
    })
  }
  ngOnInit() {
    this.getData();
  }

  onSubmit(){
    if (this.myForm.valid) {
      this.dataservice.sendData(this.myForm.value).subscribe(res=>{
        console.log(res);
        
      })
      // Yahan par form submit karne ka code likhein
    }

  }

  getData(){
    this.dataservice.getData().subscribe(res=>{
       this.fetchedData = res
    })

  }

  editUser(user: any) {
    user.editing = true;
    user.updatedFullname = user.fullname; // Store the original fullname for canceling edit
  }

  saveUser(user: any) {
    user.editing = false;
    this.dataservice.updateEmployee(user.id, { fullname: user.updatedFullname }).subscribe(res => {
      console.log('User updated:', res);
      this.getData(); // Refresh data after updating
    });
  }

  cancelEdit(user: any) {
    user.editing = false;
    user.updatedFullname = ''; // Clear updated fullname
  }

  deleteUser(userId: number) {
    this.dataservice.deleteEmployee(userId).subscribe(res => {
      console.log('User deleted:', res);
      this.getData(); // Refresh data after deletion
    });
  }

}
