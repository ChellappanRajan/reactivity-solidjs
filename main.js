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
            fn(); //it will invoke create effect fn and invoke read at that point context will be there
            context.pop();
        }
    };
    effect.execute();
}

const [read,write] = createSignal(9);

console.log(read());

createEffect(()=>{
    console.log(read());
})

//Why this function is getting called without any deps or singal read
//looks like effect will called at least once
createEffect(()=>{
    console.log('Why this being called without deps');
    // console.log(read());
})