angular.module('starter.controllers', ['ionic'])
.controller('listCtrl', function($scope,$state,$ionicHistory,$ionicLoading,$stateParams,$cordovaSQLite,$cordovaCamera,$ionicModal,$state,$rootScope,$cordovaToast) {
      console.log("Item list controller");

     
              $scope.spin="";


             
       $ionicModal.fromTemplateUrl('partials/sam-modal.html', {
              scope: $scope
            }).then(function(modal) {
              animation: 'slide-in-up'
              $scope.modal = modal;
            });

             $scope.doSomething=function()
             {
                console.log("modal open");
              $scope.modal.show();

             } 


             $scope.closeModal = function() {
              $scope.modal.hide();
                 
  };

               $scope.$root.cls = "#2e3841";

  				 $scope.colorclick=function()
                  {
                      $scope.$root.cls = "#f69300";
                                           
                  }
      $scope.colorclick1=function()
                  {
                      $scope.$root.cls = "#f44336";
                                           
                  }
              
      $scope.colorclick2=function()
                  {
                      $scope.$root.cls = "#673ab7";
                                           
                  }
                  
      $scope.colorclick3=function()
                  {
                      $scope.$root.cls = "#cddc39";
                                          
                  }
      $scope.colorclick4=function()
                  {
                      $scope.$root.cls = "#795548";
                                           
                  }
       $scope.colorclick5=function()
                  {
                      $scope.$root.cls = "#607d8b";
                                          
                  }

       $scope.colorclick6=function()
                  {
                      $scope.$root.cls = "#e91e63";
                                           
                  }
              
      $scope.colorclick7=function()
                  {
                      $scope.$root.cls = "#2196f3";
                                           
                  }
                  
      $scope.colorclick8=function()
                  {
                      $scope.$root.cls = "#1b5e20";
                                           
                  }
      
                    

                     $scope.addgrocery=function(add)
        {
     
            console.log($scope.cls);
                    
                       if( add=="" ||add==undefined || add.list==""||add.list==undefined )
                        {
                          alert("Please enter category name.");
                          return;
                        }

                    if($scope.cls=="#2e3841")
                    {
                      alert("Please select the colorcode.");
                      return;
                    }
                   
            var query = "INSERT INTO grocery (listname, colorcode) VALUES (?,?)";
            
            $cordovaSQLite.execute(db, query, [add.list, $scope.cls]).then(function(res) {
            
            console.log("INSERT ID -> " + res.insertId);
     window.location.reload();
            $scope.message="Category added successfully";
                        $scope.duration="long";
                        $scope.location="bottom";
                 $cordovaToast.show($scope.message, $scope.duration, $scope.location).then(function(success) {

            console.log("The toast was shown");
        }, function (error) {
            console.log("The toast was not shown due to " + error);
        });
    

        }, function (err) {
            console.error(err);
            
        });
    }
    			$scope.arrname=[];
          $scope.colorarr=[];
             setTimeout(function() {
        var query = "SELECT * FROM grocery ";
        $cordovaSQLite.execute(db, query).then(function(res) 
        {
                    if(res.rows.length > 0) {

          for(var i=0;i<res.rows.length;i++){
          	     
                            			
                  
                $scope.arrname.push(res.rows.item(i));
               	$scope.headColor=res.rows.item(i).colorcode;
                $scope.colorarr.push($scope.headColor);             
                      
                  $scope.spin="done";
                  $scope.blnk="";
               }

               } 
            else {
                console.log("No results found");
                $scope.blnk="done";
                $scope.spin="done";
            }

        }, function (err) {
            console.error(err);
            alert("Error");
        });
    }, 1000);



                               $scope.deletegro =function(arr)
                 {                  console.log(arr);
                             $scope.grocery_id;
                              console.log(arr.grocery_id);
                          console.log("del fun");
                  
      var query = "DELETE  FROM grocery WHERE grocery_id = ?";
            
            $cordovaSQLite.execute(db, query, [arr.grocery_id]).then(function(res) {
                 $scope.arrname.splice($scope.arrname.indexOf(arr), 1);
            console.log("DELETE ID -> " + res.deleteId);
          
        }, function (err) {
            console.error(err);
            
        });


          }


    
})

