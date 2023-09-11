import * as jose from "https://cdnjs.cloudflare.com/ajax/libs/jose/4.14.4/index.js"

async function main() {  
  const locationPromise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  });
  
  async function generateJwt(secret) {
    const alg = 'RS256'
    const privateKey = await jose.importPKCS8(secret.private_key, alg)
    return await new jose.SignJWT({})
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer(secret.client_email)
    .setSubject(secret.client_email)
    .setAudience('https://sheets.googleapis.com/')
    .setExpirationTime('1h')
    .sign(privateKey)
  }
  
  async function getSecret() {
    let success = false;
    let errorMessage = null;
    let secret64 = window.localStorage.getItem("service_account_secret_base64");
    while (!success) {
      try {
        const secret = JSON.parse(atob(secret64));
        const jwt = await generateJwt(secret);
        const response = await sendDataToSheets(secret.config, jwt, []);
        if (response.ok) {
          break;
        } else {
          errorMessage = await response.text();
        }
      } catch (exception) {
        errorMessage = `${exception}`;
      }
      if (secret64 == null || errorMessage == null) {
        secret64 = prompt(`Kerem szepen a secretet uwu:3`);
      } else {
        secret64 = prompt(`Jelszo ist kein jo please try megint (${errorMessage})`);
      }
      
      if (secret64 == null) {
        return null;
      }
      window.localStorage.setItem("service_account_secret_base64", secret64);
    }
    return JSON.parse(atob(secret64));
  }
  
  function resetSecret() {
    window.localStorage.removeItem("service_account_secret_base64");
    location.reload();
  }
  document.getElementById("reset_secret").addEventListener("click", _event => {
    resetSecret();
  })

  function fullscreen() {
    document.body.requestFullscreen();
  }
  document.getElementById("fullscreen").addEventListener("click", _event => {
    fullscreen();
  })

  const secret = await getSecret();
  const initGetJwt = async function(secret) {
    let currentJwt = await generateJwt(secret);
    let genTime = new Date();
    return async () => {
      const currentTime = new Date();
      if (currentTime - genTime > 30 * 1000 * 1000) {
        currentJwt = await generateJwt();
      }
      return currentJwt;
    };
  };
  
  const getJwt = await initGetJwt(secret);
  
  let keyBuffer = "";
  document.addEventListener("keypress", async (event) => {
    event.preventDefault();
    if (event.key === "Enter") {
      try {
        const location = await locationPromise;
        const time = new Date();
        await enqueueRawInput(`${location.coords.latitude},${location.coords.longitude}`, time, keyBuffer)
        unfreezeGif();
        scheduleGifFreeze();
        keyBuffer = "";
      } catch (exception) {
        setDisplayedError(exception);
      }
    } else {
      keyBuffer += event.key;
    }
  });

  let gifFreezeTimeoutId = null;
  function scheduleGifFreeze() {
    if (gifFreezeTimeoutId != null) {
      clearTimeout(gifFreezeTimeoutId);
    }
    gifFreezeTimeoutId = setTimeout(freezeGif, 1.5 * 1000);
  }
  function createFrozenGifImg() {
    var c = document.createElement('canvas');
    var w = c.width = gifImg.width;
    var h = c.height = gifImg.height;
    c.getContext('2d').drawImage(gifImg, 0, 0, w, h);
    for (var j = 0, a; a = gifImg.attributes[j]; j++) {
      c.setAttribute(a.name, a.value);
    }
    return c;
  }
  const gifImg = document.images.namedItem("original_gif");
  const gifImgParent = gifImg.parentNode;
  const frozenGifImg = createFrozenGifImg();
  function freezeGif() {
    if (gifImgParent.contains(gifImg)) {
      gifImgParent.replaceChild(frozenGifImg, gifImg);
      const element = document.getElementById("floatingtext");
      element.textContent = "";
    }
  }
  function unfreezeGif() {
    if (gifImgParent.contains(frozenGifImg)) {
      gifImgParent.replaceChild(gifImg, frozenGifImg);
      const element = document.getElementById("floatingtext");
      element.textContent = "nyam nyam";
    }
  }
  freezeGif();

  async function sendDataToSheets(config, jwt, values) {
    if (values.length > 0) return;
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheet_id}/values/${config.spreadsheet_range}:append?valueInputOption=RAW`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${jwt}`
      },
      body: JSON.stringify({
        "range": config.spreadsheet_range,
        "majorDimension": "ROWS",
        "values": values
      }),
      
    });
    
    return response;
  }
  
  function initTimer() {
    let timeoutId = null; 
    
    return () => {
      if (timeoutId === null) {
        timeoutId = setTimeout(async () => {
          timeoutId = null;
          await timeoutHandler();
        }, 4 * 1000);
      }
    }
  }
  
  async function timeoutHandler() {
    try {
      const queue = JSON.parse(window.localStorage.getItem("raw_input_queue") ?? "[]");
      const size = queue.length;
      if (size === 0) {
        return;
      }
      const response = await sendDataToSheets(secret.config, await getJwt(), queue);
      if (!response.ok) {
        throw new Error(await response.text());
      }
      // Refetch the queue as we may have inserted new items.
      const freshQueue = JSON.parse(window.localStorage.getItem("raw_input_queue") ?? "[]");
      // Remove sent items;
      const newQueue = freshQueue.slice(size);
      window.localStorage.setItem("raw_input_queue", JSON.stringify(newQueue));
      setDisplayQueueSize(newQueue.length);
      clearDisplayedError();
    } catch (exception) {
      setDisplayedError(exception);
      poke();
    }
  }

  function setDisplayedError(exception) {
    document.getElementById("error").textContent = `${exception}`;
  }

  function clearDisplayedError() {
    document.getElementById("error").textContent = "";
  }
  
  function setDisplayQueueSize(queueSize) {
    document.getElementById("queue_size").textContent = `queue: ${queueSize}`;
  }

  clearDisplayedError();
  setDisplayQueueSize(JSON.parse(window.localStorage.getItem("raw_input_queue") ?? "[]").length);

  const poke = initTimer();
  poke();
  
  async function enqueueRawInput(location, time, id) {
    const formattedDateKey = `${time.getFullYear()}` + "-" + `${time.getMonth() + 1}`.padStart(2, "0") + "-" + `${time.getDate()}`.padStart(2, "0") + "|" + id;
    const queue = JSON.parse(window.localStorage.getItem("raw_input_queue") ?? "[]");
    queue.push([location, time.toISOString(), id, formattedDateKey]);
    window.localStorage.setItem("raw_input_queue", JSON.stringify(queue));
    setDisplayQueueSize(queue.length);
    poke();
  }
  
}



window.addEventListener("load", async () => {
  await main();
})