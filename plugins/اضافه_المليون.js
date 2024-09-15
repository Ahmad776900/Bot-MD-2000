let handler = async (m, { conn, text, command }) => {

let id = m.chat;
let selectedAnswer = text.trim();
let gamelev = conn.shawaza[id];

if (!gamelev) {
let cp = `
╮───────────────────────╭ـ

│ ❓ *لا يوجد سؤال نشط في الوقت الحالي*

╯───────────────────────╰ـ`.trim();
conn.sendButton(m.chat, cp, wm, null, [[ الفاعليات ,  .الفاعليات ]], null, null, m);
return;
}

let Answer = gamelev.correctAnswer;
let img = gamelev.data.image || null;

let currentQuestion = gamelev.currentQuestion;
let igame = gamelev.igame;

let point = gamelev.poin;
let totalpoin = gamelev.totalpoin;
let totalPoints = gamelev.totalPoints;

let level = gamelev.level;
let txt;

let _player = gamelev.player;
let _sender = m.sender;

let player = _player.split( @ )[0];
let sender = m.sender.split( @ )[0];

if (_player !== _sender) {

conn.sendButton(m.chat, `❗ *فقط اللاعب الذي بدأ اللعبة يمكنه الإجابة على الأسئلة*`, wm, null, null, null, null, m);

return;
}

if (selectedAnswer.toLowerCase() ===  اجابتين ) {

gamelev.options = gamelev.options.slice(0, 2);

txt = `
╮───────────────────────╭ـ

│ ✏️ *تم حذف إجابتين*

│ 💡 *الاختيارات المتبقية :* 

│ *❲ ${gamelev.options.join(  ❳*\n│ *❲  )} ❳*

╯───────────────────────╰ـ`.trim();

conn.sendButton(m.chat, txt, wm, null, null, null, null, m);

} else if (selectedAnswer.toLowerCase() ===  الجمهور ) {

let audienceChoice = gamelev.options[Math.floor(Math.random() * gamelev.options.length)];

txt = `
╮───────────────────────╭ـ

│ 🧮 *الجمهور يرشح الإجابة الصحيحة*

│ 💡 *الجمهور يعتقد أن الإجابة هي :* 

│ *❲ ${audienceChoice} ❳*

╯───────────────────────╰ـ`.trim();

conn.sendButton(m.chat, txt, wm, null, null, null, null, m);

} else if (selectedAnswer.toLowerCase() ===  الصديق ) {

let friendChoice = gamelev.options[Math.floor(Math.random() * gamelev.options.length)];

txt = `
╮───────────────────────╭ـ

│ ☎️ *الصديق يوصي بالإجابة الصحيحة*

│ 💡 *الصديق يقترح أن الإجابة هي :* 

│ *❲ ${friendChoice} ❳*

╯───────────────────────╰ـ`.trim();

conn.sendButton(m.chat, txt, wm, null, null, null, null, m);

} else if (selectedAnswer.toLowerCase() ===  انسحاب ) {
global.db.data.users[m.sender].exp -= point;

txt = `
╮───────────────────────╭ـ

│ 🚪 *يالك من فاشل لقد انسحبت*

│ 💰 *الخسـارة : ❲ ${point} ❳ نقطه*

╯───────────────────────╰ـ`.trim();
conn.sendButton(m.chat, txt, wm, img, [[ العب مجددا , `.${igame}`]], null, null, m);
clearTimeout(gamelev.timer);
delete conn.shawaza[id];

} else {

if (selectedAnswer.toLowerCase() === Answer.toLowerCase().trim()) {

global.db.data.users[m.sender].exp += point;
gamelev.totalpoin += point * level;
gamelev.currentQuestion += 1;
totalpoin = gamelev.totalpoin;
level = calculateLevel(totalpoin);

if (totalpoin < totalPoints) {

let cp2 = `
╮───────────────────────╭ـ

│ 👏🏻 *أحسنت لقد فزت إجابتك صحيحة*

│ 💰 *جائزتـك : ❲ ${point} ❳ نقطه*

│ 🏅 *مسـتواك : ❲ ${level} ❳*

│ 🪙 *نقاطـك : ❲ ${totalpoin} ❳*

╯───────────────────────╰ـ`.trim();
conn.sendButton(m.chat, cp2, wm, img, [[ السؤال التالي , `.${igame}`]], null, null, m);
clearTimeout(gamelev.timer);
delete conn.shawaza[id];

} else {

let cp2 = `
╮───────────────────────╭ـ

│ 🎉 *مبروك! لقد أنهيت اللعبة!*

│ 🪙 *إجمالي النقاط: ❲ ${totalpoin} ❳*

│ 🏅 *مستواك النهائي : ❲ ${level} ❳*

╯───────────────────────╰ـ`.trim();
conn.sendButton(m.chat, cp2, wm, img, [[ العب مجددا , `.${igame}`]], null, null, m);
clearTimeout(gamelev.timer);
delete conn.shawaza[id];
}
} else {

gamelev.attempts -= 1;
                
if (gamelev.attempts > 0) {
let cp3 = `
╮───────────────────────╭ـ

│ ❌ *إجابة خاطئة حاول مجددا*

│ 🍄 *المحاولات : ❲ ${gamelev.attempts} ❳*

╯───────────────────────╰ـ`.trim();
conn.sendButton(m.chat, cp3, wm, img, null, null, null, m);

 } else {
 
global.db.data.users[m.sender].exp -= point;

            gamelev.totalpoin -= point;
            totalpoin = gamelev.totalpoin;
            if (totalpoin < 0) totalpoin = 0;
            level = calculateLevel(totalpoin);
                    
 let cp4 = `
╮───────────────────────╭ـ

│ ❌ *أجابه خاطئه يا فاشل، انتهت محاولاتك*

│ ✔️ *الاجابه الصحيحة : ❲ ${Answer} ❳*

│ 🪙 *نقاطـك : ❲ ${totalpoin} ❳*

│ 🏅 *مسـتواك : ❲ ${level} ❳*

│ 💰 *الخسـارة : ❲ ${point} ❳ نقطه*

╯───────────────────────╰ـ`.trim();
conn.sendButton(m.chat, cp4, wm, img, [[ العب مجددا , `.${igame}`]], null, null, m);
 clearTimeout(gamelev.timer);
 delete conn.shawaza[id];
                }
                }
                }
                };
                
handler.help = [ المليون ];
handler.tags = [ game ];
handler.command = [ help.1 ];

export default handler;
                
function calculateLevel(points) {
    if (points < 200000) return 1;
    else if (points < 400000) return 2;
    else if (points < 600000) return 3;
    else if (points < 800000) return 4;
    else return 5; 
}
