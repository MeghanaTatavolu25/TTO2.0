export function checkStrEmpty(text:string|null){
    // returns a boolean if string is empty
    if(!text&&text===undefined&&text===''&&text===' '){
        return true
    }else{
        return false
    }
}