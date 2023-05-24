function createSignal(value){
    const read = ()=>value;
    const write = (newValue)=>value = newValue;
}


const [read,write] = createSignal(9);

console.log(read());

write(10);

console.log(read());