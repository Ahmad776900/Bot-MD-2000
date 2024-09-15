.باتش-اضافة المليون import fs from  fs ;
import axios from  axios ;
import similarity from  similarity ;

let gameCache = null;

let totalPoints = 1000000;
let questionsCount = 10;
let poin = 5000;
let timeout = 60000;
const threshold = 0.72;

let handler = async (m, { conn, text, command }) => {

  try {
    let game = await fetchGameData();

    if (game) {
      let json = game[Math.floor(Math.random() * game.length)];
      let answer = json.response;
      let clue = answer.replace(/[A-Za-z0-9]/g,  _ );
      let img = json.image || null;
      let questions = json.question ||  من هو هذا ؟ ;
      let selection = json.selection || [ اختيار 1 ,  اختيار 2 ,  اختيار 3 ,  اختيار 4 ];

      let id = m.chat;
      conn.shawaza = conn.shawaza || {};

      if (conn.shawaza[id]) {
        let txt = `
╮───────────────────────╭ـ

│ ❗ *في سؤال لسه مجاوبتش عليه يا فاشل*

╯───────────────────────╰ـ`.trim();
        conn.sendButton(m.chat, txt, wm, img, null, null, null, m);
        return;
      }

      let currentQuestion = conn.shawaza[id]?.currentQuestion || 1;
      let totalpoin = conn.shawaza[id]?.totalpoin || 0;
      let level = conn.shawaza[id]?.level || 1;

      let caption = `
╮───────────────────────╭ـ

│ ❓ *السـؤال : ❲ ${questions} ❳*

│ ⏳ *الـوقـت : ❲ ${(timeout / 1000).toFixed(2)} ❳ ثواني*

│ 💰 *الـجـائـزة : ❲ ${poin} ❳ نقطه*

╯───────────────────────╰ـ

> 🔖 *السؤال :* ❲ ${currentQuestion} : ${questionsCount} ❳
> 🪙 *النقاط :* ❲ ${totalpoin} : ${totalPoints} ❳
> 🏅 *المستوى :* ❲ ${level} ❳


> 📑 *الاختيارات :*`.trim();

      let items = `
╮───────────────────────╭ـ

│ 🗃️ *قائمه خيارات المساعدة :*


│ 🏳️ *الانسـحاب : استخدم [انسحاب] للانسحاب من اللعبة*

│ ✏️ *اجــابتـين : استخدم [اجابتين] لحذف اجابتين*

│ 🧮 *الجــمهور : استخدم [الجمهور] لاستطلاع رأي الجمهور للإجابة*

│ ☎️ *الصــديق : استخدم [الصديق] للمساعدة في اختيار الإجابة*

╯───────────────────────╰ـ


> 📌 يسمح باختيار المساعدة لمرة واحدة فقط`.trim();

      await conn.sendButton(
        m.chat,
        caption,
        wm,
        img,
        selection.map(opt => [`${opt.trim()}`, `.help.1 ${opt.trim()}`]),
        null,
        null,
        m
      );

      await conn.sendButton(
        m.chat,
        items,
        wm,
        null,
        [
          [ اجــابتـين ,  .help.1 اجابتين ],
          [ الجــمهور ,  .help.1 الجمهور ],
          [ الصــديق ,  .help.1 الصديق ],
          [ الانسـحاب ,  .help.1 انسحاب ]
        ],
        null,
        null,
        m
      );

      conn.shawaza[id] = {
        correctAnswer: answer,
        options: selection,
        timer: setTimeout(async () => {
          if (conn.shawaza[id]) {
            global.db.data.users[m.sender].exp -= poin;
            totalpoin -= poin;
            if (totalpoin < 0) totalpoin = 0;
            level = calculateLevel(totalpoin);
            let cp = `
╮───────────────────────╭ـ

│ ❎ *خلص الوقت وانت زي منت فاشل مجوبتش*

│ ✅ *الاجابه هي : ${answer}*

│ 🪙 *نقاطـك : ❲ ${totalpoin} ❳*

│ 🏅 *مسـتواك : ❲ ${level} ❳*

│ 💰 *الخسـارة : ❲ ${poin} ❳ نقطه*

╯───────────────────────╰ـ`.trim();
            conn.sendButton(m.chat, cp, wm, img, [[ العب مجددا ,  .المليون ]], null, null, m);
            delete conn.shawaza[id];
          }
        }, timeout),
        attempts: 2,
        poin: poin,
        data: json,
        currentQuestion: 1,
        totalpoin: 0,
        totalPoints: totalPoints,
        level: 1,
        player: m.sender,
        igame: command
      };
    }
  } catch (error) {
    console.error( Error processing game logic: , error);
  }
};

handler.help = [ المليون ];
handler.tags = [ game ];
handler.command = [ المليون ];

export default handler;

async function fetchGameData() {
  if (!gameCache) {
    try {
      const fileId =  10jyvE6PziOrxC6u2HVieaa0zBf1ohBQM ;
      const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
      const res = await axios.get(url);

      if (res.data && Array.isArray(res.data)) {
        gameCache = res.data;
      } else {
        console.error( The received data is not a valid JSON array. );
      }
    } catch (error) {
      console.error( Error fetching data from Google Drive: , error);
    }
  }
  return gameCache;
}
/*
function calculateLevel(totalpoin) {
  return Math.floor(totalpoin / 10000); // مثال لحساب المستوى بناءً على النقاط
} */

function calculateLevel(points) {
    if (points < 200000) return 1;
    else if (points < 400000) return 2;
    else if (points < 600000) return 3;
    else if (points < 800000) return 4;
    else return 5; 
}
