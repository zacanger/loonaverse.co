const baseTags = [
  '이달의소녀',
  'loona',
  'heejin',
  'hyunjin',
  'haseul',
  'yeojin',
  'vivi',
  'kimlip',
  'kim-lip',
  'jinsoul',
  'choerry',
  'yves',
  'chuu',
  'go-won',
  'gowon',
  '1/3',
  'odd-eye-circle',
  'oddeyecircle',
  'oec'
]

const twitter = [ ...baseTags ]
const tumblr = [ ...baseTags ].map((tag) => tag.replace(/-/g, ' '))

module.exports = {
  twitter,
  tumblr
}
