/**
 * TODO: Reordenar el codigo
 */

const usernameText = document.getElementById('username');
const messageText = document.getElementById('message');
const avatarUrlText = document.getElementById('avatar-url');
const formButton = document.getElementById('form-button');
const webhookUrlText = document.getElementById('webhook-url');

let webhook = '';

const message = {
  content: '',
  username: '',
  avatar_url: '',
};

const postWebhookJson = async (webhook, message) => {
  let responseCode = 0;

  await fetch(webhook, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
    .then((response) => {
      response.json();
      responseCode = response.status;
      console.log(responseCode);
    })
    .then((json) => console.log(json))
    .catch((error) => console.log(error))
    .finally(() => {
      if (responseCode === 200 || responseCode === 204) {
        messageSentDoneAnimation();
      } else {
        messageSentErrorAnimation();
      }
    });
};

formButton.addEventListener('click', async (e) => {
  e.preventDefault();

  message.content = messageText.value;
  message.username = usernameText.value;
  message.avatar_url = avatarUrlText.value;
  webhook = webhookUrlText.value;
  postWebhookJson(webhook, message);
});

const messageSentDoneAnimation = () => {
  formButton.innerText = 'Message enviado';
  formButton.classList.add('sent');
  setTimeout(() => {
    formButton.innerHTML = 'Enviar mensaje';
    formButton.classList.remove('sent');
  }, 2000);
};

const messageSentErrorAnimation = () => {
  formButton.innerText = 'Error al enviar';
  formButton.classList.add('error');
  setTimeout(() => {
    formButton.innerHTML = 'Enviar mensaje';
    formButton.classList.remove('error');
  }, 2000);
};
