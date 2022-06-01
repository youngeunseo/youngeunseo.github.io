const emails = document.getElementsByClassName("email-group-item");

axios.defaults.baseURL = "https://sye-temp-mail-xk9jp.ondigitalocean.app/";

const deniedMails = [
  "vddaz.com",
  "1secmail.net",
  "oosln.com",
  "wwjmp.com",
  "esiix.com",
  "1secmail.com",
  "1secmail.org",
];

const emailList = document.getElementById("email-list");
const emailInput = document.getElementById("email-input");
const newBtn = document.getElementById("new-btn");

async function setEmailList(e){
  console.log("AA");
  emailList.innerHTML = `<h3 style="text-align: center;">Reloading...</h3>`;
  let detailResponse = await axios.get(`/messages/${email}/1/10`);
  if (detailResponse.data.messages.length){
    emailList.innerHTML = ``;
    for (let message of detailResponse.data.messages) {
      emailList.innerHTML += `<li class="list-group-item"><b>${message.subject}</b></li>`;
    }
  } else {
    emailList.innerHTML = `<h3 style="text-align: center;">No Inbox</h3>`;
  }

  getNewEmail();
}
let email; 

const getNewEmail = async () => {
  newBtn.innerHTML = `
  <span
    class="spinner-border spinner-border-sm"
    role="status"
    aria-hidden="true"
  ></span>
  `;
  const response = await axios.post('/');
  email = response.data.email;
  while (deniedMails.indexOf(email.split("@").pop()) != -1) {
    const response = await axios.post("/");
    email = response.data.email;
  }
  emailInput.value = email;
  newBtn.innerHTML = 'New Email';
}

window.onload = getNewEmail

async function test(){
  let detailResponse = await axios.get(`/messages/${email}/1/10`);
  console.log(detailResponse);
}

document.getElementById('refresh-btn').addEventListener('click', setEmailList)


document.getElementById('new-btn').addEventListener('click', getNewEmail)

document.getElementById("copy-btn").addEventListener("click", async (e) => {
  /* Select the text field */
  emailInput.select();

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(emailInput.value);

  document.getElementById("copy-message").style.visibility = "visible";

  setTimeout(() => {
    document.getElementById("copy-message").style.visibility = "hidden";
  }, "2000");
});

for (let email of emails){
  email.addEventListener('mouseover', (e) => {
    e.target.classList.add('active')
  })
  email.addEventListener('mouseleave', (e) => {
    e.target.classList.remove("active");
  })
}

setInterval(setEmailList, 15000);