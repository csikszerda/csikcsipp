import * as jose from "https://cdnjs.cloudflare.com/ajax/libs/jose/4.14.4/index.js";

const encryptedSecret = {
  secret:
    "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",
  nonce: "RMWG41oBtqMCdoBA9WUpYtB2uVsSbeaJ",
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
  "use strict";
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

  const passwordStorageKey = "secret_password";
  const getSecret = async () => {
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
  };

  const resetSecret = () => {
    window.localStorage.removeItem(passwordStorageKey);
    location.reload();
  };
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
      `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheet_read_id}/values/${range}?majorDimension=ROWS`,
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
      `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheet_read_id}/values/${range}?majorDimension=ROWS`,
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
    element.style.fontFamily = "Monospace";
    element.style.color = textColor;
    element.style.fontSize = fontSize;
    element.style["-webkit-text-stroke"] = "unset";
  }

  console.log("Retrieving gifs from sheet");
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

  console.log("Retrieving categories");

  const categories = await retrieveCategoriesFromSheets(
    secret.config,
    await getJwt()
  );
  const pickedCategory = await promptCategory(categories);
  displayBottomMessage("20vw", "lightgray", pickedCategory.category);

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

  async function waitForImgLoad(img, timeout) {
    let loaded = false;
    return new Promise((resolve) => {
      img.onload = () => {
        resolve();
        loaded = true;
      };
      setTimeout(() => {
        if (!loaded) {
          console.log("Timed out loading " + img.src);
          resolve();
        }
      }, timeout);
    });
  }
  const yayGifImg = new Image();
  yayGifImg.src = yayGifUrl;
  yayGifImg.style = "width: 100%";
  const nayGifImg = new Image();
  nayGifImg.src = nayGifUrl;
  nayGifImg.style = "width: 100%";
  console.log("Loading gifs...");
  await Promise.all([
    waitForImgLoad(yayGifImg, 5 * 1000),
    waitForImgLoad(nayGifImg, 5 * 1000),
  ]);

  console.log("Creating frozen gifs");
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

  const poke = {
    run: null,
  };

  const timeoutHandler = async () => {
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
      console.log("Sent " + deduplicatedQueue.length + " csipps successfully");
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
      poke.run();
    }
  };

  const initTimer = () => {
    let timeoutId = null;

    return () => {
      if (timeoutId === null) {
        timeoutId = setTimeout(async () => {
          timeoutId = null;
          await timeoutHandler();
        }, 20 * 1000);
      }
    };
  };

  poke.run = initTimer();
  poke.run();

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

  const noSleep = new NoSleep();
  noSleep.enable();

  const enqueueRawInput = async (location, time, id) => {
    const validCode = /^(CSIK)?(\d{10})$/;
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
    poke.run();
    displayMessageWithGifUnfreeze(
      yayGifImg,
      yayGifDelay,
      yayGifSize,
      "lightgreen",
      yayGifText
    );
  };

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
}

window.addEventListener("load", async () => {
  await main();
});
