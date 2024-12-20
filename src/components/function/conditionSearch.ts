function conditionSearch(dataRaw: any, KeyOfDataShowFilter: Array<string>, query: string) {
  const resultKeyArray = [];
  //TODO: search from ID
  const regex = new RegExp(query.toUpperCase());
  for (const key of KeyOfDataShowFilter) {
    const conditionSearch1 = () => regex.test(key);
    const conditionSearch2 = () => regex.test(((dataRaw[key].material).toString()).toUpperCase());
    const conditionSearch3 = () => regex.test(((dataRaw[key].description).toString()).toUpperCase());
    const conditionSearch4 = () => regex.test(dataRaw[key].sLoc);
    // const conditionSearch5 = () => regex.test(((dataRaw[key].author).toString()).toUpperCase());
    const conditionSearch6 = () => regex.test(((dataRaw[key].note).toString()).toUpperCase());
    // const conditionSearch7 = () => regex.test(dataRaw[key].store);
    if (conditionSearch1() || conditionSearch2() || conditionSearch3() || conditionSearch4() || conditionSearch6() ) {
      resultKeyArray.push(key);
    }
    //TODO_END: search from Id
  }
  return resultKeyArray;
}

//! export
export default conditionSearch;
