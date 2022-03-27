export default function fomatDateTime(datetime){
    let getDateTime = datetime.split(" ");
    let date=getDateTime[0];
    let time=getDateTime[1];
    time = time.substr(0,time.lastIndexOf(":"));
    return time + "  " + date;
}