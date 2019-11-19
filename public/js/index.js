
 

var socket = io();
       socket.on("connect", function(){
           console.log("connected to server")
       });

       socket.on("disconnect", function(){
           console.log("disconnected from server")
       })

   
  socket.on("newMessage", function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a')

    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text:message.text,
        from:message.from,
        createdAt:formattedTime
    })

    jQuery('#messages').append(html)
    
   })

   socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var template = jQuery('#location-message-template').html()
    console.log(message,message.url,message.from,formattedTime)
    
    var html = Mustache.render(template,{
        url:message.url,
        from:message.from,
        createdAt:formattedTime
    })
    jQuery('#messages').append(html)
    
   })

   jQuery('#message-form').on('submit', function(e){
     e.preventDefault();
     var messageTextbox = jQuery('#message')
     socket.emit('createMessage',{
     from:"User",
     text:messageTextbox.val()
     },function(data){
     messageTextbox.val('');
     })
   })

   var locationButton = jQuery('#send-location');
     
     locationButton.on('click',function(e){
        e.preventDefault();
        if(!navigator.geolocation){
            return alert("Geolocation not supported by your browser")
            
        }

        locationButton.attr('disabled','disabled').text('sending location...')
        navigator.geolocation.getCurrentPosition(function(position){
         locationButton.removeAttr('disabled').text('sending location')
         socket.emit('createLocation',{
             latitude:position.coords.latitude,
             longitude:position.coords.longitude
        })
        }, function(){
            locationButton.removeAttr('disabled').text('sending location')
         alert("unable to fetch location")
         })
     })
