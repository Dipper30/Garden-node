const attrs = [
  'createdAt', 
  'updatedAt'
]

// omit some useless or sensitive attributes

const omit = (rawData, attrsToOmit = attrs) => {
  if (!rawData) return rawData
  rawData = JSON.parse(JSON.stringify(rawData))
  // check data type
  if ( rawData instanceof Array ) {
    return rawData.map(data=>{
      Object.keys(data).forEach(attr => {
        if (attrsToOmit.includes(attr)) delete data[attr]
      })
      return data
    })
  } else {
    Object.keys(rawData).forEach(attr => {
      if (attrsToOmit.includes(attr)) delete rawData[attr]
    })
    return rawData
  }
  
  
}

module.exports = {
  omit
}