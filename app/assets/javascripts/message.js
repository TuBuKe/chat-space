$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message">
                  <p class="message__user-name">
                    ${message.name}
                  </p>
                  <p class="message__post-date">
                    ${message.created_at}
                  </p>
                  <p class="message__latest-message">
                    ${content}
                    ${img}
                  </p>
                </div>`
  return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.hidden').val('');
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(message){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(message){
      $('.form__submit-btn').prop('disabled', false);　
    })
  })

  var interval = setInterval(function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      reloadMessages();
    } else {
      clearInterval(interval);
    }
  }, 5000)
});