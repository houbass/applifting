export function getSearchNameArr(displayName: string | null) {
  if(displayName) {
    const searchArr = displayName.toLowerCase().split('');
    const finalArr: string[] = []
  
    searchArr.forEach((item, index) => {
      if(index > 0) {
        const prevValues = finalArr[index - 1];
        finalArr.push(prevValues + item)
      } else {
        finalArr.push(item)
      }
    })
  
    return finalArr
  } else {
    return ''
  }

}