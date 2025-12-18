const loadCommentsBtnElement = document.getElementById("load-comments-btn");
const commentsSectionElement = document.getElementById("comments");
const commentsFormElement = document.querySelector('#comments-form form');
const commentTitleElement = document.getElementById('title');
const commentTextElement = document.getElementById('text');

function createCommentsList(comments) {
  const commentListElement = document.createElement("ol");

  for (const comment of comments) {
    const commentElement = document.createElement("li");
    commentElement.innerHTML = `<article class="comment-item">
    <h2>${comment.title}</h2>
    <p>${comment.text}</p>
    </article>
`;
commentListElement.appendChild(commentElement);
  }

  return commentListElement;
}

async function fetchCommentsForPost() {
  const postId = loadCommentsBtnElement.dataset.postid;
  try {
 const response = await fetch(`/posts/${postId}/comments`);

  if(!response.ok) {
    alert('Fetching comments failed!');
    return;
  }
  const responseData = await response.json();
  
  if (responseData && responseData.length > 0) {
  const commentsListElement = createCommentsList(responseData.comments);
  commentsSectionElement.innerHTML = '';
  commentsSectionElement.appendChild(commentsListElement);
  } else {
    commentsSectionElement.firstElementChild.textContent = '댓글을 찾을 수 없습니다. 추가하시겠습니까?';
  }
  }catch (error) {
    alert('댓글 가져오기에 실패했습니다!');
  }
}

 async function saveComment(event) {
    event.preventDefault();
    const postId = commentsFormElement.dataset.postid;

    const enteredTitle = commentTitleElement.value;
    const enteredText = commentTextElement.value;

    const comment = {title: enteredTitle, text: enteredText};

    try{
      const response = await fetch(`/posts/${postId}/comments`, {
          method: 'POST',
          body: JSON.stringify(comment),
          headers: {
              'Content-type': 'application/json'
          },
      });
    if(response.ok) {
      fetchCommentsForPost();
    } else {
      alert('댓글을 보낼 수 없습니다.');
    }
    } catch (error) {
      alert('Could not send request - maybe try again later!');
    }

 }

loadCommentsBtnElement.addEventListener("click", fetchCommentsForPost);
commentsFormElement.addEventListener('submit', saveComment);