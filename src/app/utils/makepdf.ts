import pdfMake from 'bower_components/pdfmake/build/pdfmake.js'
import pdfFonts from 'bower_components/pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const salaryDetails = (basicInfo, data) => {
  console.log(basicInfo)
  var docDefinition = {
    content: [

      {
        text: 'Invoice month: April',
        alignment: 'center',
        lineHeight: 5
      },
      {
        text: "Invoice For",
        style: 'header',
        fontSize: '15',
        color: '#EE8B2B',
        lineHeight: 1
      },
      {
        text: `${basicInfo.staff_name} `,
        fontSize: 15,
        bold: true
      },
      {
        text: `${basicInfo.staff_email}`
      },
      {
        layout: 'lightHorizontalLines', // optional
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 100, '*'],

          body: [
            [`Issue Date`, '', '', `${data.date}`],
            ['Monthly Salary', '', '', `BDT- ${data.monthly_amount}`],
            [`Increment`, '', '', `BDT- ${data.type === 'Increment' ? data.amount : '0.0'}`],
            ['Promotion', '', '', `BDT- ${data.type === 'Promotion' ? data.amount : '0.0'}`],
            [`${data.bonus_type ? data.bonus_type : 'Bonus'}`, '', '', `BDT- ${data.bonus_amount ? data.bonus_amount : '0.0'}`],
            ['Total Amount', '', '', `BDT- ${data.total_amount}`]
          ]
        }
      }
    ]
  }

  return pdfMake.createPdf(docDefinition)
}


export const salaryHistory = (history, data) => {
  let historyArray = []
  historyArray.push(['Month', 'Issue Date', 'Monthly Amount', 'Salary Type', 'Salary Amount', 'Bonus Type', 'Bonus Amount', 'Total Amount'])
  let keys = Object.keys(history);
  for (let i = 0; i < keys.length; i++) {
    let k = Object.keys(history[keys[i]]);
    historyArray.push(
      [
        history[keys[i]]['month'], history[keys[i]]['date'],
        (history[keys[i]]['monthly_amount'] ? history[keys[i]]['monthly_amount'] : '0.00'),
        (history[keys[i]]['type'] ? history[keys[i]]['type'] : '-'), (history[keys[i]]['amount'] ? history[keys[i]]['amount'] : '0.00'),
        (history[keys[i]]['bonus_type'] ? history[keys[i]]['bonus_type'] : '-'), (history[keys[i]]['bonus_amount'] ? history[keys[i]]['bonus_amount'] : '0.00'),
        history[keys[i]]['total_amount']
      ]
    )

  }
  var docDefinition = {
    pageOrientation: 'landscape',
    content: [
      {
        text: 'Invoice month: April',
        alignment: 'center',
        lineHeight: 5
      },
      {
        text: "Invoice For",
        style: 'header',
        fontSize: '15',
        color: '#EE8B2B',
        lineHeight: 1
      },
      {
        text: data.staff_name,
        fontSize: 15,
        bold: true
      },
      {
        text: data.staff_email,
        lineHeight: 2
      },
      {
        text: data.staff_id
      },
      {
        layout: 'lightHorizontalLines', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [60, 70, 60, 100, 100, 100, 60, 60],
          body: historyArray
        }
      }
    ]
  }

  return pdfMake.createPdf(docDefinition)
}
