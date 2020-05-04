export const history = (prtContent) => {
  // let prtContent = document.getElementById("employee-history");

  var win = window.open("", "_blank");
  win.document.write(`<html><head>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css">
    <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <style>
        img {
      width: 62%;
      margin-left: 50px;
    }
    h3 {
      text-align: right;
    }
    </style>
    </head><body>

    <div class="container mt-5">   <img id="allHistoryLogo" class="mb-4" src="./../../../assets/Yotech Web color.png" alt="" style="width: 20%; margin-top: 10px; margin-right: 10px; margin-left: 40%">`);
  win.document.write(prtContent.outerHTML);
  win.document.write(`</div>
    <script>
    if(document.querySelector("#detailsLogo")){
      document.querySelector("#allHistoryLogo").style.display="none";
    }
      setTimeout(()=>{
         window.print()
      }, 3000)
      </script>
    </body></html>`);
};
