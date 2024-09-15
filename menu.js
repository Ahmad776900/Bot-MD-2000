let handler = async (m, { conn, args, usedPrefix, command }) => {
    conn.relayMessage(m.chat, {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: {
              title:  *🎗️ قـائـمـة الـاوامــر🎗️* 
            },
            body: {
              text:  🧿 افتح القائمة بواسطة الزر\n🍒 لا تلعب كثير في القائمة 
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name:  single_select ,
                  buttonParamsJson: JSON.stringify({
                    title:  اضغط هنا   ,
                    sections: [
                      {
                        title:  List ,
                        highlight_label:  ON ,
                        rows: [
                          {
                            header:  ☘️ الجروبات ,
                            title:  فتح_قسم_الجروبات. ,
                            description:   ,
                            id:  te 
                          },
                          {
                            header:   قـسـم الاعضاء ,
                            title:  .فتح_قسم_الاعضاء ,
                          description:   ,
                            id:  te 
                          }
                        ]
                      }
                    ]
                  }),
                  messageParamsJson:   
                }
              ]
            }
          }
        }
      }
    }, {})

}

handler.help = [ info ]
handler.tags = [ main ]
handler.command = [ القائمة|menu|menu1 ]

export default handler
