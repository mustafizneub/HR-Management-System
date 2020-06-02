import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize,catchError,tap} from 'rxjs/operators';
import 'firebase/storage';
import 'firebase/firestore';
import * as _ from 'lodash';

interface Notice {
  _id: string,
  heading: string,
  category: string,
  description: string,
  startDate: object,
  endDate: object,
  duration: string,
  note: string,
  is_featured: string,
  is_approved: string,
  visibility: string,
  file_name: string,
  upload_file: string,
  country: string,
  options: string [],
}

interface SortedIcon {
    heading: {
      icon: string,
      order: boolean
    },
    startDate: {
      icon: string,
      order: boolean
    },
    endDate: {
      icon: string,
      order: boolean
    }
}

@Component({
  selector: 'app-notice',
  templateUrl: './notice-list.component.html',
  styleUrls: ['./notice-list.component.css']
})
export class NoticeListComponent implements OnInit {
  notices:any;
  isCollapsed:boolean = true;
  notification:any;
  p: number = 1;

  notice: Notice = {
  	  _id: '',
	  heading: 'Eid Holiday Notice',
	  category: null,
	  description: 'Upcoming holiday',
	  startDate: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()},
	  endDate: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() + 7},
	  duration: null,
	  note: null,
	  is_featured: 'No',
	  is_approved: 'No',
	  visibility: 'Yes',
	  file_name: null,
	  upload_file: 'Select a file to upload',
    country: null,
    options: ['Bangladesh', 'India', 'United Kingdom', 'Global']
  }   
sortedIcon: SortedIcon = {
    heading: {
      icon: 'chevron down icon',
      order: true,
    },
    startDate: {
      icon: 'chevron down icon',
      order: true,
    },
    endDate: {
      icon: 'chevron down icon',
      order: true,
    }
  };    
 
   
  constructor(private storage: AngularFireStorage, 
              public firestore: AngularFirestore) { }

  ngOnInit(): void {
       this.notice.country = this.notice.options[0]
  		 this.firestore.collection('Notice').valueChanges().subscribe(object=> {
		        this.notices = object;
            console.log(this.notices, '93');
		    }, error => {

		    });
  }
  addNotice (notice) {
  	this.notification = null;

    // 2018-08-20'T'13:20:10*633+0000
   
    
     
  		 if(notice.heading.length > 4) {
  		 	var datetime = new Date().getTime();

  		 	var startDate = notice.startDate.year + '-' + notice.startDate.month + '-' + notice.startDate.day;
		    var startDate_ms = new Date(startDate).getTime();
		    var startDate_hr = new Date(startDate_ms).toUTCString();

		    var endDate = notice.endDate.year + '-' + notice.endDate.month + '-' + notice.endDate.day;
		    var endDate_ms = new Date(endDate).getTime();
		    var endDate_hr = new Date(endDate_ms).toUTCString();

        var startDate_ISO =  new Date(startDate_ms).toISOString();
        var endDate_ISO =  new Date(endDate_ms).toISOString();


		    var duration = [
            {startDate_ms: startDate_ms},
            {endDate_ms: endDate_ms},
        ];
  		 	var d:any = new Date().getTime().toString(); 

            this.firestore.collection('Notice').doc(d).set({
                    _id: d,
                    heading: notice.heading,
                    category: notice.category,
                    description: notice.description,
                    startDate: startDate_ms,
                    startDate_hr: startDate_hr,
                    endDate_hr: endDate_hr,
                    endDate: endDate_ms,
                    duration: duration,
                    note: notice.note,
                    is_featured: notice.is_featured,
                    is_approved: notice.is_approved,
                    visibility: notice.visibility,
                    file_name: notice.file_name,
                    upload_file: notice.upload_file,
                    country: notice.country,
                    startDate_ISO: startDate_ISO,
                    endDate_ISO: endDate_ISO
              }).then(object => {
                  this.notification = 'Notice has been added successfully';
                  

                  setTimeout(a =>  {
                  		this.notification = null;                      
                  }, 1500);
                  
            })
            .catch(function(error) {
                  this.notification = 'Please put notice information correctly.';
            });
       } 
       else {
          this.notification = 'Please put notice information correctly.';
       }
  }
  uploadFile(event:any) {
    const file = event.target.files[0];
    const filePath = 'notice_file' + '/' + new Date().getTime().toString(); 
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.notice.file_name = file.name;
    

    task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url=>{
            this.notice.upload_file = url;
          });
        })
     )
    .subscribe()
  }

 getDataSort(sorting_type:any) {
    var sortingType = sorting_type;
    this.sortedIcon[sortingType].order =! this.sortedIcon[sortingType].order;
    if(this.sortedIcon[sortingType].order) {
      var sortedDataDesc = _.sortBy(this.notices, [function(o) { return o[sortingType]}]);
      this.notices = sortedDataDesc;
      this.sortedIcon[sorting_type].icon = 'chevron down icon';
    }
    else {
        var sortedDataAsc = _.sortBy(this.notices, [function(o) { return o[sortingType];}]).reverse();
        this.notices = sortedDataAsc;
        this.sortedIcon[sorting_type].icon = 'chevron up icon';
    }
 }
 /* End getDataSort */ 
 removeNotice(id:any) {

    var r = confirm("Are you sure you want to delete this noitce?");
    if (r == true) {
            this.firestore.collection("Notice").doc(id).delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
    } else {

    }

  }
 /* End removeNotice */ 
} 
