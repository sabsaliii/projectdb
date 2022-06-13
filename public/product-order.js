
function change(t){
    //var min_qty = '수량버튼'*1;
    // alert(t);
    var opt = t
    var min_qty = 1;
    var this_qty = document.getElementById('quantity');
    var current_qty =parseInt(this_qty.value);
    var max_qty = 200; // 현재 재고
    if(opt=='m'){
      current_qty -= 1;
      if(current_qty<min_qty){
        //alert("최소구매수량 이상만 구매할 수 있습니다.");
        alert("수량은 1개 이상 입력해 주십시오.");
        current_qty=1;
        return;
        }
      }
      else if(opt=='p'){
        current_qty += 1;
        if(current_qty>max_qty){
          alert("죄송합니다. 재고가 부족합니다.");
          return;
          }
      }else{
          alert('noting');
      }
      var price = document.getElementById('basic-price');
      var basic_price = price.innerHTML;
      var show_total_amount = basic_price * current_qty;
    //   alert(show_total_amount);
      //$("#ct_qty_txt").text(this_qty); 
      document.getElementById('quantity').value = current_qty;
      document.getElementById('price').innerHTML = show_total_amount;
    //   $("#it_pay").val(show_total_amount);
    //   $("#total_amount").html(show_total_amount.format());
    
    }

function view_form(){
        let view =document.getElementById("order_form").style.display;
        if(view=='none'){    
           document.getElementById("order_form").style.display ='block';
        }else if( view=='block'){
        document.getElementById("order_form").style.display ='none';
        }
}

   
function change2(t){
        var opt = t
        var min_qty = 1;
        var this_qty = document.getElementById('quantity');
        var current_qty =parseInt(this_qty.value);
        var max_qty = 200; 
        if(opt=='m'){
          current_qty -= 1;
          if(current_qty<min_qty){
            alert("수량은 1개 이상 입력해 주십시오.");
            current_qty=1;
            return;
            }
          }
          else if(opt=='p'){
            current_qty += 1;
           
          }else{
              alert('noting');
          } 
       
          document.getElementById('quantity').value = current_qty;
   }    


   function exportTableToCsv(tableId, filename) {
    if (filename == null || typeof filename === undefined) { filename = tableId; }
    filename += '.csv';

    const BOM = '\uFEFF';

    const table = document.getElementById(tableId);
    let csvString = BOM;
    for (let rowCnt = 0; rowCnt < table.rows.length; rowCnt++) { //행
      
      const rowData = table.rows[rowCnt].cells;
      console.log(rowData);
      for (let colCnt = 0; colCnt < rowData.length-3; colCnt++) { //열
        // let columnData = rowData[colCnt].innerHTML;
        let columnData = rowData[colCnt].innerText;
        if (columnData == null || columnData.length === 0) {
          columnData = ''.replace(/"/g, '""');  // escape double quotes
        } else {
          columnData = columnData.toString().replace(/"/g, '""'); // escape double quotes
        }
        csvString = `${csvString}"${columnData}",`; //쉼표로 구분, 열 당 하나씩 값 넣음
      }
    //   csvString = csvString.substring(0, csvString.length - 1);
      csvString += '\r\n'; //줄바꿈
    }
    // csvString = csvString.substring(0, csvString.length - 1); // 열 당 하나씩 값 넣어줌

    // Deliberate 'false', see comment below
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      var blob = new Blob([decodeURIComponent(csvString)], {
        type: 'text/csv;charset=utf8',
      });

      // Crashes in IE 10, IE 11 and Microsoft Edge
      // See MS Edge Issue #10396033: https://goo.gl/AEiSjJ
      // Hence, the deliberate 'false'
      // This is here just for completeness
      // Remove the 'false' at your own risk
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else if (window.Blob && window.URL) {
      // HTML5 Blob
      var blob = new Blob([csvString], { type: 'text/csv;charset=utf8' });
      var csvUrl = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.setAttribute('style', 'display:none');
      a.setAttribute('href', csvUrl);
      a.setAttribute('download', filename);
      document.body.appendChild(a);

      a.click();
      a.remove();
    } else {
      // Data URI
      const csvData = `data:application/csv;charset=utf-8,${encodeURIComponent(csvString)}`;
      var blob = new Blob([csvString], { type: 'text/csv;charset=utf8' });
      var csvUrl = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.setAttribute('style', 'display:none');
      a.setAttribute('target', '_blank');
      a.setAttribute('href', csvData);
      a.setAttribute('download', filename);
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
}

  $(function () {
    // Apply the plugin 
    $('#table').excelTableFilter();
  });
     