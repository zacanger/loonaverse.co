const baseTags = [
  '1/3',
  'choerry',
  'chuu',
  'go-won',
  'gowon',
  'haseul',
  'heejin',
  'hyunjin',
  'jinsoul',
  'jiwoo',
  'kim-lip',
  'kimlip',
  'loona',
  'odd-eye-circle',
  'oddeyecircle',
  'oec',
  'olivia-hye',
  'park-chae-won',
  'son-hye-joo',
  'son-hyejoo',
  'vivi',
  'wong-kahei',
  'wong-viian',
  'yeojin',
  'yves',
  '이달의소녀'
]

const twitter = baseTags
const tumblr = baseTags.map((tag) => tag.replace(/-/g, ' '))

module.exports = {
  twitter,
  tumblr
}
