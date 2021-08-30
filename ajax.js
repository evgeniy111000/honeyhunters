jQuery(function($){
		var form=$("#form"),
		    inputname=$("#inputname"),
		    inputemail=$("#inputemail"),
		    textcomment=$("#textcomment"),
		    submit=$("#submit"),
		    loadstring=$("#loadstring"),
		    comments=$("#comments"),
		    infoname=$("#infoname"),
		    infoemail=$("#infoemail"),
		    infocomment=$("#infocomment");
		function progress_start(){
			inputname.prop("disabled",true);
			inputemail.prop("disabled",true);
			textcomment.prop("disabled",true);
			submit.prop("disabled",true);
			comments.hide();
			loadstring.show();
		}
		function progress_stop(){
			inputname.prop("disabled",false);
			inputemail.prop("disabled",false);
			textcomment.prop("disabled",false);
			submit.prop("disabled",false);
			loadstring.hide();
			comments.show();
		}
		function start_ajax(write){
				progress_start();
				$.ajax({
					method:"post",
					url:"controller.php",
					data:{
						'write':write,
						'inputname':inputname.prop("value").trim(),
						'inputemail':inputemail.prop("value").trim(),
						'textcomment':textcomment.prop("value").trim()
					},
					datatype:"json",
					cache:false,
					error:function(jqxhr,status,errorthrown){$("#removal").remove(); progress_stop(); alert(errorthrown);},
					success:function(response,status,jqxhr){
						$("#removal").remove();
						if (Array.isArray(response)){
							var text="<div id='removal'>",card="";
							for(var i=0,column=0;i<response.length;i++,column++){
								if ((i+1)%2==0){
									card=card+"<div class='col'><div class='card lightgreen'>";
								} else {
									card=card+"<div class='col'><div class='card'>";
								}
								card=card+"<div class='card-header'>"+response[i]["name"]+"</div>";
								card=card+"<div class='card-body'>";
								card=card+"<div class='card-title'>"+response[i]["email"]+"</div>";
								card=card+"<p class='card-text'>"+response[i]["text"]+"</p>";
								card=card+"</div></div></div>";	
								if (column==2 || i==response.length-1){
									card="<p><div class='row'>"+card+"</div></p>";
									text=text+card;
									card="";
									column=-1;
								}
							}
							text=text+"</div>";
							comments.append(text);
							progress_stop();
						} else {
							progress_stop();
							alert(response);
						}
					}					
				});
		}
		start_ajax(0);
		form.validate({
			rules:{
				inputname:{required:true,rangelength:[1,15]},
				inputemail:{required:true,email:true,rangelength:[5,30]},
				textcomment:{required:true,rangelength:[1,1000]}
			},
			messages:{
				inputname:{
					required:"поле обязательно для заполнения",
					rangelength:"поле должно содержать от 1 до 15 символов"
				},
				inputemail:{
					required:"поле обязательно для заполнения",
					email:"ваш email адрес должен быть в формате name@domain.com",
					rangelength:"поле должно содержать от 5 до 30 символов"
				},
				textcomment:{
					required:"поле обязательно для заполнения",
					rangelength:"поле должно содержать от 1 до 1000 символов"
				}
			},
			errorPlacement:function(error, element){
				if (element.is("#inputname")){
					infoname.append(error);
                		}
				if (element.is("#inputemail")){
					infoemail.append(error);
				}
				if (element.is("#textcomment")){
					infocomment.append(error);
				}
            		},
			submitHandler:function(element){
				start_ajax(1);
			}
		});
});