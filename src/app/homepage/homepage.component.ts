import {Component, OnInit} from '@angular/core';
import {Event, Router} from '@angular/router';
import {ConnectService} from '../connect.service';
import {HttpClient} from '@angular/common/http';
import {response} from 'express';

@Component({
  selector: 'app-homepage',
  standalone: false,

  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  constructor(
    private imageUploadService:ConnectService,

  ) {
  }
  selectedPicture: any;
  message:string=''
  uploadedImage: any;
  level:string=''


  onFileSelected(event:any) {
this.selectedPicture=event.target.files[0];
console.log(this.selectedPicture)
    if (this.selectedPicture) {
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImage = reader.result as string;
        console.log(this.uploadedImage)

      }
      reader.readAsDataURL(this.selectedPicture);

    }

  }
// onUpload(){
//     if(this.selectedPicture){
//       this.imageUploadService.uploadImage(this.selectedPicture).subscribe(
//         (response:any)=>{
//       // this.uploadedImage=URL.createObjectURL(response);
//           this.uploadedImage = `data:image/png;base64,${response.localized_image}`;
//       this.message=`Prediction: ${response.diagnosis}`;
//
//         },
//         (error) => {
//           console.error('Error uploading image', error);
//           this.message = 'Failed to upload and process the image.';
//         }
//
//       );
//     }
//
// }
  onUpload() {
    if (this.selectedPicture) {
      this.imageUploadService.uploadImage(this.selectedPicture).subscribe(
        (response: any) => {
          console.log('Server Response:', response); // Log the response to check its structure

          if (response.localized_image) {
            // Handle Base64 localized image
            this.uploadedImage = `data:image/png;base64,${response.localized_image}`;
            this.message = `Prediction: ${response.diagnosis}`;
            this.level ='error'
          } else {
            this.message = 'Prediction : '+ response.diagnosis +'.'+'No localized image returned from the backend.';
            console.error('Localized image missing in response:', response);
            this.level='success'
          }
        },
        (error) => {
          console.error('Error uploading image:', error);
          this.message = 'Failed to upload and process the image.';
        }
      );
    } else {
      this.message = 'No file selected.';
    }
  }


  resetMessage() {
    this.message='';
    this.uploadedImage='';
  }
}
