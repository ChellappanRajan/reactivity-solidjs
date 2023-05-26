const context = [];

function createSignal(value){
    const subscription = new Set();
    const read = ()=>{
        //Checking whether anyone listening this value
        //context is kind of stack pusing and poping
        const observer =  context[context.length - 1];
        if(observer){
            subscription.add(observer);
        }
        return value;
    };
    const write = (newValue)=>{
        value = newValue;
        for(const observer of subscription){
            observer.execute();
        }
    };
    return[read,write];
}

function createEffect(fn){
    const effect = {
        execute(){
            context.push(effect);
            fn();
            context.pop();
        }
    };
    effect.execute();
}

const [read,write] = createSignal(9);

console.log(read());

write(10);

createEffect(()=>{
    console.log(read());
})

createEffect(()=>{
    console.log(read());
})