import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { finalize } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.css']
})
export class AddPolicyComponent implements OnInit {

  description = '';
  file;
  fileType;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Description',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: []
  };

  constructor(
    private afs: AngularFirestore,
    private afd: AngularFireDatabase,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    $('.ui.dropdown')
      .dropdown()
      ;
  }

  upload(event) {
    this.file = event.target.files[0];
    let extension = this.file.name.split('.').pop();
    this.fileType = extension.toLowerCase();
  }

  onSubmit(form: NgForm) {
    let policy = form.value.policyDetails;
    let today = new Date();
    let date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    if (this.file) {
      const filePath = `policy/files/${Date.now()}`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.file);
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(url => {
            this.afs.collection('/policy').add({
              policy,
              isPublished: false,
              publishedAt: date,
              url: url,
              fileType: this.fileType
            }).then(x => {
              this.afd.database.ref('/policy').child(x.id).set({
                policy,
                isPublished: false,
                publishedAt: date,
                url: url,
                fileType: this.fileType
              })
            }).then(x => {
              alert('Policy Added.')
            })
          })
        })
      ).subscribe()
    }
    else {
      this.afs.collection('/policy').add({
        policy,
        isPublished: false,
        publishedAt: date,
        url: null
      }).then(x => {
        this.afd.database.ref('/policy').child(x.id).set({
          policy,
          isPublished: false,
          publishedAt: date,
          url: null
        })
      }).then(x => {
        alert('Policy Added.')
        form.reset();
      })
    }
  }

}
