

function timestampToTime (timeStamp: number ,type?:string){
   if(timeStamp){
    var dateFormat= new Date(timeStamp)
    let timeResult = dateFormat.getDate()+"/"+(dateFormat.getMonth()+1)+"/"+dateFormat.getFullYear()+" "+dateFormat.getHours()+":"+dateFormat.getMinutes()+":"+dateFormat.getSeconds()
    if(type=== 'date only' ){
        timeResult = dateFormat.getDate()+"/"+(dateFormat.getMonth()+1)+"/"+dateFormat.getFullYear()
        return timeResult  || ''
    }
    return timeResult || ''
   }
}

export default timestampToTime