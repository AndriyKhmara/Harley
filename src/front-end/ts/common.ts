class MyClass {

    private name:string;

    constructor(name:string){
        this.name = name;
    }

    public greet(){
        console.log('Hello, my name is ' + this.name);
    }

}
