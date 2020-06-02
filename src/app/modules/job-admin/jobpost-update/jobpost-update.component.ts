import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-jobpost-update',
  templateUrl: './jobpost-update.component.html',
  styleUrls: ['./jobpost-update.component.css']
})
export class JobpostUpdateComponent implements OnInit {

  information;
  x:string;
  array = [];
  keys;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '0',
    maxHeight: 'auto',
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

  constructor(private afs: AngularFirestore,
    private afd: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.x = param.id;
      this.afs.collection('/jobs').doc(param.id).valueChanges().subscribe(x => {
        this.information = x;
      })
    })
  }


  onSubmit(form) {
    let job = form.value.jobDetails;

    this.afs.collection('/jobs').doc(this.x).update({
      job
    }).then(x => {
      this.afd.database.ref('/jobs').child(this.x).update({
        job
      }).then(x => {
        alert('updated Successfully.');
        this.router.navigate(['/admin/admin-jobview', this.x])

      })

    })
  }
}
