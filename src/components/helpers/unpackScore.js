export default function unpackScore(data) {
  const score = data.split(" ")
  const dataWPM = score[0].split(":")
  const dataACC = score[1].split(":")
  return {WPM: parseInt(dataWPM[1]), ACC: parseInt(dataACC[1])}
}