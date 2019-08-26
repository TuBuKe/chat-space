$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-message-id = ${message.id}>
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

  var reloadMessages = function() {
    last_message_id = $('.message:last').data('message-id');
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message) {
        if (message.id > last_message_id) {
          insertHTML += buildHTML(message);
        }
      });
      $('.messages').append(insertHTML);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      alert('自動更新に失敗しました。');
    });
  };

  var interval = setInterval(function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      reloadMessages();
    } else {
      clearInterval(interval);
    }
  }, 5000)
});