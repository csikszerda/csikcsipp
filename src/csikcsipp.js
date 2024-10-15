import * as jose from "https://cdnjs.cloudflare.com/ajax/libs/jose/4.14.4/index.js";

const encryptedSecret = {
  secret:
    "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",
  nonce: "6CfeTkjfZ88IsLfkjYp72qa00ToFpT6y",
};

const yayGifsDefault = [
  [
    "https://media.tenor.com/fRuh5_0f86sAAAAC/ok-nom-nom.gif",
    1.5,
    "100vw",
    "✔",
  ],
  [
    "https://media.tenor.com/8ZDLU43omvcAAAAC/kid-thumbs-up.gif",
    2.5,
    "100vw",
    "✔",
  ],
  [
    "https://media.tenor.com/V6B8eapBp6kAAAAC/little-girl-smile.gif",
    1.5,
    "100vw",
    "✔",
  ],
  [
    "https://media.tenor.com/pUW_A10-46MAAAAC/toddlers-and-tiaras-big-grin.gif",
    2.0,
    "100vw",
    "✔",
  ],
  [
    "https://media.tenor.com/po2_lvZOAqQAAAAC/excited-little-girl.gif",
    1.5,
    "100vw",
    "✔",
  ],
  ["./static/gifs/meghajlas.gif", 2.0, "100vw", "✔"],
];
const nayGifs = [
  [
    "https://media.tenor.com/1NHZzGKTmYwAAAAC/little-girl-meme.gif",
    1.5,
    "20vw",
    "ezmiez",
  ],
  [
    "https://media.tenor.com/djf8Lr3DdPwAAAAC/awkward-confused.gif",
    2.0,
    "20vw",
    "izé",
  ],
  [
    "https://media.tenor.com/lJb3NfIsVg4AAAAC/kid-awkward.gif",
    2.0,
    "20vw",
    "nemértem",
  ],
  [
    "https://media.tenor.com/XTiqQYf6f_UAAAAd/no-donkeys.gif",
    1.5,
    "20vw",
    "nem",
  ],
];

function toBase64(u8) {
  return btoa(String.fromCharCode.apply(null, u8));
}

function fromBase64(str) {
  return new Uint8Array(
    atob(str)
      .split("")
      .map(function (c) {
        return c.charCodeAt(0);
      })
  );
}

function passwordToKey(password) {
  return nacl
    .hash(new TextEncoder().encode(password))
    .slice(0, nacl.secretbox.keyLength);
}

window.encryptSecret = function (secret, password) {
  const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
  const encrypted = nacl.secretbox(
    new TextEncoder().encode(JSON.stringify(secret)),
    nonce,
    passwordToKey(password)
  );
  console.log(
    JSON.stringify({
      secret: toBase64(encrypted),
      nonce: toBase64(nonce),
    })
  );
};

function decryptSecret(password) {
  return JSON.parse(
    new TextDecoder().decode(
      nacl.secretbox.open(
        fromBase64(encryptedSecret.secret),
        fromBase64(encryptedSecret.nonce),
        passwordToKey(password)
      )
    )
  );
}

