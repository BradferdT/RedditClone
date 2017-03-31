$(document).ready(function(){
  $.ajax({
    url: 'http://localhost:8000/posts'
  })
  .done(function(data){
    data.forEach(function(element){
      $('.with-header').append(`<li class="collection-item">${element.id}| <span class="body_message">${element.body}</span><span class="right"><a class="waves-effect waves-light btn red"><i class="material-icons left" id="deleteBtn">delete</i>Remove</a></span></li>`);
    })
  })
  .fail(function(err){
    alert(err);
  })
  $('#postBtn').click(function(){
    var body = $('#user_post_message').val();
    var obj = { "id": 1, "body": body};
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8000/newpost',
      data: obj
    })
    .done(function(data){
      console.log('success');
    })
    .fail(function(data){
      console.log('Error');
    })
    setTimeout(function(){
      location.reload();
    },1000);
  });

  $(document).on('click', '#deleteBtn', function(){
    alert('testing');
  })

})
