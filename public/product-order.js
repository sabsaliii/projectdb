
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

   