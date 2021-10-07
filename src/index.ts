import { create, decryptMedia, Client } from '@open-wa/wa-automate';

create({
  sessionId: 'Erickao BOT',
}).then((client) => start(client));

function start(client: Client) {
  client.onMessage(async message => {
    // console.log('MENSAGEM TESTE', message);

      // SEND VIDEO AND GIF AS STICKER
      if (message.type === 'video' && !message.isGroupMsg) {
        const mediaData = await decryptMedia(message);
        const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
          'base64'
        )}`;
        const response = await client.sendMp4AsSticker(
          message.sender.id,
          imageBase64,
          {},
          {
            author: 'Tupa BOT',
            pack: 'Tupa BOT',
            keepScale: true,
          }
        );
        console.log('RESPONSE VIDEO', response);
      }

      // SEND IMAGE AS STICKER
      if (message.mimetype && message.type !== 'video' && message.type !== 'sticker' && !message.isGroupMsg) {
        const mediaData = await decryptMedia(message);
        const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
          'base64'
        )}`;
        const response = await client.sendImageAsSticker(
          message.sender.id,
          imageBase64,
          {
            author: 'Tupa BOT',
            pack: 'Tupa BOT',
            keepScale: true
          }
        );
        console.log('RESPONSE PRIVATE MESSAGE', response);
      }

      // CHECK IF MESSAGE IS A GROUP MESSAGE
      if (message.isGroupMsg) {
        if (message.type === 'video') {
          const mediaData = await decryptMedia(message);
          const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
            'base64'
          )}`;
          const response = await client.sendMp4AsSticker(
            message.from,
            imageBase64,
            {},
            {
              author: 'Tupa BOT',
              pack: 'Tupa BOT',
              keepScale: true
            }
          );
          console.log('RESPONSE VIDEO', response);
        }

        if (message.mimetype && message.type !== 'video' && message.type !== 'sticker') {
          const mediaData = await decryptMedia(message);
          const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
            'base64'
          )}`;
          const response = await client.sendImageAsSticker(
            message.from,
            imageBase64,
            {
              author: 'Tupa BOT',
              pack: 'Tupa BOT',
              keepScale: true
            }
          );
          console.log('RESPONSE IMAGE GROUP', response);
        }
      }
  });
}
