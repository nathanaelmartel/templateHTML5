
  $(document).ready(function () {

	  $("a[href^=http://]").not("a[href^=http://www.yourdomain]").attr("target", "blank");  
	  $("a[href^=http://]").not("a[href^=http://www.yourdomain]").attr("rel", "external");
    

  
  });
  