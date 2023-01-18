/**
 * TODO: Rorrar el codigo
 */

const usernameText = document.getElementById('username');
const messageText = document.getElementById('message');
const avatarUrlText = document.getElementById('avatar-url');
const formButton = document.getElementById('form-button');

const webhook =
  'https://discord.com/api/webhooks/1065341764833120319/6puiC_27IqqzyD3uVuU4TKFr_Raeb7kmRKOyAqBTUM95WJJUswytwi6ASbkeQz3bWBkN';

const message = {
  content: 'Hello world',
  username: 'Nodejs',
  avatar_url: 'https://i.imgur.com/4ZQ9Z0C.png',
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
