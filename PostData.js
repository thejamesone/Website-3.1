 function post_data(tabletop, data, sheet, content) {
     
    
     console.log('post_data called');
        var element = "div";
        var page = document.getElementById("page");
        var container = document.getElementById("container");
        //count all the rows in sheet
        console.log(sheet);
        row_count = tabletop.sheets(sheet).column_names.length;
        
        for (i = 0; i < row_count; i++){
          
            //if content included then skip iterator
        if (!content){
          
          var current_col = tabletop.sheets(sheet).column_names[i];
          content = "";
          
          var col_length = current_col.length;
          var end_number = current_col[col_length-1];
          var id = "";
          
          
          var type = current_col[0] + current_col[1] + current_col[2];
          
          switch (type){
            case "Sub":
              content = "Subhead";
              element = "h2";
              break;
            case "Div":
              content = "Divider";
              element = "hr";
              break;
            case "Tit":
              content = "Title";
              element = "h1";
              break;
            case "Ima":
              content = "Image";
              element = "iron-image";
              break;
            case "Vid":
              content = "Video";
              element = "video";
              break;
            case "Abs":
              content = "Abstract";
              element = "p";
              break;
            case "Bod":
              content = "Body";
              element = "p";
              break;
            case "Pul":
              content = "Pullquote";
              element = "blockquote";
              break;
            case "Blo":
              content = "Blockquote";
              element = "blockquote";
              break;
          }
          
          id = content;
          
          if (isNaN(end_number) === false){
            
            content = content + end_number;
            
          }
          
          
          
       }else {i = row_count;}
          
          /*
          //select the cell and make it into a node
          var textnode = document.createTextNode(tabletop.sheets(sheet).all()[0][content]);
          //create a DOM element and apply cell data to it
          var element_dom = document.createElement(element);
          element_dom.id=[content];
          
          if (current_col == "Image"){
            element_dom.width="100%";
            element_dom.height="400px";
            element_dom.sizing="cover";
            element_dom.src=tabletop.sheets(sheet).all()[0][content];
            page.appendChild(element_dom);
            
          }else{
        
            element_dom.appendChild(textnode);
            page.appendChild(element_dom);
          
          }
          */
          if(type == "Div") {
            var element_dom = "<"+ element + " class=\"section-divider\"" + "></" + element + ">";
            container.innerHTML = container.innerHTML + element_dom;
          }
          
          if (!tabletop.sheets(sheet).all()[0][content]) {
            content = "";
          }else{
          
          
          if (type == "Ima"){
            var element_dom = "<"+ element + " id=\"" + [id] + "\"" + " style=\"width:100%; height:506px;\" sizing=\"cover\" src=\"" + tabletop.sheets(sheet).all()[0][content] + "\">";
            container.innerHTML = container.innerHTML + element_dom;
            if (!tabletop.sheets(sheet).all()[1][content]){}else{
            var caption = "<figcaption>" + tabletop.sheets(sheet).all()[1][content] + "</figcaption>";
            container.innerHTML = container.innerHTML + caption;
            }
          }else{
            var element_dom = "<"+ element + " class=\"" + [id] + "\"" + ">" + tabletop.sheets(sheet).all()[0][content] + "</" + element + ">";
            container.innerHTML = container.innerHTML + element_dom;
          }
       
          content = "";
          
          //set the first image as a header image. 
          var firstImg = document.getElementsByTagName("iron-image")[0];
          firstImg.id = "HeaderImage";
          page.insertBefore(firstImg, page.firstChild);
          
         // var menu = document.getElementsByTagName("paper-toolbar")[0];
         //page.insertBefore(menu, page.firstChild);
          }
           
          }
      }