.controller('itemlistCtrl', function($scope,$ionicHistory,$stateParams,$cordovaSQLite,$ionicModal,$state,$rootScope) {
      console.log("Item list controller");

       console.log($stateParams.grocery_id);
                                
                            
                        $scope.change=function(value,id){
                          console.log(value);
                            if(value==true){
                             
                            $scope.value=1;
                            }
                            else{
                             
                              $scope.value=0;
                            }

                           console.log(id); 

     var query = "UPDATE itemlist1 SET is_done = ? WHERE itemlist_id = ?";
                $cordovaSQLite.execute(db, query,[$scope.value,id]).then(function(res){
                          console.log(res);
                                })
                                    }



                  $scope.colorclick=function()
                  {
                      $scope.$root.cls = "bar-calm";                      
                  }


            $scope.grocery_id = $stateParams.grocery_id;

               $scope.myGoBack = function() 
               { 
              $state.go("list");
                };

                 $scope.next=function(){
       $ionicHistory.clearCache();
     $state.go('itemlistadd', {"grocery_id":$scope.grocery_id});
                 } 
            console.log($scope.grocery_id);

            	$ionicModal.fromTemplateUrl('partials/sam1-modal.html', {
              scope: $scope
            }).then(function(modal) {
              animation: 'slide-in-up'
              $scope.modal = modal;
            });
  
               $scope.val=function(value1)
                    {   
                        console.log(value1);
                          $rootScope.deleteid=value1;
                        $scope.modal2.show();
                    }

            $scope.openmodal=function()
             {
                console.log("modal open");
              $scope.modal.show();
             } 
             	var query = "SELECT * FROM grocery WHERE grocery_id = ?";
      			$cordovaSQLite.execute(db, query, [$scope.grocery_id]).then(function(res){		
              
              			if(res.rows.length > 0) {
                console.log("SELECTED -> " + res.rows.item(0).colorcode);
           			$scope.headColor=res.rows.item(0).colorcode;
                console.log($scope.headColor);
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });

                $scope.items=[];

            
               console.log($scope.grocery_id); 
                var query = "SELECT * FROM itemlist1 WHERE g_id = ?";
                $cordovaSQLite.execute(db, query,[$scope.grocery_id]).then(function(res){
                          console.log("res");
                      if (res.rows.length>0) {
                        for(var i=0;i<res.rows.length;i++){
                        console.log("SELECTED ->"+res.rows.item(i).itemname);
                            $scope.items.push(angular.copy(res.rows.item(i)));
                            console.log($scope.items);
                             console.log($scope.items[i].is_done); 
                          
                        }
                      }
                      else
                      {
                        console.log("error");
                      }
                })
                

                    $scope.deletegro =function()
                 {        
                             $scope.grocery_id;
                              console.log($scope.idpass);
                          console.log("del fun");
                  
      var query = "DELETE  FROM grocery WHERE grocery_id = ?";
            
            $cordovaSQLite.execute(db, query, [$scope.grocery_id]).then(function(res) {
                 $scope.arrname.splice($scope.arrname.indexOf(item), 1);
            console.log("DELETE ID -> " + res.deleteId);
            window.location="#/list";
          window.location.reload(); 
        }, function (err) {
            console.error(err);
            
        });


          }


               $scope.deletelist =function(item)
                 {    console.log("del list fun");
                
                          console.log($rootScope.deleteid);
                          
                      var query = "DELETE  FROM itemlist1 WHERE itemlist_id = ?";
            
                        $cordovaSQLite.execute(db, query, [item.itemlist_id]).then(function(res) {
                        
                            $scope.items.splice($scope.items.indexOf(item), 1);
                        console.log("DELETE ID -> " + res.deleteId);
                      
                    }, function (err) {
                        console.error(err);
                        
                    });

                

                 } 
                   
                  

                    $ionicModal.fromTemplateUrl('partials/action.html', {
                                scope: $scope
                              }).then(function(modal) {
                                animation: 'slide-in-up'
                                $scope.modal2 = modal;
                              });

                    


                   

})


.controller('itemlistaddCtrl', function($scope,$stateParams,$cordovaSQLite,$ionicHistory,$state,$cordovaDatePicker,$cordovaCamera,$ionicModal,$state,$rootScope,$filter,$cordovaLocalNotification, $cordovaToast)
 {
      console.log("Item list controller");
      console.log($stateParams);
          $scope.g_id=$stateParams.grocery_id;
          console.log($scope.g_id);


        $scope.additem=function(item){

                  console.log(item);
                 $scope.rdate = document.getElementById("rdate").value;
                  console.log($scope.rdate);          

                    $scope.ddate = document.getElementById("ddate").value;
                  console.log($scope.ddate);  
                  
                         
                          

                    
                      if(item==undefined || item==""){
                        alert("Please enter task name.")
                        return;
                      }
                     if(item.name == undefined || item.name == "")
                           {
                            
                            alert("Please enter task name.");
                            return;
                           }

                            if(item.note==undefined)
                            {
                              item.note="";
                            }


                               
                           var  re = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
                           var regex = /^(?!.*,$|.*\d{2,})(?:([\d*#]),?(?!.*\1))+$/;
                    if($scope.ddate == undefined || $scope.ddate =="" ){
                            alert("Please enter due date.");
                              return;
                    }
                    else if($scope.ddate != '') {
                          
                        if(regs = $scope.ddate.match(re)) {
                      
                          if(regs[1] < 1 || regs[1] > 12) {
                            alert("Invalid value for month: " + regs[1]);
                            $scope.ddate.focus();
                            return false;
                          }
                    
                          if(regs[2] < 1 || regs[2] > 31) {
                            alert("Invalid value for day: " + regs[2]);
                            $scope.ddate.focus();
                            return false;
                          }
                                        }
                       
}

        
 

                    if($scope.rdate == undefined || $scope.rdate ==""){
                            alert("Please enter reminder date.");
                              return;
                    }
                    else if($scope.rdate.value != '') {
                        if(regs = $scope.rdate.match(re)) {
                    
                          if(regs[1] < 1 || regs[1] > 12) {
                            alert("Invalid value for month: " + regs[1]);
                            $scope.rdate.focus();
                            return false;
                          }
                    
                          if(regs[2] < 1 || regs[2] > 31) {
                            alert("Invalid value for day: " + regs[2]);
                            $scope.rdate.focus();
                            return false;
                          }
                                        }
                       
}
                                            if(item.priority==undefined || item.priority=="")
                                {
                                  alert("Please select priority.");
                                }

                            if(item.priority.val == undefined || item.priority.val == "")
                           {
                            
                            alert("Priority required");
                            return;
                           }          

                                          
     console.log($scope.imgURI);

  var query = "INSERT INTO itemlist1 (g_id,itemname, amount,note,ddate,rdate,status,priority) VALUES (?,?,?,?,?,?,?,?)";
            
   $cordovaSQLite.execute(db, query, [$scope.g_id,item.name,item.quantity,item.note,$scope.ddate,$scope.rdate,$scope.imgURI,item.priority.val]).then(function(res) {
                 console.log($scope.imgURI);
             console.log("INSERT ID -> " + res.insertId);
            
             console.log("Recorded Inserted");
          
               



              $cordovaLocalNotification.add({
            id: res.insertId,  
            date: item.ddate,
            message: "Due pending for task " + " "+item.name,
            title: "ToDo Notification :",
            autoCancel: true,
            sound: null            
            }).then(function () {
                console.log("Notification was sent");
            });


             $cordovaLocalNotification.add({
            id: res.insertId+1,  
            date: item.rdate,
            message: "Remainder for" + " "+item.name,
            title: "ToDo Notification :",
            autoCancel: true,
            sound: null            
            }).then(function () {
                console.log("Notification was sent");
            });


         
                        $scope.message="Task added successfully";
                        $scope.duration="long";
                        $scope.location="bottom";
                 $cordovaToast.show($scope.message, $scope.duration, $scope.location).then(function(success) {

            console.log("The toast was shown");
        }, function (error) {
            console.log("The toast was not shown due to " + error);
        });
    



              $ionicHistory.clearCache();
     $state.go('itemlist', {"grocery_id":$scope.g_id}, {reload: true});
       
         }, function (err) {
             console.error(err);
            
         });
    }    
     
                  $scope.takePicture = function() {
        var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
 
              
        $cordovaCamera.getPicture(options).then(function(imageData) {
              $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
              $ionicHistory.clearCache();
                        $state.go('itemlistadd', {"grocery_id":$scope.g_id}, {reload: true});
        });
    }
              $scope.priorities=[{
             priority:"high",   
              prioritycol:"green",
              val:"2" 
              },
              {
                priority:"medium",
                prioritycol:"yellow",
                val:"1"
              },
              {
                priority:"low",
                prioritycol:"red",
                val:"0"
              }
              ]

              console.log($scope.priorities);
                $scope.reload=function(){
                  window.location.reload();
                }
  


             
                      var query = "SELECT * FROM grocery WHERE grocery_id = ?";
             $cordovaSQLite.execute(db, query, [$scope.g_id]).then(function(res){    
              
                      if(res.rows.length > 0) {
                  console.log("SELECTED -> " + res.rows.item(0).colorcode);
                  $scope.headColor=res.rows.item(0).colorcode;
                  console.log($scope.headColor);
              } else {
                  console.log("No results found");
              }
          }, function (err) {
              console.error(err);
         });


            



       })


.controller('itemlisteditCtrl',function($rootScope,$scope,$ionicHistory,$state,$stateParams,$cordovaSQLite,$filter,$cordovaCamera)
{
      console.log("itemlisteditCtrl");
      console.log($stateParams.itemlist_id);
        $scope.itemlist_id=$stateParams.itemlist_id;
         
          $scope.items;
          var g_id; 

        $scope.goBack=function()
        {   console.log($scope.g_id);
            window.location="#/itemlist/"+$scope.g_id;
                    console.log(window.location);
    

                   }
                
                         
                       $scope.discolor=function(){ 
                console.log($scope.g_id);
               var query = "SELECT * FROM grocery WHERE grocery_id = ?";
             $cordovaSQLite.execute(db, query, [$scope.g_id]).then(function(res){    
              
                     if(res.rows.length > 0) {
                 console.log("SELECTED -> " + res.rows.item(0).colorcode);
                 $scope.headColor=res.rows.item(0).colorcode;
                 console.log($scope.headColor);
             } else {
                 console.log("No results found");
             }
         }, function (err) {
             console.error(err);
         });
           } 

 
            $scope.takePicture = function() {
        var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
 
              
        $cordovaCamera.getPicture(options).then(function(imageData) {
              $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {

              $ionicHistory.clearCache();
                        $state.go('itemlistedit', {"itemlist_id":$scope.itemlist_id}, {reload: true});

        });
    }


          $scope.edititem=function()
          {    
               if($scope.items==undefined || $scope.items=="")
             {
                  alert("Please fullfill all the require details.");
                  return;
             }
                      if($scope.items.note==undefined)
                      {
                        $scope.items.note="";
                      }
                        $scope.rdate = document.getElementById("rdate").value;
                  console.log($scope.rdate);          

                    $scope.ddate = document.getElementById("ddate").value;
                     
                  console.log($scope.ddate);  



                if($scope.items.itemname==undefined||$scope.items.itemname=="")
                {
                    alert("Please enter task name.");
                    return;
                }
                if($scope.ddate==undefined||$scope.ddate=="")
                {
                    alert("Please enter due date.");
                    return;
                }

                    if($scope.rdate==undefined||$scope.rdate=="")
                {
                    alert("Please enter reminder date.");
                    return;
                } 


              
               
                var query = "UPDATE itemlist1 SET itemname = ? ,note = ?,ddate = ?, rdate= ?, status= ? WHERE itemlist_id = ?";
                $cordovaSQLite.execute(db, query,[$scope.items.itemname,$scope.items.note,$scope.ddate,$scope.rdate,$scope.imgURI,$scope.items.itemlist_id]).then(function(res){
                          console.log(res);
                      if (res.rows.length>0) {
                        
                        console.log("SELECTED ->"+res.rows.item(0));
                              
                      }
                      else
                      {
                        console.log("error");
                      }
                })
             
                 

                         $ionicHistory.clearCache();
                        $state.go('itemlist', {"grocery_id":$scope.g_id}, {reload: true});

          }
              



                var query = "SELECT * FROM itemlist1 WHERE itemlist_id = ?";
                $cordovaSQLite.execute(db, query,[$scope.itemlist_id]).then(function(res){
                          console.log("res");
                      if (res.rows.length>0) {
                            $scope.items=angular.copy(res.rows.item(0));
                            console.log($scope.items);
                            console.log($scope.items.ddate);
                            
                          document.getElementById('ddate').value=$scope.items.ddate;
                          document.getElementById('rdate').value=$scope.items.rdate;
                                  $scope.g_id=$scope.items.g_id;
                              console.log($scope.g_id);
                               $scope.discolor(); 
                      }
                      else
                      {
                        console.log("error");
                      }
                })


})