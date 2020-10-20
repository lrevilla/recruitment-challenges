const path = require('path')

exports.STREET_TYPES = {
  STREET: { SHORT: 'st.', LONG: 'street' },
  ROAD: { SHORT: 'rd.', LONG: 'road' }
}

exports.STATES = {
  ILLINOIS: { SHORT: 'il', LONG: 'illinois' },
  CALIFORNIA: { SHORT: 'ca', LONG: 'california' },
  NEW_YORK: { SHORT: 'ny', LONG: 'new york' }
}

exports.FILES_PATH = path.join(__dirname, '..', 'Files')
