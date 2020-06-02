import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';


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

@Component({
  selector: 'app-notice-view',
  templateUrl: './notice-view.component.html',
  styleUrls: ['./notice-view.component.css']
})
export class NoticeViewComponent implements OnInit {
   notice_id:any;
   object:any;
   isCollapsed:boolean = true;
   isUpdateCollapsed:boolean = true;
   notification:any;



   notice: Notice = {
      _id: '',
    heading: 'Eid Holiday Notice',
    category: null,
    description: 'Upcoming holiday',
    startDate: null,
    endDate: null,
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

  constructor( 
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public router: Router) { 
    this.notice._id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
            var notice_id = this.notice._id; 
            this.firestore.collection('Notice').doc(notice_id).valueChanges().subscribe(object=> {
            this.object = object;

            var startDate = new Date(this.object.startDate);
            var ds = startDate.getDate();
            var ms = startDate.getMonth() + 1;
            var ys = startDate.getFullYear();


            var endDate = new Date(this.object.endDate);
            var de = endDate.getDate();
            var me = endDate.getMonth() + 1;
            var ye = endDate.getFullYear();
            

            this.notice.startDate = {year: ys, month: ms, day: ds};
            this.notice.endDate = {year: ye, month: me, day: de};
            this.notice.country = this.object.country;
            this.notice.is_approved = this.object.is_approved;


        }, error => {

        });
  }
  updateNotice (notice) {

    this.notification = null;
     
   
        var datetime = new Date().getTime();

        var startDate = notice.startDate.year + '-' + notice.startDate.month + '-' + notice.startDate.day;
        var startDate_ms = new Date(startDate).getTime();
        var startDate_hr = new Date(startDate_ms).toUTCString();

        var endDate = notice.endDate.year + '-' + notice.endDate.month + '-' + notice.endDate.day;
        var endDate_ms = new Date(endDate).getTime();
        var endDate_hr = new Date(endDate_ms).toUTCString();

        var duration = [
            {startDate_ms: startDate_ms},
            {endDate_ms: endDate_ms},
        ];
        var id = notice._id;

        // throw new Error('hi');

            this.firestore.collection('Notice').doc(id).set({
                    _id: id,
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
                    country: notice.country
              }).then(object => {
                  this.notification = 'Notice has been updated successfully';
                  

                  setTimeout(a =>  {
                      this.notification = null;                      
                  }, 1500);
                  
            })
            .catch(function(error) {
                  this.notification = 'Please put notice information correctly.';
            });
      

  }



  removeNotice(id:any) {
      var r = confirm("Are you sure you want to delete this Notice?");
    if (r == true) {
            this.firestore.collection("Notice").doc(id).delete().then((result) => {
                this.router.navigate(['finance/notice']);
                console.log("Notice successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing Notice: ", error);
            });
    } else {
    }
  }
}