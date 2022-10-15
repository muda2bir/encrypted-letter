const encrypt = document.getElementById("encrypt");
const decrypt = document.getElementById("decrypt");
const result = document.getElementById("result");
const secretKey = document.getElementById("secret_key");
const clear = document.getElementById("clear");
const text = document.getElementById("text");
const copy = document.getElementById("copy");

function encryptTheText() {
  if (secretKey.value === "") {
    alert("Please Enter your secret key!!");
    return;
  }

  encrypt.innerText = "Encrypting...";

  setTimeout(async () => {
    let response = await fetch("/api/encrypt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text.value,
        secretKey: secretKey.value,
      }),
    });

    let data = await response.json();
    result.innerText = data.encryptedText;
    secretKey.value = "";
    encrypt.innerText = "Encrypt";
  }, 2000);
}

function decryptTheText() {
  if (secretKey.value === "") {
    alert("Please Enter your secret key!!");
    return;
  }

  decrypt.innerText = "Decrypting...";
  setTimeout(async () => {
    let response = await fetch("/api/decrypt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text.value,
        secretKey: secretKey.value,
      }),
    });

    let data = await response.json();
    result.innerText = data.decryptedText;
    secretKey.value = "";
    decrypt.innerText = "Decrypt";
  }, 2000);
}

function clearAll() {
  secretKey.value = "";
  text.value = "";
  result.innerText = "";
}

async function copyTheResult() {
  await navigator.clipboard.writeText(result.innerText);
  copy.innerText = "Copied!";
  setTimeout(() => {
    copy.innerText = "Copy the Result";
  }, 2000);
}

encrypt.addEventListener("click", encryptTheText);
decrypt.addEventListener("click", decryptTheText);
clear.addEventListener("click", clearAll);
copy.addEventListener("click", copyTheResult);
