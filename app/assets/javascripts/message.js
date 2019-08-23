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
    .fail(function(message){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
