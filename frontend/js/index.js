const uploadForm = document.querySelector(".file-upload__form");
const fileInput = document.querySelector(".file-input");
const progressContainer = document.querySelector(".progress-container");
const uploadedContainer = document.querySelector(".uploaded-container");
const failureContainer = document.querySelector(".faliure-container");
const emailField = document.querySelector(".email");
const token = localStorage.getItem("access_token");

uploadForm.addEventListener("click", (e) => {
  if (e.target !== fileInput) {
    fileInput.click();
  }
  return false;
});

fileInput.onchange = async ({ target }) => {
  let file = target.files[0];
  if (!file) return;

  let fileName = truncateFileName(file.name);
  let email = emailField.value;
  const Id = await getId(email);

  if (Id) {
    console.log("User ID:", Id);
    uploadFile(file, fileName, Id);
  }
  return false;
};

async function getId(email) {
  console.log("Fetching ID for:", email);
  const params = new URLSearchParams({ email });

  try {
    const response = await fetch(
      `http://localhost:3000/user/find?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to get user");

    const body = await response.json();
    return body.id;
  } catch (error) {
    console.error("Failed to retrieve user ID:", error);
    return null;
  }
}

async function uploadFile(file, name, Id) {
  const endpoint = `http://localhost:3000/file/upload/${Id}`;
  let formData = new FormData();
  formData.append("file", file, name);

  // Compute HMAC
  const hmacKey =
    "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
  const hmacHex = await generateHMAC(await file.arrayBuffer(), hmacKey);

  // Create progress indicator
  progressContainer.innerHTML = `
    <li class="row">
      <i class="fas fa-file-alt"></i>
      <div class="content-wrapper">
        <div class="details-wrapper">
          <span class="name">${name} | <span>Uploading</span></span>
          <span class="percent">0%</span>
        </div>
        <div class="progress-bar-wrapper">
          <div class="progress-wrapper" style="width: 0%"></div>
        </div>
      </div>
    </li>`;

  let progressBar = progressContainer.querySelector(".progress-wrapper");
  let percent = progressContainer.querySelector(".percent");

  let xhr = new XMLHttpRequest();
  xhr.open("POST", endpoint, true);
  xhr.setRequestHeader("Authorization", `Bearer ${token}`);
  xhr.setRequestHeader("x-file-hmac", hmacHex);

  xhr.upload.onprogress = (event) => {
    if (event.lengthComputable) {
      let percentComplete = Math.floor((event.loaded / event.total) * 100);
      progressBar.style.width = `${percentComplete}%`;
      percent.textContent = `${percentComplete}%`;
    }
  };

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      progressContainer.innerHTML = "";

      if (xhr.status === 201) {
        let data = JSON.parse(xhr.responseText);
        let fileSize = (data.size / (1024 * 1024)).toFixed(2) + " MB";

        uploadedContainer.insertAdjacentHTML(
          "afterbegin",
          `
          <li class="row">
            <div class="content-wrapper upload">
              <i class="fas fa-file-alt"></i>
              <div class="details-wrapper">
                <span class="name">${name} | <span>Uploaded</span></span>
                <span class="file-size">${fileSize}</span>
              </div>
            </div>
          </li>`
        );
      } else {
        let errorMarkup = `<div class="error" style="color:red">${
          JSON.parse(xhr.response).message
        }</div>`;
        uploadedContainer.innerHTML = errorMarkup;
        console.error("Error uploading the file");
      }
    }
  };

  xhr.send(formData);
}

async function generateHMAC(data, key) {
  const encoder = new TextEncoder();
  const keyBuffer = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", keyBuffer, data);
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function truncateFileName(name) {
  if (name.length >= 12) {
    let splitName = name.split(".");
    return splitName[0].substring(0, 10) + "... ." + splitName[1];
  }
  return name;
}

// Prevent form submission
document.getElementById("form_validate").addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
});