async function main() {
  const locationPromise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  async function generateJwt(secret) {
    const alg = "RS256";
    const privateKey = await jose.importPKCS8(secret.private_key, alg);
    return await new jose.SignJWT({})
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer(secret.client_email)
      .setSubject(secret.client_email)
      .setAudience("https://sheets.googleapis.com/")
      .setExpirationTime("1h")
      .sign(privateKey);
  }

  async function getSecret() {
    const passwordStorageKey = "secret_password";

    let success = false;
    let errorMessage = null;
    let password = window.localStorage.getItem(passwordStorageKey);
    let secret = null;
    while (!success) {
      try {
        secret = decryptSecret(password);
        const jwt = await generateJwt(secret);
        const response = await sendDataToSheets(secret.config, jwt, []);
        if (response.ok) {
          break;
        } else {
          errorMessage = await response.text();
        }
      } catch (exception) {
        console.error(exception);
        errorMessage = `${exception}`;
      }
      if (password == null || errorMessage == null) {
        password = prompt(`Kerem szepen a jelszot uwu:3`);
      } else {
        password = prompt(
          `Jelszo ist kein jo please try megint (${errorMessage})`
        );
      }

      if (password == null) {
        return null;
      }
      window.localStorage.setItem(passwordStorageKey, password);
    }
    return secret;
  }

  function resetSecret() {
    window.localStorage.removeItem(passwordStorageKey);
    location.reload();
  }
  document
    .getElementById("reset_secret")
    .addEventListener("click", (_event) => {
      resetSecret();
    });

  function fullscreen() {
    document.body.requestFullscreen();
  }
  document.getElementById("fullscreen").addEventListener("click", (_event) => {
    fullscreen();
  });

  const secret = await getSecret();
  const initGetJwt = async function (secret) {
    let currentJwt = await generateJwt(secret);
    let genTime = new Date();
    return async () => {
      const currentTime = new Date();
      if (currentTime - genTime > 30 * 60 * 1000) {
        currentJwt = await generateJwt(secret);
      }
      return currentJwt;
    };
  };

  const getJwt = await initGetJwt(secret);

  async function retrieveGifsFromSheets(config, jwt) {
    const range = "gifek!A2:A";
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheet_id}/values/${range}?majorDimension=ROWS`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return response;
  }

  async function retrieveCategoriesFromSheets(config, jwt) {
    const range = "csippkategoriak!A2:B";
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheet_id}/values/${range}?majorDimension=ROWS`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    const json = await response.json();
    const categories = [];
    for (let i = 0; i < json.values.length; i++) {
      if (json.values[i][1] === "TRUE") {
        categories.push({ category: json.values[i][0], index: i });
      }
    }

    return categories;
  }

  async function retrieveGifsFromSheetsOrDefault(config, jwt, defaultGifs) {
    let retrievedGifs = null;
    try {
      const response = await retrieveGifsFromSheets(config, jwt);
      retrievedGifs = (await response.json()).values.map((list) => [
        list[0],
        2.5,
        "100vw",
        "✔",
      ]);
    } catch (exception) {
      setDisplayedError(exception);
    }

    if (retrievedGifs === null) {
      return defaultGifs;
    } else {
      return retrievedGifs;
    }
  }

  async function promptCategory(categories) {
    return new Promise((resolve) => {
      const dialog = document.createElement("dialog");
      const container = document.getElementById(
        "prompt_choice_modal_container"
      );
      for (let i = 0; i < categories.length; i++) {
        const button = document.createElement("input");
        // <input type="button" id="fullscreen" value="Fullscreen"  style="justify-self: start;"/>
        button.setAttribute("type", "button");
        button.setAttribute("value", categories[i].category);
        button.style.fontSize = "10vw";
        button.addEventListener("click", (_event) => {
          container.removeChild(dialog);
          resolve(categories[i]);
        });
        dialog.appendChild(button);
      }
      container.appendChild(dialog);
      dialog.showModal();
    });
  }

  function createRng(state) {
    let offset = 0;
    function nextState() {
      state = nacl.hash(new Uint8Array(state)).buffer;
      offset = 0;
    }
    return {
      getUint32: function () {
        const size = 4;
        if (offset + size > 32) {
          nextState();
        }
        const value = new DataView(state, offset).getUint32();
        offset += size;
        return value;
      },
      getUint16: function () {
        const size = 2;
        if (offset + size > 32) {
          nextState();
        }
        const value = new DataView(state, offset).getUint16();
        offset += size;
        return value;
      },
    };
  }

  function fisherYates(rng, array) {
    for (let i = 0; i < array.length - 1; i++) {
      const j = i + (rng.getUint16() % (array.length - i));
      const s = array[i];
      array[i] = array[j];
      array[j] = s;
    }
  }

  function chooseForDay(gifsOrig) {
    const gifs = Array.from(gifsOrig);
    const weeksSinceEpoch = Math.floor(
      (new Date() / (1000 * 60 * 60 * 24) - 2) / 7 - 15
    ); // -2 day offset so that it changes on Sat. The week offset is arbitrary.
    const hash = nacl.hash(new TextEncoder().encode(gifs.length));
    const rng = createRng(hash.buffer);
    fisherYates(rng, gifs);
    const gif = gifs[weeksSinceEpoch % gifs.length];
    return gif;
  }

  // Message display without gif stuff
  function displayFloatingMessage(fontSize, textColor, text) {
    const element = document.getElementById("floatingtext");
    element.textContent = text;
    element.style.color = textColor;
    element.style.fontSize = fontSize;
  }
  function clearFloatingMessage() {
    const element = document.getElementById("floatingtext");
    element.textContent = "";
  }
  let displayMessageTimeoutId = null;
  function displayFloatingMessageWithTimeout(delay, fontSize, textColor, text) {
    displayFloatingMessage(fontSize, textColor, text);
    if (displayMessageTimeoutId != null) {
      clearTimeout(displayMessageTimeoutId);
    }
    displayMessageTimeoutId = setTimeout(() => {
      clearFloatingMessage();
    }, delay * 1000);
  }

  function displayBottomMessage(fontSize, textColor, text) {
    const element = document.getElementById("bottomtext");
    element.textContent = text;
    element.style.color = textColor;
    element.style.fontSize = fontSize;
  }

  const yayGifs = await retrieveGifsFromSheetsOrDefault(
    secret.config,
    await getJwt(),
    yayGifsDefault
  );
  const yayGif = chooseForDay(yayGifs);
  const yayGifUrl = yayGif[0];
  const yayGifDelay = yayGif[1];
  const yayGifSize = yayGif[2];
  const yayGifText = yayGif[3];

  const nayGif = chooseForDay(nayGifs);
  const nayGifUrl = nayGif[0];
  const nayGifDelay = nayGif[1];
  const nayGifSize = nayGif[2];
  const nayGifText = nayGif[3];

  const categories = await retrieveCategoriesFromSheets(
    secret.config,
    await getJwt()
  );
  const pickedCategory = await promptCategory(categories);
  displayBottomMessage("20vw", "lightgray", pickedCategory.category);

  let keyBuffer = "";
  document.addEventListener("keypress", async (event) => {
    event.preventDefault();
    if (event.key === "Enter") {
      try {
        const location = await locationPromise;
        const time = new Date();
        await enqueueRawInput(
          `${location.coords.latitude},${location.coords.longitude}`,
          time,
          keyBuffer
        );
        keyBuffer = "";
      } catch (exception) {
        setDisplayedError(exception);
      }
    } else {
      keyBuffer += event.key;
    }
  });

  let gifFreezeTimeoutId = null;
  function scheduleGifFreeze(delay) {
    if (gifFreezeTimeoutId != null) {
      clearTimeout(gifFreezeTimeoutId);
    }
    gifFreezeTimeoutId = setTimeout(() => {
      freezeGif();
      clearFloatingMessage();
    }, delay * 1000);
  }
  function createFrozenGifImg(gifImg) {
    var c = document.createElement("canvas");
    var w = (c.width = gifImg.width);
    var h = (c.height = gifImg.height);
    c.getContext("2d").drawImage(gifImg, 0, 0, w, h);
    for (var j = 0, a; (a = gifImg.attributes[j]); j++) {
      c.setAttribute(a.name, a.value);
    }
    return c;
  }

  async function waitForImgLoad(img) {
    return new Promise((resolve) => {
      img.onload = resolve;
    });
  }
  const yayGifImg = new Image();
  yayGifImg.src = yayGifUrl;
  yayGifImg.style = "width: 100%";
  const nayGifImg = new Image();
  nayGifImg.src = nayGifUrl;
  nayGifImg.style = "width: 100%";
  await Promise.all([waitForImgLoad(yayGifImg), waitForImgLoad(nayGifImg)]);
  const frozenYayGifImg = createFrozenGifImg(yayGifImg);

  const origGifImg = document.images.namedItem("original_gif");
  const gifImgParent = origGifImg.parentNode;
  gifImgParent.replaceChild(yayGifImg, origGifImg);
  function findCurrentImgOrCanvas() {
    for (const node of gifImgParent.childNodes) {
      if (node.nodeName === "IMG" || node.nodeName === "CANVAS") {
        return node;
      }
    }
    setDisplayedError("img node for gif not found");
  }
  function freezeGif() {
    const currentImg = findCurrentImgOrCanvas();
    gifImgParent.replaceChild(frozenYayGifImg, currentImg);
    const src = currentImg.src;
    currentImg.src = "";
    currentImg.src = src;
  }
  function unfreezeGif(img) {
    const currentImg = findCurrentImgOrCanvas();
    gifImgParent.replaceChild(img, currentImg);
  }
  function displayMessageWithGifUnfreeze(
    img,
    delay,
    fontSize,
    textColor,
    text
  ) {
    unfreezeGif(img);
    displayFloatingMessage(fontSize, textColor, text);
    scheduleGifFreeze(delay);
  }
  freezeGif();

  async function sendDataToSheets(config, jwt, values) {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheet_id}/values/${config.spreadsheet_range}:append?valueInputOption=USER_ENTERED`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          range: config.spreadsheet_range,
          majorDimension: "ROWS",
          values: values,
        }),
      }
    );

    return response;
  }

  function initTimer() {
    let timeoutId = null;

    return () => {
      if (timeoutId === null) {
        timeoutId = setTimeout(async () => {
          timeoutId = null;
          await timeoutHandler();
        }, 20 * 1000);
      }
    };
  }

  async function timeoutHandler() {
    try {
      const queue = JSON.parse(
        window.localStorage.getItem("raw_input_queue") ?? "[]"
      );
      const size = queue.length;
      if (size === 0) {
        return;
      }
      const deduplicatedQueue = [];
      let last = null;
      for (const row of queue) {
        // We don't look at the timestamp or location(index 0, 1) for
        // determining whether an event is a duplicate
        const current = JSON.stringify(row.slice(2));
        console.log(current);
        if (last === null || current != last) {
          deduplicatedQueue.push(row);
          last = current;
        }
      }
      const response = await sendDataToSheets(
        secret.config,
        await getJwt(),
        deduplicatedQueue
      );
      if (!response.ok) {
        throw new Error(await response.text());
      }
      // Refetch the queue as we may have inserted new items.
      const freshQueue = JSON.parse(
        window.localStorage.getItem("raw_input_queue") ?? "[]"
      );
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
    console.log(exception);
    document.getElementById("error").textContent = `${exception}`;
  }

  function clearDisplayedError() {
    document.getElementById("error").textContent = "";
  }

  function setDisplayQueueSize(queueSize) {
    document.getElementById("queue_size").textContent = `queue: ${queueSize}`;
  }

  clearDisplayedError();
  setDisplayQueueSize(
    JSON.parse(window.localStorage.getItem("raw_input_queue") ?? "[]").length
  );

  const poke = initTimer();
  poke();

  const noSleep = new NoSleep();
  noSleep.enable();

  const validCode = /(CSIK)?(\d{10})/;

  async function enqueueRawInput(location, time, id) {
    const codeMatch = id.match(validCode);
    if (codeMatch === null) {
      // invalid ID
      setDisplayedError(`Invalid ID '${id}'`);
      displayMessageWithGifUnfreeze(
        nayGifImg,
        nayGifDelay,
        nayGifSize,
        "red",
        nayGifText
      );
      return;
    }
    id = "CSIK" + codeMatch[2]; // CSIK prefix is optional
    const queue = JSON.parse(
      window.localStorage.getItem("raw_input_queue") ?? "[]"
    );
    queue.push([
      location,
      time.toISOString(),
      id,
      `=csippkategoriak!$A$${pickedCategory.index + 2}`,
    ]);
    window.localStorage.setItem("raw_input_queue", JSON.stringify(queue));
    setDisplayQueueSize(queue.length);
    poke();
    displayMessageWithGifUnfreeze(
      yayGifImg,
      yayGifDelay,
      yayGifSize,
      "lightgreen",
      yayGifText
    );
  }
}

window.addEventListener("load", async () => {
  await main();
});
