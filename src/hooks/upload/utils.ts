export function formatedFileName(name: string) {
  return name.toLowerCase().split(' ').join('_')
}

  function formatString(text: string) {
    return text.split(' ').join('_');
  }

  function formatStringArr(textArr: string[]) {
    const formatedStrings = textArr.map(item => formatString(item));
    return formatedStrings
  }

  export function combineArrays(instruments: string[] | undefined, styles: string[] | undefined) {
    const thisInstruments = instruments ? [...instruments].sort() : [];
    const thisStyles = styles ? [...styles].sort() : [];
    const joinedArrays = thisInstruments.concat(thisStyles);
    const formatedArr = formatStringArr(joinedArrays);

    return formatedArr as string[]
  }

  export function getSearchCombinations(instruments: string[] | undefined, styles: string[] | undefined) {
    const formatedArr = combineArrays(instruments, styles);
    const result: string[] = [];
    
    // Generate all combinations
    const generateCombinations = (start: number, currentCombination: string[]) => {
        if (currentCombination.length > 0) {
            result.push(currentCombination.join('-'));
        }
        
        for (let i = start; i < formatedArr.length; i++) {
            currentCombination.push(formatedArr[i]);
            generateCombinations(i + 1, currentCombination);
            currentCombination.pop();
        }
    };
    
    if(formatedArr.length > 0) {
      // Start generating from the first element
      generateCombinations(0, []);
    }

    return result;
  }