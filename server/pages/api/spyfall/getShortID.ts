const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const generate = () => {
  let text = '';
  for(let i = 0; i < 5; i += 1){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export default async (req, res) => {
    let gameCode = await generate()
    res.statusCode = 200
    res.json({ id: gameCode.toUpperCase()})
  }
  