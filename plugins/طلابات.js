//كود طلابات الانضمام النادر 
//انضم للقناه بنشر اكواد نادره كتيره https://whatsapp.com/channel/0029VaffkVGAYlUKWeIMlR0X

//حقوق ايتاتشي ممنوع التغيير 

let handler = async (m, { conn, usedPrefix, command }) => {
  const response = await conn.groupRequestParticipantsList(m.chat);
  if (!response || !response.length) {
    conn.reply(m.chat,  *لـا يـوجـد طـلـابـات تـم الـتـقـديـم عـلـيـهـا ✅* , m);
    return;
  }

  let replyMessage =  ╮▴ ╸─┈━⚵━ ⟞🏵️⟝ ━⚵━┈─ ╺ ▴\n*⚡ الـيـك قـائـمـه طـلـابـات الـانـضـمـام:*\n ;
  response.forEach((request, index) => {
    const { jid, request_method, request_time } = request;
    const formattedTime = new Date(parseInt(request_time) * 1000).toLocaleString();

    replyMessage += `\n🎡 *عـدد الـطـلـابـات.: ${index + 1} مـعـلـومـات الـطـلـب. 📓*`;
    replyMessage += `\n🏷️ *مـنـشـنـه:* ${jid}`;
    replyMessage += `\n🎠 *طـلـب الـانـضـمـام عـن طـريـق:* ${request_method}`;
    replyMessage += `\n☔ *الـوقـت:* ${formattedTime}\n\n╯──────────────────⟢ـ`;
  });

  conn.reply(m.chat, replyMessage, fkontak);
};

handler.help = [ طلابات الانضمام ];
handler.tags = [ الادمن ];
handler.command = /^(الطلابات)$/i;
handler.admin = true;
handler.group = true;
handler.botAdmin = true;
//لو بوتك ذيي
muddle export handler;
//عادي
export handler difficult
